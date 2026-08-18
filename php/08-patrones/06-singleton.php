<?php

declare(strict_types=1);

/**
 * TEMA: Singleton (y por qué evitarlo)
 * ENTREVISTA: ¿Por qué el Singleton es considerado un anti-patrón?
 *
 * El patrón Singleton asegura que una clase tenga una única instancia accesible de forma global.
 * Se implementa restringiendo el constructor y gestionando el acceso a través de un método estático.
 *
 * Ejemplo clásico: una conexión a base de datos compartida por toda la aplicación.
 * 
 * Sin embargo... casi siempre DEBEMOS EVITAR este patrón, porque introduce varios problemas:
 *
 * Problemas del Singleton:
 * - Estado global oculto: La instancia es accesible en cualquier parte, como si fuera una variable global. Esto hace difícil predecir el estado de la app y complica los tests, porque distintos tests pueden compartir accidentalmente el mismo estado (¡efecto colateral!).
 * - Acoplamiento fuerte: Los objetos dependen directamente del singleton. Si necesitas cambiar la implementación o crear más de una instancia (por ejemplo, con otra configuración), tienes que modificar muchas partes del sistema.
 * - Viola el principio de responsabilidad única (SRP): La clase combina dos responsabilidades: su propia lógica y la gestión de su ciclo de vida (creación/almacenamiento).
 * - Dificulta el testeo: No se puede mockear el singleton de manera limpia, lo que obliga a usar trucos sucios para los tests.
 * - Pierde utilidad en frameworks modernos (como Laravel), que ya gestionan instancias únicas mediante el Service Container.
 *
 * En Laravel, la manera adecuada de garantizar una sola instancia es usando el Service Container:
 *   $this->app->singleton(DatabaseConnection::class);
 *   $db = app(DatabaseConnection::class);
 * De esta forma, la inyección de dependencias resuelve instancias únicas y facilita pruebas y mantenimiento. 
 */

// Implementación típica (NO recomendado en apps modernas):
class DatabaseConnection
{
    // Propiedad estática para almacenar la única instancia de la clase
    private static ?self $instance = null;

    /**
     * El constructor es privado para evitar que alguien use "new DatabaseConnection".
     * Solo se permite acceso por el método estático getInstance().
     */
    private function __construct() 
    {
        // Inicialización costosa, simulada
    }

    /**
     * Devuelve la única instancia existente, creándola si no existe.
     */
    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    // Problema: en tests NO podrás cambiar esta instancia, ni inyectar mocks fácilmente.
}

// EJEMPLO Laravel (recomendado):
// $this->app->singleton(DatabaseConnection::class);
// $db = app(DatabaseConnection::class);
