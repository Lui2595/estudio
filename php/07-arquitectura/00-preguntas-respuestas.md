# Preguntas y Respuestas — Arquitectura (SOLID, DRY, KISS, YAGNI)

> Review rápido sin código.

---

**P: ¿Qué es Single Responsibility (SRP)?**
R: Una clase debe tener una sola razón para cambiar. UserController maneja HTTP; UserService la lógica; UserRepository los datos.

---

**P: ¿Qué es Dependency Inversion (DIP)?**
R: Depender de abstracciones (interfaces), no de implementaciones concretas. UserService depende de `UserRepositoryInterface`, no de MySQL directamente.

---

**P: ¿Qué es Open/Closed (OCP)?**
R: Abierto a extensión, cerrado a modificación. Agregar StripeGateway sin modificar PaymentProcessor, solo inyectando nueva implementación.

---

**P: ¿Qué es DRY?**
R: Don't Repeat Yourself: evitar duplicar lógica. Una función reutilizable en lugar de copiar el mismo código en dos lugares.

---

**P: ¿Qué es KISS?**
R: Keep It Simple: la solución más simple que resuelva el problema. No sobre-ingenierizar.

---

**P: ¿Qué es YAGNI?**
R: You Aren't Gonna Need It: no implementes funcionalidad hasta que la necesites de verdad. Evita abstracciones prematuras.

---

**P: ¿Cuáles son los más preguntados en entrevista Senior?**
R: SRP y DIP. Saber dar ejemplos concretos de tu experiencia, no solo definiciones.
