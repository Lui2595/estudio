# Preguntas y Respuestas — Controllers

> Review rápido sin código.

---

**P: ¿Qué responsabilidad tiene un Controller?**
R: Capa HTTP: recibir request, delegar a service/action, retornar response. NO debe tener lógica de negocio compleja.

---

**P: Resource Controller vs Single Action: ¿cuándo cada uno?**
R: Resource para CRUD completo de un recurso. Single Action para una operación específica (export PDF, toggle status).

---

**P: ¿Por qué inyectar services en el constructor del controller?**
R: Laravel resuelve automáticamente del container. Facilita testing y mantiene controllers delgados.

---

**P: ¿Qué retorna un controller de API típicamente?**
R: API Resource, Resource Collection, `response()->json()`, o `response()->noContent()` para DELETE.

---

**P: ¿Controller gordo ("fat controller"): por qué evitarlo?**
R: Difícil de testear, viola SRP, lógica duplicada. Mover a Services, Actions o Jobs.
