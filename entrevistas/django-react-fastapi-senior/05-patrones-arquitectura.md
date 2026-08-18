# 05 — Patrones y arquitectura (lo que separa Mid de Senior)

Di **trade-off**, no lista de nombres. Un patrón sin problema es over-engineering.

---

## 1) Te preguntan: ¿qué patrones usas en Django/FastAPI?

### Responde (voz, EN)

> I use a **service layer** so views don’t own business rules, sometimes a **repository** if I need to swap ORM/query details in tests, **strategy** when payment providers differ, **adapter** around third-party APIs, and **manual dependency injection** — pass collaborators into constructors rather than importing globals. I don’t force all of them on a 4-endpoint CRUD.

### Justifica — capas

```
HTTP (View / APIRouter)
   → Service          reglas, orquesta, transacción
      → Repository    queries (opcional; ORM directo está OK al inicio)
         → DB
   → Adapter          Stripe, email, CNN API
```

```python
class OrderService:
    def __init__(self, payments: PaymentGateway, repo: OrderRepo):
        self.payments = payments
        self.repo = repo

    def checkout(self, user_id: int, idempotency_key: str) -> Order:
        ...
```

| Patrón | Para qué | No lo uses si… |
|--------|----------|----------------|
| Service layer | Desacoplar HTTP de negocio | El view solo hace `Model.objects.create` |
| Repository | Ocultar queries complejas / test fake | Cada método es un wrapper de 1 línea al ORM |
| Strategy | Varias implementaciones (PayPal/Stripe) | Un solo proveedor |
| Adapter | API externa cambia, tu dominio no | Un `requests.get` aislado |
| Factory | Construir objetos complejos | `Model(…) ` basta |
| Observer/events | Desacoplar “tras crear orden, email” | Un solo listener en el mismo módulo |

---

## 2) Te preguntan: ¿por qué Service Layer?

> Views stay HTTP-thin: status codes, auth. Services are callable from Celery, admin commands, and tests **without** `APIClient`. That’s reuse + SRP (Single Responsibility Principle).

---

## 3) N+1 — recuérdalo en una frase

> One query for the list, then one query **per row** for a relation. Fix: `select_related` (JOIN / FK) or `prefetch_related` (M2M / reverse).

---

## 4) API lenta — checklist senior

1. Medir (APM, `django.db.connection.queries`, EXPLAIN).  
2. N+1 / `iterator` en exports.  
3. Índices en `WHERE` / `ORDER BY` / FK.  
4. Paginación.  
5. Cache **aside** (ver abajo).  
6. Async solo I/O-bound.

---

## 5) ¿Cuándo NO usar async?

> If the work is **CPU-bound** (heavy JSON parse of 50MB, image resize in-process), async won’t use extra cores — the GIL (Global Interpreter Lock) still serializes bytecode. Async helps **I/O-bound** waits: HTTP calls, DB, S3. CPU work → processes, Celery, or a specialized service.

---

## 6) Flashcards de 1 frase (P1/P2)

### Cache Aside

App lee cache → miss → DB → escribe cache. Al update: invalida key. (No cacheas sin TTL — Time To Live.)

### Rate limiting

Tope de requests por cliente/ventana. API gateway o Redis (`INCR` + TTL). Protege abuse y vecinos ruidosos.

### Circuit breaker

Si el servicio externo falla N veces, **abre** el circuito: fail fast, no satures. Tras cooldown, prueba 1 request (half-open).

### CQRS (Command Query Responsibility Segregation)

Writes (commands) y reads (queries) modelos distintos. Útil con lecturas pesadas / eventos. Overkill en CRUD chico.

### CAP (Consistency, Availability, Partition tolerance)

En partición de red eliges C o A. SQL típico: consistencia. Cache multi-nodo: a veces disponibilidad eventual.

### Optimistic vs pessimistic locking

Optimistic: `version` column, update if version match — bueno para pocos conflictos. Pessimistic: `SELECT … FOR UPDATE` — bloquea fila, pagos/stock.

### OAuth2 vs JWT

OAuth2 = **protocolo de autorización** (flujos, scopes). JWT = **formato de token**. Puedes emitir JWT como access token dentro de OAuth2.

### Event-driven

Tras `OrderPaid`, publicas evento; email/facturación escuchan. Desacopla, pero necesitas idempotencia en consumidores.

---

## 7) Preguntas extra que suenan SR (ensaya 20s)

**P: ¿Cómo versionas una API?**  
R: `/v1/` o header; no rompas contratos; depreca con fecha.

**P: ¿12-factor config?**  
R: Config por env vars; secretos fuera del repo; procesos stateless.

**P: ¿Qué testea un senior?**  
R: Domain/service con DB de test; 2–3 API smoke (401, 201, 422). No 100% views.

**P: Observabilidad**  
R: Structured logs + request id, métricas (latencia, 5xx), traces en pagos.
