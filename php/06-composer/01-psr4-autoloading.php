<?php

/**
 * TEMA: PSR-4 Autoloading
 * ENTREVISTA: ¿Cómo funciona el autoload de Composer?
 *
 * PSR-4 mapea namespaces a directorios.
 * Composer genera vendor/autoload.php que carga clases automáticamente.
 *
 * composer.json:
 * {
 *   "autoload": {
 *     "psr-4": {
 *       "App\\": "src/"
 *     }
 *   }
 * }
 *
 * App\User → src/User.php
 * App\Services\PaymentService → src/Services/PaymentService.php
 */

// require 'vendor/autoload.php';
// $user = new App\User(); // Se carga automáticamente
