<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;

/**
 * TEMA: Single Action Controller
 * Una sola acción: método __invoke()
 * Ideal para acciones simples y específicas.
 */
class ShowUserController extends Controller
{
    public function __invoke(User $user): UserResource
    {
        $user->load('posts', 'profile');
        return new UserResource($user);
    }
}

// Ruta: Route::get('/users/{user}/profile', ShowUserController::class);
