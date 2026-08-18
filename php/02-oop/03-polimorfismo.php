<?php

declare(strict_types=1);

/**
 * TEMA: Polimorfismo
 * ENTREVISTA: Explica polimorfismo con un ejemplo.
 *
 * Mismo método, distinto comportamiento según la instancia.
 * Permite programar contra interfaces/abstracciones.
 */

interface PaymentGateway
{
    public function charge(float $amount): bool;
}

class StripeGateway implements PaymentGateway
{
    public function charge(float $amount): bool
    {
        // Lógica Stripe
        return true;
    }
}

class PayPalGateway implements PaymentGateway
{
    public function charge(float $amount): bool
    {
        // Lógica PayPal
        return true;
    }
}

function processPayment(PaymentGateway $gateway, float $amount): bool
{
    // No importa cuál gateway: todos implementan charge()
    return $gateway->charge($amount);
}
