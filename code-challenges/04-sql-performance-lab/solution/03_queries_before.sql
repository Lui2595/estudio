-- B1 Customer order summary (include zero-order customers)
SELECT
    c.id,
    c.name,
    c.email,
    COUNT(o.id) AS total_orders,
    COALESCE(SUM(CASE WHEN o.status = 'paid' THEN o.total ELSE 0 END), 0) AS total_spent_paid,
    MAX(o.ordered_at) AS last_order_at
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name, c.email
ORDER BY c.id;

-- B2 Top 5 products by revenue (paid orders only)
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

-- B3 Orders with line items last 30 days (single query — avoid N+1 in app)
SELECT
    o.id AS order_id,
    c.email AS customer_email,
    p.sku,
    oi.qty
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
WHERE o.ordered_at >= CURRENT_TIMESTAMP - INTERVAL 30 DAY  -- MySQL
-- Postgres: WHERE o.ordered_at >= NOW() - INTERVAL '30 days'
ORDER BY o.ordered_at DESC, o.id, p.sku;

-- B4 Potential duplicates (case-insensitive email OR same name+country)
SELECT LOWER(email) AS email_norm, COUNT(*) AS cnt
FROM customers
GROUP BY LOWER(email)
HAVING COUNT(*) > 1;

SELECT name, country_code, COUNT(*) AS cnt
FROM customers
GROUP BY name, country_code
HAVING COUNT(*) > 1;

-- B5 Running total per customer (MySQL 8 / Postgres window)
SELECT
    o.customer_id,
    o.id AS order_id,
    o.ordered_at,
    o.total,
    SUM(o.total) OVER (
        PARTITION BY o.customer_id
        ORDER BY o.ordered_at, o.id
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders o
ORDER BY o.customer_id, o.ordered_at, o.id;

-- B6 Anti-pattern (hard for index): YEAR(ordered_at) = 2026
EXPLAIN
SELECT * FROM orders
WHERE YEAR(ordered_at) = 2026
  AND status = 'paid'
ORDER BY ordered_at DESC
LIMIT 50;
-- Postgres: EXPLAIN ANALYZE SELECT ... WHERE EXTRACT(YEAR FROM ordered_at) = 2026 ...
