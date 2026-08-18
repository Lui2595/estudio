<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

/**
 * TEMA: Queues, Workers, Retry Logic
 * ENTREVISTA: ¿Cuándo usarías una Queue?
 *
 * Tareas lentas o que no bloquean la respuesta HTTP:
 * - Envío de emails
 * - Procesamiento de imágenes
 * - Integraciones con APIs externas
 * - Generación de reportes
 */
class SendWelcomeEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 60; // Segundos entre reintentos
    public int $timeout = 120;

    public function __construct(private User $user) {}

    public function handle(): void
    {
        // Mail::to($this->user)->send(new WelcomeMail());
    }

    public function failed(\Throwable $exception): void
    {
        // Se ejecuta después de agotar reintentos
        // Log::error('Welcome email failed', ['user' => $this->user->id]);
    }
}

// Dispatch: SendWelcomeEmail::dispatch($user);
// Worker: php artisan queue:work --tries=3
