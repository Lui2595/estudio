"""
TEMA: Decorator JWT (patrón de entrevista)
Referencia real: code-challenges/01-python-task-api/solution/
"""

from functools import wraps

import jwt
from flask import g, jsonify, request

SECRET = "dev-secret"


def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return jsonify({"error": "unauthorized"}), 401
        token = auth.removeprefix("Bearer ").strip()
        try:
            payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        except jwt.PyJWTError:
            return jsonify({"error": "unauthorized"}), 401
        g.user_id = payload.get("sub")
        return fn(*args, **kwargs)

    return wrapper


@token_required
def me():
    return {"user_id": g.user_id}, 200
