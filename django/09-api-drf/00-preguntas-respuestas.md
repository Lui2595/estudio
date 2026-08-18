# API / DRF — Django REST Framework

**P: ¿Serializer?**  
R: Valida input y serializa output JSON. Corazón de DRF.

**P: ¿ViewSet + Router?**  
R: ViewSet define list/create/retrieve/update/destroy; DefaultRouter genera urls CRUD.

**P: ¿N+1 en list?**  
R: `get_queryset()` con `select_related`/`prefetch_related` — el serializer no lo arregla solo.

**P: ¿Lógica de negocio en el serializer?**  
R: No. Serializer = validar + shape JSON. Emails, pagos, orquestar modelos → **service**. Así reusas desde Celery/tests sin HTTP.

Código: `02-thin-serializer-service.py`
