"""
Meeting Scheduler — solución optimizada (Python)

Intervalos half-open [start, end)
mergeBusy: sort + merge lineal (touching también mergea)
freeSlots: merge busy → gaps en [dayStart, dayEnd) con length >= slotMinutes
minRooms: sweep (start +1, end -1); ends before starts at same time

Complejidad: O(n log n) por el sort.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

Interval = list[int]  # [start, end)


def merge_busy(intervals: list[Interval]) -> list[Interval]:
    if not intervals:
        return []
    sorted_iv = sorted(intervals, key=lambda x: (x[0], x[1]))
    merged: list[Interval] = [[sorted_iv[0][0], sorted_iv[0][1]]]

    for s, e in sorted_iv[1:]:
        last = merged[-1]
        if s <= last[1]:  # overlap or touching
            last[1] = max(last[1], e)
        else:
            merged.append([s, e])
    return merged


def free_slots(
    busy_intervals: list[Interval],
    day_start: int,
    day_end: int,
    slot_minutes: int,
) -> list[Interval]:
    busy = merge_busy(busy_intervals)
    free: list[Interval] = []
    cursor = day_start

    for s, e in busy:
        if s > cursor and s - cursor >= slot_minutes:
            free.append([cursor, s])
        cursor = max(cursor, e)

    if day_end > cursor and day_end - cursor >= slot_minutes:
        free.append([cursor, day_end])
    return free


def min_rooms(intervals: list[Interval]) -> int:
    events: list[tuple[int, int]] = []
    for s, e in intervals:
        events.append((s, +1))
        events.append((e, -1))
    # ends (-1) before starts (+1) at same timestamp → half-open
    events.sort(key=lambda ev: (ev[0], ev[1]))

    cur = max_rooms = 0
    for _, delta in events:
        cur += delta
        if cur > max_rooms:
            max_rooms = cur
    return max_rooms


def run_case(case: dict) -> dict:
    fn = case["fn"]
    inp = case["input"]
    got: Any

    if fn == "mergeBusy":
        got = merge_busy(inp["intervals"])
    elif fn == "freeSlots":
        got = free_slots(
            inp["busyIntervals"],
            inp["dayStart"],
            inp["dayEnd"],
            inp["slotMinutes"],
        )
    elif fn == "minRooms":
        got = min_rooms(inp["intervals"])
    else:
        raise ValueError(f"Unknown fn: {fn}")

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
