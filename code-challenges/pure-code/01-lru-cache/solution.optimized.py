"""
LRU Cache — solución optimizada (Python)

OrderedDict preserva orden de inserción:
  - Primer key = LRU, último = MRU
  - get/put existentes: move_to_end(key) → MRU O(1)
  - Evict: popitem(last=False) → saca el LRU O(1)

Complejidad: get/put O(1) amortizado | espacio O(capacity)
Alternativa clásica: dict + doubly linked list (misma complejidad).
Thread-safety: sin lock, get/put concurrentes corrompen orden/size.
"""

from __future__ import annotations

import json
import sys
from collections import OrderedDict
from pathlib import Path


class LRUCache:
    def __init__(self, capacity: int) -> None:
        if capacity < 1:
            raise ValueError("capacity must be >= 1")
        self.capacity = capacity
        self._map: OrderedDict[int, int] = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self._map:
            return -1
        self._map.move_to_end(key)  # MRU
        return self._map[key]

    def put(self, key: int, value: int) -> None:
        if key in self._map:
            self._map.move_to_end(key)
            self._map[key] = value
            return
        if len(self._map) >= self.capacity:
            self._map.popitem(last=False)  # evict LRU
        self._map[key] = value


def run_case(case: dict) -> dict:
    cache: LRUCache | None = None
    got: list[int] = []

    for op in case["ops"]:
        name = op[0]
        if name == "LRUCache":
            cache = LRUCache(op[1])
        elif name == "put":
            cache.put(op[1], op[2])  # type: ignore[union-attr]
        elif name == "get":
            got.append(cache.get(op[1]))  # type: ignore[union-attr]
        else:
            raise ValueError(f"Unknown op: {name}")

    expected = case["expected"]
    passed = got == expected
    return {"name": case["name"], "passed": passed, "got": got, "expected": expected}


def main() -> None:
    # 1. Determina la ruta del archivo de casos de prueba.
    #   - Si el usuario pasó un argumento al script (sys.argv[1]), lo usa como ruta.
    #   - Si no, usa "starter/cases.json" como archivo de entrada por defecto.
    path = Path(sys.argv[1] if len(sys.argv) > 1 else "starter/cases.json")

    # 2. Lee el contenido del archivo y lo parsea como JSON.
    #   - path.read_text(...): Lee el archivo como texto (asumiendo encoding UTF-8).
    #   - json.loads(...): Convierte el texto leído en un objeto Python (dict).
    raw = json.loads(path.read_text(encoding="utf-8"))

    # 3. Resuelve todos los casos de prueba.
    #   - Para cada caso en raw["cases"], llama a run_case(c) para obtener el resultado de ese caso.
    #   - results será una lista de diccionarios con los detalles de cada caso (nombre, si pasó, esperado, obtenido).
    results = [run_case(c) for c in raw["cases"]]

    # 4. Verifica si TODOS los casos de prueba pasaron.
    #   - Si todos los resultados tienen r["passed"] igual a True, passed será True.
    passed = all(r["passed"] for r in results)

    # 5. Imprime un resumen de los resultados en JSON, formateado con indentación.
    #   - Incluye si todos pasaron y los detalles de cada caso.
    print(json.dumps({"passed": passed, "results": results}, indent=2))

    # 6. Sale del programa con código 0 si todos los tests pasaron, o 1 si alguno falló.
    #   - Esto ayuda a integrarlo con sistemas de CI o scripts de testing.
    sys.exit(0 if passed else 1)

if __name__ == "__main__":
    main()
