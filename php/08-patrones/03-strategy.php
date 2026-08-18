<?php

declare(strict_types=1);

/**
 * TEMA: Strategy Pattern
 * ENTREVISTA: ¿Diferencia entre Strategy y Factory?
 *
 * Strategy: intercambia ALGORITMOS en runtime.
 * Factory: crea OBJETOS según condiciones.
 *
 * Ejemplo extendido:
 *
 * Imagina que tienes pedidos (Order) y quieres aplicar distintos tipos de descuento,
 * según el cliente, el contexto u otras condiciones. En vez de programar la lógica del monto final
 * directamente en Order, delegas el cálculo a un "DiscountStrategy", que puede cambiarse fácilmente.
 * Así, puedes agregar/quitar tipos de descuento SIN modificar la clase Order, cumpliendo Open/Closed.
 * 
 * Aquí, cada "estrategia" es una clase distinta que sabe calcular el descuento de una manera específica.
 * 
 * Paso a paso:
 * 1. Definimos una interfaz 'DiscountStrategy' para el método de cálculo.
 * 2. Creamos varias estrategias: sin descuento, porcentaje, etc.
 * 3. Order recibe en el constructor la estrategia a usar.
 * 4. Al llamar a finalTotal(), Order delega el cálculo.
 */

// Estrategia: contrato para cualquier tipo de descuento
interface DiscountStrategy
{
    public function calculate(float $amount): float;
}

// Estrategia concreta: SIN descuento
class NoDiscount implements DiscountStrategy
{
    public function calculate(float $amount): float
    {
        return $amount; // no aplica ningún descuento
    }
}

// Estrategia concreta: descuento porcentual (ej: 10%)
class PercentageDiscount implements DiscountStrategy
{
    public function __construct(private float $percent) {}

    public function calculate(float $amount): float
    {
        return $amount * (1 - $this->percent / 100); // descuenta %
    }
}

// Estrategia concreta: descuento fijo
class FixedDiscount implements DiscountStrategy
{
    public function __construct(private float $fixedAmount) {}

    public function calculate(float $amount): float
    {
        return max(0, $amount - $this->fixedAmount);
    }
}

// Clase de negocio: Order, que delega el cálculo del total a la estrategia seleccionada
class Order
{
    public function __construct(
        private float $total,
        private DiscountStrategy $discount,
    ) {}

    // Calcula el total FINAL usando la estrategia configurada
    public function finalTotal(): float
    {
        return $this->discount->calculate($this->total);
    }
}

// Ejemplo de uso:
$order1 = new Order(100, new NoDiscount());
echo $order1->finalTotal(); // 100 (sin descuento)

$order2 = new Order(100, new PercentageDiscount(10));
echo $order2->finalTotal(); // 90 (10% descuento)

$order3 = new Order(100, new FixedDiscount(15));
echo $order3->finalTotal(); // 85 (descuento fijo de 15)