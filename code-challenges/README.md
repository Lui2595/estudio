# Code Challenges — Senior Interview Practice

> **Practice prompts** in each folder. **Soluciones de estudio** → [`SOLUTIONS.md`](SOLUTIONS.md) y [`pure-code/STUDY-SOLUTIONS.md`](pure-code/STUDY-SOLUTIONS.md).

## Para qué son

| Entrevista | Challenges recomendados |
|------------|-------------------------|
| **EPAM** coding puro / online test | `pure-code/` (Python) |
| **EPAM** (Python web — Django / Flask) | `01`, `02`, `04` |
| **Lunes** (Laravel + React / Next.js + SQL) | `03`, `04`, `05` |
| Coding en **TypeScript** / PHP / Python / Node | `pure-code/` (mismo enunciado) |
| Full stack senior (todo) | `pure-code` + apps `01`–`05` |

## Cómo practicar (reglas)

1. Copia la carpeta del challenge a otro directorio (o abre solo ese `README.md`).
2. Crea el proyecto desde cero (`django-admin`, `flask`, `composer create-project`, `npx create-next-app`, etc.).
3. **No uses Cursor / ChatGPT / Copilot** mientras resuelves.
4. Cronómetro según el tiempo marcado (típicamente 60–90 min).
5. Al terminar, revisa con tu checklist de acceptance criteria.
6. Solo después puedes contrastar con tu material de estudio en `../entrevistas/`.

## A) Pure code (TypeScript · Python · PHP · Node)

Sin frameworks. **Default de práctica: TypeScript** (`strict`). Luego Python/PHP según la entrevista.

| # | Título | Tiempo |
|---|--------|--------|
| P01 | LRU Cache | 45 min |
| P02 | Sliding Window Rate Limiter | 40 min |
| P03 | Dependency Resolver (topo sort) | 50 min |
| P04 | Account Ledger | 50 min |
| P05 | Meeting Scheduler (intervals) | 45 min |

→ Carpeta: [`pure-code/README.md`](pure-code/README.md) · setup TS: [`pure-code/TYPESCRIPT.md`](pure-code/TYPESCRIPT.md) · **estudio rápido:** [`pure-code/STUDY-SOLUTIONS.md`](pure-code/STUDY-SOLUTIONS.md)

## B) App / stack challenges

| # | Título | Stack | Tiempo |
|---|--------|-------|--------|
| 01 | Task API with Auth | Python + Flask **o** Django REST | 75 min |
| 02 | Async Jobs + Idempotency | Python + Redis queue + Postgres | 90 min |
| 03 | Orders Dashboard | Laravel API + Next.js + React | 90 min |
| 04 | SQL Performance Lab | MySQL **y** PostgreSQL | 60 min |
| 05 | Product Catalog UI | Next.js + CSS + Core Web Vitals | 75 min |
| **06** | **EPAM Python.Web + React Tracker** | Flask/Django + React Vite | **90 min** |

→ EPAM jueves: [`06-epam-python-react-tracker/README.md`](06-epam-python-react-tracker/README.md)

## Carpeta

```
code-challenges/
├── README.md
├── pure-code/                 ← TypeScript (default) | Python | PHP | Node
│   ├── TYPESCRIPT.md
│   ├── 01-lru-cache/
│   ├── 02-rate-limiter/
│   ├── 03-dependency-resolver/
│   ├── 04-account-ledger/
│   └── 05-meeting-scheduler/
├── 01-python-task-api/
├── 02-python-async-idempotency/
├── 03-laravel-next-orders/
├── 04-sql-performance-lab/
└── 05-nextjs-catalog-css/
```

Cada challenge incluye:

- `README.md` — enunciado, requisitos, acceptance criteria, instrucciones de ejecución
- `starter/` — seed data / schema mínimo (sin lógica de negocio resuelta)
- `CHECKLIST.md` — autoevaluación al terminar

## Mentalidad senior

En cada challenge se espera que demuestres (sin que te lo pidan explícito):

- Validación de inputs
- Manejo de errores y status codes correctos
- Transacciones / integridad de datos
- Evitar N+1 (One Query + N Relation Queries)
- Tests mínimos o al menos casos edge documentados
- Código legible, capas claras (controller/service/repo o equivalente)
- Trade-offs breves en un `NOTES.md` tuyo (opcional, 5 líneas)

## Orden sugerido esta semana

```
Día 1 (coding puro TS):  pure-code/01 → 02 → 03   (TypeScript strict)
Día 2 (coding + EPAM):   pure-code/04 → 05 en TS; repetir 01–02 en Python
Día 3 (EPAM web):        app 01 → 02
Día 4 (Lunes stack):     app 03 + 05 en TypeScript/Next → SQL 04
```
