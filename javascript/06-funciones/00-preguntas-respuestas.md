# Preguntas y Respuestas — Funciones (Arrow, HOF, Callbacks)

> Review rápido sin código.

---

**P: ¿Qué es Higher Order Function?**
R: Función que recibe o retorna otra función. Ej: `map`, `filter`, middleware Express, decorators.

---

**P: ¿Qué es un callback?**
R: Función pasada como argumento para ejecutarse después. Base de async antes de Promises y en event-driven code.

---

**P: ¿Ventajas de arrow functions?**
R: Sintaxis corta, lexical `this`, retorno implícito. Ideales para callbacks cortos.

---

**P: ¿Cuándo NO usar arrow function?**
R: Métodos de objeto que necesitan `this` dinámico. Constructores (no tienen `prototype`). Cuando necesitas `arguments` object.

---

**P: Callback hell: ¿cómo se solucionó?**
R: Promises encadenadas, async/await, y modularizar funciones intermedias.

---

**P: ¿Pure function vs impure?**
R: Pure: mismo input → mismo output, sin efectos secundarios. Facilita testing y predictibilidad. Impure: modifica estado externo o depende de él.
