# OrderedDict — métodos clave

**P: ¿OrderedDict vs dict (3.7+)?**  
R: Ambos preservan orden de inserción. `OrderedDict` añade `move_to_end` y `popitem(last=...)` — ideales para LRU sin reinventar lista doblemente enlazada.

**P: ¿`move_to_end(key, last=True)`?**  
R: Reubica la key. `last=True` → al final (MRU). `last=False` → al inicio.

**P: ¿`popitem(last=True)`?**  
R: Saca y retorna `(key, value)`. `last=True` → último. `last=False` → primero (evict LRU).

**P: ¿Frase de entrevista LRU en Python?**  
R: “Uso `OrderedDict`: `move_to_end` al tocar; `popitem(last=False)` al evictar. get/put O(1) amortizado.”

Código: `02-ordereddict-lru.py`

---

# File I/O — consumir / escribir archivos

**P: ¿Cómo lees un archivo?**  
R: `with open(path, encoding="utf-8") as f: data = f.read()` — o `Path(path).read_text(encoding="utf-8")`.

**P: ¿Por qué `with`?**  
R: Context manager: cierra el file aunque haya excepción (`__enter__`/`__exit__`). Sin `with` puedes dejar handles abiertos.

**P: ¿Archivo grande?**  
R: No `read()` entero. Itera: `for line in f:`.

**P: ¿JSON de cases?**  
R: `json.load(f)` o `json.loads(path.read_text(...))`. Escribir: `json.dump(obj, f)`.

**P: ¿Modos?**  
R: `r` leer, `w` sobrescribir, `a` append, `rb`/`wb` binario.

Código: `03-file-io.py`
