# MongoDB — Replica Sets y Sharding

## Replica Set

Grupo de nodos con la misma data para **alta disponibilidad**.

```
Primary   → recibe writes
Secondary → replica data, puede servir reads
Arbiter   → vota en elecciones (sin data)
```

- **Failover automático**: si Primary cae, Secondary se elige como nuevo Primary
- **Read preference**: `primary` (default), `secondary`, `nearest`
- Mínimo producción: 3 nodos (o 2 + arbiter)

## Sharding

Particiona data horizontalmente entre **shards** (replica sets).

```
         mongos (router)
        /    |    \
   Shard A  Shard B  Shard C
   (RS)     (RS)     (RS)
```

- **Shard key**: campo(s) que determinan en qué shard va cada documento
- Elegir bien: distribución uniforme, queries incluyen shard key
- **Mal shard key**: monótono creciente (ej: `_id` ObjectId) → hot shard

## Sharding vs Replicación

| | Replica Set | Sharding |
|---|---|---|
| Objetivo | HA, backup | Escalar writes/storage |
| Complejidad | Baja | Alta |
| Cuándo | Casi siempre | >TB de data o writes masivos |

## Pregunta típica

> ¿ObjectId vs UUID como _id?

- **ObjectId**: 12 bytes, incluye timestamp, generación local sin colisiones
- **UUID**: 16 bytes, estándar, mejor si integras con sistemas externos

```javascript
// ObjectId estructura: 4 timestamp + 5 random + 3 counter
ObjectId("507f1f77bcf86cd799439011").getTimestamp()
```
