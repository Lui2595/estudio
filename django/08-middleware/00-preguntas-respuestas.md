# Middleware — Django

**P: ¿Qué es?**  
R: Capas que envuelven request/response (Security, Session, Auth, CSRF, Common…).

**P: ¿Orden?**  
R: Importa: auth depende de session; CSRF de cookies. No reordenar a ciegas.

**P: ¿CSRF en API JWT?**  
R: Endpoints solo Bearer suelen exentos de CSRF; vistas session+cookie sí lo necesitan.

**P: ¿Qué significan CSRF y JWT?**  
R: CSRF = Cross Site Request Forgery (ataque de falsificación de petición cruzada). JWT = JSON Web Token (token compacto para autenticación).