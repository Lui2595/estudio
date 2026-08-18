# Preguntas y Respuestas — Variables y Tipos

> Review rápido sin código. Respóndelas en voz alta como en entrevista.

---

**P: ¿Qué hace `declare(strict_types=1)`?**
R: Activa tipado estricto en ese archivo. PHP deja de hacer coerción implícita (`"5"` ya no se convierte a `5` automáticamente en parámetros tipados).

---

**P: ¿Para qué sirve el type hinting?**
R: Declara tipos en parámetros, retornos y propiedades. Mejora legibilidad, autocompletado del IDE y detecta errores antes de ejecutar.

---

**P: ¿Qué es un union type (`int|string`)?**
R: Un parámetro o retorno que acepta más de un tipo. Útil cuando un ID puede venir como entero de BD o string de URL.

---

**P: ¿Qué significa `?User` o `User|null`?**
R: Tipo nullable: el valor puede ser una instancia de `User` o `null`. Común en métodos que pueden no encontrar resultado.

---

**P: ¿Cuál es la diferencia entre casting `(int)` e `intval()`?**
R: `(int)` es conversión explícita simple. `intval()` es función que además acepta base numérica (ej. hexadecimal). Ambos truncan decimales.

---

**P: ¿Cuándo usarías tipado estricto en un proyecto Laravel?**
R: En código de dominio, services y DTOs donde la precisión de tipos previene bugs. Laravel mismo no lo usa en todo el core, pero es buena práctica en tu código de aplicación.
