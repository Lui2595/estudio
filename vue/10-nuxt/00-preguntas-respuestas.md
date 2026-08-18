# Preguntas y Respuestas — Nuxt.js

> Review rápido sin código.

---

**P: ¿Qué es Nuxt?**
R: Framework Vue para SSR, SSG, routing automático, convenciones. Equivalente Next.js para React.

---

**P: SSR vs CSR en Vue?**
R: SSR (Nuxt): HTML con contenido, SEO, datos en primera carga. CSR (Vite SPA): JS renderiza todo, mejor para dashboards autenticados.

---

**P: useFetch vs useAsyncData?**
R: useFetch: wrapper conveniente sobre $fetch con URL. useAsyncData: más control, cualquier async fn, keys custom.

---

**P: ¿Nuxt vs Vue SPA + Laravel API?**
R: Nuxt: SSR, SEO, server routes Node. Laravel API + Vue SPA: separación clara, Sanctum, equipo PHP backend.

---

**P: File-based routing Nuxt?**
R: pages/index.vue → /, pages/users/[id].vue → /users/:id. Auto-generado, no router.js manual.

---

**P: ISR en Nuxt 3?**
R: routeRules con isr: segundos. Regenera páginas estáticas en background.

---

**P: ¿Payload SSR?**
R: Datos fetched en servidor se serializan al cliente. Evita doble fetch en hydration.
