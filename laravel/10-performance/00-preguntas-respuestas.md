# Preguntas y Respuestas — Performance (Cache, Redis, Horizon)

> Review rápido sin código.

---

**P: ¿Cuándo usar cache en Laravel?**
R: Datos que cambian poco y se leen mucho: config, listas de categorías, permisos, queries costosas. `Cache::remember()`.

---

**P: ¿Qué drivers de cache existen?**
R: file, redis, memcached, database, array (tests). Redis es el más usado en producción por velocidad y features (tags, locks).

---

**P: ¿Qué son cache tags?**
R: Agrupar keys de cache para invalidar en bloque. `Cache::tags(['users'])->flush()`. Solo redis/memcached.

---

**P: ¿Para qué sirve Redis en Laravel además de cache?**
R: Sessions, queues (Horizon), broadcasting, rate limiting, locks distribuidos.

---

**P: ¿Qué es un cache lock?**
R: Evita que dos procesos ejecuten la misma tarea crítica simultáneamente. Útil para scheduled jobs o procesamiento de facturas.

---

**P: ¿Horizon vs `queue:work` manual?**
R: Horizon: dashboard, métricas, auto-balanceo, gestión de failed jobs. `queue:work`: básico, sin UI. Producción seria usa Horizon + Supervisor.

---

**P: ¿Invalidar cache al actualizar modelo?**
R: Observer o evento que hace `Cache::forget()` o `Cache::tags()->flush()` cuando el modelo cambia.
