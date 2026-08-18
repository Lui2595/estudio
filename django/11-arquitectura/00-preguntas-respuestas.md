# Arquitectura Django — modularizar

**P: ¿Por qué service layer?**  
R: View = HTTP. Service = negocio reutilizable (API, Celery, command). Tests sin `APIClient`.

**P: ¿Monolito 3000 líneas?**  
R: Cortar por responsabilidad: `models / serializers / services / views / tests`. Primero extrae services.

**P: ¿Cuándo NO modularizar?**  
R: CRUD chico. Un archivo por verbo HTTP es over-engineering (YAGNI).

Ver: `01-service-layer.py` · Pack entrevista: `../../entrevistas/django-react-fastapi-senior/`
