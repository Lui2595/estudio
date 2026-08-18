# Preguntas y Respuestas — MongoDB Fundamentos

> Review rápido sin código.

---

**P: ¿Documento vs fila SQL?**
R: Documento BSON flexible (JSON-like) en colección. Sin esquema fijo obligatorio. Una colección ≈ tabla pero estructura puede variar por documento.

---

**P: ¿Cuándo MongoDB vs PostgreSQL?**
R: MongoDB: esquema evolutivo, datos anidados, escala horizontal writes. PostgreSQL: relaciones, transacciones complejas, integridad referencial, JOINs.

---

**P: ¿Qué es ObjectId?**
R: PK default 12 bytes: timestamp + random + counter. Generable localmente sin colisiones. Incluye fecha de creación.

---

**P: Operadores $set, $push, $inc?**
R: $set: actualizar campo. $push: agregar a array. $inc: incrementar numérico. Updates atómicos a nivel documento.

---

**P: ¿Colección vs base de datos?**
R: Database contiene colecciones. Colección contiene documentos. Analogía: DB → tabla lógica → fila flexible.

---

**P: ¿MongoDB tiene joins?**
R: $lookup en aggregation (left outer join limitado). No JOINs nativos eficientes como SQL. Diseño embedding/referencing compensa.
