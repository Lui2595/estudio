# Preguntas y Respuestas — Datos Estructurados

> Review rápido sin código.

---

**P: ¿Qué son los datos estructurados?**
R: Vocabulario Schema.org (JSON-LD) que ayuda a Google entender el contenido. Pueden generar rich snippets en SERP.

---

**P: JSON-LD vs Microdata vs RDFa?**
R: JSON-LD: preferido por Google, en script separado, fácil de mantener. Microdata/RDFa: inline en HTML, más difícil.

---

**P: ¿Rich snippets garantizados con Schema?**
R: No. Google decide si los muestra. Schema es requisito necesario pero no suficiente.

---

**P: Schemas más útiles?**
R: Organization, Article, FAQPage, BreadcrumbList, Product, LocalBusiness, WebSite con SearchAction.

---

**P: ¿FAQ schema sigue funcionando?**
R: Google limitó FAQ rich results a sitios de gobierno/salud autorizados (2023). El schema sigue siendo válido pero rich result no garantizado.

---

**P: ¿Cómo validar Schema?**
R: Google Rich Results Test, Schema Markup Validator. Search Console muestra errores de structured data.

---

**P: ¿Schema en SPA React?**
R: Debe estar en HTML servido al crawler. SSR/SSG o pre-render. JSON-LD inyectado solo en cliente puede no indexarse.
