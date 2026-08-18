"""
View -> Service -> ORM  (no View -> ORM con 200 lineas)
"""

class OrderRepo:
    def save(self, order: dict) -> dict:
        return {**order, "id": 1}


class PaymentGateway:
    def charge(self, cents: int) -> str:
        return f"ch_{cents}"


class OrderService:
    def __init__(self, repo: OrderRepo, payments: PaymentGateway) -> None:
        self.repo = repo
        self.payments = payments

    def checkout(self, user_id: int, cents: int) -> dict:
        tx = self.payments.charge(cents)
        return self.repo.save({"user_id": user_id, "tx": tx, "cents": cents})


svc = OrderService(OrderRepo(), PaymentGateway())
assert svc.checkout(9, 1999)["tx"].startswith("ch_")
print("service layer OK")
