<?php

declare(strict_types=1);

/**
 * TEMA: Repository Pattern
 * ENTREVISTA: ¿Para qué sirve el Repository?
 *
 * Abstrae el acceso a datos. La lógica de negocio no sabe si
 * los datos vienen de MySQL, Redis o una API externa.
 */

interface UserRepositoryInterface
{
    public function findById(int $id): ?User;
    public function findByEmail(string $email): ?User;
    public function save(User $user): void;
}

class User
{
    public function __construct(
        public ?int $id,
        public string $name,
        public string $email,
    ) {}
}

class EloquentUserRepository implements UserRepositoryInterface
{
    public function findById(int $id): ?User
    {
        // User::find($id) en Laravel
        return new User($id, 'Ana', 'ana@test.com');
    }

    public function findByEmail(string $email): ?User
    {
        return null;
    }

    public function save(User $user): void
    {
        // Persistir en BD
    }
}
