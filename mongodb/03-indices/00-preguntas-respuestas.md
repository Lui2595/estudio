# Preguntas y Respuestas — Índices MongoDB

> Review rápido sin código.

---

**P: ¿ESR rule?**
R: Equality, Sort, Range. Orden ideal en índice compuesto: campos = primero, sort segundo, range último.

---

**P: ¿TTL index?**
R: Auto-elimina documentos después de expireAfterSeconds. Ideal sessions, logs temporales, cache persistente.

---

**P: Partial index?**
R: Indexa solo documentos que cumplen filtro. Más pequeño si queries siempre incluyen misma condición.

---

**P: explain() en MongoDB?**
R: Equivalente EXPLAIN SQL. Comparar totalDocsExamined vs nReturned. Ideal: iguales (index eficiente).

---

**P: Covered query?**
R: Query resuelta solo con índice sin fetch del documento. Proyección incluye solo campos del índice + _id:0.

---

**P: ¿Index en array?**
R: Multikey index: indexa cada elemento del array. Un documento no puede indexar más de un array field en mismo compound index.
