/**
 * TEMA: REST API Design
 * ENTREVISTA: ¿Cuándo usar PUT vs PATCH? ¿Qué códigos HTTP retornar?
 */

// ─── Convenciones REST ────────────────────────────────────
//
// GET    /users          → 200 lista
// GET    /users/:id      → 200 uno | 404 no existe
// POST   /users          → 201 creado (+ Location header)
// PUT    /users/:id      → 200 reemplazo completo | 404
// PATCH  /users/:id      → 200 actualización parcial | 404
// DELETE /users/:id      → 204 sin body | 404
//
// PUT  = reemplaza el recurso entero (envías todos los campos)
// PATCH = actualiza solo campos enviados

const express = require('express');
const router = express.Router();

// Versionado de API
// /api/v1/users  vs  Header: Accept-Version: v1

// Paginación estándar
router.get('/users', (req, res) => {
  res.json({
    data: [{ id: 1, name: 'Ana' }],
    meta: {
      page: 1,
      limit: 10,
      total: 100,
      totalPages: 10,
    },
    links: {
      self: '/api/v1/users?page=1',
      next: '/api/v1/users?page=2',
      last: '/api/v1/users?page=10',
    },
  });
});

// Filtros y sorting via query
// GET /users?role=admin&sort=-created_at&fields=id,name

// Respuesta de error consistente
function errorResponse(res, status, message, details = null) {
  return res.status(status).json({
    error: {
      message,
      status,
      ...(details && { details }),
    },
  });
}

// Códigos HTTP clave para entrevista:
// 200 OK, 201 Created, 204 No Content
// 400 Bad Request, 401 Unauthorized, 403 Forbidden
// 404 Not Found, 422 Unprocessable Entity (validación)
// 429 Too Many Requests, 500 Internal Server Error
// 502 Bad Gateway, 503 Service Unavailable

module.exports = router;
