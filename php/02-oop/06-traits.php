<?php

declare(strict_types=1);

/**
 * TEMA: Traits
 * ENTREVISTA: ¿Cuándo usarías un Trait en lugar de una clase abstracta?
 *
 * Trait: reutilizar comportamiento horizontal sin herencia.
 * Usar cuando varias clases NO comparten jerarquía pero sí funcionalidad.
 *
 * Clase abstracta: cuando hay relación "es un" y estado compartido.
 * Trait: cuando es funcionalidad transversal (Loggable, SoftDeletes, etc.)
 */

trait Loggable
{
    public function log(string $message): void
    {
        echo '[' . static::class . "] {$message}\n";
    }
}

trait Timestampable
{
    public ?\DateTime $createdAt = null;

    public function touch(): void
    {
        $this->createdAt = new \DateTime();
    }
}

class UserService
{
    use Loggable;
}

class OrderService
{
    use Loggable, Timestampable;
}
