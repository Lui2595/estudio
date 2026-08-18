# OOP entrevista — MRO, polimorfismo, decorator

**P: Diamante `D(B, C)` — ¿qué imprime / qué método gana?**  
R: MRO izquierda→derecha: `D → B → C → A`. Gana **B**. Verifica con `D.__mro__`.

**P: Scraper CNN ya testeado → agregar API ¿cómo?**  
R: Extraer interfaz (`ABC`/`Protocol` con `fetch_headlines`). Scrap implementa el contrato sin romper tests. Nueva `CnnApiClient` misma interfaz. Negocio depende del ABC (inyección).

**P: ¿Qué testear en la API?**  
R: parse JSON happy path, errores HTTP, shape inválido, y que el consumidor funciona con ambas implementaciones (mock HTTP).

**P: Before/after sin modificar el método?**  
R: Decorator `@around` o `Cls.method = around(Cls.method)`, o subclase con `super()`.

Código: `02-mro-polimorfismo-decorator.py`
