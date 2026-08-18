# SEO Técnico — Checklist

## Indexación y rastreo

- [ ] `robots.txt` configurado y sin bloquear páginas importantes
- [ ] `sitemap.xml` generado y enviado a Search Console
- [ ] `<link rel="canonical">` en cada página
- [ ] Sin contenido duplicado (www vs non-www, http vs https)
- [ ] Redirects 301 (no 302) para URLs movidas
- [ ] Páginas 404 personalizadas con enlaces útiles
- [ ] Sin cadenas de redirects (A→B→C, máximo 1 salto)
- [ ] `noindex` en páginas privadas (admin, carrito, login)

## Rendimiento (Core Web Vitals)

| Métrica | Qué mide | Objetivo |
|---------|----------|----------|
| **LCP** | Largest Contentful Paint | < 2.5s |
| **INP** | Interaction to Next Paint | < 200ms |
| **CLS** | Cumulative Layout Shift | < 0.1 |

- [ ] Imágenes optimizadas (WebP/AVIF, lazy load, dimensiones explícitas)
- [ ] CSS/JS minificados y comprimidos (gzip/brotli)
- [ ] CDN para assets estáticos
- [ ] Caching headers (Cache-Control, ETag)
- [ ] Server response time < 200ms (TTFB)

## Mobile-First

- [ ] Responsive design (viewport meta)
- [ ] Google indexa versión mobile primero
- [ ] Touch targets ≥ 48px
- [ ] Sin contenido oculto solo en desktop que exista en mobile

## Seguridad (factor indirecto)

- [ ] HTTPS con certificado válido
- [ ] HSTS header
- [ ] Sin mixed content (HTTP resources en HTTPS page)

## Internacionalización

- [ ] `hreflang` para versiones multi-idioma
- [ ] `lang` attribute en `<html>`
- [ ] x-default para idioma por defecto

## Herramientas de auditoría

- Google Search Console
- Google PageSpeed Insights / Lighthouse
- Screaming Frog (crawl)
- Ahrefs / Semrush (keywords, backlinks)
