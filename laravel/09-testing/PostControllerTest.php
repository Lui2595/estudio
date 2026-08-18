<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * TEMA: Feature Tests
 * Prueban flujos completos HTTP (ruta → controller → BD → respuesta).
 */
class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_post(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/posts', [
            'title'  => 'Mi primer post',
            'body'   => 'Contenido del post con suficiente longitud.',
            'status' => 'published',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.title', 'Mi primer post');

        $this->assertDatabaseHas('posts', ['title' => 'Mi primer post']);
    }

    public function test_guest_cannot_create_post(): void
    {
        $response = $this->postJson('/api/posts', [
            'title' => 'Test',
            'body'  => 'Contenido',
        ]);

        $response->assertStatus(401);
    }
}
