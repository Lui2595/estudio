-- TEMA: JSONB avanzado
-- PostgreSQL es superior a MySQL para JSON indexado y consultas.

CREATE TABLE events (
    id         BIGSERIAL PRIMARY KEY,
    type       VARCHAR(50) NOT NULL,
    payload    JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO events (type, payload) VALUES
('purchase', '{"user_id": 1, "amount": 99.99, "items": [{"sku": "A1", "qty": 2}]}'),
('signup',   '{"user_id": 2, "source": "google", "plan": "free"}');

-- Operadores JSONB
SELECT * FROM events WHERE payload->>'type' = 'purchase';           -- texto
SELECT * FROM events WHERE payload @> '{"user_id": 1}';             -- contiene
SELECT * FROM events WHERE payload ? 'plan';                        -- key existe
SELECT * FROM events WHERE payload->'items' @> '[{"sku": "A1"}]';  -- array contiene

-- Índice GIN para JSONB
CREATE INDEX idx_events_payload ON events USING GIN (payload);

-- jsonb_set: actualizar campo anidado
UPDATE events
SET payload = jsonb_set(payload, '{plan}', '"pro"')
WHERE payload->>'user_id' = '2';

-- Agregación sobre JSON
SELECT
    payload->>'source' AS source,
    COUNT(*) AS signups
FROM events
WHERE type = 'signup'
GROUP BY payload->>'source';

-- Laravel: cast 'payload' => 'array' o 'object' en Eloquent
-- Migración: $table->jsonb('payload');
