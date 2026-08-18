<?php

declare(strict_types=1);

/**
 * TEMA: Arrow Functions (PHP 7.4+)
 * ENTREVISTA: ¿Ventaja de fn() sobre function()?
 *
 * Sintaxis corta, captura automática de variables del scope (por valor).
 * Solo una expresión, retorno implícito.
 */

class User
{
    public function __construct(public string $name, public bool $active) {}
}

$users = [
    new User('Ana', true),
    new User('Luis', false),
    new User('María', true),
];

// Arrow function: captura $users automáticamente si fuera necesario
$nombres = array_map(fn(User $u) => $u->name, $users);

$activos = array_filter($users, fn(User $u) => $u->active);

// Equivalente con closure:
// fn($u) => $u->name  vs  function($u) use ($algo) { return $u->name; }
