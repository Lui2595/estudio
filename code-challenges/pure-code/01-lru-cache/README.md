# 01 — LRU Cache

**Languages:** TypeScript (preferred) · Python · PHP · Node.js  
**Timebox:** 45 minutes  
**Topics:** Hash map, doubly linked list / ordered map, O(1) get/put

---

## Problem

Implement an **LRU (Least Recently Used) Cache**.

```
LRUCache(capacity)
get(key) -> value or -1 if missing
put(key, value) -> void
```

Rules:

1. `capacity` ≥ 1.
2. When `put` would exceed capacity, **evict the least recently used** key.
3. Both `get` and `put` count as “using” a key (move to most-recent).
4. Updating an existing key with `put` replaces value and marks as most-recent.
5. Target: **O(1)** average time for `get` and `put`.

---

## API your code must expose

Implement a class/module named `LRUCache` with:

| Method | Behavior |
|--------|----------|
| constructor(capacity: int) | Init empty cache |
| get(key: int\|string): int\|string\|-1 | Return value or `-1` |
| put(key, value): void | Insert/update |

Then implement a `run(cases)` that executes operation lists (see cases file).

---

## Operation format

Each case has `capacity` and `ops` array:

```json
["LRUCache", 2]
["put", 1, 1]
["put", 2, 2]
["get", 1]
["put", 3, 3]
["get", 2]
["put", 4, 4]
["get", 1]
["get", 3]
["get", 4]
```

Meaning:

- First op constructs cache with capacity.
- Later ops call methods; for `get`, collect return values into `output` array.
- `put` returns nothing (do not push to output).

Expected for classic example: `[1, -1, -1, 3, 4]`

---

## Constraints

- `1 ≤ capacity ≤ 10_000`
- Up to `50_000` operations per case in stress case
- Keys/values: integers in provided cases (your impl can be generic)

---

## Acceptance criteria

- [ ] All cases in `starter/cases.json` pass
- [ ] Eviction order is truly LRU (not FIFO)
- [ ] Comment with time/space complexity
- [ ] Works in your chosen language without external libs (stdlib OK)

## Stretch

- Thread-safety note in comment: what breaks under concurrent get/put?
- Implement second version using only language built-ins (e.g. Python `OrderedDict`) and compare.

---

## How to run

```bash
# TypeScript (preferred)
npx tsx solution.ts starter/cases.json

# Node JS
node solution.js starter/cases.json

# Python
python solution.py starter/cases.json

# PHP
php solution.php starter/cases.json
```

In TypeScript, prefer `LRUCache<K, V>` with strict types — no `any`. See `../TYPESCRIPT.md`.

Print one JSON object:

```json
{ "passed": true, "results": [ ... ] }
```

or fail with `passed: false` and which case index failed.
