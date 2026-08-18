# Preguntas y Respuestas — Performance Vue

> Review rápido sin código.

---

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
