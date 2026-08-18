<?php

/**
 * TEMA: Referencias (&)
 * ENTREVISTA: ¿Qué hace el operador & en PHP?
 *
 * Crea un alias: dos variables apuntan al MISMO valor.
 * Sin &, las variables escalares se copian por valor.
 */

$a = 5;
$b = &$a;  // $b es alias de $a
$b = 10;
// $a ahora es 10

function incrementar(int &$valor): void
{
    $valor++; // Modifica la variable original
}

$contador = 0;
incrementar($contador); // $contador = 1

// Arrays: asignación por defecto copia por valor (con COW)
$arr1 = [1, 2, 3];
$arr2 = $arr1;    // No copia inmediatamente (Copy on Write)
$arr2[] = 4;      // AHORA sí copia porque $arr2 cambió
