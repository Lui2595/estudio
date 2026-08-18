<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Services\PostService;

/**
 * TEMA: Resource Controller
 * Mapea a Route::resource('posts', PostController::class)
 */
class PostController extends Controller
{
    public function __construct(private PostService $postService) {}

    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(15);
        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $post = $this->postService->create($request->validated());
        return new PostResource($post);
    }

    public function show(Post $post) // Route Model Binding
    {
        $post->load('user', 'comments');
        return new PostResource($post);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $post = $this->postService->update($post, $request->validated());
        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $this->postService->delete($post);
        return response()->noContent();
    }
}
