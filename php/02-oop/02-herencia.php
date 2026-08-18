<?php

declare(strict_types=1);

/**
 * TEMA: Herencia
 * ENTREVISTA: ¿Cuándo usar herencia vs composición?
 *
 * Herencia: relación "es un" (Dog es un Animal).
 * Composición: relación "tiene un" (por ejemplo, un Car tiene un Engine).
 * Usar herencia cuando una clase es un subtipo de otra ("un Perro es un Animal").
 * Usar composición cuando una clase contiene o utiliza otra como parte ("un Auto tiene un Motor").
 *
 * // Ejemplo conceptual de composición:
 * class Engine {}
 * class Car {
 *     private Engine $engine;
 *     public function __construct(Engine $engine) {
 *         $this->engine = $engine;
 *     }
 * }
 */

abstract class Animal
{
    public function __construct(protected string $name) {}

    abstract public function makeSound(): string;

    public function getName(): string
    {
        return $this->name;
    }
}

class Dog extends Animal
{
    public function makeSound(): string
    {
        return 'Guau!';
    }
}

class Cat extends Animal
{
    public function makeSound(): string
    {
        return 'Miau!';
    }
}
