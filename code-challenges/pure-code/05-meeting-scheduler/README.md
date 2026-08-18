# 05 — Meeting Scheduler (Merge Intervals + Free Slots)

**Languages:** TypeScript (preferred) · Python · PHP · Node.js  
**Timebox:** 45 minutes  
**Topics:** Sorting, interval merge, sweeping

---

## Problem

You manage a calendar day as minutes from `0` to `endOfDay` (e.g. `24*60 = 1440`).

Implement:

```
mergeBusy(intervals) -> mergedIntervals
freeSlots(busyIntervals, dayStart, dayEnd, slotMinutes) -> freeIntervals
minRooms(intervals) -> number
```

### 1) `mergeBusy`

Given half-open intervals `[start, end)` in minutes, merge overlaps/touching.

Example:

```
[[0,60],[50,120],[200,300]] -> [[0,120],[200,300]]
[[1,2],[2,3]] -> [[1,3]]   // touching merges
```

### 2) `freeSlots`

Given busy intervals (not necessarily merged), `dayStart`, `dayEnd`, return free gaps of length **≥ slotMinutes** as intervals `[start,end)`.

Example:

```
busy = [[60,120],[180,240]]
dayStart=0, dayEnd=300, slotMinutes=30
-> [[0,60],[120,180],[240,300]]
```

If a gap is shorter than `slotMinutes`, omit it.

### 3) `minRooms`

Minimum number of meeting rooms required (classic: max concurrent overlaps).

Example:

```
[[0,30],[5,10],[15,20]] -> 2
[[0,10],[10,20]] -> 1
```

Use half-open intervals: an ending meeting does not conflict with one starting at the same minute.

---

## Ops / cases

Each case calls one function:

```json
{ "fn": "mergeBusy", "input": { "intervals": [...] }, "expected": [...] }
{ "fn": "freeSlots", "input": { ... }, "expected": [...] }
{ "fn": "minRooms", "input": { "intervals": [...] }, "expected": 2 }
```

---

## Acceptance criteria

- [ ] All cases pass
- [ ] Sort + linear merge (not O(n²) pairwise without need)
- [ ] Touching intervals merge for `mergeBusy`
- [ ] Half-open semantics for `minRooms`
- [ ] Big-O comment

## Stretch

- Find first free slot ≥ `slotMinutes` after time `t`
- Compress to string schedule `"09:00-10:30 busy"`

---

## How to run

```bash
npx tsx solution.ts starter/cases.json
node solution.js starter/cases.json
python solution.py starter/cases.json
php solution.php starter/cases.json
```

TypeScript: `type Interval = readonly [start: number, end: number]`. See `../TYPESCRIPT.md`.
