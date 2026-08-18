# SEO Local y E-E-A-T

## SEO Local (negocios con ubicación física)

### Google Business Profile (obligatorio)
- Nombre, dirección, teléfono consistentes (NAP)
- Categoría correcta del negocio
- Fotos, horarios, reseñas respondidas

### Datos estructurados LocalBusiness

```json
{
  "@type": "LocalBusiness",
  "name": "Mi Empresa",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Mayor 1",
    "addressLocality": "Madrid",
    "postalCode": "28001",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.4168,
    "longitude": -3.7038
  },
  "telephone": "+34-900-000-000",
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

### Página de contacto SEO
- Mapa embebido (Google Maps)
- NAP visible en HTML (no solo imagen)
- Schema LocalBusiness

---

## E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

Google evalúa calidad especialmente en YMYL (Your Money Your Life): salud, finanzas, legal.

| Factor | Cómo demostrarlo |
|--------|------------------|
| **Experience** | Casos reales, portfolio, testimonios |
| **Expertise** | Bio del autor, credenciales, contenido profundo |
| **Authoritativeness** | Backlinks de sitios reconocidos, menciones |
| **Trustworthiness** | HTTPS, política privacidad, contacto visible, reseñas |

### En blog/contenido
- Página "Sobre nosotros" con equipo real
- Autor en cada artículo con bio y Schema Person
- Fecha publicación y actualización visibles
- Fuentes citadas en contenido técnico
- HTTPS + política de cookies (GDPR)

---

## Link Building (off-page SEO)

- **Backlinks**: enlaces de otros sitios → autoridad
- Calidad > cantidad (1 link Forbes > 100 links spam)
- Estrategias: guest posting, recursos linkables, directorios de calidad
- Evitar: compra de links, PBNs, link farms (penalización)

## Métricas clave

- Posición en SERP para keywords objetivo
- Tráfico orgánico (Google Analytics)
- CTR en Search Console
- Impresiones y clics por query
- Core Web Vitals en field data
- Páginas indexadas vs enviadas
