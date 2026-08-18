<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use App\Jobs\SendOrderEmail;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * TEMA: Listeners
 * Reaccionan a eventos. Pueden ir a cola (ShouldQueue).
 *
 * Registro en EventServiceProvider:
 * OrderPlaced::class => [SendOrderConfirmation::class, UpdateInventory::class],
 */
class SendOrderConfirmation implements ShouldQueue
{
    public function handle(OrderPlaced $event): void
    {
        SendOrderEmail::dispatch($event->order);
    }
}

// Dispatch: event(new OrderPlaced($order));
