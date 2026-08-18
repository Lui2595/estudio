<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * TEMA: Seeders
 * Poblan la BD con datos iniciales.
 * php artisan db:seed o php artisan migrate --seed
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()
            ->has(Post::factory()->count(5))
            ->count(10)
            ->create();
    }
}
