# 04 — React: memo vs React Query · TypeScript: opcional, union, intersection

---

## 1) Te preguntan: `useMemo` vs `useCallback` vs React Query

### Responde (voz, EN)

> `useMemo` caches an **expensive value**. `useCallback` caches a **function reference** so memoized children don’t re-render. **React Query** (TanStack Query) is not a memo helper — it manages **server state**: cache, retries, refetch, invalidation. I don’t replace React Query with useMemo; they solve different layers.

### Justifica

```
Client state (local)          Server state (API)
useState / Zustand            React Query cache
useMemo(value)                staleTime, invalidateQueries
useCallback(fn)               retries, refetchOnFocus
React.memo(child)
```

```tsx
// VALOR costoso — useMemo
const total = useMemo(() => items.reduce((s, i) => s + i.price, 0), [items]);

// FUNCIÓN estable para hijo memoizado — useCallback
const onSelect = useCallback((id: string) => setSelected(id), []);

// DATOS DEL SERVIDOR — React Query (no useMemo)
const { data, isLoading } = useQuery({
  queryKey: ["projects", userId],
  queryFn: () => fetchProjects(userId),
});
```

| Herramienta | Qué memoiza / cachea | Cuándo |
|-------------|----------------------|--------|
| `useMemo` | Resultado de cálculo | Cálculo pesado o identidad de objeto |
| `useCallback` | Referencia de función | Pasar callback a `React.memo` hijo |
| React Query | Respuesta HTTP + sync | Listas/detalle de API |

**Trampa:** “React Query reemplaza useMemo” → **No.** RQ no evita un `filter` caro en 10k rows locales; `useMemo` no hace retry ni cache HTTP.

**Cuándo NO memoizar:** no hay lag medible. Memo tiene costo de comparación.

---

## 2) Te preguntan: en un objeto, que elementos no sean obligatorios

### Responde (voz, EN)

> I mark a field optional with `?`. For “all fields optional” — typical PATCH — I use the utility type `Partial<T>`. Required leftover fields: `Partial` + `Pick`, or `Required<T>` in reverse.

### Justifica

```ts
type User = {
  name: string;
  age?: number;           // opcional — puede ser undefined
};

type UserPatch = Partial<User>;
// { name?: string; age?: number }

function updateUser(id: string, patch: Partial<User>) { ... }
```

Otras utility types (por si piden más):

| Tipo | Efecto |
|------|--------|
| `Partial<T>` | todas opcionales |
| `Required<T>` | todas obligatorias |
| `Pick<T, "name">` | solo esas keys |
| `Omit<T, "password">` | todas menos esas |

---

## 3) Te preguntan: unión vs intersección

### Responde (voz, EN)

> A **union** (`A | B`) is *either* A *or* B — mutually exclusive shapes, like API success vs error. An **intersection** (`A & B`) must satisfy **both** — composition, like `User & Timestamped`.

### Justifica

```ts
type Success = { ok: true; data: User };
type Failure = { ok: false; error: string };
type Result = Success | Failure;     // UNION — un camino u otro

function handle(r: Result) {
  if (r.ok) console.log(r.data);     // narrowing
  else console.log(r.error);
}

type Timestamps = { createdAt: string; updatedAt: string };
type UserDTO = User & Timestamps;    // INTERSECTION — tiene name + fechas
```

```
Union |          Intersection &
  User ──┐         User ──┐
  Admin ─┴→ uno    Admin ─┴→ los dos a la vez (merge de props)
```

| | Union `\|` | Intersection `&` |
|--|------------|------------------|
| Significa | A **o** B | A **y** B |
| Uso | estados excluyentes | componer contratos |
| Extra | necesitas narrowing (`if`, `in`) | todas las props requeridas |
