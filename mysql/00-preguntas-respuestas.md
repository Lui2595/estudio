# Preguntas y Respuestas — MySQL (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 6 |

---

## 01-fundamentos

**P: DELETE vs TRUNCATE?**
R: DELETE: fila por fila, activa triggers, rollback posible, lento en tablas grandes. TRUNCATE: vacía tabla, resetea AUTO_INCREMENT, más rápido, no row-by-row.

---

**P: INNER JOIN vs LEFT JOIN?**
R: INNER: solo filas con match en ambas tablas. LEFT: todas las de la izquierda + match derecho o NULL.

---

**P: ¿MySQL soporta FULL OUTER JOIN?**
R: No nativamente. Simular con UNION de LEFT y RIGHT JOIN.

---

**P: ¿ON DUPLICATE KEY UPDATE?**
R: Si INSERT viola unique key, ejecuta UPDATE en su lugar. Upsert nativo MySQL.

---

**P: LIMIT vs OFFSET para paginación?**
R: `LIMIT 10 OFFSET 20` = página 3 de 10. OFFSET grande es lento; cursor-based pagination es mejor en tablas enormes.

---

**P: ¿Self JOIN cuándo?**
R: Relacionar filas de la misma tabla: empleado→manager, categoría→parent.

---

## 02-indices

**P: ¿Para qué sirve un índice?**
R: Acelera búsquedas y sorts. Estructura B-Tree (default) permite encontrar filas sin full table scan.

---

**P: ¿Cuándo un índice NO ayuda?**
R: Tablas pequeñas, columnas baja cardinalidad, muchos writes (overhead mantener índice), queries con funciones en columna (`YEAR(date)`), `LIKE '%suffix'`.

---

**P: ¿Leftmost prefix rule en índice compuesto?**
R: Índice (a, b, c) sirve para queries que filtran por `a`, o `a+b`, o `a+b+c`. NO sirve solo por `b` o `c`.

---

**P: ¿Covering index?**
R: Índice que incluye todas las columnas del SELECT. MySQL lee solo el índice sin ir a la tabla (index-only scan).

---

**P: UNIQUE INDEX vs PRIMARY KEY?**
R: PK: identifica fila, una por tabla, NOT NULL. UNIQUE: garantiza unicidad pero permite un NULL (en MySQL múltiples NULL permitidos en unique).

---

**P: ¿FULLTEXT index?**
R: Búsqueda de texto natural en MySQL. Alternativa limitada vs Elasticsearch/PostgreSQL tsvector para búsqueda avanzada.

---

## 03-transacciones

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

---

## 04-performance

**P: ¿Qué buscas en EXPLAIN?**
R: `type` (evitar ALL = full scan), `key` (índice usado), `rows` (estimado a examinar), `Extra` (Using filesort/temporary = alerta).

---

**P: ¿Orden de type de mejor a peor?**
R: system > const > eq_ref > ref > range > index > ALL. ALL = full table scan en tablas grandes = malo.

---

**P: Using filesort: ¿qué significa?**
R: MySQL ordena resultados aparte, no via índice. Agregar índice que cubra ORDER BY o reescribir query.

---

**P: Using temporary?**
R: Crea tabla temporal (GROUP BY, DISTINCT complejos). Simplificar query o agregar índice apropiado.

---

**P: ¿Función en columna indexada?**
R: `WHERE YEAR(created_at) = 2024` no usa índice. Usar rango: `created_at >= '2024-01-01' AND created_at < '2025-01-01'`.

---

**P: N+1 en SQL?**
R: Resolver con JOIN o WHERE IN, nunca queries en loop desde aplicación. Laravel: `with()` para eager loading.

---

## 05-diseno

**P: 1NF, 2NF, 3NF en una frase?**
R: 1NF: valores atómicos. 2NF: sin dependencias parciales de PK compuesta. 3NF: sin dependencias transitivas.

---

**P: ¿Cuándo desnormalizar?**
R: Lecturas >> escrituras, dashboards, evitar JOINs costosos en hot paths. Duplicar `author_name` en posts si siempre se lee junto.

---

**P: JSON column en MySQL: cuándo?**
R: Datos semi-estructurados que cambian forma (settings, metadata). No reemplaza relaciones con integridad referencial.

---

**P: ¿FK constraints en producción?**
R: Garantizan integridad en BD. Algunos equipos evitan por migraciones complejas; Laravel/Eloquent puede manejar relaciones sin FK física (no ideal).

---

**P: ¿Soft delete en diseño?**
R: Columna `deleted_at` en lugar de DELETE. Recuperable, mantiene historial. Índices parciales no nativos en MySQL (considerar filtro en queries).

---

**P: ¿VARCHAR vs TEXT?**
R: VARCHAR hasta 65535 bytes (con límite row). TEXT para contenido largo. VARCHAR indexable completo; TEXT requiere prefix index.

---

## 06-avanzado

**P: ¿Para qué Views?**
R: Query virtual reutilizable. Simplifica queries complejas, capa de abstracción para reportes. No almacena data.

---

**P: ¿Cuándo NO usar Stored Procedures?**
R: Lógica de negocio compleja, necesitas testear con PHPUnit, versionar en Git con app code. SP oculta lógica en BD.

---

**P: ¿Triggers cuándo?**
R: Audit log automático, validaciones a nivel BD. Con cuidado: difíciles de debuggear, lógica oculta.

---

**P: ¿Replicación Master-Replica?**
R: Master recibe writes, replicas reciben binlog para reads. Escala lecturas. Replica puede ir retrasada (lag).

---

**P: ¿Particionamiento cuándo?**
R: Tablas enormes (millones+), queries siempre filtran por columna de partición (ej. fecha). Divide físicamente la tabla.

---

**P: ¿Read replica lag: implicaciones?**
R: Usuario crea post (master) y lee lista (replica) puede no verlo inmediatamente. Leer crítico del master o eventual consistency aceptable.

---
