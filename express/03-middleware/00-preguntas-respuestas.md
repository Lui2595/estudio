# Preguntas y Respuestas — Express Middleware

> Review rápido sin código.

---

**P: Tipos de middleware?**
R: Application-level (global), Router-level (ruta específica), Error-handling (4 params: err, req, res, next), Built-in (json, static).

---

**P: Middleware auth pattern?**
R: Verificar token/session, attach user a req, next() o 401. Composable: authenticate → authorize('admin') → controller.

---

**P: ¿Middleware vs interceptor?**
R: Concepto similar. Express middleware es cadena síncrona/async. Axios interceptors para HTTP client, no server.

---

**P: ¿Cuántos middleware en una ruta?**
R: Ilimitados encadenados: `router.post('/', validate, authenticate, controller)`. Cada uno next() al siguiente.

---

**P: Error middleware: ¿por qué 4 parámetros?**
R: Express detecta error handler por firma (err, req, res, next). Debe ir al final de la app, después de rutas.

---

**P: express.static?**
R: Sirve archivos estáticos (public/). En producción preferir Nginx/CDN para assets.
