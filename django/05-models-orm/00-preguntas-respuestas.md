# Models / ORM — Django

**P: ¿select_related vs prefetch_related?**  
R: `select_related` = JOIN (FK/OneToOne). `prefetch_related` = query extra (reverse/M2M).

**P: ¿annotate Count?**  
R: `Project.objects.annotate(task_count=Count("tasks"))` — conteo sin cargar tasks.

**P: ¿atomic?**  
R: `with transaction.atomic():` — commit único o rollback total. Es **Atomicity** de ACID (Atomicity, Consistency, Isolation, Durability).

**P: ¿QuerySet vs iterator()?**  
R: QuerySet **cachea** en RAM (recorrer 2 veces = 1 SQL). `iterator()` **no cachea** — menos memoria en 100k filas/CSV; segundo for = otro SQL.

**P: ¿select_related vs prefetch_related?**  
R: `select_related` = JOIN (FK/OneToOne). `prefetch_related` = queries extra + stitch en Python (M2M / reverse).

Código: `02-queryset-iterator.py`  
Pack voz: `../../entrevistas/django-react-fastapi-senior/01-django-orm.md`
