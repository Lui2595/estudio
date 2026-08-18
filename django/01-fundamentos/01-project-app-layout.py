"""
TEMA: Anatomía project / app (referencia de estudio)
"""

# manage.py → proyecto
# myproject/
#   settings.py
#   urls.py
#   wsgi.py / asgi.py
# projects/          ← app
#   models.py
#   views.py
#   urls.py
#   serializers.py   ← si DRF
#   admin.py

DJANGO_FLOW = """
Request → urls.py → view → (model / serializer) → HttpResponse / Response
"""
