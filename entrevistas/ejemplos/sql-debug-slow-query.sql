-- ENTREVISTA VOZ: "A query is slow — how do you debug and fix it?"
--
-- Responde en voz (inglés):
-- 1. EXPLAIN ANALYZE to see plan
-- 2. Look for Seq Scan on large tables
-- 3. Add index matching WHERE + ORDER BY
-- 4. Fix N+1 in application layer

-- Tabla ejemplo
CREATE TABLE orders (
    id          SERIAL PRIMARY KEY,
    user_id     INT NOT NULL,
    status      VARCHAR(20) NOT NULL,
    total       DECIMAL(10,2),
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100),
    email VARCHAR(255)
);

-- ❌ Query lenta sin índice (full table scan)
-- SELECT * FROM orders WHERE user_id = 42 AND status = 'pending' ORDER BY created_at DESC;

-- Paso 1: EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT o.id, o.total, u.name
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE o.user_id = 42
  AND o.status = 'pending'
ORDER BY o.created_at DESC
LIMIT 20;

-- Buscar en output:
--   Seq Scan on orders  → necesitas índice
--   Index Scan          → índice funcionando
--   Nested Loop + muchas filas → revisar JOIN

-- Paso 2: Índice compuesto (filter columns first, then sort column)
CREATE INDEX idx_orders_user_status_created
ON orders (user_id, status, created_at DESC);

-- Paso 3: N+1 en app — malo:
--   orders = SELECT * FROM orders WHERE user_id = 42
--   for each order: SELECT * FROM users WHERE id = order.user_id

-- ✅ Una query con JOIN (o eager load en ORM)

-- Paso 4: Paginación — nunca OFFSET 100000 en prod
-- Mejor: cursor-based pagination
-- WHERE created_at < :last_seen ORDER BY created_at DESC LIMIT 20

-- ENTREVISTA: ¿Cuándo un índice NO ayuda?
-- - Tabla muy pequeña (seq scan más barato)
-- - Columna con baja cardinalidad (ej. boolean is_active)
-- - Función en columna sin índice funcional: WHERE LOWER(email) = ...
