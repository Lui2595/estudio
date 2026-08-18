# Preguntas y Respuestas — Arquitectura Express

> Review rápido sin código.

---

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
