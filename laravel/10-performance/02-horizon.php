<?php

/**
 * TEMA: Laravel Horizon
 * Dashboard para monitorear colas Redis en tiempo real.
 *
 * Características:
 * - Métricas de throughput, tiempo de espera, fallos
 * - Balanceo de workers por cola
 * - Reintentos y failed jobs management
 * - Notificaciones (Slack, SMS, email)
 *
 * Instalación:
 * composer require laravel/horizon
 * php artisan horizon:install
 *
 * Supervisor config para producción:
 * [program:horizon]
 * command=php /var/www/artisan horizon
 * autostart=true
 * autorestart=true
 *
 * Acceso: /horizon (proteger con gate en producción)
 */
