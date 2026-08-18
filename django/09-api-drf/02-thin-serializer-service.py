"""
ENTREVISTA: ¿Por qué no poner lógica en el serializer?
Serializer = validar + shape JSON. Service = negocio + side effects.
"""

# --- Serializer: contrato de datos ---
# class RegisterSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     name = serializers.CharField(max_length=120)
#
#     def validate_email(self, value: str) -> str:
#         return value.lower()


# --- Service: reglas ---
class UserService:
    def create_user(self, data: dict) -> dict:
        # unicidad, hash, eventos — NO en el serializer
        email = data["email"]
        if email == "taken@example.com":
            raise ValueError("email_taken")
        user = {"id": 1, "email": email, "name": data["name"]}
        # welcome_email.delay(user["id"])
        return user


# --- View ---
def create_user_view(payload: dict) -> tuple[dict, int]:
    # ser = RegisterSerializer(data=payload)
    # ser.is_valid(raise_exception=True)
    if "@" not in payload.get("email", ""):
        return {"error": "validation"}, 422
    user = UserService().create_user(payload)
    return user, 201


assert create_user_view({"email": "a@b.com", "name": "Ana"})[1] == 201
print("thin serializer + service OK")
