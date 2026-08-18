<?php

declare(strict_types=1);

/**
 * TEMA: Factory Pattern
 * ENTREVISTA: ¿Cuándo usar Factory vs new directo?
 *
 * Centraliza la creación de objetos complejos.
 * Útil cuando la instanciación depende de configuración o tipo.
 */

interface Notification
{
    public function send(string $message): void;
}

class EmailNotification implements Notification
{
    public function send(string $message): void { /* ... */ }
}

class SmsNotification implements Notification
{
    public function send(string $message): void { /* ... */ }
}

class NotificationFactory
{
    public static function create(string $channel): Notification
    {
        return match ($channel) {
            'email' => new EmailNotification(),
            'sms'   => new SmsNotification(),
            default => throw new InvalidArgumentException("Canal: {$channel}"),
        };
    }
}

// $notifier = NotificationFactory::create($user->preferredChannel);
