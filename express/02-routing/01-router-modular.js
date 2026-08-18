/**
 * TEMA: Router — Modularización de rutas
 * ENTREVISTA: ¿Cómo organizar rutas en una app Express grande?
 *
 * express.Router() crea mini-apps montables en paths.
 * Patrón estándar: routes/ → controllers/ → services/
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

// mergeParams: hereda params del router padre
// Ej: app.use('/users/:userId/posts', postsRouter)
//     → req.params.userId disponible en postsRouter

// Middleware solo para este router
router.use((req, res, next) => {
  req.requestedAt = new Date();
  next();
});

// GET /posts
router.get('/', (req, res) => {
  res.json({ posts: [], requestedAt: req.requestedAt });
});

// GET /posts/:id
router.get('/:id', (req, res) => {
  res.json({ postId: req.params.id });
});

// POST /posts
router.post('/', (req, res) => {
  res.status(201).json({ ...req.body, id: Date.now() });
});

// PUT /posts/:id
router.put('/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

// PATCH /posts/:id
router.patch('/:id', (req, res) => {
  res.json({ id: req.params.id, updated: req.body });
});

// DELETE /posts/:id
router.delete('/:id', (req, res) => {
  res.status(204).send();
});

module.exports = router;

// En app.js:
// const postsRouter = require('./routes/posts');
// app.use('/api/v1/posts', postsRouter);
