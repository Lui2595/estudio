<?php

/**
 * TEMA: Tipado dinámico vs estricto
 * ENTREVISTA: ¿Qué hace declare(strict_types=1)?
 *
 * Sin strict_types, PHP hace coerción implícita (ej: "5" → 5).
 * Con strict_types=1, los tipos deben coincidir exactamente.
 */

declare(strict_types=1);

function sumar(int $a, int $b): int
{
    return $a + $b;
}

// sumar(5, 10);      // OK → 15
// sumar("5", 10);    // TypeError con strict_types=1
// sumar("5", 10);    // OK sin strict_types → 15 (coerción)

echo "Tipado estricto activo. Los argumentos deben ser int exactos.\n";
