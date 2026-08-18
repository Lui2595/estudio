# Preguntas y Respuestas — React Query (TanStack Query)

> Review rápido sin código. **Casi obligatorio en entrevistas React moderno.**

---

**P: ¿Qué problema resuelve React Query?**
R: Server state: fetching, caching, sincronización, background refetch, deduplicación, loading/error states.

---

**P: ¿Qué son query keys?**
R: Identificadores únicos de datos en cache. `['users']`, `['users', id]`, `['users', { status }]`. Invalidación por key o prefix.

---

**P: staleTime vs gcTime (cacheTime)?**
R: staleTime: cuánto los datos se consideran frescos (no refetch). gcTime: cuánto permanecen en cache sin usarse antes de garbage collect.

---

**P: ¿Qué es invalidation?**
R: Marcar queries como stale para refetch. `queryClient.invalidateQueries({ queryKey: ['users'] })` tras mutación.

---

**P: ¿Optimistic update?**
R: Actualizar UI antes de confirmar servidor. Si falla, rollback. Mejor UX en mutaciones rápidas.

---

**P: React Query vs Redux para API data?**  
R: React Query para server state (cache, refetch). Redux/Zustand para client state. No duplicar API data en Redux.

**P: ¿React Query reemplaza useMemo?**  
R: No. RQ cachea datos remotos. useMemo cachea un cálculo local. Problemas distintos.

---

**P: ¿useQuery vs useMutation?**
R: useQuery: GET, datos que se leen. useMutation: POST/PUT/DELETE, acciones que modifican.
