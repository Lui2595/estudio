# Preguntas y Respuestas — Vue Avanzado

> Review rápido sin código.

---

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
