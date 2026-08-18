# Preguntas y Respuestas — Funciones en TypeScript

> Review rápido sin código.

---

**P: ¿Function overloads?**
R: Múltiples firmas, una implementación. TS elige la firma correcta según argumentos. Útil para APIs con comportamiento distinto por tipo de input.

---

**P: ¿Tipo de retorno explícito vs inferido?**
R: Inferido en funciones simples. Explícito en funciones públicas, callbacks complejos, o cuando inferencia es demasiado amplia.

---

**P: void vs undefined en callbacks?**
R: Callback que retorna void acepta funciones que retornan cualquier cosa (ignora retorno). Útil en event handlers.

---

**P: ¿Genéricos en funciones?**
R: `function identity<T>(x: T): T`. Preserva el tipo exacto del argumento en el retorno.

---

**P: ¿Optional y default parameters?**
R: `function greet(name: string, greeting = 'Hola')`. Default hace el parámetro opcional en la práctica.
