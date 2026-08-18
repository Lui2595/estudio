# Express.js en stack Laravel + React

## Arquitecturas comunes

### 1. Laravel como API principal (más común)
```
React (frontend) → Laravel API (Sanctum/Passport) → MySQL/PostgreSQL
```
Express **no es necesario** si Laravel cubre todo el backend.

### 2. Microservicios con Express
```
React → Laravel (auth, CRUD principal)
      → Express (WebSockets, procesamiento PDF, ML, scraping)
      → MongoDB (logs, analytics)
```

### 3. BFF (Backend for Frontend)
```
React → Express BFF → Laravel API + servicios externos
```
Express agrega/transforma data específica para el frontend.

### 4. SSR con Next.js (sin Express directo)
Next.js tiene su propio servidor. Express se usa para APIs custom o middleware.

## Cuándo usar Express vs Laravel

| Criterio | Express | Laravel |
|----------|---------|---------|
| Lenguaje | JavaScript/TypeScript | PHP |
| Ecosistema npm | Enorme | Composer |
| ORM | Prisma, Sequelize, Mongoose | Eloquent |
| Auth | Manual / Passport.js | Sanctum, Breeze, Fortify |
| Real-time | Socket.io nativo | Laravel Reverb, Pusher |
| Colas | Bull, BullMQ | Horizon (Redis) |
| Velocidad desarrollo CRUD | Media | Alta |
| WebSockets / streaming | Excelente | Bueno |
| Equipo full-stack JS | Ideal | Requiere PHP |

## Express vs alternativas

| Framework | Cuándo |
|-----------|--------|
| **Express** | Estándar, ecosistema masivo, flexibilidad |
| **Fastify** | Más rápido, schema validation nativo |
| **NestJS** | Arquitectura Angular-like, DI, TypeScript first |
| **Hono** | Edge/serverless, ultra ligero |
| **Koa** | Middleware async nativo (creado por equipo Express) |

## Pregunta típica Senior

> "¿Cómo estructurarías un proyecto Express para producción?"

```
src/
├── app.js              → Express setup, middleware global
├── server.js           → listen + cluster
├── routes/             → Routers por recurso
├── controllers/        → HTTP layer
├── services/           → Business logic
├── repositories/       → Data access (Prisma/Sequelize)
├── middleware/          → Auth, validation, error handler
├── validators/         → express-validator schemas
├── config/             → env, database, cors
└── tests/              → supertest + jest
```
