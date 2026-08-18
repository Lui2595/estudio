<?php

declare(strict_types=1);

/**
 * TEMA: Clases abstractas
 * ENTREVISTA: ¿Cuándo usar clase abstracta vs interface?
 *
 * Clase abstracta: cuando hay lógica compartida entre subclases.
 * No se puede instanciar directamente.
 */

abstract class BaseRepository
{
    public function __construct(protected \PDO $db) {}

    // Método concreto compartido
    protected function execute(string $sql, array $params = []): \PDOStatement
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    // Método abstracto: cada repo define su tabla
    abstract protected function table(): string;

    public function find(int $id): ?array
    {
        $stmt = $this->execute(
            "SELECT * FROM {$this->table()} WHERE id = ?",
            [$id]
        );
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result ?: null;
    }
}

class UserRepository extends BaseRepository
{
    protected function table(): string
    {
        return 'users';
    }
}
