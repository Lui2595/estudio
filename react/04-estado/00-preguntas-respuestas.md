# Preguntas y Respuestas — Estado Global

> Review rápido sin código.

---

**P: Local vs Global state?**
R: Local: pertenece a un componente (form input, toggle). Global: compartido entre muchos componentes (user auth, cart, theme).

---

**P: ¿Cuándo Context API?**
R: Pocos valores, cambios poco frecuentes. Theme, locale, auth básico. Evitar para state que cambia mucho (re-render masivo).

---

**P: Redux vs Zustand?**
R: Redux: predecible, DevTools, middleware, más boilerplate. Zustand: minimal, menos código, hooks nativos, suficiente para mayoría de apps.

---

**P: ¿Problema de re-renders con Context?**
R: Cualquier cambio en value re-renderiza TODOS los consumidores. Solución: dividir contexts o usar selectors (Zustand).

---

**P: ¿Server state vs Client state?**
R: Server: datos de API (React Query los maneja). Client: UI state local (modals, forms, filters). No mezclar en Redux innecesariamente.

---

**P: ¿Lifting state up?**
R: Subir state al ancestro común más cercano cuando hermanos necesitan compartirlo. Antes de saltar a global.
