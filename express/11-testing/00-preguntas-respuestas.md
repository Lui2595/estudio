# Preguntas y Respuestas — Testing Express

> Review rápido sin código.

---

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
