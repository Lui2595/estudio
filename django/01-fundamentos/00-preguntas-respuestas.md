# Fundamentos — Django

**P: ¿MVT?**  
R: Model (datos/ORM), View (lógica request), Template (HTML). APIs usan View/DRF sin Template.

**P: ¿project vs app?**  
R: Project = settings + urls raíz. App = feature (`projects`) con models/views/urls.

**P: ¿settings.py clave?**  
R: `INSTALLED_APPS`, `MIDDLEWARE`, `DATABASES`, `AUTH_USER_MODEL`, `REST_FRAMEWORK`.
