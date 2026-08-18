# Preguntas y Respuestas — React 18+

> Review rápido sin código.

---

**P: ¿Qué es Concurrent Rendering?**
R: React puede interrumpir renders para priorizar updates urgentes (input) sobre no urgentes (lista filtrada). Mejor UX.

---

**P: ¿Qué es Suspense?**
R: Muestra fallback mientras hijos cargan (lazy components, data fetching con frameworks compatibles).

---

**P: ¿Qué es useTransition?**
R: Marca updates como no urgentes. `startTransition(() => setFilter(q))` mantiene UI responsive mientras filtra.

---

**P: ¿Qué es useDeferredValue?**
R: Retrasa actualización de un valor no urgente. Similar a debounce pero integrado con concurrent rendering.

---

**P: Server Components vs Client Components?**
R: Server: render en servidor, sin JS al cliente, fetch directo. Client: `'use client'`, hooks, interactividad. Default server en App Router.

---

**P: ¿Automatic batching en React 18?**
R: Múltiples setStates en event handlers, promises, timeouts se batchean en un solo re-render automáticamente.

---

**P: Strict Mode double render?**
R: En dev, React monta-desmonta-remonta para detectar side effects no limpiados. Solo desarrollo, no producción.
