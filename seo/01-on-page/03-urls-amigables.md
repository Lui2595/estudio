# URLs amigables para SEO

## Reglas de URLs

| Bueno | Malo |
|-------|------|
| `/servicios/desarrollo-laravel` | `/page?id=42&cat=3` |
| `/blog/seo-tecnico-2024` | `/blog/post/12345` |
| Cortas, descriptivas, lowercase | Parámetros innecesarios |

## Buenas prácticas

1. **Usar guiones** `-` no guiones bajos `_` (Google trata `_` como parte de la palabra)
2. **Sin acentos** en URLs: `/guia-seo` no `/guía-seo`
3. **Estructura lógica**: `/categoria/subcategoria/producto`
4. **Evitar URLs profundas**: máximo 3-4 niveles si es posible
5. **Trailing slash consistente**: elegir con o sin `/` y redirigir 301 la otra versión
6. **HTTPS siempre**: redirect 301 de HTTP a HTTPS

## Laravel — slugs en rutas

```php
// Route::get('/blog/{post:slug}', [PostController::class, 'show']);
// Generar slug: Str::slug($title)
// Redirect 301 si slug cambia: redirect()->route('post.show', $newSlug, 301);
```

## React / Vue SPA

- URLs del router deben ser reales (History API), no hash `#/page`
- Cada ruta = URL única indexable (con SSR o prerender)
- Sitemap incluye todas las rutas públicas

## Canonical con parámetros UTM

```
https://site.com/producto?utm_source=email
→ canonical: https://site.com/producto
```

Los parámetros UTM no deben crear URLs duplicadas en el índice.
