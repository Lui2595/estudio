<?php

/**
 * TEMA: Database Transactions
 * ENTREVISTA: ¿Cuándo usar DB::transaction()?
 *
 * Cuando múltiples operaciones deben ser atómicas (todo o nada).
 * Si algo falla, se hace rollback automático.
 */

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

function crearPedido(array $items, int $userId): Order
{
    return DB::transaction(function () use ($items, $userId) {
        $order = Order::create(['user_id' => $userId, 'total' => 0]);

        $total = 0;
        foreach ($items as $item) {
            $product = Product::lockForUpdate()->find($item['product_id']);

            if ($product->stock < $item['quantity']) {
                throw new \RuntimeException("Stock insuficiente: {$product->name}");
            }

            $product->decrement('stock', $item['quantity']);
            $order->items()->create([
                'product_id' => $product->id,
                'quantity'   => $item['quantity'],
                'price'      => $product->price,
            ]);
            $total += $product->price * $item['quantity'];
        }

        $order->update(['total' => $total]);
        return $order;
    });

    // Si cualquier excepción ocurre → rollback automático
    // Segundo argumento: número de reintentos para deadlocks
    // DB::transaction(fn () => ..., 3);
}
