# Preguntas y Respuestas — Seguridad Laravel

> Review rápido sin código.

---

**P: ¿Cómo protege Laravel contra CSRF?**
R: Token CSRF en forms (`@csrf`) y verificación automática en middleware. APIs con Sanctum usan otro mecanismo.

---

**P: ¿Cómo previene XSS Blade?**
R: `{{ $var }}` escapa HTML automáticamente. `{!! $html !!}` NO escapa — solo con contenido confiable.

---

**P: ¿Cómo previene SQL Injection Eloquent?**
R: Prepared statements automáticos. NUNCA concatenar input en raw queries. Usar bindings: `where('email', $email)`.

---

**P: ¿Qué es Mass Assignment y cómo prevenirlo?**
R: Rellenar campos no deseados via request. Proteger con `$fillable` o `$guarded` en modelos.

---

**P: ¿Cómo validar uploads seguros?**
R: Validar mime, extensión, tamaño. Almacenar fuera de public con nombres aleatorios. Escanear si es crítico.

---

**P: ¿Rate limiting en login?**
R: `throttle` middleware en rutas de auth. Laravel también tiene rate limiting built-in para password reset.

---

**P: ¿Sanctum vs session para API?**
R: Sanctum tokens para APIs stateless/mobile. Session cookies para SPA same-domain. Ambos válidos según arquitectura.
