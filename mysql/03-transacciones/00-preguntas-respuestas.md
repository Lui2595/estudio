# Preguntas y Respuestas — Transacciones MySQL

> Review rápido sin código.

---

**P: Explica ACID.**
R: Atomicity: todo o nada. Consistency: integridad se mantiene. Isolation: transacciones concurrentes no interfieren. Durability: datos persisten tras commit.

---

**P: Niveles de aislamiento en InnoDB?**
R: Default REPEATABLE READ. También READ UNCOMMITTED, READ COMMITTED, SERIALIZABLE. Trade-off consistencia vs performance.

---

**P: ¿Qué hace SELECT FOR UPDATE?**
R: Lock pesimista en filas seleccionadas dentro de transacción. Evita race conditions en stock/saldos.

---

**P: ¿Deadlock en MySQL?**
R: Dos transacciones esperan locks mutuos. InnoDB detecta y mata una automáticamente. Prevención: acceder recursos en mismo orden, transacciones cortas.

---

**P: SAVEPOINT?**
R: Punto de rollback parcial dentro de transacción. Rollback to savepoint sin abortar toda la transacción.

---

**P: ¿InnoDB vs MyISAM?**
R: InnoDB: transacciones, FK, row-level locking. Default MySQL 8. MyISAM: sin transacciones, table-level lock, obsoleto.
