# SEO en React / Vue SPA

## El problema

Google puede renderizar JavaScript, pero:
- Indexación más lenta (two-wave indexing)
- CSR puro = HTML vacío inicial → mal SEO
- Meta tags dinámicos no los ve el crawler sin SSR

## Soluciones

| Enfoque | SEO | Complejidad |
|---------|-----|-------------|
| **SSR** (Next.js, Nuxt) | Excelente | Media |
| **SSG** (prerender) | Excelente para contenido estático | Baja |
| **Prerendering** (vite-plugin-ssr, prerender.io) | Bueno | Media |
| **CSR puro** (Vite SPA) | Malo para contenido público | Baja |

## React — Next.js App Router

```jsx
// app/blog/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, images: [post.image] },
    alternates: { canonical: `https://site.com/blog/${post.slug}` },
  };
}
```

## React — react-helmet-async (SPA fallback)

```jsx
import { Helmet } from 'react-helmet-async';

function BlogPost({ post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} | Mi Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://site.com/blog/${post.slug}`} />
      </Helmet>
      <article>{post.content}</article>
    </>
  );
}
```

⚠️ Helmet en CSR: Google eventualmente lo ve, pero SSR es preferible.

## Vue — Nuxt useSeoMeta

```vue
<script setup>
useSeoMeta({
  title: post.title,
  description: post.excerpt,
  ogTitle: post.title,
  ogImage: post.image,
});
</script>
```

## Checklist SPA → SEO

- [ ] SSR o SSG para páginas públicas
- [ ] Prerender rutas estáticas en build
- [ ] Sitemap generado con todas las rutas
- [ ] No bloquear JS en robots.txt
- [ ] Testear con "URL Inspection" en Search Console
- [ ] View Page Source debe mostrar contenido (no div vacío)
