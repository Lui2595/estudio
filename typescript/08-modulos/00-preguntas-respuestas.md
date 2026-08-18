# Preguntas y Respuestas — Módulos TypeScript

> Review rápido sin código.

---

**P: import type vs import?**
R: `import type` solo importa tipos, eliminado en compile. Con `verbatimModuleSyntax`, obligatorio para imports solo de tipos.

---

**P: ¿export type?**
R: Exporta solo el tipo sin generar JS. Evita imports circulares y código innecesario en bundle.

---

**P: ¿Barrel files (index.ts)?**
R: Re-exportan módulos de una carpeta. Conveniente pero puede afectar tree-shaking si mal usados.

---

**P: CommonJS interop?**
R: `esModuleInterop` y `allowSyntheticDefaultImports` facilitan importar módulos CJS como default imports.

---

**P: ¿isolatedModules?**
R: Cada archivo transpilable independientemente. Requerido por Babel/esbuild. Prohíbe const enums y algunos patterns.
