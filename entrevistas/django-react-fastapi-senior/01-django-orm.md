# 01 — Django ORM: memoria, relaciones, atomicidad

> Código runnable de estudio: `django/05-models-orm/02-queryset-iterator.py`

---

## 1) Te preguntan: QuerySet vs `iterator()` — rendimiento de memoria

### Responde (voz, EN)

> A normal QuerySet evaluates and **caches** the result in memory, so I can iterate twice without hitting the database again. `iterator()` **streams** rows and does **not** keep them in the QuerySet cache — much less RAM for 100k+ rows. I use iterator for exports, bulk jobs, migrations. I use a cached QuerySet when the set is small and I’ll reuse it.

### Justifica

```
QuerySet.all()  →  evalúa SQL  →  lista cacheada en RAM  →  2º for es gratis
iterator()      →  cursor/chunks →  un objeto a la vez   →  2º for = otro SQL
```

```python
# Pequeño / reusas objetos → QuerySet (cache)
users = User.objects.filter(is_active=True)
list(users)          # 1 query
list(users)          # 0 queries extra (cache)

# 100k filas / CSV → iterator (sin cache)
for user in User.objects.all().iterator(chunk_size=2000):
    writer.writerow([user.id, user.email])
```

### Follow-up

| Pregunta | Respuesta |
|----------|-----------|
| ¿`values()` / `only()`? | Trae menos columnas → menos RAM aunque uses QuerySet. |
| ¿`iterator` + `prefetch_related`? | Cuidado: prefetch espera cachear padres; con iterator a veces no prefetch bien — para exports usa `values()` o chunks con `pk__gt`. |
| ¿Por qué no iterator siempre? | Si recorres 2 veces o pasas el QS a un serializer/template, el cache evita N queries. |

---

## 2) Te preguntan: `select_related` vs `prefetch_related`

*(A veces lo dicen “fetch / prefetch / fetch related” — son estas dos.)*

### Responde (voz, EN)

> `select_related` does an SQL **JOIN** in one query — best for **ForeignKey** and **OneToOne**. `prefetch_related` runs a **separate query** (or more) and stitches relations in Python — best for **Many-to-Many** and **reverse FK**, because a JOIN would multiply rows.

### Justifica

```
select_related("author")     →  1 SQL con JOIN     →  Book.author listo
prefetch_related("tags")     →  1 SQL books + 1 tags →  une en memoria
```

```python
# FK / O2O — JOIN
Book.objects.select_related("author")
# SELECT book.*, author.* FROM book INNER JOIN author ...

# M2M / reverse — 2 queries
Book.objects.prefetch_related("tags")
# SELECT * FROM book;
# SELECT * FROM book_tags JOIN tag WHERE book_id IN (...);
```

**N+1 (one + N queries):**

```python
# MAL — 1 + N
for b in Book.objects.all():
    print(b.author.name)          # 1 query extra por libro

# BIEN
for b in Book.objects.select_related("author"):
    print(b.author.name)
```

### Follow-up

| Pregunta | Respuesta |
|----------|-----------|
| ¿Ambos juntos? | Sí: `select_related("author").prefetch_related("tags")`. |
| ¿Prefetch de prefetch? | `Prefetch("comments", queryset=Comment.objects.select_related("user"))`. |
| ¿Count sin cargar? | `annotate(tag_count=Count("tags"))` — no traigas M2M solo para contar. |

---

## 3) Te preguntan: `transaction.atomic()` / atomicity

**ACID** = Atomicity, Consistency, Isolation, Durability.

Atomicity = **todo el bloque ocurre, o nada**.

### Responde (voz, EN)

> `transaction.atomic()` is Django’s unit of work. All writes inside the block commit together; if anything raises, the database rolls back. I use it when two writes must stay consistent — create order **and** payment, archive project **and** close tasks.

### Justifica

```
BEGIN
  insert order
  insert payment   ← si esto falla
ROLLBACK           ← order tampoco queda
```

```python
from django.db import transaction

with transaction.atomic():
    order = Order.objects.create(user=user, total=cents)
    Payment.objects.create(order=order, amount=cents)
    # si Payment explota → order no se persiste
```

**Savepoint (anidado):** un `atomic` interno puede rollback parcial sin abortar el externo.

### Follow-up

| Pregunta | Respuesta |
|----------|-----------|
| ¿Autocommit? | Cada `.save()` es su propia transacción si no hay `atomic`. |
| ¿Celery dentro de atomic? | No dispares el task hasta **después** del commit (`on_commit`) o el worker lee datos que aún no existen. |
| Isolation | Default suele ser Read Committed; para “no dos cobros” combina unique constraint + idempotency key. |

```python
transaction.on_commit(lambda: send_order_email.delay(order.id))
```

---

## 4) Te preguntan: API lenta — ¿qué haces?

### Responde (voz)

> First I measure: query count, EXPLAIN, slowest endpoint. Typical Django wins: kill N+1 with select/prefetch, add indexes on filter/join columns, paginate, cache hot reads, don’t serialize huge graphs.

Orden (di este orden, suena senior):

1. Medir (logs SQL, APM — Application Performance Monitoring).  
2. Queries (N+1, `iterator` si export).  
3. Índices.  
4. Paginación.  
5. Cache (Redis).  
6. Async **solo si I/O-bound** (esperas de red), no si CPU-bound.
