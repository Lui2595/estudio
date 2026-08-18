# Preguntas y Respuestas — Composables

> Review rápido sin código.

---

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
