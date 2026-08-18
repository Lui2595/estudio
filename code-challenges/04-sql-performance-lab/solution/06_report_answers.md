# Challenge 04 — Report answers (solution study)

## EXPLAIN notes (what you should see)

### B6 before
`WHERE YEAR(ordered_at) = 2026` wraps the column → planner usually **cannot use** `ordered_at` index (function on column) → Seq Scan / full scan + filesort.

### B6 after
Range:
```sql
ordered_at >= '2026-01-01' AND ordered_at < '2027-01-01' AND status = 'paid'
```
With `INDEX (status, ordered_at DESC)` → Index Range Scan / Index Scan, less rows examined.

### B2
Join `order_items → orders (status=paid) → products`. Indexes on `orders.status` and FKs reduce nested-loop cost. Still may aggregate with temp table; that’s OK at small scale.

---

## Trade-off answers

### When MySQL vs PostgreSQL?
- **PostgreSQL**: complex analytics, JSONB, window functions maturity, stricter SQL, richer indexes (GIN/GiST/partial).
- **MySQL**: simple OLTP, broad hosting, replication ecosystem many teams already know.
- Default for new serious apps often **Postgres**; MySQL fine if stack/team already there.

### When Redis vs SQL for this dashboard?
- **SQL**: source of truth for orders/payments/revenue (ACID, joins, reporting).
- **Redis**: cache hot aggregates (top products), rate limits, sessions — with TTL + invalidate on write. Not the ledger of money.

### N+1 and ORM fix for B3
N+1 = 1 query for orders + N for items/products.  
Eloquent: `Order::with(['customer', 'items.product'])->...`  
Django: `select_related` / `prefetch_related`.  
Or one SQL join like B3.

### DELETE vs soft-delete for orders
- **Hard DELETE**: remove row; use carefully with FKs (RESTRICT vs CASCADE).
- **Soft-delete** (`deleted_at`): keep audit/history, filter in queries; unique constraints need partial unique where not deleted. Payments/legal often prefer soft or never delete.

### Partial / filtered index (Postgres)
```sql
CREATE INDEX idx_products_active_sku ON products (sku) WHERE active = TRUE;
```
Smaller index, only rows you query most. MySQL 8 has functional indexes; filtered indexes are a Postgres strength.

---

## Verbal answers (interview)

1. **Slow query prod:** request_id → APM (DB vs app) → `EXPLAIN ANALYZE` → missing index / N+1 / bad ORM → fix → deploy → watch p95.
2. **Composite index order:** equality filters first, then range/sort columns (`status`, then `ordered_at`).
3. **OFFSET vs cursor:** OFFSET slow on deep pages; cursor `WHERE ordered_at < :last` stable and fast.
