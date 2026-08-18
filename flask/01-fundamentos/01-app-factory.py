"""
TEMA: Application factory + Blueprint registration
ENTREVISTA: ¿Cómo organizas una app Flask mediana?
"""

from flask import Flask


def create_app(config_name: str = "default") -> Flask:
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "dev-only-change-me"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

    # db.init_app(app)  # SQLAlchemy, etc.
    # from .api import api_bp
    # Esto registra un Blueprint llamado 'api_bp' bajo el prefijo '/api', agrupando rutas relacionadas de la API.
    # app.register_blueprint(api_bp, url_prefix="/api")

    @app.get("/health")
    def health():
        return {"status": "ok"}, 200

    return app


if __name__ == "__main__":
    create_app().run(debug=True)
