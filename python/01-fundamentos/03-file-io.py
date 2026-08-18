"""
ENTREVISTA: ¿Cómo lees un archivo en Python? ¿Por qué `with`?
También: JSON, pathlib, modos r/w/a, encoding.

Regla de oro: siempre `with open(...)` → cierra el archivo
aunque falle (context manager = __enter__/__exit__).
"""

from __future__ import annotations

import json
import tempfile
from pathlib import Path

# Usamos un dir temporal para que el ejemplo sea runnable sin ensuciar el repo
tmp = Path(tempfile.mkdtemp(prefix="py-files-"))

# ---------------------------------------------------------------------------
# 1) Escribir texto
# ---------------------------------------------------------------------------
# El operador "/" en pathlib concatena rutas de forma intuitiva y multiplataforma.
# Es equivalente a os.path.join(tmp, "notes.txt"), pero más limpio:
notes = tmp / "notes.txt"
# mode "w" = write (crea/sobrescribe). encoding explícito en Windows.
with notes.open("w", encoding="utf-8") as f:
    f.write("linea 1\n")
    f.write("linea 2\n")

# Equivalente pathlib (más corto para todo el archivo):
# notes.write_text("linea 1\nlinea 2\n", encoding="utf-8")

# ---------------------------------------------------------------------------
# 2) Leer TODO el archivo
# ---------------------------------------------------------------------------
with notes.open("r", encoding="utf-8") as f:
    whole = f.read()
assert "linea 1" in whole

text = notes.read_text(encoding="utf-8")  # pathlib one-liner
assert text == whole

# ---------------------------------------------------------------------------
# 3) Leer línea a línea (archivos grandes — no cargues todo en RAM)
# ---------------------------------------------------------------------------
lines: list[str] = []
with notes.open(encoding="utf-8") as f:  # "r" es default
    for line in f:  # lazy: una línea por iteración
        lines.append(line.rstrip("\n"))
assert lines == ["linea 1", "linea 2"]

# ---------------------------------------------------------------------------
# 4) Append
# ---------------------------------------------------------------------------
with notes.open("a", encoding="utf-8") as f:
    f.write("linea 3\n")
assert notes.read_text(encoding="utf-8").count("\n") == 3

# ---------------------------------------------------------------------------
# 5) JSON — lo más común en challenges / APIs
# ---------------------------------------------------------------------------
cases_path = tmp / "cases.json"
payload = {"cases": [{"name": "demo", "expected": [1, 2]}]}

# Escribir JSON
with cases_path.open("w", encoding="utf-8") as f:
    json.dump(payload, f, indent=2)

# Leer JSON (como en pure-code runners)
with cases_path.open(encoding="utf-8") as f:
    data = json.load(f)
assert data["cases"][0]["name"] == "demo"

# Alternativa pathlib:
data2 = json.loads(cases_path.read_text(encoding="utf-8"))
assert data2 == data

# ---------------------------------------------------------------------------
# 6) Modos rápidos
# ---------------------------------------------------------------------------
# "r"  read text (default)
# "w"  write text (truncate)
# "a"  append
# "x"  create exclusive (falla si existe)
# "rb" / "wb"  binary (imágenes, zip) — sin encoding=
# "r+" read+write

# ---------------------------------------------------------------------------
# 7) Path helpers útiles
# ---------------------------------------------------------------------------
assert notes.exists()
assert notes.suffix == ".txt"
assert notes.name == "notes.txt"
parent = notes.parent
assert (parent / "cases.json").is_file()

# CLI típico de challenge:
# path = Path(sys.argv[1] if len(sys.argv) > 1 else "starter/cases.json")
# raw = json.loads(path.read_text(encoding="utf-8"))

print(f"File I/O OK — ejemplos en {tmp}")
