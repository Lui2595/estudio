"""
TEMA: ModelForm vs Serializer (cuándo cada uno)
"""

# HTML server-rendered → ModelForm
# class ProjectForm(forms.ModelForm):
#     class Meta:
#         model = Project
#         fields = ["title"]

# JSON API → DRF Serializer
# class ProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Project
#         fields = ["id", "title", "archived"]

WHEN = {
    "ModelForm": "templates + POST clásico",
    "Serializer": "DRF / SPA React",
}
