# 03 — FastAPI: BackgroundTasks vs Celery + request idempotente

> Código de estudio: `fastapi/01-background-vs-celery.py` · `fastapi/02-idempotency-key.py`

---

## 1) Te preguntan: ¿Por qué usar BackgroundTasks o mandarlo a Celery?

### Responde (voz, EN)

> FastAPI `BackgroundTasks` run **in the same process** after the response — zero infra, good for cheap work (tiny log, non-critical email). If the process dies, the task is gone. **Celery** (or RQ, Dramatiq) puts work on a **durable queue** (Redis / RabbitMQ) with retries, concurrency, and separate workers. I use Celery for payments, invoices, anything I cannot afford to lose.

### Justifica

```
Request ──► FastAPI ──► 200 OK
                │
                └─ BackgroundTasks  (mismo proceso, RAM)
                   si el worker/gunicorn muere → se pierde

Request ──► FastAPI ──► 200 OK
                │
                └─ broker (Redis/RabbitMQ) ──► Celery worker
                   persistencia + retry + DLQ (Dead Letter Queue)
```

```python
from fastapi import BackgroundTasks, FastAPI

app = FastAPI()

def send_email(to: str) -> None:
    ...  # SMTP

@app.post("/welcome")
def welcome(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email, email)  # after response
    return {"ok": True}


# Crítico:
# send_invoice.delay(order_id)   # Celery — cola
```

| | BackgroundTasks | Celery |
|--|-----------------|--------|
| Infra | Ninguna | Redis/RabbitMQ + workers |
| Persistencia | No | Sí (broker) |
| Retry | Manual | `autoretry`, backoff |
| Escala | No (mismo proc) | Horizontal (más workers) |
| Caída del API | Tarea perdida | Tarea sigue en cola |

**Cuándo NO async/BackgroundTasks:** trabajo **CPU-bound** (cálculo pesado) — no libera el GIL (Global Interpreter Lock) de forma útil; usa procesos / cola.

---

## 2) Te preguntan: ¿riesgos de `autoretry` **sin backoff**?

> Pregunta SR típica: “pusiste el job en cola con retry automático y sin backoff — ¿qué puede pasar?”

### Responde (voz, EN)

> Autoretry without backoff is a **retry storm**. If Stripe or the DB is down, every failed task immediately retries, together with all the new ones. You hammer the sick dependency, saturate workers, blow the queue, and you can **duplicate side effects** if the task isn’t idempotent. I always cap `max_retries`, use **exponential backoff plus jitter**, retry only on *transient* errors, and send poison messages to a DLQ (Dead Letter Queue).

### Justifica — qué sale mal

```
API de pagos CAÍDA
  10_000 tasks fallan
  autoretry SIN backoff → reintento YA
  10_000 hits otra vez  → la API no se recupera
  workers ocupados      → el resto de la cola se atasca
```

| Riesgo | Qué significa |
|--------|----------------|
| **Retry storm / thundering herd** | Todos reintentan a la vez; pico peor que el error original |
| **Amplificas la caída** | El servicio que falló (Stripe, SMTP, RDS) recibe más carga |
| **Workers saturados** | Retries comen concurrencia; jobs nuevos esperan |
| **Cola/broker explota** | Redis/RabbitMQ lleno de reentregas |
| **Rate limit 429** | Peor: reintentas más rápido de lo que el vendor permite |
| **Side effects duplicados** | Sin idempotency: 3 retries = 3 cobros / 3 emails |
| **Error no transitorio** | `ValueError` / payload inválido nunca va a funcionar — retry infinito es inútil |

### Cómo sí (Celery)

```python
@app.task(
    bind=True,
    autoretry_for=(RequestException, TimeoutError),  # solo transitorios
    retry_kwargs={"max_retries": 5},
    retry_backoff=True,          # 1s, 2s, 4s, 8s... (exponencial)
    retry_backoff_max=60 * 10,   # techo
    retry_jitter=True,           # desfasar para no ir todos juntos
)
def send_invoice(self, order_id: int) -> None:
    charge_or_raise(order_id)
```

O manual:

```python
raise self.retry(exc=e, countdown=2 ** self.request.retries)  # 1, 2, 4, 8
```

| Control | Para qué |
|---------|----------|
| `max_retries` | Techo duro (ej. 5) |
| Exponential backoff | Esperar más cada vez |
| **Jitter** | No sincronizar 10k retries al mismo segundo |
| Retry solo transitorios | Timeout/5xx — no `ValidationError` |
| Idempotent task | Retry seguro (mismo `Idempotency-Key`) |
| DLQ / `acks_late` | Tras N fallos, inspeccionar; no perder silencioso |

**Frase cierre:**  
> “Retry is for *temporary* failures. Without backoff you’re DDoS-ing yourself.”

---

## 3) Te preguntan: el worker se cae — ¿cómo haces la request idempotente?

Contexto típico: `POST /payment` → timeout → el cliente reintenta → **no cobrar dos veces**.

### Responde (voz, EN)

> Distributed writes must be **idempotent**: one logical intent, same side effect even if retried. The client sends an `Idempotency-Key` (UUID — Universally Unique Identifier). I persist `key → result` in the database or Redis with a unique constraint. First request processes and stores the outcome. Retry with the same key returns the **stored result** and does **not** charge again. The worker crash is covered because the key survives in Redis/DB, not in process memory.

### Justifica

```
Cliente                API                         Store
POST /pay
Idempotency-Key: abc  ──►  ¿abc existe?
                           no → cobrar → guardar abc→{payment_id}
                           timeout / worker down

POST /pay (retry)
Idempotency-Key: abc  ──►  ¿abc existe?
                           sí → return mismo JSON  (NO segundo cargo)
```

```python
# Pseudo
key = request.headers["Idempotency-Key"]
cached = store.get(key)
if cached:
    return cached.response, cached.status

# unique index en key evita carrera de 2 requests paralelos
with transaction.atomic():
    row = IdempotencyKey.objects.create(key=key)  # IntegrityError si dup
    payment = charge(user, amount)
    row.response = serialize(payment)
    row.save()
return payment
```

**Worker Celery caído:**

1. La HTTP ya respondió 202/200 con `job_id`.  
2. El mensaje sigue en Redis/RabbitMQ → otro worker lo toma.  
3. El **task** también debe ser idempotente: `task_id` / `payment_id` unique — `get_or_create` del cargo.

```python
@celery.task
def charge_order(order_id: int, idempotency_key: str):
    existing = Payment.objects.filter(idempotency_key=idempotency_key).first()
    if existing:
        return existing.id
    return Payment.objects.create(order_id=order_id, idempotency_key=idempotency_key).id
```

### Follow-up

| Pregunta | Respuesta |
|----------|-----------|
| ¿GET es idempotente? | Sí por HTTP. POST no — por eso key. |
| ¿TTL? | Redis TTL 24h típico; DB con unique + created_at. |
| Race | Unique constraint + transacción; no “check then insert” sin lock. |
| vs dedup | Idempotency = contrato de API. Dedup = no procesar el mismo evento de cola dos veces (mismo ID). |
