# Preguntas y Respuestas — API (Resources, Sanctum)

> Review rápido sin código.

---

**P: ¿Para qué sirve un API Resource?**
R: Transforma modelos Eloquent a JSON consistente. Separa representación API del modelo interno. Controla qué campos se exponen.

---

**P: ¿Qué hace `whenLoaded()` en Resources?**
R: Incluye relaciones solo si fueron eager loaded. Evita N+1 accidental y respuestas inconsistentes.

---

**P: Sanctum vs Passport: ¿cuándo cada uno?**
R: Sanctum: tokens API simples, SPAs con cookies, apps propias. Passport: OAuth2 completo, apps de terceros, scopes de delegación.

---

**P: ¿Cómo autenticar SPA con Sanctum?**
R: Cookies + CSRF. Frontend en mismo dominio/subdominio configurado. Sanctum emite cookie de sesión, no solo Bearer token.

---

**P: ¿Qué es rate limiting en API?**
R: Limitar requests por minuto por IP o usuario autenticado. Protege contra abuso y DDoS básico.

---

**P: ¿Cómo revocar tokens Sanctum?**
R: `$user->tokens()->delete()` revoca todos. `$user->currentAccessToken()->delete()` revoca el actual.
