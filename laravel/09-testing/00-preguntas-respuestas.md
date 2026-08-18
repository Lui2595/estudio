# Preguntas y Respuestas — Testing

> Review rápido sin código.

---

**P: ¿Diferencia entre Feature Test y Unit Test?**
R: Feature: prueba flujo HTTP completo (ruta → controller → BD → respuesta). Unit: prueba una clase aislada con dependencias mockeadas.

---

**P: ¿Qué hace `RefreshDatabase`?**
R: Migra la BD antes de cada test y la limpia después. Garantiza estado limpio entre tests.

---

**P: ¿Cómo autenticar en tests?**
R: `$this->actingAs($user)` simula usuario logueado sin pasar por login real.

---

**P: ¿Qué es Mocking y cuándo usarlo?**
R: Reemplazar dependencias reales con objetos simulados. Unit tests de services: mock del repository, no la BD real.

---

**P: ¿Qué assertions HTTP usar?**
R: `assertStatus()`, `assertJson()`, `assertJsonPath()`, `assertDatabaseHas()`, `assertDatabaseMissing()`.

---

**P: ¿Testear Facades?**
R: `Mail::fake()`, `Queue::fake()`, `Cache::fake()` y luego `assertSent()`, `assertPushed()`.

---

**P: ¿Cuántos tests escribir en entrevista Senior?**
R: No es cantidad: demuestra que Feature tests cubren flujos críticos y Unit tests aíslan lógica de negocio compleja.
