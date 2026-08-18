"""
TEMA: FBV vs CBV (patrón estudio)
"""

# FBV
# def project_list(request):
#     projects = Project.objects.select_related("owner").all()
#     return render(request, "projects/list.html", {"projects": projects})

# CBV genérica
# class ProjectListView(ListView):
#     model = Project
#     template_name = "projects/list.html"
#     context_object_name = "projects"
#
#     def get_queryset(self):
#         return Project.objects.select_related("owner")

VIEW_RULE = "Parse request → call domain → return response. No fat views."
