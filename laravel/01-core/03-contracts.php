<?php

/**
 * TEMA: Contracts (Interfaces de Laravel)
 * ENTREVISTA: ¿Qué es un Contract en Laravel?
 *
 * Interfaces en Illuminate\Contracts\* que definen comportamiento.
 * Permiten intercambiar implementaciones sin cambiar el código.
 */

// Contracts comunes:
// Illuminate\Contracts\Cache\Repository
// Illuminate\Contracts\Queue\Queue
// Illuminate\Contracts\Mail\Mailer
// Illuminate\Contracts\Auth\Guard

use Illuminate\Contracts\Cache\Repository as CacheContract;
use Illuminate\Contracts\Queue\ShouldQueue;

// En Service Provider:
// $this->app->bind(
//     CacheContract::class,
//     fn () => new RedisStore(...)
// );

// Jobs implementan ShouldQueue para ir a la cola automáticamente
class SendWelcomeEmail implements ShouldQueue
{
    public function __construct(private int $userId) {}

    public function handle(): void
    {
        // Enviar email
    }
}
