# Preguntas y Respuestas — React (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 11 |

---

## 01-fundamentos

**P: ¿Qué es JSX?**
R: Sintaxis que parece HTML en JS. Se compila a `React.createElement()`. Expresiones JS van entre `{}`.

---

**P: Props vs State?**
R: Props: datos del padre, read-only. State: datos internos del componente, mutables via setState/setter.

---

**P: ¿Qué provoca un re-render?**
R: Cambio de state, cambio de props del padre, cambio de context consumido, o re-render del padre (hijos re-renderizan por defecto).

---

**P: ¿Componente controlado vs props drilling?**
R: Controlado: valor en state de React. Props drilling: pasar props por muchos niveles — solucionar con Context o state management.

---

**P: ¿Functional vs Class components hoy?**
R: Functional + hooks es el estándar. Class solo en legacy. Hooks no existen en classes.

---

**P: ¿Por qué no mutar state directamente?**
R: React compara referencias. Mutar no dispara re-render ni permite detectar cambios correctamente.

---

## 02-hooks

**P: ¿Cuándo se ejecuta useEffect?**
R: Después del render, async. Array de deps controla re-ejecución: `[]` solo mount, `[dep]` cuando dep cambia, sin array cada render.

---

**P: useMemo vs useCallback?**
R: useMemo memoriza un VALOR calculado. useCallback memoriza una FUNCIÓN (referencia estable). useCallback = useMemo(() => fn, deps).

---

**P: ¿Para qué useRef?**
R: Referencia DOM, valores mutables que no causan re-render, guardar valor previo, timers/intervals.

---

**P: ¿Qué es stale closure en useEffect?**
R: Effect captura props/state del render donde se creó. Si deps incorrectas, usa valores viejos. Solución: deps correctas o functional updates.

---

**P: ¿Cuándo useContext vs Redux/Zustand?**
R: Context: pocos valores, cambios infrecuentes (theme, auth). Redux/Zustand: state global complejo, muchos consumidores, updates frecuentes.

---

**P: ¿Custom hooks: reglas?**
R: Nombre `use*`, pueden usar otros hooks, extraen lógica reutilizable. No llamar hooks condicionalmente.

---

**P: ¿Cleanup en useEffect?**
R: Return function se ejecuta antes del próximo effect o al desmontar. Esencial para listeners, subscriptions, cancelar fetch.

---

**P: ¿useEffect vs useLayoutEffect?**
R: useLayoutEffect sincrónico después del DOM update, antes de paint. Para mediciones DOM. useEffect async después del paint (mayoría de casos).

---

## 03-virtual-dom

**P: ¿Qué es el Virtual DOM?**
R: Representación JS ligera del DOM real. React compara versiones (diffing) y aplica solo cambios mínimos al DOM.

---

**P: ¿Qué es Reconciliation?**
R: Proceso de comparar Virtual DOM anterior con nuevo y decidir qué cambiar en DOM real.

---

**P: ¿Por qué no usar index como key?**
R: Al reordenar/insertar/eliminar, index cambia y React reutiliza DOM incorrectamente. Causa bugs de state y renders innecesarios.

---

**P: ¿Qué key usar?**
R: ID único y estable del item (`item.id`). No random en cada render (causa remount constante).

---

**P: ¿Virtual DOM = rápido siempre?**
R: No magic. Reduce manipulación DOM directa pero diffing tiene costo. React 18 concurrent rendering mejora UX, no siempre raw speed.

---

**P: ¿Elementos de distinto tipo en diff?**
R: React destruye árbol anterior y construye nuevo. Mismo tipo: actualiza solo props/atributos cambiados.

---

## 04-estado

**P: Local vs Global state?**
R: Local: pertenece a un componente (form input, toggle). Global: compartido entre muchos componentes (user auth, cart, theme).

---

**P: ¿Cuándo Context API?**
R: Pocos valores, cambios poco frecuentes. Theme, locale, auth básico. Evitar para state que cambia mucho (re-render masivo).

---

**P: Redux vs Zustand?**
R: Redux: predecible, DevTools, middleware, más boilerplate. Zustand: minimal, menos código, hooks nativos, suficiente para mayoría de apps.

---

**P: ¿Problema de re-renders con Context?**
R: Cualquier cambio en value re-renderiza TODOS los consumidores. Solución: dividir contexts o usar selectors (Zustand).

---

**P: ¿Server state vs Client state?**
R: Server: datos de API (React Query los maneja). Client: UI state local (modals, forms, filters). No mezclar en Redux innecesariamente.

---

**P: ¿Lifting state up?**
R: Subir state al ancestro común más cercano cuando hermanos necesitan compartirlo. Antes de saltar a global.

---

## 05-react-query

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

---

**P: ¿useQuery vs useMutation?**
R: useQuery: GET, datos que se leen. useMutation: POST/PUT/DELETE, acciones que modifican.

---

## 06-performance

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

---

## 07-formularios

**P: Controlled vs Uncontrolled?**
R: Controlled: React controla valor via state (`value` + `onChange`). Uncontrolled: DOM controla valor; lees con ref.

---

**P: ¿Cuándo controlled?**
R: Validación en tiempo real, formato dinámico, submit programático, disabled condicional. Mayoría de casos en apps serias.

---

**P: ¿Cuándo uncontrolled?**
R: Forms simples, integración con libs no-React, file inputs. React Hook Form usa uncontrolled por defecto.

---

**P: ¿React Hook Form vs Formik?**
R: RHF: menos re-renders, uncontrolled, más performante. Formik: controlled, más simple conceptualmente. RHF más popular hoy.

---

**P: ¿Validación en forms?**
R: Client-side: UX inmediata. Server-side: siempre obligatoria (nunca confiar solo en cliente). Zod/Yup para schemas.

---

**P: ¿Por qué key en listas de inputs?**
R: Sin key estable, React puede reutilizar input incorrecto al reordenar, perdiendo focus y valor.

---

## 08-nextjs

**P: SSR vs CSR?**
R: SSR: HTML generado en servidor por request. Mejor SEO, datos en HTML inicial. CSR: browser descarga JS y renderiza. Mejor para dashboards autenticados.

---

**P: ¿Qué es SSG?**
R: Static Site Generation: HTML en build time. Máximo performance, CDN. Para contenido que cambia poco.

---

**P: ¿Qué es ISR?**
R: Incremental Static Regeneration: SSG + revalidación periódica en background. Balance performance/frescura.

---

**P: ¿Cuándo CSR en app Laravel + React?**
R: SPA con Vite/React sin SEO crítico: admin panels, dashboards internos, apps autenticadas.

---

**P: ¿Cuándo Next.js SSR/SSG?**
R: Landing pages, blogs, e-commerce público, cualquier cosa que necesite SEO y TTFB con contenido.

---

**P: ¿Server Components (RSC)?**
R: Componentes renderizados en servidor, cero JS al cliente. No hooks, no event handlers. Fetch directo en servidor.

---

**P: ¿Hydration?**
R: Proceso donde React "activa" HTML estático del servidor attachando event listeners en el cliente.

---

## 09-avanzado

**P: ¿Qué es Compound Components?**
R: Componentes que trabajan juntos compartiendo state implícito (Tabs, Select, Accordion). API declarativa flexible.

---

**P: ¿Qué es Render Props?**
R: Componente recibe función como prop/children que retorna JSX. Comparte lógica. Largamente reemplazado por custom hooks.

---

**P: ¿Qué es HOC (Higher Order Component)?**
R: Función que recibe componente y retorna componente mejorado (withAuth, withTheme). Hoy preferir hooks.

---

**P: HOC vs Hooks?**
R: Hooks reemplazan HOCs y render props en la mayoría de casos. Menos nesting, más composable, mejor tree-shaking.

---

**P: ¿Feature-based vs Atomic Design?**
R: Feature: carpetas por dominio (`features/users/`). Atomic: por tipo UI (atoms/molecules). Feature escala mejor en equipos.

---

**P: ¿Error Boundaries?**
R: Class component que captura errores de render en hijos. Muestra fallback UI. No captura event handlers ni async.

---

**P: ¿Portals?**
R: Renderizar hijos fuera del DOM padre (modals, tooltips). `createPortal(child, document.body)`.

---

## 10-testing

**P: Jest vs React Testing Library?**
R: Jest: test runner, assertions, mocks. RTL: renderiza componentes y simula interacción de usuario. Van juntos.

---

**P: ¿Filosofía de RTL?**
R: "The more your tests resemble the way your software is used, the more confidence they can give you." No testear implementation details.

---

**P: getByRole vs getByTestId?**
R: Preferir getByRole (accesibilidad). getByTestId solo como último recurso.

---

**P: ¿Qué NO testear?**
R: State interno, métodos privados, implementation de hooks. Testear lo que el usuario ve y hace.

---

**P: ¿Cómo mockear fetch/API?**
R: MSW (Mock Service Worker) intercepta requests. O mock del módulo de API. Evitar mockear React Query internals.

---

**P: fireEvent vs userEvent?**
R: userEvent simula interacción real (click, type con delay). Más realista que fireEvent. Preferir userEvent.

---

**P: ¿Integration vs unit en React?**
R: Integration (RTL): render componente con providers y verificar flujo. Unit: funciones puras, utils, custom hooks aislados.

---

## 11-react18

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

---
