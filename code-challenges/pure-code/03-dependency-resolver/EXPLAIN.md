# 03 Dependency Resolver — Caso de estudio (flujo)

## Idea en una frase

Modela paquetes como grafo dirigido **dep → package** (“debo instalar dep antes”). Orden de instalación = **topological sort**. Si queda gente con dependencias sin resolver → **ciclo**.

## Algoritmo: Kahn

```
1. indegree[pkg] = número de deps directas
2. adj[dep] = lista de paquetes que dependen de dep
3. ready = todos con indegree 0
4. Mientras ready no vacío:
     - saca un nodo (lex: el menor alfabético)
     - append a order
     - para cada vecino: indegree-- ; si llega a 0 → entra a ready
5. Si |order| < |packages| → cycle
```

## Por qué la flecha es dep → package

Si `api` depende de `db`, la arista es `db → api`:
- Al “completar” `db`, bajamos el indegree de `api`.
- `api` solo queda listo cuando **todas** sus deps terminaron.

## Walkthrough diamond (lex)

```
app → deps api, ui
api → db
ui  → db
db  → []
```

indegree: db=0, api=1, ui=1, app=2  
ready inicial (lex): `[db]`

1. Saca `db` → order `[db]` → api y ui bajan a 0 → ready `[api, ui]`
2. Saca `api` → `[db, api]` → app baja a 1 → ready `[ui]`
3. Saca `ui` → `[db, api, ui]` → app baja a 0 → ready `[app]`
4. Saca `app` → `[db, api, ui, app]`

## Ciclo

```
a → b, b → a
```

Nadie empieza con indegree 0 → ready vacío → order vacío → cycle.

O: se procesan algunos nodos pero nunca todos.

## mode lex vs any

- **lex**: entre listos, siempre el nombre más pequeño → orden deterministic (tests `expectOrderIfLex`).
- **any**: cualquier orden válido topo está OK; el runner valida `index(dep) < index(pkg)`.

Nuestra solución siempre usa lex (pasa ambos).

## Frase de entrevista

> "I build a dependency graph and run Kahn’s algorithm: start with zero-indegree packages, reduce neighbors, detect a cycle if we can't order every node. For stable output I always pick the lexicographically smallest ready package."

## Archivos

```bash
npx tsx solution.optimized.ts starter/cases.json
php solution.optimized.php starter/cases.json
```
