# Preguntas y Respuestas — Excepciones

> Review rápido sin código.

---

**P: ¿Cuándo usar excepciones vs return null/false?**
R: Excepciones para errores excepcionales que interrumpen el flujo. Return null/false para resultados esperados (usuario no encontrado).

---

**P: ¿Para qué crear excepciones personalizadas?**
R: Manejar errores de dominio específicos (UserNotFound, InsufficientFunds), facilitar logging, respuestas HTTP y debugging.

---

**P: ¿Qué es `Throwable`?**
R: Interface base en PHP 7+ de la que heredan tanto `Exception` como `Error`. Permite capturar cualquier error throwable con un solo catch.

---

**P: ¿Diferencia entre `Error` y `Exception`?**
R: Exception: errores de aplicación, diseñados para capturarse. Error: errores del motor PHP (TypeError, DivisionByZeroError). Antes de PHP 7, Errors eran fatales.

---

**P: ¿Para qué sirve `finally`?**
R: Bloque que siempre se ejecuta, haya o no excepción. Útil para cleanup: cerrar conexiones, liberar recursos.

---

**P: ¿Cómo maneja Laravel las excepciones globalmente?**
R: El Handler en `app/Exceptions/Handler.php` convierte excepciones en respuestas HTTP (JSON para API, vistas para web) y las reporta a logs/Sentry.
