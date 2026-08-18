# Ruta real — entrevista Senior Django + React + FastAPI

> Objetivo: **no memorizar 40 temas**. Memorizar **12 respuestas de voz** + 1 frase de trade-off cada una.  
> Stack de la ronda: **Django ORM / DRF**, **FastAPI + Celery**, **React + TypeScript**.

Lee en este orden. Si te quedas corto de tiempo, **solo P0**.

---

## Cómo usar cada ficha

1. Lee **Te preguntan**.  
2. Di **Responde (voz)** en voz alta, en inglés si la entrevista es en inglés.  
3. Mira **Justifica** (código/esquema) — es lo que dibujas en pizarra.  
4. Si te piden más, usa **Follow-up**.

Índice de fichas: [`00-index.md`](00-index.md) · Glosario: [`00-glosario.md`](00-glosario.md)

---

## P0 — Obligatorio (90–120 min hoy)

| # | Tema | Ficha | Frase ancla |
|---|------|-------|-------------|
| 1 | QuerySet vs `iterator()` | [`01`](01-django-orm.md) | cache vs memoria |
| 2 | `select_related` vs `prefetch_related` | [`01`](01-django-orm.md) | JOIN vs 2 queries |
| 3 | `transaction.atomic()` + ACID | [`01`](01-django-orm.md) | todo o nada |
| 4 | Lógica **fuera** del serializer | [`02`](02-serializers-modularizar.md) | validate ≠ business |
| 5 | Modularizar monolito / cuándo NO | [`02`](02-serializers-modularizar.md) | cohesión, no folders |
| 6 | BackgroundTasks vs Celery | [`03`](03-fastapi-celery-idempotencia.md) | proceso vs cola |
| 7 | Idempotency-Key + worker caído | [`03`](03-fastapi-celery-idempotencia.md) | mismo key = mismo efecto |
| 8 | `useMemo` vs `useCallback` vs React Query | [`04`](04-react-typescript.md) | valor / fn / server state |
| 9 | `?` / `Partial` · union vs intersection | [`04`](04-react-typescript.md) | opcional · A\|B vs A&B |

Después de P0: corre [`06-scripts-30s.md`](06-scripts-30s.md) **en voz alta 2 veces**.

---

## P1 — Si queda tiempo (45 min)

| # | Tema | Ficha |
|---|------|-------|
| 10 | N+1, índices, API lenta | [`01`](01-django-orm.md) + [`05`](05-patrones-arquitectura.md) |
| 11 | Service / Repository / Strategy | [`05`](05-patrones-arquitectura.md) |
| 12 | Cache aside, rate limit, circuit breaker (1 frase) | [`05`](05-patrones-arquitectura.md) |
| 13 | Banco extra SR (follow-ups) | [`07`](07-banco-sr-extra.md) |

---

## P2 — Solo si te preguntan arquitectura profunda

CAP, CQRS, locking, OAuth2 vs JWT → [`05`](05-patrones-arquitectura.md)  
Outbox, saga, JWT refresh, tests, webhooks, paginación cursor → [`07`](07-banco-sr-extra.md)  
Docker imagen grande en ECS + mapa AWS (RDS, ECS, EC2, Lambda…) → [`08`](08-docker-aws.md)

---

## Día de la entrevista (30 min antes)

1. Abre [`06-scripts-30s.md`](06-scripts-30s.md).  
2. Di las 9 respuestas P0.  
3. Recuerda **trade-off** en cada una (“I wouldn’t always… because…”).  
4. Si no sabes: “I’d measure first: logs/EXPLAIN, then pick X vs Y.”

---

## Si se traban (frases de rescate)

| Te trabas en… | Di esto |
|---------------|---------|
| `atomic` | “It’s Django’s unit of work — all DB writes commit together or roll back. That’s Atomicity in ACID.” |
| Serializer gordo | “Serializer validates and shapes JSON. Business rules live in a service so views stay thin and tests don’t need HTTP.” |
| Celery vs BackgroundTasks | “Same process vs durable queue. If the worker dies, only a persisted task + idempotency key is safe.” |
| React Query vs memo | “React Query is server-state cache. useMemo/useCallback are render optimizations. Different problems.” |
| Modularizar | “I split by responsibility when coupling hurts tests. I don’t split a 80-line CRUD into 15 files.” |
