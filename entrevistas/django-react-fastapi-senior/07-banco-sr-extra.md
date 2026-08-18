# 07 — Banco extra Senior (relacionadas, no solo las de esa ronda)

> **Sí: hay más.** Las de `01`–`04` son las que **ya te hicieron**.  
> Esta ficha es el **follow-up típico SR** si profundizan. Mismo formato: te preguntan → responde → justifica.

No memorices las 40 de golpe. Tras P0, recorre **por área** (Django → FastAPI → React/TS → arquitectura).

---

## A) Django ORM / DB (extensión de iterator, prefetch, atomic)

### Te preguntan: ¿Un QuerySet es lazy?

**Responde:** Yes — it doesn’t hit the DB until you evaluate it (`list()`, `for`, `len` on a cached QS, slice in some cases). That’s why I can chain `.filter().exclude()` cheaply.

```python
qs = User.objects.filter(active=True)  # 0 SQL
qs = qs.order_by("id")                 # 0 SQL
print(qs[0])                           # 1 SQL
```

---

### Te preguntan: `exists()` vs `count()` vs `len(qs)` vs `bool(qs)`

**Responde:** `exists()` → `SELECT 1 … LIMIT 1`. `count()` → `COUNT(*)`. `len(qs)` / `bool(qs)` evaluate and **cache** the full result if not cached — expensive on big sets.

---

### Te preguntan: `only()` / `defer()`

**Responde:** Load fewer columns to cut memory/IO. Accessing a deferred field later fires another query — don’t `only("id")` then use `user.email` in a loop (hidden N+1).

---

### Te preguntan: `get_or_create` — race?

**Responde:** Two requests can both miss and both insert. I put a **unique constraint** on the natural key; catch `IntegrityError` and `get()` again. Same idea as idempotency keys.

---

### Te preguntan: `select_for_update` vs version column

**Responde:** Pessimistic: `SELECT … FOR UPDATE` inside `atomic()` — lock the row (stock, wallet). Optimistic: `version` / `updated_at` and `UPDATE … WHERE version=n` — better when conflicts are rare.

---

### Te preguntan: `F()` / `Q()`

**Responde:** `F("stock") - 1` updates in SQL without read-modify-write races in Python. `Q` composes OR filters. I avoid `obj.stock -= 1; obj.save()` under concurrency.

---

### Te preguntan: ¿Índices? ¿Cuándo NO?

**Responde:** Index columns in `WHERE`, `JOIN`, `ORDER BY`. Each index slows writes and uses disk. I don’t index a boolean with 50/50 distribution. I confirm with `EXPLAIN`.

---

### Te preguntan: Signals vs service

**Responde:** Signals are implicit — hard to debug (“who sent the email?”). I prefer an explicit service call or `on_commit`. Signals OK for cross-app truly decoupled hooks, not for core checkout.

---

### Te preguntan: Fat model vs anemic vs service

**Responde:** Small invariants on the model (`order.mark_paid()`). Orchestration (payment + inventory + email) in a service. I don’t put HTTP or Celery inside `models.py`.

---

### Te preguntan: Raw SQL — cuándo

**Responde:** When the ORM fights a window function, CTE (Common Table Expression), or a tuned report. I still parameterize — never f-strings with user input.

---

## B) DRF (extensión de “no lógica en serializer”)

### Te preguntan: Authentication vs permission vs throttle

**Responde:** Auth = *who are you* (401). Permission = *are you allowed* (403). Throttle = *how often* (429). Three different layers.

---

### Te preguntan: Nested writable serializers

**Responde:** Nested writes hide transactions and partial failures. I accept a flat payload or explicit IDs and create children in the **service** inside `atomic()`.

---

### Te preguntan: Pagination — offset vs cursor

**Responde:** Offset (`LIMIT/OFFSET`) is simple and breaks on large offsets + inserts shifting pages. Cursor (`id__gt` / timestamp) is stable for infinite scroll. List APIs at scale → cursor.

---

### Te preguntan: Filter in view vs serializer

**Responde:** Filtering belongs in `get_queryset()` / FilterSet, not in Python after fetching 10k rows. Serializer doesn’t filter the DB.

---

### Te preguntan: API versioning

**Responde:** URL `/v1/` is explicit. Header versioning is cleaner URLs, harder to cache. I don’t break JSON contracts; I add fields or version.

---

## C) FastAPI / async / colas (extensión Celery + idempotencia)

### Te preguntan: `Depends()` — qué es

**Responde:** FastAPI’s DI (Dependency Injection): inject DB session, current user, settings. Testable — override dependencies. Same idea as “don’t import globals.”

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/me")
def me(user: User = Depends(get_current_user)):
    ...
```

---

### Te preguntan: `def` vs `async def` en un endpoint

**Responde:** `async def` must not block — no `time.sleep`, no sync SQLAlchemy without care. A sync `def` runs in a threadpool. Mixing blocking ORM inside `async def` stalls the event loop.

---

### Te preguntan: Pydantic vs DRF serializer

**Responde:** Pydantic (v2) validates/parses types at the edge — FastAPI’s default. DRF serializers also know ORM instances and `ModelSerializer`. Both are DTOs; neither is a service layer.

---

### Te preguntan: At-least-once vs exactly-once en Celery

**Responde:** Brokers are **at-least-once** after a crash (re-delivery). Exactly-once is emulated with **idempotent handlers** + unique keys, not with “the queue promised once.”

---

### Te preguntan: ACK, retry, DLQ

**Responde:** Ack after success. Fail → retry with backoff. After N fails → DLQ (Dead Letter Queue) for inspection. Never retry forever on a poison payload.

---

### Te preguntan: ¿riesgos de autoretry SIN backoff?

**Responde:** Retry storm: all failures retry at once, hammer the down dependency, saturate workers, grow the queue, duplicate charges if not idempotent. Use `max_retries` + exponential backoff + jitter, only on transient errors. Detail: `03-fastapi-celery-idempotencia.md` sección 2.

---

### Te preguntan: Transactional outbox

**Responde:** Don’t `delay()` inside `atomic()` before commit — worker may run before the row exists. Write event to an `outbox` table in the same transaction, then a publisher sends to the broker (`on_commit` is the lightweight version).

---

### Te preguntan: CORS

**Responde:** Browser blocks JS from another origin unless the API sends CORS (Cross-Origin Resource Sharing) headers. SPA (Single-Page Application) on `localhost:5173` talking to `:8000` needs an allowlist — not `*` with credentials.

---

### Te preguntan: 401 vs 403 vs 404 vs 422

**Responde:** 401 missing/bad credentials. 403 authenticated but forbidden. 404 not found (sometimes also “not yours” to avoid leaking IDs). 422 validation (or 400).

---

## D) React (extensión useMemo / RQ)

### Te preguntan: ¿Por qué `key` en listas?

**Responde:** Reconciliation identity. Index keys break when the list reorders — state jumps rows. Stable ids.

---

### Te preguntan: Stale closure

**Responde:** An effect or callback captured old state. Fix: correct deps, functional `setState(s => s+1)`, or a ref for the latest value.

---

### Te preguntan: Context vs React Query vs Zustand

**Responde:** Context = rare global (theme, auth user id). React Query = server cache. Zustand/Redux = client state that isn’t HTTP. Don’t put fetch results in Context — every consumer re-renders.

---

### Te preguntan: Controlled vs uncontrolled input

**Responde:** Controlled: `value` + `onChange` (validation, disable submit). Uncontrolled: `defaultValue` + ref. Forms with rules → controlled.

---

### Te preguntan: Error boundary

**Responde:** Catches render errors in the subtree, not event handlers or async by default. Pair with RQ `error` on fetches.

---

### Te preguntan: Virtualization

**Responde:** Don’t mount 20k DOM nodes. `react-window` / TanStack Virtual — only visible rows.

---

### Te preguntan: Custom hook vs Context

**Responde:** Hook = reuse logic. Context = share a value down the tree. A hook can *use* context; it doesn’t replace cache.

---

## E) TypeScript (extensión Partial / union / &)

### Te preguntan: `any` vs `unknown`

**Responde:** `any` turns the type system off. `unknown` forces narrowing before use — that’s what I use for untrusted JSON.

---

### Te preguntan: Generics

**Responde:** `function first<T>(xs: T[]): T | undefined` — reuse with type safety. React Query `useQuery<Project[]>` is the same idea.

---

### Te preguntan: `Pick` / `Omit` / `Record`

**Responde:** `Omit<User, "password">` for public DTOs. `Pick` for a subset. `Record<Id, User>` for maps.

---

### Te preguntan: Narrowing / discriminated union

**Responde:** Shared field `kind: "ok" | "err"` so `if (r.kind === "ok")` reveals `data`. Better than optional fields on one blob.

---

## F) Arquitectura / producción (extensión patrones)

### Te preguntan: Horizontal scaling — qué debe ser stateless

**Responde:** App servers don’t keep session in local memory. Session/JWT + Redis. Uploads to S3. Then I can add replicas behind a load balancer.

---

### Te preguntan: Connection pooling

**Responde:** DB connections are expensive. A pool per process (PgBouncer / Django CONN_MAX_AGE). Too many workers × pool size exhausts Postgres.

---

### Te preguntan: Saga

**Responde:** Long business flow across services: reserve stock → charge → ship. If charge fails, compensating action (release stock). Not a single local `atomic()`.

---

### Te preguntan: Eventual consistency

**Responde:** Replica/cache/queue consumers lag. UI may read “pending”. I don’t pretend a cache is the source of truth for balances.

---

### Te preguntan: JWT access vs refresh

**Responde:** Short access token (minutes). Refresh rotates via HTTPS-only cookie or a one-time refresh token stored hashed. Stolen long-lived JWT = game over.

---

### Te preguntan: CSRF en SPA + JWT Bearer

**Responde:** CSRF (Cross-Site Request Forgery) hits cookie-authenticated forms. Pure `Authorization: Bearer` from memory isn’t sent by random sites. Cookie-based session/SPA still needs CSRF protection.

---

### Te preguntan: Mass assignment

**Responde:** Never `Model(**request.data)`. Allowlist fields in serializer/`validated_data`. Don’t let `is_staff=true` through.

---

### Te preguntan: SQL injection si usas ORM

**Responde:** ORM parameterizes. Risk returns with `.raw()`, `extra()`, or f-string SQL. I still never concatenate user input.

---

### Te preguntan: Qué testea un senior

**Responde:** Services + DB (invariants, idempotency). Few API tests: 401, 422, 201. I don’t mock the ORM for every line; I mock **I/O** (Stripe, email).

---

### Te preguntan: Observabilidad

**Responde:** `request_id` in logs, metrics (latency, 5xx, queue depth), traces on payment path. “Logs in CloudWatch” is mid; “SLO + trace the idempotency key” is senior.

---

### Te preguntan: Rate limit dónde

**Responde:** Gateway / reverse proxy for global abuse; Redis per-user for API quotas. App-level as defense in depth, not the only layer.

---

### Te preguntan: Cache invalidation

**Responde:** Hardest part of cache aside. I key by resource (`project:{id}`), short TTL, invalidate on write. I don’t cache user-specific lists with one global key.

---

### Te preguntan: SOLID en una frase cada uno

| | |
|--|--|
| **S**RP | Una razón de cambio — serializer ≠ cobros |
| **O**CP | Extiende con Strategy, no un `if paypal` eterno |
| **L**SP | Subtipo no rompe al caller (scraper vs API client) |
| **I**SP | Interfaces chicas — no un God Service |
| **D**IP | Depende de `PaymentGateway`, no de Stripe concreto |

---

## G) Preguntas de diseño (te dan un caso)

### Te preguntan: diseño “POST /orders” a escala

**Responde (esqueleto):** Validate → idempotency key → `atomic` (order + outbox) → 201 → worker cobra → events. Read path paginated + `select_related`. Cache product catalog, not the order write.

---

### Te preguntan: feed / list de 1M rows

**Responde:** Cursor pagination, covering indexes, don’t `COUNT(*)` every request (approx or skip total), `only()` columns, CDN/cache for public.

---

### Te preguntan: webhook de Stripe

**Responde:** Verify signature, unique `event.id`, process idempotently, 200 fast, heavy work in Celery. Retries from Stripe are expected.

---

## Cómo usarlo mañana

| Tiempo | Qué |
|--------|-----|
| 0 | P0 (`01`–`04` + scripts) |
| +20 min | Esta ficha: **A + B + C** (mismo stack que ya te preguntaron) |
| +15 min | **D + E** si hay React/TS round 2 |
| Extra | **F + G** si es system design |

Frase si sale algo que no está aquí:  
> “I don’t know that API by heart — I’d check docs. The trade-off I’d look at is X vs Y.”
