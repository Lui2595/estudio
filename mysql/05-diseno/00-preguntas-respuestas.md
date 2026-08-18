# Preguntas y Respuestas — Diseño MySQL

> Review rápido sin código.

---

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
