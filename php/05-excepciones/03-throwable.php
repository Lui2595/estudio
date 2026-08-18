<?php

/**
 * TEMA: Throwable
 * ENTREVISTA: ¿Qué es Throwable en PHP 7+?
 *
 * Interface base de Exception Y Error.
 * Permite capturar cualquier error throwable con un solo catch.
 */

try {
    // Puede lanzar Exception o Error
    $result = 10 / 0; // DivisionByZeroError en PHP 8+
} catch (\Throwable $e) {
    echo get_class($e) . ': ' . $e->getMessage();
    echo "\nEn: " . $e->getFile() . ':' . $e->getLine();
}

// Jerarquía:
// Throwable
// ├── Exception (errores recuperables)
// │   ├── RuntimeException
// │   └── LogicException
// └── Error (errores fatales del motor)
//     ├── TypeError
//     └── DivisionByZeroError
