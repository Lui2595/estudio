# Preguntas y Respuestas — SEO Web (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 9 |

---

## 01-on-page

**P: ¿Cuáles son los meta tags mínimos para SEO?**
R: charset, viewport, title único (50-60 chars), meta description (150-160 chars), canonical, lang en html.

---

**P: ¿Cuántos H1 por página?**
R: Uno solo, describe el tema principal. Jerarquía lógica H1→H2→H3 sin saltar niveles.

---

**P: ¿Title vs H1: deben ser iguales?**
R: No obligatorio. Pueden variar ligeramente. Title optimizado para SERP (con marca), H1 para el usuario en página.

---

**P: ¿Qué es keyword stuffing?**
R: Repetir keywords artificialmente. Penalización. Escribir para humanos, keywords de forma natural.

---

**P: ¿URL amigable cómo?**
R: Corta, descriptiva, guiones (no _), lowercase, sin parámetros innecesarios, incluir keyword si es natural.

---

**P: ¿Canonical para qué?**
R: Indica a Google la URL preferida cuando hay duplicados (UTM, www/non-www, paginación). Evita dilución de ranking.

---

**P: ¿Enlaces internos importan?**
R: Sí. Distribuyen autoridad (PageRank interno), ayudan crawlers a descubrir páginas, anchor text descriptivo.

---

**P: ¿Longitud mínima de contenido?**
R: No hay mínimo fijo. Debe responder completamente la intención de búsqueda. Artículos: 1000+ palabras suele rankear mejor para temas competitivos.

---

## 02-meta-social

**P: ¿Open Graph afecta ranking en Google?**
R: No directamente. Mejora previews al compartir en redes → más CTR social → más tráfico indirecto.

---

**P: ¿Tamaño imagen Open Graph?**
R: 1200×630px recomendado. Mínimo 600×315. Formato JPG o PNG, menos de 8MB.

---

**P: og:type valores comunes?**
R: website (páginas generales), article (blog), product (e-commerce), profile (personas).

---

**P: Twitter card types?**
R: summary (pequeña), summary_large_image (destacada con imagen grande). Usar large_image para contenido visual.

---

**P: ¿Meta social sin Open Graph?**
R: Redes generan preview automático (a veces mal). Siempre definir OG tags explícitos para control.

---

**P: ¿og:url debe coincidir con canonical?**
R: Sí, idealmente ambos apuntan a la misma URL canónica sin parámetros.

---

## 03-structured-data

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

---

## 04-tecnico

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

---

## 05-imagenes

**P: ¿Por qué importa el atributo alt?**
R: Accesibilidad (lectores de pantalla) + SEO (Google entiende contenido de imagen). Describe la imagen con keyword natural.

---

**P: ¿alt en imagen decorativa?**
R: alt="" vacío. Indica que no aporta información. No omitir el atributo.

---

**P: ¿Formatos de imagen para web?**
R: WebP/AVIF modernos (mejor compresión). JPG fallback. PNG solo si transparencia necesaria.

---

**P: ¿width y height en img?**
R: Evitan CLS (layout shift). Browser reserva espacio antes de cargar imagen. Crítico para Core Web Vitals.

---

**P: loading="lazy" cuándo?**
R: Imágenes below the fold. NO en hero/LCP image (usar fetchpriority="high" en su lugar).

---

**P: ¿Nombre de archivo importa?**
R: Sí, ligeramente. `desarrollo-laravel.webp` mejor que `IMG_2847.jpg`. Keyword descriptiva.

---

**P: Image sitemap?**
R: Sitemap extendido con namespace image. Ayuda Google Images a descubrir imágenes del sitio.

---

## 06-laravel

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

---

## 07-frontend

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

---

## 08-local-eeat

**P: ¿Qué es E-E-A-T?**
R: Experience, Expertise, Authoritativeness, Trustworthiness. Framework de calidad de Google, crítico en YMYL (salud, finanzas, legal).

---

**P: ¿Qué es YMYL?**
R: Your Money Your Life. Contenido que afecta decisiones importantes del usuario. Google aplica estándares E-E-A-T más estrictos.

---

**P: ¿SEO local elementos clave?**
R: Google Business Profile, NAP consistente (Name, Address, Phone), Schema LocalBusiness, reseñas, página contacto con mapa.

---

**P: ¿Qué son backlinks?**
R: Enlaces de otros sitios al tuyo. Signal de autoridad. Calidad > cantidad. Link building es off-page SEO.

---

**P: ¿Comprar links?**
R: Contra guidelines de Google. Riesgo de penalización manual. Link building debe ser orgánico: contenido linkable, guest posts de calidad.

---

**P: ¿Página "Sobre nosotros" importa SEO?**
R: Sí para E-E-A-T. Demuestra quién está detrás del sitio, credenciales, experiencia real.

---

**P: ¿Reseñas afectan ranking local?**
R: Sí, cantidad y valoración influyen en Local Pack (mapa de Google). Responder reseñas también importa.

---

## 09-herramientas

**P: ¿Para qué Google Search Console?**
R: Monitorear indexación, queries, CTR, errores de rastreo, CWV, solicitar indexación. Gratuita e indispensable.

---

**P: ¿Lighthouse SEO 100 = ranking #1?**
R: No. Lighthouse audita checklist técnico básico. Ranking depende de contenido, autoridad, competencia, UX.

---

**P: URL Inspection para qué?**
R: Ver cómo Google renderiza una URL, detectar problemas, solicitar indexación de páginas nuevas.

---

**P: ¿Qué es "Crawled - currently not indexed"?**
R: Google rastreó pero decidió no indexar. Causas: contenido bajo calidad, duplicado, thin content. Mejorar contenido.

---

**P: ¿Soft 404?**
R: Página devuelve 200 pero sin contenido útil (o "no encontrado" visual). Google la trata como 404. Retornar 404 HTTP real.

---

**P: Screaming Frog para qué?**
R: Crawler de escritorio. Audita meta tags, redirects, broken links, canonicals, sitemaps. Essential para auditorías técnicas.

---

**P: ¿Ahrefs/Semrush vs Search Console?**
R: Search Console: datos de TU sitio en Google (gratis). Ahrefs/Semrush: competencia, backlinks, keywords research (de pago).

---

**P: Workflow mensual SEO mínimo?**
R: Revisar Performance (queries, CTR), Pages (errores indexación), CWV (páginas failing), actualizar sitemap, auditar contenido stale.

---
