"""
Dependency Resolver — Kahn’s topological sort (Python)

mode "lex": ready queue siempre saca el nombre lexicográficamente menor (heapq).
Cycle: si len(order) < V al terminar → cycle.

Complejidad: O((V+E) log V) con lex (heap); O(V+E) sin lex.
"""

from __future__ import annotations

import json
import sys
from collections import defaultdict
from heapq import heapify, heappop, heappush
from pathlib import Path
from typing import Any


def resolve(
    packages: list[dict[str, Any]], mode: str = "lex"
) -> dict[str, Any]:
    names = [p["name"] for p in packages]
    indegree: dict[str, int] = {n: 0 for n in names}
    adj: dict[str, list[str]] = defaultdict(list)  # dep → dependents

    for pkg in packages:
        for dep in pkg["deps"]:
            adj[dep].append(pkg["name"])
            indegree[pkg["name"]] += 1

    ready = [n for n in names if indegree[n] == 0]
    if mode == "lex":
        heapify(ready)
    order: list[str] = []

    while ready:
        node = heappop(ready) if mode == "lex" else ready.pop(0)
        order.append(node)
        for nxt in adj[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                if mode == "lex":
                    heappush(ready, nxt)
                else:
                    ready.append(nxt)

    if len(order) != len(names):
        return {"ok": False, "error": "cycle"}
    return {"ok": True, "order": order}


def is_valid_order(packages: list[dict], order: list[str]) -> bool:
    if len(order) != len(packages):
        return False
    idx = {n: i for i, n in enumerate(order)}
    for p in packages:
        if p["name"] not in idx:
            return False
        for d in p["deps"]:
            if idx[d] >= idx[p["name"]]:
                return False
    return True


def run_case(case: dict) -> dict:
    # Always lex for stable study solutions; "any" still validated by constraints
    result = resolve(case["packages"], "lex")

    if not case["expectOk"]:
        passed = result.get("ok") is False and result.get("error") == "cycle"
        return {"name": case["name"], "passed": passed, "detail": result}

    if not result.get("ok"):
        return {"name": case["name"], "passed": False, "detail": result}

    passed = is_valid_order(case["packages"], result["order"])
    if case.get("mode") == "lex" and case.get("expectOrderIfLex"):
        passed = passed and result["order"] == case["expectOrderIfLex"]

    return {"name": case["name"], "passed": passed, "detail": result}


def main() -> None:
    path = Path(sys.argv[1] if len(sys.argv) > 1 else "starter/cases.json")
    raw = json.loads(path.read_text(encoding="utf-8"))
    results = [run_case(c) for c in raw["cases"]]
    passed = all(r["passed"] for r in results)
    print(json.dumps({"passed": passed, "results": results}, indent=2))
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
