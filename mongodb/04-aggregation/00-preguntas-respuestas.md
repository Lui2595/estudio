# Preguntas y Respuestas — Aggregation MongoDB

> Review rápido sin código.

---

**P: ¿Aggregation vs find?**
R: find: queries simples con filtros. Aggregation: transformaciones, GROUP BY, joins ($lookup), reportes complejos.

---

**P: ¿Orden de stages importante?**
R: Sí. $match temprano reduce documentos procesados. $match → $lookup → $group → $sort → $limit es patrón común.

---

**P: ¿Qué hace $lookup?**
R: Left outer join con otra colección. Equivalente SQL LEFT JOIN limitado. Requiere índice en foreignField para performance.

---

**P: $unwind?**
R: Descompone array en un documento por elemento. Necesario después de $lookup si foreign field es array.

---

**P: $group vs SQL GROUP BY?**
R: Similar: agrupa por _id del group, acumula con $sum, $avg, $push, etc. _id puede ser null para agregación total.

---

**P: $facet?**
R: Múltiples pipelines en paralelo sobre mismos docs. Útil paginación + count en una query.

---

**P: ¿Aggregation en Laravel?**
R: mongodb/laravel-mongodb package. Raw aggregation o Eloquent-like. Mayoría Laravel apps usan SQL, no Mongo aggregation.
