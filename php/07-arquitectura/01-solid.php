<?php

declare(strict_types=1);

/**
 * TEMA: Principios SOLID
 * ENTREVISTA: ¿Qué es SRP y qué es DIP?
 * - SRP (Single Responsibility Principle): Cada clase debe tener una única razón para cambiar, es decir, una sola responsabilidad.
 * - DIP (Dependency Inversion Principle): Las clases deben depender de abstracciones (interfaces), no de implementaciones concretas.
 *
 * S - Single Responsibility: una clase, una razón para cambiar.
 * O - Open/Closed: abierto a extensión, cerrado a modificación.
 * L - Liskov Substitution: subtipos deben poder ser usados donde se espera la clase base, sin alterar el comportamiento.
 *   Ejemplo: Si Dog extiende Animal, debe poder usarse todo Dog donde se espere un Animal, sin errores inesperados.
 * I - Interface Segregation: interfaces pequeñas y específicas.
 * D - Dependency Inversion: depender de abstracciones, no concreciones.
 */


/**
 * LISKOV (Liskov Substitution Principle, LSP):
 * 
 * Significa que las clases hijas (subtipos) deben poder sustituir a su clase base (supertipo)
 * sin que esto altere el funcionamiento correcto del programa.
 * 
 * Es decir: donde uso la clase base, debe poder usar también cualquier subclase, y el comportamiento
 * debe seguir siendo coherente y predecible (no debe romper los contratos asumidos por la clase base).
 * 
 * Ejemplo típico: 
 *
 * class Ave { public function volar() {} }
 * class Pinguino extends Ave { public function volar() { throw new Exception(); } }
 * 
 * Aquí, Pinguino rompe Liskov porque aunque es un 'Ave', no puede volar como se espera.
 *
 * En resumen: los métodos de las subclases no pueden debilitar las promesas o expectativas establecidas
 * por la clase base.
 */
// SRP: UserController solo maneja HTTP, UserService la lógica
interface UserRepositoryInterface
{
    public function find(int $id): ?array;
}

class UserService
{
    public function __construct(private UserRepositoryInterface $repo) {}

    public function getUser(int $id): ?array
    {
        return $this->repo->find($id);
    }
}

// DIP: UserService depende de la interfaz, no de MySQLUserRepository
class MySQLUserRepository implements UserRepositoryInterface
{
    public function find(int $id): ?array
    {
        return ['id' => $id, 'name' => 'Test'];
    }
}

// OCP: agregar nuevo gateway sin modificar PaymentProcessor
interface PaymentGateway
{
    public function pay(float $amount): bool;
}

class PaymentProcessor
{
    public function __construct(private PaymentGateway $gateway) {}

    public function process(float $amount): bool
    {
        return $this->gateway->pay($amount);
    }
}
