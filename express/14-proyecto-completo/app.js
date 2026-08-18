/**
 * TEMA: App completa de referencia — estructura producción
 * Une todos los conceptos en un entry point típico.
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const { NotFoundError, asyncHandler } = require('../04-errores/01-async-error-handling');
const { verifyAccessToken } = require('../07-auth/01-jwt');

// Routers
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');

const app = express();

// ─── Global middleware ────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '10kb' }));

// Health check (sin auth, para load balancers)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', verifyAccessToken, userRoutes);

// ─── 404 ──────────────────────────────────────────────────
app.use((req, res, next) => {
  next(new NotFoundError('Ruta'));
});

// ─── Error handler (SIEMPRE último) ───────────────────────
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(`[${status}] ${err.message}`);

  res.status(status).json({
    error: {
      message: status === 500 ? 'Error interno del servidor' : err.message,
      status,
    },
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
