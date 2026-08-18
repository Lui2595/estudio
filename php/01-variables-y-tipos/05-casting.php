<?php

/**
 * TEMA: Casting (conversión de tipos)
 * ENTREVISTA: ¿Diferencia entre (int) y intval()?
 *
 * Casting: conversión explícita con (tipo)
 * intval(): función que acepta base y tiene comportamiento específico
 */

$valor = "42.9";

$entero = (int) $valor;       // 42 (trunca decimales)
$flotante = (float) $valor;   // 42.9
$booleano = (bool) $valor;    // true (string no vacío)
$string = (string) 123;       // "123"
$array = (array) "hola";      // ["hola"]

// Cuidado con casting de objetos
$obj = new stdClass();
$obj->name = "test";
$arr = (array) $obj; // ["name" => "test"]

// intval con base
$hex = intval("ff", 16); // 255
