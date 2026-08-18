# Preguntas y Respuestas — this

> Review rápido sin código. **Tema clásico de entrevista.**

---

**P: ¿Qué es `this` en JavaScript?**
R: Referencia al contexto de ejecución. Depende de CÓMO se llama la función, no dónde se define.

---

**P: ¿Cómo cambia `this` en Arrow Functions?**
R: Arrow functions NO tienen propio `this`. Heredan `this` del scope padre (lexical). No usar arrows como métodos de objeto si necesitas `this` del objeto.

---

**P: `this` en método de objeto vs callback?**
R: Método: `this` = objeto. Callback (setTimeout, addEventListener con function): `this` = window/global o undefined en strict mode.

---

**P: ¿Para qué sirven call, apply, bind?**
R: Cambiar `this` explícitamente. `call/apply` ejecutan inmediatamente. `bind` retorna nueva función con `this` fijo.

---

**P: ¿this en clases ES6?**
R: Métodos de clase usan `this` de la instancia. Bind en constructor si pasas método como callback.

---

**P: ¿this en React class components?**
R: Bind manual en constructor o arrow methods. En functional components no existe `this`; usas hooks.
