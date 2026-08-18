# Estudio para Entrevista Senior — Laravel + React

Material de preparación organizado por lenguaje/framework con ejemplos prácticos y preguntas típicas de entrevista.

## Estructura

```
estudio/
├── php/           → Fundamentos del lenguaje
├── python/        → Fundamentos Python + web (Flask/Django) — EPAM
├── laravel/       → Framework (rutas, controllers, eloquent, etc.)
├── javascript/    → Fundamentos JS
├── typescript/    → Tipado estático sobre JS
├── react/         → Frontend React
├── vue/           → Frontend Vue 3 (Composition API, Pinia, Nuxt)
├── seo/           → SEO on-page, técnico, structured data, herramientas
├── mysql/         → SQL relacional (InnoDB, índices, EXPLAIN)
├── postgres/      → SQL avanzado (JSONB, CTEs, window functions, MVCC)
├── mongodb/       → NoSQL documental (embedding, aggregation, sharding)
├── express/       → Node.js API (middleware, JWT, REST, seguridad)
└── code-challenges/ → Challenges timed + soluciones de estudio
```

## Orden de estudio recomendado

### Prioridad alta (si la entrevista es mañana)

| Área | Temas clave |
|------|-------------|
| **Python** | Tipos, OOP, GIL/async, Flask vs Django, JWT, N+1, transacciones |
| **PHP** | OOP, SOLID, Interfaces, Traits, DI, Composer |
| **Laravel** | Service Container, Eloquent, N+1, Queues, Events, Cache, Sanctum |
| **JavaScript** | Closures, Hoisting, this, Event Loop, Promises, async/await |
| **TypeScript** | any vs unknown, interface vs type, generics, utility types, narrowing |
| **React** | useEffect, useMemo, useCallback, Re-rendering, Virtual DOM, React Query |
| **Vue** | ref vs reactive, watch vs watchEffect, Pinia, composables, Vue Router, Nuxt SSR |
| **SEO** | Meta tags, canonical, Core Web Vitals, Schema.org, robots/sitemap, SSR para indexación |
| **Bases de datos** | JOINs, índices, EXPLAIN, ACID, N+1 SQL, embedding vs referencing |
| **Express** | Middleware pipeline, async errors, JWT, REST, helmet/cors/rate-limit |

---

## PHP (`php/`)

| Carpeta | Temas |
|---------|-------|
| `01-variables-y-tipos/` | Tipado estricto, type hinting, union types, nullable, casting |
| `02-oop/` | Encapsulación, herencia, polimorfismo, interfaces, traits, DI |
| `03-memoria/` | Stack vs heap, GC, referencias, copy on write |
| `04-funciones/` | Closures, anonymous functions, arrow functions |
| `05-excepciones/` | try/catch, custom exceptions, Throwable, Error vs Exception |
| `06-composer/` | PSR-4, autoloading, service providers, dependencias |
| `07-arquitectura/` | SOLID, DRY, KISS, YAGNI |
| `08-patrones/` | Repository, Factory, Strategy, Observer, Adapter, Singleton |

---

## Python (`python/`) — EPAM Python.Web

| Carpeta / archivo | Temas |
|-------------------|-------|
| `00-preguntas-respuestas.md` | **~40+ preguntas** EN+ES con glosario |
| `00-ejemplos-con-contexto.md` | **Código + explicación** (list, dict, N+1, JWT, magic methods, etc.) |
| `01-fundamentos/` | list/dict, OrderedDict, **file I/O**, defaults, comprehensions |
| `02-oop/` | classmethod, dataclass, ABC, **MRO diamante**, polimorfismo scraper/API, decorator around |
| `03-async/` | asyncio vs threads, GIL mental model |
| `04-web/` | Patrones API JWT, N+1, transactions |
| `05-magic-methods/` | Dunder: `__str__`/`__repr__`, `__len__`/`[]`, `with`, `__call__` |

Prep entrevista: `entrevistas/epam/python-web-prep.md` · Challenge: `code-challenges/06-epam-python-react-tracker/`

---

## Flask (`flask/`) — API microframework

| Carpeta / archivo | Temas |
|-------------------|-------|
| `00-preguntas-respuestas.md` | Preguntas generales EN+ES (factory, JWT, N+1, CORS…) |
| `01-fundamentos/` | Application factory, extensions |
| `02-routing/` | Routes, Blueprint, converters |
| `03-views/` | Thin views / “controllers” |
| `04-requests/` | `request`, validación → 422 |
| `05-models-orm/` | SQLAlchemy, N+1, transactions, **Flask-Migrate / Alembic** |
| `06-auth/` | JWT decorator, password hash |
| `07-hooks/` | before_request, errorhandlers |
| `08-api/` | Shapes REST + CORS |
| `09-testing/` | pytest + `test_client` |

---

## Django (`django/`) — MVT + DRF

| Carpeta / archivo | Temas |
|-------------------|-------|
| `00-preguntas-respuestas.md` | Preguntas generales EN+ES (MVT, ORM, DRF, JWT…) |
| `01-fundamentos/` | Project vs app, MVT |
| `02-urls/` | `path`, `include`, names |
| `03-views/` | FBV vs CBV |
| `04-templates/` | extends / blocks |
| `05-models-orm/` | FK, N+1, atomic, **iterator vs QuerySet**, select/prefetch |
| `06-forms/` | ModelForm vs Serializer |
| `07-auth/` | Sessions vs JWT |
| `08-middleware/` | Pipeline, CSRF |
| `09-api-drf/` | Serializer, ViewSet, **serializer delgado + service** |
| `10-testing/` | `APIClient` smoke |
| `11-arquitectura/` | Service layer, modularizar monolito |

Pack entrevista mañana: `entrevistas/django-react-fastapi-senior/00-RUTA-MANANA.md`

---

## FastAPI (`fastapi/`)

| Archivo | Temas |
|---------|-------|
| `00-preguntas-respuestas.md` | BackgroundTasks vs Celery, idempotencia, async vs CPU |
| `01-background-vs-celery.py` | Mismo proceso vs cola |
| `02-idempotency-key.py` | Mismo key = un solo cargo |

---

## Laravel (`laravel/`)

| Carpeta | Temas |
|---------|-------|
| `routes/` | web.php, api.php — binding, middleware, resources |
| `01-core/` | Service Container, Facades, Contracts |
| `02-controllers/` | Resource Controller, Single Action Controller |
| `03-requests/` | Form Requests, Custom Rules |
| `04-eloquent/` | Relationships, Eager Loading, N+1, Scopes, Accessors |
| `05-database/` | Migrations, Factories, Seeders, Transactions |
| `06-jobs/` | Queues, Workers, Retry Logic |
| `07-events/` | Events, Listeners |
| `08-api/` | API Resources, Sanctum |
| `09-testing/` | Feature Tests, Unit Tests, Mocking |
| `10-performance/` | Cache, Redis, Horizon |
| `11-arquitectura/` | Repository, Actions Pattern |
| `12-seguridad/` | CSRF, XSS, SQL Injection |
| `13-devops/` | Supervisor, Docker |

---

## JavaScript (`javascript/`)

| Carpeta | Temas |
|---------|-------|
| `01-variables/` | var, let, const |
| `02-scope/` | Global, function, block scope |
| `03-hoisting/` | Hoisting |
| `04-closures/` | Closures |
| `05-this/` | this, arrow functions |
| `06-funciones/` | Arrow, HOF, callbacks |
| `07-arrays/` | map, filter, reduce, find, some, every |
| `08-asincronia/` | Event Loop, Promises, async/await |
| `09-es6/` | Destructuring, spread, rest |
| `10-modulos/` | import/export |
| `11-browser/` | DOM, event bubbling/capturing |

---

## TypeScript (`typescript/`)

| Carpeta | Temas |
|---------|-------|
| `01-fundamentos/` | Tipos básicos, any vs unknown vs never |
| `02-tipos/` | Interface vs type, union/intersection, optional, enums |
| `03-generics/` | Genéricos, constraints (extends) |
| `04-utility-types/` | Pick, Omit, Partial, mapped/conditional types |
| `05-narrowing/` | Type guards, discriminated unions |
| `06-funciones/` | Function types, overloads |
| `07-clases/` | Modificadores, implements, extends |
| `08-modulos/` | import/export, import type |
| `09-config/` | tsconfig.json, strict mode |
| `10-assertions/` | as vs satisfies, const assertions |
| `11-react/` | Props, events, hooks tipados |
| `12-avanzado/` | Declaration files, index signatures, keyof typeof |

---

## React (`react/`)

| Carpeta | Temas |
|---------|-------|
| `01-fundamentos/` | JSX, props, state, re-render |
| `02-hooks/` | useState, useEffect, useMemo, useCallback, useRef, useContext, custom hooks |
| `03-virtual-dom/` | Virtual DOM, reconciliation, keys |
| `04-estado/` | Context, Zustand |
| `05-react-query/` | Query keys, cache, invalidation, optimistic updates |
| `06-performance/` | React.memo, lazy loading, code splitting |
| `07-formularios/` | Controlled vs uncontrolled |
| `08-nextjs/` | SSR, CSR, SSG, ISR |
| `09-avanzado/` | Compound components, HOC, render props |
| `10-testing/` | Jest, React Testing Library |
| `11-react18/` | Concurrent rendering, Suspense, Server Components |

---

## Vue.js (`vue/`)

| Carpeta | Temas |
|---------|-------|
| `01-fundamentos/` | Componentes, props, emits, directivas, v-model |
| `02-composition-api/` | ref, reactive, computed, watch, Options vs Composition |
| `03-reactivity/` | Proxies, toRefs, shallowRef, Vue 3 vs Vue 2 |
| `04-lifecycle/` | onMounted, onUnmounted, cleanup |
| `05-composables/` | useFetch, lógica reutilizable (custom hooks) |
| `06-pinia/` | State management, Pinia vs Vuex |
| `07-router/` | Navigation guards, lazy routes, props en rutas |
| `08-provide-inject/` | Prop drilling, provide/inject vs Pinia |
| `09-performance/` | v-memo, async components, KeepAlive |
| `10-nuxt/` | SSR, SSG, ISR, useFetch |
| `11-testing/` | Vitest, Vue Test Utils |
| `12-avanzado/` | Teleport, slots, defineModel, script setup |

Review consolidado: `vue/00-preguntas-respuestas.md`

---

## SEO (`seo/`)

| Carpeta | Temas |
|---------|-------|
| `01-on-page/` | Title, description, headings, URLs, canonical, contenido |
| `02-meta-social/` | Open Graph, Twitter Cards |
| `03-structured-data/` | JSON-LD, Schema.org, rich snippets |
| `04-tecnico/` | robots.txt, sitemap, CWV, hreflang, checklist |
| `05-imagenes/` | alt, WebP, lazy load, CLS |
| `06-laravel/` | SEO dinámico en Blade, slugs, paquetes |
| `07-frontend/` | SSR vs CSR, React/Next, Vue/Nuxt, Helmet |
| `08-local-eeat/` | SEO local, E-E-A-T, link building |
| `09-herramientas/` | Search Console, Lighthouse, auditorías |

Review consolidado: `seo/00-preguntas-respuestas.md`

---

## MySQL (`mysql/`)

| Carpeta | Temas |
|---------|-------|
| `01-fundamentos/` | CRUD, JOINs (INNER, LEFT, self join) |
| `02-indices/` | B-Tree, compuestos, FULLTEXT, covering index |
| `03-transacciones/` | ACID, isolation levels, FOR UPDATE |
| `04-performance/` | EXPLAIN, optimización de queries |
| `05-diseno/` | Normalización, desnormalización, JSON column |
| `06-avanzado/` | Procedures, triggers, views, replicación, particionamiento |

---

## PostgreSQL (`postgres/`)

| Carpeta | Temas |
|---------|-------|
| `01-fundamentos/` | CRUD, tipos nativos, UPSERT, RETURNING |
| `02-queries/` | CTEs recursivas, window functions |
| `03-indices/` | Parciales, GIN, GiST, full-text search |
| `04-transacciones/` | MVCC, VACUUM, locks, SKIP LOCKED |
| `05-jsonb/` | Operadores JSONB, índices GIN |
| `06-comparativa/` | PostgreSQL vs MySQL, migración Laravel |

---

## MongoDB (`mongodb/`)

| Carpeta | Temas |
|---------|-------|
| `01-fundamentos/` | Documentos, colecciones, CRUD, operadores |
| `02-diseno/` | Embedding vs referencing, bucket pattern |
| `03-indices/` | Compuestos, ESR rule, TTL, partial |
| `04-aggregation/` | Pipeline ($match, $group, $lookup) |
| `05-transacciones/` | ACID multi-documento |
| `06-avanzado/` | Replica sets, sharding, ObjectId |
| `07-comparativa/` | SQL vs NoSQL, stack híbrido |

---

## Express.js (`express/`)

| Carpeta | Temas |
|---------|-------|
| `01-fundamentos/` | App básica, req/res, params, query, body |
| `02-routing/` | Router modular, mergeParams, REST verbs |
| `03-middleware/` | Application/router/error middleware, auth, authorize |
| `04-errores/` | Async error handling, asyncHandler, AppError |
| `05-arquitectura/` | Controllers, services, separación de capas |
| `06-validacion/` | express-validator |
| `07-auth/` | JWT access/refresh tokens |
| `08-seguridad/` | Helmet, CORS, rate limiting |
| `09-rest-api/` | Diseño REST, códigos HTTP, paginación |
| `10-uploads/` | Multer, validación de archivos |
| `11-testing/` | Supertest + Jest |
| `12-performance/` | Compression, cluster, PM2 |
| `13-stack/` | Express vs Laravel, arquitecturas con React |
| `14-proyecto-completo/` | App de referencia producción |

---

## Cómo usar este material

1. **Lee el comentario del encabezado** de cada archivo — incluye la pregunta típica de entrevista.
2. **Review rápido por tema:** `php/00-preguntas-respuestas.md`, `laravel/00-preguntas-respuestas.md`, `vue/00-preguntas-respuestas.md`, etc.
3. **Review por sección:** `00-preguntas-respuestas.md` dentro de cada subcarpeta.
4. **Ejecuta los ejemplos PHP** con `php archivo.php` desde XAMPP.
4. **Ejecuta los ejemplos PHP** con `php archivo.php` desde XAMPP.
5. **Los ejemplos Laravel** son referencia — cópialos a un proyecto Laravel real para probarlos.
6. **JavaScript**: ejecuta con Node (`node archivo.js`) o en la consola del navegador.
7. **TypeScript**: compila con `npx tsc --noEmit` para verificar tipos, o usa un proyecto Vite/Next.
8. **React / Vue**: requieren proyecto con Vite o Nuxt para ejecutar componentes.
9. **MySQL/PostgreSQL**: ejecuta en phpMyAdmin, pgAdmin, DBeaver o CLI (`mysql`, `psql`).
10. **MongoDB**: usa MongoDB Compass o `mongosh` con un servidor local o Atlas.
11. **Express**: `npm init`, instala dependencias y ejecuta con `node app.js` o prueba con Supertest.
