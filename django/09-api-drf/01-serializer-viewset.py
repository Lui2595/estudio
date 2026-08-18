"""
TEMA: Serializer + ViewSet (patrón estudio EPAM)
"""

# class ProjectSerializer(serializers.ModelSerializer):
#     owner_email = serializers.EmailField(source="owner.email", read_only=True)
#
#     class Meta:
#         model = Project
#         fields = ["id", "title", "archived", "owner_email"]
#
# class ProjectViewSet(viewsets.ModelViewSet):
#     serializer_class = ProjectSerializer
#     permission_classes = [IsAuthenticated]
#
#     def get_queryset(self):
#         return (
#             Project.objects
#             .filter(owner=self.request.user)
#             .select_related("owner")
#         )
#
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# router = DefaultRouter()
# router.register("projects", ProjectViewSet, basename="project")
