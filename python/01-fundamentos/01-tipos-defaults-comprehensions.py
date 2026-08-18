"""
ENTREVISTA: list vs tuple vs set vs dict? Mutable default pitfall?
"""

# --- Tipos básicos ---
nums_list = [1, 2, 2]          # mutable, ordenado, permite dupes
nums_tuple = (1, 2, 2)         # inmutable
nums_set = {1, 2, 2}           # → {1, 2} únicos
user = {"id": 1, "name": "Luis"}  # key → value

# Membership O(1) promedio con set/dict
assert 2 in nums_set


# --- Mutable default (BUG clásico) ---
def append_bad(item, bucket=[]):  # noqa: B006 — ejemplo del bug
    bucket.append(item)
    return bucket


assert append_bad("a") == ["a"]
assert append_bad("b") == ["a", "b"]  # ¡sorprendente! misma lista


def append_good(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket


assert append_good("a") == ["a"]
assert append_good("b") == ["b"]


# --- Comprehension + generator ---
squares = [n * n for n in range(5) if n % 2 == 0]  # [0, 4, 16]
gen = (n * n for n in range(5))  # lazy
assert sum(gen) == 30


# --- *args / **kwargs ---
def build_url(base: str, *parts: str, **query: str) -> str:
    path = "/".join([base.rstrip("/"), *[p.strip("/") for p in parts]])
    if not query:
        return path
    qs = "&".join(f"{k}={v}" for k, v in query.items())
    return f"{path}?{qs}"


assert "api/users?active=1" in build_url("api", "users", active="1")


# --- is vs == ---
a = [1]
b = [1]
assert a == b and a is not b
assert None is None
