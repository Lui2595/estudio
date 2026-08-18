# Preguntas y Respuestas — Auth JWT Express

> Review rápido sin código.

---

**P: Access vs Refresh token?**
R: Access: corta duración (15min), en Authorization header. Refresh: larga (7d), httpOnly cookie, renueva access.

---

**P: JWT en header vs cookie?**
R: Header: stateless API, mobile, SPAs cross-domain. Cookie httpOnly: más seguro contra XSS robo de token (no accesible desde JS).

---

**P: ¿Cómo revocar JWT?**
R: JWT es stateless — no revocable sin blacklist en Redis o tokens cortos + refresh rotativo. Sanctum/Laravel maneja esto en BD.

---

**P: Bearer token format?**
R: `Authorization: Bearer eyJhbG...`. Middleware extrae y verifica con jwt.verify().

---

**P: TokenExpiredError handling?**
R: Retornar 401 con mensaje claro. Cliente usa refresh token para obtener nuevo access.

---

**P: Express auth vs Laravel Sanctum?**
R: Sanctum integrado, tokens en BD, SPA cookies. Express: implementación manual o Passport.js para OAuth2.
