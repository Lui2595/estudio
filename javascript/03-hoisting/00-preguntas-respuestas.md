# Preguntas y Respuestas — Hoisting

> Review rápido sin código.

---

**P: ¿Qué es hoisting?**
R: JS "eleva" declaraciones al inicio del scope antes de ejecutar. Comportamiento diferente según var, let, const y functions.

---

**P: `console.log(a); var a = 5` — ¿qué imprime?**
R: `undefined`. `var a` se hoistea; la asignación no. Equivalente a declarar `a` arriba sin valor.

---

**P: ¿let y const también hacen hoisting?**
R: Sí, pero están en Temporal Dead Zone hasta su línea. Acceder antes → ReferenceError, no undefined.

---

**P: ¿Function declaration vs expression en hoisting?**
R: Declarations se hoistean completas (puedes llamarlas antes). Expressions no (quedan undefined hasta la asignación).

---

**P: ¿Por qué importa en entrevista?**
R: Explica bugs de orden de código, por qué usar let/const, y diferencia con function declarations.
