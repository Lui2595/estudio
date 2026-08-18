# Preguntas y Respuestas — MongoDB Avanzado

> Review rápido sin código.

---

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
