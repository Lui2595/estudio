# Preguntas y Respuestas — OOP

> Review rápido sin código.

---

**P: ¿Qué es encapsulación y por qué importa?**
R: Ocultar el estado interno con `private`/`protected` y exponer solo métodos públicos. Permite cambiar la implementación sin romper quien usa la clase.

---

**P: Herencia vs composición: ¿cuándo usar cada una?**
R: Herencia para relación "es un" (Perro es un Animal). Composición para "tiene un" (Coche tiene un Motor). Preferir composición cuando no hay jerarquía clara.

---

**P: ¿Qué es polimorfismo?**
R: Mismo método, distinto comportamiento según la instancia. Permite programar contra interfaces: `PaymentGateway` puede ser Stripe o PayPal sin cambiar el código cliente.

---

**P: Interface vs clase abstracta?**
R: Interface: contrato puro, múltiple implementación, sin estado. Clase abstracta: puede tener implementación y propiedades compartidas. Interface para capacidades; abstracta para jerarquía con lógica común.

---

**P: ¿Cuándo usar Trait en lugar de clase abstracta?**
R: Trait para reutilizar comportamiento horizontal entre clases sin relación de herencia (Loggable, SoftDeletes). Abstracta cuando hay relación "es un" y estado compartido.

---

**P: ¿Qué es Dependency Injection?**
R: Las dependencias se inyectan desde afuera (constructor), no se crean dentro de la clase. Facilita testing con mocks y desacoplamiento.

---

**P: ¿Qué es abstracción en OOP?**
R: Ocultar complejidad y mostrar solo lo esencial. El consumidor sabe QUÉ hace un servicio, no CÓMO lo hace internamente.
