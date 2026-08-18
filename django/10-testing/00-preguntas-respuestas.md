# Testing — Django / DRF

**P: ¿APIClient?**  
R: Cliente de tests DRF: `.get/.post`, `force_authenticate(user=...)`.

**P: ¿Mínimo útil?**  
R: list sin auth → 401; list con user → 200 + shape esperado.

**P: ¿TestCase?**  
R: Cada test en transacción que se revierte — DB limpia entre tests.
