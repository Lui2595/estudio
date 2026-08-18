# Challenge 05 — Product Catalog UI (Next.js + CSS + CWV)

**Stack:** **Next.js (App Router) + TypeScript strict** · React 18 · CSS (modules or Tailwind) · optional fake JSON API  
**Timebox:** 75 minutes  
**Level:** Senior frontend / full-stack FE  
**Interview fit:** Monday React / Next.js + CSS; Core Web Vitals awareness

> TypeScript obligatorio: `Product`, `CartItem`, filter state tipados. Sin `any`.

---

## Problem

Build a **Product Catalog** marketing + browse experience with strong **Core Web Vitals** habits and polished CSS.

You may use a local `data/products.json` (provided shape in `starter/`) — no real backend required.  
Optional: Next.js Route Handlers as a mini API.

---

## Pages / routes

| Route | Purpose |
|-------|---------|
| `/` | Hero landing (brand-first) + CTA to catalog |
| `/catalog` | Filterable product grid |
| `/catalog/[slug]` | Product detail |
| `/cart` | Client cart summary (localStorage or React context) |

---

## Functional requirements

### Catalog
- Grid of products: image, name, price, category badge
- Filters: category, price range (min/max), search by name (debounce ≥ 300ms)
- Sort: price asc/desc, name A–Z
- URL reflects filters (`?category=&q=&sort=`) — shareable
- Empty state when no matches
- Skeleton loading state on first paint if you fetch async

### Product detail
- Large image, title, price, description
- Add to cart button
- Related products (same category, exclude current) — max 4

### Cart
- List items, qty adjust, remove, subtotal
- Persist across refresh
- “Checkout” button can `alert` / show modal — no payment needed

---

## CSS / visual requirements (must)

This is not a “default gray Bootstrap page”. Meet all:

1. **Design tokens** in CSS variables: `--color-bg`, `--color-text`, `--color-accent`, `--font-sans`, `--font-display`, spacing scale.
2. **Typography:** expressive display font for brand/hero + readable body (use Google Fonts or `next/font`). Avoid Inter/Roboto/Arial as the only pairing.
3. **Hero (first viewport):**
   - Full-bleed background (gradient or image)
   - Brand name as hero-level signal
   - One headline, one short sentence, one CTA group
   - **No** cards, stats strips, or floating badges on the hero
4. **Catalog cards:** allowed here (interaction containers). Consistent gap, hover state, focus-visible ring.
5. **Responsive:**
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3–4 columns
6. **CLS prevention:** images always have width/height or aspect-ratio reserved.
7. **Accessible:** skip-to-content link, semantic headings, button vs link correctly, color contrast ≥ AA for text.

### Motion (2–3 intentional)
Examples: hero fade-in, filter panel transition, cart badge pop — keep subtle (`prefers-reduced-motion` respected).

---

## Next.js / React senior requirements

1. **TypeScript strict** — tipar `Product`, `CartItem`, search params.
2. Prefer **Server Components** for catalog list if data is static JSON imported on server; mark interactive filters as Client Components.
3. Use `next/image` for product images (can use picsum.photos or placeholder paths).
4. No unnecessary client JS on landing hero if avoidable.
5. `loading.tsx` optional for `/catalog`.
6. Extract hooks: e.g. `useCart`, `useDebouncedValue` — con tipos de retorno.
7. Write a short `PERF.md` answering:
   - What hurts LCP (Largest Contentful Paint) on `/`?
   - What hurts INP (Interaction to Next Paint) on filters?
   - What hurts CLS (Cumulative Layout Shift) on images?

---

## Acceptance criteria

- [ ] All 4 routes work
- [ ] Filters sync to URL
- [ ] Cart persists
- [ ] CSS variables + custom fonts + responsive grid
- [ ] Hero follows “one composition” rules above
- [ ] Images don’t cause CLS
- [ ] `prefers-reduced-motion` disables animation
- [ ] PERF.md completed
- [ ] Keyboard: can tab to Add to cart and activate

---

## How to set up & run

```bash
npx create-next-app@latest catalog-ui --typescript --eslint --app --src-dir
cd catalog-ui

# Copy starter products into public/ or src/data/
# Implement pages under src/app/

npm run dev
```

### Image placeholders

```text
https://picsum.photos/seed/{sku}/600/600
```

Or put static files in `public/products/`.

### Lighthouse (optional but senior)

```bash
# Chrome DevTools → Lighthouse → Mobile
# Target: no huge CLS; LCP image prioritized on home if hero has image
```

---

## Stretch (if time)

- Keyboard-accessible filter drawer on mobile
- `React.memo` on product card + stable callbacks
- Basic unit test for cart reducer with Vitest

---

## What interviewers look for

- You know RSC vs client boundaries
- CSS craft + accessibility, not only “it works”
- CWV vocabulary with concrete fixes
- Clean component/hook structure

## Forbidden

AI generating the whole UI. You may look at Next.js + MDN docs only.
