/**
 * TEMA: Express.js — Fundamentos
 * ENTREVISTA: ¿Qué es Express y cómo funciona el pipeline de middleware?
 *
 * Express es un framework minimalista sobre Node.js para APIs y servidores HTTP.
 * Cada request pasa por una cadena de middlewares: req → middleware₁ → ... → response
 */

const express = require('express');
const app = express();

// Middleware global: se ejecuta en TODAS las requests
app.use(express.json()); // Parsea body JSON
app.use(express.urlencoded({ extended: true })); // Parsea form data

// Middleware de logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // CRÍTICO: sin next() la request se queda colgada
});

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// Route params: /users/42
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

// Query string: /search?q=express&page=2
app.get('/search', (req, res) => {
  const { q, page = 1 } = req.query;
  res.json({ query: q, page: Number(page) });
});

// POST con body
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: 1, name, email });
});

// 404 handler (después de todas las rutas)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server on :${PORT}`));

module.exports = app;
