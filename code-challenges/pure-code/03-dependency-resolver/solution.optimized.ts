/**
 * Dependency Resolver — Kahn’s topological sort (TypeScript)
 *
 * mode "lex": ready queue always pops lexicographically smallest name.
 * Cycle: if order.length < V after processing → cycle.
 *
 * Complejidad: O(V + E + V log V) con lex (sort/insert ready); O(V+E) sin lex.
 */

import fs from "node:fs";

interface Pkg {
  name: string;
  deps: string[];
}

type ResolveResult =
  | { ok: true; order: string[] }
  | { ok: false; error: "cycle" };

function resolve(packages: Pkg[], mode: "any" | "lex" = "lex"): ResolveResult {
  const names = packages.map((p) => p.name);
  const indegree = new Map<string, number>();
  const adj = new Map<string, string[]>(); // dep → dependents (edge dep → pkg)

  for (const name of names) {
    indegree.set(name, 0);
    adj.set(name, []);
  }

  for (const pkg of packages) {
    for (const dep of pkg.deps) {
      adj.get(dep)!.push(pkg.name);
      indegree.set(pkg.name, (indegree.get(pkg.name) ?? 0) + 1);
    }
  }

  let ready = names.filter((n) => indegree.get(n) === 0);
  if (mode === "lex") {
    ready.sort((a, b) => a.localeCompare(b));
  }

  const order: string[] = [];

  while (ready.length > 0) {
    const node = mode === "lex" ? ready.shift()! : ready.shift()!;
    order.push(node);

    for (const next of adj.get(node) ?? []) {
      const d = (indegree.get(next) ?? 0) - 1;
      indegree.set(next, d);
      if (d === 0) {
        ready.push(next);
        if (mode === "lex") {
          ready.sort((a, b) => a.localeCompare(b));
        }
      }
    }
  }

  if (order.length !== names.length) {
    return { ok: false, error: "cycle" };
  }
  return { ok: true, order };
}

function isValidOrder(packages: Pkg[], order: string[]): boolean {
  if (order.length !== packages.length) return false;
  const idx = new Map(order.map((n, i) => [n, i]));
  for (const p of packages) {
    if (!idx.has(p.name)) return false;
    for (const d of p.deps) {
      if ((idx.get(d) ?? Infinity) >= (idx.get(p.name) ?? -1)) return false;
    }
  }
  return true;
}

interface Case {
  name: string;
  mode: "any" | "lex";
  packages: Pkg[];
  expectOk: boolean;
  expectOrderIfLex?: string[];
  expectError?: string;
}

function runCase(c: Case): { name: string; passed: boolean; detail: unknown } {
  // Always lex for stable study solutions; "any" cases still validated by constraints
  const result = resolve(c.packages, "lex");
  if (!c.expectOk) {
    const passed = result.ok === false && result.error === "cycle";
    return { name: c.name, passed, detail: result };
  }

  if (!result.ok) {
    return { name: c.name, passed: false, detail: result };
  }

  let passed = isValidOrder(c.packages, result.order);
  if (c.mode === "lex" && c.expectOrderIfLex) {
    passed =
      passed &&
      result.order.length === c.expectOrderIfLex.length &&
      result.order.every((v, i) => v === c.expectOrderIfLex![i]);
  }
  return { name: c.name, passed, detail: result };
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
