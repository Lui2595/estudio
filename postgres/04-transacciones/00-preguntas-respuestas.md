# Preguntas y Respuestas — Transacciones PostgreSQL (MVCC)

> Review rápido sin código.

---

**P: ¿Qué es MVCC?**
R: Multi-Version Concurrency Control. Cada transacción ve snapshot consistente. UPDATE crea nueva versión; viejas quedan como dead tuples.

---

**P: ¿Por qué DELETE no libera espacio inmediato?**
R: MVCC marca fila invisible; espacio se recupera con VACUUM, no con DELETE.

---

**P: ¿Qué es autovacuum?**
R: Proceso PG que limpia dead tuples automáticamente. Crítico en producción. Long transactions bloquean vacuum.

---

**P: FOR UPDATE SKIP LOCKED?**
R: Toma filas lockeables sin esperar las bloqueadas. Ideal para job queues: workers toman jobs distintos sin colisión.

---

**P: ¿Table bloat?**
R: Dead tuples acumulados ocupan espacio. Monitorear `n_dead_tup` en pg_stat_user_tables. VACUUM FULL recupera espacio (con lock).

---

**P: MVCC PG vs InnoDB?**
R: Ambos MVCC. PG requiere VACUUM explícito. InnoDB undo log se limpia diferente. PG REPEATABLE READ más estricto que MySQL default.
