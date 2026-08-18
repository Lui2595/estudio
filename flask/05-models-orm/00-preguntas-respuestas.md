# Models / ORM — Flask + SQLAlchemy

**P: ¿N+1?**  
R: 1 query lista + N queries por relación lazy. Fix: `joinedload` / `selectinload`.

**P: ¿relationship?**  
R: Declara navegación ORM (`user.projects`) encima del FK.

**P: ¿Transacción?**  
R: Varias escrituras + un `commit`; si falla, `rollback` (o context que lo haga).

**P: ¿Migraciones en Flask?**  
R: **Flask-Migrate** (wrapper) + **Alembic** (motor).  
Flujo: cambias el model → `flask db migrate -m "..."` → revisas `upgrade()`/`downgrade()` en `migrations/versions/` → `flask db upgrade`.

**P: ¿Dónde se “escribe” la migración?**  
R: En el `.py` de Alembic: funciones `upgrade()` y `downgrade()` con `op.create_table`, `op.add_column`, etc. Autogenerate las crea; tú las editas si hace falta.

Ver: `02-migrations-alembic.md` · `03-alembic-revision-example.py` · `04-migrate-wiring.py`
