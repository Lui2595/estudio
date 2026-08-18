-- TEMA: CRUD y tipos de datos PostgreSQL
-- ENTREVISTA: ¿Ventajas de PostgreSQL sobre MySQL?

-- Tipos nativos potentes
CREATE TABLE products (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    price       NUMERIC(10, 2) NOT NULL,
    metadata    JSONB,                    -- JSON binario indexable
    tags        TEXT[],                   -- Array nativo
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- INSERT con RETURNING (MySQL no lo tiene nativamente)
INSERT INTO products (name, price, tags)
VALUES ('Laptop', 999.99, ARRAY['tech', 'hardware'])
RETURNING id, created_at;

-- UPDATE con RETURNING
UPDATE products
SET price = 899.99
WHERE id = 1
RETURNING *;

-- DELETE con RETURNING
DELETE FROM products WHERE is_active = false RETURNING id, name;

-- UPSERT (INSERT ON CONFLICT) — muy usado en Laravel con PostgreSQL
INSERT INTO products (id, name, price)
VALUES (1, 'Laptop Pro', 1299.99)
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name,
    price = EXCLUDED.price;

-- JSONB queries
SELECT * FROM products WHERE metadata @> '{"brand": "Dell"}';
SELECT metadata->>'brand' AS brand FROM products;
