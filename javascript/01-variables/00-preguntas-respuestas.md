# Preguntas y Respuestas — Variables (var, let, const)

> Review rápido sin código.

---

**P: ¿Diferencia entre let y var?**
R: `var` es function-scoped y permite redeclaración; hace hoisting como undefined. `let` es block-scoped, no redeclarable, temporal dead zone hasta su línea.

---

**P: ¿Qué es const?**
R: Block-scoped, no reasignable. Pero objetos/arrays const SÍ pueden mutar propiedades internas.

---

**P: ¿Por qué var falla en loops con setTimeout?**
R: `var` comparte una sola variable `i` para todas las iteraciones. Al ejecutar callbacks, `i` ya vale el valor final. `let` crea binding nuevo por iteración.

---

**P: ¿Cuándo usar const vs let?**
R: `const` por defecto siempre que no reasignes. `let` solo cuando la variable cambia. Nunca `var` en código moderno.

---

**P: ¿const garantiza inmutabilidad?**
R: No. Garantiza que no reasignes la referencia. `const obj = {}; obj.name = 'x'` es válido. Inmutabilidad real requiere `Object.freeze()` o librerías.
