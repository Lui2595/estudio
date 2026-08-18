<?php

/**
 * TEMA: ¿Qué son Facades en Laravel?
 *
 * Un Facade en Laravel es una "fachada" (puente/fachada) que da una interfaz estática sencilla a clases/servicios
 * que viven realmente dentro del Service Container. Es decir, usas métodos estáticos como `Cache::get('x')`, 
 * pero debajo está llamando a una instancia real que gestiona Laravel.
 *
 * Así, los Facades NO son clases estáticas de verdad, sino proxies: permiten acceder fácil y rápido a servicios comunes
 * (cache, base de datos, logs, etc) sin crear la instancia ni inyectar dependencias manualmente.
 *
 * Los Facades aprovechan el método mágico __callStatic para interceptar las llamadas y redirigirlas al objeto real
 * que está registrado en el contenedor de servicios.
 *
 * Ventajas:
 * - Sintaxis concisa (`DB::transaction(...)`)
 * - Pueden ser "falsificados" en tests (`Cache::fake()`)
 * - No obligan a acoplarte a una clase estática real (mejor testabilidad)
 *
 * Resumen: Facade = fachada/proxy estático a servicios del container.
 *
 * ENTREVISTA: ¿Son Facades lo mismo que clases estáticas?
 *
 * ❌ NO SON CLASES ESTÁTICAS REALES.
 *
 * Las *Facades* en Laravel solo "parecen" estáticas porque permiten llamar métodos estáticos (ej: `Cache::get('x')`), pero
 * internamente funcionan como un "proxy" dinámico hacia una instancia real que está registrada en el Service Container.
 * ¿Cómo funciona esto? A detalle:
 *
 * 1. **Magia de PHP via `__callStatic`:**
 *    Cuando escribes `Cache::get('key')`, la clase Facade no tiene un método `get` declarado. En vez de fallar,
 *    Laravel intercepta esa llamada usando el método mágico `__callStatic`. 
 *    
 * 2. **Resolución vía el Service Container:**
 *    `__callStatic` busca cuál es la dependencia real detrás del facade usando el service container.
 *    Por ejemplo, para la Facade `Cache`, la instancia real suele ser el servicio `'cache'` del container (ej: `Illuminate\Cache\Repository`).
 *    Así, efectivamente, `Cache::get($key)` se convierte en `app('cache')->get($key)`, usando la instancia real.
 * 
 * 3. **Ventajas vs clases estáticas puras:**
 *    - Puedes fácilmente *mockear* o sustituir el comportamiento real en tests, por ejemplo usando `Cache::fake()`.
 *      Esto sería imposible con clases realmente estáticas.
 *    - El código es mucho más fácil de testear porque la clase real la puedes *inyectar* por constructor si lo prefieres, no hay acoplamiento rígido.
 *    - Permite aprovechar inyección de dependencias, polimorfismo, bindings personalizados, etc.
 *    - La sintaxis sigue siendo muy concisa y legible.
 *
 * 4. **Tests y mocks:**
 *    Laravel provee helpers en las Facades para test: `Cache::fake()`, `Cache::assertHas('x')`, etc. 
 *    Así puedes verificar llamadas, datos guardados, etc. en tus tests unitarios o de integración.
 *
 * 5. **¿Cuándo preferir una u otra?**
 *    - En controladores o scripts de infraestructura, está bien usar Facades por comodidad.
 *    - Pero en la lógica de negocio, servicios, actions, etc. debes preferir inyección en el constructor,
 *      porque te da más flexibilidad, claridad en las dependencias y testabilidad.
 */

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

// Ejemplos de uso habitual de facades:
//
// Cache::put('users', $users, 3600);
// $users = Cache::get('users');
//
// DB::transaction(function () { ... });
// Log::info('Usuario creado', ['id' => $user->id]);
//
// Ejemplo de testing/mocking con Facades:
// Cache::fake();
// Cache::put('key', 'value');
// Cache::assertHas('key');
//
// Alternativa profesional para lógica de negocio: inyección

class UserService
{
    // Inyectamos la dependencia EXPLÍCITAMENTE, mucho más recomendable para servicios.
    public function __construct(
        private \Illuminate\Contracts\Cache\Repository $cache,
    ) {}

    public function getUsers(): array
    {
        // Usamos la instancia real inyectada, no el Facade directamente.
        return $this->cache->remember('users', 3600, fn () => User::all()->toArray());
    }
}
