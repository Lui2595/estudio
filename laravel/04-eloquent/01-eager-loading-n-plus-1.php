<?php

/**
 * TEMA: Eager Loading y N+1 Problem
 * ENTREVISTA MUY COMÚN: ¿Qué es el N+1 y cómo lo solucionas?
 *
 * N+1: 1 query para la lista + N queries (una por cada relación).
 * Ejemplo: 100 posts = 1 + 100 = 101 queries.
 *
 * Solución: eager loading con with(), load(), o withCount().
 */

use App\Models\Post;
use App\Models\User;

// MAL: N+1 Problem
function malEjemplo()
{
    $posts = Post::all(); // 1 query
    foreach ($posts as $post) {
        echo $post->user->name; // N queries (una por post)
    }
}

// BIEN: Eager Loading
function bienEjemplo()
{
    $posts = Post::with('user')->get(); // 2 queries total

    // Múltiples relaciones
    $posts = Post::with(['user', 'comments.user'])->get();

    // Eager loading condicional
    $users = User::with(['posts' => fn ($q) => $q->where('published', true)])->get();

    // Lazy eager loading (si ya tienes la colección)
    $posts = Post::all();
    $posts->load('user');

    // Conteo sin cargar relación
    $users = User::withCount('posts')->get();
    // $user->posts_count

    // Prevención en desarrollo: Model::preventLazyLoading(!app()->isProduction());
}
