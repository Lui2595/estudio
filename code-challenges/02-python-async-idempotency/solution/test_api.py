import json
import uuid

import pytest

from app import Product, create_app, db


@pytest.fixture()
def client(tmp_path):
    app = create_app()
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{tmp_path / 't.db'}"
    app.config["TESTING"] = True
    with app.app_context():
        db.drop_all()
        db.create_all()
        db.session.add(Product(sku="P1", name="Plan", price_cents=1000, stock=5))
        db.session.commit()
    return app.test_client()


def test_order_succeeds(client):
    key = str(uuid.uuid4())
    res = client.post(
        "/api/orders",
        headers={"Idempotency-Key": key},
        json={"user_email": "a@b.com", "product_id": 1, "quantity": 2},
    )
    assert res.status_code == 201
    assert res.get_json()["status"] == "paid"


def test_idempotent_replay(client):
    key = str(uuid.uuid4())
    body = {"user_email": "a@b.com", "product_id": 1, "quantity": 1}
    r1 = client.post("/api/orders", headers={"Idempotency-Key": key}, json=body)
    r2 = client.post("/api/orders", headers={"Idempotency-Key": key}, json=body)
    assert r1.status_code == 201 and r2.status_code == 201
    assert r1.get_json()["id"] == r2.get_json()["id"]
    products = client.get("/api/products").get_json()
    assert products[0]["stock"] == 4  # only one decrement


def test_insufficient_stock(client):
    key = str(uuid.uuid4())
    res = client.post(
        "/api/orders",
        headers={"Idempotency-Key": key},
        json={"user_email": "a@b.com", "product_id": 1, "quantity": 99},
    )
    assert res.status_code == 422
