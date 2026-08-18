# 02 — Serializers delgados, service layer, modularizar

> Código: `django/09-api-drf/02-thin-serializer-service.py` · `django/11-arquitectura/`

---

## 1) Te preguntan: ¿Por qué NO poner lógica de negocio en un Serializer?

### Responde (voz, EN)

> A serializer’s job is **validation and shaping JSON** — input in, DTO (Data Transfer Object) out. Business rules — creating invoices, sending email, calling Stripe — belong in a **service**. If I dump that into `validate()` or `create()`, I can’t reuse it from a management command, a Celery task, or another view, and tests need the whole HTTP stack.

### Justifica

```
MAL:  View → Serializer (valida + emails + pagos + ORM)  ← imposible de testear/reusar

BIEN: View → Serializer.is_valid()
           → UserService.create(validated_data)
                → Repository / ORM
                → (opcional) queue email
```

```python
# Serializer: solo contrato de datos
class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=120)

    def validate_email(self, value):
        return value.lower()  # OK: transformación de input


# Service: reglas de negocio
class UserService:
    def create_user(self, data: dict) -> User:
        if User.objects.filter(email=data["email"]).exists():
            raise DomainError("email_taken")
        user = User.objects.create_user(**data)
        welcome_email.delay(user.id)  # side effect FUERA del serializer
        return user


# View: HTTP fino
def create(self, request):
    ser = UserSerializer(data=request.data)
    ser.is_valid(raise_exception=True)
    user = UserService().create_user(ser.validated_data)
    return Response(UserSerializer(user).data, status=201)
```

**Qué SÍ va en serializer:** tipos, required, `validate_campo`, `to_representation` (ocultar password).  
**Qué NO:** emails, cobros, orquestar 3 modelos, HTTP a terceros.

### Follow-up

| Pregunta | Respuesta |
|----------|-----------|
| ¿`Serializer.create()` de ModelSerializer? | Un `create()` de 5 líneas que llama al service está bien. 80 líneas de reglas no. |
| ¿Dónde van permisos? | `permission_classes` / object permissions — no en el serializer. |

---

## 2) Te preguntan: archivo monolítico de 3000 líneas — ¿cómo lo modularizas?

### Responde (voz, EN)

> I split by **responsibility**, not by line count. Models, serializers, views, services, permissions, tests — each has a different reason to change (SRP — Single Responsibility Principle). I keep a thin public API (`services.py` or `api.py`) so imports don’t explode.

### Justifica

```
ANTES                         DESPUÉS (por cohesión)
users.py  (3000 líneas)       users/
  models + views +            ├── models.py
  serializers + emails +      ├── serializers.py
  utils mezclados             ├── services.py      ← negocio
                              ├── selectors.py     ← lecturas (opcional)
                              ├── views.py         ← HTTP
                              ├── permissions.py
                              └── tests/
```

**Pasos reales (no big-bang):**

1. Extrae **services** (lo que más duele testear).  
2. Extrae serializers / views.  
3. Mueve tests al lado.  
4. Deja `users/__init__.py` reexportando lo público para no romper imports.

---

## 3) Te preguntan: ¿Por qué modularizar o NO una función?

### Responde (voz, EN)

> I modularize when it **reduces coupling** or enables reuse/testing — not because a file is 80 lines. Splitting `create_user` / `update_user` / `delete_user` into three files for a tiny CRUD is over-engineering (YAGNI — You Aren’t Gonna Need It). I split when the function has mixed concerns (HTTP + SQL + email) or when two teams/features change it for different reasons.

### Justifica — cuándo SÍ / NO

| SÍ extraer | NO extraer |
|------------|------------|
| Reglas de cobro + ORM + email en un view | CRUD de 40 líneas en un `ModelViewSet` |
| Misma regla usada por API y Celery | Una función privada de 8 líneas |
| Tests necesitan mockear un puerto (email, pagos) | “Por si crece” sin evidencia |
| Archivo con 4 razones de cambio | Un folder por cada verbo HTTP |

**Frase cierre:**  
> “The goal is cohesion and testability. Extra files have a navigation cost. I pay that cost only when it buys isolation.”
