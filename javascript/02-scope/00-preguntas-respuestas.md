# Preguntas y Respuestas — Scope

> Review rápido sin código.

---

**P: ¿Qué es Global Scope?**
R: Variables accesibles en todo el programa. En browser: `window`. Evitar contaminar global.

---

**P: ¿Qué es Function Scope?**
R: Variables declaradas con `var` o parámetros de función solo existen dentro de esa función.

---

**P: ¿Qué es Block Scope?**
R: Variables `let`/`const` dentro de `{}` (if, for, while) solo existen en ese bloque.

---

**P: ¿Qué es Lexical Scope?**
R: Las funciones internas acceden a variables del scope donde fueron DEFINIDAS, no donde se ejecutan. Base de closures.

---

**P: ¿Diferencia scope vs contexto (`this`)?**
R: Scope: qué variables están disponibles (lexical). Contexto: valor de `this` (depende de cómo se llama la función).

---

**P: ¿IIFE para qué servía?**
R: Immediately Invoked Function Expression: crear scope privado antes de ES modules. Hoy menos necesario con modules y block scope.
