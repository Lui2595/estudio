# Criba — Senior Full Stack Engineer Interview Prep

> **Role:** Senior Full Stack — Node.js + React 18 + PostgreSQL + async messaging + LLM integration  
> **Interview language:** English (C1+)  
> **Location:** Remote hybrid, Guadalajara (44160), Mexico  
> **Apply:** [criba.tech interview link](https://criba.tech/interview/240a05744cdb1316cc4e35432f4a3ecd287c0bf43c1f479a7beed2a1f9257910?source=indeed)

Practice every answer **out loud** in English. Target **45–60 seconds** per technical answer. This JD is specific — they will probe depth, trade-offs, and **how you use AI responsibly**.

## Abbreviations (with meanings)

- API (Application Programming Interface)
- DB (Database)
- UI (User Interface)
- LLM (Large Language Model)
- ADR (Architecture Decision Record)
- JWT (JSON Web Token)
- OAuth (Open Authorization)
- PKCE (Proof Key for Code Exchange)
- SQS (Simple Queue Service)
- SNS (Simple Notification Service)
- DLQ (Dead Letter Queue)
- SSR (Server-Side Rendering)
- CSR (Client-Side Rendering)
- SSG (Static Site Generation)
- ISR (Incremental Static Regeneration)
- RSC (React Server Components)
- CWV (Core Web Vitals)
- LCP (Largest Contentful Paint)
- INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)
- SQL (Structured Query Language)
- NoSQL (Not Only SQL)
- ACID (Atomicity, Consistency, Isolation, Durability)
- ORM (Object-Relational Mapping)
- CDN (Content Delivery Network)
- AWS (Amazon Web Services)
- S3 (Simple Storage Service)
- RDS (Relational Database Service)
- ECS (Elastic Container Service)
- ALB (Application Load Balancer)
- IAM (Identity and Access Management)
- VPC (Virtual Private Cloud)
- TTL (Time To Live)
- PII (Personally Identifiable Information)
- RAG (Retrieval-Augmented Generation)
- MFE (Microfrontend)
- SPA (Single-Page Application)
- BFF (Backend for Frontend)
- CI/CD (Continuous Integration / Continuous Delivery)
- SLO (Service Level Objective)
- APM (Application Performance Monitoring)
- KPI (Key Performance Indicator)
- OOM (Out Of Memory)
- RFC (Request for Comments)
- IdP (Identity Provider)
- JSON (JavaScript Object Notation)
- UUID (Universally Unique Identifier)
- HMAC (Hash-based Message Authentication Code)

---

## What they are really hiring for

| They say | They mean |
|----------|-----------|
| Full stack real | You own API → DB → UI, not siloed |
| Backend sólido | NestJS/Fastify patterns, auth, async, event loop |
| Frontend alto rendimiento | React 18, RSC, CWV, not just "I know React" |
| Criterio en DB | EXPLAIN plans, pick Postgres vs Mongo vs Redis with reasons |
| IA en flujo diario | You use coding agents AND integrate LLM APIs in products |
| Documentación + mentoring | ADRs, lead by writing, review others' code |
| Senior 6+ years | Trade-offs, system design, production war stories |

---

## Your 60-second intro (memorize, customize)

"I'm a Senior Full Stack Engineer with [X] years building production systems end-to-end. On the backend I design REST and GraphQL APIs with [NestJS/Express/Fastify], JWT and OAuth flows, and async processing with [SQS/BullMQ/Kafka]. On the frontend I build React 18 apps with custom hooks, server components and Next.js where SEO and Core Web Vitals matter. I'm strong in PostgreSQL — indexes, query plans, migrations — and I pick MongoDB, DynamoDB, or Redis based on access patterns, not hype. Recently I [one concrete achievement — e.g. cut p95 latency 40%, shipped LLM-powered feature with guardrails]. I use AI coding agents daily — Claude, Copilot — but I always review, test, and own the output. I'm based in Mexico, fluent in English, and I'm looking for a role where I can design systems, document decisions, and mentor engineers."

---

## Study order (priority for this JD)

| Priority | Topic | Time |
|----------|-------|------|
| 1 | Intro + behavioral + AI workflow | 45 min |
| 2 | NestJS / Fastify + JWT / OAuth 2.0 | 60 min |
| 3 | Kafka / SQS / BullMQ + idempotency | 45 min |
| 4 | React 18 / RSC / Next.js + Core Web Vitals | 60 min |
| 5 | PostgreSQL EXPLAIN + Redis/Mongo/DynamoDB | 45 min |
| 6 | GraphQL + system design + ADRs + microfrontends | 45 min |
| 7 | Full mock (section at bottom) | 30 min |

---

# BACKEND — Node.js

## P: NestJS vs Express vs Fastify — when do you pick each?

**R:**
"**Express** — minimal, flexible, huge ecosystem; you structure everything yourself. Good for small teams or incremental APIs. **Fastify** — schema-based validation, faster JSON serialization, plugin architecture; great for high-throughput APIs when you want performance without Nest's ceremony. **NestJS** — opinionated, TypeScript-first, modules, dependency injection, decorators — similar to Spring; best for large teams, GraphQL + REST in one app, consistent patterns and testability. I'd pick NestJS when the team scales and we need structure; Fastify for performance-critical services; Express when prototyping or integrating legacy middleware."

---

## P: How do you structure a NestJS application?

**R:**
"Modules per domain — UsersModule, OrdersModule. Each has controller, service, repository/DTOs. Shared modules for auth, database, config. Guards for JWT, interceptors for logging and transform, pipes for validation with class-validator. Business logic in services, never in controllers. ConfigModule from env. TypeORM or Prisma for Postgres. Easy to test services with mocked repositories."

---

## P: JWT vs OAuth 2.0 — explain both and when to use each.

**R:**
"**JWT** — self-contained access token, stateless verification with signature, short TTL. Good for SPA/mobile calling your API — Bearer header or httpOnly cookie for refresh. **OAuth 2.0** — authorization framework — user delegates access via provider (Google, GitHub) or you act as authorization server. Flows: Authorization Code with PKCE for SPAs, Client Credentials for service-to-service. In practice: OAuth gets identity from IdP; your API issues your own JWT after validating OAuth token. Refresh token rotation, revoke list for logout."

---

## P: How do you implement OAuth 2.0 Authorization Code + PKCE for a React SPA?

**R:**
"SPA can't hold client secret — use PKCE. Frontend generates code_verifier and code_challenge, redirects to IdP with challenge. Callback with code exchanged server-side or via BFF — Backend-for-Frontend — so tokens never sit in localStorage. API sets httpOnly session or JWT. React only sees authenticated state. CORS and redirect URI whitelist strictly configured."

---

## P: How does the Node.js event loop work and how do you optimize it?

**R:**
"Single-threaded V8 plus libuv. Sync code on call stack, then microtasks — Promises — then one macrotask — setTimeout, I/O callbacks. `await` doesn't block the thread — continuation schedules as microtask. **Don't block:** no sync fs, heavy JSON.parse on huge payloads, crypto on main thread. **Optimize:** non-blocking I/O, connection pooling to Postgres, `Promise.all` for parallel I/O, worker threads for CPU work, cluster or horizontal scale for multi-core. Profile with clinic.js or APM — if event loop lag spikes, find sync work."

---

## P: Kafka vs SQS vs BullMQ — when do you use each?

**R:**
"**SQS** — managed AWS queue, at-least-once, simple, no ops — order processing, decouple API from email worker, dead-letter queue for failures. **BullMQ** — Redis-backed job queue in Node — retries, delays, priorities, dashboards — great for background jobs in same stack: image resize, report generation, scheduled tasks. **Kafka** — distributed log, high throughput, replay, multiple consumers, event sourcing — when many services need same event stream or you need retention and ordering per partition. Senior rule: SQS/BullMQ for task queues; Kafka for event streaming platform. All need **idempotent consumers** — duplicates happen."

---

## P: How do you handle async jobs with BullMQ?

**R:**
"Producer enqueues job from API — fast 202 response. Worker process separate from HTTP server — concurrency limit per queue. Retries with exponential backoff, failed jobs to failed set. Job ID for deduplication. Redis persistence configured. Graceful shutdown — finish in-flight jobs. Monitor queue depth — alert if backlog grows."

---

## P: Consumer receives duplicate messages — what do you do?

**R:**
"Design for at-least-once delivery. Idempotent handler — store processed event ID with unique constraint, skip if seen. Or business idempotency key on order/payment. Kafka: idempotent producer plus consumer offset commit after successful processing. Never assume exactly-once without design."

---

## P: REST vs GraphQL — when would you add GraphQL?

**R:**
"**REST** — resource-oriented, HTTP caching, simple clients, clear versioning. **GraphQL** — client requests exact fields, one endpoint, reduces over-fetching for mobile/complex UIs. Costs: resolver N+1 — fix with DataLoader batching, caching harder than REST, schema governance. I'd add GraphQL when multiple clients need different shapes of same data; stay REST for simple CRUD and public APIs. NestJS supports both — code-first or schema-first GraphQL with Apollo."

---

## P: GraphQL N+1 problem — how do you solve it?

**R:**
"Naive resolvers: one query per child — same as ORM N+1. **DataLoader** batches and caches loads within single request — e.g. all user IDs collected, one `WHERE id IN (...)`. Also dataloader per request scope in NestJS/Apollo. For heavy lists, pagination and field-level complexity limits."

---

# FRONTEND — React 18 / Next.js / Remix

## P: What's new in React 18 that matters in production?

**R:**
"**Concurrent rendering** — interruptible, keeps UI responsive. **Automatic batching** — multiple setStates one re-render. **useTransition** — mark updates non-urgent — keep input responsive. **useDeferredValue** — defer expensive renders. **Suspense** for data fetching boundaries — especially with RSC in Next.js. **Strict Mode** double-invoke effects in dev — catches cleanup bugs."

---

## P: Server Components (RSC) vs Client Components?

**R:**
"**Server Components** — render on server, zero client JS for that tree, fetch DB directly, no useState/useEffect/onClick. **Client Components** — `'use client'` — interactivity, hooks, browser APIs. Pattern: RSC by default for data display, client islands for forms and buttons. Reduces bundle, improves TTFB and LCP. Hydration only on client components."

---

## P: SSR vs SSG vs ISR vs CSR — when?

**R:**
"**SSR** — HTML per request — personalized/SEO, dynamic data. **SSG** — build-time HTML — marketing, docs, max CDN cache. **ISR** — static plus background revalidate — e-commerce catalog. **CSR** — SPA after load — authenticated dashboards. Next.js App Router mixes RSC + SSR + static. Remix — nested routes, loaders on server, forms with actions — great for data-heavy apps with progressive enhancement."

---

## P: What is hydration?

**R:**
"Server sends HTML; client React attaches event listeners and reconciles — makes static HTML interactive. Mismatch — server HTML ≠ client render — causes bugs and perf issues. Fix: consistent data, avoid `Date.now()` or `window` in initial server render, suppress only when intentional."

---

## P: How do you optimize Core Web Vitals?

**R:**
"**LCP** — Largest Contentful Paint: optimize hero image — WebP/AVIF, priority preload, CDN, server-render above-fold content, reduce TTFB. **INP** — Interaction to Next Paint: less JS on main thread, code split, defer non-critical scripts, useTransition for heavy updates. **CLS** — Cumulative Layout Shift: width/height on images, reserve space for ads/fonts, font-display swap. Measure field data in Search Console plus Lighthouse lab tests."

---

## P: Custom hooks — rules and example use cases?

**R:**
"Name `use*`, can call other hooks, extract reusable logic — not UI. Examples: `useAuth`, `useDebounce`, `useInfiniteScroll`, `useLocalStorage`. Rules: only call hooks at top level, not inside conditions. Keeps components thin and testable."

---

## P: State management — Context vs Zustand vs Redux vs React Query?

**R:**
"**React Query** — server/async state — cache, refetch, mutations — always for API data. **Zustand/Redux** — complex client state — wizard flows, UI prefs crossing many components. **Context** — low-frequency updates — theme, locale, auth snapshot — split contexts to avoid re-renders. Senior: don't put server data in Redux if Query handles it."

---

## P: useMemo vs useCallback vs React.memo?

**R:**
"useMemo — expensive computed value. useCallback — stable function for memoized children. React.memo — skip re-render if props shallow-equal. Profile first — don't memo everything. Fixes real perf problems: large lists, heavy charts, forms with stable callbacks."

---

# DATA — PostgreSQL / MongoDB / DynamoDB / Redis

## P: How do you read a PostgreSQL query plan (EXPLAIN ANALYZE)?

**R:**
"Run `EXPLAIN (ANALYZE, BUFFERS)` on production-like data. Red flags: **Seq Scan** on large tables — need index. **Nested Loop** with high row counts — missing index on join key. **Sort** with high cost — index might cover ORDER BY. Check **actual time** vs **rows**. **Bitmap Heap Scan** — OK with selective index. After index: re-run EXPLAIN to confirm Index Scan or Index Only Scan."

---

## P: When would you add a composite index?

**R:**
"Query filters `WHERE status = 'active' AND created_at > X ORDER BY created_at DESC` — composite `(status, created_at DESC)`. Leftmost prefix rule — index `(a,b)` helps `WHERE a` and `WHERE a AND b`, not bare `WHERE b`. Don't over-index — each index slows writes."

---

## P: PostgreSQL vs MongoDB vs DynamoDB?

**R:**
"**PostgreSQL** — default for relational data, ACID, joins, complex queries, JSONB when semi-structured. **MongoDB** — flexible schema, document embed when read together, horizontal sharding, aggregation pipeline. **DynamoDB** — AWS-native, predictable scale, single-digit ms, access pattern must be designed upfront — partition key plus sort key, GSIs for alternate queries. Pick Postgres for core business entities; Mongo for content/catalog with variable shape; DynamoDB for high-scale key-value at AWS with known access patterns."

---

## P: When do you use Redis?

**R:**
"Cache hot reads — cache-aside pattern with TTL. Session store. Rate limiting. BullMQ backend. Pub/sub for real-time. Distributed locks — carefully, with expiry. Not source of truth for durable data — always TTL and fallback to DB."

---

## P: Cache invalidation strategy?

**R:**
"TTL for acceptable staleness. Invalidate on write — delete keys or publish invalidation event. Cache-aside: app reads cache, on miss loads DB, sets cache. For user-specific data include user ID in key. Version keys on schema change — `user:123:v2`."

---

## P: N+1 in SQL and ORMs?

**R:**
"Load 100 orders, then 100 queries for customers. Fix: JOIN, or ORM `include`/`select_related`/`prefetch`. Same in GraphQL without DataLoader. Detect in logs — query count per request middleware."

---

# ARCHITECTURE — System Design / ADRs / Microfrontends / Mentoring

## P: What is an ADR (Architecture Decision Record)?

**R:**
"Short document: **Context** — problem and constraints. **Decision** — what we chose. **Consequences** — trade-offs, what we gain and sacrifice. **Status** — proposed/accepted/deprecated. Stored in repo `docs/adr/`. Example: 'We chose BullMQ over SQS because we need delayed jobs and already run Redis.' Helps onboarding and avoids relitigating decisions."

---

## P: How do you document technical decisions for the team?

**R:**
"ADRs for significant choices. README per service — how to run, env vars, architecture diagram. OpenAPI/GraphQL schema as contract. Runbooks for incidents. PR descriptions explain why not just what. Senior engineers write so others can decide without synchronous meetings."

---

## P: Microfrontends — when and how?

**R:**
"Split frontend by domain — checkout team ships checkout MFE, catalog team ships catalog. Integration: **Module Federation** — Webpack/Vite — runtime load remotes, or **iframe** for isolation, or **monorepo** with packages if teams coordinate releases. Trade-offs: independent deploy vs bundle duplication, shared design system, routing complexity, consistent auth. I'd use MFE when org scale justifies team autonomy — not for a 5-person startup."

---

## P: How do you mentor other engineers?

**R:**
"Pair on complex PRs, not lectures. Review with questions — 'what if this fails?' Share ADRs and patterns. Delegate ownership of modules with support. Safe environment to ask questions. Celebrate good tests and docs, not just speed."

---

## P: Design an order system with async notifications.

**R:**
"POST /orders — validate, idempotency key, transaction in Postgres — order plus inventory reserve. Commit, publish `OrderCreated` to SQS/Kafka. API returns 201 fast. Workers: email service, analytics, warehouse — idempotent consumers. DLQ for failures, retry with backoff. Read model can use Redis cache for order status. CloudWatch/metrics on queue lag."

---

# AI / LLM — Required for this role

## P: How do you use AI coding agents in your daily work?

**R:**
"I use Claude Code / Copilot for boilerplate, tests scaffolding, refactors, and exploring unfamiliar APIs — always in small iterations. I never merge unreviewed AI output. I run tests, lint, and read every diff. AI accelerates typing; I own architecture, security, and edge cases. For this role that's the expected bar — speed plus judgment."

---

## P: How would you integrate an LLM API into a production product?

**R:**
"**Architecture:** Backend proxy to LLM — never expose API keys in React. **Prompt:** system prompt plus user input, version prompts in code/config. **Streaming:** Server-Sent Events (SSE) or WebSocket for UX — SSE means the backend sends a stream of events (like tokens) over HTTP directly to the browser so tokens appear progressively. **Guardrails:** max tokens, timeout, input sanitization, output moderation filter, PII redaction before send. **Cost:** cache frequent queries, smaller model for simple tasks, rate limit per user. **Reliability:** fallback message on timeout, log prompts/responses without PII for debug. **Evaluation:** human review sample, automated tests on structured outputs — JSON schema validation."

---

## P: How do you evaluate and reject bad AI-generated code?

**R:**
"Red flags: no error handling, wrong SQL — injection risk, deprecated APIs, missing edge cases, hallucinated packages, over-engineering. I run tests, check security — auth, validation, secrets — compare against team patterns. If AI suggests a library we don't use, I rewrite. Reject when it violates SOLID, skips transactions, or ignores idempotency. AI is a junior pair programmer — senior still approves."

---

## P: RAG vs fine-tuning — when?

**R:**
"**RAG** — retrieve docs from vector DB, inject into prompt — good for company knowledge, changes often, cite sources. **Fine-tuning** — custom model behavior/tone, stable domain — cost and ops heavier. Most products start RAG plus good prompts; fine-tune only with clear ROI."

---

## P: Risks of LLM in production?

**R:**
"Hallucinations, prompt injection, data leakage to provider, cost spikes, latency variance, compliance. Mitigate: human-in-loop for critical actions, structured outputs, allowlist actions, audit logs, private endpoints / no training on data, budget alerts."

---

# BEHAVIORAL (English C1)

## P: Tell me about a time you improved system performance.

**R (STAR):** Slow dashboard → EXPLAIN found Seq Scan → composite index plus React Query cache → p95 2s to 400ms → documented in ADR.

---

## P: Technical disagreement with a teammate?

**R:** GraphQL vs REST for mobile — listed trade-offs — pilot GraphQL on one module — measured bundle and resolver perf — decided hybrid.

---

## P: How do you handle unclear requirements?

**R:** Clarifying questions, short RFC, assumptions listed, stakeholder sign-off before sprint commitment.

---

## P: Why Criba / this role?

**R (customize):** "Senior full stack with real system design ownership, modern React and Node stack, and AI integrated into how the team builds — matches how I already work. Opportunity to mentor and document at scale."

---

## P: Questions to ask them

- "How is the team split between product domains and shared platform?"
- "What's your current async stack — Kafka, SQS, or BullMQ?"
- "How are LLM features evaluated before release?"
- "What does the ADR / documentation culture look like?"
- "What would success look like in the first 90 days?"

---

# 30-MINUTE MOCK INTERVIEW (read aloud)

1. Tell me about yourself.  
2. NestJS vs Fastify — your preference and why?  
3. OAuth 2.0 Authorization Code flow for a SPA.  
4. Kafka vs BullMQ for background jobs.  
5. How do you optimize the Node event loop under load?  
6. Explain RSC and when you use Client Components.  
7. How do you improve LCP and INP?  
8. Walk through EXPLAIN ANALYZE on a slow query.  
9. Postgres vs DynamoDB for a new feature.  
10. What is an ADR? Give an example decision.  
11. How do you integrate an LLM API safely in production?  
12. How do you use AI coding tools without sacrificing quality?  
13. Design async order processing with notifications.  
14. How do you mentor mid-level engineers?  
15. Your questions for us?

**Pass criteria:** Each answer 45+ seconds, mentions trade-offs, at least 3 real examples from your experience.

---

# Quick reference — repo material

| JD topic | Local file |
|----------|------------|
| Express / middleware / JWT | `../express/00-preguntas-respuestas.md`, `ejemplos/node-jwt-auth.js` |
| React hooks / perf | `../react/00-preguntas-respuestas.md`, `ejemplos/react-optimization.jsx` |
| Next.js / RSC / SSR | `../react/08-nextjs/00-preguntas-respuestas.md` |
| PostgreSQL / indexes | `../postgres/00-preguntas-respuestas.md`, `ejemplos/sql-debug-slow-query.sql` |
| MongoDB / Redis | `../mongodb/`, `../postgres/05-jsonb/` |
| Idempotency / relations | `07-area-architecture-senior.md`, `ejemplos/idempotency-key-handler.js` |
| AWS SQS / S3 | `06-area-aws.md`, `ejemplos/aws-s3-presigned-upload.js` |
| Core Web Vitals | `../seo/04-tecnico/00-preguntas-respuestas.md` |
| JavaScript event loop | `../javascript/08-asincronia/00-preguntas-respuestas.md` |

---

# Day-before checklist

- [ ] Intro 60 sec memorized in English  
- [ ] One LLM integration story ready (even if side project)  
- [ ] One ADR-style decision explained aloud  
- [ ] One EXPLAIN ANALYZE example from real work  
- [ ] One async queue story — SQS, BullMQ, or Kafka  
- [ ] Microphone + quiet room tested  
- [ ] Resume matches what you say — dates, stack, senior scope  

**Salary range on posting:** $80,000 – $100,000 MXN/month + medical/life insurance, remote hybrid Guadalajara.
