# 03 — Dependency Resolver (Package Install Order)

**Languages:** TypeScript (preferred) · Python · PHP · Node.js  
**Timebox:** 50 minutes  
**Topics:** Directed graph, topological sort, cycle detection

---

## Problem

Given packages and their dependencies, return a valid **install order**.

If there is a **cycle**, return an error indicator (see output contract).

```
resolve(packages) -> string[]  // install order
```

Input: list of packages:

```json
[
  { "name": "app", "deps": ["api", "ui"] },
  { "name": "api", "deps": ["db"] },
  { "name": "ui", "deps": ["api"] },
  { "name": "db", "deps": [] }
]
```

One valid order: `["db", "api", "ui", "app"]`  
(deps must appear **before** the package)

Rules:

1. All dependency names appear as packages in the list (or treat missing dep as error — cases only use declared packages).
2. If multiple orders are valid, **any** valid topological order is accepted IF it satisfies all precedence constraints (tests check constraints, not unique order).
3. Detect cycles → output `{ "ok": false, "error": "cycle" }`.
4. Empty input → `{ "ok": true, "order": [] }`.

---

## Output contract per case

Success:

```json
{ "ok": true, "order": ["db", "api", "ui", "app"] }
```

Cycle:

```json
{ "ok": false, "error": "cycle" }
```

Your runner should verify success orders with:

```
for each package P:
  for each dep D of P:
    index(D) < index(P)
```

and that `order` is a permutation of all package names.

---

## Acceptance criteria

- [ ] All cases pass (including cycles)
- [ ] Kahn’s algorithm **or** DFS topo — name which in comment
- [ ] O(V+E) time
- [ ] No external graph libraries

## Stretch

- Return **all** packages that participate in any cycle (harder)
- Stable sort: among ready nodes, pick lexicographically smallest (deterministic)

Deterministic mode is used in some cases (`mode: "lex"`).

---

## How to run

```bash
npx tsx solution.ts starter/cases.json
node solution.js starter/cases.json
python solution.py starter/cases.json
php solution.php starter/cases.json
```

TypeScript: `type ResolveResult = { ok: true; order: string[] } | { ok: false; error: "cycle" }`. See `../TYPESCRIPT.md`.
