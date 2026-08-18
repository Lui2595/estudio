<?php

declare(strict_types=1);

/**
 * TEMA: Union Types (PHP 8.0+)
 * ENTREVISTA: ¿Cuándo usarías int|string?
 *
 * Cuando un parámetro puede ser de más de un tipo.
 * Ejemplo real: ID que puede venir como int de BD o string de URL.
 */

class User
{
    public function __construct(public int $id, public string $name) {}
}

function getUser(int|string $id): ?User
{
    if (is_string($id)) {
        $id = (int) $id;
    }

    // Simulación de búsqueda
    return new User($id, 'Juan');
}

// getUser(1);      // OK
// getUser("42");   // OK
// getUser(null);   // TypeError
