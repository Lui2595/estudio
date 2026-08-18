<?php

/**
 * TEMA: DRY, KISS, YAGNI
 * ENTREVISTA: ¿Cuándo aplicarías YAGNI?
 *
 * DRY (Don't Repeat Yourself): evitar duplicación de lógica.
 * KISS (Keep It Simple, Stupid): la solución más simple que funcione.
 * YAGNI (You Aren't Gonna Need It): no implementes hasta que lo necesites.
 */

// MAL: duplicación (viola DRY)
function calcularTotalPedido(array $items): float
{
    $total = 0;
    foreach ($items as $item) {
        $total += $item['price'] * $item['qty'];
    }
    return $total;
}

function calcularTotalFactura(array $items): float
{
    $total = 0;
    foreach ($items as $item) {
        $total += $item['price'] * $item['qty'];
    }
    return $total;
}

// BIEN: una función reutilizable
function calcularTotal(array $items): float
{
    return array_reduce($items, fn($carry, $item) =>
        $carry + ($item['price'] * $item['qty']), 0.0);
}

// YAGNI: no crear abstracción para 1 caso de uso
// ¿Qué es un DTO? (Data Transfer Object): es una clase simple utilizada para transportar datos entre procesos o capas, sin lógica de negocio.
// Ejemplo de un DTO:
class UserDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email
    ) {}
}

// Se puede usar así:
// $userDto = new UserDTO(1, 'Juan', 'juan@email.com');
// KISS: preferir array simple antes que crear un DTO complejo si no se obtiene un beneficio claro.
