# Auth — Django

**P: ¿Session auth vs JWT?**  
R: Session+cookie = sitio con templates. JWT Bearer = SPA (React) contra API.

**P: ¿simplejwt?**  
R: Librería DRF para access/refresh tokens. Login → tokens → header Authorization.

**P: ¿permission_classes?**  
R: En view/viewset: `IsAuthenticated` fuerza login; sin credenciales → 401.
