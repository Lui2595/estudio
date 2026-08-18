# Preguntas y Respuestas — TypeScript Avanzado

> Review rápido sin código.

---

**P: ¿Para qué sirven archivos .d.ts?**
R: Declarar tipos para JS sin tipos, extender globals (Window, ImportMeta), o ambient declarations.

---

**P: ¿Qué es index signature?**
R: `[key: string]: T` permite keys dinámicas con tipo de valor consistente. Útil para mapas y traducciones.

---

**P: keyof typeof pattern?**
R: `typeof obj` obtiene tipo del objeto. `keyof` extrae keys como union literal. Base de configs type-safe.

---

**P: ¿Template literal types?**
R: Strings como tipos: `` `on${Capitalize<Event>}` `` → `'onClick' | 'onFocus'`. Metaprogramación de strings.

---

**P: ¿infer en conditional types?**
R: Extrae tipo dentro de conditional: `T extends (...args: any) => infer R ? R : never` obtiene return type.

---

**P: ¿Declaration merging?**
R: Interfaces con mismo nombre se fusionan. Útil para extender tipos de librerías. Solo interfaces, no types.
