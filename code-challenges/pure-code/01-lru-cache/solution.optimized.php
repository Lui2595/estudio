<?php
/**
 * LRU Cache — versión optimizada (PHP)
 *
 * ---------------------------------------------------------------------------
 * QUÉ FALLABA EN solution.php (tu versión)
 * ---------------------------------------------------------------------------
 * 1) CORRECTITUD — put no actualiza claves existentes
 *    Siempre hace $this->cache[] = [...]. En "update_existing": put(1, 9)
 *    debería reemplazar el valor y refrescar recencia, no duplicar la key
 *    ni desalojar a ciegas.
 *
 * 2) CORRECTITUD — a capacidad llena siempre array_shift()
 *    Aunque la key ya exista. Actualizar no debe evictar.
 *
 * 3) CORRECTITUD — updateOrder está roto
 *    array_slice($this->cache, $index, 1) NO modifica el array (devuelve
 *    una copia y descartas el resultado). El elemento viejo nunca se quita;
 *    luego put() puede crear duplicados o evictar mal.
 *
 * 4) RENDIMIENTO — get hace array_column + array_search = O(n) + copia
 *    El objetivo del challenge es O(1) amortizado por operación.
 *
 * 5) put llama a sí mismo desde updateOrder vía get → acoplamiento raro
 *    y reutiliza la lógica de "evict si lleno", que es incorrecta al refrescar.
 *
 * ---------------------------------------------------------------------------
 * POR QUÉ ESTA VERSIÓN ES MEJOR
 * ---------------------------------------------------------------------------
 * En PHP, los arrays asociativos preservan orden de inserción:
 *   - Primera key  = least recently used (LRU)
 *   - Última key   = most recently used (MRU)
 * “Tocar” una key: unset + reasignar → queda al final (MRU) en O(1).
 * Evict: array_key_first() + unset → O(1).
 * Lookup por key: isset($cache[$key]) → O(1).
 *
 * Complejidad: get/put → O(1) amortizado | espacio → O(capacity)
 *
 * Alternativa “de entrevista clásica”: HashMap + Doubly Linked List
 * (misma complejidad; más código). Array asociativo ordenado es el
 * idiomático en PHP (análogo al Map de JS/TS).
 * ---------------------------------------------------------------------------
 */

declare(strict_types=1);

namespace App;

class LRUCache
{
    private int $capacity;

    /** @var array<int, int> key => value, insertion order = LRU → MRU */
    private array $cache = [];

    public function __construct(int $capacity)
    {
        if ($capacity < 1) {
            throw new \InvalidArgumentException('capacity must be >= 1');
        }
        $this->capacity = $capacity;
    }

    public function get(int $key): int
    {
        if (!array_key_exists($key, $this->cache)) {
            return -1;
        }

        $value = $this->cache[$key];
        // Refresh recency: move to MRU (end of insertion order)
        unset($this->cache[$key]);
        $this->cache[$key] = $value;

        return $value;
    }

    public function put(int $key, int $value): void
    {
        if (array_key_exists($key, $this->cache)) {
            // Update existing: remove old position, re-insert as MRU
            unset($this->cache[$key]);
        } elseif (count($this->cache) >= $this->capacity) {
            // Evict LRU = first key in insertion order
            $oldestKey = array_key_first($this->cache);
            unset($this->cache[$oldestKey]);
        }

        $this->cache[$key] = $value;
    }
}

// --- Runner (valida contra cases.json) -------------------------------------

function run(): void
{
    $path = $_SERVER['argv'][1] ?? 'starter/cases.json';

    $raw = json_decode(file_get_contents($path), false, 512, JSON_THROW_ON_ERROR);
    $results = [];
    $allPassed = true;

    foreach ($raw->cases as $case) {
        $cache = null;
        $got = [];

        foreach ($case->ops as $op) {
            switch ($op[0]) {
                case 'LRUCache':
                    $cache = new LRUCache((int) $op[1]);
                    break;
                case 'put':
                    $cache->put((int) $op[1], (int) $op[2]);
                    break;
                case 'get':
                    $got[] = $cache->get((int) $op[1]);
                    break;
                default:
                    throw new \RuntimeException('Unknown op: ' . $op[0]);
            }
        }

        $expected = array_map('intval', $case->expected);
        $passed = $got === $expected;
        $allPassed = $allPassed && $passed;

        $results[] = [
            'name' => $case->name,
            'passed' => $passed,
            'got' => $got,
            'expected' => $expected,
        ];
    }

    echo json_encode(['passed' => $allPassed, 'results' => $results], JSON_PRETTY_PRINT) . PHP_EOL;
    exit($allPassed ? 0 : 1);
}

run();
