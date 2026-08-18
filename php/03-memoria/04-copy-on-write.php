<?php

/**
 * TEMA: Copy on Write (COW)
 * ENTREVISTA: ¿PHP copia arrays al asignarlos?
 *
 * NO inmediatamente. PHP usa COW para optimizar memoria.
 * La copia real ocurre cuando una de las variables se modifica.
 */

$a = [1, 2, 3];
$b = $a;

// En este punto, $a y $b comparten la misma memoria interna
// memory_get_usage() no duplica el array

$b[0] = 99; // Ahora PHP crea una copia real de $a para $b

// $a = [1, 2, 3]
// $b = [99, 2, 3]

// Para forzar copia inmediata:
$c = [...$a]; // Spread operator (PHP 7.4+)
// o: $c = array_merge($a);
