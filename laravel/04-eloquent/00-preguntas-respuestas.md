# Preguntas y Respuestas — Eloquent

> Review rápido sin código.

---

**P: ¿Qué es el N+1 Problem?**
R: 1 query para la lista + N queries adicionales (una por cada relación). 100 posts = 101 queries. Muy común y muy preguntado.

---

**P: ¿Cómo solucionar N+1?**
R: Eager loading con `with()`, `load()`, o `withCount()`. También `preventLazyLoading()` en desarrollo para detectarlo.

---

**P: HasOne vs HasMany vs BelongsTo vs BelongsToMany?**
R: HasOne: 1 a 1 (user→profile). HasMany: 1 a N (user→posts). BelongsTo: N a 1 inverso (post→user). BelongsToMany: N a N con pivot (user↔roles).

---

**P: ¿Qué es una relación polimórfica (Morph)?**
R: Un modelo puede pertenecer a varios tipos. Comment pertenece a Post o Video con `commentable_type` + `commentable_id`.

---

**P: ¿Qué es un Scope?**
R: Query reutilizable encadenable. `User::active()->get()` filtra usuarios activos sin repetir la condición.

---

**P: Accessor vs Mutator?**
R: Accessor transforma al LEER (`getFullNameAttribute`). Mutator al ESCRIBIR (`setEmailAttribute` convierte a lowercase).

---

**P: ¿Para qué sirven los Casts?**
R: Convertir atributos automáticamente: `'settings' => 'array'`, `'published_at' => 'datetime'`, `'is_active' => 'boolean'`.
