# Magic methods (dunder methods) — Preguntas

> **Magic methods** = métodos especiales con doble guion bajo `__nombre__` (por eso “dunder” = *double underscore*).  
> Python los llama automáticamente con sintaxis del lenguaje (`+`, `len()`, `print()`, `with`, `[]`…).

---

**P (EN): What are Python magic methods?**  
**R (EN):** Special methods named with double underscores (`__init__`, `__str__`, …). Python invokes them for language syntax — you rarely call them directly. Also called dunder methods (double underscore).

**P (ES): ¿Qué son los magic methods?**  
**R (ES):** Métodos especiales `__así__`. Python los invoca solo cuando usas sintaxis del lenguaje. También se llaman dunder methods (double underscore / doble guion bajo).

---

**P (EN): `__init__` vs `__new__`?**  
**R (EN):** `__new__` creates the instance (rarely overridden). `__init__` initializes attributes on `self`. Day to day you only write `__init__`.

**P (ES): ¿`__init__` vs `__new__`?**  
**R (ES):** `__new__` crea la instancia. `__init__` inicializa atributos. En el día a día solo escribes `__init__`.

---

**P (EN): `__str__` vs `__repr__`?**  
**R (EN):** `__str__` = readable for end users (`print`, `str()`). `__repr__` = unambiguous for developers/debugging (`repr()`, REPL). Ideal: `eval(repr(obj))` roughly rebuilds the object. If only one exists, `__repr__` is used as fallback for `str`.

**P (ES): ¿`__str__` vs `__repr__`?**  
**R (ES):** `__str__` = legible para humanos. `__repr__` = claro para debug/devs. Si solo defines uno, suele bastar `__repr__` (Python lo usa de fallback).

---

**P (EN): Which dunders make an object act like a number?**  
**R (EN):** Arithmetic: `__add__`, `__sub__`, `__mul__`, … Comparison: `__eq__`, `__lt__`, `__le__`, … Often also `__hash__` if the object is immutable and used in sets/dicts.

**P (ES): ¿Cuáles hacen que un objeto se comporte como número?**  
**R (ES):** Aritméticos `__add__`, `__sub__`… Comparación `__eq__`, `__lt__`… Si va en `set`/`dict` como key, también `__hash__` (y debe ser inmutable lógicamente).

---

**P (EN): How do you make an object work with `len()` and `[]`?**  
**R (EN):** `__len__` for `len(obj)`. `__getitem__` for `obj[i]`. Optionally `__setitem__`, `__delitem__`, `__contains__` (`in`), `__iter__` for `for x in obj`.

**P (ES): ¿Cómo haces que un objeto funcione con `len()` y `[]`?**  
**R (ES):** `__len__` → `len(obj)`. `__getitem__` → `obj[i]`. Opcional: `__setitem__`, `__contains__` (`in`), `__iter__` (bucle `for`).

---

**P (EN): How does `with` relate to magic methods?**  
**R (EN):** Context manager protocol: `__enter__` runs on entry, `__exit__` on exit (even after exceptions). That’s what `with open(...) as f` uses.

**P (ES): ¿Cómo se relaciona `with` con magic methods?**  
**R (ES):** Protocolo context manager: `__enter__` al entrar, `__exit__` al salir (también si hay excepción). Es lo que usa `with open(...)`.

---

**P (EN): `__call__`?**  
**R (EN):** Makes an instance callable like a function: `obj()`. Useful for functors, decorators as classes, configurable handlers.

**P (ES): ¿`__call__`?**  
**R (ES):** La instancia se puede llamar como función: `obj()`. Útil en functors, decorators con clase, handlers configurables.

---

**P (EN): Why prefer `__eq__` carefully with `__hash__`?**  
**R (EN):** Objects that compare equal should have the same hash if hashable. Mutable objects used as dict keys are dangerous — usually set `__hash__ = None` if you define `__eq__` on a mutable type.

**P (ES): ¿Por qué cuidar `__eq__` con `__hash__`?**  
**R (ES):** Si dos objetos son iguales (`==`), deben tener el mismo hash si son hasheables. Objetos mutables como keys de dict son peligrosos — a menudo `__hash__ = None` si defines `__eq__` en tipo mutable.

---

## Lista rápida de los más preguntados

| Magic method | Se dispara con… | Para qué |
|--------------|-----------------|----------|
| `__init__` | `Cls(...)` | Inicializar |
| `__repr__` | `repr(x)`, REPL | Debug |
| `__str__` | `print(x)`, `str(x)` | Texto amigable |
| `__len__` | `len(x)` | “Tamaño” |
| `__getitem__` | `x[i]` | Indexar / slice |
| `__setitem__` | `x[i] = v` | Asignar por índice |
| `__contains__` | `v in x` | Membresía |
| `__iter__` | `for i in x` | Iterar |
| `__eq__` / `__lt__` | `==` / `<` | Comparar |
| `__add__` | `x + y` | Suma |
| `__bool__` | `if x:` | Truthiness |
| `__enter__` / `__exit__` | `with x:` | Context manager |
| `__call__` | `x()` | Instancia “invocable” |
| `__getattr__` | `x.attr` missing | Fallback atributos |

Código: `01-dunder-basics.py`, `02-container-context-call.py`
