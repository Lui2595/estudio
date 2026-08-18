# Preguntas y Respuestas — Routing

> Review rápido sin código.

---

**P: ¿Qué es Route Model Binding?**
R: Laravel resuelve automáticamente un modelo Eloquent desde el parámetro de ruta. `/users/{user}` inyecta el User o 404 si no existe.

---

**P: ¿Qué hace un Middleware?**
R: Filtra/modifica requests antes de llegar al controller. Ej: auth, throttle, CORS, verificar rol.

---

**P: ¿Qué genera `Route::resource('posts', PostController::class)`?**
R: 7 rutas REST: index, create, store, show, edit, update, destroy. `apiResource` omite create/edit.

---

**P: ¿Qué es un Single Action Controller?**
R: Controller con un solo método `__invoke()`. Ideal para acciones específicas: `ShowUserProfileController`.

---

**P: ¿Cómo proteger rutas API con Sanctum?**
R: Middleware `auth:sanctum` en rutas o grupos. El cliente envía `Authorization: Bearer {token}`.

---

**P: ¿Qué es rate limiting en rutas?**
R: Limitar requests por minuto por IP o usuario. `throttle:60,1` = 60 requests por minuto. Previene abuso y brute force.

---

**P: ¿Binding personalizado por slug?**
R: `{post:slug}` en la ruta. Laravel busca por columna slug en lugar de id.
