<?php

/**
 * TEMA: Garbage Collector
 * ENTREVISTA: ¿Cómo libera memoria PHP?
 *
 * PHP usa reference counting + cyclic garbage collector.
 * Cuando el contador de referencias llega a 0, libera memoria.
 * El GC detecta ciclos (objetos que se referencian mutuamente).
 */

class Node
{
    public ?Node $next = null;
}

$a = new Node();
$b = new Node();
$a->next = $b;
$b->next = $a; // Ciclo: ninguno llega a refcount 0 solo

unset($a, $b); // El GC detectará y limpiará el ciclo

// gc_collect_cycles() fuerza recolección de ciclos
