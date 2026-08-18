# SQL vs MongoDB — Cuándo usar cada uno

## Matriz de decisión

| Criterio | SQL (MySQL/PostgreSQL) | MongoDB |
|----------|------------------------|---------|
| Esquema | Fijo, migraciones | Flexible, evolutivo |
| Relaciones | JOINs nativos | $lookup (limitado) o app-side |
| Transacciones | Maduras, complejas | Sí (4.0+), menos maduras |
| Escalabilidad vertical | Buena | Buena |
| Escalabilidad horizontal | Replicación reads | Sharding nativo |
| Consultas ad-hoc | SQL potente | Aggregation pipeline |
| Integridad referencial | FK constraints | Manual en aplicación |
| Laravel | Eloquent nativo | mongodb/laravel-mongodb |

## Casos reales

**SQL mejor para:**
- E-commerce (pedidos, pagos, inventario)
- Finanzas y contabilidad
- CRM con relaciones complejas
- Cualquier cosa con Laravel Eloquent estándar

**MongoDB mejor para:**
- Logs y eventos de analytics
- Catálogos con atributos variables (e-commerce con specs distintas por categoría)
- CMS con contenido anidado
- IoT / time-series con TTL indexes
- Prototipos donde el esquema cambia semanalmente

## Pregunta Senior en entrevista Laravel + React

> "Tenemos users, posts y comments. ¿MongoDB o PostgreSQL?"

**PostgreSQL** (o MySQL): relaciones claras, integridad, Eloquent, JOINs, transacciones. MongoDB solo si posts tienen estructura muy variable (bloques de contenido tipo Notion) o escala de escritura extrema.

## Stack híbrido común

- **PostgreSQL**: datos transaccionales (users, orders, payments)
- **MongoDB**: logs, analytics events, cache persistente
- **Redis**: cache, sessions, queues (Laravel Horizon)
