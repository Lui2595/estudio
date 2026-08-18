# Forms — Django

**P: ¿ModelForm?**  
R: Form ligado a un Model; `save()` crea/actualiza instancia. Ideal HTML clásico.

**P: ¿API?**  
R: Preferir DRF Serializer (validación + shape JSON), no ModelForm.

**P: ¿is_valid()?**  
R: Valida y llena `cleaned_data`; si False, `form.errors`.
