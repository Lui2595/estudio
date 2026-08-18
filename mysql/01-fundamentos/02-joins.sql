-- TEMA: JOINs
-- ENTREVISTA: ¿Diferencia entre INNER JOIN y LEFT JOIN?

-- INNER JOIN: solo filas con match en ambas tablas
SELECT u.name, p.title, p.created_at
FROM users u
INNER JOIN posts p ON p.user_id = u.id
WHERE u.is_active = 1;

-- LEFT JOIN: todas las filas de la izquierda + match derecho (NULL si no hay)
SELECT u.name, COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
GROUP BY u.id, u.name;

-- RIGHT JOIN: inverso del LEFT (poco usado, se reescribe como LEFT)
-- FULL OUTER JOIN: MySQL NO lo soporta nativamente
-- Simular con UNION:
SELECT u.name, p.title FROM users u LEFT JOIN posts p ON p.user_id = u.id
UNION
SELECT u.name, p.title FROM users u RIGHT JOIN posts p ON p.user_id = u.id;

-- CROSS JOIN: producto cartesiano (cuidado con performance)
-- SELECT * FROM colors CROSS JOIN sizes;

-- Self JOIN: tabla consigo misma
SELECT e.name AS empleado, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Múltiples JOINs
SELECT u.name, p.title, c.body
FROM users u
INNER JOIN posts p ON p.user_id = u.id
LEFT JOIN comments c ON c.post_id = p.id;
