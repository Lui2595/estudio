# Auth — Flask JWT

**P: ¿Flujo JWT?**  
R: login → token → `Authorization: Bearer` → decorator decode → `g.user` / user_id.

**P: ¿401 vs 403?**  
R: 401 = no autenticado / token malo. 403 = autenticado pero sin permiso.

**P: ¿Password?**  
R: `generate_password_hash` / `check_password_hash` (werkzeug). Nunca plaintext ni devolver el hash al cliente.
