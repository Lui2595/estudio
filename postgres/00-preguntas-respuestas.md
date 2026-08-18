# Preguntas y Respuestas — PostgreSQL (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 6 |

---

## 01-fundamentos

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

---

## 02-queries

**P: ¿Para qué CTEs (WITH)?**
R: Legibilidad, queries modulares, reutilizar subqueries nombradas. CTEs recursivas para árboles/jerarquías.

---

**P: ¿CTE recursiva cuándo?**
R: Org charts, categorías anidadas, rutas en grafos, bill of materials. UNION ALL de caso base + caso recursivo.

---

**P: GROUP BY vs Window Functions?**
R: GROUP BY colapsa filas en grupos. Window functions mantienen cada fila y calculan sobre "ventana" (ranking, running total).

---

**P: ROW_NUMBER vs RANK vs DENSE_RANK?**
R: ROW_NUMBER: único secuencial. RANK: empates dejan gaps. DENSE_RANK: empates sin gaps.

---

**P: LAG/LEAD para qué?**
R: Acceder valor de fila anterior/siguiente sin self-join. Comparar día actual vs anterior en reportes.

---

**P: ¿Paginación con ROW_NUMBER?**
R: Subquery con ROW_NUMBER, filtrar por rango. Alternativa: OFFSET (lento en tablas grandes) o keyset pagination.

---

## 03-indices

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

---

## 04-transacciones

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

---

## 05-jsonb

**P: JSON vs JSONB en PG?**
R: JSON: texto preservado, insert más rápido. JSONB: binario, indexable con GIN, queries más rápidas. Preferir JSONB casi siempre.

---

**P: Operador @> ?**
R: Containment: `payload @> '{"user_id": 1}'` verifica si JSONB izquierdo contiene derecho.

---

**P: -> vs ->> ?**
R: `->` retorna JSONB. `->>` retorna text. `payload->>'name'` para comparar string.

---

**P: ¿Indexar JSONB?**
R: GIN index en columna completa o jsonb_path_ops para queries @>. Expression index en path específico si queries siempre filtran mismo campo.

---

**P: JSONB en Laravel?**
R: Migration `$table->jsonb('payload')`, cast `'payload' => 'array'` en modelo. Queries con `whereJsonContains`.

---

**P: ¿JSONB reemplaza tablas relacionales?**
R: No para relaciones con integridad. Sí para metadata flexible, settings, atributos variables por entidad.

---

## 06-comparativa

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

---
