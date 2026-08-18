"""
Challenge 01 — Task API (Flask) — solution
Run:
  pip install -r requirements.txt
  python run.py
  pytest -q
"""

from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from flask import Flask, g, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import joinedload
from werkzeug.security import check_password_hash, generate_password_hash

db = SQLAlchemy()
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_HOURS = 1


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="user")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    tasks = db.relationship("Task", back_populates="owner")


class Task(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(20), nullable=False, default="todo")
    priority = db.Column(db.Integer, nullable=False, default=3)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    due_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
    deleted_at = db.Column(db.DateTime)
    owner = db.relationship("User", back_populates="tasks")


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///tasks.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()

    def token_required(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            auth = request.headers.get("Authorization", "")
            if not auth.startswith("Bearer "):
                return jsonify({"error": "unauthorized"}), 401
            try:
                payload = jwt.decode(auth[7:], JWT_SECRET, algorithms=["HS256"])
                user = db.session.get(User, payload["sub"])
                if not user:
                    return jsonify({"error": "unauthorized"}), 401
                g.user = user
            except jwt.PyJWTError:
                return jsonify({"error": "unauthorized"}), 401
            return fn(*args, **kwargs)

        return wrapper

    def task_to_dict(t: Task, include_owner: bool = False) -> dict:
        data = {
            "id": t.id,
            "title": t.title,
            "description": t.description,
            "status": t.status,
            "priority": t.priority,
            "owner_id": t.owner_id,
            "due_date": t.due_date.isoformat() if t.due_date else None,
            "created_at": t.created_at.isoformat() if t.created_at else None,
            "updated_at": t.updated_at.isoformat() if t.updated_at else None,
        }
        if include_owner and t.owner:
            data["owner_email"] = t.owner.email
        return data

    @app.post("/api/auth/register")
    def register():
        body = request.get_json(silent=True) or {}
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""
        if not email or len(password) < 8:
            return jsonify({"error": "validation", "fields": {"email": "required", "password": "min 8"}}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "email_taken"}), 400
        user = User(email=email, password_hash=generate_password_hash(password), role="user")
        db.session.add(user)
        db.session.commit()
        return jsonify({"id": user.id, "email": user.email, "role": user.role}), 201

    @app.post("/api/auth/login")
    def login():
        body = request.get_json(silent=True) or {}
        user = User.query.filter_by(email=(body.get("email") or "").strip().lower()).first()
        if not user or not check_password_hash(user.password_hash, body.get("password") or ""):
            return jsonify({"error": "invalid_credentials"}), 401
        token = jwt.encode(
            {
                "sub": user.id,
                "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_HOURS),
            },
            JWT_SECRET,
            algorithm="HS256",
        )
        return jsonify({"access_token": token, "token_type": "Bearer"})

    @app.get("/api/auth/me")
    @token_required
    def me():
        u: User = g.user
        return jsonify({"id": u.id, "email": u.email, "role": u.role})

    @app.get("/api/tasks")
    @token_required
    def list_tasks():
        u: User = g.user
        q = Task.query.filter(Task.deleted_at.is_(None))
        if u.role != "admin":
            q = q.filter_by(owner_id=u.id)
        else:
            q = q.options(joinedload(Task.owner))

        status = request.args.get("status")
        priority = request.args.get("priority")
        search = request.args.get("q")
        if status:
            q = q.filter_by(status=status)
        if priority:
            q = q.filter_by(priority=int(priority))
        if search:
            q = q.filter(Task.title.ilike(f"%{search}%"))

        page = max(int(request.args.get("page", 1)), 1)
        page_size = min(max(int(request.args.get("page_size", 10)), 1), 50)
        items = q.order_by(Task.id.desc()).offset((page - 1) * page_size).limit(page_size).all()
        include_owner = u.role == "admin"
        return jsonify(
            {
                "page": page,
                "page_size": page_size,
                "items": [task_to_dict(t, include_owner) for t in items],
            }
        )

    @app.post("/api/tasks")
    @token_required
    def create_task():
        body = request.get_json(silent=True) or {}
        title = (body.get("title") or "").strip()
        if not (3 <= len(title) <= 120):
            return jsonify({"error": "validation", "fields": {"title": "3-120 chars"}}), 400
        status = body.get("status", "todo")
        if status not in {"todo", "in_progress", "done"}:
            return jsonify({"error": "validation", "fields": {"status": "invalid"}}), 400
        priority = int(body.get("priority", 3))
        if priority < 1 or priority > 5:
            return jsonify({"error": "validation", "fields": {"priority": "1-5"}}), 400
        due = body.get("due_date")
        due_date = datetime.strptime(due, "%Y-%m-%d").date() if due else None
        task = Task(
            title=title,
            description=body.get("description"),
            status=status,
            priority=priority,
            owner_id=g.user.id,
            due_date=due_date,
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task_to_dict(task)), 201

    def get_visible_task(task_id: int) -> Task | None:
        task = Task.query.filter_by(id=task_id, deleted_at=None).first()
        if not task:
            return None
        if g.user.role != "admin" and task.owner_id != g.user.id:
            return None  # 404 — don't leak
        return task

    @app.get("/api/tasks/<int:task_id>")
    @token_required
    def get_task(task_id: int):
        task = get_visible_task(task_id)
        if not task:
            return jsonify({"error": "not_found"}), 404
        return jsonify(task_to_dict(task, include_owner=g.user.role == "admin"))

    @app.patch("/api/tasks/<int:task_id>")
    @token_required
    def patch_task(task_id: int):
        task = get_visible_task(task_id)
        if not task:
            return jsonify({"error": "not_found"}), 404
        body = request.get_json(silent=True) or {}
        if "title" in body:
            title = (body["title"] or "").strip()
            if not (3 <= len(title) <= 120):
                return jsonify({"error": "validation", "fields": {"title": "3-120"}}), 400
            task.title = title
        if "description" in body:
            task.description = body["description"]
        if "status" in body:
            if body["status"] not in {"todo", "in_progress", "done"}:
                return jsonify({"error": "validation", "fields": {"status": "invalid"}}), 400
            task.status = body["status"]
        if "priority" in body:
            p = int(body["priority"])
            if p < 1 or p > 5:
                return jsonify({"error": "validation", "fields": {"priority": "1-5"}}), 400
            task.priority = p
        db.session.commit()
        return jsonify(task_to_dict(task))

    @app.delete("/api/tasks/<int:task_id>")
    @token_required
    def delete_task(task_id: int):
        task = get_visible_task(task_id)
        if not task:
            return jsonify({"error": "not_found"}), 404
        task.deleted_at = datetime.now(timezone.utc)  # soft delete
        db.session.commit()
        return "", 204

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
