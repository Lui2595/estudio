# strict mode y flags importantes

## `strict: true`

Activa todas estas opciones:

| Flag | Qué hace |
|------|----------|
| `noImplicitAny` | Error si TS infiere `any` |
| `strictNullChecks` | `null`/`undefined` no asignables a otros tipos |
| `strictFunctionTypes` | Chequeo contravariante en parámetros de funciones |
| `strictBindCallApply` | Tipos estrictos en bind/call/apply |
| `strictPropertyInitialization` | Props de clase deben inicializarse |
| `noImplicitThis` | `this` implícito debe tener tipo |
| `alwaysStrict` | Emite `"use strict"` en JS |

## Flags recomendados adicionales

- **`noUncheckedIndexedAccess`**: `arr[i]` es `T | undefined` (más seguro)
- **`exactOptionalPropertyTypes`**: distingue "no presente" de `undefined` explícito
- **`verbatimModuleSyntax`**: `import type` / `export type` obligatorios para tipos

## Pregunta típica de entrevista

> ¿Qué pasa si desactivas `strictNullChecks`?

Sin él, `string` acepta `null` y `undefined`, perdiendo la principal ventaja de TS sobre JS en APIs y props de React.
