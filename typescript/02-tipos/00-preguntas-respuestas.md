# Preguntas y Respuestas — Tipos (interface, union, enum)

> Review rápido sin código.

---

**P: interface vs type alias?**
R: Interface: objetos, clases, declaration merging, extends claro. Type: uniones, intersecciones, tuplas, tipos primitivos mapeados.

---

**P: ¿Qué es discriminated union?**
R: Union con campo común (`status`, `kind`) para narrowing seguro en switch. Patrón esencial en React state y API responses.

---

**P: ¿Optional (`?`) vs undefined explícito?**
R: Con `exactOptionalPropertyTypes`, TS distingue propiedad ausente vs `undefined` explícito. Relevante en APIs estrictas.

---

**P: ¿Por qué evitar enums en TS moderno?**
R: Generan código JS en runtime, pueden confundir. Preferir `as const` objects + union type derivado.

---

**P: ¿Qué es intersección (`A & B`)?**  
R: Combina propiedades de ambos tipos. El valor debe cumplir ambos contratos simultáneamente. Contrasta con **unión** `A | B` = uno u otro (success \| error). `Partial<T>` = todas las props opcionales (PATCH).

Ficha entrevista: `../../entrevistas/django-react-fastapi-senior/04-react-typescript.md`

---

**P: ¿readonly en interfaces?**
R: Propiedades no reasignables después de crear el objeto. Shallow: no protege objetos anidados sin Readonly profundo.
