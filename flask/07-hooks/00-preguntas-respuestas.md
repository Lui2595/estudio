# Hooks — Flask

**P: ¿before_request?**  
R: Corre antes de cada view del app/blueprint — auth global, logging, abrir recursos.

**P: ¿after_request?**  
R: Recibe la response; útil para headers (CORS manual, timing).

**P: ¿errorhandler?**  
R: Centraliza 404/500 → JSON consistente para el frontend.
