# Area 4 — Python Backend

> If your stack is Python + React. FastAPI/Django most common.

## Abbreviations (with meanings)

- API (Application Programming Interface)
- GIL (Global Interpreter Lock)
- ORM (Object-Relational Mapping)
- JWT (JSON Web Token)
- RBAC (Role-Based Access Control)
- DB (Database)
- CPU (Central Processing Unit)
- I/O (Input/Output)

---

## P: FastAPI vs Django — when?

**R:**
"FastAPI: APIs, async, OpenAPI, Pydantic — microservices. Django: admin, ORM, auth, batteries — full product. React SPA backend: FastAPI or Django REST Framework by team and scale."

---

## P: How does async work in Python (asyncio)?

**R:**
"async def coroutine; await yields during I/O. Event loop schedules. Great for I/O-bound. CPU-bound → multiprocessing or workers. FastAPI async on uvicorn; sync routes in thread pool."

---

## P: What is the GIL?

**R:**
"Global Interpreter Lock — one thread executes bytecode per process. Matters for CPU multithreading. Less critical for I/O-bound web — async or multiple gunicorn workers."

---

## P: Validate request data in FastAPI?

**R:**
"Pydantic models on params and body — auto 422. Dependency injection for DB session and current user. Separate Create/Update/Response schemas — never expose password hash."

---

## P: Django ORM N+1 problem?

**R:**
"N parents plus N child queries. Fix: select_related (FK JOIN), prefetch_related (M2M/reverse). Same as Eloquent eager loading."

---

## P: Authentication in Python API?

**R:**
"JWT with PyJWT/python-jose, or Django sessions. bcrypt/argon2 passwords. RBAC via permissions or FastAPI dependencies checking roles."

---

## P: SQLAlchemy session pattern?

**R:**
"One session per request — yield dependency. commit on success, rollback on exception, always close. No global long-lived sessions."

---

## P: Project structure?

**R:**
"routers, services, repositories, schemas. pydantic-settings from env. pytest mirrors src layout."

---

## P: Celery — when?

**R:**
"Email, reports, heavy processing. Redis/RabbitMQ broker. Don't block HTTP. Idempotent tasks with dedup keys."

---

## P: Type hints — why?

**R:**
"mypy/pyright, IDE support, self-documenting. Expected in FastAPI codebases."

---

## P: Test Python APIs?

**R:**
"pytest plus httpx TestClient (FastAPI) or DRF APIClient. DB rollback per test. Mock externals. Test 401, 422, 201."

---

## P: Decorators — real use case?

**R:**
"@app.get, @login_required, @retry, @cache. Wrap function for cross-cutting behavior."

---

## P: Context managers (with)?

**R:**
"Guaranteed setup/teardown — files, DB transactions, locks. __enter__/__exit__ or contextlib.contextmanager."

---

## Voice scenarios

**P: Endpoint slow under load.**

**R:**
"py-spy or APM. EXPLAIN ANALYZE, indexes, N+1. Connection pooling. Redis cache. Scale uvicorn workers. Celery for CPU work."

---

**P: Safe schema migration?**

**R:**
"Alembic/Django migrations. Backward-compatible steps — nullable column first, backfill, then NOT NULL. Expand-contract for zero downtime."

---

## More material

→ `ejemplos/python-fastapi-auth.py`  
→ `../laravel/04-eloquent/01-eager-loading-n-plus-1.php` (same N+1 concept)
