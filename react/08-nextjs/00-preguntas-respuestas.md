# Preguntas y Respuestas — Next.js (SSR, CSR, SSG, ISR)

> Review rápido sin código. **Muy preguntado.**

---

**P: SSR vs CSR?**
R: SSR: HTML generado en servidor por request. Mejor SEO, datos en HTML inicial. CSR: browser descarga JS y renderiza. Mejor para dashboards autenticados.

---

**P: ¿Qué es SSG?**
R: Static Site Generation: HTML en build time. Máximo performance, CDN. Para contenido que cambia poco.

---

**P: ¿Qué es ISR?**
R: Incremental Static Regeneration: SSG + revalidación periódica en background. Balance performance/frescura.

---

**P: ¿Cuándo CSR en app Laravel + React?**
R: SPA con Vite/React sin SEO crítico: admin panels, dashboards internos, apps autenticadas.

---

**P: ¿Cuándo Next.js SSR/SSG?**
R: Landing pages, blogs, e-commerce público, cualquier cosa que necesite SEO y buen TTFB (Time To First Byte: el tiempo que tarda en llegar el primer byte de HTML al navegador) con contenido.

---

**P: ¿Server Components (RSC)?**
R: Componentes renderizados en servidor, cero JS al cliente. No hooks, no event handlers. Fetch directo en servidor.

---

**P: ¿Hydration?**
R: Proceso donde React "activa" HTML estático del servidor attachando event listeners en el cliente.
