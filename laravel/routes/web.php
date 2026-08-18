<?php

/**
 * RUTAS WEB - Conceptos de Routing en Laravel
 * Estos ejemplos asumen un proyecto Laravel estándar.
 */

use App\Http\Controllers\PostController;
use App\Http\Controllers\ShowUserController;
use App\Http\Controllers\UserController;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Route;

// ─── Route Model Binding ───────────────────────────────────────────
// Laravel resuelve automáticamente el modelo por ID
Route::get('/users/{user}', [UserController::class, 'show']);

// Binding personalizado (en RouteServiceProvider o boot del modelo)
Route::get('/posts/{post:slug}', [PostController::class, 'show']);

// ─── Middleware ──────────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => view('dashboard'));
});

Route::middleware('throttle:60,1')->group(function () {
    Route::post('/contact', [ContactController::class, 'store']);
});

// ─── Resource Routes ─────────────────────────────────────────────────
// Genera: index, create, store, show, edit, update, destroy
Route::resource('posts', PostController::class);

// Solo algunas acciones
Route::resource('comments', CommentController::class)->only(['index', 'store', 'destroy']);

// API resource (sin create/edit)
Route::apiResource('articles', ArticleController::class);

// ─── Single Action Controller ──────────────────────────────────────
Route::get('/users/{user}/profile', ShowUserController::class);

// ─── Rutas con parámetros opcionales ─────────────────────────────────
Route::get('/search/{query?}', [SearchController::class, 'index']);
