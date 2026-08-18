<?php

namespace Tests\Unit;

use App\Repositories\PostRepositoryInterface;
use App\Services\PostService;
use Mockery;
use Tests\TestCase;

/**
 * TEMA: Unit Tests + Mocking
 * Prueban una unidad aislada. Las dependencias se mockean.
 */
class PostServiceTest extends TestCase
{
    public function test_create_post_calls_repository(): void
    {
        $mockRepo = Mockery::mock(PostRepositoryInterface::class);
        $mockRepo->shouldReceive('create')
            ->once()
            ->with(['title' => 'Test', 'body' => 'Content'])
            ->andReturn((object) ['id' => 1, 'title' => 'Test']);

        $service = new PostService($mockRepo);
        $result = $service->create(['title' => 'Test', 'body' => 'Content']);

        $this->assertEquals('Test', $result->title);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
