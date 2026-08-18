<?php

/**
 * TEMA: Anonymous Functions
 * ENTREVISTA: ¿Diferencia entre closure y función anónima?
 *
 * Toda closure es función anónima, pero no toda anónima es closure.
 * Closure = anónima + captura de variables del scope padre (use).
 */

// Función anónima simple (sin captura)
$saludar = function (string $nombre): string {
    return "Hola, {$nombre}";
};

// Usada como callback
$usuarios = ['Ana', 'Luis', 'María'];
$saludos = array_map(function ($nombre) {
    return "Hola, {$nombre}";
}, $usuarios);

// Filtrado con anónima
$mayores = array_filter([15, 22, 17, 30], function ($edad) {
    return $edad >= 18;
});
