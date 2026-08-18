<?php

declare(strict_types=1);

/**
 * TEMA: Custom Exceptions
 * ENTREVISTA: ¿Por qué crear excepciones personalizadas?
 *
 * Permite manejar errores de dominio de forma específica.
 * Facilita logging, respuestas HTTP y debugging.
 */

class UserNotFoundException extends \Exception
{
    public function __construct(int $userId)
    {
        parent::__construct("Usuario #{$userId} no encontrado", 404);
    }
}

class InsufficientFundsException extends \Exception
{
    public function __construct(float $required, float $available)
    {
        parent::__construct(
            "Fondos insuficientes: requiere {$required}, disponible {$available}",
            422
        );
    }
}

function withdraw(float $amount, float $balance): float
{
    if ($amount > $balance) {
        throw new InsufficientFundsException($amount, $balance);
    }
    return $balance - $amount;
}
