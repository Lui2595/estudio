# Preguntas y Respuestas — Performance MySQL (EXPLAIN)

> Review rápido sin código.

---

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
