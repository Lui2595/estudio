# Preguntas y Respuestas — ES6+ (Destructuring, Spread, Rest)

> Review rápido sin código.

---

**P: ¿Qué es destructuring?**
R: Extraer valores de objetos/arrays a variables. `const { name } = user`, `const [first, ...rest] = arr`.

---

**P: ¿Qué hace spread (`...`)?**
R: Expande iterable en elementos individuales. Copiar arrays/objetos, combinar, pasar args a funciones.

---

**P: ¿Qué hace rest (`...`)?**
R: Recolecta elementos restantes. En parámetros: `function sum(...nums)`. En destructuring: `[first, ...rest]`.

---

**P: Spread vs Object.assign?**
R: Spread es más legible y crea copia superficial. Object.assign muta el target si se pasa uno.

---

**P: ¿Shallow vs deep copy?**
R: Shallow: copia primer nivel; objetos anidados siguen siendo referencias. Deep: copia completa (structuredClone, lodash cloneDeep).

---

**P: ¿Destructuring con default values?**
R: `const { phone = 'N/A' } = user` asigna default si la propiedad es undefined.

---

**P: ¿Renombrar en destructuring?**
R: `const { name: userName } = user` extrae `name` en variable `userName`.
