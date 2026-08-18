# API — Flask

**P: ¿Cómo estructurar API REST?**  
R: Blueprint `/api` + recursos (`/projects`, `/projects/<id>/tasks`) + status codes correctos.

**P: ¿CORS?**  
R: SPA en otro origin necesita `Access-Control-Allow-*`. `flask-cors` en dev; lista blanca en prod.

**P: ¿No filtrar existencia de recursos ajenos?**  
R: A veces se responde **404** (no 403) para no filtrar IDs de otros usuarios.
