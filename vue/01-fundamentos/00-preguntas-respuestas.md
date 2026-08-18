# Preguntas y Respuestas — Fundamentos Vue

> Review rápido sin código.

---

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
