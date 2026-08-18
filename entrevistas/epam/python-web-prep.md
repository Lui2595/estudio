# EPAM Python.Web — Qué usar, qué estudiar, preguntas

> Entrevista: **Thu Jul 23 · 12:00–13:30 (90 min)** · skill **Python.Web** · posible React + live coding.  
> Inglés. Sin IA en la entrevista.

---

## 1) Qué utilizar (stack recomendado)

Para el challenge **06** y para la entrevista, elige **un** backend y domínalo:

| Pieza | Recomendación | Por qué |
|-------|---------------|---------|
| **Backend** | **Flask + SQLAlchemy** *o* **Django + DRF** | EPAM Python.Web acepta ambos; Flask es más rápido de montar en 90 min |
| **Auth** | **JWT** (PyJWT / simplejwt) | Estándar con React SPA |
| **DB local** | **SQLite** | Cero setup; di “Postgres in production” |
| **Frontend** | **React + Vite** (JS o TS) | Más simple que Next para 90 min |
| **HTTP client** | `fetch` | Sin librerías extra |
| **Tests** | `pytest` (+ Flask test client o DRF APIClient) | 2 tests bastan |
| **Editor** | VS Code / Cursor en modo sin AI si practicas “como EPAM” | Chrome el día real |
| **Python** | 3.10+ | type hints básicos |

### ¿Flask o Django?

| Si… | Elige |
|-----|--------|
| Quieres montar API en 15 min | **Flask** |
| El JD/entrevistador menciona Django | **Django + DRF** |
| Ya hiciste challenge 01 en Flask | **Quédate en Flask** |

**FastAPI:** menciónalo como experiencia, pero para live coding 90 min Flask/Django suelen ser más seguros si el entrevistador espera “clásico Python.Web”.

### Comandos mínimos (Flask)

```bash
python -m venv .venv
.venv\Scripts\activate
pip install flask flask-sqlalchemy flask-cors PyJWT werkzeug pytest
```

### Comandos mínimos (React)

```bash
npm create vite@latest web -- --template react
cd web && npm i && npm run dev
```

---

## 2) Qué debes estudiar (prioridad)

### P0 — Obligatorio (hoy / mañana)

| Tema | Saber decir + hacer |
|------|---------------------|
| REST + status codes | 200/201/204/400/401/404/422 |
| JWT flow | login → Bearer → 401 sin token |
| Password hashing | nunca plain text |
| ORM relations 1:N | User→Project→Task |
| **N+1** | qué es + `joinedload` / `select_related` / annotate count |
| **Transaction** | archive project + update tasks atomic |
| React `useState` / `useEffect` | fetch list, deps `[id]` |
| Controlled forms | login + create task |
| Loading / error / disable submit | UX mínima |

**Práctica:** `code-challenges/06-epam-python-react-tracker/README.md` (90 min sin IA).

### P1 — Muy probable en preguntas orales

| Tema | Archivo |
|------|---------|
| Flask vs Django vs FastAPI | este doc + `entrevistas/04-python-backend.md` |
| GIL + async | abajo |
| list/dict/comprehensions, `*args/**kwargs` | abajo |
| Mutable default args bug | abajo |
| GIL / multithreading vs multiprocessing | abajo |
| SQL indexes + EXPLAIN one-liner | `04-sql-performance-lab` |
| React keys, re-renders, stale closure | `react/02-hooks/` |

### P2 — Solo si sobra tiempo

Celery, Redis, Docker, AWS detail, GraphQL, microservices profundos.

---

## 3) Plan hasta el jueves

| Cuándo | Qué hacer |
|--------|-----------|
| **Hoy** | Leer este archivo + oral Q&A (sección 4) en voz alta 40 min |
| **Hoy noche** | Challenge 06: solo **backend** 45 min |
| **Mañana** | Challenge 06 completo 90 min (cronómetro, sin IA) |
| **Mañana noche** | Pure-code Python: LRU o rate limiter 30 min |
| **Jueves AM** | Solo review: JWT, N+1, transaction, intro 60 seg + `DAY-OF-CARD.md` |

---

## 4) Preguntas generales Python (con respuesta corta en inglés)

Practica **en voz alta**. Estructura: direct answer → why → example.

### Language fundamentals

**P: list vs tuple vs set vs dict?**  
**R:** "list ordered mutable; tuple ordered immutable; set unique unordered; dict key-value. Use tuple for fixed records, set for membership, dict for lookups."

**P: What is a list comprehension?**  
**R:** "Concise way to build a list from an iterable with optional filter — `[x*2 for x in nums if x > 0]`. Prefer a loop if logic is complex."

**P: `*args` and `**kwargs`?**  
**R:** "`*args` collects extra positional args as a tuple; `**kwargs` extra keywords as a dict. Common in wrappers and flexible APIs."

**P: Mutable default argument pitfall?**  
**R:** "`def f(a=[])` reuses the same list across calls. Use `None` and create inside: `if a is None: a = []`."

**P: `is` vs `==`?**  
**R:** "`==` compares values; `is` compares identity. Use `is` for `None`."

**P: Generators?**  
**R:** "Functions with `yield` — lazy iteration, less memory for large streams."

**P: Context managers (`with`)?**  
**R:** "Guarantee setup/teardown — files, DB sessions. Implements `__enter__`/`__exit__`."

**P: Decorators?**  
**R:** "Functions that wrap other functions — auth, logging, timing. `@login_required` pattern."

**P: GIL (Global Interpreter Lock)?**  
**R:** "Only one thread runs Python bytecode at a time per process. Hurts CPU-bound threads; I/O-bound web apps often fine with async or multi-process workers (gunicorn)."

**P: Multithreading vs multiprocessing vs async?**  
**R:** "Threads: I/O concurrency but GIL limits CPU. Processes: parallel CPU. Async: many I/O waits on one thread with event loop."

**P: How does `async`/`await` work?**  
**R:** "`async def` defines a coroutine; `await` yields control during I/O. Good for high-concurrency I/O. CPU work still blocks — offload to workers."

**P: duck typing?**  
**R:** "Behavior matters more than nominal type — if it has the methods we need, we use it. Type hints + mypy add safety in larger codebases."

**P: `deepcopy` vs assignment?**  
**R:** "Assignment copies reference; mutable nested objects shared. `copy.deepcopy` for independent nested structures."

---

### Web / API / Django-Flask

**P: Flask vs Django?**  
**R:** "Flask is micro — you choose libraries; fast for small APIs. Django is batteries-included — ORM, admin, auth; better for large products. DRF for REST on Django."

**P: When FastAPI?**  
**R:** "API-first, async, Pydantic validation, auto OpenAPI. Great microservices; team must be OK with its style."

**P: How do you structure a Python API?**  
**R:** "Routes/controllers thin; services for business logic; models/repositories for DB; schemas for validation. Config from env."

**P: JWT authentication?**  
**R:** "Login verifies password hash, returns short-lived access token. Client sends `Authorization: Bearer`. Protected routes decode JWT and load user. Refresh optional."

**P: How do you hash passwords?**  
**R:** "werkzeug/Django hasher or bcrypt/argon2 — never store plaintext or reversible encryption for passwords."

**P: What is N+1?**  
**R:** "One query for parents, then one per child. Fix with join/annotate, `select_related`/`prefetch_related`, or `joinedload`. Detect by counting queries in logs."

**P: Database transactions?**  
**R:** "Group writes that must succeed together — e.g. archive project and close tasks. Commit on success, rollback on error."

**P: SQL injection prevention?**  
**R:** "Parameterized queries / ORM only — never format SQL with user strings."

**P: How do you handle errors in an API?**  
**R:** "Validate input → 400/422. Auth → 401/403. Missing → 404. Unexpected → 500 with logged traceback, no stack to client in prod."

**P: CORS?**  
**R:** "Browser blocks cross-origin by default. API must allow the React origin — flask-cors or django-cors-headers."

**P: Celery / background jobs?**  
**R:** "For email, reports, slow work — enqueue job, return 202, worker processes. Keep HTTP fast."

**P: Migrations?**  
**R:** "Versioned schema changes — Django migrations or Alembic. Expand-contract for zero downtime."

---

### React (likely follow-ups)

**P: What causes re-render?**  
**R:** "State/props/context change or parent re-render. Keep state local when possible."

**P: useEffect?**  
**R:** "Side effects after paint — fetch, subscriptions. Dependency array controls re-run; cleanup on unmount."

**P: Controlled component?**  
**R:** "Input value driven by React state + onChange — needed for validation UX."

**P: How do you call a Python API from React?**  
**R:** "fetch/axios with JSON, attach Bearer token, handle 401 redirect to login, show loading/error."

---

### Behavioral / EPAM

**P: Tell me about yourself** — 60 sec Python + React + 1 achievement.  
**P: Why EPAM?** — enterprise projects, learning, international teams.  
**P: Challenging bug?** — STAR: N+1 / auth / race → fix → metric.  
**P: Questions for them?** — Django vs FastAPI on team? First project expectations?

---

## 5) Frases listas (memorízalas)

**N+1:**  
"I'll use annotation or eager loading so the projects list is not one query per row."

**Archive:**  
"I'll wrap status update and related task updates in a single database transaction."

**Auth:**  
"Passwords hashed; JWT in Authorization header; missing token returns 401."

**Scope under time:**  
"I'll deliver the happy path first — auth, list, create — then harden edge cases."

---

## 6) Material en tu repo (ruta de estudio)

| Orden | Path |
|-------|------|
| 1 | `code-challenges/06-epam-python-react-tracker/README.md` |
| 2 | `code-challenges/06-epam-python-react-tracker/DAY-OF-CARD.md` |
| 3 | `code-challenges/01-python-task-api/solution/` (referencia Flask JWT) |
| 4 | `entrevistas/04-python-backend.md` |
| 5 | `entrevistas/02-react-frontend.md` |
| 6 | `entrevistas/epam/00-questions.md` |
| 7 | `code-challenges/pure-code/` (Python) |
| 8 | `react/02-hooks/00-preguntas-respuestas.md` |

---

## 7) Checklist día de entrevista

- [ ] Chrome, 1 monitor, cámara, mic, agua  
- [ ] Teléfono lejos, sin AI  
- [ ] Intro 60 seg  
- [ ] Challenge 06 mental map (models → auth → list → react)  
- [ ] 5 frases: N+1, JWT, transaction, 404 leak, GIL one-liner  

¡Éxito el jueves!
