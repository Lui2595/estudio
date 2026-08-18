# Requests — Flask

**P: ¿JSON body?**  
R: `request.get_json(silent=True)` — `silent=True` evita excepción si no hay JSON.

**P: ¿Query string?**  
R: `request.args.get("page", 1, type=int)`.

**P: ¿Status de validación?**  
R: Preferible **422** (o 400) con `{"fields": {...}}` claro para el frontend.
