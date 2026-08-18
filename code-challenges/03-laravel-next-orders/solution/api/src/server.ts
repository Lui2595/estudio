/**
 * Challenge 03 — Orders API (Express + TypeScript)
 * Mirrors the Laravel challenge contract so you can run end-to-end locally.
 * Laravel PHP reference files are in ../laravel-reference/
 *
 * Run: npm install && npx tsx src/server.ts
 */

import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { db, seed } from "./db";

const app = express();
const SECRET = "orders-dev-secret";

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

seed();

type Authed = express.Request & { userId?: number };

function auth(req: Authed, res: express.Response, next: express.NextFunction) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) return res.status(401).json({ error: "unauthorized" });
  try {
    const payload = jwt.verify(h.slice(7), SECRET) as { sub: number };
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body ?? {};
  const user = db.users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "invalid_credentials" });
  const token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: "8h" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get("/api/me", auth, (req: Authed, res) => {
  const user = db.users.find((u) => u.id === req.userId);
  res.json(user ? { id: user.id, name: user.name, email: user.email } : null);
});

app.get("/api/customers", auth, (_req, res) => res.json(db.customers));
app.post("/api/customers", auth, (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) return res.status(422).json({ error: "validation" });
  const row = { id: db.customers.length + 1, name, email };
  db.customers.push(row);
  res.status(201).json(row);
});

app.get("/api/products", auth, (_req, res) => res.json(db.products));
app.post("/api/products", auth, (req, res) => {
  const { name, sku, price, stock } = req.body ?? {};
  const row = {
    id: db.products.length + 1,
    name,
    sku,
    price: Number(price),
    stock: Number(stock),
  };
  db.products.push(row);
  res.status(201).json(row);
});

const transitions: Record<string, string[]> = {
  pending: ["paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: [],
  cancelled: [],
};

app.get("/api/orders", auth, (req, res) => {
  let rows = db.orders.map((o) => ({
    ...o,
    customer_name: db.customers.find((c) => c.id === o.customer_id)?.name,
  }));
  const { status, customer_id, from, to } = req.query;
  if (status) rows = rows.filter((o) => o.status === status);
  if (customer_id) rows = rows.filter((o) => o.customer_id === Number(customer_id));
  if (from) rows = rows.filter((o) => o.created_at >= String(from));
  if (to) rows = rows.filter((o) => o.created_at <= String(to));
  res.json({ data: rows });
});

app.post("/api/orders", auth, (req, res) => {
  const { customer_id, items } = req.body ?? {};
  const customer = db.customers.find((c) => c.id === Number(customer_id));
  if (!customer) return res.status(422).json({ error: "customer_not_found" });
  if (!Array.isArray(items) || items.length === 0) return res.status(422).json({ error: "items_required" });

  const lineItems: { product_id: number; quantity: number; unit_price: number; product_name: string }[] = [];
  let total = 0;

  for (const it of items) {
    const product = db.products.find((p) => p.id === Number(it.product_id));
    const qty = Number(it.quantity);
    if (!product || qty < 1) return res.status(422).json({ error: "invalid_item" });
    if (product.stock < qty) return res.status(422).json({ error: "insufficient_stock", sku: product.sku });
    lineItems.push({
      product_id: product.id,
      quantity: qty,
      unit_price: product.price,
      product_name: product.name,
    });
    total += product.price * qty;
  }

  // transactional-ish in-memory
  for (const li of lineItems) {
    const p = db.products.find((x) => x.id === li.product_id)!;
    p.stock -= li.quantity;
  }

  const order = {
    id: db.orders.length + 1,
    customer_id: customer.id,
    status: "pending" as const,
    total: Number(total.toFixed(2)),
    created_at: new Date().toISOString(),
    items: lineItems,
  };
  db.orders.push(order);
  res.status(201).json(order);
});

app.get("/api/orders/:id", auth, (req, res) => {
  const order = db.orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: "not_found" });
  const customer = db.customers.find((c) => c.id === order.customer_id);
  res.json({ ...order, customer });
});

app.patch("/api/orders/:id/status", auth, (req, res) => {
  const order = db.orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: "not_found" });
  const next = req.body?.status as string;
  if (!(transitions[order.status] ?? []).includes(next)) {
    return res.status(422).json({ error: "invalid_transition", from: order.status, to: next });
  }
  order.status = next as typeof order.status;
  res.json(order);
});

app.listen(8000, () => console.log("Orders API on http://127.0.0.1:8000"));
