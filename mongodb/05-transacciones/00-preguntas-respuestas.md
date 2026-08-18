# Preguntas y Respuestas — Transacciones MongoDB

> Review rápido sin código.

---

**P: ¿MongoDB soporta ACID?**
R: Sí desde 4.0 multi-documento en replica set. 4.2+ en sharded cluster. Requiere replica set (no standalone).

---

**P: ¿Limitaciones vs PostgreSQL?**
R: Transacciones PG más maduras, FK nativas, menos overhead. Mongo transactions tienen timeout 60s default, no reemplazan diseño relacional.

---

**P: ¿Cuándo transaction en MongoDB?**
R: Operaciones multi-documento que deben ser atómicas: transferencia entre cuentas, order + inventory. Single document update ya es atómico.

---

**P: Session en transacción?**
R: Pasar session a cada operación en la transacción. withTransaction() maneja commit/rollback automático.

---

**P: ¿Single document atomicity?**
R: Update de un documento siempre es atómico sin transaction explícita. Embedding aprovecha esto.

---

**P: ¿Eventual consistency en replica set?**
R: Read from secondary puede retornar data stale. readPreference primary para reads consistentes post-write.
