# Preguntas y Respuestas — Índices MySQL

> Review rápido sin código.

---

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
