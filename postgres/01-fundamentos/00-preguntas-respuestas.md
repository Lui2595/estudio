# Preguntas y Respuestas — PostgreSQL Fundamentos

> Review rápido sin código.

---

**P: ¿Ventajas PG sobre MySQL?**
R: JSONB indexable, window functions maduras, CTEs recursivas, tipos avanzados, MVCC superior, full-text nativo, extensibilidad.

---

**P: ¿Qué hace RETURNING?**
R: Retorna filas afectadas en INSERT/UPDATE/DELETE. Evita query adicional post-insert.

---

**P: ON CONFLICT DO UPDATE?**
R: Upsert nativo PG. Equivalente a MySQL ON DUPLICATE KEY UPDATE. Requiere unique constraint o index.

---

**P: SERIAL vs IDENTITY?**
R: SERIAL es azúcar sintáctico legacy. IDENTITY (SQL standard) preferido en PG moderno. Laravel migrations usan `id()` que mapea adecuadamente.

---

**P: TIMESTAMPTZ vs TIMESTAMP?**
R: TIMESTAMPTZ almacena UTC, convierte a timezone de sesión. Preferir siempre TIMESTAMPTZ para evitar bugs de timezone.

---

**P: ¿Arrays nativos en PG?**
R: Columnas tipo array (`TEXT[]`). Útil para tags. Indexables con GIN.
