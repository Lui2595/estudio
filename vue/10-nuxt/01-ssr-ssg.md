# Nuxt.js — SSR, SSG, ISR en Vue

## ¿Qué es Nuxt?

Framework sobre Vue para SSR, SSG, routing automático y convenciones de proyecto (como Next.js para React).

## Modos de renderizado

| Modo | Cuándo | Comando / config |
|------|--------|------------------|
| **SPA** | Dashboard, app interna | `ssr: false` |
| **SSR** | SEO, datos frescos por request | Default Nuxt 3 |
| **SSG** | Contenido estático | `nuxt generate` |
| **ISR** | Estático + revalidación | `routeRules` con `isr: 60` |

## SSR vs CSR (pregunta típica)

- **SSR (Nuxt)**: HTML con contenido en primera carga. Mejor SEO y TTFB con datos.
- **CSR (Vue + Vite SPA)**: HTML vacío, JS renderiza todo. Mejor para apps autenticadas sin SEO.

## Data fetching en Nuxt 3

- `useFetch()`: wrapper sobre $fetch con SSR cache
- `useAsyncData()`: control más granular
- Los datos se serializan del servidor al cliente (payload)

## Pregunta Senior

> ¿Vue SPA + Laravel API vs Nuxt full-stack?

- **SPA + Laravel**: separación clara, Sanctum, equipo PHP backend
- **Nuxt full-stack**: server routes, SSR, un solo deploy Node. Mejor SEO frontend

## File-based routing

```
pages/
  index.vue        → /
  users/
    index.vue      → /users
    [id].vue       → /users/:id
```
