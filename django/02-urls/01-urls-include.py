"""
TEMA: urls.py project + app
"""

# myproject/urls.py
# from django.urls import include, path
# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("api/", include("projects.urls")),
# ]

# projects/urls.py
# from django.urls import path
# from . import views
# urlpatterns = [
#     path("projects/", views.project_list, name="project-list"),
#     path("projects/<int:pk>/", views.project_detail, name="project-detail"),
# ]

URL_PATTERN_NOTES = {
    "int": "<int:pk>",
    "slug": "<slug:slug>",
    "include": 'path("api/", include("projects.urls"))',
}
