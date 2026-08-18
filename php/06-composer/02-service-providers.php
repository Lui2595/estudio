<?php

declare(strict_types=1);

/**
 * TEMA: Service Providers (concepto aplicable a Laravel)
 * ENTREVISTA: ¿Qué hace un Service Provider?
 *
 * - Punto central de registro y configuración de servicios/componentes en el contenedor de dependencias.
 * - register(): enlaza interfaces con implementaciones concretas, servicios, singletons, etc.
 * - boot(): ejecuta lógica dependiente de otros servicios ya registrados (eventos, listeners, rutas).
 * - Permite desacoplar la configuración de dependencias y facilita testing.
 *
 * Laravel y otros frameworks usan este patrón ampliamente.
 * 
 * Ejemplo sencillo: 
 * 1. Registrar un logger (FileLogger, DatabaseLogger).
 * 2. Registrar un servicio que depende del logger.
 * 3. Utilizar el container para resolver cualquier dependencia.
 */

interface LoggerInterface
{
    public function log(string $message): void;
}

class FileLogger implements LoggerInterface
{
    public function log(string $message): void
    {
        file_put_contents('app.log', $message . PHP_EOL, FILE_APPEND);
    }
}

class DatabaseLogger implements LoggerInterface
{
    public function log(string $message): void
    {
        // Simulación: guarda el log en una "base de datos" (archivo)
        file_put_contents('database.log', $message . PHP_EOL, FILE_APPEND);
    }
}

// Un servicio que depende del Logger
class PaymentService
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function pay(float $amount): void
    {
        // Lógica de pago...
        $this->logger->log("Pagado: {$amount}");
    }
}

// Simulación de un Service Provider para Logger
class LogServiceProvider
{
    public function register(Container $container): void
    {
        // Podría cambiar FileLogger por DatabaseLogger sin cambiar el resto del código
        $container->bind(LoggerInterface::class, FileLogger::class);
    }

    public function boot(): void
    {
        // Aquí se pueden registrar eventos, rutas, listeners, etc.
        // Por ejemplo:
        // $router->get('/logs', ...);
    }
}

// Otro Service Provider para registrar PaymentService
class PaymentServiceProvider
{
    public function register(Container $container): void
    {
        // Closure permite inyectar dependencias del container
        $container->bind(PaymentService::class, function(Container $c) {
            $logger = $c->make(LoggerInterface::class);
            return new PaymentService($logger);
        });
    }

    public function boot(): void
    {
        // Inicialización posterior a la inyección
    }
}

// Contenedor simple de dependencias
class Container
{
    private array $bindings = [];

    // Puede ser clase (string) o Closure (factory)
    public function bind(string $abstract, $concrete): void
    {
        $this->bindings[$abstract] = $concrete;
    }

    public function make(string $abstract): object
    {
        $concrete = $this->bindings[$abstract] ?? $abstract;

        // Si es un closure, invocar pasando el container (para inyección)
        if ($concrete instanceof \Closure) {
            return $concrete($this);
        }
        // Si es string, instanciar (simple)
        return new $concrete();
    }
}

// === EJEMPLO DE USO SIMPLIFICADO ===

// 1. Crear el container
$container = new Container();

// 2. Registrar providers
$logProvider = new LogServiceProvider();
$logProvider->register($container);

$paymentProvider = new PaymentServiceProvider();
$paymentProvider->register($container);

// 3. Boot (en frameworks, se haría automáticamente)
$logProvider->boot();
$paymentProvider->boot();

// 4. Usar servicios desde el container
/** @var PaymentService $paymentService */
$paymentService = $container->make(PaymentService::class);
$paymentService->pay(100.0); // Debería crear un log "Pagado: 100.0" en app.log

// Cambia el logger solo cambiando el binding en LogServiceProvider
/**
 * ¿Qué es el Container?
 *
 * El "container" (también llamado "Service Container" o "IoC Container") es un objeto que gestiona la creación 
 * y resolución de dependencias de clases en una aplicación.
 *
 * En vez de crear manualmente los objetos y 
 * sus dependencias usando "new Clase()", delegas esa responsabilidad al container.
 *
 * El container sabe cómo construir cada servicio y sus dependencias 
 * (normalmente porque tú se lo defines con "bind" o con reglas de autodiagnosis).
 * Así, cuando necesitas una clase (por ejemplo, PaymentService), le pides al container: 
 *   $container->make(PaymentService::class)
 * y el container te devuelve una instancia, ya lista con sus dependencias internamente resueltas (como Logger).
 *
 * Esto ayuda a desacoplar el código, facilita pruebas, 
 * y hace más flexible cambiar implementaciones (por ejemplo, de 
 * FileLogger a DatabaseLogger) sin modificar todas las partes que usan el logger.
 *
 * En frameworks como Laravel, el container es una pieza fundamental para 
 * manejar la inyección de dependencias y la configuración de los servicios.
 *
 * Ejemplo muy resumido:
 *   $container->bind(Logger::class, FileLogger::class);
 *   $logger = $container->make(Logger::class); // retorna un FileLogger 
 */
//
/**
 * ENTONCES PODEMOS DECIR QUE EL SERVICE CONTAINER ES COMO UNA "CAJA" DE SERVICIOS
 * YA RESUELTOS Y CON TODAS SUS DEPENDENCIAS CARGADAS,
 * QUE PUEDE SER ACCESIBLE DESDE CUALQUIER PARTE DE LA APLICACIÓN
 * SIN LA NECESIDAD DE INSTANCIAR O CONFIGURAR EL SERVICIO MANUALMENTE.
 *
 * Ejemplo: simplemente pides el servicio cuando lo necesitas,
 * sin preocuparte de cómo fue creado:
 *
 *   $emailService = $container->make(EmailService::class);
 *   $emailService->send('destino@email.com', 'Hola!');
 *
 * Esto simplifica mucho el desarrollo, el mantenimiento
 * y la flexibilidad del código, especialmente en aplicaciones grandes.
 */