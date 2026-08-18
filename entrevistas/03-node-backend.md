# Area 3 — Node.js / Express Backend

> If your stack is Node + React. Answers: 30–45 sec.

## Abbreviations (with meanings)

- JWT (JSON Web Token)
- CSRF (Cross-Site Request Forgery)
- API (Application Programming Interface)
- HTTP (Hypertext Transfer Protocol)
- TTL (Time To Live)
- OOM (Out Of Memory)
- CPU (Central Processing Unit)
- I/O (Input/Output)

---

## P: How does the Express middleware pipeline work?

**R:**
"Chain of functions — req, res, next. Modify req/res, end response, or next(). Order matters — body parser before routes, error handler last with (err, req, res, next)."

---

## P: Why don't async errors reach error middleware by default?

**R:**
"Express 4 doesn't catch rejected promises in async handlers. Request hangs. Fix: try/catch plus next(err), express-async-errors, or asyncHandler wrapper."

---

## P: JWT in header vs httpOnly cookie?

**R:**
"Bearer header: easy for SPA, XSS risk if localStorage. httpOnly cookie: not readable by JS, needs CSRF protection. Pattern: short access in memory, refresh in httpOnly cookie with rotation."

---

## P: How do you implement refresh tokens?

**R:**
"Access 15 min. Refresh 7 days in httpOnly secure cookie or DB with rotation. On 401, POST /refresh, issue new pair, invalidate old refresh. Revoke on logout."

---

## P: How do you structure a large Express app?

**R:**
"routes → controllers → services → repositories. express.Router per resource. Business logic never in route handlers — testable services."

---

## P: PUT vs PATCH?

**R:**
"PUT full replace. PATCH partial update. PATCH common for forms."

---

## P: How do you secure a production API?

**R:**
"helmet, CORS whitelist, rate limiting, zod/joi validation, parameterized queries, HTTPS, secrets in env/Secrets Manager, least privilege DB user."

---

## P: Rate limiting?

**R:**
"express-rate-limit or Redis for distributed. Per IP or API key. 429 plus Retry-After. Stricter on auth endpoints."

---

## P: Node.js event loop?

**R:**
"Single-threaded JS, libuv for I/O. Sync first, then microtasks (Promises), then macrotasks. await doesn't block thread. CPU work → worker threads or queue."

---

## P: Child processes / Worker threads?

**R:**
"Worker threads for CPU-bound same process. child_process for isolation or CLI. Don't block event loop with sync crypto or huge JSON parse."

---

## P: Memory leaks in Node?

**R:**
"Heap snapshots over time. Causes: growing globals, forgotten listeners, unbounded caches. Fix: cleanup on shutdown, TTL on cache, remove listeners."

---

## P: REST API versioning?

**R:**
"/api/v1 prefix clearest. Deprecate v1 with timeline. Both versions during migration."

---

## P: Test Express endpoints?

**R:**
"Supertest without binding port. Mock DB or test database. Unit test services. Test 400 validation, 401 auth, 201 happy path."

---

## Voice scenarios

**P: MongoDB query slow.**

**R:**
"explain() — COLLSCAN means missing index. Compound index on filter plus sort. Pagination cursor-based for deep pages. $match early in aggregation."

---

**P: File uploads at scale?**

**R:**
"Presigned S3 URLs — client uploads direct, API stores metadata. Stream large files. Validate MIME/size server-side. Async processing via SQS if conversion needed."

---

**P: Circular dependency in Node modules?**

**R:**
"A requires B, B requires A — partial exports. Extract shared module, lazy require, or dependency injection."

---

## More material

→ `../express/00-preguntas-respuestas.md`  
→ `ejemplos/node-jwt-auth.js`  
→ `ejemplos/idempotency-key-handler.js`
