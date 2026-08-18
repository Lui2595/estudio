"""
ENTREVISTA: ¿Qué son magic methods / dunder?
¿Diferencia __str__ vs __repr__? ¿__eq__?

Magic methods = Python llama estos métodos cuando usas sintaxis del lenguaje.
"""

from __future__ import annotations


class Money:
    def __init__(self, cents: int, currency: str = "USD") -> None:
        self.cents = cents
        self.currency = currency

    def __repr__(self) -> str:
        # Para developers / debug — idealmente sin ambigüedad
        return f"Money(cents={self.cents!r}, currency={self.currency!r})"

    def __str__(self) -> str:
        # Para humanos / print
        return f"{self.cents / 100:.2f} {self.currency}"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return NotImplemented
        return self.cents == other.cents and self.currency == other.currency

    def __add__(self, other: Money) -> Money:
        if self.currency != other.currency:
            raise ValueError("currency mismatch")
        return Money(self.cents + other.cents, self.currency)

    def __bool__(self) -> bool:
        # if money:  → False cuando cents == 0
        return self.cents != 0


if __name__ == "__main__":
    a = Money(1999)
    b = Money(100)
    print(str(a))    # 19.99 USD   → __str__
    print(repr(a))   # Money(cents=1999, currency='USD')  → __repr__
    print(a + b)     # 20.99 USD   → __add__ luego __str__
    print(a == Money(1999))  # True → __eq__
    print(bool(Money(0)))    # False → __bool__
