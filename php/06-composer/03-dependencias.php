<?php

/**
 * TEMA: Gestión de dependencias con Composer
 * ENTREVISTA: ¿Diferencia entre require y require-dev?
 *
 * require: dependencias de producción (se instalan siempre).
 * require-dev: solo desarrollo (PHPUnit, PHPStan, etc.).
 *
 * composer.lock: versiones exactas instaladas (commitear siempre).
 * composer.json: restricciones de versión (^8.2, ~1.5).
 *
 * Comandos clave:
 * composer install     → instala según lock
 * composer update      → actualiza según json
 * composer dump-autoload → regenera autoload
 */

// Versionado semántico:
// ^1.2.3 → >=1.2.3 <2.0.0
// ~1.2.3 → >=1.2.3 <1.3.0
// 1.2.*  → >=1.2.0 <1.3.0
