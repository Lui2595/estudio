# Preguntas y Respuestas — TypeScript Fundamentos

> Review rápido sin código.

---

**P: ¿Cuándo anotar tipos explícitamente?**
R: Cuando inferencia es ambigua (array vacío), en APIs públicas, o cuando quieres contrato explícito. Si inferencia es clara, déjala.

---

**P: ¿any vs unknown?**
R: `any` desactiva el chequeo — evitar. `unknown` es tipo seguro para valores desconocidos; obliga a validar antes de usar.

---

**P: ¿Qué es never?**
R: Valores que nunca ocurren. Funciones que siempre lanzan, loops infinitos, o verificar exhaustividad en switch.

---

**P: ¿Qué es void?**
R: Retorno de funciones que no retornan valor útil. Diferente de undefined en strict mode.

---

**P: ¿Tupla vs Array?**
R: Tupla: longitud y tipos fijos `[string, number]`. Array: longitud variable del mismo tipo `number[]`.

---

**P: ¿Por qué TypeScript sobre JavaScript en proyectos React Senior?**
R: Detecta errores en compile, autocompletado, refactoring seguro, contratos en props/APIs, documentación viva del código.
