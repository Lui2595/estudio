-- TEMA: Índices en PostgreSQL
-- ENTREVISTA: ¿Qué es un índice parcial?

-- B-Tree (default, igual que MySQL)
CREATE INDEX idx_users_email ON users (email);

-- Índice parcial: solo indexa filas que cumplen condición
CREATE INDEX idx_active_users_email ON users (email)
WHERE is_active = true;
-- Más pequeño y rápido si siempre filtras por is_active = true

-- Índice compuesto
CREATE INDEX idx_posts_user_created ON posts (user_id, created_at DESC);

-- GIN: ideal para JSONB, arrays, full-text
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);
CREATE INDEX idx_products_tags ON products USING GIN (tags);

-- GiST: geometría, rangos, full-text alternativo
-- CREATE INDEX idx_locations ON places USING GIST (location);

-- Full-Text Search nativo
ALTER TABLE posts ADD COLUMN search_vector tsvector;

UPDATE posts SET search_vector =
    to_tsvector('spanish', coalesce(title, '') || ' ' || coalesce(body, ''));

CREATE INDEX idx_posts_fts ON posts USING GIN (search_vector);

SELECT title FROM posts
WHERE search_vector @@ to_tsquery('spanish', 'laravel & react');

-- EXPLAIN ANALYZE (ejecuta la query y muestra tiempos)
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM posts WHERE user_id = 1 ORDER BY created_at DESC LIMIT 20;

-- Seq Scan vs Index Scan vs Bitmap Index Scan
