# Area 2 — React Frontend

> Typical Full Stack SR voice questions. Answers: 30–45 sec.

## Abbreviations (with meanings)

- DOM (Document Object Model)
- SSR (Server-Side Rendering)
- CSR (Client-Side Rendering)
- RSC (React Server Components)
- API (Application Programming Interface)
- SPA (Single-Page Application)
- XSS (Cross-Site Scripting)
- JWT (JSON Web Token)

---

## P: What causes a React component to re-render?

**R:**
"State change inside the component, parent props change, consumed context value change, or parent re-render — children re-render by default. React reconciles the virtual DOM and updates the real DOM only where needed."

---

## P: When do you use useEffect?

**R:**
"Side effects after render: fetch, subscriptions, DOM sync, timers. Dependency array controls re-runs — `[]` mount only, `[dep]` when dep changes. Always return cleanup for listeners or AbortController to prevent leaks."

---

## P: Difference between useMemo and useCallback?

**R:**
"useMemo caches a computed **value**. useCallback caches a **function** reference for stable child props with React.memo. useCallback is useMemo(() => fn, deps)."

---

## P: How do you optimize a form that re-renders on every keystroke?

**R:**
"Move input state local to the form. Split heavy siblings into memoized components. Debounce validation/API, not every keystroke. Virtualize large lists below the form with react-window."

---

## P: Controlled vs uncontrolled components?

**R:**
"Controlled: React state is source of truth — value plus onChange. Uncontrolled: DOM holds value, read via ref — file inputs, simple forms. Controlled for validation and predictable state."

---

## P: Global state without Redux?

**R:**
"Context plus custom hook for simple shared state — split contexts by update frequency. TanStack Query for server state. Zustand or Redux Toolkit when client state is complex and updates often."

---

## P: What is TanStack Query for?

**R:**
"Server state — cache, background refetch, stale-while-revalidate, deduplication. Separates API data from UI state. Mutations invalidate queries after create/update."

---

## P: Stale closures in hooks?

**R:**
"Effect or callback captures old props/state from the render it was created in. Wrong deps → stale values. Fix: correct deps, functional setState, or useRef for latest value."

---

## P: Virtual DOM — why React uses it?

**R:**
"Lightweight JS UI representation. Diff previous vs next, minimal DOM updates. Declarative model and batching. Not always faster than manual DOM — win is predictability at scale."

---

## P: Why not use array index as key?

**R:**
"Reorder/insert/delete shifts indices — React reuses wrong DOM nodes, bugs in inputs and local state. Use stable unique id from data."

---

## P: Server Components vs Client Components (Next.js)?

**R:**
"Server Components: render on server, no client JS, no hooks or events — great for data near DB. Client Components: `'use client'` for interactivity. Default RSC, client only where needed."

---

## P: SSR vs CSR — when?

**R:**
"SSR/SSG for SEO and fast first paint — marketing, e-commerce. CSR SPA for authenticated dashboards. Hybrid: Next.js SSR public routes, client app shell."

---

## P: Authentication on the frontend?

**R:**
"Short-lived access token in memory or httpOnly cookie — avoid localStorage for sensitive tokens if XSS risk. 401 → refresh flow or login redirect. Route guards check auth state."

---

## P: How do you test React?

**R:**
"React Testing Library — user-visible behavior. MSW for API mocks. Focus on business flows. Playwright/Cypress for E2E. Don't test every presentational component."

---

## Voice scenarios

**P: Page slow after adding a large table.**

**R:**
"React DevTools Profiler — unnecessary re-renders. Memoize rows, stable keys, virtualize. Network: pagination vs 10k rows. Server-side sort/filter. React Query staleTime for static-ish data."

---

**P: Stale data after update.**

**R:**
"Cache not invalidated. React Query: invalidateQueries on mutation success or optimistic update with rollback. Verify API returns updated entity."

---

## More material

→ `../react/00-preguntas-respuestas.md`  
→ `ejemplos/react-optimization.jsx`
