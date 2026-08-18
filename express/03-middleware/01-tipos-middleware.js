/**
 * TEMA: Middleware — Tipos y orden de ejecución
 * ENTREVISTA: ¿Cuál es la diferencia entre app.use() y app.get()?
 *
 * app.use(path?, fn): middleware para cualquier método HTTP
 * app.METHOD(path, fn): solo para GET, POST, PUT, etc.
 *
 * Orden importa: se ejecutan en el orden que se registran.
 */

const express = require('express');
const app = express();

// 1. Application-level middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  // Simulación de verificación JWT
  req.user = { id: 1, role: 'admin' };
  next();
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: 'Sin permisos' });
    }
    next();
  };
}

// 2. Router-level middleware (solo en rutas específicas)
app.get('/public', (req, res) => {
  res.json({ message: 'Acceso público' });
});

app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.delete('/users/:id', authenticate, authorize('admin'), (req, res) => {
  res.status(204).send();
});

// 3. Error-handling middleware (4 parámetros: err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
});

// 4. Built-in middleware
// express.static('public')  → servir archivos estáticos
// express.json()            → parse JSON body
// express.raw()             → body como Buffer

module.exports = { authenticate, authorize };
