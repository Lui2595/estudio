<?php

declare(strict_types=1);

/**
 * TEMA: Adapter Pattern
 * ENTREVISTA: ¿Cuándo usarías un Adapter?
 *
 * Convierte la interfaz de una clase en otra que el cliente espera.
 * Útil para integrar APIs de terceros con interfaces propias.
 */

interface PaymentProcessor
{
    public function processPayment(float $amount, string $currency): bool;
}

// API externa con interfaz incompatible
class StripeApi
{
    public function createCharge(int $cents, string $curr): array
    {
        return ['status' => 'succeeded'];
    }
}

// Adapter: traduce nuestra interfaz a la de Stripe
class StripeAdapter implements PaymentProcessor
{
    public function __construct(private StripeApi $stripe) {}

    public function processPayment(float $amount, string $currency): bool
    {
        $result = $this->stripe->createCharge(
            (int) ($amount * 100),
            strtolower($currency)
        );
        return $result['status'] === 'succeeded';
    }
}
