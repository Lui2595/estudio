# Area 5 — System Design, Database & Scenarios

> Scenario questions for voice interviews — they test **how you think**, not diagrams.

## Abbreviations (with meanings)

- REST (Representational State Transfer)
- API (Application Programming Interface)
- JWT (JSON Web Token)
- SQL (Structured Query Language)
- NoSQL (Not Only SQL)
- ACID (Atomicity, Consistency, Isolation, Durability)
- N+1 (One Query for List + N Queries for Relations)
- CI/CD (Continuous Integration / Continuous Delivery)
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)

---

## P: Design a REST API for a todo app.

**R:**
"Resources: users, todos. CRUD `/api/v1/todos` with JWT — user sees only their data. Pagination, filtering by status. 201 create, 204 delete, 400 validation, 401 unauthorized. PATCH partial, PUT full replace. OpenAPI contract for frontend."

---

## P: SQL vs NoSQL — how do you choose?

**R:**
"SQL — relationships, ACID, complex queries, reporting — PostgreSQL default. NoSQL document — flexible schema, horizontal writes, nested reads — MongoDB. Polyglot common: Postgres core, Redis cache, S3 files."

---

## P: What is ACID?

**R:**
"Atomicity — all or nothing. Consistency — valid state. Isolation — concurrent txs safe. Durability — committed survives crash. Critical for payments, inventory."

---

## P: Database indexes — help and hurt?

**R:**
"Help WHERE, JOIN, ORDER BY. Hurt writes, storage, wrong unused indexes. Composite index column order matters. EXPLAIN to verify Index Scan vs Seq Scan."

---

## P: N+1 problem in APIs?

**R:**
"One list query plus N relation queries. Fix: JOIN or ORM eager load. Huge latency win. Same in SQL and MongoDB if you loop queries."

---

## P: Database relationships — 1:N and N:M?

**R:**
"1:N — FK on many side: orders.customer_id. N:M — junction table enrollments(student_id, course_id) with composite PK. Always index FK columns. See `ejemplos/database-relations.sql`."

---

## P: Foreign keys — ON DELETE CASCADE vs RESTRICT?

**R:**
"RESTRICT — block delete if children exist — orders. CASCADE — auto-delete children — junction rows. SET NULL — optional relations. Match business rules in migrations."

---

## P: Caching strategy?

**R:**
"Browser cache for hashed static assets. CDN CloudFront. Redis for sessions, hot API responses, rate limits. Cache-aside: read cache, miss hits DB, set TTL, invalidate on write."

---

## P: Redis use cases?

**R:**
"Sessions, API cache, pub/sub, rate limiting, distributed locks, job queues. Always TTL — avoid stale forever."

---

## P: Microservices vs monolith?

**R:**
"Start modular monolith — simpler deploy/debug. Microservices when independent scale, team boundaries justify ops cost. Don't split prematurely."

---

## P: API observability?

**R:**
"Structured JSON logs with request ID. Metrics: latency p95, error rate. OpenTelemetry tracing. /health for load balancer. Alert on SLO breach."

---

## P: CI/CD for full stack?

**R:**
"PR: lint, test, build. Staging deploy on merge. Prod with approval. Env per stage. Migrations in pipeline with rollback plan. Feature flags for risky releases."

---

## P: Docker — why?

**R:**
"Same env dev to prod. Multi-stage small images. docker-compose local — API, DB, Redis. K8s when orchestration at scale needed."

---

## P: XSS, CSRF, SQL injection prevention?

**R:**
"SQL: parameterized queries only. XSS: escape output, CSP. CSRF: SameSite cookies, CSRF token on cookie auth. Validate server-side always."

---

## P: Horizontal vs vertical scaling?

**R:**
"Vertical — bigger machine, limited. Horizontal — more instances behind ALB, stateless app, shared Redis/JWT. Read replicas for read scale."

---

## P: REST vs GraphQL?

**R:**
"REST — simple resources, HTTP caching. GraphQL — flexible fields, less over-fetching — harder caching, resolver N+1 without DataLoader. REST unless client flexibility is main pain."

---

## Voice scenarios

**P: API returns 502 under traffic.**

**R:**
"ALB target health? ECS tasks OOM? CloudWatch logs. DB connection pool exhausted? Autoscale. Circuit breaker on downstream. Load test reproduce."

---

**P: Duplicate charges on payment.**

**R:**
"Missing idempotency keys on POST. Client disables button. Server stores Idempotency-Key with cached response. Payment provider idempotency. Unique constraint on key. See `ejemplos/idempotency-key-handler.js`."

---

**P: Migrate monolith to React SPA + API on AWS.**

**R:**
"Strangler — new features on API plus React. S3 plus CloudFront for SPA. API on ECS Fargate, RDS private subnet. Shared DB initially. Feature flags per route. JWT auth."

---

**P: Real-time notifications.**

**R:**
"WebSockets or SSE. Redis pub/sub multi-instance. Auth on connection. Fallback polling. Don't open WS without auth."

---

**P: Slow query in production.**

**R:**
"EXPLAIN ANALYZE. Seq Scan on big table → index. N+1 in app → eager load. Deep OFFSET → cursor pagination. Recent migration missing index?"

---

## Senior topics (deep dive)

→ `07-architecture-senior.md` — idempotency, saga, CAP, optimistic locking  
→ `06-aws.md` — S3, RDS, ECS, CloudFront  
→ `ejemplos/database-relations.sql`  
→ `ejemplos/sql-debug-slow-query.sql`

## Related material

→ `../mysql/00-preguntas-respuestas.md`  
→ `../postgres/00-preguntas-respuestas.md`  
→ `../mongodb/00-preguntas-respuestas.md`
