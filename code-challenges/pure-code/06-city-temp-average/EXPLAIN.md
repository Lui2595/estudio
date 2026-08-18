# Promedio por ciudad

## Input / Output

```python
cities = [("london", 12), ("london", 12), ("bogota", 20), ("bogota", 22)]

# resultado:
{"london": 12.0, "bogota": 21.0}   # solo promedios
```

## Código

```python
from collections import defaultdict

def averages_by_city(cities):
    sums, counts = defaultdict(float), defaultdict(int)
    for city, temp in cities:
        sums[city] += temp
        counts[city] += 1
    return {c: sums[c] / counts[c] for c in counts}
```
