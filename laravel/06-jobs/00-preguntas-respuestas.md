# Preguntas y Respuestas — Jobs y Queues

> Review rápido sin código.

---

**P: ¿Cuándo usarías una Queue?**
R: Tareas lentas que no deben bloquear la respuesta HTTP: emails, procesamiento de imágenes, reportes, integraciones externas.

---

**P: ¿Qué es un Worker?**
R: Proceso que escucha la cola y ejecuta jobs. `php artisan queue:work`. En producción lo mantiene Supervisor o Horizon.

---

**P: ¿Cómo configurar reintentos?**
R: Propiedades `$tries`, `$backoff`, `$timeout` en el Job. O flags en `queue:work --tries=3`.

---

**P: ¿Qué pasa si un Job falla definitivamente?**
R: Va a `failed_jobs`. Puedes reintentar manualmente, usar `failed()` en el Job para cleanup, o notificar.

---

**P: ¿Qué es Horizon?**
R: Dashboard de Laravel para monitorear colas Redis: throughput, tiempos, jobs fallidos, balanceo de workers.

---

**P: ¿Sync vs Redis/database queue driver?**
R: Sync ejecuta inmediatamente (dev/tests). Redis/database encolan para workers async (producción).

---

**P: ¿Job vs Event?**
R: Job: tarea específica en cola. Event: algo ocurrió; listeners pueden ir a cola o ejecutarse sync. Events desacoplan emisor de reacciones.
