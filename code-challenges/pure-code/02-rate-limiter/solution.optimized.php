<?php
/**
 * Rate Limiter — solución optimizada (PHP)
 *
 * Ventana: (t - windowMs) < ts <= t
 * Solo aceptados consumen cuota. Cola por cliente + limpieza al frente.
 *
 * Redis: ZADD + ZREMRANGEBYSCORE + ZCARD (sliding real).
 * Complejidad: allow O(k) amortizado.
 */

declare(strict_types=1);

class RateLimiter
{
    /** @var array<string, list<int>> */
    private array $hits = [];

    public function __construct(
        private readonly int $maxRequests,
        private readonly int $windowMs,
    ) {
    }

    public function allow(string $clientId, int $timestampMs): bool
    {
        if (!isset($this->hits[$clientId])) {
            $this->hits[$clientId] = [];
        }

        $q = &$this->hits[$clientId];
        $cutoff = $timestampMs - $this->windowMs;

        while ($q !== [] && $q[0] <= $cutoff) {
            array_shift($q);
        }

        if (count($q) >= $this->maxRequests) {
            return false;
        }

        $q[] = $timestampMs;
        return true;
    }
}

function run(): void
{
    $path = $_SERVER['argv'][1] ?? 'starter/cases.json';
    $raw = json_decode(file_get_contents($path), false, 512, JSON_THROW_ON_ERROR);
    $results = [];
    $allPassed = true;

    foreach ($raw->cases as $case) {
        $limiter = null;
        $got = [];

        foreach ($case->ops as $op) {
            if ($op[0] === 'RateLimiter') {
                $limiter = new RateLimiter((int) $op[1], (int) $op[2]);
            } elseif ($op[0] === 'allow') {
                $got[] = $limiter->allow((string) $op[1], (int) $op[2]);
            }
        }

        $expected = array_map(static fn ($v) => (bool) $v, $case->expected);
        $passed = $got === $expected;
        $allPassed = $allPassed && $passed;
        $results[] = ['name' => $case->name, 'passed' => $passed, 'got' => $got, 'expected' => $expected];
    }

    echo json_encode(['passed' => $allPassed, 'results' => $results], JSON_PRETTY_PRINT) . PHP_EOL;
    exit($allPassed ? 0 : 1);
}

run();
