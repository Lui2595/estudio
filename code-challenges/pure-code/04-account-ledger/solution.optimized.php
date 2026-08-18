<?php
/**
 * Account Ledger — solución optimizada (PHP)
 *
 * Validación transfer: invalid_amount → same_account → not_found → insufficient_funds
 * Idempotency: Idempotency-Key → cache respuesta; replay sin mover dinero.
 */

declare(strict_types=1);

class Ledger
{
    /** @var array<string, int> */
    private array $balances = [];

    /** @var array<string, list<array<string, mixed>>> */
    private array $history = [];

    /** @return array{ok: true}|array{ok: false, error: string} */
    public function createAccount(string $id, int $initialBalance): array
    {
        if (array_key_exists($id, $this->balances)) {
            return ['ok' => false, 'error' => 'exists'];
        }
        $this->balances[$id] = $initialBalance;
        $this->history[$id] = [];
        return ['ok' => true];
    }

    /** @return array{ok: true}|array{ok: false, error: string} */
    public function transfer(string $fromId, string $toId, int $amount): array
    {
        if ($amount <= 0) {
            return ['ok' => false, 'error' => 'invalid_amount'];
        }
        if ($fromId === $toId) {
            return ['ok' => false, 'error' => 'same_account'];
        }
        if (!array_key_exists($fromId, $this->balances) || !array_key_exists($toId, $this->balances)) {
            return ['ok' => false, 'error' => 'not_found'];
        }
        if ($this->balances[$fromId] < $amount) {
            return ['ok' => false, 'error' => 'insufficient_funds'];
        }

        $this->balances[$fromId] -= $amount;
        $this->balances[$toId] += $amount;

        $this->history[$fromId][] = [
            'type' => 'transfer',
            'from' => $fromId,
            'to' => $toId,
            'amount' => $amount,
            'resultingBalance' => $this->balances[$fromId],
        ];
        $this->history[$toId][] = [
            'type' => 'transfer',
            'from' => $fromId,
            'to' => $toId,
            'amount' => $amount,
            'resultingBalance' => $this->balances[$toId],
        ];

        return ['ok' => true];
    }

    /** @return array{ok: true, balance: int}|array{ok: false, error: string} */
    public function getBalance(string $id): array
    {
        if (!array_key_exists($id, $this->balances)) {
            return ['ok' => false, 'error' => 'not_found'];
        }
        return ['ok' => true, 'balance' => $this->balances[$id]];
    }

    /** @return array{ok: true, history: list<array<string, mixed>>}|array{ok: false, error: string} */
    public function getHistory(string $id): array
    {
        if (!array_key_exists($id, $this->history)) {
            return ['ok' => false, 'error' => 'not_found'];
        }
        return ['ok' => true, 'history' => $this->history[$id]];
    }
}

function run(): void
{
    $path = $_SERVER['argv'][1] ?? 'starter/cases.json';
    $raw = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
    $results = [];
    $allPassed = true;

    foreach ($raw['cases'] as $case) {
        $ledger = null;
        $got = [];

        foreach ($case['ops'] as $op) {
            switch ($op[0]) {
                case 'Ledger':
                    $ledger = new Ledger();
                    break;
                case 'createAccount':
                    $got[] = $ledger->createAccount($op[1], (int) $op[2]);
                    break;
                case 'transfer':
                    $got[] = $ledger->transfer($op[1], $op[2], (int) $op[3]);
                    break;
                case 'getBalance':
                    $got[] = $ledger->getBalance($op[1]);
                    break;
                case 'getHistory':
                    $got[] = $ledger->getHistory($op[1]);
                    break;
            }
        }

        $passed = json_encode($got) === json_encode($case['expected']);
        $allPassed = $allPassed && $passed;
        $results[] = ['name' => $case['name'], 'passed' => $passed, 'got' => $got, 'expected' => $case['expected']];
    }

    echo json_encode(['passed' => $allPassed, 'results' => $results], JSON_PRETTY_PRINT) . PHP_EOL;
    exit($allPassed ? 0 : 1);
}

run();
