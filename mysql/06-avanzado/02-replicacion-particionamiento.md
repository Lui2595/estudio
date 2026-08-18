# MySQL — Replicación y particionamiento

## Replicación (Master → Replica)

- **Master**: recibe writes
- **Replica (Slave)**: recibe binlog del master, aplica cambios (reads)
- Uso: escalar lecturas, backups, failover

```
App → writes → Master
App → reads  → Replica 1, Replica 2
```

### Tipos
- **Asíncrona** (default): replica puede ir retrasada (lag)
- **Semi-síncrona**: al menos una replica confirma antes del commit
- **Group Replication**: consenso multi-master (MySQL 8)

## Particionamiento

Divide una tabla en segmentos físicos por rango, hash o lista.

```sql
CREATE TABLE logs (
    id INT AUTO_INCREMENT,
    created_at DATE,
    message TEXT,
    PRIMARY KEY (id, created_at)
)
PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026)
);
```

**Cuándo particionar**: tablas enormes (>millones), queries siempre filtran por la columna de partición.

## Pregunta típica

> ¿InnoDB vs MyISAM?

| | InnoDB | MyISAM |
|---|---|---|
| Transacciones | Sí | No |
| Foreign keys | Sí | No |
| Row-level locking | Sí | Table-level |
| Default MySQL 8 | **Sí** | Deprecated |
