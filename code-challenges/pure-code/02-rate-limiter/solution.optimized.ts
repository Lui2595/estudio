/**
 * Rate Limiter — solución optimizada (TypeScript)
 *
 * Ventana: (t - windowMs) < ts <= t
 * Solo requests ACEPTADOS consumen cuota.
 * Por cliente: cola de timestamps (deque), limpiar viejos al frente.
 *
 * Redis note: ZADD clientId t t + ZREMRANGEBYSCORE -inf (t-window] + ZCARD;
 * o INCR+EXPIRE solo aproxima ventana fija, no sliding exacto.
 *
 * Complejidad: allow O(k) amortizado (k = eventos que salen de ventana)
 */

import fs from "node:fs";

class RateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  /** clientId → timestamps aceptados (ordenados ascendente) */
  private readonly hits = new Map<string, number[]>();

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  allow(clientId: string, timestampMs: number): boolean {
    let q = this.hits.get(clientId);
    if (!q) {
      q = [];
      this.hits.set(clientId, q);
    }

    // Drop timestamps ts where NOT (t - windowMs < ts) i.e. ts <= t - windowMs
    const cutoff = timestampMs - this.windowMs;
    while (q.length > 0 && q[0]! <= cutoff) {
      q.shift();
    }

    if (q.length >= this.maxRequests) {
      return false; // rejected — do NOT push
    }

    q.push(timestampMs);
    return true;
  }
}

type Op = [string, ...unknown[]];

interface Case {
  name: string;
  ops: Op[];
  expected: boolean[];
}

function runCase(c: Case): { name: string; passed: boolean; got: boolean[]; expected: boolean[] } {
  let limiter: RateLimiter | undefined;
  const got: boolean[] = [];

  for (const op of c.ops) {
    const [name, a, b] = op;
    if (name === "RateLimiter") {
      limiter = new RateLimiter(a as number, b as number);
    } else if (name === "allow") {
      got.push(limiter!.allow(a as string, b as number));
    }
  }

  const passed = got.length === c.expected.length && got.every((v, i) => v === c.expected[i]);
  return { name: c.name, passed, got, expected: c.expected };
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
