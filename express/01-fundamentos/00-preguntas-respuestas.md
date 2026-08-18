# Preguntas y Respuestas — Express Fundamentos

> Review rápido sin código.

---

**P: ¿Qué es Express?**
R: Framework minimalista Node.js para HTTP APIs y servidores. Middleware pipeline: req pasa por cadena hasta response.

---

**P: ¿Qué pasa si olvidas next()?**
R: Request se queda colgada sin respuesta. Cliente timeout. Siempre llamar next() o enviar response.

---

**P: req.params vs req.query vs req.body?**
R: params: segmentos URL (/users/:id). query: ?page=1&limit=10. body: payload POST/PUT/PATCH (requiere json parser).

---

**P: express.json() para qué?**
R: Middleware que parsea body JSON y lo pone en req.body. Sin él, req.body es undefined.

---

**P: ¿Express incluye routing?**
R: Sí básico. express.Router() para modularizar. No incluye ORM, auth, validation — tú los agregas.

---

**P: ¿Express vs Node http module?**
R: http es primitivo. Express añade routing, middleware, simplifica APIs. Fastify/NestJS son alternativas más estructuradas.
