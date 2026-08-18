# Schema sketch (columns only — you write real DDL)

> Not runnable. Implement proper types/constraints yourself in MySQL + Postgres.

## customers
- id
- name
- email (unique)
- country_code (CHAR 2)
- created_at

## products
- id
- sku (unique)
- name
- category
- price
- active
- created_at

## orders
- id
- customer_id → customers
- status: pending | paid | shipped | cancelled
- ordered_at
- total

## order_items
- id
- order_id → orders
- product_id → products
- qty
- unit_price

## payments
- id
- order_id → orders (1:1)
- amount
- method: card | transfer | cash
- paid_at

## Relationship reminder

```
customers 1───N orders 1───N order_items N───1 products
orders    1───1 payments (only when paid)
```
