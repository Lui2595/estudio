# Preguntas y Respuestas — MySQL Avanzado

> Review rápido sin código.

---

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
