-- TEMA: EXPLAIN y optimización de queries
-- ENTREVISTA: ¿Qué buscas en un EXPLAIN?

EXPLAIN SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON p.user_id = u.id
WHERE u.is_active = 1
ORDER BY p.created_at DESC
LIMIT 20;

-- EXPLAIN ANALYZE (MySQL 8.0.18+): ejecuta y muestra tiempos reales
-- EXPLAIN ANALYZE SELECT ...;

-- Columnas clave de EXPLAIN:
-- type: system > const > eq_ref > ref > range > index > ALL
--   → ALL = full table scan (MALO en tablas grandes)
-- key: índice que usa
-- rows: filas estimadas a examinar
-- Extra: Using filesort, Using temporary (señales de alerta)

-- Problemas comunes y soluciones:

-- 1. Full table scan → agregar índice
-- 2. Using filesort → índice que cubra ORDER BY
-- 3. Using temporary → simplificar GROUP BY o agregar índice
-- 4. Función en columna indexada (MALO):
-- SELECT * FROM users WHERE YEAR(created_at) = 2024; -- no usa índice
-- SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'; -- sí

-- N+1 en SQL: resolver con JOIN o IN, no queries en loop
SELECT p.*, u.name AS author
FROM posts p
INNER JOIN users u ON u.id = p.user_id
WHERE p.status = 'published';
