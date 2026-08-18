# Preguntas y Respuestas — REST API Express

> Review rápido sin código.

---

**P: PUT vs PATCH?**
R: PUT reemplaza recurso completo (envías todos los campos). PATCH actualiza parcialmente (solo campos enviados).

---

**P: Códigos HTTP esenciales?**
R: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Validation, 429 Rate Limit, 500 Internal Error.

---

**P: ¿DELETE retorna qué?**
R: 204 No Content sin body es estándar. 200 con deleted entity también válido.

---

**P: Paginación estándar?**
R: `{ data: [], meta: { page, limit, total, totalPages }, links: { next, prev } }`. Query ?page=1&limit=20.

---

**P: ¿Idempotencia?**
R: GET, PUT, DELETE idempotentes (misma request = mismo resultado). POST no idempotente (crea duplicados si repites).

---

**P: Error response consistente?**
R: `{ error: { message, status, details? } }`. Misma forma en toda la API facilita frontend.

---

**P: Location header en POST?**
R: 201 Created debería incluir Location: /api/users/123 apuntando al recurso creado.
