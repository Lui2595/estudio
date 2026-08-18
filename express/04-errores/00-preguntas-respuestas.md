# Preguntas y Respuestas — Errores Async Express

> Review rápido sin código. **Muy preguntado.**

---

**P: ¿Por qué throw en async no llega al error handler?**
R: Express 4 no captura Promise rejections automáticamente. Error queda como UnhandledPromiseRejection.

---

**P: Soluciones?**
R: try/catch + next(error), wrapper asyncHandler(fn), o Express 5 (captura nativa).

---

**P: ¿Qué hace asyncHandler?**
R: Wrapper que hace Promise.resolve(fn()).catch(next). Centraliza manejo de errores async.

---

**P: AppError personalizada?**
R: Clase con status code. Error middleware lee err.status para respuesta HTTP apropiada.

---

**P: ¿Exponer stack trace en producción?**
R: Nunca al cliente. Solo en logs internos. Respuesta genérica "Error interno" para 500.

---

**P: 404 vs 500 handling?**
R: 404: middleware después de rutas lanza NotFoundError. 500: errores no previstos. Diferentes mensajes y logging.

---

**P: ¿next(error) vs throw?**
R: En sync handler, ambos funcionan si hay error middleware. En async Express 4, solo next(error) o asyncHandler captura throw.
