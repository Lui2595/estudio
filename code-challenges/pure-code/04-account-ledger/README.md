# 04 — Account Ledger (Transfers)

**Languages:** TypeScript (preferred) · Python · PHP · Node.js  
**Timebox:** 50 minutes  
**Topics:** Invariants, validation, sequential consistency

---

## Problem

Implement an in-memory **ledger** for bank-like accounts.

```
Ledger()
createAccount(id, initialBalance) -> void | error
transfer(fromId, toId, amount) -> { ok: true } | { ok: false, error }
getBalance(id) -> number | error
getHistory(id) -> TransferRecord[]
```

Rules:

1. Balances are integers (cents). No floats.
2. `amount` must be **> 0**.
3. Cannot overdraw: `from` balance must be ≥ amount.
4. `fromId` and `toId` must exist and be **different**.
5. Successful transfer is atomic in-memory: both balances update or neither.
6. Every successful transfer appends a record to **both** accounts’ histories:

```json
{
  "type": "transfer",
  "from": "A",
  "to": "B",
  "amount": 100,
  "resultingBalance": 400
}
```

`resultingBalance` is the balance of **that history owner** after the transfer.

7. Creating an account that already exists → error `"exists"`.
8. Unknown account on get/transfer → error `"not_found"`.
9. Overdraw → `"insufficient_funds"`.
10. Invalid amount → `"invalid_amount"`.
11. Same from/to → `"same_account"`.

Invariant always true:

```
sum(all balances) == sum(all initial balances)
```

(No external money created/destroyed by transfers.)

---

## Ops format

```json
["Ledger"]
["createAccount", "A", 500]
["createAccount", "B", 100]
["transfer", "A", "B", 200]
["getBalance", "A"]
["getBalance", "B"]
["transfer", "A", "B", 9999]
["getHistory", "A"]
```

Collect outputs for ops that return values (`transfer`, `getBalance`, `getHistory`, and createAccount errors).  
See `expected` shapes in cases.

---

## Acceptance criteria

- [ ] All cases pass
- [ ] Global sum invariant holds after every successful transfer (assert in tests)
- [ ] History order is chronological
- [ ] Comment: how you’d add idempotency keys for retries (5 lines)

## Stretch

- `transferAll(from, to)` 
- Multi-currency rejected (keep single currency)

---

## How to run

```bash
npx tsx solution.ts starter/cases.json
node solution.js starter/cases.json
python solution.py starter/cases.json
php solution.php starter/cases.json
```

TypeScript: tipa `TransferResult` / `HistoryItem` como uniones. See `../TYPESCRIPT.md`.
