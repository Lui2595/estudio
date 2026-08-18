-- Indexes after diagnosing Seq Scans / filesorts

-- Orders filtered by status + sorted by date (B6 rewrite)
CREATE INDEX idx_orders_status_ordered_at ON orders (status, ordered_at DESC);

-- FK / join helpers
CREATE INDEX idx_orders_customer_id ON orders (customer_id);
CREATE INDEX idx_order_items_order_id ON order_items (order_id);
CREATE INDEX idx_order_items_product_id ON order_items (product_id);

-- Revenue by product on paid orders (helps B2 depending on planner)
CREATE INDEX idx_orders_status ON orders (status);

-- Postgres partial index example (active products only)
-- CREATE INDEX idx_products_active_sku ON products (sku) WHERE active = TRUE;
