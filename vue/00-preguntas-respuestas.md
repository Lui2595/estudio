# Preguntas y Respuestas — Vue.js (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 12 |

---

## 01-fundamentos

**P: ¿Cómo comunica padre e hijo en Vue?**
R: Props: padre → hijo (read-only). Emits: hijo → padre via eventos personalizados.

---

**P: ¿Qué hace v-model internamente?**
R: Es azúcar sintáctico: `:modelValue` + `@update:modelValue`. Vue 3 permite múltiples v-models y modificadores (.lazy, .number, .trim).

---

**P: v-if vs v-show?**
R: v-if: agrega/remueve del DOM (lazy, toggle costoso). v-show: toggle CSS display (mejor para toggle frecuente).

---

**P: ¿Por qué :key en v-for?**
R: Ayuda a Vue a identificar nodos para diff eficiente. Usar ID único, nunca index si la lista cambia.

---

**P: ¿Qué es scoped CSS?**
R: `<style scoped>` limita estilos al componente via atributo data único. Evita leaks de CSS global.

---

**P: SFC (Single File Component)?**
R: .vue con `<script>`, `<template>`, `<style>` en un archivo. Estándar Vue 3.

---

## 02-composition-api

**P: ref vs reactive?**
R: ref: primitivos u objetos, acceso con .value en script. reactive: solo objetos, acceso directo. Preferir ref por consistencia y reasignación.

---

**P: watch vs watchEffect?**
R: watch: fuente específica, valor anterior, lazy por defecto. watchEffect: ejecuta inmediato, auto-rastrea dependencias usadas en el callback.

---

**P: computed vs methods en template?**
R: computed: cacheado, solo recalcula si deps cambian. methods: ejecuta cada render. Usar computed para valores derivados.

---

**P: Options API vs Composition API?**
R: Options: data/methods/computed por opción, familiar Vue 2. Composition: lógica por feature, composables reutilizables. Composition es estándar Vue 3 nuevo.

---

**P: ¿Equivalente useEffect en Vue?**
R: watch/watchEffect para side effects reactivos. onMounted para mount-only. No hay array deps único; cada hook es explícito.

---

**P: ¿Cuándo Options API todavía?**
R: Componentes muy simples, equipos legacy, migración gradual. Código nuevo: Composition API.

---

## 03-reactivity

**P: ¿Cómo funciona reactividad Vue 3?**
R: Proxies (no defineProperty de Vue 2). Rastrea dependencias en acceso y dispara updates en mutación. Granular y eficiente.

---

**P: ¿Pérdida de reactividad al desestructurar?**
R: Desestructurar reactive pierde reactividad. Solución: toRefs() o acceder como objeto.user.name.

---

**P: ¿Qué es toRefs?**
R: Convierte cada propiedad de reactive en ref independiente. Permite desestructurar manteniendo reactividad.

---

**P: shallowRef vs ref?**
R: shallowRef: solo .value es reactivo, no propiedades internas. Útil para objetos grandes que reemplazas enteros (listas, datos de chart).

---

**P: Vue 2 vs Vue 3 reactividad?**
R: Vue 2: defineProperty, no detecta add/delete de keys, arrays con índice. Vue 3: Proxy, reactividad completa, mejor performance.

---

**P: readonly()?**
R: Hace reactive/readonly no mutables desde consumidor. Útil en provide/inject para state compartido.

---

## 04-lifecycle

**P: Hooks más usados en Composition API?**
R: onMounted (fetch inicial, listeners), onUnmounted (cleanup), onBeforeUnmount (cleanup antes de desmontar).

---

**P: onMounted vs watchEffect immediate?**
R: onMounted: una vez al montar. watchEffect immediate: al montar Y cada vez que deps cambian.

---

**P: ¿Dónde hacer cleanup?**
R: onUnmounted o return cleanup en watchEffect. Remover listeners, abort fetch, clearInterval.

---

**P: Equivalencia Options API?**
R: created/mounted/updated/destroyed. Composition: onBeforeMount, onMounted, onUpdated, onUnmounted, etc.

---

**P: ¿onUpdated para qué?**
R: Después de cada re-render. Usar con cuidado (puede causar loops). Preferir watch para efectos específicos.

---

**P: ¿Fetch en created o mounted?**
R: mounted/onMounted en cliente. En Nuxt: useFetch/useAsyncData en setup (SSR-safe).

---

## 05-composables

**P: ¿Qué es un composable?**
R: Función use* que encapsula lógica reactiva reutilizable. Equivalente a custom hooks en React.

---

**P: Reglas de composables?**
R: Nombre use*, llamar en setup o otros composables, puede retornar ref/reactive/computed.

---

**P: Composable vs Pinia store?**
R: Composable: lógica reutilizable, puede ser local o sin estado global. Pinia: state global compartido entre toda la app.

---

**P: ¿Composable vs mixin (Vue 2)?**
R: Composables: explícitos, sin conflictos de nombres, tree-shakeable. Mixins: implícitos, fuente de bugs, deprecated pattern.

---

**P: useFetch pattern?**
R: Encapsula data/loading/error, abort en unmount, re-fetch cuando URL cambia. Muy común en entrevistas.

---

**P: ¿Testear composables?**
R: Importar y llamar directamente en test, sin montar componente. Más fácil que testear hooks en React a veces.

---

## 06-pinia

**P: Pinia vs Vuex?**
R: Pinia: oficial Vue 3, sin mutations, TypeScript nativo, más simple. Vuex: legacy, mutations obligatorias, más boilerplate.

---

**P: ¿Cuándo usar store global?**
R: Auth, carrito, preferencias UI compartidas entre rutas. NO para server state (usar TanStack Query o useFetch).

---

**P: Setup stores vs Options stores en Pinia?**
R: Setup: Composition API style (ref, computed, functions). Options: state/getters/actions como Vuex. Setup más flexible.

---

**P: ¿Pinia vs provide/inject?**
R: Pinia: state global persistente, DevTools, SSR. provide/inject: state local al subárbol, sin store overhead.

---

**P: ¿Cómo usar Pinia en tests?**
R: createTestingPinia() con stub de actions. Montar componente con store mockeado.

---

**P: ¿Mutaciones en Pinia?**
R: No existen. Modificas state directamente en actions (Vue 3 reactividad lo maneja). Más simple que Vuex.

---

## 07-router

**P: ¿Navigation guards?**
R: beforeEach, beforeEnter, beforeResolve, afterEach. Validar auth, redirigir, cargar data antes de entrar a ruta.

---

**P: ¿Lazy loading rutas?**
R: `component: () => import('./View.vue')`. Code splitting automático por ruta.

---

**P: props: true en ruta?**
R: Pasa params de URL como props al componente. `/users/:id` → prop `id` en UserDetail.

---

**P: createWebHistory vs createWebHashHistory?**
R: History: URLs limpias /users/1 (requiere server config). Hash: /#/users/1, sin config servidor.

---

**P: ¿Router vs Nuxt file-based routing?**
R: Vue Router: configuración manual en router.js. Nuxt: pages/ genera rutas automáticamente.

---

**P: scrollBehavior?**
R: Controlar scroll al navegar: top, posición guardada, o scroll a anchor.

---

## 08-provide-inject

**P: ¿Alternativa a prop drilling en Vue?**
R: provide/inject: ancestro provee, descendiente consume sin intermediarios. Similar Context API en React.

---

**P: provide vs Pinia?**
R: provide: scope del subárbol, ligero, sin DevTools store. Pinia: global, persistencia, debugging.

---

**P: ¿Cómo tipar provide/inject?**
R: InjectionKey con Symbol en TypeScript. inject(ThemeKey) retorna tipo correcto.

---

**P: readonly en provide?**
R: Evita que hijos muten state directamente. Mutaciones via funciones proveídas (patrón flux-like).

---

**P: ¿provide reactivo?**
R: Pasar ref o reactive. Hijos ven cambios. Pasar valor primitivo: no reactivo.

---

**P: ¿Cuándo NO usar provide/inject?**
R: Relaciones padre-hijo directas (usa props). State global app-wide (usa Pinia).

---

## 09-performance

**P: ¿Qué es v-memo?**
R: Vue 3.2+: skip re-render de subárbol si deps no cambiaron. Similar React.memo a nivel template.

---

**P: defineAsyncComponent?**
R: Carga componente lazy con loading/error components y timeout. Code splitting.

---

**P: KeepAlive para qué?**
R: Preserva estado de componentes al cambiar tabs/rutas. No desmonta, cachea instancia.

---

**P: shallowRef en listas grandes?**
R: Evita deep reactivity en arrays/objetos grandes. Reemplaza .value entero en lugar de mutar items.

---

**P: v-once?**
R: Renderiza elemento una sola vez, nunca actualiza. Contenido estático puro.

---

**P: Vue vs React performance?**
R: Vue compiler optimiza static hoisting, patch flags. Ambos son rápidos; optimiza queries y bundle antes que micro-optimizar framework.

---

**P: Suspense en Vue 3?**
R: Muestra fallback mientras async setup o async components cargan. Paralelo a React Suspense.

---

## 10-nuxt

**P: ¿Qué es Nuxt?**
R: Framework Vue para SSR, SSG, routing automático, convenciones. Equivalente Next.js para React.

---

**P: SSR vs CSR en Vue?**
R: SSR (Nuxt): HTML con contenido, SEO, datos en primera carga. CSR (Vite SPA): JS renderiza todo, mejor para dashboards autenticados.

---

**P: useFetch vs useAsyncData?**
R: useFetch: wrapper conveniente sobre $fetch con URL. useAsyncData: más control, cualquier async fn, keys custom.

---

**P: ¿Nuxt vs Vue SPA + Laravel API?**
R: Nuxt: SSR, SEO, server routes Node. Laravel API + Vue SPA: separación clara, Sanctum, equipo PHP backend.

---

**P: File-based routing Nuxt?**
R: pages/index.vue → /, pages/users/[id].vue → /users/:id. Auto-generado, no router.js manual.

---

**P: ISR en Nuxt 3?**
R: routeRules con isr: segundos. Regenera páginas estáticas en background.

---

**P: ¿Payload SSR?**
R: Datos fetched en servidor se serializan al cliente. Evita doble fetch en hydration.

---

## 11-testing

**P: ¿Stack de testing Vue 3?**
R: Vitest (runner, compatible Vite) + @vue/test-utils (mount components) + opcional Testing Library.

---

**P: mount vs shallowMount?**
R: mount: renderiza hijos reales. shallowMount: stub de componentes hijos. mount para integration, shallow para unit aislado.

---

**P: ¿Cómo testear emits?**
R: wrapper.emitted('eventName') retorna array de payloads. expect(wrapper.emitted('changed')[0]).toEqual([1]).

---

**P: ¿Testear Pinia?**
R: createTestingPinia({ initialState, stubActions }). O mockear useAuthStore.

---

**P: trigger vs setValue?**
R: trigger('click') para eventos DOM. setValue() para inputs. Ambos async con await.

---

**P: ¿Testear composables?**
R: Llamar useFetch() directamente en test. Controlar fetch con vi.mock o MSW.

---

**P: RTL philosophy en Vue?**
R: Igual que React: testear comportamiento usuario, no implementation. getByRole, user-event.

---

## 12-avanzado

**P: ¿Qué es Teleport?**
R: Renderiza contenido en otro nodo DOM (body). Modals, toasts, tooltips fuera del árbol del componente.

---

**P: Tipos de slots?**
R: Default, named (`<slot name="header">`), scoped (pasa data al slot: `v-slot="{ item }"`).

---

**P: defineModel (Vue 3.4+)?**
R: Simplifica v-model en componente hijo. Una línea vs props + emit manuales.

---

**P: Renderless components?**
R: Componente solo con lógica, UI via scoped slot. Patrón headless (como Radix en React).

---

**P: Vue vs React en entrevista Senior?**
R: Vue: template declarativo, reactividad automática, menos boilerplate. React: ecosistema mayor, JSX flexible, más control manual de memoización.

---

**P: ¿Migración Vue 2 → 3?**
R: Composition API, breaking changes (filters removed, $on removed, Vuex→Pinia). @vue/compat para migración gradual.

---

**P: Script setup vs setup()?**
R: script setup: azúcar sintáctico, menos boilerplate, top-level bindings auto-expuestas. Estándar en código nuevo.

---
