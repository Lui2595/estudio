# Fundamentos — Flask

**P: ¿Application factory?**  
R: `create_app()` crea la app, carga config, init extensions y registra blueprints. Evita circular imports y facilita tests.

**P: ¿Por qué no `app = Flask(__name__)` global en proyectos medianos?**  
R: Dificulta múltiples configs (test/prod) e imports circulares con extensions.

**P: ¿Qué es una extension?**  
R: Librería que se enlaza a la app (`db.init_app(app)`): SQLAlchemy, Migrate, CORS, JWT.
