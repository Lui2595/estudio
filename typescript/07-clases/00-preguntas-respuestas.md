# Preguntas y Respuestas — Clases TypeScript

> Review rápido sin código.

---

**P: Modificadores public, private, protected?**
R: public: accesible everywhere. private: solo dentro de la clase. protected: clase y subclases.

---

**P: implements vs extends?**
R: implements: cumple contrato de interface (sin herencia). extends: hereda de clase padre.

---

**P: ¿Parameter properties?**
R: Atajo TS: declarar y asignar en constructor `constructor(public name: string)`. Genera propiedad automáticamente.

---

**P: ¿Clases vs interfaces en TS?**
R: Interfaces solo existen en compile time. Clases generan JS en runtime. Interfaces para contratos; clases cuando necesitas instancias con comportamiento.

---

**P: abstract class vs interface?**
R: Abstract puede tener implementación y estado. Interface solo contrato. Abstract para jerarquía con lógica compartida.

---

**P: readonly en clases?**
R: Propiedad asignable solo en constructor o declaración. No reasignable después.
