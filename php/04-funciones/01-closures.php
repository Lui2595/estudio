<?php

/**
 * TEMA: Closures
 * ENTREVISTA: ¿Qué es un closure y para qué sirve?
 *
 * Un closure es una función anónima (no tiene nombre propio) que puede capturar 
 * variables del scope externo donde fue definida,
 * permitiendo usarlas dentro de su cuerpo incluso si ese scope ya terminó.
 * Es muy utilizada para callbacks, middleware, eventos y
 *  ciertas estrategias de programación funcional como lazy evaluation.
 */

// Ejemplo 1: Closure capturando variables externas
$multiplicador = 3;

$multiplicar = function (int $n) use ($multiplicador): int {
    // Aquí $multiplicador viene del scope externo
    return $n * $multiplicador;
};

$resultado1 = $multiplicar(5); // 15
$resultado2 = $multiplicar(10); // 30

echo "Ejemplo multiplicar:\n";
echo "5 x 3 = {$resultado1}\n"; // 15
echo "10 x 3 = {$resultado2}\n"; // 30

// Ejemplo 2: Capturando variables por referencia (&)
$contador = 0;
$incrementar = function () use (&$contador): void {
    $contador++;
};

echo "\nEjemplo contador:\n";
$incrementar(); // $contador = 1
$incrementar(); // $contador = 2
echo "Contador después de dos incrementos: {$contador}\n"; // 2

// Ejemplo 3: Closure como callback en funciones array_*
$numeros = [1, 2, 3, 4];

// Usando array_map con un closure tradicional
$dobles = array_map(function ($n) {
    return $n * 2;
}, $numeros);

echo "\nDoble de cada número:\n";
foreach ($dobles as $original => $doble) {
    echo "{$numeros[$original]} x 2 = {$doble}\n";
}

// También se puede usar arrow functions (PHP 7.4+)
$triplos = array_map(fn($n) => $n * 3, $numeros);

echo "\nTriple de cada número:\n";
foreach ($triplos as $original => $triplo) {
    echo "{$numeros[$original]} x 3 = {$triplo}\n";
}
