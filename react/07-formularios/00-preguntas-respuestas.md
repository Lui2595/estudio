# Preguntas y Respuestas — Formularios React

> Review rápido sin código.

---

**P: Controlled vs Uncontrolled?**
R: Controlled: React controla valor via state (`value` + `onChange`). Uncontrolled: DOM controla valor; lees con ref.

---

**P: ¿Cuándo controlled?**
R: Validación en tiempo real, formato dinámico, submit programático, disabled condicional. Mayoría de casos en apps serias.

---

**P: ¿Cuándo uncontrolled?**
R: Forms simples, integración con libs no-React, file inputs. React Hook Form usa uncontrolled por defecto.

---

**P: ¿React Hook Form vs Formik?**
R: RHF: menos re-renders, uncontrolled, más performante. Formik: controlled, más simple conceptualmente. RHF más popular hoy.

---

**P: ¿Validación en forms?**
R: Client-side: UX inmediata. Server-side: siempre obligatoria (nunca confiar solo en cliente). Zod/Yup para schemas.

---

**P: ¿Por qué key en listas de inputs?**
R: Sin key estable, React puede reutilizar input incorrecto al reordenar, perdiendo focus y valor.
