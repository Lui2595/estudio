# Preguntas y Respuestas — SEO Frontend (React/Vue)

> Review rápido sin código. **Crítico para stack Laravel + React.**

---

**P: ¿Por qué CSR puro es malo para SEO?**
R: HTML inicial vacío (div#root). Google debe ejecutar JS para ver contenido. Indexación más lenta e incompleta.

---

**P: ¿Google indexa JavaScript?**
R: Sí, pero con two-wave indexing: primero HTML, luego render JS (días/semanas después). No confiar solo en CSR.

---

**P: SSR vs SSG vs CSR?**
R: SSR: HTML por request (dinámico). SSG: HTML en build (estático). CSR: JS en cliente. Público indexable: SSR o SSG.

---

**P: react-helmet-async suficiente?**
R: Mejor que nada en CSR, pero SSR (Next.js) es preferible. Google puede ver meta tags de Helmet eventualmente, no inmediatamente.

---

**P: ¿Cómo verificar si Google ve tu SPA?**
R: Search Console → URL Inspection → "View crawled page" / Test live URL. View Page Source debe tener contenido.

---

**P: ¿Bloquear JS en robots.txt?**
R: NUNCA para páginas que quieres indexar. Google necesita JS para renderizar SPAs.

---

**P: Next.js vs Nuxt para SEO?**
R: Ambos excelentes. Next (React): generateMetadata, SSG, ISR. Nuxt (Vue): useSeoMeta, useFetch SSR. Elegir según stack.

---

**P: ¿Prerender.io / vite-plugin-ssr?**
R: Alternativas a SSR completo. Generan HTML estático para crawlers. Buen middle ground para SPAs legacy.
