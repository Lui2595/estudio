# Preguntas y Respuestas — Vue Router

> Review rápido sin código.

---

**P: ¿Navigation guards?**
R: beforeEach, beforeEnter, beforeResolve, afterEach. Validar auth, redirigir, cargar data antes de entrar a ruta.

---

**P: ¿Lazy loading rutas?**
R: `component: () => import('./View.vue')`. Code splitting automático por ruta.

---

**P: props: true en ruta?**
R: Pasa params de URL como props al componente. `/users/:id` → prop `id` en UserDetail.

---

**P: createWebHistory vs createWebHashHistory?**
R: History: URLs limpias /users/1 (requiere server config). Hash: /#/users/1, sin config servidor.

---

**P: ¿Router vs Nuxt file-based routing?**
R: Vue Router: configuración manual en router.js. Nuxt: pages/ genera rutas automáticamente.

---

**P: scrollBehavior?**
R: Controlar scroll al navegar: top, posición guardada, o scroll a anchor.
