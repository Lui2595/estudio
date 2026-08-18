"""
Rate Limiter — solución optimizada (Python)

Ventana: (t - windowMs) < ts <= t
Solo requests ACEPTADOS consumen cuota.
Por cliente: deque de timestamps; limpiar viejos al frente O(1) amortizado.

Redis: ZADD clientId t t + ZREMRANGEBYSCORE -inf (t-window] + ZCARD;
INCR+EXPIRE solo aproxima ventana fija, no sliding exacto.

Complejidad: allow O(k) amortizado (k = eventos que salen de ventana)
"""

from __future__ import annotations

import json
import sys
from collections import defaultdict, deque
from pathlib import Path


class RateLimiter:
    def __init__(self, max_requests: int, window_ms: int) -> None:
        self.max_requests = max_requests
        self.window_ms = window_ms
        self._hits: dict[str, deque[int]] = defaultdict(deque)

    def allow(self, client_id: str, timestamp_ms: int) -> bool:
        q = self._hits[client_id]
        cutoff = timestamp_ms - self.window_ms
        while q and q[0] <= cutoff:
            q.popleft()

        if len(q) >= self.max_requests:
            return False  # rejected — do NOT push

        q.append(timestamp_ms)
        return True


def run_case(case: dict) -> dict:
    limiter: RateLimiter | None = None
    got: list[bool] = []

    for op in case["ops"]:
        name = op[0]
        if name == "RateLimiter":
            limiter = RateLimiter(op[1], op[2])
        elif name == "allow":
            got.append(limiter.allow(op[1], op[2]))  # type: ignore[union-attr]

    expected = case["expected"]
    passed = got == expected
    return {"name": case["name"], "passed": passed, "got": got, "expected": expected}


def main() -> None:
    path = Path(sys.argv[1] if len(sys.argv) > 1 else "starter/cases.json")
    raw = json.loads(path.read_text(encoding="utf-8"))
    results = [run_case(c) for c in raw["cases"]]
    passed = all(r["passed"] for r in results)
    print(json.dumps({"passed": passed, "results": results}, indent=2))
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
