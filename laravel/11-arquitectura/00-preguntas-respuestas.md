# Preguntas y Respuestas — Arquitectura Laravel

> Review rápido sin código.

---

**P: ¿Repository Pattern en Laravel: siempre?**
R: No obligatorio. Eloquent ya abstrae datos. Útil si intercambias fuentes, tests sin BD, o queries muy complejas centralizadas.

---

**P: ¿Qué es Service Layer?**
R: Clases con lógica de negocio (`UserService`, `OrderService`). Controllers delegan aquí. Más granular que un controller gordo.

---

**P: ¿Qué es Actions Pattern?**
R: Una clase = una acción (`CreatePostAction`). Método único `handle()` o `__invoke()`. Más granular que service con 20 métodos.

---

**P: ¿Actions vs Services?**
R: Actions: operaciones atómicas y específicas. Services: agrupan operaciones relacionadas de un dominio. Ambos válidos; Actions más explícitos.

---

**P: ¿Dónde va la lógica de negocio en Laravel?**
R: Services, Actions, o Domain classes. Nunca en controllers, middleware, o models gordos (salvo scopes/accessors simples).

---

**P: ¿Cómo organizar carpetas en app grande?**
R: Por feature (`app/Features/Orders/`) o por capa (`Controllers/Services/Repositories`). Feature-based escala mejor en equipos grandes.
