# Preguntas y Respuestas — Patrones de Diseño

> Review rápido sin código.

---

**P: ¿Para qué sirve el Repository Pattern?**
R: Abstrae el acceso a datos. La lógica de negocio no sabe si los datos vienen de MySQL, Redis o una API.

---

**P: Factory vs Strategy: ¿diferencia?**
R: Factory crea objetos según condiciones. Strategy intercambia algoritmos en runtime (ej. distintos tipos de descuento).

---

**P: ¿Cómo se relaciona Observer con Laravel Events?**
R: Laravel Events es implementación del patrón Observer. Un evento ocurre y múltiples listeners reaccionan sin acoplar el emisor.

---

**P: ¿Cuándo usar Adapter?**
R: Cuando integras una API externa con interfaz incompatible. El adapter traduce tu interfaz a la de terceros (ej. Stripe).

---

**P: ¿Por qué Singleton es un anti-patrón?**
R: Estado global oculto, difícil de testear, acoplamiento fuerte, viola SRP. En Laravel usa el Service Container con `singleton()` en su lugar.

---

**P: ¿Cuándo usarías Factory en Laravel?**
R: Cuando la creación de objetos depende de configuración o tipo dinámico: notificaciones por canal, gateways de pago, drivers de storage.

---

**P: ¿Repository en Laravel siempre es necesario?**
R: No. Eloquent ya es un repository implícito. Útil cuando necesitas intercambiar fuente de datos, testear sin BD, o lógica de queries muy compleja centralizada.
