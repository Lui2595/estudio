"""
TEMA: Cómo se VE / escribe una revisión Alembic (la genera Flask-Migrate).

ENTREVISTA: ¿Cómo haces una migración en Flask?
R: Cambio el model → flask db migrate -m "..." → reviso upgrade()/downgrade()
   → flask db upgrade. El motor es Alembic; Flask-Migrate es el puente.

Este archivo es un EJEMPLO de estudio (no se corre solo sin app Flask).
"""

# --- lo que Alembic pone al inicio del archivo ---
revision = "a1b2c3d4e5f6"
down_revision = None  # o el id de la revisión anterior
branch_labels = None
depends_on = None

# from alembic import op
# import sqlalchemy as sa


def upgrade_example():
    """Aplicar cambios (hacia adelante)."""
    # op.create_table(
    #     "projects",
    #     sa.Column("id", sa.Integer(), primary_key=True),
    #     sa.Column("title", sa.String(length=200), nullable=False),
    #     sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
    #     sa.Column(
    #         "archived",
    #         sa.Boolean(),
    #         nullable=False,
    #         server_default=sa.text("0"),
    #     ),
    # )
    # op.create_index("ix_projects_user_id", "projects", ["user_id"])
    pass


def downgrade_example():
    """Deshacer (rollback)."""
    # op.drop_index("ix_projects_user_id", table_name="projects")
    # op.drop_table("projects")
    pass


# --- Añadir columna después (2ª migración) ---
def upgrade_add_status_example():
    # op.add_column(
    #     "projects",
    #     sa.Column("status", sa.String(length=20), nullable=True),
    # )
    pass


def downgrade_add_status_example():
    # op.drop_column("projects", "status")
    pass


CHEATSHEET = """
flask db init
flask db migrate -m "add projects"
# creates migrations/versions/<rev>_add_projects.py  (edit if needed)
flask db upgrade
flask db downgrade
flask db history
flask db current
"""

print("Alembic revision pattern OK")
print(CHEATSHEET)
