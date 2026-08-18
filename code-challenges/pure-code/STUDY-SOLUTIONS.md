# Pure Code — Soluciones de estudio (Spot2 / vtwo rush)

> Casos de estudio con **solución optimizada** + explicación de flujo.  
> Practica explicando en voz alta 2–3 min por challenge.

| # | Challenge | EXPLAIN | TS | Python | PHP |
|---|-----------|---------|----|--------|-----|
| 01 | LRU Cache | [EXPLAIN.md](01-lru-cache/EXPLAIN.md) | `solution.optimized.ts` | `solution.optimized.py` | `solution.optimized.php` |
| 02 | Rate Limiter | [EXPLAIN.md](02-rate-limiter/EXPLAIN.md) | `solution.optimized.ts` | `solution.optimized.py` | `solution.optimized.php` |
| 03 | Dependency Resolver | [EXPLAIN.md](03-dependency-resolver/EXPLAIN.md) | `solution.optimized.ts` | `solution.optimized.py` | `solution.optimized.php` |
| 04 | Account Ledger | [EXPLAIN.md](04-account-ledger/EXPLAIN.md) | `solution.optimized.ts` | `solution.optimized.py` | `solution.optimized.php` |
| 05 | Meeting Scheduler | [EXPLAIN.md](05-meeting-scheduler/EXPLAIN.md) | `solution.optimized.ts` | `solution.optimized.py` | `solution.optimized.php` |
| 06 | City readings (count + avg/city) | [EXPLAIN.md](06-city-temp-average/EXPLAIN.md) | — | `solution.optimized.py` | — |

## Cómo estudiar con poco tiempo (2–3 h)

1. Lee solo el `EXPLAIN.md` (flujo + frase de entrevista).
2. Corre la solución y mira que `passed: true`.
3. Cierra el archivo y reescribe de memoria en un scratch (15 min).
4. Prioridad Spot2/full-stack: **01 → 02 → 04 → 05 → 03**.

## Comandos (desde cada carpeta)

```bash
npx tsx solution.optimized.ts starter/cases.json
python solution.optimized.py starter/cases.json
php solution.optimized.php starter/cases.json
```

## Cheat sheet de complejidad

| Challenge | Estructura clave | Tiempo |
|-----------|------------------|--------|
| LRU | Ordered Map | O(1) get/put |
| Rate limit | Deque por cliente | O(1) amortizado |
| Deps | Kahn topo | O(V+E) |
| Ledger | Map + validaciones | O(1) ops |
| Meetings | Sort + sweep | O(n log n) |
| City readings | defaultdict sum+count | O(n) |
