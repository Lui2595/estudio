# Preguntas y Respuestas — Validación Express

> Review rápido sin código.

---

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
