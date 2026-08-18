# Preguntas y Respuestas — Performance React

> Review rápido sin código.

---

**P: ¿Qué hace React.memo?**
R: Memoiza componente: solo re-renderiza si props cambiaron (shallow compare). Útil con props estables y render costoso.

---

**P: ¿Cuándo NO usar memo/useMemo/useCallback?**
R: Cuando no hay problema de performance medible. Añaden complejidad. Premature optimization.

---

**P: ¿Qué es code splitting?**
R: Dividir bundle en chunks cargados bajo demanda. `React.lazy()` + `Suspense`. Reduce initial load.

---

**P: ¿Lazy loading componentes?**
R: `const Chart = lazy(() => import('./Chart'))`. Se descarga solo cuando se renderiza. Suspense muestra fallback mientras carga.

---

**P: ¿Por qué useCallback con React.memo hijos?**
R: Sin useCallback, función nueva cada render → memo del hijo no sirve (prop "cambia" siempre).

---

**P: ¿Virtualization en listas largas?**
R: Renderizar solo items visibles (react-window, tanstack-virtual). Esencial para miles de filas.

---

**P: ¿Profiler API?**
R: `<Profiler>` mide tiempo de render de subárbol. Identificar componentes lentos en dev.
