# 07 — Banco extra Senior (EN + ES + ejemplo)

> Las de `01`–`04` son las de **esa ronda**. Aquí van **follow-ups**.  
> Formato: **Te preguntan** → **Responde EN** → **Responde ES** → **Ejemplo**.

No memorices las 40 de golpe. Tras P0: **A → B → C**, luego D/E si hay React/TS.

---

## A) Django ORM / DB

### Te preguntan: ¿Un QuerySet es lazy? / Is a QuerySet lazy?

**Responde (EN):** Yes. A QuerySet is a lazy description of a query — Django does **not** hit the database until you *evaluate* it (`for`, `list()`, `[0]`, `.get()`, `.count()`…). That’s why I can chain `.filter().exclude().order_by()` for free.

**Responde (ES):** Sí. El QuerySet es perezoso: no consulta la BD hasta que lo evalúas. Encadenar filtros no dispara SQL.

**Ejemplo:**

```python
qs = User.objects.filter(is_active=True)  # 0 SQL
qs = qs.filter(email__endswith="@epam.com").order_by("id")  # 0 SQL
user = qs[0]   # AQUÍ: 1 SQL  SELECT … LIMIT 1
```

---

### Te preguntan: `exists()` vs `count()` vs `len(qs)` vs `bool(qs)`

**Responde (EN):** `exists()` runs `SELECT 1 … LIMIT 1` — cheapest “is there any row?”. `count()` runs `COUNT(*)` — need the number, not the rows. `len(qs)` and `bool(qs)` **evaluate and cache** the full result set if it wasn’t cached — deadly on 100k rows just to check emptiness.

**Responde (ES):** `exists()` = ¿hay alguno? (barato). `count()` = cuántos (SQL COUNT). `len`/`bool` traen **todas** las filas a RAM si no había cache.

**Ejemplo:**

```python
# BIEN — ¿existe admin?
if User.objects.filter(is_staff=True).exists():
    ...

# BIEN — dashboard: cuántos
n = Order.objects.filter(status="open").count()

# MAL — export de 1M solo para “si hay”
if len(Order.objects.all()):   # carga 1M filas
    ...
```

---

### Te preguntan: `only()` / `defer()`

**Responde (EN):** They load a subset of columns to cut memory/IO. Trap: touching a deferred field later fires **another query per row** — hidden N+1. I use `only("id", "email")` for exports; I don’t then print `user.profile_bio` in the same loop.

**Responde (ES):** Traen menos columnas. Si luego tocas un campo diferido, cada fila dispara otro SQL (N+1 escondido).

**Ejemplo:**

```python
# Export CSV — solo 2 columnas
for u in User.objects.only("id", "email").iterator():
    writer.writerow([u.id, u.email])

# MAL después de only("id"):
# print(u.email)  → query extra POR usuario
```

---

### Te preguntan: `get_or_create` — race? / condición de carrera

**Responde (EN):** Two requests can both `get` miss and both `INSERT`. Without a **unique constraint**, you get duplicates. With unique: one `IntegrityError` — catch it and `get()` again. Same pattern as idempotency keys.

**Responde (ES):** Dos requests pueden crear el mismo registro. La defensa real es **índice unique** + reintento en `IntegrityError`, no solo `get_or_create`.

**Ejemplo:**

```python
# models: email = EmailField(unique=True)

try:
    user, created = User.objects.get_or_create(email=email, defaults={"name": name})
except IntegrityError:
    user = User.objects.get(email=email)  # el otro request ganó
```

```
t1: SELECT → vacío     t2: SELECT → vacío
t1: INSERT             t2: INSERT → unique boom → GET
```

---

### Te preguntan: `select_for_update` vs version column (optimistic)

**Responde (EN):** **Pessimistic:** `select_for_update()` inside `atomic()` locks the row until commit — wallets, stock. **Optimistic:** `version` column; `UPDATE … WHERE version=n`; if 0 rows updated, conflict — retry. Optimistic when collisions are rare (less lock wait).

**Responde (ES):** Pesimista = bloqueas la fila (stock). Optimista = “actualiza si la versión sigue siendo 3”; si otro ganó, reintentas. Optimista si casi no hay choques.

**Ejemplo:**

```python
with transaction.atomic():
    item = Product.objects.select_for_update().get(pk=pk)
    if item.stock < qty:
        raise DomainError("no_stock")
    item.stock -= qty
    item.save(update_fields=["stock"])

# Optimistic:
updated = Product.objects.filter(pk=pk, version=v).update(stock=F("stock") - qty, version=v + 1)
if updated == 0:
    raise Conflict("retry")
```

---

### Te preguntan: `F()` / `Q()`

**Responde (EN):** `F()` moves the math to SQL (`stock = stock - 1`) so two workers don’t both read 10 and both write 9. `Q()` builds OR/AND trees (`Q(role="admin") | Q(is_staff=True)`).

**Responde (ES):** `F()` evita race de leer-modificar-guardar en Python. `Q()` arma filtros OR complejos.

**Ejemplo:**

```python
# MAL bajo concurrencia
p = Product.objects.get(pk=1)
p.stock -= 1
p.save()

# BIEN
Product.objects.filter(pk=1).update(stock=F("stock") - 1)

from django.db.models import Q
User.objects.filter(Q(is_staff=True) | Q(groups__name="support"))
```

---

### Te preguntan: ¿Índices? ¿Cuándo NO? / Indexes — when not?

**Responde (EN):** Index columns used in `WHERE`, `JOIN`, `ORDER BY`. Each index slows **writes** and uses disk. I don’t index a boolean that’s 50/50 (`is_active`) — the planner won’t use it. I confirm with `EXPLAIN`.

**Responde (ES):** Índice donde filtras/ordenas/juntas. No en columnas poco selectivas. Cada índice encarece INSERT/UPDATE. Verifico con EXPLAIN.

**Ejemplo:**

```python
class Order(models.Model):
    user = models.ForeignKey(User, db_index=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(db_index=True)
    status = models.CharField(max_length=20, db_index=True)

    class Meta:
        indexes = [models.Index(fields=["user", "-created_at"])]  # listado del user
```

---

### Te preguntan: Signals vs service

**Responde (EN):** Signals are implicit — six months later nobody knows *who* sent the email. I call a service (or `transaction.on_commit`) from checkout. Signals are OK for truly cross-app hooks (invalidate cache), not for core money flows.

**Responde (ES):** Signals = magia oculta (“¿quién mandó el mail?”). Checkout explícito en un service. Signal solo para hooks desacoplados de verdad.

**Ejemplo:**

```python
# MAL — post_save en Order dispara email, pago, stock (imposible de seguir)
# BIEN
class OrderService:
    def place(self, data):
        with transaction.atomic():
            order = Order.objects.create(**data)
            transaction.on_commit(lambda: send_order_email.delay(order.id))
        return order
```

---

### Te preguntan: Fat model vs anemic vs service

**Responde (EN):** Tiny invariants on the model (`order.mark_paid()`). Orchestration — payment + inventory + email — in a **service**. I don’t put HTTP, Celery, or Stripe SDKs inside `models.py`.

**Responde (ES):** El model guarda reglas chicas del objeto. El service orquesta varios sistemas. `models.py` no importa Celery ni Stripe.

**Ejemplo:**

```python
# Model: invariante local
class Order(models.Model):
    def mark_paid(self):
        if self.status != "pending":
            raise DomainError("invalid_transition")
        self.status = "paid"

# Service: orquesta
class CheckoutService:
    def checkout(self, order_id, token):
        order = Order.objects.get(pk=order_id)
        self.payments.charge(token, order.total)
        order.mark_paid()
        order.save()
        notify.delay(order.id)
```

---

### Te preguntan: Raw SQL — cuándo / when raw SQL?

**Responde (EN):** When the ORM fights window functions, CTEs (Common Table Expression), or a DBA-tuned report. I still **parameterize** — never f-strings with user input (SQL injection).

**Responde (ES):** Reportes pesados / window functions. Siempre parámetros, nunca concatenar input del usuario.

**Ejemplo:**

```python
# BIEN
Order.objects.raw("SELECT * FROM orders WHERE user_id = %s", [user_id])

# MAL
Order.objects.raw(f"SELECT * FROM orders WHERE user_id = {user_id}")
```

---

## B) DRF (Django REST Framework)

### Te preguntan: Authentication vs permission vs throttle

**Responde (EN):** Three layers. **Authentication** = who are you → **401** if missing/bad token. **Permission** = are you allowed → **403** if you’re a user but not the owner. **Throttle** = how often → **429** Too Many Requests.

**Responde (ES):** Auth = quién eres (401). Permiso = si puedes (403). Throttle = cada cuánto (429).

**Ejemplo:**

```python
# Sin Bearer → 401
# Bearer de Ana pidiendo orden de Luis → 403
# 1000 POST /login en 1 min → 429
```

---

### Te preguntan: Nested writable serializers / serializers anidados de escritura

**Responde (EN):** Creating `Order` + nested `items[]` inside `Serializer.create()` hides transaction boundaries and partial failures (order saved, items boom). I accept a flat/explicit payload and create children in a **service** inside `atomic()`.

**Responde (ES):** Nested write esconde fallos a medias. Mejor payload claro + service + `atomic()`.

**Ejemplo:**

```python
# Payload
{"customer_id": 1, "items": [{"sku": "A", "qty": 2}]}

# Service
with transaction.atomic():
    order = Order.objects.create(customer_id=data["customer_id"])
    for item in data["items"]:
        OrderLine.objects.create(order=order, **item)
```

---

### Te preguntan: Pagination — offset vs cursor

**Responde (EN):** Offset (`LIMIT 20 OFFSET 100000`) is simple and **gets slow** plus pages **shift** when new rows insert. Cursor (`WHERE id > last_id LIMIT 20`) is stable for infinite scroll. Big lists → cursor.

**Responde (ES):** Offset es fácil pero lento y se “mueve” la página. Cursor (`id > último`) es estable a escala.

**Ejemplo:**

```
Offset:  página 500 de un feed → OFFSET 10000  (pesado)
Cursor:  GET /posts?after=abc123 → index seek  (barato)
```

---

### Te preguntan: Filter in view vs serializer / filtrar en el serializer

**Responde (EN):** Filtering belongs in `get_queryset()` / `django-filter` so the **database** filters. A serializer that drops rows in Python after fetching 10k is an N-RAM bug, not a filter.

**Responde (ES):** Filtra en SQL (`get_queryset`). El serializer no es un WHERE.

**Ejemplo:**

```python
def get_queryset(self):
    qs = Order.objects.filter(user=self.request.user)  # SQL
    status = self.request.query_params.get("status")
    if status:
        qs = qs.filter(status=status)
    return qs.select_related("user")

# MAL
# orders = list(Order.objects.all())
# return [o for o in orders if o.user_id == request.user.id]
```

---

### Te preguntan: API versioning / versionar la API

**Responde (EN):** `/api/v1/` is obvious for clients and caches. Header versioning keeps URLs pretty but is harder to see in logs. I **don’t break** JSON: add fields, or bump `/v2/` when I remove/rename.

**Responde (ES):** `/v1/` es explícito. No rompas contratos; suma campos o saca v2.

**Ejemplo:**

```
GET /api/v1/orders   →  { "id", "total" }
GET /api/v2/orders   →  { "id", "total_cents", "currency" }  # breaking change
```

---

## C) FastAPI / async / colas

### Te preguntan: `Depends()` — qué es / what is it?

**Responde (EN):** FastAPI **DI** (Dependency Injection): the framework calls `get_db` / `get_current_user` and injects the result. Tests **override** dependencies instead of patching globals.

**Responde (ES):** Inyecta sesión de BD, usuario, config. En tests sustituyes el Depends — no hay `import db` global.

**Ejemplo:**

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/me")
def me(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return user
```

---

### Te preguntan: `def` vs `async def` en un endpoint

**Responde (EN):** `async def` must **not block** the event loop — no `time.sleep`, no sync SQLAlchemy session in a naive way. A sync `def` runs in a threadpool (OK for Django-style ORM). Blocking I/O inside `async def` stalls **all** requests on that worker.

**Responde (ES):** `async def` no puede bloquear. ORM síncrono dentro de async = atasca el event loop. `def` normal va a un threadpool.

**Ejemplo:**

```python
@app.get("/ok")
def ok():
    return orm_query()          # sync — FastAPI lo manda a threadpool

@app.get("/bad")
async def bad():
    time.sleep(3)               # BLOQUEA el loop — mal
    return {"nope": True}

@app.get("/good")
async def good():
    await httpx_client.get(url) # I/O async — bien
```

---

### Te preguntan: Pydantic vs DRF serializer

**Responde (EN):** Both are **DTOs** (Data Transfer Objects): validate/parse at the HTTP edge. Pydantic is native to FastAPI. DRF serializers also speak ORM (`ModelSerializer`, nested). **Neither** should charge cards or send email — that’s the service.

**Responde (ES):** Los dos validan JSON. DRF se lleva mejor con el ORM. Ninguno es capa de negocio.

**Ejemplo:**

```python
class CreateUser(BaseModel):  # Pydantic
    email: EmailStr
    name: str = Field(max_length=120)

# FastAPI
@app.post("/users")
def create(body: CreateUser):
    return UserService().create(body.model_dump())
```

---

### Te preguntan: At-least-once vs exactly-once (Celery)

**Responde (EN):** After a crash the broker **redelivers** — that’s **at-least-once**. True exactly-once almost doesn’t exist on a queue. I **emulate** it: idempotent handler + unique key (payment id). The queue did not “promise once.”

**Responde (ES):** La cola reentrega si el worker muere (al menos una vez). “Exactamente una” = tu handler idempotente, no magia del broker.

**Ejemplo:**

```
Worker: cobra → CRASH antes del ACK
Broker: reentrega el mismo mensaje
Task:  if Payment.objects.filter(key=k).exists(): return  # no segundo cargo
```

---

### Te preguntan: ACK, retry, DLQ

**Responde (EN):** **ACK** (acknowledge) after success so the message leaves the queue. Fail → retry with backoff. After N failures → **DLQ** (Dead Letter Queue) for humans. Never retry a poison payload forever (`ValidationError`).

**Responde (ES):** ACK al éxito. Fallo transitorio → retry. Tras N → cola de muertos para inspeccionar. Payload inválido no se reintenta eterno.

**Ejemplo:**

```
ok → ACK
timeout → retry 1s, 2s, 4s (max 5)
5xx persistente → DLQ  “invoice-poison”
JSON malformado → NO retry → log + DLQ inmediato
```

---

### Te preguntan: riesgos de `autoretry` SIN backoff

**Responde (EN):** Retry storm: every failure retries **immediately**, hammers the down API, fills workers, grows Redis, can **double-charge**. Use `max_retries` + exponential backoff + **jitter**, only transient errors. Full write-up: `03-fastapi-celery-idempotencia.md`.

**Responde (ES):** Tormenta de reintentos: te haces DDoS a ti mismo. Backoff exponencial + jitter + techo + idempotencia.

**Ejemplo:**

```python
@app.task(autoretry_for=(TimeoutError,), retry_backoff=True, retry_jitter=True, max_retries=5)
def send_invoice(order_id: int): ...
```

---

### Te preguntan: Transactional outbox / outbox transaccional

**Responde (EN):** If you `task.delay()` **inside** `atomic()` before commit, the worker can run and **not see the row**. Outbox: insert `OutboxEvent` in the **same** transaction as the order; a publisher sends to Celery **after** commit (`on_commit` is the lightweight version).

**Responde (ES):** No dispares Celery antes del commit. Evento en la misma transacción → publicar después.

**Ejemplo:**

```python
with transaction.atomic():
    order = Order.objects.create(...)
    Outbox.objects.create(topic="order.created", payload={"id": order.id})
transaction.on_commit(lambda: publish_outbox())  # o delay aquí, post-commit
```

```
MAL: INSERT order + delay() + ROLLBACK  → worker busca order que no existe
```

---

### Te preguntan: CORS (Cross-Origin Resource Sharing)

**Responde (EN):** The browser blocks JS on `localhost:5173` from calling `localhost:8000` unless the API sends CORS headers (`Allow-Origin`, etc.). Allowlist the SPA origin. `*` plus cookies/credentials is invalid/unsafe.

**Responde (ES):** El browser bloquea cross-origin. La API debe permitir el origin del React. No uses `*` con credenciales.

**Ejemplo:**

```
Frontend: http://localhost:5173
API:      http://localhost:8000/api/orders

Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Headers: Authorization, Content-Type
```

---

### Te preguntan: 401 vs 403 vs 404 vs 422

**Responde (EN):** **401** Unauthorized — no/invalid credentials. **403** Forbidden — I know you, you can’t. **404** Not Found — (sometimes also “not yours” so we don’t leak IDs). **422** Unprocessable — validation (`title` too short). Some APIs use 400 instead of 422.

**Responde (ES):** 401 no autenticado. 403 autenticado sin permiso. 404 no existe (o no es tuyo). 422 datos inválidos.

**Ejemplo:**

```
GET /orders/9  sin token           → 401
GET /orders/9  token de otro user  → 404 (no filtrar que existe)
POST /orders   { "title": "ab" }   → 422 { "title": "min 3" }
```

---

## D) React

### Te preguntan: ¿Por qué `key` en listas? / Why `key`?

**Responde (EN):** `key` is identity for reconciliation. Index keys (`key={i}`) **reuse the wrong component** when the list reorders — input state jumps rows. Use a stable id.

**Responde (ES):** `key` dice “este nodo es el mismo item”. Índices se rompen al reordenar; el state se pega a la posición.

**Ejemplo:**

```tsx
// MAL
todos.map((t, i) => <Todo key={i} todo={t} />)
// Reordenas → el input de la fila 0 se queda en la fila 0 (otro todo)

// BIEN
todos.map((t) => <Todo key={t.id} todo={t} />)
```

---

### Te preguntan: Stale closure / closure vieja

**Responde (EN):** A callback/`useEffect` captured `count === 0` from the first render. Later clicks still see 0. Fix: deps array, functional update `setCount(c => c + 1)`, or a ref for the latest value.

**Responde (ES):** La función se “quedó” con el state viejo. Deps correctas o `setState(prev => …)`.

**Ejemplo:**

```tsx
// MAL — count siempre 0 dentro del interval
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []);

// BIEN
useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  return () => clearInterval(id);
}, []);
```

---

### Te preguntan: Context vs React Query vs Zustand

**Responde (EN):** **Context** = rare, small global (theme, `userId`). **React Query** = **server state** (cache, refetch). **Zustand/Redux** = client state that isn’t HTTP (wizard step, UI). Putting `fetch` results in Context re-renders the whole tree on every poll.

**Responde (ES):** Context ≠ cache de API. RQ = datos del servidor. Zustand = estado de UI.

**Ejemplo:**

```
theme, locale          → Context
GET /projects          → useQuery(['projects'])
modalOpen, draft form  → Zustand / useState
```

---

### Te preguntan: Controlled vs uncontrolled input

**Responde (EN):** Controlled: `value={x}` + `onChange` — you can validate and disable Submit. Uncontrolled: `defaultValue` + `ref` — less re-renders, worse for live validation. Login/create forms → controlled.

**Responde (ES):** Controlado = React es la fuente de verdad del input. Uncontrolled = el DOM. Forms con reglas → controlado.

**Ejemplo:**

```tsx
const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />
<button disabled={!email.includes("@")}>Send</button>
```

---

### Te preguntan: Error boundary / frontera de error

**Responde (EN):** A class/`react-error-boundary` catches **render** errors in the subtree and shows a fallback. It does **not** catch `onClick` errors or `fetch` failures — those need try/catch or React Query `error`.

**Responde (ES):** Atrapa crashes de render del hijo, no errores de click ni de API.

**Ejemplo:**

```tsx
<ErrorBoundary fallback={<p>Something broke</p>}>
  <Chart />
</ErrorBoundary>
const { error } = useQuery(...)  // esto es otro canal
```

---

### Te preguntan: Virtualization / virtualización

**Responde (EN):** 20k `<tr>` kill the DOM. Virtualize: only mount visible rows (`react-window`, TanStack Virtual). Same idea as Django `iterator()` — don’t hold everything in the expensive layer.

**Responde (ES):** No montes 20k nodos. Solo las filas visibles.

**Ejemplo:**

```
Scroll lista 50k productos
  sin virtualizar → 50k componentes
  con window     → ~20 filas en DOM + spacer
```

---

### Te preguntan: Custom hook vs Context

**Responde (EN):** A **custom hook** reuses *logic* (`useDebouncedValue`). **Context** shares a *value* down the tree. A hook may *read* context; it doesn’t replace React Query’s cache.

**Responde (ES):** Hook = reutilizar código. Context = pasar un valor a descendientes.

**Ejemplo:**

```tsx
function useAuthUser() {
  return useContext(AuthContext); // hook que USA context
}
```

---

## E) TypeScript

### Te preguntan: `any` vs `unknown`

**Responde (EN):** `any` disables the type checker — `x.foo()` compiles even if `x` is a number. `unknown` is “I don’t know yet”: you must **narrow** (`typeof`, `in`, type guard) before use. Untrusted JSON → `unknown`.

**Responde (ES):** `any` apaga TypeScript. `unknown` obliga a comprobar antes de usar.

**Ejemplo:**

```ts
function parse(raw: string): unknown {
  return JSON.parse(raw);
}
const data = parse(body);
// data.email  → error
if (typeof data === "object" && data && "email" in data) {
  // ok
}
```

---

### Te preguntan: Generics / genéricos

**Responde (EN):** A type parameter `T` lets one function work for many types without `any`. `useQuery<Project[]>` is the same idea: the hook is generic, you fill `Project`.

**Responde (ES):** `T` = “este tipo lo decides al llamar”. Reuso + seguridad.

**Ejemplo:**

```ts
function first<T>(xs: T[]): T | undefined {
  return xs[0];
}
first([1, 2]);          // number
first(["a", "b"]);      // string
```

---

### Te preguntan: `Pick` / `Omit` / `Record`

**Responde (EN):** `Omit<User, "password">` = public DTO. `Pick<User, "id" | "email">` = subset. `Record<string, User>` = map of id → user.

**Responde (ES):** Omit quita keys (esconder password). Pick deja solo algunas. Record tipa un diccionario.

**Ejemplo:**

```ts
type User = { id: string; email: string; password: string };
type PublicUser = Omit<User, "password">;
type Patch = Partial<User>;
type ById = Record<string, User>;
```

---

### Te preguntan: Narrowing / discriminated union

**Responde (EN):** A shared field `ok: true | false` lets TypeScript **narrow**: inside `if (r.ok)` you have `data`, else `error`. Better than one object with all fields optional.

**Responde (ES):** Un campo discriminador (`kind` / `ok`) para que el `if` revele el shape.

**Ejemplo:**

```ts
type Result =
  | { ok: true; data: User }
  | { ok: false; error: string };

function handle(r: Result) {
  if (r.ok) console.log(r.data.email);
  else console.log(r.error);
}
```

---

## F) Arquitectura / producción

### Te preguntan: Horizontal scaling — qué debe ser stateless

**Responde (EN):** App replicas behind a load balancer must **not** keep session in local RAM (request 2 may hit another box). JWT or session in **Redis**. Uploads in **S3**, not disk. Then I add ECS tasks freely.

**Responde (ES):** El API no guarda sesión en la máquina. Redis/JWT + S3. Así escalas copiando containers.

**Ejemplo:**

```
ALB → ECS task A, B, C
session en Redis (no en memoria de A)
archivo en S3 (no /tmp de A)
```

---

### Te preguntan: Connection pooling / pool de conexiones

**Responde (EN):** Opening a Postgres connection is expensive. Each process holds a **pool**. Trap: `gunicorn workers × pool_size` > `max_connections`. Use PgBouncer / smaller pools / `CONN_MAX_AGE`.

**Responde (ES):** Pool por proceso. Muchos workers × pool grande = Postgres se queda sin conexiones.

**Ejemplo:**

```
4 workers × pool 20 = 80 conexiones
RDS max_connections = 80  → el 81 explota
```

---

### Te preguntan: Saga

**Responde (EN):** A business flow **across services** can’t be one `atomic()`. Saga: reserve stock → charge → ship. If charge fails, **compensating** action (release stock). Orchestrated (Step Functions) or choreographed (events).

**Responde (ES):** Transacción larga entre servicios: pasos + compensación si algo falla. No es un `atomic()` local.

**Ejemplo:**

```
1 reserve_stock(order)
2 charge_card(order)     ← falla
3 compensate: release_stock(order)
(no queda stock reservado huérfano)
```

---

### Te preguntan: Eventual consistency / consistencia eventual

**Responde (EN):** Replicas, caches, and queue consumers **lag**. The UI can show “payment pending”. I don’t use Redis as source of truth for **balances**.

**Responde (ES):** El dato “de ahora” puede no estar en cache/réplica todavía. Saldos → BD, no cache.

**Ejemplo:**

```
Write RDS  →  200
Read cache  →  todavía viejo 2s
UI: “processing…” hasta invalidate
```

---

### Te preguntan: JWT access vs refresh

**Responde (EN):** **Access** token: short (5–15 min), sent as Bearer. **Refresh**: longer, rotate, store hashed, HTTPS-only cookie or one-time use. A stolen long-lived access JWT is game over until expiry.

**Responde (ES):** Access corto. Refresh rota y se guarda con cuidado. JWT de 30 días en localStorage = riesgo.

**Ejemplo:**

```
POST /login     → { access: 10min, refresh: 7d }
POST /refresh   → new access (+ rotate refresh)
Access expirado → 401 → frontend refresca
```

---

### Te preguntan: CSRF en SPA + JWT Bearer

**Responde (EN):** CSRF (Cross-Site Request Forgery) exploits **cookies** sent automatically by the browser. A Bearer token in memory/`Authorization` header is **not** sent by a random site. Cookie-session SPAs **still** need CSRF tokens.

**Responde (ES):** CSRF pega si la sesión va en cookie. Bearer en header no lo manda un form de otro dominio. Si usas cookies, sí proteges CSRF.

**Ejemplo:**

```
evil.com → POST bank.com/transfer   (cookie de sesión viaja sola)  → CSRF
evil.com → POST api/transfer        (no tiene tu Bearer)           → no
```

---

### Te preguntan: Mass assignment / asignación masiva

**Responde (EN):** Never `User(**request.data)`. A client can send `"is_staff": true`. Allowlist in the serializer / `validated_data` only.

**Responde (ES):** No volcar el JSON crudo al model. Lista blanca de campos.

**Ejemplo:**

```python
# MAL
User.objects.create(**request.data)

# BIEN
ser = UserCreateSerializer(data=request.data)
ser.is_valid(raise_exception=True)
UserService().create(ser.validated_data)  # sin is_staff
```

---

### Te preguntan: SQL injection si usas ORM

**Responde (EN):** The ORM parameterizes normal QuerySets. Risk comes back with `.raw()`, `.extra()`, `RawSQL`, or f-strings. I never concatenate user input into SQL.

**Responde (ES):** El ORM cubre lo normal. `.raw()` mal hecho vuelve el injection.

**Ejemplo:**

```python
# MAL
User.objects.raw(f"SELECT * FROM users WHERE email = '{email}'")

# BIEN
User.objects.filter(email=email)
User.objects.raw("SELECT * FROM users WHERE email = %s", [email])
```

---

### Te preguntan: Qué testea un senior / what does a senior test?

**Responde (EN):** **Services + DB**: invariants, idempotency, `atomic` rollback. A few API tests: 401, 422, 201. I mock **I/O** (Stripe, SMTP), not every ORM line. I don’t chase 100% view coverage.

**Responde (ES):** Tests de negocio con BD. Smoke HTTP. Mock de pagos/email, no del ORM entero.

**Ejemplo:**

```
test_checkout_twice_same_key_one_charge()
test_list_orders_401_without_token()
test_create_order_422_short_title()
```

---

### Te preguntan: Observabilidad / observability

**Responde (EN):** Three pillars: **logs** with `request_id` / idempotency key, **metrics** (latency, 5xx, queue depth), **traces** on the payment path. “We have CloudWatch logs” is mid; “I can trace this charge id across API → Celery → Stripe” is senior.

**Responde (ES):** Logs correlacionados + métricas + traces. Poder seguir un pago de punta a punta.

**Ejemplo:**

```
log: request_id=abc order_id=9 stripe=ch_...
metric: checkout_latency_ms, celery_queue_depth
trace: API span → charge span → db span
```

---

### Te preguntan: Rate limit dónde / where to rate-limit

**Responde (EN):** Edge/gateway (WAF, ALB, API Gateway) for global abuse. Redis per-user/IP for API quotas. App-level is **defense in depth**, not the only layer (the app may already be overloaded).

**Responde (ES):** Primero en el edge. Redis por usuario. En la app como extra, no como único muro.

**Ejemplo:**

```
Internet → WAF (burst)
        → API Gateway throttle
        → Redis INCR user:42  (100 req/min)
        → FastAPI
```

---

### Te preguntan: Cache invalidation / invalidar cache

**Responde (EN):** Hardest part of cache-aside. Key by resource (`project:{id}`), short **TTL** (Time To Live), **delete on write**. Don’t cache “all orders for everyone” under one key if each user must see their own.

**Responde (ES):** Key por recurso, TTL corto, borrar al escribir. No un solo key global para datos por usuario.

**Ejemplo:**

```python
cache.set(f"project:{id}", payload, ttl=60)
# al update:
cache.delete(f"project:{id}")
```

---

### Te preguntan: SOLID (una frase + ejemplo cada uno)

| Letra | EN | ES | Ejemplo |
|-------|----|----|---------|
| **S**RP | One reason to change | Una razón de cambio | Serializer ≠ cobrar |
| **O**CP | Extend without editing a giant `if` | Extiende, no un `if paypal` eterno | Strategy PayPal/Stripe |
| **L**SP | Subtype doesn’t break callers | El subtipo no rompe al padre | `CnnApi` cumple `NewsSource` |
| **I**SP | Small interfaces | Interfaces chicas | No `GodService.do_everything` |
| **D**IP | Depend on abstractions | Depende de abstracciones | `PaymentGateway`, no `Stripe()` hardcode |

---

## G) Diseño (te tiran un caso)

### Te preguntan: diseño `POST /orders` a escala

**Responde (EN):** Validate DTO → **Idempotency-Key** → `atomic` (order + outbox) → **201** → worker charges with backoff → events. Reads: pagination + `select_related`. Cache the **catalog**, not the write path.

**Responde (ES):** Validar → key idempotente → transacción pedido+outbox → 201 → worker cobra → eventos. Lecturas paginadas. Cache de catálogo, no del POST.

**Ejemplo (flujo):**

```
Client + Idempotency-Key
  → API validate 422
  → unique key hit? return cached 201
  → INSERT order + outbox
  → 201 { order_id }
  → Celery charge (idempotent, backoff)
  → GET /orders?cursor=  select_related
```

---

### Te preguntan: feed / list de 1M rows

**Responde (EN):** Cursor pagination, covering indexes, don’t `COUNT(*)` every time (approximate or omit total), `only()` columns, CDN for public feeds. `iterator()` if exporting.

**Responde (ES):** Cursor, índices, no COUNT caro, pocas columnas, cache/CDN si es público.

**Ejemplo:**

```
GET /feed?after=01HZX...&limit=30
INDEX (created_at DESC, id)
no SELECT *
```

---

### Te preguntan: webhook de Stripe

**Responde (EN):** Verify **signature**, unique `event.id` (idempotent), return **200 fast**, heavy work in **Celery**. Stripe **will retry** — that’s expected; your handler must tolerate duplicates.

**Responde (ES):** Verifica firma, no proceses el mismo `event.id` dos veces, 200 rápido, el trabajo pesado en cola.

**Ejemplo:**

```python
if WebhookEvent.objects.filter(id=event.id).exists():
    return {"ok": True}  # 200, sin rehacer
WebhookEvent.objects.create(id=event.id)
process_payment.delay(event.id)
return {"ok": True}
```

---

## Cómo usarlo

| Tiempo | Qué |
|--------|-----|
| 0 | P0 (`01`–`04` + `06-scripts`) |
| +20 min | Esta ficha **A + B + C** |
| +15 min | **D + E** |
| Extra | **F + G** |

Si no sabes el API exacto:  
**EN:** “I’d check the docs. The trade-off is X vs Y.”  
**ES:** “No me sé el flag de memoria; el trade-off que miraría es X vs Y.”
