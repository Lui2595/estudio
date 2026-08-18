"""
TEMA: Routes + converters + Blueprint
"""

from flask import Blueprint, Flask

api_bp = Blueprint("api", __name__)


@api_bp.get("/projects")
def list_projects():
    return {"data": []}, 200


@api_bp.get("/projects/<int:project_id>")
def get_project(project_id: int):
    return {"id": project_id}, 200


def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(api_bp, url_prefix="/api")
    return app
