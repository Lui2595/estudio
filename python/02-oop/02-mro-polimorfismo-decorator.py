"""
ENTREVISTA LIVE — temas que te preguntaron:

1) Diamante ABC + herencia múltiple (MRO) — ¿qué imprime D?
2) Polimorfismo: scraper CNN testeado → nueva implementación API
3) Before/after sin modificar el método (decorator / wrap)
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Protocol


# =============================================================================
# 1) Diamante / MRO (Method Resolution Order)
# =============================================================================
# class D(B, C): busca métodos izquierda → derecha.
# MRO de D: D → B → C → A → object
# Por eso D().speak() usa B (imprime "b"), no C.


class A(ABC):
    @abstractmethod
    def speak(self) -> str:
        ...


class B(A):
    def speak(self) -> str:
        return "b"


class C(A):
    def speak(self) -> str:
        return "c"


class D(B, C):
    pass


assert D().speak() == "b"
assert [cls.__name__ for cls in D.__mro__][:4] == ["D", "B", "C", "A"]
# MRO completo típico: D → B → C → A → ABC → object
# Tip: print(D.__mro__) en la entrevista si dudas


# =============================================================================
# 2) Polimorfismo — misma interfaz, scrape CNN vs API
#    La clase scrap ya existe y está testeada → NO la rompas.
#    Extrae un contrato (ABC/Protocol) e inyecta la implementación.
# =============================================================================


class NewsSource(ABC):
    """Contrato común — lo que el resto del código necesita."""

    @abstractmethod
    def fetch_headlines(self) -> list[str]:
        ...


class CnnScraper(NewsSource):
    """Ya existe + tests verdes — se queda igual (solo implementa el contrato)."""

    def fetch_headlines(self) -> list[str]:
        # scrape real / HTML parse...
        return ["CNN scrap headline 1", "CNN scrap headline 2"]


class CnnApiClient(NewsSource):
    """Nueva implementación — misma interfaz, otra fuente."""

    def __init__(self, http_get) -> None:
        # http_get inyectado → fácil de mockear en tests
        self._http_get = http_get

    def fetch_headlines(self) -> list[str]:
        payload = self._http_get("https://api.cnn.example/headlines")
        return [item["title"] for item in payload["items"]]


def render_digest(source: NewsSource) -> str:
    """Código de negocio depende del ABC, no de scrap ni API."""
    heads = source.fetch_headlines()
    return " | ".join(heads)


# --- Qué testear en la API client ---
# 1) Happy path: JSON → list[str] correcto
# 2) HTTP error / timeout → excepción esperada (o vacío, según contrato)
# 3) Shape raro (falta "items") → manejo claro
# 4) render_digest funciona igual con scrap fake y api fake (polimorfismo)
# NO re-testear el scraper a fondo si ya tiene suite — un smoke con el ABC basta


def _fake_http_get(_url: str) -> dict:
    return {"items": [{"title": "API headline"}]}


assert "CNN scrap" in render_digest(CnnScraper())
assert render_digest(CnnApiClient(_fake_http_get)) == "API headline"


# =============================================================================
# 3) Before / after SIN modificar el método original
#    Opciones: decorator, reasignar A.method = wrap(A.method), subclass
# =============================================================================


class Worker:
    def run(self, x: int) -> int:
        return x * 2


def around(fn):
    """Decorator: imprime antes y después sin tocar el body de fn."""

    def wrapper(*args, **kwargs):
        print("BEFORE")
        result = fn(*args, **kwargs)
        print("AFTER")
        return result

    return wrapper


# A) En definición: @around encima del método
# B) En runtime (clase ya existe / ya testeada):
Worker.run = around(Worker.run)  # type: ignore[method-assign]

# C) Alternativa sin monkeypatch: subclase
class LoggedWorker(Worker):
    def run(self, x: int) -> int:
        print("BEFORE")
        result = super().run(x)
        print("AFTER")
        return result


w = Worker()
assert w.run(3) == 6  # imprime BEFORE / AFTER


print("entrevista-live OOP OK")
print("D.speak() ->", D().speak(), "| MRO:", [c.__name__ for c in D.__mro__])
