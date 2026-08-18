# Índice — Senior Django / React / FastAPI

> Pack para la entrevista de **mañana**. Formato de cada ficha: **Te preguntan → Responde (voz) → Justifica (código/esquema) → Follow-up**.

| Archivo | Qué cubre (preguntas reales que ya te hicieron) |
|---------|--------------------------------------------------|
| [`00-RUTA-MANANA.md`](00-RUTA-MANANA.md) | Orden de estudio + P0/P1 |
| [`00-glosario.md`](00-glosario.md) | Abreviaturas con significado |
| [`01-django-orm.md`](01-django-orm.md) | QuerySet vs `iterator()`, select/prefetch, `atomic`, N+1 |
| [`02-serializers-modularizar.md`](02-serializers-modularizar.md) | Por qué no lógica en serializer, monolito, cuándo modularizar |
| [`03-fastapi-celery-idempotencia.md`](03-fastapi-celery-idempotencia.md) | BackgroundTasks vs Celery, **autoretry sin backoff**, worker caído, Idempotency-Key |
| [`04-react-typescript.md`](04-react-typescript.md) | useMemo / useCallback / React Query, `Partial`, union vs `&` |
| [`05-patrones-arquitectura.md`](05-patrones-arquitectura.md) | Service, Repository, Strategy, cache, CQRS, CAP… |
| [`06-scripts-30s.md`](06-scripts-30s.md) | Respuestas cortas para decir en voz alta |
| [`07-banco-sr-extra.md`](07-banco-sr-extra.md) | **+40 preguntas SR relacionadas** (follow-ups, no solo la ronda 1) |
| [`08-docker-aws.md`](08-docker-aws.md) | Imagen ECS grande (tu respuesta) + listado simple EC2/ECS/RDS/Lambda… |

## Código en carpetas de estudio

| Dónde | Qué |
|-------|-----|
| `django/05-models-orm/` | iterator, select/prefetch, atomic |
| `django/09-api-drf/` | serializer delgado + service |
| `django/11-arquitectura/` | modularización + service layer |
| `fastapi/` | BackgroundTasks vs Celery + idempotency |
| `react/06-performance/` + `react/05-react-query/` | memo vs server state |
| `typescript/02-tipos/` + `04-utility-types/` | `?`, union, intersection, `Partial` |
