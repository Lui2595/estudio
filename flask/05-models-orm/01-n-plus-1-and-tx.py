"""
TEMA: Modelos 1:N + N+1 (SQLAlchemy style — estudio, no app runnable completa)
ENTREVISTA: ¿Cómo evitas N+1 listando projects con owner?
"""

# Pseudocódigo / patrón — requiere flask-sqlalchemy en proyecto real

PATTERN_JOINEDLOAD = """
from sqlalchemy.orm import joinedload

projects = (
    session.query(Project)
    .options(joinedload(Project.owner))
    .filter(Project.archived == False)
    .all()
)
# 1 query con JOIN en vez de 1 + N
"""

PATTERN_ATOMIC = """
try:
    project.archived = True
    for task in project.tasks:
        task.status = "done"
    session.commit()
except Exception:
    session.rollback()
    raise
"""
