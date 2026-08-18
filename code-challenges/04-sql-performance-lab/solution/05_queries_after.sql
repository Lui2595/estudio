-- B6 rewritten: sargable range instead of YEAR(ordered_at)
-- MySQL
EXPLAIN
SELECT * FROM orders
WHERE ordered_at >= '2026-01-01'
  AND ordered_at < '2027-01-01'
  AND status = 'paid'
ORDER BY ordered_at DESC
LIMIT 50;

-- Postgres:
-- EXPLAIN ANALYZE
-- SELECT * FROM orders
-- WHERE ordered_at >= '2026-01-01'
--   AND ordered_at < '2027-01-01'
--   AND status = 'paid'
-- ORDER BY ordered_at DESC
-- LIMIT 50;

-- Re-run B2 with indexes present
EXPLAIN
SELECT
    p.sku,
    p.name,
    SUM(oi.qty * oi.unit_price) AS revenue
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE o.status = 'paid'
GROUP BY p.id, p.sku, p.name
ORDER BY revenue DESC
LIMIT 5;
