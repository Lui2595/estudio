# Preguntas y Respuestas — Base de Datos (Migrations, Seeders, Factories)

> Review rápido sin código.

---

**P: ¿Para qué sirven las Migrations?**
R: Versionan el esquema de BD en código. Cambios reproducibles en dev, staging y producción con `php artisan migrate`.

---

**P: ¿Qué hace un Factory?**
R: Genera datos fake para tests y seeders. `User::factory()->count(10)->create()`.

---

**P: ¿Qué hace un Seeder?**
R: Pobla la BD con datos iniciales o de prueba. `php artisan db:seed`.

---

**P: ¿Cuándo usar `DB::transaction()`?**
R: Cuando múltiples operaciones deben ser atómicas: crear pedido + descontar stock + registrar pago. Si algo falla, rollback automático.

---

**P: ¿Qué hace `lockForUpdate()`?**
R: Lock pesimista en la fila dentro de una transacción. Evita race conditions cuando dos requests modifican el mismo stock simultáneamente.

---

**P: ¿Rollback en migraciones?**
R: Método `down()` revierte lo que hace `up()`. Esencial para deploys seguros y entornos de desarrollo.

---

**P: ¿Soft deletes vs hard delete?**
R: Soft: marca `deleted_at`, recuperable. Hard: elimina la fila. Laravel SoftDeletes trait para lo primero.
