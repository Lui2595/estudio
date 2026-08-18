/**
 * TEMA: Seguridad en Express
 * ENTREVISTA: ¿Cómo proteger una API Express en producción?
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// 1. Helmet: headers de seguridad HTTP
app.use(helmet());
// X-Content-Type-Options, X-Frame-Options, CSP, HSTS, etc.

// 2. CORS: controlar orígenes permitidos
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Permite cookies cross-origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 3. Rate Limiting: prevenir brute force / DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: { error: 'Demasiadas requests, intenta más tarde' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Solo 5 intentos de login
  message: { error: 'Demasiados intentos de login' },
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);

// 4. Limitar tamaño del body (prevenir payloads enormes)
app.use(express.json({ limit: '10kb' }));

// 5. Sanitización: express-validator escapa HTML
// npm install express-mongo-sanitize (previene NoSQL injection en MongoDB)

// 6. No exponer stack traces en producción
app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    error: err.message,
    ...(isDev && { stack: err.stack }),
  });
});

// Checklist producción:
// ✓ helmet, cors, rate-limit
// ✓ HTTPS (nginx/reverse proxy)
// ✓ Variables de entorno para secrets (nunca hardcodear JWT secrets)
// ✓ Validar y sanitizar TODA entrada
// ✓ Prepared statements / ORM (Prisma, Sequelize) contra SQL injection
// ✓ httpOnly + secure + sameSite cookies
// ✓ npm audit / dependabot

module.exports = app;
