<?php

declare(strict_types=1);

/**
 * TEMA: Type Hinting
 * ENTREVISTA: ¿Para qué sirve el type hinting en PHP?
 *
 * Type hinting te permite declarar explícitamente qué tipo de datos acepta una función, método o propiedad:
 * - En parámetros de funciones/métodos: obliga a que solo se puedan pasar valores del tipo especificado.
 * - En valores de retorno: declara y asegura el tipo de valor que debe devolver la función.
 * - En propiedades (desde PHP 7.4): las propiedades del objeto tendrán siempre el tipo declarado.
 *
 * Ventajas:
 * - Ayuda a detectar errores de tipo en tiempo de desarrollo, no solo en runtime.
 * - Mejora la autocompletación y navegación en el IDE.
 * - Hace que el código sea más claro y robusto.
 */

// Definimos una clase User fuertemente tipada
class User
{
    // Las propiedades son tipadas como string, y se inicializan en el constructor
    public function __construct(
        private string $name,
        private string $email,
    ) {}

    // Método que devuelve el nombre del usuario (string)
    public function getName(): string
    {
        return $this->name;
    }
}

// Esta función solo acepta como primer argumento un User,
// y como segundo argumento un string. 
// Si se pasa otro tipo (por ejemplo, un array), PHP lanzará un error.
function enviarEmail(User $user, string $asunto): bool
{
    // Aquí podríamos acceder a $user->getName(), $user->email, etc.,
    // sabiendo que siempre será una instancia válida de User.
    
    // Simulamos el envío de email. Siempre devuelve bool (true).
    return true;
}

// Ejemplo de uso:
// $usuario = new User("Ada Lovelace", "ada@example.com");
// $ok = enviarEmail($usuario, "¡Bienvenida!");