<?php

/**
 * TEMA: Laravel Sanctum
 * ENTREVISTA: ¿Sanctum vs Passport?
 *
 * Sanctum: tokens API simples + SPA authentication (cookies).
 * Passport: OAuth2 completo (apps de terceros, scopes).
 *
 * Usa Sanctum para: APIs propias, SPAs, mobile apps propias.
 * Usa Passport para: OAuth2, apps de terceros, delegación de acceso.
 */

// Modelo User usa HasApiTokens trait

// Login y token:
// $token = $user->createToken('api-token', ['read', 'write'])->plainTextToken;

// Request autenticado:
// Authorization: Bearer {token}

// SPA (cookies + CSRF):
// Sanctum::actingAs($user) en tests
// middleware 'auth:sanctum' en rutas

// Revocar tokens:
// $user->tokens()->delete();
// $user->currentAccessToken()->delete();
