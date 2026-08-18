# Preguntas y Respuestas — SQL vs NoSQL

> Review rápido sin código.

---

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
