<?php

namespace App\Actions;

use App\Events\PostCreated;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;

/**
 * TEMA: Actions Pattern
 * Una clase = una acción de negocio. Método único handle() o __invoke().
 * Más granular que un Service con muchos métodos.
 */
class CreatePostAction
{
    public function __invoke(User $user, array $data): Post
    {
        $post = $user->posts()->create([
            'title' => $data['title'],
            'slug'  => Str::slug($data['title']),
            'body'  => $data['body'],
            'status' => $data['status'] ?? 'draft',
        ]);

        event(new PostCreated($post));

        return $post;
    }
}

// Uso en controller:
// public function store(StorePostRequest $request, CreatePostAction $action) {
//     $post = $action($request->user(), $request->validated());
//     return new PostResource($post);
// }
