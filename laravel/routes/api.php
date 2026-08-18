<?php

/**
 * RUTAS API - Conceptos de API en Laravel
 */

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// ─── API Routes con prefijo /api ─────────────────────────────────────
Route::prefix('v1')->group(function () {

    // Públicas
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post}', [PostController::class, 'show']);

    // Autenticación con Sanctum
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    // Protegidas con Sanctum
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::post('/posts', [PostController::class, 'store']);
        Route::put('/posts/{post}', [PostController::class, 'update']);
        Route::delete('/posts/{post}', [PostController::class, 'destroy']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// ─── Rate Limiting ───────────────────────────────────────────────────
// Definido en RouteServiceProvider o bootstrap/app.php:
// RateLimiter::for('api', fn ($request) => Limit::perMinute(60)->by($request->user()?->id ?: $request->ip()));

Route::middleware(['throttle:api'])->group(function () {
    Route::get('/health', fn () => response()->json(['status' => 'ok']));
});
