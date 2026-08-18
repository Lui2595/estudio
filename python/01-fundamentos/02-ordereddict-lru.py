"""
ENTREVISTA: ¿Qué es OrderedDict? ¿move_to_end / popitem?
Uso típico: LRU cache (ver pure-code/01-lru-cache).

OrderedDict = dict que recuerda el orden de inserción
(y permite reordenar / sacar del inicio o del final).
Desde 3.7 el dict normal también preserva orden, pero
OrderedDict trae move_to_end y popitem(last=...) pensados para LRU.
"""

from typing import Literal


from collections import OrderedDict

# --- Crear / insertar ---
od = OrderedDict()
od[1] = "a"
od[2] = "b"
od[3] = "c"
assert list(od.keys()) == [1, 2, 3]  # orden de inserción


# --- move_to_end(key, last=True) ---
# last=True  → mueve al FINAL (MRU = most recently used)
# last=False → mueve al INICIO (LRU side)
od.move_to_end(1)  # 1 pasa a ser el último
assert list(od.keys()) == [2, 3, 1]

od.move_to_end(3, last=False)  # 3 al inicio
assert list(od.keys()) == [3, 2, 1]


# --- popitem(last=True) ---
# last=True  → saca el ÚLTIMO (como stack / LIFO)
# last=False → saca el PRIMERO (LRU en un cache)
key, val = od.popitem(last=False)  # evict LRU
assert (key, val) == (3, "c")
assert list(od.keys()) == [2, 1]


# --- Mini LRU: get refresca, put evicta si lleno ---
class TinyLRU:
    def __init__(self, capacity: int) -> None:
        self.cap = capacity
        self.data: OrderedDict[int, int] = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.data:
            return -1
        self.data.move_to_end(key)  # tocar → MRU
        return self.data[key]

    def put(self, key: int, value: int) -> None:
        if key in self.data:
            self.data.move_to_end(key)
            self.data[key] = value
            return
        if len(self.data) >= self.cap:
            self.data.popitem(last=False)  # evict LRU
        self.data[key] = value


cache = TinyLRU(2)
cache.put(1, 1)
cache.put(2, 2)
assert cache.get(1) == 1
cache.put(3, 3)  # evicta 2 (LRU)
assert cache.get(2) == -1
assert cache.get(3) == 3


# --- Otros métodos útiles ---
od2 = OrderedDict[Literal['x', 'y'], Literal[10, 20]]([("x", 10), ("y", 20)])
od2["x"] = 99  # actualizar valor NO cambia posición (a diferencia de delete+set en dict)
assert list(od2.keys()) == ["x", "y"]

# clear / pop / setdefault — igual que dict
assert od2.pop("y") == 20
od2.setdefault("z", 0)
assert "z" in od2

print("OrderedDict OK — move_to_end / popitem listos para LRU")
