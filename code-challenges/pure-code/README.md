# Pure Code Challenges

> Algoritmos y lógica **sin framework**. Resuélvelos en **TypeScript**, **Python**, **PHP** o **Node (JS)**.  
> Ideal: el mismo challenge primero en **TypeScript** (tipado senior), luego en Python/PHP según la entrevista.

**Sin soluciones.** Solo enunciados + casos de prueba.

## Lenguajes (prioridad recomendada)

| Prioridad | Lenguaje | Por qué |
|-----------|----------|---------|
| 1 | **TypeScript** | Full stack moderno, React/Next, Node APIs, interviews |
| 2 | **Python** | EPAM / coding rounds |
| 3 | **PHP** | Laravel interview |
| 4 | Node (JS plain) | Solo si te piden JS sin tipos |

## Cómo practicar

1. Copia el challenge a otra carpeta.
2. Crea el archivo en tu lenguaje:
   - **TypeScript:** `solution.ts` → ver setup abajo
   - Python: `solution.py` + `python solution.py`
   - PHP: `solution.php` + `php solution.php`
   - Node JS: `solution.js` + `node solution.js`
3. Cronómetro según el timebox.
4. **Sin IA.** Docs del lenguaje OK.
5. Debe pasar todos los casos de `starter/cases.json`.
6. Escribe complejidad Big-O en un comentario al final.
7. En TypeScript: tipa inputs/outputs (interfaces), evita `any`.

## Setup mínimo TypeScript (una vez por carpeta de práctica)

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --init --rootDir . --outDir dist --strict --esModuleInterop --module nodenext --moduleResolution nodenext --target ES2022
```

`tsconfig.json` — asegúrate de `"strict": true`.

Correr:

```bash
npx tsx solution.ts starter/cases.json
```

O compilar:

```bash
npx tsc && node dist/solution.js starter/cases.json
```

Plantilla de tipos sugerida (tú rellenas la lógica):

```ts
// types only — NO solution logic here in the repo challenges
type CaseResult = { passed: boolean; name: string };

interface RunnerResult {
  passed: boolean;
  results: unknown[];
}
```

Ver también: [`TYPESCRIPT.md`](TYPESCRIPT.md)

## Challenges

| # | Título | Temas senior | Tiempo |
|---|--------|--------------|--------|
| 01 | LRU Cache | HashMap + Doubly Linked List / Map | 45 min |
| 02 | Sliding Window Rate Limiter | Queues, timestamps, concurrency notes | 40 min |
| 03 | Dependency Resolver | Graph, topological sort, cycle detection | 50 min |
| 04 | Account Ledger | Invariants, transfers, rollback logic | 50 min |
| 05 | Meeting Scheduler | Intervals, merge, free slots | 45 min |
| 06 | City readings (count + avg/city) | group-by, defaultdict | 20 min |

## Convención de salida

Tu programa debe:

1. Leer `starter/cases.json` (o path por `process.argv[2]` / `$argv[1]`).
2. Ejecutar todos los cases.
3. Exit code `0` si todos pasan; `1` si alguno falla.

```bash
npx tsx solution.ts starter/cases.json
node solution.js starter/cases.json
python solution.py starter/cases.json
php solution.php starter/cases.json
```

## Qué evalúan (senior)

- Correctitud + edge cases
- Complejidad tiempo/espacio
- En **TS**: tipos claros, genéricos si aportan, no `any`
- Explicar trade-offs en voz alta

## Relación con tus entrevistas

| Entrevista | Lenguaje |
|------------|----------|
| Full stack / Next / Node | **TypeScript** |
| EPAM coding | **Python** (repite el mismo en TS después) |
| Laravel round | **PHP** |
| Extra | Mismo algoritmo en 2 lenguajes el mismo día |
