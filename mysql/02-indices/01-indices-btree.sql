-- TEMA: Índices
-- ENTREVISTA: ¿Cuándo un índice NO ayuda o empeora el rendimiento?

-- B-Tree (default): =, >, <, BETWEEN, LIKE 'prefix%'
CREATE INDEX idx_users_email ON users (email);

-- Índice compuesto: orden importa (leftmost prefix rule)
CREATE INDEX idx_posts_user_status ON posts (user_id, status, created_at);

-- Este índice sirve para:
--   WHERE user_id = ?
--   WHERE user_id = ? AND status = ?
--   WHERE user_id = ? AND status = ? ORDER BY created_at
-- NO sirve para: WHERE status = ? (sin user_id)

-- UNIQUE INDEX
CREATE UNIQUE INDEX idx_users_email_unique ON users (email);

-- FULLTEXT (búsqueda de texto)
CREATE FULLTEXT INDEX idx_posts_search ON posts (title, body);
SELECT * FROM posts
WHERE MATCH(title, body) AGAINST('laravel react' IN NATURAL LANGUAGE MODE);

-- Covering index: incluye todas las columnas del SELECT (MySQL 8+)
CREATE INDEX idx_posts_covering ON posts (user_id, status, created_at, title);

-- Cuándo NO indexar:
-- - Tablas pequeñas
-- - Columnas con baja cardinalidad (ej: gender con 2 valores)
-- - Tablas con muchos INSERT/UPDATE (overhead de mantener índice)
-- - LIKE '%suffix' (no usa índice B-Tree)

-- Ver uso de índices
-- EXPLAIN SELECT ... (ver carpeta 04-performance)
