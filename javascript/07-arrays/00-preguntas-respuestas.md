# Preguntas y Respuestas — Arrays (map, filter, reduce)

> Review rápido sin código.

---

**P: ¿Qué hace map?**
R: Transforma cada elemento y retorna nuevo array de la misma longitud. No muta el original.

---

**P: ¿Qué hace filter?**
R: Retorna nuevo array solo con elementos que pasan la condición.

---

**P: ¿Qué hace reduce?**
R: Acumula a un solo valor (número, objeto, array). Requiere valor inicial para evitar bugs con arrays vacíos.

---

**P: find vs filter?**
R: `find` retorna el PRIMER elemento que cumple (o undefined). `filter` retorna array con TODOS los que cumplen.

---

**P: some vs every?**
R: `some`: ¿alguno cumple? (OR). `every`: ¿todos cumplen? (AND). Retornan boolean.

---

**P: ¿map/filter vs forEach?**
R: map/filter retornan nuevo valor/array. forEach solo itera (void). forEach no se puede break; for...of sí.

---

**P: ¿Mutar vs inmutabilidad en arrays?**
R: Preferir métodos no mutantes (map, filter, spread) en React/state. push/splice mutan el original.
