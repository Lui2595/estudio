# Preguntas y Respuestas — Python (Completo)

> Review para **EPAM Python.Web**. Cada ítem tiene **P/R en inglés** (entrevista) y **ES** (estudio).  
> Términos técnicos van con significado entre paréntesis la primera vez (y cuando ayuda).
>
> **¿No entiendes la pregunta?** Mira el código con contexto → [`00-ejemplos-con-contexto.md`](00-ejemplos-con-contexto.md)

| Temas | Fundamentos · OOP (Object-Oriented Programming) · Async/GIL · Web · Datos · Testing |
| Preguntas | ~40 |

---

## 01 — Fundamentos / Fundamentals

**P (EN): list vs tuple vs set vs dict?**  
**R (EN):** A list is ordered and mutable. A tuple is ordered and immutable. A set stores unique unordered items with average O(1) (constant-time) membership checks. A dict maps keys to values with average O(1) lookups. Use tuples for fixed records, sets for membership, dicts for maps.

**P (ES): ¿list vs tuple vs set vs dict?**  
**R (ES):** `list`: ordenada y mutable. `tuple`: ordenada e inmutable. `set`: valores únicos, sin orden, búsqueda promedio O(1) (tiempo constante). `dict`: clave→valor, lookup O(1). Usa tuple para registros fijos; set para pertenencia; dict para mapas.

---

**P (EN): What is a list comprehension?**  
**R (EN):** A compact way to build a list from an iterable with an optional filter — `[x*2 for x in nums if x > 0]`. Prefer a normal loop if the logic is complex.

**P (ES): ¿Qué es una list comprehension?**  
**R (ES):** Forma compacta de crear listas a partir de un iterable con filtro opcional. Si la lógica es compleja, un `for` es más legible.

---

**P (EN): What are `*args` and `**kwargs`?**  
**R (EN):** `*args` collects extra positional arguments into a tuple. `**kwargs` collects extra keyword arguments into a dict. Common in wrappers, decorators, and flexible APIs (Application Programming Interfaces).

**P (ES): ¿Qué son `*args` y `**kwargs`?**  
**R (ES):** `*args` junta argumentos posicionales extra en una tuple. `**kwargs` junta keywords en un dict. Útil en wrappers, decorators y APIs flexibles.

---

**P (EN): What is the mutable default argument pitfall?**  
**R (EN):** `def f(a=[])` reuses the same list across calls. Fix: use `None` and create inside — `if a is None: a = []`.

**P (ES): ¿Cuál es el peligro del default argument mutable?**  
**R (ES):** `def f(a=[])` reutiliza la misma lista entre llamadas. Solución: `def f(a=None): a = [] if a is None else a`.

---

**P (EN): `is` vs `==`?**  
**R (EN):** `==` compares values. `is` compares identity (same object in memory). Use `is` / `is not` with `None`.

**P (ES): ¿`is` vs `==`?**  
**R (ES):** `==` compara valor. `is` compara identidad (mismo objeto en memoria). Usa `is` / `is not` con `None`.

---

**P (EN): What is `OrderedDict`? When do you use `move_to_end` / `popitem`?**  
**R (EN):** `collections.OrderedDict` is a dict that remembers insertion order and can reorder keys. `move_to_end(key)` moves a key to the end (MRU). `popitem(last=False)` removes the first (LRU) — classic building block for an O(1) LRU cache. Since 3.7 plain `dict` also keeps insertion order, but it lacks these reordering helpers.

**P (ES): ¿Qué es `OrderedDict`? ¿`move_to_end` / `popitem`?**  
**R (ES):** Dict que recuerda el orden y permite reordenar. `move_to_end(key)` → al final (MRU = most recently used). `popitem(last=False)` → saca el primero (LRU = least recently used). Ideal para cache LRU. El `dict` normal (3.7+) también ordena inserción, pero **no** trae estos métodos.

| Método | Qué hace | Uso LRU |
|--------|----------|---------|
| `move_to_end(k)` | k al final | al hacer `get` / update |
| `move_to_end(k, last=False)` | k al inicio | raro en LRU |
| `popitem()` / `popitem(last=True)` | saca el último | LIFO |
| `popitem(last=False)` | saca el primero | **evict LRU** |

Código: [`01-fundamentos/02-ordereddict-lru.py`](01-fundamentos/02-ordereddict-lru.py) · Challenge: `../code-challenges/pure-code/01-lru-cache/`

---

**P (EN): How do you read a file in Python? Why use `with`?**  
**R (EN):** Prefer `with open(path, encoding="utf-8") as f:` then `f.read()`, or iterate `for line in f` for large files. `with` is a context manager — it closes the handle even if an exception occurs. Pathlib: `Path(path).read_text(encoding="utf-8")`. For JSON: `json.load(f)` / `json.loads(...)`.

**P (ES): ¿Cómo lees un archivo? ¿Por qué `with`?**  
**R (ES):** `with open(path, encoding="utf-8") as f:` + `f.read()`, o `for line in f` si es grande. `with` cierra el archivo aunque falle (context manager). Pathlib: `Path(...).read_text(...)`. JSON: `json.load(f)`.

| Acción | Código típico |
|--------|----------------|
| Leer texto | `Path(p).read_text(encoding="utf-8")` |
| Leer línea a línea | `with open(p, encoding="utf-8") as f: for line in f:` |
| Escribir | `with open(p, "w", encoding="utf-8") as f: f.write(...)` |
| Append | `open(p, "a", encoding="utf-8")` |
| JSON in | `json.load(f)` / `json.loads(text)` |
| JSON out | `json.dump(obj, f, indent=2)` |
| Binario | `open(p, "rb")` / `"wb"` (sin encoding) |

Código: [`01-fundamentos/03-file-io.py`](01-fundamentos/03-file-io.py)

---

**P (EN): What is a generator?**  
**R (EN):** A function with `yield` that produces values lazily (on demand). Saves memory for large sequences or streams.

**P (ES): ¿Qué es un generator?**  
**R (ES):** Función con `yield` que produce valores de forma lazy (bajo demanda). Ahorra memoria en secuencias grandes o streams.

---

**P (EN): What does `with` (context manager) do?**  
**R (EN):** Guarantees setup/teardown via `__enter__` / `__exit__` — files, locks, DB (Database) sessions. The resource closes even if an exception is raised.

**P (ES): ¿Qué hace `with` (context manager)?**  
**R (ES):** Garantiza setup/teardown (`__enter__`/`__exit__`): archivos, locks, sesiones de BD (Base de Datos). El recurso se cierra aunque haya excepción.

---

**P (EN): What is a decorator?**  
**R (EN):** A function that wraps another function to add behavior (auth, logging, timing) without changing its body. Syntax: `@decorator`.

**P (ES): ¿Qué es un decorator?**  
**R (ES):** Función que envuelve otra para añadir comportamiento (auth, logging, timing) sin cambiar su cuerpo. Sintaxis `@decorator`.

---

**P (EN): Is Python statically or dynamically typed?**  
**R (EN):** Dynamically typed at runtime. Type hints (PEP 484) plus mypy/pyright add optional static checking. Modern APIs expect hints on public signatures.

**P (ES): ¿Python tipado estático o dinámico?**  
**R (ES):** Dinámico en runtime (tiempo de ejecución). Type hints (PEP 484) + mypy/pyright dan chequeo estático opcional. En APIs modernas se esperan hints en firmas públicas.

---

**P (EN): What is duck typing?**  
**R (EN):** “If it walks like a duck…” — behavior (methods) matters more than nominal class hierarchy. Protocols/ABCs (Abstract Base Classes) formalize contracts when needed.

**P (ES): ¿Qué es duck typing?**  
**R (ES):** “Si camina como pato…” — importa el comportamiento (métodos), no la jerarquía de tipos. Protocols/ABC (Abstract Base Class / clase base abstracta) formalizan contratos cuando hace falta.

---

**P (EN): Shallow vs deep copy?**  
**R (EN):** Assignment copies the reference. `copy.copy` is shallow (nested objects still shared). `copy.deepcopy` clones the full object tree.

**P (ES): ¿shallow vs deep copy?**  
**R (ES):** Asignación copia la referencia. `copy.copy` es superficial (anidados compartidos). `copy.deepcopy` clona el árbol completo.

---

**P (EN): How do you handle exceptions?**  
**R (EN):** Use `try/except/else/finally`. Catch specific exceptions, not bare `except:`. Custom exceptions for domain errors. Don’t use exceptions for normal control flow.

**P (ES): ¿Cómo manejas excepciones?**  
**R (ES):** `try/except/else/finally`. Captura excepciones específicas, no `except:` pelado. Excepciones custom para dominio. No uses excepciones para control de flujo normal.

---

## 02 — OOP (Object-Oriented Programming / Programación Orientada a Objetos)

**P (EN): Class vs instance attributes?**  
**R (EN):** Class attributes are shared by all instances. Instance attributes live on `self`. Mutable class-level defaults are shared — be careful.

**P (ES): ¿Atributos de clase vs de instancia?**  
**R (ES):** Class attrs compartidos por todas las instancias. Instance attrs viven en `self`. Mutables a nivel de clase se comparten — cuidado.

---

**P (EN): `@staticmethod` vs `@classmethod` vs instance method?**  
**R (EN):** Instance methods receive `self`. Classmethods receive `cls` (alternate constructors/factories). Staticmethods are namespaced functions with no `self`/`cls`.

**P (ES): ¿`@staticmethod` vs `@classmethod` vs método de instancia?**  
**R (ES):** Instance: recibe `self`. classmethod: recibe `cls` (factories). staticmethod: función en el namespace de la clase, sin `self`/`cls`.

---

**P (EN): `__init__` vs `__new__`?**  
**R (EN):** `__new__` creates the instance (rarely customized). `__init__` initializes it. Almost always you only define `__init__`.

**P (ES): ¿`__init__` vs `__new__`?**  
**R (ES):** `__new__` crea la instancia (raro customizar). `__init__` la inicializa. Casi siempre solo defines `__init__`.

---

**P (EN): Inheritance vs composition?**  
**R (EN):** Prefer composition (“has-a”) for flexibility. Use inheritance (“is-a”) when there is a clear subtype relationship and you need polymorphism.

**P (ES): ¿Herencia vs composición?**  
**R (ES):** Prefer composition (“tiene-un”) por flexibilidad. Inheritance (“es-un”) cuando hay relación clara y reutilizas comportamiento polimórfico.

---

**P (EN): What is an ABC / `abstractmethod`?**  
**R (EN):** An Abstract Base Class (ABC) defines a required interface. Subclasses must implement abstract methods. Useful as contracts between modules.

**P (ES): ¿Qué es un ABC / abstractmethod?**  
**R (ES):** Abstract Base Class (clase base abstracta) define interfaz obligatoria. Las subclases deben implementar métodos abstractos. Útil para contratos entre módulos.

---

**P (EN): Diamond inheritance — `class D(B, C)` both extend abstract `A`. What does `D().method()` call?**  
**R (EN):** Python uses MRO (Method Resolution Order), left-to-right: `D → B → C → A → object`. So **B’s** implementation wins. Check with `D.__mro__`.

**P (ES): Diamante `D(B, C)` — ¿qué método gana?**  
**R (ES):** MRO izquierda→derecha: `D → B → C → A`. Gana **B**. Confirma con `D.__mro__`.

---

**P (EN): Existing tested CNN scraper — how add an API client with polymorphism? What to test?**  
**R (EN):** Extract a shared contract (`ABC`/`Protocol`, e.g. `fetch_headlines`). Keep the scraper implementing it (don’t rewrite). Add `CnnApiClient` with the same interface; inject HTTP client for mocks. Business code depends on the ABC. Test API: happy JSON parse, HTTP errors, bad payload, and that the consumer works with both impls.

**P (ES): Scraper CNN testeado → API polimórfica ¿cómo? ¿Qué testear?**  
**R (ES):** Contrato común (`ABC`). Scrap se queda; nueva clase API misma interfaz; inyectar HTTP. Tests API: happy path, errores HTTP, JSON raro, y consumidor con ambas impls.

---

**P (EN): Print before/after a method without changing its body?**  
**R (EN):** Use a decorator wrapper, or wrap at runtime `Cls.method = around(Cls.method)`, or subclass and call `super()`.

**P (ES): ¿Before/after sin modificar el método?**  
**R (ES):** Decorator, o `Cls.metodo = around(Cls.metodo)`, o subclase + `super()`.

Código: [`02-oop/02-mro-polimorfismo-decorator.py`](02-oop/02-mro-polimorfismo-decorator.py)

---

**P (EN): What are dataclasses?**  
**R (EN):** `@dataclass` auto-generates `__init__`, `__repr__`, and comparison helpers. Great for DTOs (Data Transfer Objects). In 3.10+, `slots=True` can reduce memory.

**P (ES): ¿Qué son dataclasses?**  
**R (ES):** `@dataclass` genera `__init__`, `__repr__`, comparación. Ideal para DTOs (Data Transfer Objects / objetos de transferencia de datos). Desde 3.10, `slots=True` reduce memoria.

---

**P (EN): What is `@property`?**  
**R (EN):** Exposes a method as an attribute (optionally with a setter). Encapsulates logic without changing the public API.

**P (ES): ¿Qué es `@property`?**  
**R (ES):** Expone un método como atributo de solo lectura (o con setter). Encapsula sin cambiar la API pública.

---

## 03 — Async, concurrencia, GIL

**P (EN): What is the GIL?**  
**R (EN):** Global Interpreter Lock (GIL) — only one thread executes Python bytecode at a time per process. Limits CPU-bound multithreading. I/O-bound (Input/Output-bound) web apps are often fine with async or multi-process workers (e.g. gunicorn).

**P (ES): ¿Qué es el GIL?**  
**R (ES):** Global Interpreter Lock (bloqueo global del intérprete) — un solo thread ejecuta bytecode Python por proceso. Limita CPU multithreading. Web I/O-bound (limitado por entrada/salida) suele estar OK con async o varios procesos (gunicorn workers).

---

**P (EN): threading vs multiprocessing vs asyncio?**  
**R (EN):** Threads: concurrent I/O, but GIL limits CPU parallelism. Processes: true CPU parallelism. Asyncio: many I/O waits on one thread via an event loop.

**P (ES): ¿threading vs multiprocessing vs asyncio?**  
**R (ES):** Threads: I/O concurrente, limitados por GIL en CPU. Processes: paralelismo CPU real. Asyncio: muchas esperas I/O en un hilo con event loop (bucle de eventos).

---

**P (EN): How does `async`/`await` work?**  
**R (EN):** `async def` defines a coroutine; `await` yields control while waiting on I/O. The event loop schedules tasks. CPU work still blocks — offload to a process/thread pool.

**P (ES): ¿Cómo funciona async/await?**  
**R (ES):** `async def` define una coroutine; `await` cede el control mientras espera I/O. El event loop agenda tareas. Trabajo CPU sigue bloqueando — offload a process/thread pool.

---

**P (EN): When should you NOT use async?**  
**R (EN):** CPU-bound code, sync libraries that block the loop, or teams without async experience. Prefer sync + workers instead.

**P (ES): ¿Cuándo NO usar async?**  
**R (ES):** Código CPU-bound, librerías sync que bloquean el loop, equipos sin experiencia async. Mejor sync + workers.

---

## 04 — Web: Flask / Django / FastAPI

**P (EN): Flask vs Django vs FastAPI?**  
**R (EN):** Flask is a microframework — flexible, fast for small APIs. Django is batteries-included (ORM, admin, auth) for larger products; use DRF (Django REST Framework) for REST. FastAPI is async-friendly, Pydantic validation, auto OpenAPI — great for API-first microservices.

**P (ES): ¿Flask vs Django vs FastAPI?**  
**R (ES):** Flask: microframework, flexible, APIs chicas/rápidas. Django: batteries-included (ORM, admin, auth), productos grandes; DRF (Django REST Framework) para REST. FastAPI: async, Pydantic, OpenAPI auto, microservicios API-first.

---

**P (EN): Migrations library in Flask?**  
**R (EN):** **Flask-Migrate** wraps **Alembic**. `flask db migrate` / `flask db upgrade`. Django has built-in migrations; Flask uses Alembic via Flask-Migrate.

**P (ES): ¿Librería de migraciones en Flask?**  
**R (ES):** **Flask-Migrate** → **Alembic**. Docs: `../flask/05-models-orm/02-migrations-alembic.md`.

---

**P (EN): How do you structure a Python API?**  
**R (EN):** Thin routes/controllers → services (business logic) → models/repositories (DB) → schemas (validation). Config from environment variables.

**P (ES): ¿Cómo estructuras una API Python?**  
**R (ES):** Rutas/controllers delgados → services (negocio) → models/repositories (DB) → schemas (validación). Config por env vars (variables de entorno).

---

**P (EN): Explain JWT authentication flow.**  
**R (EN):** Login verifies the password hash, then issues a short-lived JWT (JSON Web Token). Client sends `Authorization: Bearer <token>`. Middleware decodes it and loads the user. Return 401 (Unauthorized) if missing/invalid. Never return the password (or hash) in responses.

**P (ES): ¿Cómo funciona autenticación JWT?**  
**R (ES):** Login verifica password hash → emite JWT (JSON Web Token / token web JSON) de vida corta. Cliente manda `Authorization: Bearer`. Middleware decodifica y carga user. 401 (Unauthorized / no autenticado) si falta/inválido. Password nunca en responses.

---

**P (EN): How do you hash passwords?**  
**R (EN):** Use werkzeug/Django password hashers, bcrypt, or argon2. Never store plaintext or reversible encryption for passwords.

**P (ES): ¿Cómo hasheas passwords?**  
**R (ES):** werkzeug/Django hasher, bcrypt o argon2. Nunca plaintext ni encryption reversible para passwords.

---

**P (EN): What is the N+1 problem?**  
**R (EN):** N+1 (one query for the list + N queries for related rows): you fetch parents, then one query per child. Fix with join/annotate, `select_related`/`prefetch_related` (Django), or `joinedload`/`selectinload` (SQLAlchemy). Detect by counting queries in logs.

**P (ES): ¿Qué es el problema N+1?**  
**R (ES):** N+1 (1 query de la lista + N queries de relaciones): 1 query de padres + 1 por cada hijo. Fix: join/annotate, `select_related`/`prefetch_related`, o `joinedload`. Detectar contando queries en logs.

---

**P (EN): When do you use database transactions?**  
**R (EN):** When multiple writes must be all-or-nothing (payments, archive project + update tasks). Commit on success, rollback on error. Gives ACID (Atomicity, Consistency, Isolation, Durability) guarantees for that unit of work.

**P (ES): ¿Cuándo usas transacciones?**  
**R (ES):** Varias escrituras all-or-nothing (pagos, archive project + update tasks). Commit OK / rollback error. Relacionado con ACID (Atomicity, Consistency, Isolation, Durability / Atomicidad, Consistencia, Aislamiento, Durabilidad).

---

**P (EN): How do you prevent SQL injection?**  
**R (EN):** Use ORM (Object-Relational Mapping) or parameterized queries only. Never build SQL with f-strings/format from user input.

**P (ES): ¿Cómo evitas SQL injection?**  
**R (ES):** ORM (Object-Relational Mapping / mapeo objeto-relacional) o queries parametrizadas. Nunca f-strings/format con input de usuario en SQL.

---

**P (EN): Typical REST status codes?**  
**R (EN):** 200 OK, 201 Created, 204 No Content, 400/422 validation, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 500 server error. REST (Representational State Transfer) is the resource-oriented API style.

**P (ES): ¿Status codes típicos REST?**  
**R (ES):** 200 OK, 201 Created, 204 No Content, 400/422 validation, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 500 server error. REST (Representational State Transfer / transferencia de estado representacional) es el estilo de API orientado a recursos.

---

**P (EN): 404 vs 403 for another user’s resource?**  
**R (EN):** Many teams return 404 (Not Found) to avoid leaking that the resource exists. 403 (Forbidden) admits it exists but you lack permission.

**P (ES): ¿404 vs 403 en recursos de otro usuario?**  
**R (ES):** Muchos equipos usan **404** (Not Found / no encontrado) para no filtrar existencia. **403** (Forbidden / prohibido) admite que existe pero no tienes permiso.

---

**P (EN): What is CORS?**  
**R (EN):** CORS (Cross-Origin Resource Sharing) — browsers block cross-origin requests by default. The API must allow the React origin (flask-cors / django-cors-headers).

**P (ES): ¿Qué es CORS?**  
**R (ES):** CORS (Cross-Origin Resource Sharing / intercambio de recursos entre orígenes) — el browser bloquea requests cross-origin por defecto. La API debe permitir el origin del React (flask-cors / django-cors-headers).

---

**P (EN): What is WSGI / ASGI? What does each one do?**  
**R (EN):**  
- **WSGI (Web Server Gateway Interface):** The classic synchronous interface for Python web apps (e.g., gunicorn + Flask/Django). It connects web servers with Python apps, handling one request at a time (sync).
- **ASGI (Asynchronous Server Gateway Interface):** Supports asynchronous features (e.g., uvicorn + FastAPI or Django async). Lets your app handle many requests concurrently using async/await, making it suitable for websockets, long polling, or high concurrency.

**P (ES): ¿Qué es WSGI / ASGI y qué hace cada una?**  
**R (ES):**  
- **WSGI (Web Server Gateway Interface / interfaz puerta de enlace del servidor web):** La interfaz clásica y síncrona para apps web Python (ej: gunicorn + Flask/Django). Conecta el servidor web con la app, procesando una solicitud a la vez (sync).
- **ASGI (Asynchronous Server Gateway Interface):** Permite aplicaciones asíncronas (ej: uvicorn + FastAPI o Django async). Tu app puede atender múltiples requests a la vez con async/await, ideal para websockets, long polling o alta concurrencia.

---

**P (EN): When do you use Celery / background jobs?**  
**R (EN):** Email, reports, slow work. Enqueue a job, return fast (201/202), worker processes later. Make jobs idempotent (safe to retry).

**P (ES): ¿Celery / background jobs — cuándo?**  
**R (ES):** Email, reports, trabajo lento. Encolas job, respondes 202/201 rápido, worker procesa. Jobs idempotentes (seguros de reintentar).

---

**P (EN): How do you handle schema migrations?**  
**R (EN):** Django migrations or Alembic — versioned in git. In production prefer backward-compatible expand/contract steps.

**P (ES): ¿Migraciones de schema?**  
**R (ES):** Django migrations o Alembic. Versionadas en git. En prod: cambios backward-compatible (expand/contract).

---

**P (EN): Where do you validate input?**  
**R (EN):** At the API edge: marshmallow / Pydantic / DRF serializers. Never trust the frontend alone.

**P (ES): ¿Dónde validar input?**  
**R (ES):** En el borde de la API: marshmallow/pydantic/DRF serializers. Nunca confíes solo en el frontend.

---

## 05 — Datos y performance / Data & performance

**P (EN): When do database indexes help?**  
**R (EN):** They speed WHERE, JOIN, ORDER BY on selective columns. They slow writes and use disk. Composite index column order matters. Verify with EXPLAIN (query plan inspection).

**P (ES): ¿Índices en BD — cuándo ayudan?**  
**R (ES):** Aceleran WHERE, JOIN, ORDER BY. Empeoran writes y usan disco. El orden en índices compuestos importa. Verifica con EXPLAIN (plan de ejecución de la query).

---

**P (EN): Typical Redis use cases?**  
**R (EN):** Cache, sessions, rate limiting, queue broker. Always set TTL (Time To Live). Not the source of truth for money.

**P (ES): ¿Redis — usos típicos?**  
**R (ES):** Cache, sessions, rate limiting, broker de colas. Siempre TTL (Time To Live / tiempo de vida). No es source of truth de dinero.

---

**P (EN): Offset vs cursor pagination?**  
**R (EN):** OFFSET is simple but slow on deep pages. Cursor pagination (`WHERE id > last`) is more stable and faster.

**P (ES): ¿Pagination offset vs cursor?**  
**R (ES):** OFFSET simple pero lento en páginas profundas. Cursor (`WHERE id > last`) más estable y rápido.

---

## 06 — Testing y calidad / Testing & quality

**P (EN): How do you test a Flask/Django API?**  
**R (EN):** pytest + test client. Test DB or rollback per test. Cover login success, 401 without token, validation 400/422.

**P (ES): ¿Cómo testeas una API Flask/Django?**  
**R (ES):** pytest + test client. DB de test o rollback por test. Cubrir login OK, 401 sin token, validation 400/422.

---

**P (EN): What would you test in a 90-minute challenge?**  
**R (EN):** Two tests: auth happy path + unauthorized create. Rest is manual smoke testing.

**P (ES): ¿Qué testearías en 90 min de challenge?**  
**R (ES):** 2 tests: auth happy path + unauthorized create. El resto smoke manual.

---

**P (EN): Why use venv / virtualenv?**  
**R (EN):** Isolates project dependencies. Pin versions with `requirements.txt` or poetry for reproducibility.

**P (ES): ¿virtualenv / venv — para qué?**  
**R (ES):** Aísla dependencias del proyecto. `requirements.txt` o poetry para reproducibilidad.

---

## 07 — React + Python (full stack)

**P (EN): How do you connect React to a Python API?**  
**R (EN):** `fetch`/axios with JSON, `Authorization: Bearer` token, handle 401 → login redirect, show loading/error. Enable CORS for the Vite origin.

**P (ES): ¿Cómo conectas React con tu API Python?**  
**R (ES):** `fetch`/axios JSON, header Bearer, maneja 401→login, estados loading/error. CORS habilitado al origin del Vite.

---

**P (EN): What is a controlled input in React?**  
**R (EN):** Input `value` driven by React state plus `onChange`. Needed for predictable validation UX on login/create forms.

**P (ES): ¿Controlled input en React?**  
**R (ES):** `value` + `onChange` con state. Necesario para validación y UX predecible en forms de login/create.

---

## 08 — Magic methods (dunder / métodos especiales)

> Código con contexto: [`05-magic-methods/`](05-magic-methods/) y sección en [`00-ejemplos-con-contexto.md`](00-ejemplos-con-contexto.md).

**P (EN): What are magic methods (dunder methods)?**  
**R (EN):** Special methods with double underscores (`__init__`, `__str__`, `__len__`…). Python calls them for language syntax (`print`, `len`, `+`, `with`, `[]`). “Dunder” = double underscore.

**P (ES): ¿Qué son los magic methods?**  
**R (ES):** Métodos especiales `__así__` (dunder = double underscore / doble guion bajo). Python los invoca cuando usas sintaxis del lenguaje (`print`, `len`, `+`, `with`, `[]`). Casi nunca los llamas a mano.

---

**P (EN): `__str__` vs `__repr__`?**  
**R (EN):** `__str__` → human-readable (`print`/`str`). `__repr__` → developer/debug (`repr`, REPL). If only one is defined, `__repr__` often serves as fallback.

**P (ES): ¿`__str__` vs `__repr__`?**  
**R (ES):** `__str__` legible para humanos. `__repr__` claro para debug. Si solo hay uno, Python puede usar `__repr__` como fallback de `str`.

---

**P (EN): How do you support `len(obj)` and `obj[i]`?**  
**R (EN):** Implement `__len__` and `__getitem__`. Add `__iter__` for `for`, `__contains__` for `in`, `__enter__`/`__exit__` for `with`, `__call__` to make instances callable.

**P (ES): ¿Cómo soportar `len(obj)` y `obj[i]`?**  
**R (ES):** `__len__` y `__getitem__`. Además: `__iter__` (`for`), `__contains__` (`in`), `__enter__`/`__exit__` (`with`), `__call__` (instancia como función).

---

## Mini-glosario rápido / Quick glossary

| Término | Significado (ES) | Meaning (EN) |
|---------|------------------|--------------|
| O(1) | Tiempo constante | Constant time |
| O(n) | Tiempo lineal con n elementos | Linear time |
| N+1 | 1 query lista + N de relaciones | One list query + N relation queries |
| GIL | Bloqueo global del intérprete | Global Interpreter Lock |
| JWT | Token web JSON | JSON Web Token |
| ORM | Mapeo objeto-relacional | Object-Relational Mapping |
| REST | Estilo de API por recursos/HTTP | Representational State Transfer |
| CORS | Permisos cross-origin en browser | Cross-Origin Resource Sharing |
| TTL | Tiempo de vida (cache) | Time To Live |
| ACID | Propiedades de transacciones | Atomicity, Consistency, Isolation, Durability |
| DTO | Objeto de transferencia de datos | Data Transfer Object |
| ABC | Clase base abstracta | Abstract Base Class |
| MRO | Orden de resolución de métodos | Method Resolution Order |
| Flask-Migrate / Alembic | Migraciones DB en Flask | Flask DB migrations |
| WSGI/ASGI | Interfaces app↔servidor web | Web/Async Server Gateway Interface |
| I/O-bound | Limitado por entrada/salida | Limited by input/output waits |
| CPU-bound | Limitado por cálculo | Limited by CPU computation |
| Dunder / magic method | Método especial `__nombre__` | Double-underscore special method |
| OrderedDict | Dict con orden + `move_to_end`/`popitem` | Ordered dict (LRU helper) |
| LRU / MRU | Menos / más recientemente usado | Least / Most Recently Used |
| Context manager | `with` — entra/sale seguro | `with` / `__enter__`/`__exit__` |
| Pathlib | Paths OO (`Path`) | Object-oriented filesystem paths |
| DRY | No te repitas | Don't Repeat Yourself |

---

## Top 12 para memorizar (EPAM) — EN + ES

1. list/tuple/dict/set  
2. Mutable default bug  
3. Decorator + `with` (+ `__enter__`/`__exit__`)  
4. GIL in one sentence  
5. async vs threads vs processes  
6. Flask vs Django vs FastAPI  
7. JWT + password hashing  
8. N+1 (one + N queries) + fix  
9. Transactions / ACID unit of work  
10. 401 / 404 / 422  
11. CORS  
12. Magic methods: `__str__`/`__repr__`, `__len__`/`__getitem__`
---

## Material relacionado

- Challenge timed: `../code-challenges/06-epam-python-react-tracker/`
- Prep EPAM: `../entrevistas/epam/python-web-prep.md`
- Backend Q&A EN: `../entrevistas/04-python-backend.md`
- Solución Flask JWT: `../code-challenges/01-python-task-api/solution/`
- Ejemplos: `01-fundamentos/`, `02-oop/`, `03-async/`, `04-web/`, `05-magic-methods/`
- Ejemplos narrados: `00-ejemplos-con-contexto.md`
