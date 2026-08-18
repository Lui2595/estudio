# Testing — Flask

**P: ¿test_client?**  
R: Cliente HTTP in-process de Flask. No necesitas servidor real.

**P: ¿Qué testear mínimo?**  
R: Health/login 200 + un endpoint protegido 401 sin token. Smoke > cero.

**P: ¿DB de test?**  
R: SQLite en memoria o DB aparte; `create_app("testing")`.
