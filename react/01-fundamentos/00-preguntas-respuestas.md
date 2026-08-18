# Preguntas y Respuestas — React Fundamentos

> Review rápido sin código.

---

**P: ¿Qué es JSX?**
R: Sintaxis que parece HTML en JS. Se compila a `React.createElement()`. Expresiones JS van entre `{}`.

---

**P: Props vs State?**
R: Props: datos del padre, read-only. State: datos internos del componente, mutables via setState/setter.

---

**P: ¿Qué provoca un re-render?**
R: Cambio de state, cambio de props del padre, cambio de context consumido, o re-render del padre (hijos re-renderizan por defecto).

---

**P: ¿Componente controlado vs props drilling?**
R: Controlado: valor en state de React. Props drilling: pasar props por muchos niveles — solucionar con Context o state management.

---

**P: ¿Functional vs Class components hoy?**
R: Functional + hooks es el estándar. Class solo en legacy. Hooks no existen en classes.

---

**P: ¿Por qué no mutar state directamente?**
R: React compara referencias. Mutar no dispara re-render ni permite detectar cambios correctamente.
