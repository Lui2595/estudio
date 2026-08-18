# Preguntas y Respuestas — Express Routing

> Review rápido sin código.

---

**P: ¿Para qué express.Router()?**
R: Mini-app montable en path. Modulariza rutas por recurso: usersRouter, postsRouter. Mantiene app.js limpio.

---

**P: mergeParams: true?**
R: Router hijo hereda params del padre. `/users/:userId/posts` → postsRouter accede req.params.userId.

---

**P: Orden de rutas importa?**
R: Sí. `/users/new` debe ir ANTES de `/users/:id` o "new" se interpreta como id.

---

**P: app.use vs app.get?**
R: app.use: cualquier método HTTP (o middleware sin método). app.get/post/put/delete: método específico.

---

**P: ¿Versionado API?**
R: Prefix `/api/v1/` o header Accept-Version. v1/v2 coexisten durante migración.

---

**P: REST verbs mapping?**
R: GET read, POST create, PUT replace, PATCH partial update, DELETE remove. Status codes apropiados (201 create, 204 delete).
