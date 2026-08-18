# Preguntas y Respuestas — Closures

> Review rápido sin código. **Tema MUY preguntado.**

---

**P: ¿Qué es un closure?**
R: Función que recuerda variables de su scope léxico aunque el scope padre ya terminó de ejecutarse.

---

**P: ¿Para qué sirven los closures?**
R: Datos privados, factories, callbacks, event handlers, módulos antes de ES modules, mantener estado entre llamadas.

---

**P: Explica el clásico loop + setTimeout.**
R: Con `var`, todos los callbacks comparten la misma `i`. Con `let`, cada iteración tiene su propio binding. Solución alternativa: IIFE o closures explícitos.

---

**P: ¿Closure causa memory leaks?**
R: Puede retener referencias a variables grandes innecesariamente. Liberar listeners y referencias cuando ya no se necesitan.

---

**P: ¿Closure en React?**
R: Event handlers capturan state/props del render. Causa bugs con stale closures si no incluyes dependencias en useEffect/useCallback.

---

**P: ¿Diferencia closure vs scope?**
R: Scope es la regla de visibilidad. Closure es el mecanismo que mantiene acceso a ese scope después de que "debería" haber muerto.
