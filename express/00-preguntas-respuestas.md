# Preguntas y Respuestas — Express.js (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 14 |

---

## 01-fundamentos

**P: ¿Qué es Express?**
R: Framework minimalista Node.js para HTTP APIs y servidores. Middleware pipeline: req pasa por cadena hasta response.

---

**P: ¿Qué pasa si olvidas next()?**
R: Request se queda colgada sin respuesta. Cliente timeout. Siempre llamar next() o enviar response.

---

**P: req.params vs req.query vs req.body?**
R: params: segmentos URL (/users/:id). query: ?page=1&limit=10. body: payload POST/PUT/PATCH (requiere json parser).

---

**P: express.json() para qué?**
R: Middleware que parsea body JSON y lo pone en req.body. Sin él, req.body es undefined.

---

**P: ¿Express incluye routing?**
R: Sí básico. express.Router() para modularizar. No incluye ORM, auth, validation — tú los agregas.

---

**P: ¿Express vs Node http module?**
R: http es primitivo. Express añade routing, middleware, simplifica APIs. Fastify/NestJS son alternativas más estructuradas.

---

## 02-routing

**P: ¿Para qué express.Router()?**
R: Mini-app montable en path. Modulariza rutas por recurso: usersRouter, postsRouter. Mantiene app.js limpio.

---

**P: mergeParams: true?**
R: Router hijo hereda params del padre. `/users/:userId/posts` → postsRouter accede req.params.userId.

---

**P: Orden de rutas importa?**
R: Sí. `/users/new` debe ir ANTES de `/users/:id` o "new" se interpreta como id.

---

**P: app.use vs app.get?**
R: app.use: cualquier método HTTP (o middleware sin método). app.get/post/put/delete: método específico.

---

**P: ¿Versionado API?**
R: Prefix `/api/v1/` o header Accept-Version. v1/v2 coexisten durante migración.

---

**P: REST verbs mapping?**
R: GET read, POST create, PUT replace, PATCH partial update, DELETE remove. Status codes apropiados (201 create, 204 delete).

---

## 03-middleware

**P: Tipos de middleware?**
R: Application-level (global), Router-level (ruta específica), Error-handling (4 params: err, req, res, next), Built-in (json, static).

---

**P: Middleware auth pattern?**
R: Verificar token/session, attach user a req, next() o 401. Composable: authenticate → authorize('admin') → controller.

---

**P: ¿Middleware vs interceptor?**
R: Concepto similar. Express middleware es cadena síncrona/async. Axios interceptors para HTTP client, no server.

---

**P: ¿Cuántos middleware en una ruta?**
R: Ilimitados encadenados: `router.post('/', validate, authenticate, controller)`. Cada uno next() al siguiente.

---

**P: Error middleware: ¿por qué 4 parámetros?**
R: Express detecta error handler por firma (err, req, res, next). Debe ir al final de la app, después de rutas.

---

**P: express.static?**
R: Sirve archivos estáticos (public/). En producción preferir Nginx/CDN para assets.

---

## 04-errores

**P: ¿Por qué throw en async no llega al error handler?**
R: Express 4 no captura Promise rejections automáticamente. Error queda como UnhandledPromiseRejection.

---

**P: Soluciones?**
R: try/catch + next(error), wrapper asyncHandler(fn), o Express 5 (captura nativa).

---

**P: ¿Qué hace asyncHandler?**
R: Wrapper que hace Promise.resolve(fn()).catch(next). Centraliza manejo de errores async.

---

**P: AppError personalizada?**
R: Clase con status code. Error middleware lee err.status para respuesta HTTP apropiada.

---

**P: ¿Exponer stack trace en producción?**
R: Nunca al cliente. Solo en logs internos. Respuesta genérica "Error interno" para 500.

---

**P: 404 vs 500 handling?**
R: 404: middleware después de rutas lanza NotFoundError. 500: errores no previstos. Diferentes mensajes y logging.

---

**P: ¿next(error) vs throw?**
R: En sync handler, ambos funcionan si hay error middleware. En async Express 4, solo next(error) o asyncHandler captura throw.

---

## 05-arquitectura

**P: ¿Dónde va lógica de negocio?**
R: Services. Controllers solo HTTP: parse request, call service, format response.

---

**P: Controller vs Service vs Repository?**
R: Controller: HTTP layer. Service: business rules. Repository: data access. Misma separación que Laravel.

---

**P: ¿Fat controller en Express?**
R: Mismo anti-patrón que Laravel. Dificulta testing y reutilización. Extraer a services/actions.

---

**P: ¿Inyección de dependencias en Express?**
R: Manual en constructor o usar awilix/tsyringe en apps grandes. Laravel lo hace automático con container.

---

**P: Estructura carpetas producción?**
R: routes/, controllers/, services/, repositories/, middleware/, validators/, config/, tests/.

---

**P: ¿Express necesita ORM?**
R: No incluido. Prisma, Sequelize, Mongoose según BD. Laravel trae Eloquent integrado.

---

## 06-validacion

**P: express-validator: ¿dónde validar?**
R: Middleware antes del controller. rules() en chain, validationResult() para errores.

---

**P: Validación middleware vs service?**
R: Middleware: formato HTTP (email válido, required, max length). Service: reglas negocio (email único, stock).

---

**P: ¿Respuesta 422?**
R: Unprocessable Entity estándar para errores de validación. JSON con field-level errors.

---

**P: sanitize vs validate?**
R: Validate: rechaza input inválido. Sanitize: limpia/transforma (trim, escape HTML). express-validator hace ambos.

---

**P: ¿Alternativas?**
R: Joi, Zod, Yup schemas. Zod popular con TypeScript por inferencia de tipos.

---

**P: ¿Validar params de URL?**
R: param('id').isInt() en express-validator. Params también son input attackable.

---

## 07-auth

**P: Access vs Refresh token?**
R: Access: corta duración (15min), en Authorization header. Refresh: larga (7d), httpOnly cookie, renueva access.

---

**P: JWT en header vs cookie?**
R: Header: stateless API, mobile, SPAs cross-domain. Cookie httpOnly: más seguro contra XSS robo de token (no accesible desde JS).

---

**P: ¿Cómo revocar JWT?**
R: JWT es stateless — no revocable sin blacklist en Redis o tokens cortos + refresh rotativo. Sanctum/Laravel maneja esto en BD.

---

**P: Bearer token format?**
R: `Authorization: Bearer eyJhbG...`. Middleware extrae y verifica con jwt.verify().

---

**P: TokenExpiredError handling?**
R: Retornar 401 con mensaje claro. Cliente usa refresh token para obtener nuevo access.

---

**P: Express auth vs Laravel Sanctum?**
R: Sanctum integrado, tokens en BD, SPA cookies. Express: implementación manual o Passport.js para OAuth2.

---

## 08-seguridad

**P: ¿Qué hace Helmet?**
R: Setea HTTP security headers: X-Content-Type-Options, X-Frame-Options, CSP, HSTS. Protección básica automática.

---

**P: CORS: ¿por qué configurar?**
R: Browser bloquea requests cross-origin sin headers CORS. Configurar origin permitido (frontend URL), no `*` con credentials.

---

**P: Rate limiting por qué?**
R: Prevenir brute force login, DDoS básico, abuso API. express-rate-limit por IP o usuario autenticado.

---

**P: ¿Limit body size?**
R: express.json({ limit: '10kb' }) previene payloads enormes que consumen memoria.

---

**P: SQL injection en Express?**
R: Usar ORM/prepared statements. Nunca concatenar req.body en queries raw.

---

**P: Checklist seguridad API?**
R: Helmet, CORS restrictivo, rate limit, validación input, HTTPS, secrets en env, no stack traces en prod, httpOnly cookies.

---

**P: XSS en API JSON?**
R: API retorna JSON, no HTML — XSS es problema del frontend al renderizar. Sanitizar si retornas HTML.

---

## 09-rest-api

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

---

## 10-uploads

**P: ¿Qué hace Multer?**
R: Middleware para multipart/form-data (file uploads). single(), array(), fields() según cantidad de archivos.

---

**P: ¿Validar uploads?**
R: MIME type, extensión, tamaño máximo. No confiar solo en extensión — verificar magic bytes.

---

**P: ¿Almacenar en disco vs S3?**
R: Disco local solo dev/small apps. Producción: S3/Cloudinary con multer-s3. Nunca public/ con nombres originales.

---

**P: ¿Nombre de archivo seguro?**
R: UUID/random + extensión validada. Nunca usar nombre original del usuario (path traversal, overwrite).

---

**P: memoryStorage vs diskStorage?**
R: Memory: buffer en RAM, límite estricto. Disk: escribe temporal. S3: stream directo preferido en producción.

---

**P: ¿Límite tamaño upload?**
R: Multer limits.fileSize + express.json limit + Nginx client_max_body_size. Capas de protección.

---

## 11-testing

**P: ¿Qué hace Supertest?**
R: Envía requests HTTP al app Express sin levantar servidor real. Integra con Jest/Mocha para assertions.

---

**P: ¿Testear sin BD real?**
R: Mock services/repositories. Test DB SQLite in-memory para integration tests. Nunca producción.

---

**P: ¿Qué testear en API?**
R: Status codes, JSON shape, auth required, validation errors 422, 404 not found, happy path CRUD.

---

**P: beforeAll/afterAll pattern?**
R: Setup/teardown DB de test. Migrar schema, seed data, limpiar después.

---

**P: ¿Mock JWT en tests?**
R: Generar token válido de test o mockear middleware authenticate para inyectar user fake.

---

**P: Integration vs unit en Express?**
R: Integration (Supertest): flujo HTTP completo. Unit: services aislados con mocks. Ambos necesarios.

---

**P: ¿Testear middleware aislado?**
R: Mock req, res, next objects. Verificar next() llamado o res.status().json() con valores esperados.

---

## 12-performance

**P: ¿Qué hace compression middleware?**
R: Comprime responses gzip/brotli. Reduce bandwidth. CPU trade-off mínimo en APIs JSON.

---

**P: ¿Node cluster mode?**
R: Un proceso por CPU core. Node es single-threaded; cluster aprovecha multicore. PM2 `-i max` más práctico que cluster manual.

---

**P: PM2 vs nodemon?**
R: nodemon: dev auto-restart. PM2: producción con cluster, logs, restart on crash, startup scripts.

---

**P: Cache-Control en API?**
R: Datos estáticos/config: `Cache-Control: public, max-age=300`. Datos dinámicos/user-specific: no-cache o private.

---

**P: ¿Express es el cuello de botella?**
R: Raramente. BD queries, N+1, falta índices suelen ser el problema antes que Express overhead.

---

**P: Keep-alive connections?**
R: HTTP keep-alive reduce overhead de TCP handshake. Nginx reverse proxy maneja esto bien delante de Express.

---

**P: ¿Fastify más rápido?**
R: Benchmarks muestran Fastify más rápido que Express. Express gana en ecosistema y familiaridad. Optimiza BD antes de cambiar framework.

---

## 13-stack

**P: ¿Necesitas Express con Laravel?**
R: No para CRUD/API estándar. Laravel + Sanctum cubre backend. Express para microservicios, WebSockets, BFF, o stack full JS.

---

**P: ¿Arquitectura BFF?**
R: React → Express BFF → Laravel API + servicios externos. Express agrega/transforma data específica para frontend.

---

**P: Express vs Laravel para misma API?**
R: Laravel: auth, ORM, queues, validation integrados, más rápido desarrollo PHP. Express: npm ecosystem, real-time, mismo lenguaje que React.

---

**P: ¿Microservicio Express cuándo?**
R: PDF generation, ML, scraping, WebSockets pesados, procesamiento que no encaja en PHP workers.

---

**P: Express vs NestJS?**
R: NestJS: TypeScript first, DI, módulos, similar Angular. Express: minimal, flexible, más control manual. NestJS para equipos grandes TS.

---

**P: ¿Express vs Fastify?**
R: Fastify: más rápido, schema validation nativo. Express: ecosistema masivo, más recursos/tutoriales.

---

**P: Stack híbrido típico?**
R: Laravel API principal + React SPA + Redis queues + Express solo si hay microservicio específico justificado.

---

## 14-proyecto-completo

**P: ¿Orden de setup en app.js?**
R: dotenv → helmet/cors/compression → body parsers → routes → 404 handler → error middleware (último siempre).

---

**P: ¿Health check endpoint?**
R: GET /health sin auth para load balancers y monitoring. Retorna status + timestamp.

---

**P: ¿Por qué exportar app sin listen?**
R: Permite Supertest importar app para tests sin conflicto de puerto. listen solo en server.js o if require.main.

---

**P: Variables de entorno esenciales?**
R: PORT, NODE_ENV, JWT secrets, DATABASE_URL, FRONTEND_URL (CORS). Nunca secrets hardcodeados.

---

**P: server.js vs app.js?**
R: app.js: configuración Express pura. server.js: listen, cluster, graceful shutdown. Separación testeable.

---

**P: Graceful shutdown?**
R: Capturar SIGTERM, cerrar server, terminar conexiones activas, luego exit. Importante en deploys Kubernetes/Docker.

---

**P: Checklist pre-producción?**
R: NODE_ENV=production, helmet, CORS restrictivo, rate limit, error handler sin stacks, PM2/cluster, logs estructurados, health check.

---
