# Preguntas y Respuestas — Django (Completo)

> Review para **EPAM Python.Web** y backend Django. **P/R en inglés** (entrevista) y **ES** (estudio).  
> Código por área → carpetas `01-…` abajo. API moderna: **Django REST Framework (DRF)**.

| Temas | Fundamentos · URLs · Views · Templates · Models · Forms · Auth · Middleware · DRF · Testing |
| Enfoque | Django MVT + DRF + JWT (SPA React) |

---

## 01 — Fundamentos / Fundamentals

**P (EN): What is Django’s architecture?**  
**R (EN):** MVT — Model (ORM), View (request logic), Template (HTML). For APIs, views often return JSON via DRF instead of templates.

**P (ES): ¿Arquitectura de Django?**  
**R (ES):** MVT: Model, View, Template. En APIs, las views (DRF) devuelven JSON en lugar de HTML.

---

**P (EN): Project vs app?**  
**R (EN):** Project = settings + root URLconf + WSGI/ASGI (interfaces for running Django apps on web servers). App = reusable feature package (`users`, `projects`) with models/views/urls.

**P (ES): ¿Project vs app?**  
**R (ES):** Project = config global. App = módulo de feature reutilizable (`users`, `projects`).

---

**P (EN): Django vs Flask?**  
**R (EN):** Django is batteries-included (ORM, admin, auth, migrations). Flask is minimal — you assemble pieces. Django wins for large apps with conventions; Flask for small/custom APIs fast.

**P (ES): ¿Django vs Flask?**  
**R (ES):** Django trae ORM/admin/auth. Flask es mínimo y flexible. Django = convenciones y apps grandes; Flask = API chica/rápida.

---

## 02 — URLs / Routing

**P (EN): How does URL routing work?**  
**R (EN):** `urls.py` maps path patterns to views. Include app urls with `include()`. Path converters: `<int:pk>`, `<slug:slug>`. Prefer `path()` over old `url()`.

**P (ES): ¿Cómo funciona el routing?**  
**R (ES):** `urls.py` mapea paths → views. `include()` para apps. Convertidores `<int:pk>`. Preferir `path()`.

---

**P (EN): What is `reverse` / `{% url %}`?**  
**R (EN):** Build URLs by name instead of hardcoding paths — safer when routes change.

**P (ES): ¿`reverse` / `{% url %}`?**  
**R (ES):** Generar URLs por nombre, no hardcodear paths.

---

## 03 — Views

**P (EN): FBV vs CBV?**  
**R (EN):** Function-Based Views = simple functions. Class-Based Views = reusable classes (`ListView`, `CreateView`) with mixins. For APIs, DRF `APIView` / `ViewSet` are the usual choice.

**P (ES): ¿FBV vs CBV?**  
**R (ES):** FBV = funciones. CBV = clases reutilizables. En APIs: DRF `APIView` / `ViewSet`.

---

**P (EN): What should a view do / not do?**  
**R (EN):** Parse request, call services/ORM, return response. Avoid fat views — business rules belong in services/model methods.

**P (ES): ¿Qué debe / no debe hacer una view?**  
**R (ES):** Request → lógica/servicio → response. Evitar views gordas; reglas de negocio fuera.

---

## 04 — Templates

**P (EN): When do you use Django templates vs React?**  
**R (EN):** Templates for server-rendered HTML (admin, classic sites). React SPA talks to DRF JSON APIs — templates optional.

**P (ES): ¿Templates vs React?**  
**R (ES):** Templates = HTML server-side. SPA React = consume API JSON (DRF); templates opcionales.

---

**P (EN): Template inheritance?**  
**R (EN):** `base.html` with `{% block %}`; child templates `{% extends %}` and fill blocks. Keeps layout DRY (Don't Repeat Yourself).

**P (ES): ¿Herencia de templates?**  
**R (ES):** `base.html` + `{% block %}`; hijos con `{% extends %}`. Layout DRY.

---

## 05 — Models / ORM

**P (EN): How do you define a 1:N relation?**  
**R (EN):** `ForeignKey` on the “many” side (`Project.user`). Reverse accessor: `user.project_set` or related_name.

**P (ES): ¿Relación 1:N?**  
**R (ES):** `ForeignKey` en el lado “muchos”. Reverse: `related_name` o `*_set`.

---

**P (EN): N+1 in Django — fix?**  
**R (EN):** `select_related` for FK/OneToOne (SQL JOIN). `prefetch_related` for reverse/M2M. Counts: `annotate(Count('tasks'))`.

**P (ES): ¿N+1 en Django?**  
**R (ES):** `select_related` (FK). `prefetch_related` (reverse/M2M). Conteos: `annotate(Count(...))`.

---

**P (EN): QuerySet vs `iterator()` — memory?**  
**R (EN):** A QuerySet caches evaluated rows in RAM (second loop is free). `iterator()` streams without that cache — use for large exports (100k rows, CSV). Iterating again hits the DB.

**P (ES): ¿QuerySet vs iterator() y memoria?**  
**R (ES):** QuerySet cachea. `iterator()` no — menos RAM; segundo for = otro SQL.

---

**P (EN): Migrations?**  
**R (EN):** `makemigrations` generates migration files from model changes; `migrate` applies them to the DB. Never edit production DB by hand.

**P (ES): ¿Migrations?**  
**R (ES):** `makemigrations` crea archivos; `migrate` aplica. No tocar prod a mano.

---

**P (EN): Transactions?**  
**R (EN):** `atomic()` ensures all-or-nothing. Use for multi-step writes (archive project + update tasks).

**P (ES): ¿Transacciones?**  
**R (ES):** `atomic()` = todo o nada. Escrituras multi-paso.

---

## 06 — Forms / validation

**P (EN): ModelForm vs Serializer (DRF)?**  
**R (EN):** ModelForm for HTML forms. DRF Serializer for API input/output validation and shaping JSON.

**P (ES): ¿ModelForm vs Serializer?**  
**R (ES):** ModelForm = forms HTML. Serializer DRF = validar/serializar JSON de API.

---

## 07 — Auth

**P (EN): Django auth built-in vs JWT for SPA?**  
**R (EN):** Built-in sessions + cookies suit server-rendered apps. SPAs usually use JWT (e.g. simplejwt) with `Authorization: Bearer`.

**P (ES): ¿Auth Django vs JWT para SPA?**  
**R (ES):** Sessions/cookies = HTML clásico. SPA → JWT Bearer (simplejwt).

---

**P (EN): Permissions in DRF?**  
**R (EN):** `IsAuthenticated`, `IsAdminUser`, object-level permissions. Unauthenticated → **401**; authenticated but forbidden → **403**.

**P (ES): ¿Permissions DRF?**  
**R (ES):** `IsAuthenticated`, etc. Sin auth → **401**; sin permiso → **403**.

---

## 08 — Middleware

**P (EN): What is Django middleware?**  
**R (EN):** Hooks in the request/response pipeline (security, sessions, auth, CSRF). Order in `MIDDLEWARE` matters.

**P (ES): ¿Qué es middleware?**  
**R (ES):** Capas en el pipeline request/response. El orden en `MIDDLEWARE` importa.

---

**P (EN): CSRF — when does it matter?**  
**R (EN):** Critical for cookie/session POSTs from browsers. Pure Bearer JWT APIs often disable CSRF for those endpoints — still protect session-based views.

**P (ES): ¿CSRF cuándo importa?**  
**R (ES):** Crítico con cookies/sessions. APIs solo Bearer JWT suelen no usar CSRF en esos endpoints; sí proteger vistas session.

---

## 09 — API / DRF

**P (EN): What is a Serializer?**  
**R (EN):** Converts models ↔ JSON and validates input. Analogous to a Form for APIs.

**P (ES): ¿Qué es un Serializer?**  
**R (ES):** Modelos ↔ JSON + validación. Como un Form para APIs.

---

**P (EN): Why not put business logic in a serializer?**  
**R (EN):** Serializers validate and shape JSON. Side effects (email, payments, multi-model workflows) belong in a **service** so you can reuse them from Celery/tests without HTTP. Fat `validate()`/`create()` breaks SRP (Single Responsibility Principle).

**P (ES): ¿Por qué no lógica en el serializer?**  
**R (ES):** Serializer = validar + JSON. Negocio = service. Reuso y tests sin HTTP.

---

**P (EN): APIView vs ViewSet vs ModelViewSet?**  
**R (EN):** `APIView` = explicit methods. `ViewSet` groups list/create/retrieve/… `ModelViewSet` + router = full CRUD with little code — still keep business logic out.

**P (ES): ¿APIView vs ViewSet vs ModelViewSet?**  
**R (ES):** `APIView` explícito. `ViewSet` agrupa acciones. `ModelViewSet` + router = CRUD rápido; lógica de negocio afuera.

---

**P (EN): How do you avoid N+1 in DRF list endpoints?**  
**R (EN):** Override `get_queryset()` with `select_related` / `prefetch_related`. Don’t rely on serializers alone — they trigger lazy loads.

**P (ES): ¿Evitar N+1 en list DRF?**  
**R (ES):** `get_queryset()` con `select_related`/`prefetch_related`. El serializer solo dispara lazy loads si no eager-loadeas.

---

## 10 — Testing

**P (EN): How do you test Django/DRF APIs?**  
**R (EN):** `APIClient` / `APITestCase`, create user, force_authenticate or obtain JWT, assert status + payload. Prefer DB transactions / TestCase.

**P (ES): ¿Testear Django/DRF?**  
**R (ES):** `APIClient`, autenticar, assert status + body. `TestCase` / transacciones de test.

---

## Mini-glosario

| Término | ES | EN |
|---------|----|----|
| MVT | Model-View-Template | Django architecture |
| ORM | Mapeo objeto-relacional | Object-Relational Mapping |
| DRF | Django REST Framework | REST toolkit for Django |
| FBV / CBV | Vista función / clase | Function / Class-Based View |
| `select_related` | JOIN eager FK | SQL JOIN for FK |
| `prefetch_related` | Eager reverse/M2M | Separate query prefetch |
| JWT | Token auth SPA | JSON Web Token |
| CSRF | Protección forms cookie | Cross-Site Request Forgery |

---

## Material por carpeta

| Carpeta | Contenido |
|---------|-----------|
| `01-fundamentos/` | Project/app, settings, MVT |
| `02-urls/` | `path`, `include`, names |
| `03-views/` | FBV, CBV |
| `04-templates/` | extends, blocks |
| `05-models-orm/` | models, N+1, atomic, iterator |
| `06-forms/` | ModelForm notes |
| `07-auth/` | sessions vs JWT |
| `08-middleware/` | pipeline, CSRF |
| `09-api-drf/` | serializers, viewsets, thin serializer |
| `10-testing/` | APIClient smoke |
| `11-arquitectura/` | Service layer, modularizar monolito |

Challenge: `../code-challenges/06-epam-python-react-tracker/` · Prep: `../entrevistas/epam/python-web-prep.md`
