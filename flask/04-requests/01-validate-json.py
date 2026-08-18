"""
TEMA: Leer JSON + validación mínima → 422
"""

from flask import request


def parse_create_task() -> tuple[dict | None, dict | None]:
    data = request.get_json(silent=True) or {}
    errors: dict[str, str] = {}
    title = (data.get("title") or "").strip()
    if len(title) < 3:
        errors["title"] = "min 3 chars"
    if errors:
        return None, errors
    return {"title": title}, None
