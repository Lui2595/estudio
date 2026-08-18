# Preguntas y Respuestas — React Avanzado

> Review rápido sin código.

---

**P: ¿Qué es Compound Components?**
R: Componentes que trabajan juntos compartiendo state implícito (Tabs, Select, Accordion). API declarativa flexible.

---

**P: ¿Qué es Render Props?**
R: Componente recibe función como prop/children que retorna JSX. Comparte lógica. Largamente reemplazado por custom hooks.

---

**P: ¿Qué es HOC (Higher Order Component)?**
R: Función que recibe componente y retorna componente mejorado (withAuth, withTheme). Hoy preferir hooks.

---

**P: HOC vs Hooks?**
R: Hooks reemplazan HOCs y render props en la mayoría de casos. Menos nesting, más composable, mejor tree-shaking.

---

**P: ¿Feature-based vs Atomic Design?**
R: Feature: carpetas por dominio (`features/users/`). Atomic: por tipo UI (atoms/molecules). Feature escala mejor en equipos.

---

**P: ¿Error Boundaries?**
R: Class component que captura errores de render en hijos. Muestra fallback UI. No captura event handlers ni async.

---

**P: ¿Portals?**
R: Renderizar hijos fuera del DOM padre (modals, tooltips). `createPortal(child, document.body)`.
