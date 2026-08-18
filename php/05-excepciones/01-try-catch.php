<?php

declare(strict_types=1);

/**
 * TEMA: Try/Catch
 * ENTREVISTA: ¿Cuándo usar excepciones vs return false?
 *
 * Excepciones: errores excepcionales que interrumpen el flujo normal.
 * Return false/null: resultados esperados (usuario no encontrado).
 */

function dividir(float $a, float $b): float
{
    if ($b === 0.0) {
        throw new InvalidArgumentException('División por cero');
    }
    return $a / $b;
}

try {
    $resultado = dividir(10, 0);
} catch (InvalidArgumentException $e) {
    echo "Error: " . $e->getMessage();
} finally {
    // Siempre se ejecuta (cleanup)
    echo "\nOperación finalizada.";
}
