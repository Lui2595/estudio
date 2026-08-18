# Preguntas y Respuestas — Laravel (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 14 |

---

## 01-core

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

---

## 02-controllers

**P: ¿Qué responsabilidad tiene un Controller?**
R: Capa HTTP: recibir request, delegar a service/action, retornar response. NO debe tener lógica de negocio compleja.

---

**P: Resource Controller vs Single Action: ¿cuándo cada uno?**
R: Resource para CRUD completo de un recurso. Single Action para una operación específica (export PDF, toggle status).

---

**P: ¿Por qué inyectar services en el constructor del controller?**
R: Laravel resuelve automáticamente del container. Facilita testing y mantiene controllers delgados.

---

**P: ¿Qué retorna un controller de API típicamente?**
R: API Resource, Resource Collection, `response()->json()`, o `response()->noContent()` para DELETE.

---

**P: ¿Controller gordo ("fat controller"): por qué evitarlo?**
R: Difícil de testear, viola SRP, lógica duplicada. Mover a Services, Actions o Jobs.

---

## 03-requests

**P: ¿Para qué sirve un Form Request?**
R: Separa validación y autorización del controller. Clase dedicada con `rules()`, `messages()` y `authorize()`.

---

**P: ¿Dónde va la autorización: middleware o Form Request?**
R: Middleware para auth general (¿está logueado?). Form Request para autorización específica del recurso (¿puede editar ESTE post?).

---

**P: ¿Cómo crear una regla de validación custom?**
R: Clase que implementa `ValidationRule` con método `validate()`. Reutilizable en múltiples Form Requests.

---

**P: ¿Validación en Form Request vs en Service?**
R: Form Request: formato y reglas de entrada HTTP. Service: reglas de negocio (email único, stock disponible, saldo suficiente).

---

**P: ¿Qué es `Rule::in()` y cuándo usarlo?**
R: Valida que el valor esté en una lista permitida. Ej: status solo puede ser draft, published, archived.

---

**P: ¿Cómo retornar errores de validación en API?**
R: Laravel automáticamente retorna 422 con JSON `{ message, errors: { field: [messages] } }` si el request espera JSON.

---

## 04-eloquent

**P: ¿Qué es el N+1 Problem?**
R: 1 query para la lista + N queries adicionales (una por cada relación). 100 posts = 101 queries. Muy común y muy preguntado.

---

**P: ¿Cómo solucionar N+1?**
R: Eager loading con `with()`, `load()`, o `withCount()`. También `preventLazyLoading()` en desarrollo para detectarlo.

---

**P: HasOne vs HasMany vs BelongsTo vs BelongsToMany?**
R: HasOne: 1 a 1 (user→profile). HasMany: 1 a N (user→posts). BelongsTo: N a 1 inverso (post→user). BelongsToMany: N a N con pivot (user↔roles).

---

**P: ¿Qué es una relación polimórfica (Morph)?**
R: Un modelo puede pertenecer a varios tipos. Comment pertenece a Post o Video con `commentable_type` + `commentable_id`.

---

**P: ¿Qué es un Scope?**
R: Query reutilizable encadenable. `User::active()->get()` filtra usuarios activos sin repetir la condición.

---

**P: Accessor vs Mutator?**
R: Accessor transforma al LEER (`getFullNameAttribute`). Mutator al ESCRIBIR (`setEmailAttribute` convierte a lowercase).

---

**P: ¿Para qué sirven los Casts?**
R: Convertir atributos automáticamente: `'settings' => 'array'`, `'published_at' => 'datetime'`, `'is_active' => 'boolean'`.

---

## 05-database

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

---

## 06-jobs

**P: ¿Cuándo usarías una Queue?**
R: Tareas lentas que no deben bloquear la respuesta HTTP: emails, procesamiento de imágenes, reportes, integraciones externas.

---

**P: ¿Qué es un Worker?**
R: Proceso que escucha la cola y ejecuta jobs. `php artisan queue:work`. En producción lo mantiene Supervisor o Horizon.

---

**P: ¿Cómo configurar reintentos?**
R: Propiedades `$tries`, `$backoff`, `$timeout` en el Job. O flags en `queue:work --tries=3`.

---

**P: ¿Qué pasa si un Job falla definitivamente?**
R: Va a `failed_jobs`. Puedes reintentar manualmente, usar `failed()` en el Job para cleanup, o notificar.

---

**P: ¿Qué es Horizon?**
R: Dashboard de Laravel para monitorear colas Redis: throughput, tiempos, jobs fallidos, balanceo de workers.

---

**P: ¿Sync vs Redis/database queue driver?**
R: Sync ejecuta inmediatamente (dev/tests). Redis/database encolan para workers async (producción).

---

**P: ¿Job vs Event?**
R: Job: tarea específica en cola. Event: algo ocurrió; listeners pueden ir a cola o ejecutarse sync. Events desacoplan emisor de reacciones.

---

## 07-events

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

---

## 08-api

**P: ¿Para qué sirve un API Resource?**
R: Transforma modelos Eloquent a JSON consistente. Separa representación API del modelo interno. Controla qué campos se exponen.

---

**P: ¿Qué hace `whenLoaded()` en Resources?**
R: Incluye relaciones solo si fueron eager loaded. Evita N+1 accidental y respuestas inconsistentes.

---

**P: Sanctum vs Passport: ¿cuándo cada uno?**
R: Sanctum: tokens API simples, SPAs con cookies, apps propias. Passport: OAuth2 completo, apps de terceros, scopes de delegación.

---

**P: ¿Cómo autenticar SPA con Sanctum?**
R: Cookies + CSRF. Frontend en mismo dominio/subdominio configurado. Sanctum emite cookie de sesión, no solo Bearer token.

---

**P: ¿Qué es rate limiting en API?**
R: Limitar requests por minuto por IP o usuario autenticado. Protege contra abuso y DDoS básico.

---

**P: ¿Cómo revocar tokens Sanctum?**
R: `$user->tokens()->delete()` revoca todos. `$user->currentAccessToken()->delete()` revoca el actual.

---

## 09-testing

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

---

## 10-performance

**P: ¿Cuándo usar cache en Laravel?**
R: Datos que cambian poco y se leen mucho: config, listas de categorías, permisos, queries costosas. `Cache::remember()`.

---

**P: ¿Qué drivers de cache existen?**
R: file, redis, memcached, database, array (tests). Redis es el más usado en producción por velocidad y features (tags, locks).

---

**P: ¿Qué son cache tags?**
R: Agrupar keys de cache para invalidar en bloque. `Cache::tags(['users'])->flush()`. Solo redis/memcached.

---

**P: ¿Para qué sirve Redis en Laravel además de cache?**
R: Sessions, queues (Horizon), broadcasting, rate limiting, locks distribuidos.

---

**P: ¿Qué es un cache lock?**
R: Evita que dos procesos ejecuten la misma tarea crítica simultáneamente. Útil para scheduled jobs o procesamiento de facturas.

---

**P: ¿Horizon vs `queue:work` manual?**
R: Horizon: dashboard, métricas, auto-balanceo, gestión de failed jobs. `queue:work`: básico, sin UI. Producción seria usa Horizon + Supervisor.

---

**P: ¿Invalidar cache al actualizar modelo?**
R: Observer o evento que hace `Cache::forget()` o `Cache::tags()->flush()` cuando el modelo cambia.

---

## 11-arquitectura

**P: ¿Repository Pattern en Laravel: siempre?**
R: No obligatorio. Eloquent ya abstrae datos. Útil si intercambias fuentes, tests sin BD, o queries muy complejas centralizadas.

---

**P: ¿Qué es Service Layer?**
R: Clases con lógica de negocio (`UserService`, `OrderService`). Controllers delegan aquí. Más granular que un controller gordo.

---

**P: ¿Qué es Actions Pattern?**
R: Una clase = una acción (`CreatePostAction`). Método único `handle()` o `__invoke()`. Más granular que service con 20 métodos.

---

**P: ¿Actions vs Services?**
R: Actions: operaciones atómicas y específicas. Services: agrupan operaciones relacionadas de un dominio. Ambos válidos; Actions más explícitos.

---

**P: ¿Dónde va la lógica de negocio en Laravel?**
R: Services, Actions, o Domain classes. Nunca en controllers, middleware, o models gordos (salvo scopes/accessors simples).

---

**P: ¿Cómo organizar carpetas en app grande?**
R: Por feature (`app/Features/Orders/`) o por capa (`Controllers/Services/Repositories`). Feature-based escala mejor en equipos grandes.

---

## 12-seguridad

**P: ¿Cómo protege Laravel contra CSRF?**
R: Token CSRF en forms (`@csrf`) y verificación automática en middleware. APIs con Sanctum usan otro mecanismo.

---

**P: ¿Cómo previene XSS Blade?**
R: `{{ $var }}` escapa HTML automáticamente. `{!! $html !!}` NO escapa — solo con contenido confiable.

---

**P: ¿Cómo previene SQL Injection Eloquent?**
R: Prepared statements automáticos. NUNCA concatenar input en raw queries. Usar bindings: `where('email', $email)`.

---

**P: ¿Qué es Mass Assignment y cómo prevenirlo?**
R: Rellenar campos no deseados via request. Proteger con `$fillable` o `$guarded` en modelos.

---

**P: ¿Cómo validar uploads seguros?**
R: Validar mime, extensión, tamaño. Almacenar fuera de public con nombres aleatorios. Escanear si es crítico.

---

**P: ¿Rate limiting en login?**
R: `throttle` middleware en rutas de auth. Laravel también tiene rate limiting built-in para password reset.

---

**P: ¿Sanctum vs session para API?**
R: Sanctum tokens para APIs stateless/mobile. Session cookies para SPA same-domain. Ambos válidos según arquitectura.

---

## 13-devops

**P: ¿Para qué sirve Supervisor en Laravel?**
R: Mantener workers de cola y Horizon corriendo en producción. Reinicia automáticamente si el proceso muere.

---

**P: ¿Qué procesos debe supervisar Supervisor?**
R: `queue:work` o `horizon`, y opcionalmente scheduler via cron (`* * * * * php artisan schedule:run`).

---

**P: ¿Qué incluye un docker-compose típico Laravel?**
R: PHP-FPM, Nginx, MySQL/PostgreSQL, Redis, y opcionalmente un container para queue worker.

---

**P: ¿Qué es el Laravel Scheduler?**
R: Cron único que ejecuta `schedule:run` cada minuto. Laravel decide qué tareas correr (backups, limpieza, reportes).

---

**P: ¿Deploy checklist Laravel?**
R: `composer install --no-dev`, `php artisan migrate --force`, `config:cache`, `route:cache`, `view:cache`, restart queue workers.

---

**P: ¿Por qué `config:cache` en producción?**
R: Combina todos los configs en un archivo. Más rápido, pero cambios en `.env` requieren re-cachear.

---

**P: ¿Zero-downtime deploy?**
R: Blue-green deployment, migraciones backward-compatible, restart graceful de workers con `horizon:terminate`.

---

## routes

**P: ¿Qué es Route Model Binding?**
R: Laravel resuelve automáticamente un modelo Eloquent desde el parámetro de ruta. `/users/{user}` inyecta el User o 404 si no existe.

---

**P: ¿Qué hace un Middleware?**
R: Filtra/modifica requests antes de llegar al controller. Ej: auth, throttle, CORS, verificar rol.

---

**P: ¿Qué genera `Route::resource('posts', PostController::class)`?**
R: 7 rutas REST: index, create, store, show, edit, update, destroy. `apiResource` omite create/edit.

---

**P: ¿Qué es un Single Action Controller?**
R: Controller con un solo método `__invoke()`. Ideal para acciones específicas: `ShowUserProfileController`.

---

**P: ¿Cómo proteger rutas API con Sanctum?**
R: Middleware `auth:sanctum` en rutas o grupos. El cliente envía `Authorization: Bearer {token}`.

---

**P: ¿Qué es rate limiting en rutas?**
R: Limitar requests por minuto por IP o usuario. `throttle:60,1` = 60 requests por minuto. Previene abuso y brute force.

---

**P: ¿Binding personalizado por slug?**
R: `{post:slug}` en la ruta. Laravel busca por columna slug en lugar de id.

---
