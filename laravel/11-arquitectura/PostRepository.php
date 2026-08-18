<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * TEMA: Repository Pattern en Laravel
 * Abstrae queries Eloquent del resto de la app.
 */
interface PostRepositoryInterface
{
    public function findById(int $id): ?Post;
    public function paginate(int $perPage = 15): LengthAwarePaginator;
    public function create(array $data): Post;
    public function update(Post $post, array $data): Post;
    public function delete(Post $post): bool;
}

class EloquentPostRepository implements PostRepositoryInterface
{
    public function findById(int $id): ?Post
    {
        return Post::with('user')->find($id);
    }

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Post::with('user')->latest()->paginate($perPage);
    }

    public function create(array $data): Post
    {
        return Post::create($data);
    }

    public function update(Post $post, array $data): Post
    {
        $post->update($data);
        return $post->fresh();
    }

    public function delete(Post $post): bool
    {
        return $post->delete();
    }
}
