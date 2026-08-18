# Preguntas y Respuestas — Configuración (tsconfig, strict)

> Review rápido sin código.

---

**P: ¿Qué hace strict: true?**
R: Activa todas las opciones estrictas: noImplicitAny, strictNullChecks, strictFunctionTypes, etc. Base mínima en proyectos serios.

---

**P: ¿Qué es strictNullChecks?**
R: null y undefined no asignables a otros tipos sin narrowing. Principal ventaja de TS sobre JS. Obliga a manejar casos null.

---

**P: ¿noUncheckedIndexedAccess?**
R: arr[i] es T | undefined, no T. Más seguro, evita accesos fuera de bounds silenciosos.

---

**P: ¿Desactivar strictNullChecks: qué pasa?**
R: string acepta null/undefined. Pierdes la protección principal de TS. No recomendado.

---

**P: skipLibCheck vs noEmit?**
R: skipLibCheck: no type-check archivos .d.ts de node_modules (más rápido). noEmit: solo verifica tipos sin generar JS.

---

**P: paths en tsconfig?**
R: Alias de imports: `@/*` → `src/*`. Requiere configuración equivalente en bundler (Vite, webpack).
