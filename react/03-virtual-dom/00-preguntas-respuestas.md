# Preguntas y Respuestas — Virtual DOM

> Review rápido sin código.

---

**P: ¿Qué es el Virtual DOM?**
R: Representación JS ligera del DOM real. React compara versiones (diffing) y aplica solo cambios mínimos al DOM.

---

**P: ¿Qué es Reconciliation?**
R: Proceso de comparar Virtual DOM anterior con nuevo y decidir qué cambiar en DOM real.

---

**P: ¿Por qué no usar index como key?**
R: Al reordenar/insertar/eliminar, index cambia y React reutiliza DOM incorrectamente. Causa bugs de state y renders innecesarios.

---

**P: ¿Qué key usar?**
R: ID único y estable del item (`item.id`). No random en cada render (causa remount constante).

---

**P: ¿Virtual DOM = rápido siempre?**
R: No magic. Reduce manipulación DOM directa pero diffing tiene costo. React 18 concurrent rendering mejora UX, no siempre raw speed.

---

**P: ¿Elementos de distinto tipo en diff?**
R: React destruye árbol anterior y construye nuevo. Mismo tipo: actualiza solo props/atributos cambiados.
