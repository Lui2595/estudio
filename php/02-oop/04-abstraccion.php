<?php

declare(strict_types=1);

/**
 * TEMA: Abstracción
 * ENTREVISTA: ¿Qué es abstracción en OOP?
 *
 * Abstracción significa exponer solo lo esencial y ocultar la complejidad interna.
 * En PHP se logra mediante interfaces y clases abstractas, que definen contratos
 * sin preocuparse por la implementación concreta.
 * 
 * En este ejemplo, la aplicación solo se preocupa de que exista una forma de
 * notificar, pero no conoce (ni le importa) cómo.
 */

interface Notifier
{
    /**
     * Envía una notificación a un destinatario.
     * La implementación específica (email, SMS, push, etc.) la decide la clase concreta.
     */
    public function send(string $to, string $message): void;
}

class EmailNotifier implements Notifier
{
    public function send(string $to, string $message): void
    {
        // Aquí estaría la lógica real para enviar un email
        echo "Email enviado a {$to} con mensaje: {$message}\n";
    }
}

// Se podría tener otra implementación diferente (ejemplo: SMS)
class SMSNotifier implements Notifier
{
    public function send(string $to, string $message): void
    {
        // Lógica para enviar SMS
        echo "SMS enviado a {$to} con mensaje: {$message}\n";
    }
}

class OrderService
{
    /**
     * OrderService depende de Notifier, no de una implementación concreta.
     */
    public function __construct(private Notifier $notifier) {}

    public function confirmOrder(int $orderId, string $contact): void
    {
        // Solo le importa QUE se notifique, no CÓMO ni a través de qué canal.
        $mensaje = "Pedido #{$orderId} confirmado";
        $this->notifier->send($contact, $mensaje);
        echo "Proceso de confirmación terminado para pedido #{$orderId}\n";
    }
}

// --- Ejemplo de uso ---
// Cambiar la notificación de email a SMS solo requiere cambiar la instancia.

$orderServiceEmail = new OrderService(new EmailNotifier());
$orderServiceEmail->confirmOrder(101, 'cliente@email.com');

$orderServiceSMS = new OrderService(new SMSNotifier());
$orderServiceSMS->confirmOrder(102, '+34123456789');

/*
    Salida esperada:
    Email enviado a cliente@email.com con mensaje: Pedido #101 confirmado
    Proceso de confirmación terminado para pedido #101
    SMS enviado a +34123456789 con mensaje: Pedido #102 confirmado
    Proceso de confirmación terminado para pedido #102

    Así se demuestra cómo la abstracción permite trabajar con distintos detalles
    internos sin cambiar el código del consumidor (OrderService).
*/