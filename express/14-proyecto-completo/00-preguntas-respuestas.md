# Preguntas y Respuestas — Proyecto Express Completo

> Review rápido sin código.

---

**P: ¿Orden de setup en app.js?**
R: dotenv → helmet/cors/compression → body parsers → routes → 404 handler → error middleware (último siempre).

---

**P: ¿Health check endpoint?**
R: GET /health sin auth para load balancers y monitoring. Retorna status + timestamp.

---

**P: ¿Por qué exportar app sin listen?**
R: Permite Supertest importar app para tests sin conflicto de puerto. listen solo en server.js o if require.main.

---

**P: Variables de entorno esenciales?**
R: PORT, NODE_ENV, JWT secrets, DATABASE_URL, FRONTEND_URL (CORS). Nunca secrets hardcodeados.

---

**P: server.js vs app.js?**
R: app.js: configuración Express pura. server.js: listen, cluster, graceful shutdown. Separación testeable.

---

**P: Graceful shutdown?**
R: Capturar SIGTERM, cerrar server, terminar conexiones activas, luego exit. Importante en deploys Kubernetes/Docker.

---

**P: Checklist pre-producción?**
R: NODE_ENV=production, helmet, CORS restrictivo, rate limit, error handler sin stacks, PM2/cluster, logs estructurados, health check.
