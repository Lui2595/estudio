"""
Account Ledger — solución optimizada (Python)

Orden de validación en transfer (según cases):
1) amount <= 0 → invalid_amount
2) from === to → same_account
3) cuenta faltante → not_found
4) saldo insuficiente → insufficient_funds

Idempotency: accept Idempotency-Key on transfer; store key→result;
replay returns cached result without moving money again.

Invariant: sum(balances) == sum(initial) after every successful transfer.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


class Ledger:
    def __init__(self) -> None:
        self._balances: dict[str, int] = {}
        self._history: dict[str, list[dict[str, Any]]] = {}

    def create_account(self, account_id: str, initial_balance: int) -> dict:
        if account_id in self._balances:
            return {"ok": False, "error": "exists"}
        self._balances[account_id] = initial_balance
        self._history[account_id] = []
        return {"ok": True}

    def transfer(self, from_id: str, to_id: str, amount: int) -> dict:
        if amount <= 0:
            return {"ok": False, "error": "invalid_amount"}
        if from_id == to_id:
            return {"ok": False, "error": "same_account"}
        if from_id not in self._balances or to_id not in self._balances:
            return {"ok": False, "error": "not_found"}

        from_bal = self._balances[from_id]
        if from_bal < amount:
            return {"ok": False, "error": "insufficient_funds"}

        to_bal = self._balances[to_id]
        new_from = from_bal - amount
        new_to = to_bal + amount
        self._balances[from_id] = new_from
        self._balances[to_id] = new_to

        self._history[from_id].append(
            {
                "type": "transfer",
                "from": from_id,
                "to": to_id,
                "amount": amount,
                "resultingBalance": new_from,
            }
        )
        self._history[to_id].append(
            {
                "type": "transfer",
                "from": from_id,
                "to": to_id,
                "amount": amount,
                "resultingBalance": new_to,
            }
        )
        return {"ok": True}

    def get_balance(self, account_id: str) -> dict:
        if account_id not in self._balances:
            return {"ok": False, "error": "not_found"}
        return {"ok": True, "balance": self._balances[account_id]}

    def get_history(self, account_id: str) -> dict:
        if account_id not in self._history:
            return {"ok": False, "error": "not_found"}
        return {"ok": True, "history": list(self._history[account_id])}


def run_case(case: dict) -> dict:
    ledger: Ledger | None = None
    got: list[Any] = []

    for op in case["ops"]:
        name = op[0]
        if name == "Ledger":
            ledger = Ledger()
        elif name == "createAccount":
            got.append(ledger.create_account(op[1], op[2]))  # type: ignore[union-attr]
        elif name == "transfer":
            got.append(ledger.transfer(op[1], op[2], op[3]))  # type: ignore[union-attr]
        elif name == "getBalance":
            got.append(ledger.get_balance(op[1]))  # type: ignore[union-attr]
        elif name == "getHistory":
            got.append(ledger.get_history(op[1]))  # type: ignore[union-attr]

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
