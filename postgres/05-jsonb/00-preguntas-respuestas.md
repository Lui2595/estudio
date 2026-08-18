# Preguntas y Respuestas — JSONB PostgreSQL

> Review rápido sin código.

---

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
