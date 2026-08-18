# Preguntas y Respuestas — Índices PostgreSQL

> Review rápido sin código.

---

**P: ¿Índice parcial?**
R: Indexa solo filas que cumplen condición (`WHERE is_active = true`). Más pequeño y rápido si siempre filtras igual.

---

**P: GIN vs GiST?**
R: GIN: JSONB, arrays, full-text (tsvector). GiST: geometría, rangos, full-text alternativo. GIN más común para JSONB.

---

**P: Seq Scan vs Index Scan?**
R: Seq Scan lee tabla completa. Index Scan usa índice. Seq Scan OK en tablas pequeñas; malo en millones de filas sin filtro selectivo.

---

**P: ¿Full-text search PG?**
R: tsvector + tsquery + GIN index. Stemming, ranking, idiomas. Superior a MySQL FULLTEXT para búsqueda compleja.

---

**P: EXPLAIN ANALYZE vs EXPLAIN?**
R: ANALYZE ejecuta la query y muestra tiempos reales, no solo estimados. Esencial para tuning real.

---

**P: ¿Cuándo REINDEX?**
R: Índice corrupto o muy fragmentado. `REINDEX INDEX CONCURRENTLY` en producción sin lock exclusivo prolongado.
