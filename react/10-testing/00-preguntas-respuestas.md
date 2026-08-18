# Preguntas y Respuestas — Testing React

> Review rápido sin código.

---

**P: Jest vs React Testing Library?**
R: Jest: test runner, assertions, mocks. RTL: renderiza componentes y simula interacción de usuario. Van juntos.

---

**P: ¿Filosofía de RTL?**
R: "The more your tests resemble the way your software is used, the more confidence they can give you." No testear implementation details.

---

**P: getByRole vs getByTestId?**
R: Preferir getByRole (accesibilidad). getByTestId solo como último recurso.

---

**P: ¿Qué NO testear?**
R: State interno, métodos privados, implementation de hooks. Testear lo que el usuario ve y hace.

---

**P: ¿Cómo mockear fetch/API?**
R: MSW (Mock Service Worker) intercepta requests. O mock del módulo de API. Evitar mockear React Query internals.

---

**P: fireEvent vs userEvent?**
R: userEvent simula interacción real (click, type con delay). Más realista que fireEvent. Preferir userEvent.

---

**P: ¿Integration vs unit en React?**
R: Integration (RTL): render componente con providers y verificar flujo. Unit: funciones puras, utils, custom hooks aislados.
