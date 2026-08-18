# Preguntas y Respuestas — MongoDB (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 7 |

---

## 01-fundamentos

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

---

## 02-diseno

**P: Embedding vs Referencing?**
R: Embedding: datos anidados en mismo documento (1:1, 1:pocos, siempre se leen juntos). Referencing: ObjectId a otra colección (1:muchos sin límite, datos compartidos).

---

**P: ¿Cuándo embeber?**
R: Relación 1:1 o 1:pocos, datos siempre leídos juntos, array no crecerá sin límite (regla ~100-1000 max).

---

**P: ¿Cuándo referenciar?**
R: 1:muchos ilimitados (comentarios), entidad compartida (autor en muchos posts), evitar documentos >16MB.

---

**P: ¿Bucket pattern?**
R: Agrupar muchos items en buckets de N documentos (ej. 100 comentarios por bucket). Evita arrays enormes en un documento.

---

**P: ¿Duplicar datos (denormalizar)?**
R: Común en MongoDB. Guardar snapshot de author.name en post para evitar $lookup. Trade-off: consistencia vs read performance.

---

**P: users, posts, comments: ¿MongoDB?**
R: Generalmente PostgreSQL/MySQL mejor. MongoDB si posts tienen bloques de contenido muy variables (Notion-like) o escala write extrema.

---

## 03-indices

**P: ¿ESR rule?**
R: Equality, Sort, Range. Orden ideal en índice compuesto: campos = primero, sort segundo, range último.

---

**P: ¿TTL index?**
R: Auto-elimina documentos después de expireAfterSeconds. Ideal sessions, logs temporales, cache persistente.

---

**P: Partial index?**
R: Indexa solo documentos que cumplen filtro. Más pequeño si queries siempre incluyen misma condición.

---

**P: explain() en MongoDB?**
R: Equivalente EXPLAIN SQL. Comparar totalDocsExamined vs nReturned. Ideal: iguales (index eficiente).

---

**P: Covered query?**
R: Query resuelta solo con índice sin fetch del documento. Proyección incluye solo campos del índice + _id:0.

---

**P: ¿Index en array?**
R: Multikey index: indexa cada elemento del array. Un documento no puede indexar más de un array field en mismo compound index.

---

## 04-aggregation

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

---

## 05-transacciones

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

---

## 06-avanzado

**P: Replica Set: roles?**
R: Primary (writes), Secondary (replica reads), Arbiter (vota sin data). Mínimo producción: 3 nodos.

---

**P: Failover automático?**
R: Si Primary cae, Secondary se elige nuevo Primary via election. App debe manejar cambio de topology (driver lo hace).

---

**P: Sharding cuándo?**
R: Datos >TB, writes que exceden un servidor, no solo por "tener muchos documentos". Añade complejidad operacional.

---

**P: ¿Shard key mal elegida?**
R: Monótona creciente (_id secuencial) → hot shard. Elegir key con distribución uniforme que aparezca en queries.

---

**P: mongos?**
R: Router que dirige queries al shard correcto según shard key. App conecta a mongos, no directo a shards.

---

**P: ObjectId vs UUID?**
R: ObjectId: compacto, timestamp embebido, generación local. UUID: estándar, mejor integración cross-system, 16 bytes.

---

**P: Change Streams?**
R: Observar cambios en colección en tiempo real. Base para reactive patterns, sync, audit. Requiere replica set.

---

## 07-comparativa

**P: ¿Stack híbrido común?**
R: PostgreSQL transaccional + MongoDB logs/analytics + Redis cache/queues. Cada uno para su fortaleza.

---

**P: E-commerce: ¿MongoDB?**
R: Generalmente no como BD principal. Pedidos, pagos, inventario necesitan transacciones e integridad relacional.

---

**P: ¿Logs y eventos?**
R: MongoDB excelente: esquema flexible, TTL indexes, write throughput, aggregation para analytics.

---

**P: ¿CMS contenido anidado?**
R: MongoDB natural para bloques de contenido variables. O PostgreSQL JSONB como middle ground.

---

**P: Laravel + MongoDB?**
R: Package mongodb/laravel-mongodb. Pierdes mucho Eloquent estándar. Solo si hay razón clara de negocio.

---

**P: ¿Cómo decidir en entrevista?**
R: No "MongoDB es mejor". Analiza: relaciones, transacciones, escala, esquema, equipo. Justifica trade-offs.

---

**P: CAP theorem aplicado?**
R: En partition, eliges Consistency o Availability. MongoDB replica set configurable. SQL tradicional favorece consistency.

---
