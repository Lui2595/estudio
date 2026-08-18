# Preguntas y Respuestas — Laravel Core

> Review rápido sin código.

---

**P: ¿Qué ocurre cuando haces `app(UserRepository::class)`?**
R: El Service Container busca un binding, si no existe auto-resuelve via Reflection leyendo el constructor, resuelve dependencias recursivamente y retorna la instancia.

---

**P: ¿Las Facades son clases estáticas?**
R: No. Usan `__callStatic()` para resolver del container. `Cache::get()` internamente hace `app('cache')->get()`. Son testeables con `Cache::fake()`.

---

**P: ¿Qué es un Contract en Laravel?**
R: Interface en `Illuminate\Contracts\*` que define comportamiento. Permite intercambiar implementaciones (cache, queue, mail) sin cambiar código.

---

**P: ¿Diferencia entre `bind()` y `singleton()`?**
R: `bind()`: nueva instancia cada vez que se resuelve. `singleton()`: una sola instancia reutilizada en toda la request/aplicación.

---

**P: ¿Qué hace `register()` vs `boot()` en un Service Provider?**
R: `register()`: solo bindings, sin depender de otros servicios. `boot()`: rutas, eventos, vistas; se ejecuta cuando todos los providers ya están registrados.

---

**P: ¿Cuándo inyectar por constructor vs usar Facade?**
R: Constructor en lógica de negocio (services, actions) por testabilidad. Facades aceptables en controllers simples o código de infraestructura.
