"""
TEMA: FK 1:N + N+1 + atomic (patrón estudio)
"""

# class User(AbstractUser):
#     pass
#
# class Project(models.Model):
#     title = models.CharField(max_length=200)
#     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
#     archived = models.BooleanField(default=False)
#
# class Task(models.Model):
#     project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
#     title = models.CharField(max_length=200)
#     status = models.CharField(max_length=20, default="todo")

N_PLUS_1_FIX = """
# MAL
for p in Project.objects.all():
    print(p.owner.email)  # N queries extra

# BIEN
for p in Project.objects.select_related("owner"):
    print(p.owner.email)
"""

ATOMIC = """
from django.db import transaction

with transaction.atomic():
    project.archived = True
    project.save(update_fields=["archived"])
    project.tasks.update(status="done")
"""
