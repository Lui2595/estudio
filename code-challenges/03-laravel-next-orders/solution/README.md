# Challenge 03 — Solution

## Runnable stack (Express API + notes for Laravel)

The full Laravel scaffold is heavy to generate here. You get:

1. **`api/`** — Express + TypeScript API with the **same routes/contract** as the challenge (auth JWT, customers, products, orders + stock + status transitions).
2. **`laravel-reference/`** — PHP snippets showing the Laravel-idiomatic transaction / eager-load approach to paste into a real Laravel app.
3. Use any simple React/Next client against `http://127.0.0.1:8000` (login: `admin@orders.test` / `Password1!`).

### Run API

```bash
cd solution/api
npm install
npm run dev
```

### Minimal curl

```bash
curl -X POST http://127.0.0.1:8000/api/login -H "Content-Type: application/json" -d "{\"email\":\"admin@orders.test\",\"password\":\"Password1!\"}"
```

### Laravel path (manual)

```bash
composer create-project laravel/laravel orders-api
# add Sanctum, copy patterns from laravel-reference/OrderController.php
# migrations for customers, products, orders, order_items
```

### NOTES — Sanctum cookie vs Bearer

For SPA on another origin, Bearer token (memory) is simpler in interviews. httpOnly cookie + Sanctum SPA needs CSRF + same-site domain setup — better for production same-site apps.
