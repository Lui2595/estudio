# Challenge 02 — Async Jobs + Idempotent Payments

**Stack:** Python 3.11+ · Flask **or** Django · Redis · PostgreSQL (SQLite acceptable if Redis only)  
**Timebox:** 90 minutes  
**Level:** Senior  
**Interview fit:** EPAM Python web + senior architecture

---

## Problem

You are building a **Checkout API** for a small SaaS product.

Creating a payment must be **idempotent** (safe under client retries / double-clicks).  
After a successful payment, send a confirmation email **asynchronously** via a background worker (do not block the HTTP response).

Simulate email sending with a function that writes to a log file or DB table — no real SMTP required.

---

## Domain

### Product
| Field | Notes |
|-------|-------|
| id | PK |
| sku | unique string |
| name | string |
| price_cents | integer (store money as integer cents) |
| stock | integer ≥ 0 |

### Order
| Field | Notes |
|-------|-------|
| id | PK / UUID |
| user_email | string |
| product_id | FK |
| quantity | int ≥ 1 |
| total_cents | integer |
| status | `pending` \| `paid` \| `failed` \| `cancelled` |
| idempotency_key | unique string (from client header) |
| created_at | datetime |

### ProcessedWebhook / IdempotencyRecord (your design)
Store enough to return the **same response** for a repeated `Idempotency-Key`.

### EmailJob (or queue job payload)
| Field | Notes |
|-------|-------|
| order_id | |
| to_email | |
| status | `queued` \| `sent` \| `failed` |
| attempts | int |

---

## Required endpoints

| Method | Path | Behavior |
|--------|------|----------|
| POST | `/api/products` | Seed/create products (can be admin-open for this challenge). |
| GET | `/api/products` | List products. |
| POST | `/api/orders` | Create + pay order. **Requires header `Idempotency-Key`**. |
| GET | `/api/orders/<id>` | Fetch order status. |
| GET | `/api/orders/<id>/email-status` | Whether confirmation job was sent. |

### `POST /api/orders` business rules

Request body example:

```json
{
  "user_email": "buyer@example.com",
  "product_id": 1,
  "quantity": 2
}
```

Headers:
```
Idempotency-Key: <uuid>
Content-Type: application/json
```

Rules:

1. Missing `Idempotency-Key` → **400**.
2. Same key + same body → return **cached response** (same status + body), **do not** charge again / decrement stock again.
3. Same key + **different** body → **409 Conflict**.
4. Insufficient stock → **409** or **422**, stock unchanged.
5. On success:
   - Decrement stock **inside a DB transaction**
   - Mark order `paid`
   - Enqueue email job
   - Return **201** with order payload quickly (< blocking email)
6. Simulate payment failure randomly **OR** via `"simulate_failure": true` in body (easier to test) → order `failed`, stock unchanged, no email.

---

## Background worker

Implement **one** of:

| Option | Stack |
|--------|-------|
| A | **RQ** or **Celery** with Redis |
| B | Separate `python worker.py` polling a `jobs` table (if Redis hard) |

Worker must:

- Process email jobs
- Retry failed jobs up to 3 times
- Be idempotent itself (sending twice for same order should not create duplicate "sent" side effects — use unique constraint on `order_id` for sent emails)

---

## Senior requirements (must)

1. Idempotency key storage with unique constraint
2. Transactional stock decrement (no negative stock under concurrency — mention how you'd test; bonus if you add a simple concurrent test or note)
3. Async email (HTTP returns before email "sent")
4. Structured error responses
5. `NOTES.md` with 5–10 lines: Kafka vs Redis queue vs Celery for this use case (your opinion)
6. At least 3 tests:
   - first order succeeds
   - replay same Idempotency-Key does not double-charge
   - insufficient stock fails cleanly

---

## Acceptance criteria

- [ ] Double POST with same key creates **one** order / one stock decrement
- [ ] HTTP response does not wait for email I/O simulation > ~100ms intentionally
- [ ] Worker marks email sent; endpoint reflects status
- [ ] Failed payment does not reduce stock
- [ ] Conflict on key reuse with different payload

---

## How to set up & run

### Redis (Windows tips)

```bash
# Option: Docker
docker run -d --name redis -p 6379:6379 redis:7

# Or Memurai / WSL Redis if you already use that
```

### Postgres (optional but preferred)

```bash
docker run -d --name pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=checkout -p 5432:5432 postgres:16
```

### Python project

```bash
python -m venv .venv
.venv\Scripts\activate
pip install flask sqlalchemy psycopg2-binary redis rq celery python-dotenv pytest
# OR Django equivalents + django-rq / celery

# Terminal 1 — API
python run.py

# Terminal 2 — Worker (example RQ)
rq worker checkout
# or: celery -A app.celery worker -l info
# or: python worker.py
```

### Seed

Use `starter/products.json` and invent your seed command.

### Manual test script idea

```text
1. Create product stock=5
2. POST order qty=2 with key=K1 → 201, stock=3
3. POST same body key=K1 again → 201 same order id, stock still 3
4. POST different body key=K1 → 409
5. POST qty=10 key=K2 → stock error
6. Start worker → email-status becomes sent
```

---

## What interviewers look for

- You understand **at-least-once** delivery and why idempotency matters
- Correct transaction boundaries
- Clear separation API vs worker
- You can discuss SQS / Kafka / BullMQ equivalents even in Python world

## Forbidden

AI-written solution. Docs + your brain only.
