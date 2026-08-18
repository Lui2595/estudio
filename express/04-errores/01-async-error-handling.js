/**
 * TEMA: Manejo de errores async
 * ENTREVISTA: ¿Por qué un error en async/await no llega al error middleware?
 *
 * Express 4 NO captura rejections de Promises automáticamente.
 * Soluciones: try/catch, wrapper, Express 5 (nativo).
 */

const express = require('express');
const app = express();

// PROBLEMA: error no capturado
// app.get('/bad', async (req, res) => {
//   throw new Error('Boom'); // UnhandledPromiseRejection
// });

// SOLUCIÓN 1: try/catch manual
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await findUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    next(error); // Pasa al error middleware
  }
});

// SOLUCIÓN 2: Wrapper reutilizable (patrón más limpio)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/posts/:id', asyncHandler(async (req, res) => {
  const post = await findPost(req.params.id);
  if (!post) {
    const error = new Error('Post no encontrado');
    error.status = 404;
    throw error;
  }
  res.json(post);
}));

// Error middleware centralizado (SIEMPRE al final)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 500 ? 'Error interno' : err.message;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({ error: message });
});

// Clases de error personalizadas
class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = 'AppError';
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Recurso') {
    super(`${resource} no encontrado`, 404);
  }
}

async function findUser(id) {
  if (id === '0') throw new AppError('ID inválido', 400);
  if (id === '999') return null;
  return { id, name: 'Ana' };
}

async function findPost(id) {
  if (id === '999') return null;
  return { id, title: 'Mi post' };
}

module.exports = { app, asyncHandler, AppError, NotFoundError };
