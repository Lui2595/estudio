<?php

declare(strict_types=1);

/**
 * TEMA: Dependency Injection
 * ENTREVISTA: ¿Qué es DI y por qué es importante?
 *
 * Las dependencias se inyectan desde afuera, no se crean dentro.
 * Facilita testing (mock), desacoplamiento y flexibilidad.
 */

interface MailerInterface
{
    public function send(string $to, string $subject, string $body): void;
}

class SmtpMailer implements MailerInterface
{
    public function send(string $to, string $subject, string $body): void
    {
        // Envío real por SMTP
    }
}

class FakeMailer implements MailerInterface
{
    public array $sent = [];

    public function send(string $to, string $subject, string $body): void
    {
        $this->sent[] = compact('to', 'subject', 'body');
    }
}

class UserRegistrationService
{
    // Inyección por constructor (preferida)
    public function __construct(private MailerInterface $mailer) {}

    public function register(string $email): void
    {
        // Crear usuario...
        $this->mailer->send($email, 'Bienvenido', 'Gracias por registrarte');
    }
}

// En producción:
// $service = new UserRegistrationService(new SmtpMailer());

// En tests:
// $service = new UserRegistrationService(new FakeMailer());
