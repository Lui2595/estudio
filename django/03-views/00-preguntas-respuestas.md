# Views — Django

**P: ¿FBV ("Function-Based View")?**  
R: Función que recibe `request` y retorna `HttpResponse` / DRF `Response`.

**P: ¿CBV ("Class-Based View")?**  
R: Clases (`ListView`, `View`) con dispatch por método. Reutilización vía mixins.

**P: ¿Thin view ("vista delgada")?**  
R: Igual que Flask/Laravel: orquestar HTTP; negocio en services/model methods.
