# 02 Rate Limiter — Caso de estudio (flujo)

## Idea en una frase

Por cada cliente guarda los timestamps de requests **aceptados**. Antes de decidir, tira los que ya salieron de la ventana. Si aún hay cupo, acepta y guarda el timestamp; si no, rechaza **sin** guardar.

## Contrato de ventana

En tiempo `t`, cuentan los aceptados con:

```
(t - windowMs) < ts  ≤  t
```

Equivalente al limpiar: eliminar del frente mientras `ts <= t - windowMs`.

## Flujo de `allow(clientId, t)`

```
1. Obtener cola del cliente (crear vacía si no existe)
2. Mientras el primer ts <= t - windowMs → sacarlo (ya no cuenta)
3. Si length >= maxRequests → return false  (NO push)
4. Push t
5. return true
```

## Walkthrough `basic_limit` (max=3, window=1000)

| t | tras limpia | decisión | cola después |
|---|-------------|----------|--------------|
| 0 | [] | true | [0] |
| 100 | [0] | true | [0,100] |
| 200 | [0,100] | true | [0,100,200] |
| 300 | 3 hits | **false** | igual (no consume) |
| 1000 | saca 0 → [100,200] | true | [100,200,1000] |
| 1001 | sigue 3 | **false** | igual |

## Walkthrough `burst_then_wait` (max=5, window=1000)

| t | tras limpia | decisión |
|---|-------------|----------|
| 0..4 | crece a 5 | true ×5 |
| 5 | 5 | false |
| 1000 | saca 0 → 4 | true |
| 1001 | saca 1 → 4 | true |

## Por qué cola (deque) y no recount

- Timestamps monótonos → viejos al frente.
- Limpiar prefijo amortizado O(1) por evento.

## Frase de entrevista

> "Sliding window with per-client deque of accepted timestamps. Drop events outside `(t-W, t]`, reject without recording if at capacity — so denied requests don't consume quota."

## Archivos

```bash
npx tsx solution.optimized.ts starter/cases.json
php solution.optimized.php starter/cases.json
```
