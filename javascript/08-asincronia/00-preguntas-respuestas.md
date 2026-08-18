# Preguntas y Respuestas — Asincronía (Event Loop, Promises, async/await)

> Review rápido sin código. **Prioridad máxima para entrevista Senior.**

---

**P: ¿Qué es el Event Loop?**
R: Mecanismo que coordina call stack, microtasks y macrotasks. Permite JS non-blocking con un solo hilo.

---

**P: ¿Orden de ejecución: sync, Promise, setTimeout?**
R: Sync primero. Luego TODAS las microtasks (Promises). Luego UNA macrotask (setTimeout). Repeat.

---

**P: Microtask vs Macrotask?**
R: Microtasks: Promises, queueMicrotask, MutationObserver. Macrotasks: setTimeout, setInterval, I/O. Microtasks tienen prioridad.

---

**P: ¿Qué es una Promise?**
R: Objeto que representa valor futuro. Estados: pending → fulfilled o rejected. Encadenable con then/catch/finally.

---

**P: ¿Qué ocurre internamente con await?**
R: Pausa la función async, delega al Event Loop. Código posterior se convierte en microtask (.then). No bloquea el hilo principal.

---

**P: Promise.all vs allSettled vs race?**
R: all: todas deben resolver o falla. allSettled: espera todas sin importar resultado. race: gana la primera en settle.

---

**P: ¿Paralelo vs secuencial con async/await?**
R: Secuencial: await uno tras otro. Paralelo: `Promise.all([fetch1(), fetch2()])`. Secuencial innecesario es más lento.

---

**P: ¿Cómo manejar errores con async/await?**
R: try/catch alrededor del await. O .catch() si usas Promises directamente.
