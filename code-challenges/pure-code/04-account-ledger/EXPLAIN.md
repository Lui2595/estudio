# 04 Account Ledger — Caso de estudio (flujo)

## Idea en una frase

Cuentas en memoria (centavos enteros). Un transfer valida reglas en orden fijo; si pasa, mueve dinero y escribe historial en **ambos** lados. El dinero total del sistema no cambia.

## Estructura

```
balances: Map<id, cents>
history:  Map<id, TransferRecord[]>
```

## Flujo `createAccount(id, balance)`

```
si id existe → { ok:false, error:"exists" }
si no → set balance, history=[] → { ok:true }
```

## Flujo `transfer(from, to, amount)` — orden importa

```
1. amount <= 0          → invalid_amount
2. from === to          → same_account
3. falta from o to      → not_found
4. balance[from] < amt  → insufficient_funds
5. OK:
   from -= amt
   to   += amt
   push history en from (resultingBalance = nuevo from)
   push history en to   (resultingBalance = nuevo to)
   → { ok:true }
```

Por qué ese orden: el case `transfer(A,A,0)` espera `invalid_amount` (no `same_account`).

## Walkthrough happy path

```
A=500, B=100
transfer A→B 200
A=300, B=300
```

Invariante: 500+100 = 300+300 = 600.

## Historial (resultingBalance es del dueño del historial)

Tras A→B 40 y luego 10 (A empezó en 100, B en 0):

| Dueño | amount | resultingBalance |
|-------|--------|------------------|
| A | 40 | 60 |
| A | 10 | 50 |
| B | 40 | 40 |
| B | 10 | 50 |

## Frase de entrevista

> "I keep integer balances and validate transfers in a fixed order — amount, same account, existence, funds — then update both sides and append history with each account's resulting balance. Total money is invariant."

## Archivos

```bash
npx tsx solution.optimized.ts starter/cases.json
php solution.optimized.php starter/cases.json
```
