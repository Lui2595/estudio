"""
ENTREVISTA: @staticmethod vs @classmethod? ¿Cuándo dataclass?
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass


class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount_cents: int) -> str:
        """Return transaction id."""


@dataclass(slots=True)
class Money:
    cents: int
    currency: str = "USD"

    def add(self, other: Money) -> Money:
        if other.currency != self.currency:
            raise ValueError("currency mismatch")
        return Money(self.cents + other.cents, self.currency)


class StripeGateway(PaymentGateway):
    def charge(self, amount_cents: int) -> str:
        return f"ch_{amount_cents}"


class User:
    # class attribute (shared)
    roles_available = ("user", "admin")

    def __init__(self, email: str, role: str = "user") -> None:
        self.email = email  # instance attribute
        self.role = role

    @classmethod
    def from_email(cls, email: str) -> User:
        """Factory — recibe cls, no self."""
        return cls(email=email.lower())

    @staticmethod
    def is_valid_email(email: str) -> bool:
        return "@" in email and "." in email.split("@")[-1]

    @property
    def domain(self) -> str:
        return self.email.split("@")[-1]


assert User.is_valid_email("a@b.com")
u = User.from_email("Luis@EPAM.com")
assert u.email == "luis@epam.com"
assert u.domain == "epam.com"
assert Money(100).add(Money(50)).cents == 150
assert StripeGateway().charge(999).startswith("ch_")
