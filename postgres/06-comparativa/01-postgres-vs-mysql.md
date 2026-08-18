# PostgreSQL vs MySQL — Guía rápida para entrevista

## Cuándo elegir PostgreSQL

- JSON/JSONB complejo con índices GIN
- Window functions, CTEs recursivas avanzadas
- Full-text search nativo (tsvector)
- Tipos avanzados: arrays, ranges, UUID, geometric
- Integridad referencial estricta
- Extensiones (PostGIS, pg_cron, citus)

## Cuándo elegir MySQL

- Ecosistema Laravel tradicional (aunque PG funciona igual)
- Hosting compartido / managed barato (RDS MySQL)
- Replicación read-replica simple y documentada
- Equipo más familiarizado con MySQL

## Diferencias técnicas frecuentes en entrevista

| Feature | PostgreSQL | MySQL |
|---------|------------|-------|
| UPSERT | `ON CONFLICT DO UPDATE` | `ON DUPLICATE KEY UPDATE` |
| RETURNING | Nativo | 8.0+ limitado |
| Boolean | Tipo nativo | TINYINT(1) |
| Sequences | SERIAL / IDENTITY | AUTO_INCREMENT |
| String concat | `\|\|` o `concat()` | `CONCAT()` |
| Case sensitivity | Identifiers lowercase | Depende de OS |
| Full-text | tsvector + GIN | FULLTEXT index |
| JSON indexable | JSONB + GIN | JSON + functional index |

## Pregunta Senior

> ¿Cómo migrarías de MySQL a PostgreSQL en Laravel?

1. Cambiar `DB_CONNECTION=pgsql` y credenciales
2. Revisar migraciones: `json` → `jsonb`, `unsigned` no existe en PG
3. Raw queries con sintaxis MySQL específica
4. `ON DUPLICATE KEY` → `ON CONFLICT`
5. Tests completos + migración de datos con pgloader o scripts ETL
