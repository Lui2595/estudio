"""
ENTREVISTA: POST /payment + timeout + retry => no cobrar dos veces.
Idempotency-Key (UUID) persistida. Unique constraint evita carrera.
"""

from __future__ import annotations


class IdempotentPayments:
    def __init__(self) -> None:
        self._store: dict[str, dict] = {}

    def charge(self, key: str, amount: int) -> dict:
        if key in self._store:
            return self._store[key]  # retry: mismo resultado, NO segundo cargo
        payment = {"payment_id": len(self._store) + 1, "amount": amount}
        self._store[key] = payment
        return payment


api = IdempotentPayments()
first = api.charge("abc123", 5000)
retry = api.charge("abc123", 5000)
assert first == retry
assert first["payment_id"] == 1
print("idempotency OK — same key, one charge")
