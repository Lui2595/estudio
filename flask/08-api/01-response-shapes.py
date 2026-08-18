"""
TEMA: Shape de respuestas API (estudio)
"""

# Éxito
LIST = {"data": [{"id": 1, "title": "Tracker"}]}
CREATED = ({"id": 1, "title": "Tracker"}, 201)
NO_CONTENT_STATUS = 204

# Errores
UNAUTHORIZED = ({"error": "unauthorized"}, 401)
NOT_FOUND = ({"error": "not_found"}, 404)
VALIDATION = (
    {"error": "validation", "fields": {"title": "min 3 chars"}},
    422,
)
