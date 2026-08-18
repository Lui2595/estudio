# Preguntas y Respuestas — Performance Express

> Review rápido sin código.

---

**P: ¿Qué hace compression middleware?**
R: Comprime responses gzip/brotli. Reduce bandwidth. CPU trade-off mínimo en APIs JSON.

---

**P: ¿Node cluster mode?**
R: Un proceso por CPU core. Node es single-threaded; cluster aprovecha multicore. PM2 `-i max` más práctico que cluster manual.

---

**P: PM2 vs nodemon?**
R: nodemon: dev auto-restart. PM2: producción con cluster, logs, restart on crash, startup scripts.

---

**P: Cache-Control en API?**
R: Datos estáticos/config: `Cache-Control: public, max-age=300`. Datos dinámicos/user-specific: no-cache o private.

---

**P: ¿Express es el cuello de botella?**
R: Raramente. BD queries, N+1, falta índices suelen ser el problema antes que Express overhead.

---

**P: Keep-alive connections?**
R: HTTP keep-alive reduce overhead de TCP handshake. Nginx reverse proxy maneja esto bien delante de Express.

---

**P: ¿Fastify más rápido?**
R: Benchmarks muestran Fastify más rápido que Express. Express gana en ecosistema y familiaridad. Optimiza BD antes de cambiar framework.
