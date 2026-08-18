# Area 7 — Senior Architecture (Idempotency, Relations, Patterns)

> These topics separate **Senior** from Mid. Answer with trade-offs and real examples.

## Abbreviations (with meanings)

- HTTP (Hypertext Transfer Protocol)
- UUID (Universally Unique Identifier)
- DB (Database)
- TTL (Time To Live)
- FK (Foreign Key)
- ACID (Atomicity, Consistency, Isolation, Durability)
- CAP (Consistency, Availability, Partition Tolerance)
- CQRS (Command Query Responsibility Segregation)
- API (Application Programming Interface)
- SaaS (Software as a Service)

---

## Idempotency

### P: What is idempotency and why does it matter?

**R:**
"An operation is idempotent if calling it once or multiple times has the same effect. Critical for payments, order creation, webhooks — networks retry, clients double-submit. Without idempotency you charge twice or create duplicate orders. HTTP: GET, PUT, DELETE are idempotent; POST is not by default — you add idempotency keys."

---

### P: How do you implement idempotency keys?

**R:**
"Client sends `Idempotency-Key` header — UUID — on POST. Server stores key plus response in Redis or DB with TTL — 24 hours. First request: process, store result. Duplicate key: return cached response, don't re-execute. Unique constraint on key column prevents race conditions. Return same status code and body."

---

### P: Idempotency vs deduplication?

**R:**
"Idempotency — same request intent, safe retry, same outcome. Deduplication — detect duplicate events in a stream — e.g. same webhook delivered twice. Both use unique IDs; idempotency is API contract, dedup is consumer-side in event processing."

---

### P: Webhook handler — how do you make it safe?

**R:**
"Verify signature — HMAC from provider. Store event ID with unique constraint — skip if seen. Process in transaction. Return 200 quickly; heavy work async via queue. Retry from provider is expected — handler must be idempotent."

---

## Database relations

### P: Explain 1:1, 1:N, N:M with examples.

**R:**
"**1:1** — User and UserProfile — rare, split optional heavy columns. **1:N** — Customer has many Orders — FK `orders.customer_id`. **N:M** — Students and Courses — junction table `enrollments(student_id, course_id)` with composite PK or surrogate id. ORM: belongsTo, hasMany, belongsToMany."

---

### P: Foreign keys — why use them?

**R:**
"Referential integrity — can't delete customer with open orders if RESTRICT. CASCADE delete children when parent removed — use carefully. ON DELETE SET NULL for optional relations. Without FKs, app bugs leave orphan rows — data corruption."

---

### P: ON DELETE CASCADE vs RESTRICT vs SET NULL?

**R:**
"**RESTRICT** — block delete if children exist — safest default for orders. **CASCADE** — delete children automatically — OK for join table rows. **SET NULL** — optional relation, keep child orphan with null FK. Senior: choose based on business rules, document in migrations."

---

### P: Embedding vs referencing (SQL vs document DB)?

**R:**
"**Embed** — read together, bounded size — address inside user document in MongoDB. **Reference** — shared entity, unbounded growth — post references author_id. SQL normalizes with FKs; MongoDB you choose per access pattern. N+1 hits both if you don't eager load."

---

### P: Soft delete vs hard delete?

**R:**
"Soft delete — `deleted_at` column, filter in queries, recoverable, audit trail. Hard delete — GDPR right to erasure, truly remove. Index `deleted_at` or partial index `WHERE deleted_at IS NULL`. Unique constraints need care — unique on email only where not deleted."

---

### P: Database normalization vs denormalization?

**R:**
"Normalize to 3NF — no duplicate data, update anomalies avoided. Denormalize for read performance — store `order_count` on user, `total` on order snapshot. Senior: normalize first, denormalize with measured need — cache or materialized view often enough."

---

## Distributed systems

### P: CAP theorem — practical meaning?

**R:**
"In a partition, choose Consistency or Availability. CP — wait for sync, may reject writes — banking. AP — accept writes, reconcile later — social feeds. Most web apps pick AP with eventual consistency for non-critical reads, strong consistency for payments via transactions."

---

### P: At-least-once vs exactly-once delivery?

**R:**
"Message queues are at-least-once — consumer can see duplicate. Exactly-once is hard — use idempotent consumers plus dedup keys. Kafka idempotent producer helps. Senior: design for at-least-once plus idempotent handlers, not pretend exactly-once everywhere."

---

### P: Saga pattern for distributed transactions?

**R:**
"Split cross-service transaction into local transactions plus compensating actions. Choreography — events between services. Orchestration — central coordinator. Example: reserve inventory → charge payment → if payment fails, release inventory. Better than 2PC across microservices."

---

### P: Circuit breaker pattern?

**R:**
"Stop calling failing downstream after threshold — fail fast, return fallback or cached data. States: closed, open, half-open probe. Prevents cascade failure. Libraries: opossum in Node, resilience4j in Java. Pair with timeouts and retries with exponential backoff."

---

### P: Event-driven architecture — when?

**R:**
"Decouple services — order placed event triggers email, inventory, analytics. SQS/SNS, Kafka, RabbitMQ. Trade-offs: harder debugging, eventual consistency, need idempotent consumers. Good when domains are independent and scale separately."

---

### P: CQRS — when would you use it?

**R:**
"Separate read and write models — writes to normalized DB, reads from denormalized view or cache. For high read/write asymmetry or complex reporting. Cost: complexity, sync lag. Overkill for CRUD apps — mention you'd only adopt with clear scaling pain."

---

## API design (Senior)

### P: How do you version a breaking API change?

**R:**
"URL `/v2/` or header `Accept: application/vnd.api+json;version=2`. Run v1 and v2 parallel during migration. Deprecation header plus timeline. Never break mobile clients without notice. Feature flags for gradual rollout."

---

### P: Pagination — offset vs cursor?

**R:**
"Offset `LIMIT/OFFSET` — simple, slow on deep pages, inconsistent if data shifts during paging. Cursor — `WHERE id > last_id ORDER BY id LIMIT 20` — stable, fast, no page numbers. Senior default: cursor for infinite scroll and large tables."

---

### P: Rate limiting strategies?

**R:**
"Token bucket or sliding window per IP, user, API key. 429 plus Retry-After header. Redis for distributed limit across instances. Stricter on auth endpoints. Different tiers for partners."

---

### P: How do you handle concurrent updates to the same record?

**R:**
"Optimistic locking — `version` column, UPDATE WHERE id AND version; 409 if conflict. Pessimistic — SELECT FOR UPDATE in transaction for inventory. Last-write-wins is dangerous for financial data. UI: show conflict, let user merge."

---

## Twelve-Factor App (quick Senior checklist)

1. Codebase — one repo per app  
2. Dependencies — explicit, isolated  
3. Config — env vars, not hardcoded  
4. Backing services — attachable resources (RDS, S3)  
5. Build, release, run — separate stages  
6. Processes — stateless, share nothing  
7. Port binding — self-contained HTTP  
8. Concurrency — scale out processes  
9. Disposability — fast startup, graceful shutdown  
10. Dev/prod parity  
11. Logs — stdout, aggregated  
12. Admin — one-off tasks as processes  

---

## Voice scenarios (Senior)

**P: User double-clicks Pay and gets charged twice.**

**R:**
"Missing idempotency on payment POST. Fix: client disables button plus server idempotency key. Payment provider may support idempotency keys too. Reconcile duplicates in support tooling. Audit log per charge attempt."

---

**P: Order service and inventory service out of sync.**

**R:**
"Likely eventual consistency without compensation. Move to saga: reserve stock, create order, confirm payment, commit stock; on failure release reservation. Or single transaction in monolith if still modular monolith. Event sourcing for audit if domain requires it."

---

**P: How do you design schema for multi-tenant SaaS?**

**R:**
"Options: shared DB shared schema with `tenant_id` on every row — simple, row-level security. Schema per tenant — isolation, harder ops. DB per tenant — max isolation, expensive. Most start shared schema plus tenant_id plus indexes on tenant_id. Never leak cross-tenant data — filter every query."

---

## Code examples

→ `ejemplos/idempotency-key-handler.js`  
→ `ejemplos/database-relations.sql`  
→ `ejemplos/aws-s3-presigned-upload.js`

## Related material

→ `05-area-system-design-db.md`  
→ `06-area-aws.md`  
→ `../mysql/05-diseno/01-normalizacion.sql`
