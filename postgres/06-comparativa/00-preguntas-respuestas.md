# Preguntas y Respuestas — PostgreSQL vs MySQL

> Review rápido sin código.

---

**P: ¿Cuándo PostgreSQL?**
R: JSONB complejo, analytics, window functions, full-text, tipos avanzados, integridad estricta, extensiones (PostGIS).

---

**P: ¿Cuándo MySQL?**
R: Hosting barato, equipo familiarizado, ecosistema Laravel tradicional, replicación read-replica simple.

---

**P: Migrar Laravel MySQL → PostgreSQL?**
R: Cambiar connection, revisar unsigned (no existe en PG), json→jsonb, ON DUPLICATE KEY → ON CONFLICT, raw queries MySQL-specific, tests completos.

---

**P: Upsert syntax?**
R: MySQL: ON DUPLICATE KEY UPDATE. PostgreSQL: ON CONFLICT DO UPDATE.

---

**P: Boolean en cada uno?**
R: PG: tipo boolean nativo. MySQL: TINYINT(1) convención. Laravel abstrae con `$casts`.

---

**P: ¿PG más lento que MySQL?**
R: Depende del workload. PG suele mejor en queries complejas y writes concurrentes. MySQL puede ser más simple en reads básicos. Benchmark tu caso real.
