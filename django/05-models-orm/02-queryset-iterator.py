"""
ENTREVISTA: QuerySet cache vs iterator()? select_related vs prefetch_related?
            transaction.atomic() — Atomicity (ACID).
Patrones (estudio, no requiere Django instalado para leerlos).
"""

QUERYSET_VS_ITERATOR = """
# Cache: reusar el mismo QS no dispara otro SQL
users = User.objects.filter(active=True)
list(users)  # 1 query, resultados en RAM
list(users)  # 0 queries

# Stream: no cachea — ideal 100k filas / CSV
for u in User.objects.all().iterator(chunk_size=2000):
    write_csv_row(u)
# segundo for = otra query
"""

SELECT_VS_PREFETCH = """
# FK / OneToOne → JOIN (1 query)
Book.objects.select_related("author")

# M2M / reverse FK → 2+ queries, une en memoria
Book.objects.prefetch_related("tags")

# N+1: for b in Book.objects.all(): b.author.name  → 1+N
"""

ATOMIC = """
from django.db import transaction

with transaction.atomic():
    order = Order.objects.create(...)
    Payment.objects.create(order=order, ...)
# fallo → rollback de ambos (Atomicity)

# Tras commit, entonces Celery:
transaction.on_commit(lambda: notify.delay(order.id))
"""

print("ORM patterns: iterator / select_related / prefetch_related / atomic")
