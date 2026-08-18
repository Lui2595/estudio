<?php

declare(strict_types=1);

/**
 * TEMA: Interfaces
 * ENTREVISTA: ¿Diferencia entre interface y clase abstracta?
 *
 * Interface: contrato puro, múltiple herencia de interfaces.
 * Clase abstracta: puede tener implementación y estado.
 */

interface Cacheable
{
    public function getCacheKey(): string;
    public function getTtl(): int;
}

interface Serializable
{
    public function toArray(): array;
}

// Una clase puede implementar múltiples interfaces
class Product implements Cacheable, Serializable
{
    public function __construct(
        private int $id,
        private string $name,
    ) {}

    public function getCacheKey(): string
    {
        return "product:{$this->id}";
    }

    public function getTtl(): int
    {
        return 3600;
    }

    public function toArray(): array
    {
        return ['id' => $this->id, 'name' => $this->name];
    }
}
