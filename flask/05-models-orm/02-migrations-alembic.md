# Migrations — Flask-Migrate + Alembic (cómo se escriben)

**P (EN): What library for migrations in Flask?**  
**R (EN):** **Flask-Migrate** wraps **Alembic**. You rarely invent the engine — you generate/edit Alembic revision scripts and run `flask db upgrade`.

**P (ES): ¿Librería de migraciones?**  
**R (ES):** **Flask-Migrate** → **Alembic**. Los archivos en `migrations/versions/*.py` son scripts Alembic con `upgrade()` / `downgrade()`.

---

## 1) Setup (una vez)

```bash
pip install flask flask-sqlalchemy flask-migrate
```

En el app factory:

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    db.init_app(app)
    migrate.init_app(app, db)   # ← enlaza Alembic con tus models
    # import models so Alembic “ve” las tablas
    from . import models  # noqa: F401
    return app
```

```bash
flask db init                    # crea carpeta migrations/
flask db migrate -m "init"       # autogenera 1ª revisión mirando models
flask db upgrade                 # aplica a la DB
```

---

## 2) Cómo se “escribe” una migración

### Camino normal (recomendado)

1. Cambias el **model** SQLAlchemy (`Column`, tabla nueva, FK…).
2. Generas: `flask db migrate -m "add projects table"`
3. **Revisas** el archivo en `migrations/versions/xxxx_add_projects_table.py`
4. Aplicas: `flask db upgrade`

Alembic **autogenera** el `upgrade()` / `downgrade()` comparando models vs DB. Tú lo editas si hace falta (renombres, data migrations).

### Camino manual

Creas revisión vacía y escribes ops a mano:

```bash
flask db revision -m "add status column"
# editas upgrade()/downgrade()
flask db upgrade
```

---

## 3) Anatomía del archivo Alembic

```python
"""add projects table

Revision ID: a1b2c3d4e5f6
Revises: 
Create Date: 2026-07-23
"""
from alembic import op
import sqlalchemy as sa

revision = "a1b2c3d4e5f6"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "projects",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("archived", sa.Boolean(), server_default=sa.text("0"), nullable=False),
    )


def downgrade():
    op.drop_table("projects")
```

| Pieza | Rol |
|-------|-----|
| `revision` / `down_revision` | Cadena de versiones (como git commits) |
| `upgrade()` | Qué aplicar al ir “hacia adelante” |
| `downgrade()` | Cómo deshacer (rollback) |
| `op.*` | API Alembic: `create_table`, `add_column`, `drop_column`, `create_index`… |

---

## 4) Ops más usadas

```python
def upgrade():
    # Nueva columna
    op.add_column("projects", sa.Column("status", sa.String(20), nullable=True))

    # Índice
    op.create_index("ix_projects_user_id", "projects", ["user_id"])

    # Renombrar (cuidado: autogenerate a veces no lo detecta bien)
    # op.alter_column(...) / op.rename_table(...)

def downgrade():
    op.drop_index("ix_projects_user_id", table_name="projects")
    op.drop_column("projects", "status")
```

**Data migration** (mover/rellenar datos):

```python
from sqlalchemy.sql import table, column

def upgrade():
    projects = table("projects", column("status", sa.String))
    op.execute(projects.update().values(status="todo"))
```

---

## 5) Comandos memoria entrevista

| Acción | Comando |
|--------|---------|
| Init repo migraciones | `flask db init` |
| Generar desde models | `flask db migrate -m "msg"` |
| Revisión vacía manual | `flask db revision -m "msg"` |
| Aplicar | `flask db upgrade` |
| Rollback 1 | `flask db downgrade` |
| Ver historial | `flask db history` |
| ¿DB al día? | `flask db current` |

---

## 6) Frases EN / ES

**EN:** “Flask-Migrate is the Flask integration; Alembic is the engine. I change SQLAlchemy models, run `flask db migrate`, review the generated `upgrade`/`downgrade`, then `flask db upgrade`.”

**ES:** “Flask-Migrate es el wrapper; Alembic escribe/aplica los scripts. Cambio el model → `migrate` → reviso el `.py` → `upgrade`.”

## Django vs Flask

| | Django | Flask |
|--|--------|-------|
| Tool | migrations built-in | Flask-Migrate → Alembic |
| Generate | `makemigrations` | `flask db migrate` |
| Apply | `migrate` | `flask db upgrade` |
| File | `migrations/0001_*.py` | `migrations/versions/*_.py` |

Código ejemplo: `03-alembic-revision-example.py` · wiring: `04-migrate-wiring.py`
