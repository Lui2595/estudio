# Challenge 03 — Orders Dashboard (Laravel + Next.js)

**Stack:** Laravel 10/11 API · **Next.js App Router + TypeScript** · React 18 · MySQL **or** PostgreSQL  
**Timebox:** 90 minutes  
**Level:** Senior  
**Interview fit:** Monday Laravel + React / Next.js interview

> Frontend **must** be TypeScript (`strict`). Tipa DTOs del API, props, y el fetch helper. Cero `any`.

---

## Problem

Build a **mini Orders Admin**:

1. **Laravel** exposes a secured REST API for customers, products, and orders.
2. **Next.js** consumes the API and renders:
   - Login page
   - Orders list with filters
   - Order detail
   - Create order form

Auth: **Laravel Sanctum** (token for SPA) **or** JWT package — pick one and document it.

---

## Domain model

### customers
- id, name, email (unique), created_at

### products
- id, name, sku (unique), price (decimal 10,2), stock (int), created_at

### orders
- id, customer_id (FK), status (`pending|paid|shipped|cancelled`), total (decimal), created_at

### order_items
- id, order_id (FK), product_id (FK), quantity (int), unit_price (decimal)
- unique(order_id, product_id) optional

### users (API auth)
- id, name, email, password (hashed), created_at

Relationships:

- Customer **1:N** Orders  
- Order **N:M** Products through `order_items`  
- Order **1:N** OrderItems  

---

## Laravel API requirements

### Auth
| Method | Path | Notes |
|--------|------|-------|
| POST | `/api/login` | email + password → token |
| POST | `/api/logout` | revoke token |
| GET | `/api/me` | current user |

### Resources (all protected)
| Method | Path | Notes |
|--------|------|-------|
| GET/POST | `/api/customers` | list + create |
| GET/POST | `/api/products` | list + create |
| GET | `/api/orders` | filters: `status`, `customer_id`, `from`, `to` (dates). Pagination. Include customer name **without N+1**. |
| POST | `/api/orders` | body below; transaction; recalculate total server-side |
| GET | `/api/orders/{id}` | include items + product names |
| PATCH | `/api/orders/{id}/status` | validate allowed transitions |

#### Create order body

```json
{
  "customer_id": 1,
  "items": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 3, "quantity": 1 }
  ]
}
```

Rules:

1. Validate customer exists, products exist, quantities ≥ 1.
2. Check stock; if any product lacks stock → **422**, nothing committed.
3. Create order + items in a **DB::transaction**.
4. Decrement stock.
5. `total` = sum(quantity * unit_price) using **current** product price snapshot in `order_items.unit_price`.
6. Initial status `pending`.

#### Status transitions

```
pending → paid | cancelled
paid → shipped | cancelled
shipped → (none)
cancelled → (none)
```

Invalid transition → **422**.

### Senior Laravel musts

- Form Requests for validation
- Eloquent relationships + `with()` eager loading
- API Resources (or consistent JSON transformers)
- Migrations + seeders (`DatabaseSeeder`)
- At least 2 Feature tests (create order happy path + insufficient stock)

---

## Next.js frontend requirements

### Pages
1. `/login` — email/password, store token (httpOnly cookie via Route Handler **or** memory/localStorage — document trade-off in NOTES)
2. `/orders` — table: id, customer, status, total, created_at  
   Filters: status select, search by customer name  
   Loading + empty + error states
3. `/orders/[id]` — detail + line items
4. `/orders/new` — select customer, add line items (product + qty), submit

### UI / CSS (required)

- Clean, usable layout (not Bootstrap-only dump)
- Responsive: usable at 375px and 1280px
- Clear visual hierarchy for table vs forms
- Accessible labels on inputs
- Status badges with distinct colors (`pending` yellow, `paid` blue, `shipped` green, `cancelled` gray)
- Focus styles visible on keyboard tab

You may use plain CSS modules, Tailwind, or CSS-in-JS — your choice.

### Senior frontend musts

- **TypeScript strict** — types for `Order`, `OrderItem`, `Customer`, `Product`, API error shapes
- Typed fetch helper (no `any` on JSON)
- Disable submit button while posting (prevent double submit)
- Optimistic UI optional; correct error toast/message required
- No layout shift on loading skeletons if you add them (good CWV habit)

---

## Acceptance criteria

### Backend
- [ ] Auth protects order routes
- [ ] Create order is transactional; stock correct
- [ ] Invalid status transition rejected
- [ ] Orders list has no N+1 (verify with Laravel Debugbar or query log)
- [ ] Seed data loads with `php artisan db:seed`
- [ ] ≥2 feature tests pass

### Frontend
- [ ] Login → see orders
- [ ] Filter by status works
- [ ] Create order reflects on list
- [ ] Mobile layout doesn't break table (horizontal scroll OK)
- [ ] Status badges styled

---

## How to set up & run

### Laravel

```bash
composer create-project laravel/laravel orders-api
cd orders-api
# configure .env DB (MySQL or Postgres)

composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
php artisan make:model Customer -m
php artisan make:model Product -m
php artisan make:model Order -m
php artisan make:model OrderItem -m
# ... controllers, requests, resources, seeders — you build them

php artisan serve
# http://127.0.0.1:8000
```

CORS: allow `http://localhost:3000`.

### Next.js

```bash
npx create-next-app@latest orders-web --typescript --eslint --app --src-dir --tailwind=false
cd orders-web
# Ensure tsconfig "strict": true
# set NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

npm run dev
# http://localhost:3000
```

Types you must define (examples): `Order`, `OrderStatus`, `CreateOrderPayload`, `AuthUser`.

### Seed expectation

`starter/seed_snapshot.json` shows the data shape your seeder should produce (implement seeder yourself).

---

## What interviewers look for

- Laravel structure (FormRequest, Resources, transactions)
- React/Next data fetching patterns and UX states
- SQL modeling of N:M via pivot/order_items
- Honest NOTES on Sanctum cookie vs bearer token for SPA

## Forbidden

AI completing the app. Official docs + your experience only.
