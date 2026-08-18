# Preguntas y Respuestas — Manejo de Memoria

> Review rápido sin código.

---

**P: ¿Dónde viven las variables en PHP?**
R: Escalares en stack/zval. Objetos y arrays en heap; la variable es una referencia al objeto en memoria.

---

**P: ¿Cómo libera memoria PHP?**
R: Reference counting: cuando nadie referencia un valor, se libera. Un garbage collector adicional limpia ciclos (objetos que se referencian mutuamente).

---

**P: ¿Qué hace el operador `&`?**
R: Crea un alias: dos variables apuntan al mismo valor. Sin `&`, escalares se copian por valor; arrays usan Copy on Write.

---

**P: ¿PHP copia un array al asignarlo (`$b = $a`)?**
R: No inmediatamente. Usa Copy on Write: comparten memoria hasta que una de las dos se modifica; entonces se crea la copia real.

---

**P: `$a = [1,2,3]; $b = $a; $b[] = 4` — ¿qué pasa con `$a`?**
R: `$a` sigue siendo `[1,2,3]`. Al modificar `$b`, PHP hace la copia real por Copy on Write.

---

**P: ¿Por qué importa esto en entrevista Senior?**
R: Evita bugs de mutación accidental, entiendes performance al pasar arrays grandes, y comprendes por qué clonar objetos requiere `clone` explícito.
