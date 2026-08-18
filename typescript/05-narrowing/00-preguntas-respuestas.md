# Preguntas y Respuestas — Narrowing y Type Guards

> Review rápido sin código.

---

**P: ¿Qué es narrowing?**
R: Reducir un union type a uno más específico mediante checks. TS infiere el tipo dentro de cada rama.

---

**P: ¿Qué es type guard?**
R: Función que retorna `value is Type`. `if (isFish(pet))` → TS sabe que pet es Fish dentro del if.

---

**P: typeof vs instanceof vs in?**
R: typeof: primitivos. instanceof: clases/constructors. in: verificar propiedad en objeto.

---

**P: ¿Discriminated union en switch?**
R: Switch sobre campo literal (`status`). Cada case narrowa automáticamente. `default` con `never` verifica exhaustividad.

---

**P: ¿asserts value is T?**
R: Assertion function que lanza si falla. Después de llamarla, TS trata el valor como T.

---

**P: ¿Por qué narrowing importa en React?**
R: State con union `{ loading } | { data } | { error }` requiere narrowing para renderizar UI correcta sin runtime errors.
