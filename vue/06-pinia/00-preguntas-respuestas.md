# Preguntas y Respuestas — Pinia

> Review rápido sin código.

---

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
