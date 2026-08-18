# MVCC en PostgreSQL

## ¿Qué es MVCC?

**Multi-Version Concurrency Control**: cada transacción ve una "snapshot" consistente de los datos sin bloquear lecturas.

- UPDATE no sobrescribe: crea una **nueva versión** de la fila
- Las versiones viejas quedan como "dead tuples"
- **VACUUM** limpia dead tuples periódicamente

## Diferencia clave vs MySQL (InnoDB)

| Aspecto | PostgreSQL | MySQL InnoDB |
|---------|------------|--------------|
| MVCC | Nativo desde el diseño | Sí (undo log) |
| VACUUM | Necesario (autovacuum) | No equivalente directo |
| Lecturas | Nunca bloquean escrituras | Similar con MVCC |
| SERIALIZABLE | Snapshot isolation real | REPEATABLE READ default |

## Implicaciones en producción

1. **Autovacuum** debe estar activo y bien tunado
2. **Table bloat**: dead tuples ocupan espacio → VACUUM FULL (con cuidado)
3. **Long transactions** bloquean vacuum → conexiones idle son peligrosas
4. **UPDATE frecuente** genera mucho bloat

## Pregunta típica

> ¿Por qué un DELETE no libera espacio en disco inmediatamente?

Porque MVCC marca la fila como invisible, pero el espacio se recupera con VACUUM, no con DELETE.

```sql
-- Ver bloat aproximado
SELECT relname, n_dead_tup, last_vacuum, last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```
