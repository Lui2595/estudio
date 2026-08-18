<?php

/**
 * TEMA: Stack vs Heap
 * ¿Qué significa cada uno?
 * - Stack (pila): Zona de memoria donde se almacenan variables locales y el contexto de las llamadas a funciones. Es rápida pero de tamaño limitado; la memoria se libera automáticamente al salir del contexto.
 * - Heap (montón): Zona de memoria para almacenar objetos y arrays que se crean dinámicamente. Es más flexible y grande, pero requiere gestión (en PHP lo hace el recolector de basura).
 * ENTREVISTA: ¿Dónde viven las variables en PHP?
 *
 * Stack: variables locales, llamadas a funciones (rápido, tamaño limitado).
 * Heap: objetos y arrays (asignados dinámicamente, gestionados por GC).
 *
 * En PHP, los tipos escalares viven en el stack/zval.
 * Los objetos y arrays son referencias a memoria en el heap.
 */

function ejemplo(): void
{
    $numero = 42;           // Escalar → stack/zval
    $usuario = new stdClass(); // Objeto → heap, $usuario es referencia
    $usuario->name = 'Ana';

    $lista = [1, 2, 3];     // Array → heap
}

// Los objetos persisten mientras haya referencias activas
