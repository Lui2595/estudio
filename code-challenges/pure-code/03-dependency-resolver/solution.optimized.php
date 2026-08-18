<?php
/**
 * Dependency Resolver — Kahn’s topological sort (PHP)
 * mode lex: siempre elige el nombre lexicográficamente menor entre listos.
 * Ciclo si order no incluye todos los nodos.
 */

declare(strict_types=1);

/**
 * @param list<array{name: string, deps: list<string>}> $packages
 * @return array{ok: true, order: list<string>}|array{ok: false, error: string}
 */
function resolve(array $packages, string $mode = 'lex'): array
{
    // Paso a paso detallado de la construcción del orden de instalación de paquetes (Kahn’s algorithm):

    // 1. Extraer todos los nombres de los paquetes en la lista de entrada
    $names = array_map(static fn ($p) => $p['name'], $packages);

    // 2. Inicializar dos estructuras auxiliares:
    //    - $indegree: para cada paquete, su cantidad de dependencias pendientes
    //    - $adj: para cada paquete, lista de paquetes que dependen de él
    $indegree = [];
    $adj = [];
    foreach ($names as $name) {
        $indegree[$name] = 0; // Comenzamos con 0 dependencias
        $adj[$name] = [];     // Nadie depende de nadie aún
    }

    // 3. Completar las estructuras según los datos de entrada:
    //    Por cada paquete, aumentar el indegree (dependencias) de quienes lo requieren.
    //    Además, registramos en $adj que “si instalo X, habilito instalar Y”.
    foreach ($packages as $pkg) {
        foreach ($pkg['deps'] as $dep) {
            // Por cada dependencia de este paquete:
            $adj[$dep][] = $pkg['name'];    // $dep habilita instalar $pkg['name']
            $indegree[$pkg['name']]++;      // $pkg['name'] tiene una dependencia más pendiente
        }
    }

    // 4. Buscar todos los nodos que no dependen de nadie (indegree 0)
    //    Estos paquetes pueden instalarse al principio.
    $ready = [];
    foreach ($names as $name) {
        if ($indegree[$name] === 0) {
            $ready[] = $name;
        }
    }
    // Para el modo 'lex', siempre mantenemos la lista ordenada para elegir el más chico primero.
    sort($ready);

    // 5. Algoritmo principal de Kahn: buscar un orden topo-lógico válido
    $order = []; // Aquí construiremos el orden final de instalación

    // Mientras existan paquetes que puedan instalarse ya (indegree 0):
    while ($ready !== []) {
        // array_shift($ready) extrae (y remueve) el primer elemento del array y lo devuelve como un string (el nombre del paquete listo).
        // No regresa otro array, sino SOLO el valor del primer elemento (por ejemplo: "db" o "app").
        $node = array_shift($ready); // $node es un string con el nombre del paquete.

        // Añadimos el paquete actual al orden de instalación
        $order[] = $node;

        // $adj[$node] es la lista de todos los paquetes que DEPENDEN de $node.
        // Por cada uno, decrementamos indegree (le quitamos una dependencia).
        foreach ($adj[$node] as $next) {
            $indegree[$next]--;
            if ($indegree[$next] === 0) {
                $ready[] = $next;
                sort($ready); // Para el modo 'lex', mantenemos priorizados los disponibles
            }
        }
    }

    // 6. Verificación final: si no se logró instalar todos los paquetes, hay un ciclo (deadlock de dependencias)
    if (count($order) !== count($names)) {
        return ['ok' => false, 'error' => 'cycle'];
    }

    // 7. Si completamos el orden para todos, devolvemos la lista en orden válido de instalación
    return ['ok' => true, 'order' => $order];
}

function isValidOrder(array $packages, array $order): bool
{
    if (count($order) !== count($packages)) {
        return false;
    }
    $idx = array_flip($order);
    foreach ($packages as $p) {
        if (!isset($idx[$p['name']])) {
            return false;
        }
        foreach ($p['deps'] as $d) {
            if ($idx[$d] >= $idx[$p['name']]) {
                return false;
            }
        }
    }
    return true;
}

function run(): void
{
    $path = $_SERVER['argv'][1] ?? 'starter/cases.json';
    $raw = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
    $results = [];
    $allPassed = true;

    foreach ($raw['cases'] as $case) {
        $packages = $case['packages'];
        $result = resolve($packages, 'lex');

        if (!$case['expectOk']) {
            $passed = ($result['ok'] ?? null) === false && ($result['error'] ?? '') === 'cycle';
        } elseif (!($result['ok'] ?? false)) {
            $passed = false;
        } else {
            $passed = isValidOrder($packages, $result['order']);
            if (($case['mode'] ?? '') === 'lex' && isset($case['expectOrderIfLex'])) {
                $passed = $passed && $result['order'] === $case['expectOrderIfLex'];
            }
        }

        $allPassed = $allPassed && $passed;
        $results[] = ['name' => $case['name'], 'passed' => $passed, 'detail' => $result];
    }

    echo json_encode(['passed' => $allPassed, 'results' => $results], JSON_PRETTY_PRINT) . PHP_EOL;
    exit($allPassed ? 0 : 1);
}

run();
