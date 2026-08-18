# Preguntas y Respuestas — Flask (Completo)

> Review para **EPAM Python.Web** y backend Flask. Cada ítem tiene **P/R en inglés** (entrevista) y **ES** (estudio).  
> Código por área → carpetas `01-…` abajo.

| Temas | Fundamentos · Routing · Views · Requests · ORM · Auth · Hooks · API · Testing |
| Enfoque | Flask + SQLAlchemy + JWT (SPA React) |

---

## 01 — Fundamentos / Fundamentals

**P (EN): What is Flask?**  
**R (EN):** A lightweight WSGI (Web Server Gateway Interface) microframework. You choose libraries (SQLAlchemy, JWT). Minimal batteries included vs Django.

**P (ES): ¿Qué es Flask?**  
**R (ES):** Microframework WSGI ligero. Tú eliges ORM, auth, etc. Menos “incluido” que Django; más control y setup manual.

---

**P (EN): Application factory pattern?**  
**R (EN):** `create_app()` builds and configures the app (extensions, blueprints, config). Avoids circular imports and allows multiple apps (tests vs prod) with different configs.

**P (ES): ¿Qué es el application factory?**  
**R (ES):** Función `create_app()` que crea/configura la app. Evita imports circulares y permite apps distintas (tests/prod) con distinta config.

---

**P (EN): What is a Blueprint?**  
**R (EN):** A modular set of routes/views you register on the app — like mini-apps (`api`, `auth`). Keeps large projects organized.

**P (ES): ¿Qué es un Blueprint?**  
**R (ES):** Conjunto modular de rutas/vistas que registras en la app (`api`, `auth`). Organiza proyectos grandes.

---

**P (EN): What library handles DB migrations in Flask?**  
**R (EN):** **Flask-Migrate** (Flask integration) on top of **Alembic** (migration engine). Commands: `flask db migrate`, `flask db upgrade`.

**P (ES): ¿Librería de migraciones en Flask?**  
**R (ES):** **Flask-Migrate** → por debajo **Alembic**. Flujo: cambias model → `flask db migrate -m "..."` → revisas `upgrade()`/`downgrade()` → `flask db upgrade`. Cómo se escribe: `05-models-orm/02-migrations-alembic.md`.

---

**P (EN): Flask vs Django vs FastAPI (one sentence each)?**  
**R (EN):** Flask = flexible microframework. Django = batteries-included MVT (Model-View-Template). FastAPI = async-first APIs with automatic OpenAPI/validation.

**P (ES): ¿Flask vs Django vs FastAPI?**  
**R (ES):** Flask = micro, flexible. Django = full stack con ORM/admin. FastAPI = APIs async + validación/OpenAPI automática.

---

## 02 — Routing

**P (EN): How do you define routes in Flask?**  
**R (EN):** `@app.route("/projects", methods=["GET"])` or `bp.route`. Path converters: `<int:id>`, `<string:slug>`.

**P (ES): ¿Cómo defines rutas?**  
**R (ES):** Decorador `@app.route` / `bp.route` + `methods`. Convertidores: `<int:id>`, `<string:slug>`.

---

**P (EN): GET vs POST vs PUT/PATCH vs DELETE?**  
**R (EN):** GET read, POST create, PUT/PATCH update, DELETE remove. Return proper status codes (200/201/204/404…).

**P (ES): ¿GET vs POST vs PUT/PATCH vs DELETE?**  
**R (ES):** GET leer, POST crear, PUT/PATCH actualizar, DELETE borrar. Status codes correctos.

---

## 03 — Views / Controllers

**P (EN): What is a Flask “view”?**  
**R (EN):** The function (or class) that handles a request and returns a response. Same role as a controller in MVC — keep it thin; push business logic to services.

**P (ES): ¿Qué es una view en Flask?**  
**R (ES):** Función/clase que atiende el request y responde. Equivale al controller: delgada; lógica de negocio en services.

---

**P (EN): How do you return JSON?**  
**R (EN):** `jsonify({...}), 201` or `return {"key": "value"}, 200` (Flask 2+). Never return password hashes.

**P (ES): ¿Cómo devolver JSON?**  
**R (ES):** `jsonify(...)` + código HTTP. Nunca devolver hashes de password.

---

## 04 — Requests & validation

**P (EN): How do you read the request body?**  
**R (EN):** `request.get_json(silent=True)` for JSON APIs. Query: `request.args`. Headers: `request.headers`.

**P (ES): ¿Cómo lees el body?**  
**R (ES):** `request.get_json()` para JSON. Query `request.args`. Headers `request.headers`.

---

**P (EN): Where should validation live?**  
**R (EN):** In the view or a dedicated validator/schema (marshmallow/pydantic). Return **422** (or 400) with field errors — don’t silently ignore bad input.

**P (ES): ¿Dónde validar?**  
**R (ES):** En la view o schema dedicado. Responde **422/400** con errores por campo.

---

## 05 — Models / ORM (SQLAlchemy)

**P (EN): How do you model User → Project (1:N)?**  
**R (EN):** Foreign key `project.user_id` + `relationship`. Load with `joinedload` / `selectinload` to avoid N+1.

**P (ES): ¿Cómo modelar User → Project?**  
**R (ES):** FK `user_id` + `relationship`. Eager load con `joinedload`/`selectinload` para evitar N+1.

---

**P (EN): What is N+1 and how do you fix it in SQLAlchemy?**  
**R (EN):** One query for parents + one query per parent for children. Fix: `joinedload` / `selectinload`, or aggregate with `func.count`.

**P (ES): ¿N+1 en SQLAlchemy?**  
**R (ES):** 1 query de padres + N de hijos. Fix: `joinedload`/`selectinload` o `func.count`.

---

**P (EN): How do you run a transaction?**  
**R (EN):** Commit once after related writes, or use a context that rolls back on error. Example: archive project + update tasks atomically.

**P (ES): ¿Transacción?**  
**R (ES):** Un commit para escrituras relacionadas; rollback si falla. Ej.: archivar proyecto + actualizar tasks atómico.

---

## 06 — Auth (JWT)

**P (EN): Describe JWT auth flow for a Flask API + React.**  
**R (EN):** Register hashes password → login verifies and returns JWT → client sends `Authorization: Bearer <token>` → decorator/middleware decodes token and loads user → missing/invalid → **401**.

**P (ES): ¿Flujo JWT Flask + React?**  
**R (ES):** Register hashea → login verifica y devuelve JWT → cliente manda Bearer → decorator decodifica → sin token / inválido → **401**.

---

**P (EN): Why hash passwords?**  
**R (EN):** If the DB leaks, attackers shouldn’t get plain passwords. Use werkzeug/`generate_password_hash` or bcrypt — never store plaintext.

**P (ES): ¿Por qué hashear passwords?**  
**R (ES):** Si filtra la DB no deben salir en claro. Werkzeug/bcrypt — nunca plaintext.

---

## 07 — Hooks / middleware-like

**P (EN): `before_request` / `after_request` / error handlers?**  
**R (EN):** `before_request` runs before views (auth checks, logging). `after_request` mutates response. `@app.errorhandler(404)` centralizes error JSON.

**P (ES): ¿Hooks de Flask?**  
**R (ES):** `before_request` antes de la view. `after_request` sobre la response. `errorhandler` para JSON de errores uniforme.

---

## 08 — API & CORS

**P (EN): What is CORS and why do SPAs need it?**  
**R (EN):** Cross-Origin Resource Sharing — browser blocks JS from other origins unless the API sends CORS headers. Use `flask-cors` in dev; configure allowed origins in prod.

**P (ES): ¿Qué es CORS?**  
**R (ES):** El browser bloquea requests cross-origin sin headers CORS. `flask-cors` en dev; origins permitidos en prod.

---

**P (EN): Common status codes you must know?**  
**R (EN):** 200 OK, 201 Created, 204 No Content, 400 Bad Request, **401** Unauthorized, 403 Forbidden, **404** Not Found, **422** validation.

**P (ES): ¿Status codes clave?**  
**R (ES):** 200, 201, 204, 400, **401**, 403, **404**, **422**.

---

## 09 — Testing

**P (EN): How do you test a Flask API?**  
**R (EN):** `app.test_client()` + pytest. Create app with test config/DB. Assert status + JSON body. Two smoke tests beat zero.

**P (ES): ¿Cómo testear Flask?**  
**R (ES):** `test_client()` + pytest. App con config de test. Assert status + JSON. Dos smoke tests > cero.

---

## Mini-glosario

| Término | ES | EN |
|---------|----|----|
| WSGI | Interfaz app↔servidor sync | Web Server Gateway Interface |
| Blueprint | Módulo de rutas | Route module |
| Application factory | `create_app()` | App factory pattern |
| JWT | Token firmado de auth | JSON Web Token |
| N+1 | 1 + N queries | One + N queries anti-pattern |
| CORS | Permisos cross-origin | Cross-Origin Resource Sharing |
| Eager load | Cargar relaciones de una | Prefetch related data |

---

## Material por carpeta

| Carpeta | Contenido |
|---------|-----------|
| `01-fundamentos/` | App factory, config, extensions |
| `02-routing/` | Routes, methods, converters |
| `03-views/` | View functions, JSON responses |
| `04-requests/` | `request`, validation |
| `05-models-orm/` | SQLAlchemy models, N+1, transactions |
| `06-auth/` | JWT decorator, password hash |
| `07-hooks/` | before/after request, error handlers |
| `08-api/` | Blueprint API + CORS notes |
| `09-testing/` | pytest + test_client |

Challenge: `../code-challenges/06-epam-python-react-tracker/` · Solución Flask: `../code-challenges/01-python-task-api/solution/`
