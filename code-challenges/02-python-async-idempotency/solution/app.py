"""
Challenge 02 — Checkout with idempotency + async email (SQLite jobs table).
Terminal 1: python run.py
Terminal 2: python worker.py
"""

from __future__ import annotations

import json
import os
import uuid
from datetime import datetime, timezone

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

db = SQLAlchemy()


class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    price_cents = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)


class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.String(36), primary_key=True)
    user_email = db.Column(db.String(255), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_cents = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    idempotency_key = db.Column(db.String(100), unique=True, nullable=False)
    request_hash = db.Column(db.String(64), nullable=False)
    response_json = db.Column(db.Text, nullable=False)
    response_status = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))


class EmailJob(db.Model):
    __tablename__ = "email_jobs"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(36), unique=True, nullable=False)
    to_email = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="queued")
    attempts = db.Column(db.Integer, nullable=False, default=0)


class SentEmail(db.Model):
    __tablename__ = "sent_emails"
    order_id = db.Column(db.String(36), primary_key=True)
    sent_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///checkout.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()

    @app.post("/api/products")
    def create_product():
        body = request.get_json(silent=True) or {}
        p = Product(
            sku=body["sku"],
            name=body["name"],
            price_cents=int(body["price_cents"]),
            stock=int(body["stock"]),
        )
        db.session.add(p)
        db.session.commit()
        return jsonify({"id": p.id, "sku": p.sku, "stock": p.stock}), 201

    @app.get("/api/products")
    def list_products():
        rows = Product.query.all()
        return jsonify(
            [
                {
                    "id": p.id,
                    "sku": p.sku,
                    "name": p.name,
                    "price_cents": p.price_cents,
                    "stock": p.stock,
                }
                for p in rows
            ]
        )

    @app.post("/api/orders")
    def create_order():
        key = request.headers.get("Idempotency-Key")
        if not key:
            return jsonify({"error": "Idempotency-Key required"}), 400

        body = request.get_json(silent=True) or {}
        request_hash = str(hash(json.dumps(body, sort_keys=True)))

        existing = Order.query.filter_by(idempotency_key=key).first()
        if existing:
            if existing.request_hash != request_hash:
                return jsonify({"error": "conflict", "message": "same key different body"}), 409
            return app.response_class(
                existing.response_json,
                status=existing.response_status,
                mimetype="application/json",
            )

        email = body.get("user_email")
        product_id = body.get("product_id")
        qty = int(body.get("quantity", 0))
        if not email or not product_id or qty < 1:
            return jsonify({"error": "validation"}), 400

        product = db.session.get(Product, product_id)
        if product is None:
            return jsonify({"error": "product_not_found"}), 404

        if body.get("simulate_failure"):
            order_id = str(uuid.uuid4())
            payload = {"id": order_id, "status": "failed"}
            order = Order(
                id=order_id,
                user_email=email,
                product_id=product_id,
                quantity=qty,
                total_cents=0,
                status="failed",
                idempotency_key=key,
                request_hash=request_hash,
                response_json=json.dumps(payload),
                response_status=402,
            )
            try:
                db.session.add(order)
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                existing = Order.query.filter_by(idempotency_key=key).first()
                return app.response_class(
                    existing.response_json,
                    status=existing.response_status,
                    mimetype="application/json",
                )
            return jsonify(payload), 402

        if product.stock < qty:
            return jsonify({"error": "insufficient_stock"}), 422

        order_id = str(uuid.uuid4())
        total = product.price_cents * qty
        payload = {
            "id": order_id,
            "user_email": email,
            "product_id": product_id,
            "quantity": qty,
            "total_cents": total,
            "status": "paid",
        }
        product.stock -= qty
        order = Order(
            id=order_id,
            user_email=email,
            product_id=product_id,
            quantity=qty,
            total_cents=total,
            status="paid",
            idempotency_key=key,
            request_hash=request_hash,
            response_json=json.dumps(payload),
            response_status=201,
        )
        db.session.add(order)
        db.session.add(EmailJob(order_id=order_id, to_email=email, status="queued"))
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            existing = Order.query.filter_by(idempotency_key=key).first()
            if existing:
                if existing.request_hash != request_hash:
                    return jsonify({"error": "conflict"}), 409
                return app.response_class(
                    existing.response_json,
                    status=existing.response_status,
                    mimetype="application/json",
                )
            raise

        return jsonify(payload), 201

    @app.get("/api/orders/<order_id>")
    def get_order(order_id: str):
        order = db.session.get(Order, order_id)
        if not order:
            return jsonify({"error": "not_found"}), 404
        return jsonify(
            {
                "id": order.id,
                "status": order.status,
                "total_cents": order.total_cents,
                "user_email": order.user_email,
            }
        )

    @app.get("/api/orders/<order_id>/email-status")
    def email_status(order_id: str):
        job = EmailJob.query.filter_by(order_id=order_id).first()
        if not job:
            return jsonify({"error": "not_found"}), 404
        return jsonify({"order_id": order_id, "status": job.status, "attempts": job.attempts})

    return app


app = create_app()
