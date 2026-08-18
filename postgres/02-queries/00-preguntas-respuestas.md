# Preguntas y Respuestas — Queries PostgreSQL

> Review rápido sin código.

---

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
