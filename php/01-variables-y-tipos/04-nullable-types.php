<?php

declare(strict_types=1);

/**
 * TEMA: Nullable Types
 * ENTREVISTA: ¿Qué significa ?User o User|null?
 *
 * Indica que el valor puede ser del tipo declarado O null.
 * Útil para métodos que pueden no encontrar un resultado.
 */

class User
{
    public function __construct(public int $id, public string $name) {}
}

function findUser(int $id): ?User
{
    if ($id <= 0) {
        return null; // Usuario no encontrado
    }

    return new User($id, 'María');
}

// Equivalente: User|null
function findUserAlt(int $id): User|null
{
    return findUser($id);
}
