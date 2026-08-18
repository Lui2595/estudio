# Preguntas y Respuestas — SEO Técnico

> Review rápido sin código. **Muy preguntado en entrevistas full-stack.**

---

**P: ¿Qué hace robots.txt?**
R: Instruye a crawlers qué URLs pueden rastrear. NO es seguridad, NO elimina del índice (usar noindex).

---

**P: ¿Para qué sitemap.xml?**
R: Lista URLs importantes para descubrimiento e indexación. No garantiza indexar. Enviar a Search Console.

---

**P: noindex vs robots.txt Disallow?**
R: noindex: página rastreable pero no indexada. Disallow: no rastrear (Google no ve el noindex si está disallow). Para no indexar: noindex SIN disallow.

---

**P: ¿Qué son Core Web Vitals?**
R: LCP (<2.5s carga), INP (<200ms interactividad), CLS (<0.1 estabilidad visual). Factor de ranking desde 2021.

---

**P: 301 vs 302 redirect?**
R: 301: permanente, pasa ~todo el link equity. 302: temporal. Migraciones de URL siempre 301.

---

**P: ¿Mobile-first indexing?**
R: Google indexa principalmente versión mobile. Mobile responsive es obligatorio, no opcional.

---

**P: ¿HTTPS afecta SEO?**
R: Sí, es signal de ranking desde 2014. HTTP debe redirigir 301 a HTTPS.

---

**P: ¿Cadena de redirects problema?**
R: Sí. A→B→C pierde link equity y ralentiza. Máximo 1 salto directo al destino final.

---

**P: hreflang para qué?**
R: Indica versiones de página por idioma/región. Evita que Google muestre versión incorrecta en cada país.
