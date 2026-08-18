/**
 * Meeting Scheduler — solución optimizada (TypeScript)
 *
 * Intervalos half-open [start, end)
 * mergeBusy: sort + merge lineal (touching también mergea)
 * freeSlots: merge busy → gaps en [dayStart, dayEnd) con length >= slotMinutes
 * minRooms: sweep line (start +1, end -1); process ends before starts at same time
 *
 * Complejidad: O(n log n) por el sort.
 */

import fs from "node:fs";

type Interval = [number, number];

function mergeBusy(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: Interval[] = [[sorted[0]![0], sorted[0]![1]]];

  for (let i = 1; i < sorted.length; i++) {
    const [s, e] = sorted[i]!;
    const last = merged[merged.length - 1]!;
    if (s <= last[1]) {
      last[1] = Math.max(last[1], e);
    } else {
      merged.push([s, e]);
    }
  }
  return merged;
}

function freeSlots(
  busyIntervals: Interval[],
  dayStart: number,
  dayEnd: number,
  slotMinutes: number,
): Interval[] {
  const busy = mergeBusy(busyIntervals);
  const free: Interval[] = [];
  let cursor = dayStart;

  for (const [s, e] of busy) {
    if (s > cursor && s - cursor >= slotMinutes) {
      free.push([cursor, s]);
    }
    cursor = Math.max(cursor, e);
  }
  if (dayEnd > cursor && dayEnd - cursor >= slotMinutes) {
    free.push([cursor, dayEnd]);
  }
  return free;
}

function minRooms(intervals: Interval[]): number {
  const events: { t: number; d: number }[] = [];
  for (const [s, e] of intervals) {
    events.push({ t: s, d: +1 });
    events.push({ t: e, d: -1 });
  }
  // ends (-1) before starts (+1) at same timestamp → half-open, no overlap
  events.sort((a, b) => a.t - b.t || a.d - b.d);

  let cur = 0;
  let max = 0;
  for (const ev of events) {
    cur += ev.d;
    if (cur > max) max = cur;
  }
  return max;
}

interface Case {
  name: string;
  fn: "mergeBusy" | "freeSlots" | "minRooms";
  input: Record<string, unknown>;
  expected: unknown;
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function runCase(c: Case): { name: string; passed: boolean; got: unknown; expected: unknown } {
  let got: unknown;
  switch (c.fn) {
    case "mergeBusy":
      got = mergeBusy(c.input.intervals as Interval[]);
      break;
    case "freeSlots":
      got = freeSlots(
        c.input.busyIntervals as Interval[],
        c.input.dayStart as number,
        c.input.dayEnd as number,
        c.input.slotMinutes as number,
      );
      break;
    case "minRooms":
      got = minRooms(c.input.intervals as Interval[]);
      break;
  }
  return { name: c.name, passed: deepEqual(got, c.expected), got, expected: c.expected };
}

function main(): void {
  const path = process.argv[2] ?? "starter/cases.json";
  const raw = JSON.parse(fs.readFileSync(path, "utf8")) as { cases: Case[] };
  const results = raw.cases.map(runCase);
  const passed = results.every((r) => r.passed);
  console.log(JSON.stringify({ passed, results }, null, 2));
  process.exit(passed ? 0 : 1);
}

main();
