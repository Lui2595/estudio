# Preguntas y Respuestas — PHP (Completo)

> Review rápido consolidado. Sin código. Responde en voz alta como en entrevista.

| Secciones | 8 |

---

## 01-variables-y-tipos

**P: ¿Qué hace `declare(strict_types=1)`?**
R: Activa tipado estricto en ese archivo. PHP deja de hacer coerción implícita (`"5"` ya no se convierte a `5` automáticamente en parámetros tipados).

---

**P: ¿Para qué sirve el type hinting?**
R: Declara tipos en parámetros, retornos y propiedades. Mejora legibilidad, autocompletado del IDE y detecta errores antes de ejecutar.

---

**P: ¿Qué es un union type (`int|string`)?**
R: Un parámetro o retorno que acepta más de un tipo. Útil cuando un ID puede venir como entero de BD o string de URL.

---

**P: ¿Qué significa `?User` o `User|null`?**
R: Tipo nullable: el valor puede ser una instancia de `User` o `null`. Común en métodos que pueden no encontrar resultado.

---

**P: ¿Cuál es la diferencia entre casting `(int)` e `intval()`?**
R: `(int)` es conversión explícita simple. `intval()` es función que además acepta base numérica (ej. hexadecimal). Ambos truncan decimales.

---

**P: ¿Cuándo usarías tipado estricto en un proyecto Laravel?**
R: En código de dominio, services y DTOs donde la precisión de tipos previene bugs. Laravel mismo no lo usa en todo el core, pero es buena práctica en tu código de aplicación.

---

## 02-oop

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

---

## 03-memoria

**P: ¿Dónde viven las variables en PHP?**
R: Escalares en stack/zval. Objetos y arrays en heap; la variable es una referencia al objeto en memoria.

---

**P: ¿Cómo libera memoria PHP?**
R: Reference counting: cuando nadie referencia un valor, se libera. Un garbage collector adicional limpia ciclos (objetos que se referencian mutuamente).

---

**P: ¿Qué hace el operador `&`?**
R: Crea un alias: dos variables apuntan al mismo valor. Sin `&`, escalares se copian por valor; arrays usan Copy on Write.

---

**P: ¿PHP copia un array al asignarlo (`$b = $a`)?**
R: No inmediatamente. Usa Copy on Write: comparten memoria hasta que una de las dos se modifica; entonces se crea la copia real.

---

**P: `$a = [1,2,3]; $b = $a; $b[] = 4` — ¿qué pasa con `$a`?**
R: `$a` sigue siendo `[1,2,3]`. Al modificar `$b`, PHP hace la copia real por Copy on Write.

---

**P: ¿Por qué importa esto en entrevista Senior?**
R: Evita bugs de mutación accidental, entiendes performance al pasar arrays grandes, y comprendes por qué clonar objetos requiere `clone` explícito.

---

## 04-funciones

**P: ¿Qué es un closure?**
R: Función anónima que captura variables del scope externo con `use`. Sigue teniendo acceso aunque el scope padre ya terminó.

---

**P: ¿Diferencia entre closure y función anónima?**
R: Toda closure es anónima, pero no toda anónima es closure. Closure captura variables del scope padre; anónima simple no.

---

**P: ¿Para qué sirven los closures en Laravel?**
R: Callbacks en collections, middleware, queue jobs, route definitions, event listeners y lazy evaluation.

---

**P: ¿Ventaja de arrow functions `fn()` sobre `function()`?**
R: Sintaxis corta, captura automática de variables del scope, retorno implícito de una expresión. Ideal para callbacks de una línea.

---

**P: `use ($var)` vs `use (&$var)`?**
R: Por valor: la closure ve el valor al momento de creación (o copia). Por referencia: ve cambios posteriores a la variable original.

---

**P: ¿Cuándo usar `array_map(fn($x) => ...)` vs foreach?**
R: `array_map` para transformaciones funcionales y encadenables. Foreach cuando necesitas lógica imperativa, múltiples operaciones o break/continue.

---

## 05-excepciones

**P: ¿Cuándo usar excepciones vs return null/false?**
R: Excepciones para errores excepcionales que interrumpen el flujo. Return null/false para resultados esperados (usuario no encontrado).

---

**P: ¿Para qué crear excepciones personalizadas?**
R: Manejar errores de dominio específicos (UserNotFound, InsufficientFunds), facilitar logging, respuestas HTTP y debugging.

---

**P: ¿Qué es `Throwable`?**
R: Interface base en PHP 7+ de la que heredan tanto `Exception` como `Error`. Permite capturar cualquier error throwable con un solo catch.

---

**P: ¿Diferencia entre `Error` y `Exception`?**
R: Exception: errores de aplicación, diseñados para capturarse. Error: errores del motor PHP (TypeError, DivisionByZeroError). Antes de PHP 7, Errors eran fatales.

---

**P: ¿Para qué sirve `finally`?**
R: Bloque que siempre se ejecuta, haya o no excepción. Útil para cleanup: cerrar conexiones, liberar recursos.

---

**P: ¿Cómo maneja Laravel las excepciones globalmente?**
R: El Handler en `app/Exceptions/Handler.php` convierte excepciones en respuestas HTTP (JSON para API, vistas para web) y las reporta a logs/Sentry.

---

## 06-composer

**P: ¿Qué es PSR-4?**
R: Estándar de autoloading que mapea namespaces a directorios. `App\User` → `src/User.php`. Composer genera el autoloader en `vendor/autoload.php`.

---

**P: ¿Qué hace `composer install` vs `composer update`?**
R: `install` instala versiones exactas del `composer.lock`. `update` actualiza dependencias según restricciones del `composer.json` y regenera el lock.

---

**P: ¿Debes commitear `composer.lock`?**
R: Sí, siempre en aplicaciones. Garantiza que todos los entornos usen las mismas versiones. En librerías publicadas, no se commitea.

---

**P: ¿Diferencia entre `require` y `require-dev`?**
R: `require`: dependencias de producción. `require-dev`: solo desarrollo (PHPUnit, PHPStan, Pest). No se instalan con `--no-dev` en producción.

---

**P: ¿Qué hace un Service Provider en Laravel?**
R: Punto de registro de servicios en el container. `register()`: bindings. `boot()`: lógica después de que todos los providers estén cargados.

---

**P: ¿Qué significa `^8.2` en versiones Composer?**
R: Compatible con 8.2.x pero menor a 9.0.0 (semver). `~1.5` es más restrictivo: >=1.5.0 <1.6.0.

---

## 07-arquitectura

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

---

## 08-patrones

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

---
