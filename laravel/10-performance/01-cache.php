<?php

/**
 * TEMA: Cache en Laravel
 * Drivers: file, redis, memcached, database, array (tests)
 */

use Illuminate\Support\Facades\Cache;

// Remember: obtiene o calcula y guarda
$users = Cache::remember('users.all', 3600, fn () => User::all());

// Tags (solo redis/memcached)
Cache::tags(['users', 'posts'])->put('user:1', $user, 3600);
Cache::tags(['users'])->flush(); // Invalida solo users

// Cache de queries Eloquent
User::query()->remember(3600)->get();

// Lock para evitar race conditions
$lock = Cache::lock('process-invoices', 10);
if ($lock->get()) {
    try {
        // Procesar facturas
    } finally {
        $lock->release();
    }
}
