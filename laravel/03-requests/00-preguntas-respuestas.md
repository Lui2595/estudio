# Preguntas y Respuestas — Form Requests y Validación

> Review rápido sin código.

---

**P: ¿Para qué sirve un Form Request?**
R: Separa validación y autorización del controller. Clase dedicada con `rules()`, `messages()` y `authorize()`.

---

**P: ¿Dónde va la autorización: middleware o Form Request?**
R: Middleware para auth general (¿está logueado?). Form Request para autorización específica del recurso (¿puede editar ESTE post?).

---

**P: ¿Cómo crear una regla de validación custom?**
R: Clase que implementa `ValidationRule` con método `validate()`. Reutilizable en múltiples Form Requests.

---

**P: ¿Validación en Form Request vs en Service?**
R: Form Request: formato y reglas de entrada HTTP. Service: reglas de negocio (email único, stock disponible, saldo suficiente).

---

**P: ¿Qué es `Rule::in()` y cuándo usarlo?**
R: Valida que el valor esté en una lista permitida. Ej: status solo puede ser draft, published, archived.

---

**P: ¿Cómo retornar errores de validación en API?**
R: Laravel automáticamente retorna 422 con JSON `{ message, errors: { field: [messages] } }` si el request espera JSON.
