# Next.js: SSR vs CSR vs SSG vs ISR

## CSR (Client Side Rendering)
- El navegador descarga JS y renderiza en el cliente.
- SEO débil, loading inicial lento.
- React puro con Vite/CRA.

## SSR (Server Side Rendering)
- El servidor genera HTML en cada request.
- Mejor SEO, datos siempre frescos.
- Más carga en el servidor.

```jsx
// Next.js App Router
export default async function Page() {
  const data = await fetch('https://api.example.com/posts', {
    cache: 'no-store', // SSR
  });
  const posts = await data.json();
  return <PostList posts={posts} />;
}
```

## SSG (Static Site Generation)
- HTML generado en build time.
- Máximo rendimiento, CDN-friendly.
- Datos estáticos o que cambian poco.

```jsx
export default async function Page() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // SSG
  }).then(r => r.json());
  return <PostList posts={posts} />;
}
```

## ISR (Incremental Static Regeneration)
- SSG + revalidación periódica en background.
- Balance entre performance y datos frescos.

```jsx
const posts = await fetch('https://api.example.com/posts', {
  next: { revalidate: 60 }, // Regenera cada 60 segundos
}).then(r => r.json());
```

## Pregunta típica: SSR vs CSR
| | CSR | SSR |
|---|---|---|
| Render | Cliente | Servidor |
| SEO | Malo | Bueno |
| TTFB | Rápido (HTML vacío) | Más lento |
| Datos | Después del JS | En el HTML inicial |
| Uso | Dashboards, apps internas | E-commerce, blogs, landing |
