# Preguntas y Respuestas — Seguridad Express

> Review rápido sin código.

---

**P: ¿Qué hace Helmet?**
R: Setea HTTP security headers: X-Content-Type-Options, X-Frame-Options, CSP, HSTS. Protección básica automática.

---

**P: CORS: ¿por qué configurar?**
R: Browser bloquea requests cross-origin sin headers CORS. Configurar origin permitido (frontend URL), no `*` con credentials.

---

**P: Rate limiting por qué?**
R: Prevenir brute force login, DDoS básico, abuso API. express-rate-limit por IP o usuario autenticado.

---

**P: ¿Limit body size?**
R: express.json({ limit: '10kb' }) previene payloads enormes que consumen memoria.

---

**P: SQL injection en Express?**
R: Usar ORM/prepared statements. Nunca concatenar req.body en queries raw.

---

**P: Checklist seguridad API?**
R: Helmet, CORS restrictivo, rate limit, validación input, HTTPS, secrets en env, no stack traces en prod, httpOnly cookies.

---

**P: XSS en API JSON?**
R: API retorna JSON, no HTML — XSS es problema del frontend al renderizar. Sanitizar si retornas HTML.
