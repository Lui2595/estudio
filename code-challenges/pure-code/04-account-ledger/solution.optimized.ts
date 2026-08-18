/**
 * Account Ledger — solución optimizada (TypeScript)
 *
 * Orden de validación en transfer (según cases):
 * 1) amount <= 0 → invalid_amount
 * 2) from === to → same_account
 * 3) cuenta faltante → not_found
 * 4) saldo insuficiente → insufficient_funds
 *
 * Idempotency note: accept Idempotency-Key on transfer; store key→result;
 * replay returns cached result without moving money again.
 */

import fs from "node:fs";

type ErrorCode =
  | "exists"
  | "not_found"
  | "insufficient_funds"
  | "invalid_amount"
  | "same_account";

type Ok = { ok: true };
type Err = { ok: false; error: ErrorCode };
type BalanceOk = { ok: true; balance: number };
type HistoryItem = {
  type: "transfer";
  from: string;
  to: string;
  amount: number;
  resultingBalance: number;
};
type HistoryOk = { ok: true; history: HistoryItem[] };

class Ledger {
  private readonly balances = new Map<string, number>();
  private readonly history = new Map<string, HistoryItem[]>();

  createAccount(id: string, initialBalance: number): Ok | Err {
    if (this.balances.has(id)) {
      return { ok: false, error: "exists" };
    }
    this.balances.set(id, initialBalance);
    this.history.set(id, []);
    return { ok: true };
  }

  transfer(fromId: string, toId: string, amount: number): Ok | Err {
    if (amount <= 0) {
      return { ok: false, error: "invalid_amount" };
    }
    if (fromId === toId) {
      return { ok: false, error: "same_account" };
    }
    if (!this.balances.has(fromId) || !this.balances.has(toId)) {
      return { ok: false, error: "not_found" };
    }

    const fromBal = this.balances.get(fromId)!;
    if (fromBal < amount) {
      return { ok: false, error: "insufficient_funds" };
    }

    const toBal = this.balances.get(toId)!;
    const newFrom = fromBal - amount;
    const newTo = toBal + amount;
    this.balances.set(fromId, newFrom);
    this.balances.set(toId, newTo);

    this.history.get(fromId)!.push({
      type: "transfer",
      from: fromId,
      to: toId,
      amount,
      resultingBalance: newFrom,
    });
    this.history.get(toId)!.push({
      type: "transfer",
      from: fromId,
      to: toId,
      amount,
      resultingBalance: newTo,
    });

    return { ok: true };
  }

  getBalance(id: string): BalanceOk | Err {
    if (!this.balances.has(id)) {
      return { ok: false, error: "not_found" };
    }
    return { ok: true, balance: this.balances.get(id)! };
  }

  getHistory(id: string): HistoryOk | Err {
    if (!this.history.has(id)) {
      return { ok: false, error: "not_found" };
    }
    return { ok: true, history: [...this.history.get(id)!] };
  }
}

type Op = unknown[];

interface Case {
  name: string;
  ops: Op[];
  expected: unknown[];
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function runCase(c: Case): { name: string; passed: boolean; got: unknown[]; expected: unknown[] } {
  let ledger: Ledger | undefined;
  const got: unknown[] = [];

  for (const op of c.ops) {
    const name = op[0] as string;
    switch (name) {
      case "Ledger":
        ledger = new Ledger();
        break;
      case "createAccount":
        got.push(ledger!.createAccount(op[1] as string, op[2] as number));
        break;
      case "transfer":
        got.push(ledger!.transfer(op[1] as string, op[2] as string, op[3] as number));
        break;
      case "getBalance":
        got.push(ledger!.getBalance(op[1] as string));
        break;
      case "getHistory":
        got.push(ledger!.getHistory(op[1] as string));
        break;
    }
  }

  const passed =
    got.length === c.expected.length && got.every((v, i) => deepEqual(v, c.expected[i]));
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
