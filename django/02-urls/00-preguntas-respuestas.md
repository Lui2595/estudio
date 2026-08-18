# URLs — Django

**P: ¿path vs re_path?**  
R: `path()` con converters para lo habitual. `re_path()` solo si necesitas regex compleja.

**P: ¿include?**  
R: Monta urls de una app: `path("api/", include("projects.urls"))`.

**P: ¿name=?**  
R: Nombre reversible con `reverse("projects-list")` / `{% url %}`.
