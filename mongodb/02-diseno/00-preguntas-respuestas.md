# Preguntas y Respuestas — Diseño MongoDB

> Review rápido sin código. **Muy preguntado.**

---

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
