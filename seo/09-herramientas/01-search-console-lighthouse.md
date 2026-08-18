# Google Search Console — Guía práctica

## Configuración inicial

1. Verificar propiedad (DNS TXT, HTML file, o meta tag)
2. Enviar sitemap.xml
3. Configurar dominio preferido (www vs non-www)

## Reportes clave

| Reporte | Para qué |
|---------|----------|
| **Performance** | Queries, clics, impresiones, CTR, posición media |
| **URL Inspection** | ¿Está indexada? ¿Cómo la ve Google? |
| **Pages** | Indexadas, no indexadas, con errores |
| **Sitemaps** | Estado del sitemap enviado |
| **Core Web Vitals** | LCP, INP, CLS en datos reales |
| **Mobile Usability** | Errores mobile |
| **Manual Actions** | Penalizaciones manuales de Google |
| **Security Issues** | Malware, hacking |

## URL Inspection — flujo de debug SEO

1. Pegar URL → "Test live URL"
2. Ver HTML renderizado por Google
3. Ver screenshot mobile
4. Request indexing para páginas nuevas/actualizadas

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| Soft 404 | Página vacía o "no encontrado" sin 404 real | Retornar 404 HTTP real |
| Duplicate without canonical | Contenido duplicado | Agregar canonical |
| Crawled - not indexed | Calidad baja o duplicado | Mejorar contenido |
| Blocked by robots.txt | Disallow en robots | Revisar robots.txt |
| Redirect error | Cadena o loop | Simplificar a 1 redirect 301 |

## Lighthouse (Chrome DevTools)

Audita en una URL:
- Performance (CWV)
- Accessibility (impacta SEO indirectamente)
- Best Practices
- SEO (meta tags, crawlability básica)

Score SEO 100 en Lighthouse ≠ ranking #1. Es checklist técnico mínimo.

## Workflow mensual SEO

1. Revisar Performance → queries con impresiones altas y CTR bajo → mejorar title/description
2. Revisar Pages → errores de indexación → corregir
3. Revisar Core Web Vitals → páginas failing → optimizar
4. Actualizar sitemap si hay contenido nuevo
5. Auditar backlinks (Ahrefs/Semrush)
