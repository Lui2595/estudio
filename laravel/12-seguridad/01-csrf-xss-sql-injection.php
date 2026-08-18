<?php

/**
 * TEMA: Seguridad en Laravel
 *
 * CSRF: Laravel incluye @csrf en forms y verifica token automáticamente.
 * Excluir rutas: VerifyCsrfToken::$except
 *
 * XSS: Blade escapa con {{ $var }} automáticamente.
 * {!! $html !!} NO escapa → solo con contenido confiable.
 *
 * SQL Injection: Eloquent y Query Builder usan prepared statements.
 * NUNCA concatenar input del usuario en queries raw.
 */

// MAL: SQL Injection vulnerable
// DB::select("SELECT * FROM users WHERE email = '{$request->email}'");

// BIEN: Prepared statements
// User::where('email', $request->email)->first();
// DB::select('SELECT * FROM users WHERE email = ?', [$request->email]);

// Mass Assignment: usar $fillable o $guarded en modelos
// class User extends Model {
//     protected $fillable = ['name', 'email'];
// }

// Rate Limiting en rutas sensibles
// Route::middleware('throttle:5,1')->group(...);

// Sanitización de uploads: validar mime, extensión, tamaño
// 'avatar' => 'image|mimes:jpeg,png|max:2048'
