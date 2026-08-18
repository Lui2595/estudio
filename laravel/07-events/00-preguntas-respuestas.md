# Preguntas y Respuestas — Events y Listeners

> Review rápido sin código.

---

**P: ¿Para qué sirven Events en Laravel?**
R: Desacoplar acciones secundarias de la lógica principal. "Pedido creado" dispara email, inventario y analytics sin acoplarlos.

---

**P: ¿Cómo registrar Events y Listeners?**
R: En `EventServiceProvider` o con auto-discovery. `OrderPlaced::class => [SendEmail::class, UpdateInventory::class]`.

---

**P: ¿Listener síncrono vs en cola?**
R: Implementar `ShouldQueue` en el listener para ejecutarlo async. Sin él, se ejecuta inmediatamente en la misma request.

---

**P: ¿Event vs Observer de Eloquent?**
R: Events: acciones de dominio explícitas que tú disparas. Observers: reaccionan automáticamente a created/updated/deleted de un modelo.

---

**P: ¿Cómo disparar un evento?**
R: `event(new OrderPlaced($order))` o `OrderPlaced::dispatch($order)`.

---

**P: ¿Events vs Jobs directos?**
R: Un evento puede tener múltiples listeners. Un job es una tarea única. Usa events cuando varias cosas deben reaccionar al mismo suceso.
