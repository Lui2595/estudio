# TypeScript — convención para todos los pure-code challenges

> Usa esto en **cada** challenge (`01`–`05`). Tipado estricto; sin `any`.

## Por qué TypeScript aquí

En entrevistas full stack (React, Next.js, Node) esperan:

- Interfaces para el dominio (`LRUCache`, `TransferResult`, `Interval`)
- Uniones discriminadas para errores (`{ ok: true } | { ok: false; error: string }`)
- Genéricos solo cuando evitan duplicar lógica (`LRUCache<K, V>`)
- `readonly` / `as const` donde aporte claridad

## Checklist de tipado (márcalo al terminar cada challenge)

- [ ] `strict: true` en tsconfig
- [ ] Cero `any` (usa `unknown` + narrowing si parseas JSON)
- [ ] Tipos para ops del runner (`["put", number, number]`, etc.)
- [ ] Return types explícitos en métodos públicos
- [ ] Errores como union types, no strings mágicos sin tipo
- [ ] `cases.json` parseado con validación mínima o type assertion documentada

## Esqueleto de runner (sin lógica del challenge)

Copia a tu `solution.ts` y completa las clases/funciones del enunciado:

```ts
import { readFileSync } from "node:fs";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

function loadCases(path: string): Json {
  const raw: unknown = JSON.parse(readFileSync(path, "utf8"));
  return raw as Json; // better: validate shape
}

function main(): void {
  const path = process.argv[2] ?? "starter/cases.json";
  const data = loadCases(path);
  // TODO: run each case, compare expected, set exit code
  console.log(JSON.stringify({ passed: false, results: [] }));
  process.exit(1);
}

main();
```

## Comandos

```bash
npm install -D typescript tsx @types/node
npx tsx solution.ts starter/cases.json
```

## Mapeo challenge → tipos que debes definir tú

| Challenge | Tipos sugeridos (nombres) |
|-----------|---------------------------|
| 01 LRU | `LRUCache<K = number, V = number>`, `CacheOp` |
| 02 Rate limiter | `RateLimiter`, `ClientId`, `AllowResult` |
| 03 Deps | `Package`, `ResolveOk`, `ResolveErr`, `ResolveResult` |
| 04 Ledger | `AccountId`, `TransferResult`, `HistoryItem` |
| 05 Meetings | `Interval = readonly [number, number]`, merge/free/minRooms signatures |

## App challenges (también TS)

| Challenge | Dónde forzar TypeScript |
|-----------|-------------------------|
| 03 Laravel + Next | Next.js con `--typescript` (ya en el enunciado) |
| 05 Catalog UI | Next.js + TS + tipar `Product`, `CartItem` |
| Node APIs futuras | Preferir Nest/Express en **TypeScript**, no JS |

PHP y Python siguen válidos para EPAM/Laravel; el default de práctica diaria debe ser **TypeScript**.
