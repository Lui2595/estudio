"""
TEMA: Thin view — HTTP only, logic elsewhere
"""

from flask import Blueprint, jsonify, request

projects_bp = Blueprint("projects", __name__)

# Fake in-memory store for study
_PROJECTS: dict[int, dict] = {}
_NEXT_ID = 1


def create_project(title: str, owner_id: int) -> dict:
    global _NEXT_ID
    if len(title) < 3:
        raise ValueError("title min 3 chars")
    project = {"id": _NEXT_ID, "title": title, "owner_id": owner_id}
    _PROJECTS[_NEXT_ID] = project
    _NEXT_ID += 1
    return project


@projects_bp.post("")
def store():
    body = request.get_json(silent=True) or {}
    title = (body.get("title") or "").strip()
    try:
        project = create_project(title, owner_id=1)
    except ValueError as e:
        return jsonify({"error": "validation", "detail": str(e)}), 422
    return jsonify(project), 201
