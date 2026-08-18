# Preguntas y Respuestas — Módulos ES

> Review rápido sin código.

---

**P: ¿Diferencia export default vs named export?**
R: Default: uno por módulo, import sin llaves. Named: múltiples, import con llaves exactas `{ add, PI }`.

---

**P: ¿Qué es import dinámico?**
R: `import('./module.js')` retorna Promise. Carga lazy en runtime. Base de code splitting en React.

---

**P: CommonJS vs ES Modules?**
R: CommonJS (require/module.exports): Node tradicional, sync. ESM (import/export): estándar JS, static analysis, tree-shaking.

---

**P: ¿Tree-shaking?**
R: Eliminar código no usado en bundle final. Requiere ESM estático. Webpack/Vite lo hacen en build.

---

**P: ¿Re-export?**
R: `export { add } from './math.js'` o `export * from './math.js'`. Barrel files para centralizar exports.

---

**P: ¿Por qué modules resuelven scope global?**
R: Cada módulo tiene scope privado. Variables no contaminan global. Mejor encapsulación que script tags.
