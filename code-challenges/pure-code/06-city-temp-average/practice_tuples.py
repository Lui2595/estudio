"""
Practica EXACTA como en la entrevista — sin JSON.
Corre: python practice_tuples.py

Input:  cities = [("london", 12), ("london", 12), ...]
Output: solo el PROMEDIO por ciudad
        {"london": 12.0, "bogota": 21.0, "cdmx": 24.0}
"""

from collections import defaultdict


def averages_by_city(cities: list[tuple[str, float | int]]) -> dict[str, float]:
    sums: dict[str, float] = defaultdict(float)
    counts: dict[str, int] = defaultdict(int)
    for city, temp in cities:
        sums[city] += temp
        counts[city] += 1
    return {city: sums[city] / counts[city] for city in counts}


# --- mismo shape que te dieron ---
cities = [
    ("london", 12),
    ("london", 12),
    ("london", 12),
    ("london", 12),
    ("bogota", 20),
    ("bogota", 22),
    ("cdmx", 24),
]

result = averages_by_city(cities)
print(result)
# esperado: bogota promedio, london promedio, cdmx promedio
assert result == {"london": 12.0, "bogota": 21.0, "cdmx": 24.0}
print("OK")
