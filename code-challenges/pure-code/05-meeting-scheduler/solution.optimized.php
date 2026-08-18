<?php
/**
 * Meeting Scheduler — solución optimizada (PHP)
 * half-open [start, end); merge O(n log n); freeSlots; minRooms sweep.
 */

declare(strict_types=1);

/** @param list<array{0:int,1:int}> $intervals @return list<array{0:int,1:int}> */
function mergeBusy(array $intervals): array
{
    if ($intervals === []) {
        return [];
    }
    usort($intervals, static fn ($a, $b) => $a[0] <=> $b[0] ?: $a[1] <=> $b[1]);
    $merged = [[$intervals[0][0], $intervals[0][1]]];

    for ($i = 1, $n = count($intervals); $i < $n; $i++) {
        [$s, $e] = $intervals[$i];
        $last = count($merged) - 1;
        if ($s <= $merged[$last][1]) {
            $merged[$last][1] = max($merged[$last][1], $e);
        } else {
            $merged[] = [$s, $e];
        }
    }
    return $merged;
}

/** @param list<array{0:int,1:int}> $busyIntervals @return list<array{0:int,1:int}> */
function freeSlots(array $busyIntervals, int $dayStart, int $dayEnd, int $slotMinutes): array
{
    $busy = mergeBusy($busyIntervals);
    $free = [];
    $cursor = $dayStart;

    foreach ($busy as [$s, $e]) {
        if ($s > $cursor && ($s - $cursor) >= $slotMinutes) {
            $free[] = [$cursor, $s];
        }
        $cursor = max($cursor, $e);
    }
    if ($dayEnd > $cursor && ($dayEnd - $cursor) >= $slotMinutes) {
        $free[] = [$cursor, $dayEnd];
    }
    return $free;
}

/** @param list<array{0:int,1:int}> $intervals */
function minRooms(array $intervals): int
{
    $events = [];
    foreach ($intervals as [$s, $e]) {
        $events[] = ['t' => $s, 'd' => 1];
        $events[] = ['t' => $e, 'd' => -1];
    }
    usort($events, static function ($a, $b) {
        if ($a['t'] !== $b['t']) {
            return $a['t'] <=> $b['t'];
        }
        return $a['d'] <=> $b['d']; // -1 before +1
    });

    $cur = 0;
    $max = 0;
    foreach ($events as $ev) {
        $cur += $ev['d'];
        if ($cur > $max) {
            $max = $cur;
        }
    }
    return $max;
}

function run(): void
{
    $path = $_SERVER['argv'][1] ?? 'starter/cases.json';
    $raw = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
    $results = [];
    $allPassed = true;

    foreach ($raw['cases'] as $case) {
        $input = $case['input'];
        $got = match ($case['fn']) {
            'mergeBusy' => mergeBusy($input['intervals']),
            'freeSlots' => freeSlots(
                $input['busyIntervals'],
                (int) $input['dayStart'],
                (int) $input['dayEnd'],
                (int) $input['slotMinutes'],
            ),
            'minRooms' => minRooms($input['intervals']),
        };

        $passed = json_encode($got) === json_encode($case['expected']);
        $allPassed = $allPassed && $passed;
        $results[] = ['name' => $case['name'], 'passed' => $passed, 'got' => $got, 'expected' => $case['expected']];
    }

    echo json_encode(['passed' => $allPassed, 'results' => $results], JSON_PRETTY_PRINT) . PHP_EOL;
    exit($allPassed ? 0 : 1);
}

run();
