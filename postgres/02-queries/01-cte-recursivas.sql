-- TEMA: CTEs (Common Table Expressions)
-- ENTREVISTA: ¿Para qué usar WITH en lugar de subqueries?

-- CTE simple: legibilidad
WITH active_users AS (
    SELECT id, name, email
    FROM users
    WHERE is_active = true
),
recent_posts AS (
    SELECT user_id, COUNT(*) AS post_count
    FROM posts
    WHERE created_at > NOW() - INTERVAL '30 days'
    GROUP BY user_id
)
SELECT u.name, u.email, COALESCE(rp.post_count, 0) AS posts_last_30d
FROM active_users u
LEFT JOIN recent_posts rp ON rp.user_id = u.id;

-- CTE recursiva: jerarquías (árbol de categorías, org chart)
WITH RECURSIVE category_tree AS (
    -- Caso base: raíces
    SELECT id, name, parent_id, 0 AS depth
    FROM categories
    WHERE parent_id IS NULL

    UNION ALL

    -- Caso recursivo
    SELECT c.id, c.name, c.parent_id, ct.depth + 1
    FROM categories c
    INNER JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY depth, name;

-- MySQL 8+ también soporta CTEs, pero PostgreSQL las domina desde hace más tiempo
