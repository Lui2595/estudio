"""
ENTREVISTA: GIL? threading vs multiprocessing vs asyncio?

Este archivo documenta el modelo mental. No lances tareas intensivas de CPU en el event loop.

# Explicación detallada:

- **GIL (Global Interpreter Lock):**  
  El GIL es un mecanismo interno de CPython (la implementación estándar de Python) que solo permite que un thread ejecute código Python a la vez por proceso, incluso si hay múltiples hilos.  
  - ⇒ Por esto, **multiprocessing** es preferido sobre threading para CPU-bound: cada proceso tiene su propio GIL.
  - **threading** en Python sirve sobre todo para I/O bound (operaciones bloqueantes de red/disk), pero NO acelera tareas CPU.
  - **asyncio** es solo para I/O: nunca para tareas "CPU-bound" largas, porque bloquea el event loop.
  - Para operaciones que bloquean CPU, usa **ProcessPoolExecutor** o multiprocesos.
  - Para operaciones I/O (red, disco, SQL lento...), **asyncio** y **threading** funcionan bien.

- **Resumen**:  
  - **Tareas I/O-bound** (mucho "esperar"): usa `asyncio` o `threading`.
  - **Tareas CPU-bound** (mucho cálculo): usa `multiprocessing` o `concurrent.futures.ProcessPoolExecutor`.

"""

from __future__ import annotations

import asyncio
from concurrent.futures import ThreadPoolExecutor

# --- Async I/O (bueno para operaciones de espera, como red/DB) ---
async def fetch_fake(delay: float, label: str) -> str:
    # Simula una "espera" de I/O.   
    # asyncio.sleep cede el event loop: otros tasks pueden avanzar durante el sleep.
    await asyncio.sleep(delay)
    return label

async def parallel_io() -> list[str]:
    # Lanza varias tareas async en paralelo y espera a que todas terminen.
    return await asyncio.gather(
        fetch_fake(0.05, "a"),
        fetch_fake(0.05, "b"),
    )

# --- CPU-bound: nunca lo pongas directo en async/await/loop ---
def cpu_heavy(n: int) -> int:
    # Tarea intensiva de cálculo (simulada)
    return sum(i * i for i in range(n))

async def cpu_offloaded(n: int) -> int:
    # Para tareas CPU-bound, usamos un "executor" para que corra en un hilo aparte.
    # Si fuera una tarea aún más pesada, usar ProcessPoolExecutor (multiproceso, no hilo).
    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor() as pool:
        # Nota: ThreadPoolExecutor no sortea el GIL para cálculos CPU intensivos;
        # es solo ejemplo didáctico (lo correcto sería ProcessPoolExecutor en casos pesados).
        return await loop.run_in_executor(pool, cpu_heavy, n)

async def main() -> None:
    labels = await parallel_io()
    assert labels == ["a", "b"]
    # Aquí ejecutamos una tarea de cálculo "outsourced" fuera del event loop.
    assert await cpu_offloaded(1000) > 0

if __name__ == "__main__":
    asyncio.run(main())

# Frase de entrevista (explicada):
# "GIL = solo un thread ejecuta bytecode Python a la vez por proceso.
# Para operaciones web/I/O: async o varios workers/procesos estilo gunicorn.
# Para cargas CPU: multiprocessing o ProcessPoolExecutor, NO más threads."
