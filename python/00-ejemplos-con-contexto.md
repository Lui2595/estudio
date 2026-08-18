# Python — Ejemplos con contexto

> Cada concepto de `00-preguntas-respuestas.md` con **código + qué está pasando**.  
> Corre los `.py` de las carpetas `01`–`03` también. Lee esto en orden.

---

## 1) list vs tuple vs set vs dict

Imagina un **carrito de ecommerce**:

```python
# LIST — orden importa, puedes cambiar, hay duplicados
# Ejemplo: historial de productos vistos (puede repetir)
vistos = ["laptop", "mouse", "laptop"]
vistos.append("teclado")      # mutable: crece
print(vistos[0])              # "laptop" — acceso por índice

# TUPLE — fijo, no se reasigna el contenido “de contrato”
# Ejemplo: coordenadas o un registro que no debe mutar
punto = (10, 20)              # (x, y)
# punto[0] = 99  → TypeError (inmutable)

# SET — solo únicos, bueno para “¿ya lo vi?”
# Ejemplo: IDs de productos en wishlist sin duplicar
wishlist_ids = {1, 2, 2, 3}
print(wishlist_ids)           # {1, 2, 3}
print(2 in wishlist_ids)      # True — búsqueda O(1) promedio (tiempo constante)

# DICT — clave → valor
# Ejemplo: usuario de la sesión
user = {
    "id": 42,
    "email": "luis@example.com",
    "role": "user",
}
print(user["email"])          # lookup O(1) promedio
user["role"] = "admin"        # actualizas un campo
```

**Cuándo usar cuál en una API:**
- `list` → lista de tasks en un JSON
- `tuple` → `(status_code, body)` interno fijo
- `set` → “ids ya procesados” (idempotency mental)
- `dict` → JSON request/response, mapas id→objeto

---

## 1b) OrderedDict — `move_to_end` / `popitem` (LRU)

**Contexto:** en entrevistas piden LRU O(1). En Python el idiomático es `collections.OrderedDict`.

```python
from collections import OrderedDict

od = OrderedDict()
od[1] = "a"
od[2] = "b"
od[3] = "c"
# orden: 1, 2, 3  (primero = LRU, último = MRU)

# Al “usar” la key 1 → pásala al final (MRU)
od.move_to_end(1)
# orden: 2, 3, 1

# Capacidad llena → evict el menos reciente = el PRIMERO
key, val = od.popitem(last=False)  # → (2, "b")
# orden: 3, 1
```

| Método | Efecto | Frase entrevista |
|--------|--------|------------------|
| `move_to_end(key)` | key al **final** | “refresh / mark as MRU” |
| `move_to_end(key, last=False)` | key al **inicio** | poco usado en LRU |
| `popitem(last=False)` | saca el **primero** | “evict LRU” |
| `popitem()` / `last=True` | saca el **último** | estilo stack |

Mini cache:

```python
cache: OrderedDict[int, int] = OrderedDict()

def get(key: int) -> int:
    if key not in cache:
        return -1
    cache.move_to_end(key)
    return cache[key]

def put(key: int, value: int, capacity: int = 2) -> None:
    if key in cache:
        cache.move_to_end(key)
        cache[key] = value
        return
    if len(cache) >= capacity:
        cache.popitem(last=False)
    cache[key] = value
```

**Nota:** desde Python 3.7 el `dict` normal también preserva orden de inserción, pero **no** tiene `move_to_end` / `popitem(last=False)` — por eso OrderedDict sigue siendo la respuesta de entrevista.

Corre: `python python/01-fundamentos/02-ordereddict-lru.py`

---

## 1c) Consumir / escribir archivos (File I/O)

**Contexto:** en challenges lees `cases.json`; en APIs a veces logs o fixtures. Siempre cierra el archivo — por eso `with`.

```python
from pathlib import Path
import json

path = Path("starter/cases.json")

# --- Leer texto completo ---
text = path.read_text(encoding="utf-8")

# --- Leer con open + with (cierra solo) ---
with path.open(encoding="utf-8") as f:
    text2 = f.read()

# --- Línea a línea (archivos grandes) ---
with path.open(encoding="utf-8") as f:
    for line in f:
        line = line.rstrip("\n")
        # procesa line...

# --- JSON (patrón pure-code) ---
data = json.loads(path.read_text(encoding="utf-8"))
# o:
with path.open(encoding="utf-8") as f:
    data = json.load(f)

# --- Escribir ---
out = Path("out.txt")
out.write_text("hola\n", encoding="utf-8")

with out.open("a", encoding="utf-8") as f:  # append
    f.write("segunda linea\n")

with Path("out.json").open("w", encoding="utf-8") as f:
    json.dump({"ok": True}, f, indent=2)
```

| Modo | Significado |
|------|-------------|
| `r` | leer (default) |
| `w` | escribir (borra si existe) |
| `a` | append |
| `rb` / `wb` | binario (imágenes, zip) |

**Frase entrevista:** “I use a `with` statement so the file closes even on errors; for big files I iterate lines instead of `read()`.”

Corre: `python python/01-fundamentos/03-file-io.py`

---

## 2) List comprehension

Sin comprehension (más largo):

```python
nums = [1, 2, 3, 4, 5]
pares_dobles = []
for n in nums:
    if n % 2 == 0:
        pares_dobles.append(n * 2)
# [4, 8]
```

Con comprehension (mismo resultado):

```python
nums = [1, 2, 3, 4, 5]
pares_dobles = [n * 2 for n in nums if n % 2 == 0]
# lee: "n*2 por cada n en nums si n es par"
```

En un view Flask, a veces transformas ORM → JSON:

```python
# tasks = lista de objetos Task
payload = [
    {"id": t.id, "title": t.title, "status": t.status}
    for t in tasks
]
```

---

## 3) `*args` y `**kwargs`

```python
def crear_tarea(titulo, *etiquetas, **extra):
    """
    titulo     → obligatorio
    *etiquetas → cualquier cantidad de tags posicionales
    **extra    → campos opcionales con nombre (priority=..., due=...)
    """
    return {
        "title": titulo,
        "tags": list(etiquetas),
        "meta": extra,
    }

print(crear_tarea("Estudiar EPAM", "python", "flask", priority=5, status="todo"))
# {
#   'title': 'Estudiar EPAM',
#   'tags': ['python', 'flask'],
#   'meta': {'priority': 5, 'status': 'todo'}
# }
```

Así un decorator puede aceptar “cualquier función” sin saber sus parámetros de antemano.

---

## 4) Mutable default (el bug)

```python
# ❌ MAL — la lista default se crea UNA vez al definir la función
def agregar_item(item, carrito=[]):
    carrito.append(item)
    return carrito

print(agregar_item("a"))  # ['a']
print(agregar_item("b"))  # ['a', 'b']  ← ¡sigue la misma lista!


# ✅ BIEN — None como sentinel; creas lista nueva cada llamada
def agregar_item_ok(item, carrito=None):
    if carrito is None:
        carrito = []
    carrito.append(item)
    return carrito

print(agregar_item_ok("a"))  # ['a']
print(agregar_item_ok("b"))  # ['b']
```

En entrevistas: si ves `def f(x=[])` o `def f(x={})`, dilo: **shared mutable default**.

---

## 5) `is` vs `==`

```python
a = [1, 2]
b = [1, 2]
c = a

print(a == b)   # True  — mismo valor
print(a is b)   # False — otro objeto en memoria
print(a is c)   # True  — misma referencia

x = None
if x is None:   # forma idiomática (no uses == None)
    print("sin valor")
```

---

## 6) Generator (`yield`)

```python
def leer_lineas_grandes(path):
    """No carga el archivo entero en RAM — va línea a línea."""
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.strip()

# Uso:
# for linea in leer_lineas_grandes("log.txt"):
#     procesar(linea)
```

`[x for x in data]` → lista completa en memoria.  
`(x for x in data)` → generator, lazy (bajo demanda).

---

## 7) `with` (context manager)

```python
# Sin with — fácil olvidar close() si hay error a mitad
f = open("datos.txt", "w", encoding="utf-8")
try:
    f.write("hola")
finally:
    f.close()

# Con with — siempre cierra, incluso si hay excepción
with open("datos.txt", "w", encoding="utf-8") as f:
    f.write("hola")
# aquí el archivo ya está cerrado
```

En web: sesiones de DB, locks, conexiones HTTP.

---

## 8) Decorator

```python
import time
from functools import wraps

def timing(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = fn(*args, **kwargs)
        print(fn.__name__, "tardó", time.time() - start, "s")
        return result
    return wrapper

@timing
def suma_lenta(n):
    return sum(range(n))

suma_lenta(100000)
# imprime algo como: suma_lenta tardó 0.00x s
```

En Flask, un decorator de auth se ve así (idea):

```python
def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return {"error": "unauthorized"}, 401
        # validar JWT (JSON Web Token)...
        return fn(*args, **kwargs)
    return wrapper

@app.get("/api/me")
@token_required
def me():
    return {"email": g.user.email}
```

---

## 9) classmethod / staticmethod / property

```python
class User:
    def __init__(self, email: str):
        self.email = email

    @classmethod
    def from_raw(cls, email: str):
        """Factory: crea instancia normalizando el email."""
        return cls(email.strip().lower())

    @staticmethod
    def is_valid(email: str) -> bool:
        """No necesita self ni cls — solo regla de validación."""
        return "@" in email

    @property
    def domain(self) -> str:
        """Se usa como atributo: user.domain (no user.domain())."""
        return self.email.split("@")[1]

u = User.from_raw("  Luis@EPAM.com ")
print(u.email)    # luis@epam.com
print(u.domain)   # epam.com
print(User.is_valid("a@b.com"))  # True
```

---

## 10) dataclass

```python
from dataclasses import dataclass

@dataclass
class CreateTaskDTO:  # DTO = Data Transfer Object
    title: str
    status: str = "todo"
    priority: int = 3

body = CreateTaskDTO(title="Estudiar N+1", priority=5)
print(body)
# CreateTaskDTO(title='Estudiar N+1', status='todo', priority=5)
```

Equivale a escribir a mano `__init__` + `__repr__`, pero más corto y claro para payloads.

---

## 11) GIL + async (idea con mini código)

**GIL (Global Interpreter Lock):** en un proceso, un solo thread corre bytecode Python a la vez.

```python
import asyncio

async def fake_db(nombre: str, segundos: float) -> str:
    # await = "espero I/O; el loop puede atender otras tareas"
    await asyncio.sleep(segundos)
    return f"{nombre} ok"

async def main():
    # Las dos “queries” corren concurrentes (espera I/O), no 0.4+0.4 secuencial
    a, b = await asyncio.gather(
        fake_db("projects", 0.2),
        fake_db("tasks", 0.2),
    )
    print(a, b)

asyncio.run(main())
```

- **Muchas esperas de red/DB** → async o threads ayudan.  
- **Cálculo pesado (CPU)** → procesos (`multiprocessing`), no solo más threads.

---

## 12) N+1 — el problema en código

### Mal (N+1)

```python
# 1 query
projects = Project.query.filter_by(owner_id=user.id).all()

for p in projects:
    # ¡N queries más! una por proyecto
    print(p.name, len(p.tasks))
```

Si tienes 50 projects → **1 + 50 queries**.

### Bien (annotate / count en SQL)

```python
from sqlalchemy import func

# Idea: una query con COUNT
rows = (
    db.session.query(Project, func.count(Task.id))
    .outerjoin(Task)
    .filter(Project.owner_id == user.id)
    .group_by(Project.id)
    .all()
)
for project, tasks_count in rows:
    print(project.name, tasks_count)
```

### Bien (Django)

```python
from django.db.models import Count

projects = (
    Project.objects.filter(owner_id=user.id)
    .annotate(tasks_count=Count("tasks"))
)
# projects[0].tasks_count  → sin query extra por fila
```

**N+1** = 1 query de la lista + N de las relaciones.

---

## 13) Transacción — contexto

```python
# Quieres: archivar proyecto Y marcar todas sus tasks como done.
# Si falla a mitad, no quieres proyecto archived con tasks todavía "todo".

def archive_project(project_id: int, user_id: int) -> None:
    try:
        project = Project.query.filter_by(id=project_id, owner_id=user_id).first()
        if not project:
            raise LookupError("not found")

        project.status = "archived"
        for task in project.tasks:
            if task.status != "done":
                task.status = "done"

        db.session.commit()   # todo junto
    except Exception:
        db.session.rollback()  # deshace todo el bloque
        raise
```

All-or-nothing = **transacción**.

---

## 14) JWT — flujo en mini código

```python
import jwt
from datetime import datetime, timedelta, timezone
from werkzeug.security import generate_password_hash, check_password_hash

SECRET = "dev-secret"

# Registro
password_hash = generate_password_hash("Secret123!")

# Login
ok = check_password_hash(password_hash, "Secret123!")
if ok:
    token = jwt.encode(
        {
            "sub": 42,  # user id
            "exp": datetime.now(timezone.utc) + timedelta(hours=1),
        },
        SECRET,
        algorithm="HS256",
    )
    # React guarda token y manda:
    # Authorization: Bearer <token>

# Ruta protegida
payload = jwt.decode(token, SECRET, algorithms=["HS256"])
user_id = payload["sub"]  # 42
```

---

## 15) Status codes — en contexto Flask

```python
from flask import jsonify

# 201 Created
return jsonify({"id": 1, "name": "EPAM Prep"}), 201

# 401 Unauthorized — no mandó token / token malo
return jsonify({"error": "unauthorized"}), 401

# 404 Not Found — proyecto de otro usuario (no filtramos existencia)
return jsonify({"error": "not_found"}), 404

# 422 Unprocessable — validación de negocio/campos
return jsonify({"error": "validation", "fields": {"title": "min 3 chars"}}), 422
```

---

## 17) Magic methods — Python “engancha” tu clase a la sintaxis

**Contexto:** no llamas `__str__` a mano; `print(x)` lo hace por ti.  
**Términos:** dunder (double underscore), protocol (contrato de métodos que Python espera).

```python
class Project:
    def __init__(self, title: str) -> None:
        self.title = title

    def __repr__(self) -> str:
        return f"Project(title={self.title!r})"

    def __str__(self) -> str:
        return self.title

p = Project("Tracker")
print(str(p))   # Tracker          → __str__
print(repr(p))  # Project(title=...) → __repr__
```

**Container-like + `with` + callable:**

```python
# len / [] / in / for  →  __len__ __getitem__ __contains__ __iter__
# with obj:            →  __enter__ __exit__
# obj()                →  __call__
```

Corre los ejemplos:

```bash
python python/05-magic-methods/01-dunder-basics.py
python python/05-magic-methods/02-container-context-call.py
```

Preguntas cortas: `python/05-magic-methods/00-preguntas-respuestas.md`

---

## 18) Promedio por ciudad — tuplas `(ciudad, temp)`

```python
cities = [
    ("london", 12),
    ("london", 12),
    ("london", 12),
    ("london", 12),
    ("bogota", 20),
    ("bogota", 22),
]

from collections import defaultdict

def averages_by_city(cities: list[tuple[str, float]]) -> dict[str, float]:
    sums: dict[str, float] = defaultdict(float)
    counts: dict[str, int] = defaultdict(int)
    for city, temp in cities:
        sums[city] += temp
        counts[city] += 1
    return {c: sums[c] / counts[c] for c in counts}

# → {"london": 12.0, "bogota": 21.0}   # bogota promedio, london promedio, ...
```

**Diamante — imprime `"b"`** (MRO: D→B→C→A):

```python
class D(B, C):  # B primero
    pass
D().speak()  # "b"  — ver D.__mro__
```

**Scraper → API:** mismo `NewsSource` ABC; scrap intacto; `CnnApiClient` nueva; tests mockean HTTP.

**Before/after sin tocar el body:**

```python
def around(fn):
    def wrapper(*a, **k):
        print("BEFORE"); r = fn(*a, **k); print("AFTER"); return r
    return wrapper

Worker.run = around(Worker.run)  # o @around en definición
```

```bash
python python/02-oop/02-mro-polimorfismo-decorator.py
python code-challenges/pure-code/06-city-temp-average/solution.optimized.py starter/cases.json
```

---

## Cómo estudiar esto

1. Abre este archivo y **tipea** 2–3 ejemplos a mano (no copies ciego).  
2. Corre:
   ```bash
   python python/01-fundamentos/01-tipos-defaults-comprehensions.py
   python python/01-fundamentos/02-ordereddict-lru.py
   python python/01-fundamentos/03-file-io.py
   python python/02-oop/01-classmethod-dataclass-abc.py
   python python/02-oop/02-mro-polimorfismo-decorator.py
   python python/03-async/01-async-vs-threads.py
   python python/05-magic-methods/01-dunder-basics.py
   python python/05-magic-methods/02-container-context-call.py
   ```
3. Vuelve a `00-preguntas-respuestas.md` y responde en voz alta en **inglés**.

Si un tema sigue borroso, dime cuál (ej. solo GIL, solo N+1, solo magic methods) y lo bajamos a un ejemplo aún más chico paso a paso.
