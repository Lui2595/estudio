/**
 * VOICE INTERVIEW: "How do you implement idempotency for payment or order creation?"
 *
 * Say out loud:
 * - Client sends Idempotency-Key header (UUID)
 * - Server checks store before processing
 * - Same key → return cached response, no double charge
 * - Unique constraint prevents race on concurrent retries
 */

const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
app.use(express.json());

// In production: Redis with TTL or DB table idempotency_keys
const idempotencyStore = new Map();

/**
 * @param {number} ttlMs - how long to remember keys (e.g. 24h)
 */
function idempotencyMiddleware(ttlMs = 24 * 60 * 60 * 1000) {
  return async (req, res, next) => {
    const key = req.headers['idempotency-key'];

    if (!key) {
      return res.status(400).json({
        error: 'Idempotency-Key header required for this endpoint',
      });
    }

    const cacheKey = `${req.method}:${req.path}:${key}`;
    const cached = idempotencyStore.get(cacheKey);

    if (cached) {
      // Duplicate request — return same response without re-processing
      return res.status(cached.status).json(cached.body);
    }

    // Wrap res.json to capture response for storage
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      idempotencyStore.set(cacheKey, { status: res.statusCode, body });
      setTimeout(() => idempotencyStore.delete(cacheKey), ttlMs);
      return originalJson(body);
    };

    next();
  };
}

// --- Example: create order (POST is NOT idempotent without this) ---
app.post(
  '/api/orders',
  idempotencyMiddleware(),
  async (req, res) => {
    const { productId, quantity } = req.body;

    // Business logic — only runs once per idempotency key
    const order = {
      id: randomUUID(),
      productId,
      quantity,
      status: 'created',
      createdAt: new Date().toISOString(),
    };

    // await db.orders.insert(order);
    // await paymentService.charge(...);

    res.status(201).json(order);
  }
);

/**
 * VOICE INTERVIEW: "What about webhook idempotency?"
 *
 * Store provider event ID with UNIQUE constraint:
 *
 *   INSERT INTO processed_webhooks (event_id, payload, processed_at)
 *   VALUES ($1, $2, NOW())
 *   ON CONFLICT (event_id) DO NOTHING
 *   RETURNING event_id;
 *
 * If no row returned → already processed → return 200 without side effects
 */

module.exports = { idempotencyMiddleware };
