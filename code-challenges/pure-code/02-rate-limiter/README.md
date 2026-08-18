# 02 — Sliding Window Rate Limiter

**Languages:** TypeScript (preferred) · Python · PHP · Node.js  
**Timebox:** 40 minutes  
**Topics:** Timestamps, queue/deque, window counting

---

## Problem

Implement a **RateLimiter** that allows at most `maxRequests` from a given `clientId` within any sliding window of `windowMs` milliseconds.

```
RateLimiter(maxRequests, windowMs)
allow(clientId, timestampMs) -> true | false
```

Rules:

1. `allow` returns `true` if the request is accepted, `false` if rate-limited.
2. Only **accepted** requests consume quota (rejected ones do not count).
3. Window is **sliding**: at time `t`, count accepted requests in `(t - windowMs, t]` (inclusive end).
4. Different `clientId`s are independent.
5. Timestamps are provided explicitly (do not use system clock) so tests are deterministic.
6. Timestamps for a client arrive **non-decreasing** (monotonic per client).

---

## Example

`maxRequests = 3`, `windowMs = 1000`

| client | t | result | reason |
|--------|---|--------|--------|
| a | 0 | true | 1/3 |
| a | 100 | true | 2/3 |
| a | 200 | true | 3/3 |
| a | 300 | false | still 3 in window; reject does **not** consume |
| a | 1000 | true | ts=0 drops out → 2 in window → accept |
| a | 1001 | false | now 3 again (100,200,1000) |

**Contract (required):** count accepted requests with timestamp `ts` where  
`t - windowMs < ts ≤ t`.

Use `starter/cases.json` as source of truth.

---

## Acceptance criteria

- [ ] All `starter/cases.json` pass
- [ ] O(n) per allow with amortized cleanup (deque), not O(n²) rescans without cleanup
- [ ] Comment: how you’d distribute this with Redis (INCR + EXPIRE or sorted set) — 5 lines max
- [ ] No external libs

---

## How to run

Same pattern as challenge 01:

```bash
npx tsx solution.ts starter/cases.json
node solution.js starter/cases.json
python solution.py starter/cases.json
php solution.php starter/cases.json
```

TypeScript: tipa `allow(clientId: string, timestampMs: number): boolean`. See `../TYPESCRIPT.md`.

Ops format:

```json
["RateLimiter", 3, 1000]
["allow", "a", 0]
["allow", "a", 100]
...
```

Collect boolean results for each `allow`.
