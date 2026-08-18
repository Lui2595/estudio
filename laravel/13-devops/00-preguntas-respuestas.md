# Preguntas y Respuestas — DevOps Laravel

> Review rápido sin código.

---

**P: ¿Para qué sirve Supervisor en Laravel?**
R: Mantener workers de cola y Horizon corriendo en producción. Reinicia automáticamente si el proceso muere.

---

**P: ¿Qué procesos debe supervisar Supervisor?**
R: `queue:work` o `horizon`, y opcionalmente scheduler via cron (`* * * * * php artisan schedule:run`).

---

**P: ¿Qué incluye un docker-compose típico Laravel?**
R: PHP-FPM, Nginx, MySQL/PostgreSQL, Redis, y opcionalmente un container para queue worker.

---

**P: ¿Qué es el Laravel Scheduler?**
R: Cron único que ejecuta `schedule:run` cada minuto. Laravel decide qué tareas correr (backups, limpieza, reportes).

---

**P: ¿Deploy checklist Laravel?**
R: `composer install --no-dev`, `php artisan migrate --force`, `config:cache`, `route:cache`, `view:cache`, restart queue workers.

---

**P: ¿Por qué `config:cache` en producción?**
R: Combina todos los configs en un archivo. Más rápido, pero cambios en `.env` requieren re-cachear.

---

**P: ¿Zero-downtime deploy?**
R: Blue-green deployment, migraciones backward-compatible, restart graceful de workers con `horizon:terminate`.
