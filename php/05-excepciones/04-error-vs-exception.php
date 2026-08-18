<?php

/**
 * TEMA: Error vs Exception
 * ENTREVISTA: ¿Diferencia entre Error y Exception?
 *
 * Exception: errores de aplicación, diseñados para ser capturados.
 * Error: errores del motor PHP (tipo incorrecto, división por cero).
 *
 * Antes de PHP 7, los Errors eran fatales y no capturables.
 * Ahora ambos implementan Throwable.
 */

// Exception (tú la lanzas o la librería)
function findUser(int $id): array
{
    throw new \RuntimeException("Usuario no encontrado");
}

// Error (PHP lo genera)
// findUser("texto"); // TypeError: Argument #1 must be of type int

try {
    // código
} catch (\Exception $e) {
    // Solo excepciones de aplicación
} catch (\Error $e) {
    // Solo errores del motor
} catch (\Throwable $e) {
    // Ambos (recomendado en capa global)
}
