<?php

declare(strict_types=1);

/**
 * TEMA: Observer Pattern
 * ENTREVISTA: ¿Cómo se relaciona con Events/Listeners de Laravel?
 *
 * El patrón Observer define una relación 1:N entre un objeto "sujeto" (Subject)
 * —que mantiene cierta información o estado— y varios "observadores" (Observers),
 * que desean ser notificados automáticamente cada vez que ese estado cambia.
 * 
 * Así, cuando ocurre una acción relevante (por ejemplo, se crea un pedido),
 * el sujeto lo comunica a todos los observadores suscritos, quienes pueden
 * reaccionar realizando tareas adicionales (enviar un email, actualizar un inventario, etc.).
 *
 * En Laravel, el sistema de Events & Listeners es una implementación
 * del patrón Observer. Cuando disparas un evento, todos los listeners
 * registrados se ejecutan automáticamente, desacoplando el core de la lógica secundaria.
 * 
 * Ventajas:
 * - Bajo acoplamiento: el sujeto no conoce detalles de los observadores.
 * - Es fácil agregar o eliminar comportamientos secundarios sin tocar la lógica principal.
 */

// Definimos la interfaz que deben implementar los observadores de pedidos
interface OrderObserver
{
    /**
     * Método llamado cuando se coloca un nuevo pedido.
     * @param int $orderId ID del pedido generado.
     */
    public function orderPlaced(int $orderId): void;
}

/**
 * El "Subject". Representa el objeto a observar (colocación de pedidos).
 * Notifica a todos los observadores registrados cuando ocurre el evento.
 */
class OrderSubject
{
    /** @var OrderObserver[] Lista de observadores suscritos */
    private array $observers = [];

    /**
     * Permite que un observador se suscriba a las notificaciones.
     */
    public function attach(OrderObserver $observer): void
    {
        $this->observers[] = $observer;
    }

    /**
     * Simula la acción de colocar un pedido y notifica a los observadores.
     */
    public function placeOrder(int $orderId): void
    {
        // Aquí iría la lógica para registrar el pedido en la base de datos, etc.

        // Notificamos a todos los observadores que se creó un pedido
        foreach ($this->observers as $observer) {
            $observer->orderPlaced($orderId);
        }
    }
}

/**
 * Un observador concreto: envía un correo cuando se coloca un pedido.
 */
class SendEmailObserver implements OrderObserver
{
    public function orderPlaced(int $orderId): void
    {
        echo "Email enviado para pedido #{$orderId}\n";
    }
}

/**
 * Otro observador concreto: actualiza el inventario tras un pedido.
 */
class UpdateInventoryObserver implements OrderObserver
{
    public function orderPlaced(int $orderId): void
    {
        echo "Inventario actualizado para pedido #{$orderId}\n";
    }
}

// EJEMPLO DE USO:

$orderSubject = new OrderSubject();
$orderSubject->attach(new SendEmailObserver());          // se suscribe el email
$orderSubject->attach(new UpdateInventoryObserver());    // se suscribe el inventario

// Cuando se coloca un pedido, ambos observadores son notificados automáticamente
$orderSubject->placeOrder(101); // Output:
// Email enviado para pedido #101
// Inventario actualizado para pedido #101