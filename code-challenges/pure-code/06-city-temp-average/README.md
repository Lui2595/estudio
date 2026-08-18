# 06 — Promedio por ciudad (lista de tuplas)

**Languages:** Python  
**Timebox:** 15–20 min  

---

## Input (entrevista)

```python
cities = [
    ("london", 12),
    ("london", 12),
    ("london", 12),
    ("london", 12),
    ("bogota", 20),
    ("bogota", 22),
    ("cdmx", 24),
]
```

## Output (solo promedios)

```python
{
    "london": 12.0,
    "bogota": 21.0,
    "cdmx": 24.0,
}
```

`bogota` promedio, `london` promedio, etc. — **no** hace falta devolver `count`.

```bash
python practice_tuples.py
python solution.optimized.py starter/cases.json
```
