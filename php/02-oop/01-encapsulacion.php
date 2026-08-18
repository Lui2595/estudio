<?php

declare(strict_types=1);

/**
 * TEMA: Encapsulación
 * ENTREVISTA: ¿Por qué usar private/protected en lugar de public?
 *
 * Oculta el estado interno y expone solo lo necesario.
 * Permite cambiar la implementación sin romper consumidores.
 */
/**
 * Diferencia entre private y protected:
 * 
 * - private: solo la propia clase puede acceder a la propiedad o método. 
 *   Ninguna subclase (clase hija) tiene acceso directo.
 *
 * - protected: la propia clase Y sus subclases pueden acceder a la propiedad o método.
 *
 * Ejemplo:
 */

class A {
    private string $soloA = "A";
    protected string $aYB = "A y B";
    public string $publica = "A cualquiera";

    public function ver() {
        echo $this->soloA; // OK
        echo $this->aYB;   // OK
        echo $this->publica; // OK
    }
}

class B extends A {
    public function ver() {
        // echo $this->soloA; // Error: private, sólo accesible desde A
        echo $this->aYB;     // OK: protected, accesible desde subclase
        echo $this->publica; // OK
    }
}

class BankAccount
{
    private float $balance = 0;

    public function deposit(float $amount): void
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException('El monto debe ser positivo');
        }
        $this->balance += $amount;
    }

    public function getBalance(): float
    {
        return $this->balance;
    }
}

// $account = new BankAccount();
// $account->balance = -1000; // ERROR: propiedad privada
