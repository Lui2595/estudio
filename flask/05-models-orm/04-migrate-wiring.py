"""
TEMA: Wiring Flask-Migrate en create_app (patrón real).

pip install flask flask-sqlalchemy flask-migrate
export FLASK_APP=app:create_app   # o tu entrypoint
flask db init / migrate / upgrade
"""

from __future__ import annotations

# --- patrón (comentado para no exigir deps instaladas al estudiar) ---

WIRE_MIGRATE = '''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


class Project(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    archived = db.Column(db.Boolean, default=False, nullable=False)


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)

    return app
'''

FLOW = """
1) Edit class Project(db.Model): ...
2) flask db migrate -m "add projects"
3) Open migrations/versions/*.py -> review upgrade()/downgrade()
4) flask db upgrade
"""

print(FLOW)
print("--- wiring ---")
print(WIRE_MIGRATE)
