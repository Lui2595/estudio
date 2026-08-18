# Templates — Django

**P: ¿extends / block?**  
R: Layout base con bloques; templates hijos rellenan `{% block content %}`.

**P: ¿Cuándo no usar templates?**  
R: SPA React + DRF: el backend es JSON; templates opcionales (admin sí los usa).

**P: ¿context?**  
R: Dict de datos que la view pasa al template (`{"projects": qs}`).
