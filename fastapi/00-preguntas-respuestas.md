# Preguntas y Respuestas — FastAPI (entrevista senior)

> Pack completo de voz: `../entrevistas/django-react-fastapi-senior/`

**P (EN): BackgroundTasks vs Celery?**  
**R (EN):** BackgroundTasks run in the **same process** after the response — simple, not durable. Celery uses a **broker** (Redis/RabbitMQ) + workers: retries, scale, survive API crash. Critical work (payments) → Celery.

**P (ES): ¿BackgroundTasks vs Celery?**  
**R (ES):** BackgroundTasks = mismo proceso; si cae el server, se pierde. Celery = cola persistente + retry + workers.

---

**P (EN): Risks of Celery `autoretry` without backoff?**  
**R (EN):** Retry storm: immediate retries hammer a down dependency, saturate workers, explode the queue, duplicate side effects if not idempotent. Use `max_retries`, exponential backoff + jitter, retry only transient errors, DLQ after N failures.

**P (ES): ¿Riesgos de autoretry sin backoff?**  
**R (ES):** Tormenta de reintentos: golpean al servicio caído, saturan workers, duplican cobros/emails. Backoff exponencial + jitter + techo + idempotencia.

---

**P (EN): Worker dies — how is POST /payment idempotent?**  
**R (EN):** Client sends `Idempotency-Key`. Persist key → result (unique constraint). Retry returns the same body; no second charge. The Celery task must also key on that id.

**P (ES): ¿Idempotencia si cae el worker?**  
**R (ES):** `Idempotency-Key` en DB/Redis. Mismo key = mismo efecto. El task Celery también es idempotente.

---

**P (EN): When not to use async?**  
**R (EN):** CPU-bound work — GIL still serializes Python bytecode. Async helps I/O waits (HTTP, DB).

Código: `01-background-vs-celery.py`, `02-idempotency-key.py`
