# Challenge 04 — SQL Performance Lab (MySQL + PostgreSQL)

**Stack:** MySQL 8 **and** PostgreSQL 14+ (do both dialects where noted)  
**Timebox:** 60 minutes  
**Level:** Senior  
**Interview fit:** EPAM + Monday (Laravel/React often asks SQL verbally or in a live editor)

> No application code required. Write SQL files and run them in your client (Workbench, DBeaver, psql, mysql CLI).

---

## Problem

You inherit a messy analytics schema for an e-commerce company.  
Your job: **model relationships correctly**, fix slow queries, and prove improvements with `EXPLAIN` / `EXPLAIN ANALYZE`.

There is **no solution file**. You create:

```
sql/
  01_schema_mysql.sql
  01_schema_postgres.sql
  02_seed.sql          # can be shared if types align
  03_queries_before.sql
  04_indexes.sql
  05_queries_after.sql
  06_report_answers.md # your written answers
```

---

## Part A — Schema & relationships (20 min)

Create tables for:

1. `customers` (id, name, email unique, country_code char(2), created_at)
2. `products` (id, sku unique, name, category, price decimal, active boolean)
3. `orders` (id, customer_id FK, status, ordered_at, total)
4. `order_items` (id, order_id FK, product_id FK, qty, unit_price)
5. `payments` (id, order_id FK **1:1** with orders paid, amount, method, paid_at)

Constraints you must include:

- FK with sensible `ON DELETE` (document choice: RESTRICT vs CASCADE)
- Check: `qty > 0`, `price >= 0`
- Composite uniqueness: one payment per order (`UNIQUE(order_id)` on payments)
- Indexes: you decide in Part C — **not** yet in Part A except PKs/uniques

Seed at least:

- 5 customers
- 10 products across ≥3 categories
- 30 orders with 1–4 items each
- ~20 payments (some orders unpaid)

Use `starter/schema_sketch.md` as a hint for columns only.

---

## Part B — Queries you must write (20 min)

Write SQL for:

### B1 — Customer order summary
For each customer: total orders, total spent (sum of paid order totals), last order date.  
Include customers with **zero** orders (LEFT JOIN).

### B2 — Top 5 products by revenue
Revenue = sum(qty * unit_price) for items belonging to **paid** orders only.

### B3 — Orders with all line items (report query)
Return order id, customer email, product sku, qty — for last 30 days.  
This is the classic **N+1 bait** if done in app code; here do it in **one SQL**.

### B4 — Find potential duplicates
Customers with same email ignoring case **or** same name+country. (Postgres: `LOWER(email)`; MySQL: same.)

### B5 — Running total (window function)
For each customer, list their orders ordered by date with a running sum of `total`.  
**PostgreSQL required.** MySQL 8 window functions OK too if you know them.

### B6 — Slow query to optimize
Given this anti-pattern (recreate intentionally):

```sql
SELECT * FROM orders
WHERE YEAR(ordered_at) = 2026
  AND status = 'paid'
ORDER BY ordered_at DESC
LIMIT 50;
```

Explain why it may not use an index well, then rewrite + index for both engines.

---

## Part C — Performance (20 min)

1. Run `EXPLAIN` (MySQL) and `EXPLAIN ANALYZE` (Postgres) on B2 and B6 **before** indexes.
2. Add indexes (write `04_indexes.sql`).
3. Re-run explain plans; paste summarized results into `06_report_answers.md`.
4. Answer in writing (short paragraphs):

| Question | Your answer in report |
|----------|----------------------|
| When choose MySQL vs PostgreSQL? | |
| When Redis vs SQL for this dashboard? | |
| What is N+1 and how would Eloquent/Django ORM fix B3? | |
| Difference BETWEEN DELETE and soft-delete for orders? | |
| Partial / filtered index use case? | Postgres example |

---

## Acceptance criteria

- [ ] Schema runs on MySQL and Postgres (separate files OK)
- [ ] FKs + 1:1 payments uniqueness work
- [ ] All B1–B6 queries return sensible results on your seed
- [ ] Before/after explain notes exist
- [ ] Written trade-off answers completed

---

## How to run

### MySQL

```bash
mysql -u root -p -e "CREATE DATABASE shop_lab;"
mysql -u root -p shop_lab < sql/01_schema_mysql.sql
mysql -u root -p shop_lab < sql/02_seed.sql
mysql -u root -p shop_lab < sql/03_queries_before.sql
```

### PostgreSQL

```bash
psql -U postgres -c "CREATE DATABASE shop_lab;"
psql -U postgres -d shop_lab -f sql/01_schema_postgres.sql
psql -U postgres -d shop_lab -f sql/02_seed.sql
psql -U postgres -d shop_lab -c "EXPLAIN ANALYZE <paste query>;"
```

### Docker quick start

```bash
docker run -d --name mysql8 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shop_lab -p 3306:3306 mysql:8
docker run -d --name pg16 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=shop_lab -p 5432:5432 postgres:16
```

---

## Interview simulation (speak aloud, 3 min)

After writing SQL, practice answering verbally:

1. "How do you diagnose a slow query in production?"
2. "Composite index column order — how do you choose?"
3. "OFFSET pagination vs cursor pagination?"

## Forbidden

Asking AI to write the queries for you. Engine docs + practice only.
