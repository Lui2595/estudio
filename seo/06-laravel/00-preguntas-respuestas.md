# Preguntas y Respuestas — SEO en Laravel

> Review rápido sin código.

---

**P: ¿Cómo SEO dinámico en Laravel?**
R: Variables en Blade layout: $seoTitle, $seoDescription, $canonical, $schema. Controller pasa datos por página.

---

**P: ¿Paquetes SEO Laravel?**
R: artesaos/seotools, ralphjsmit/laravel-seo, spatie/laravel-sitemap. O implementación manual en layout Blade.

---

**P: ¿Slugs en Laravel para SEO?**
R: Route model binding `{post:slug}`, Str::slug() al crear, redirect 301 si slug cambia.

---

**P: ¿Sitemap en Laravel?**
R: spatie/laravel-sitemap o comando artisan custom. Generar en deploy o schedule. Incluir lastmod.

---

**P: ¿noindex en rutas privadas Laravel?**
R: Middleware o meta en layout admin: `<meta name="robots" content="noindex">`. También Disallow /admin/ en robots.txt.

---

**P: ¿Laravel API + React SPA SEO?**
R: Laravel solo API no sirve HTML. SEO lo maneja frontend con SSR (Next/Nuxt) o prerender. API no necesita SEO.

---

**P: ¿Blade vs SPA para SEO?**
R: Blade: HTML completo en servidor, excelente SEO out-of-the-box. SPA: requiere SSR adicional para contenido público.
