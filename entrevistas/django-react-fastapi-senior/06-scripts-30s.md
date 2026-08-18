# 06 — Scripts de 30 segundos (ensayar en voz alta)

Di cada bloque **sin leer**. Si tartamudeas, acorta a la primera frase + un “because”.

---

### 1. QuerySet vs iterator

A QuerySet caches rows in memory so I can reuse them without extra SQL. `iterator()` streams and skips that cache, so RAM stays flat on large exports. Small lists: QuerySet. 100k CSV: iterator.

---

### 2. select_related vs prefetch_related

`select_related` is a SQL JOIN — ForeignKey and OneToOne. `prefetch_related` is a second query plus stitching in Python — Many-to-Many and reverse relations, where a JOIN would explode rows.

---

### 3. transaction.atomic / ACID Atomicity

`atomic()` is a unit of work: all inserts commit or none do. I wrap create-order plus create-payment so a failure doesn’t leave a paid-looking order without a payment row.

---

### 4. No business logic in serializers

Serializers validate and shape JSON. Emails, charges, and multi-model workflows live in a service so I can call them from Celery or tests without HTTP.

---

### 5. Modularize a 3000-line file

I split by responsibility — models, serializers, services, views — not by line count. I extract services first because that’s what hurts testing.

---

### 6. When NOT to modularize

A tiny CRUD doesn’t need a file per verb. Extra modules cost navigation. I split when coupling or mixed concerns show up, not “just in case.”

---

### 7. BackgroundTasks vs Celery

BackgroundTasks run in the same process after the response — fine for cheap, lossy work. Celery uses a durable queue, retries, and workers. Payments and invoices go to Celery.

---

### 7b. Autoretry without backoff

That’s a retry storm. Failed tasks immediately hit the same sick API again, fill workers, and can double-charge. I cap retries, exponential backoff plus jitter, only transient errors, and the task must be idempotent.

---

### 8. Idempotent payment if the worker dies

Client sends `Idempotency-Key`. I store key → result with a unique constraint. Retries return the same payload. The Celery task also keys on that id so a restart doesn’t double-charge.

---

### 9. useMemo vs useCallback vs React Query

useMemo caches a value, useCallback a function reference. React Query caches **server** state — retries, invalidation. They don’t replace each other.

---

### 10. Optional fields / union / intersection

`age?: number` or `Partial<User>` for PATCH. Union `A | B` is either-or. Intersection `A & B` must satisfy both — I use unions for result states and intersections to compose types.

---

### 11. exists vs count vs len (follow-up ORM)

`exists()` is LIMIT 1. `count()` is COUNT(*). `len(queryset)` pulls and caches rows — don’t use it to check emptiness on a huge table.

---

### 12. Auth vs permission vs 401/403

Authentication is who you are — 401. Permission is what you can do — 403. Validation errors are 422.

---

### 13. Depends / def vs async def

FastAPI Depends is DI for db and user. async def must not block; sync ORM inside async stalls the event loop.

---

### 14. At-least-once queues

Celery redelivers after a crash. Exactly-once is an idempotent handler plus a unique key, not a broker guarantee.

---

### 15. Cursor pagination

Offset pages get slow and shift when rows insert. For large lists I paginate with a cursor on id or timestamp.

---

## Mini-ruta 10 minutos antes de entrar

1. Atomic = todo o nada.  
2. Serializer ≠ service.  
3. JOIN vs 2 queries.  
4. Cola persistente vs mismo proceso.  
5. Idempotency-Key.  
6. RQ = server state.  
7. `|` vs `&`.  
8. exists ≠ len.  
9. 401 vs 403.  
10. Queue = at-least-once → idempotente.  
11. Imagen ECS grande = slim + multi-stage + solo runtime.  
12. ECS API, RDS datos, Lambda eventos, S3 archivos, SQS colas.
