# Preguntas y Respuestas — MySQL Fundamentos

> Review rápido sin código.

---

**P: DELETE vs TRUNCATE?**
R: DELETE: fila por fila, activa triggers, rollback posible, lento en tablas grandes. TRUNCATE: vacía tabla, resetea AUTO_INCREMENT, más rápido, no row-by-row.

---

**P: INNER JOIN vs LEFT JOIN?**
R: INNER: solo filas con match en ambas tablas. LEFT: todas las de la izquierda + match derecho o NULL.

---

**P: ¿MySQL soporta FULL OUTER JOIN?**
R: No nativamente. Simular con UNION de LEFT y RIGHT JOIN.

---

**P: ¿ON DUPLICATE KEY UPDATE?**
R: Si INSERT viola unique key, ejecuta UPDATE en su lugar. Upsert nativo MySQL.

---

**P: LIMIT vs OFFSET para paginación?**
R: `LIMIT 10 OFFSET 20` = página 3 de 10. OFFSET grande es lento; cursor-based pagination es mejor en tablas enormes.

---

**P: ¿Self JOIN cuándo?**
R: Relacionar filas de la misma tabla: empleado→manager, categoría→parent.
