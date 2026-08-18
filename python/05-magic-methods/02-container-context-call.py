"""
ENTREVISTA: ¿Cómo haces que un objeto soporte len(), [], in, for, with, obj()?

__len__, __getitem__, __contains__, __iter__,
__enter__/__exit__, __call__
"""

from __future__ import annotations

from typing import Iterator


class TaskList:
    """Mini colección — se comporta un poco como una list."""

    def __init__(self, titles: list[str] | None = None) -> None:
        self._items = list(titles or [])

    def __len__(self) -> int:
        return len(self._items)

    def __getitem__(self, index: int) -> str:
        return self._items[index]

    def __setitem__(self, index: int, value: str) -> None:
        self._items[index] = value

    def __contains__(self, title: object) -> bool:
        return title in self._items

    def __iter__(self) -> Iterator[str]:
        return iter(self._items)

    def __repr__(self) -> str:
        return f"TaskList({self._items!r})"


class DbSessionFake:
    """Simula context manager: with session: ..."""

    def __init__(self) -> None:
        self.connected = False

    def __enter__(self) -> DbSessionFake:
        self.connected = True
        print("ENTER: connected")
        return self  # lo que recibe "as session"

    def __exit__(self, exc_type, exc, tb) -> bool:
        self.connected = False
        print("EXIT: closed", "| error?" , exc_type is not None)
        return False  # False = no tragar la excepción


class Multiplier:
    """Instancia invocable gracias a __call__."""

    def __init__(self, factor: int) -> None:
        self.factor = factor

    def __call__(self, value: int) -> int:
        return value * self.factor


if __name__ == "__main__":
    tasks = TaskList(["JWT", "N+1", "GIL"])
    print(len(tasks))          # 3 → __len__
    print(tasks[0])            # JWT → __getitem__
    print("GIL" in tasks)      # True → __contains__
    for t in tasks:            # → __iter__
        print("-", t)

    with DbSessionFake() as session:
        assert session.connected is True
    assert session.connected is False

    double = Multiplier(2)
    print(double(10))          # 20 → __call__
