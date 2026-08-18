# Preguntas y Respuestas — Funciones

> Review rápido sin código.

---

**P: ¿Qué es un closure?**
R: Función anónima que captura variables del scope externo con `use`. Sigue teniendo acceso aunque el scope padre ya terminó.

---

**P: ¿Diferencia entre closure y función anónima?**
R: Toda closure es anónima, pero no toda anónima es closure. Closure captura variables del scope padre; anónima simple no.

---

**P: ¿Para qué sirven los closures en Laravel?**
R: Callbacks en collections, middleware, queue jobs, route definitions, event listeners y lazy evaluation.

---

**P: ¿Ventaja de arrow functions `fn()` sobre `function()`?**
R: Sintaxis corta, captura automática de variables del scope, retorno implícito de una expresión. Ideal para callbacks de una línea.

---

**P: `use ($var)` vs `use (&$var)`?**
R: Por valor: la closure ve el valor al momento de creación (o copia). Por referencia: ve cambios posteriores a la variable original.

---

**P: ¿Cuándo usar `array_map(fn($x) => ...)` vs foreach?**
R: `array_map` para transformaciones funcionales y encadenables. Foreach cuando necesitas lógica imperativa, múltiples operaciones o break/continue.
