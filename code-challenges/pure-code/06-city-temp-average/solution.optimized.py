"""
cities = [("london", 12), ("london", 12), ...]
resultado = {"london": promedio, "bogota": promedio, ...}
"""

from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


def averages_by_city(
    cities: list[tuple[str, float | int]],
) -> dict[str, float]:
    sums: dict[str, float] = defaultdict(float)
    counts: dict[str, int] = defaultdict(int)

    for city, temp in cities:
        sums[city] += temp
        counts[city] += 1

    return {city: sums[city] / counts[city] for city in counts}


def run_case(case: dict) -> dict:
    cities = [(row[0], row[1]) for row in case["input"]]
    got = averages_by_city(cities)
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
