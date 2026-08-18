<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * TEMA: Factories
 * Generan datos fake para tests y seeders.
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title'   => fake()->sentence(),
            'slug'    => fake()->unique()->slug(),
            'body'    => fake()->paragraphs(3, true),
            'status'  => 'published',
        ];
    }

    public function draft(): static
    {
        return $this->state(fn () => ['status' => 'draft']);
    }
}

// Uso: Post::factory()->count(10)->create();
//      Post::factory()->draft()->create();
