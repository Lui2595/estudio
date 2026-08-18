# Preguntas y Respuestas — Generics

> Review rápido sin código.

---

**P: ¿Para qué sirven los genéricos?**
R: Reutilizar lógica manteniendo type safety. Una función/clase que funciona con múltiples tipos sin perder información del tipo.

---

**P: ¿Qué hace `extends` en genéricos?**
R: Restringe T a tipos que cumplan una forma mínima. `T extends HasId` garantiza que T tiene `id`.

---

**P: ¿Qué es `keyof T`?**
R: Union de todas las keys de T como strings literales. Base de tipos seguros para acceder propiedades dinámicamente.

---

**P: ¿Genéricos en React?**
R: `List<T>`, `useState<User>()`, `useFetch<T>()`. Permiten componentes y hooks reutilizables con tipos precisos.

---

**P: ¿Default type parameters?**
R: `Paginated<T, M = DefaultMeta>` — M es opcional y usa default si no se especifica.

---

**P: ¿Generic constraint vs any?**
R: Constraint mantiene relación de tipos. `any` pierde toda información. Siempre preferir constraint.
