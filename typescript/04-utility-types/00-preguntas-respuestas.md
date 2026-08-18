# Preguntas y Respuestas — Utility Types

> Review rápido sin código.

---

**P: ¿Qué hace Partial<T>?**
R: Todas las propiedades de T opcionales. Ideal para PATCH/update requests.

---

**P: ¿Pick vs Omit?**
R: Pick: selecciona propiedades específicas. Omit: excluye propiedades. `Omit<User, 'password'>` para DTOs públicos.

---

**P: ¿Qué hace Record<K, V>?**
R: Objeto con keys de tipo K y values de tipo V. Mapas tipados: `Record<'admin'|'user', string[]>`.

---

**P: ¿Qué es mapped type?**
R: Transforma cada propiedad de un tipo. `{ [K in keyof T]?: T[K] }` construye Partial manualmente.

---

**P: ¿Qué es conditional type?**
R: `T extends U ? X : Y`. Tipos que dependen de condiciones. Base de utility types avanzados y infer.

---

**P: ¿Extract vs Exclude?**
R: Extract: extrae de union los que extienden U. Exclude: elimina de union los que extienden U.

---

**P: ¿ReturnType y Parameters?**
R: Extraen tipo de retorno y parámetros de una función. Útiles para inferir tipos de librerías externas.
