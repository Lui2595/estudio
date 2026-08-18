# Preguntas y Respuestas — Express en stack Laravel + React

> Review rápido sin código.

---

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
