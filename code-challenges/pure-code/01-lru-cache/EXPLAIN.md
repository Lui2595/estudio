# 01 LRU Cache — Caso de estudio (flujo)

## Idea en una frase

Caché de capacidad fija: al pasar el límite, expulsas lo **menos usado recientemente**. `get` y `put` cuentan como uso.

## Estructura (TS `Map` / PHP array asociativo)

Ambos preservan **orden de inserción**:

| Posición | Significado |
|----------|-------------|
| Primera key | LRU (candidato a evict) |
| Última key | MRU (más reciente) |

## Flujo `get(key)`

```
1. Si no existe → -1
2. value = map[key]
3. delete key
4. set key,value   ← vuelve al final = MRU
5. return value
```

## Flujo `put(key, value)`

```
1. Si key existe:
     delete key          (quitar posición vieja)
   Si NO existe Y size >= capacity:
     delete primera key  (evict LRU)
2. set key,value         (queda MRU)
```

## Walkthrough classic (cap 2)

| op | estado (LRU→MRU) | get out |
|----|------------------|---------|
| put 1,1 | 1 | |
| put 2,2 | 1,2 | |
| get 1 | 2,1 | 1 |
| put 3,3 | evict 1 → 2,3? Wait: after get1 order is 2,1 then evict LRU=2 → 1,3 | |
| | After get(1): order MRU=1, LRU=2 → `{2,1}` in insertion = 2 then 1 | |
| put 3 | evict 2 → `{1,3}` | |
| get 2 | -1 | -1 |
| put 4 | evict 1 → `{3,4}` | |
| get 1 | -1 | -1 |
| get 3 | 3 (refresh) | 3 |
| get 4 | 4 | 4 |

Expected gets: `[1,-1,-1,3,4]`

## Por qué no array + sort

Sort en cada op = O(n log n). Map/array asociativo = O(1) amortizado.

## Frase de entrevista

> "I use an ordered map: delete+reinsert moves a key to most-recent; when over capacity I drop the first key. That gives O(1) get and put."

## Archivos

- `solution.optimized.ts`
- `solution.optimized.php`

```bash
npx tsx solution.optimized.ts starter/cases.json
php solution.optimized.php starter/cases.json
```
