# 05 — Patrones y arquitectura (lo que separa Mid de Senior)

Di **trade-off**, no lista de nombres. Un patrón sin problema es over-engineering.

---

## 1) Te preguntan: ¿qué patrones usas en Django/FastAPI?

### Responde (voz, EN)

> I use a **service layer** so views don’t own business rules, sometimes a **repository** if I need to swap ORM/query details in tests, **strategy** when payment providers differ, **adapter** around third-party APIs, and **manual dependency injection** — pass collaborators into constructors rather than importing globals. I don’t force all of them on a 4-endpoint CRUD.

### Justifica — capas

```
HTTP (View / APIRouter)
   → Service          reglas, orquesta, transacción
      → Repository    queries (opcional; ORM directo está OK al inicio)
         → DB
   → Adapter          Stripe, email, CNN API
```

```python
class OrderService:
    def __init__(self, payments: PaymentGateway, repo: OrderRepo):
        self.payments = payments
        self.repo = repo

    def checkout(self, user_id: int, idempotency_key: str) -> Order:
        ...
```

| Patrón | Para qué | No lo uses si… |
|--------|----------|----------------|
| Service layer | Desacoplar HTTP de negocio | El view solo hace `Model.objects.create` |
| Repository | Ocultar queries complejas / test fake | Cada método es un wrapper de 1 línea al ORM |
| Strategy | Varias implementaciones (PayPal/Stripe) | Un solo proveedor |
| Adapter | API externa cambia, tu dominio no | Un `requests.get` aislado |
| Factory | Construir objetos complejos | `Model(…) ` basta |
| Observer/events | Desacoplar “tras crear orden, email” | Un solo listener en el mismo módulo |

---

## 2) Te preguntan: ¿por qué Service Layer?

> Views stay HTTP-thin: status codes, auth. Services are callable from Celery, admin commands, and tests **without** `APIClient`. That’s reuse + SRP (Single Responsibility Principle).

---

## 3) N+1 — recuérdalo en una frase

> One query for the list, then one query **per row** for a relation. Fix: `select_related` (JOIN / FK) or `prefetch_related` (M2M / reverse).

---

## 4) API lenta — checklist senior

1. Medir (APM, `django.db.connection.queries`, EXPLAIN).  
2. N+1 / `iterator` en exports.  
3. Índices en `WHERE` / `ORDER BY` / FK.  
4. Paginación.  
5. Cache **aside** (ver abajo).  
6. Async solo I/O-bound.

---

## 5) ¿Cuándo NO usar async?

> If the work is **CPU-bound** (heavy JSON parse of 50MB, image resize in-process), async won’t use extra cores — the GIL (Global Interpreter Lock) still serializes bytecode. Async helps **I/O-bound** waits: HTTP calls, DB, S3. CPU work → processes, Celery, or a specialized service.

---
### ¿Qué es el Global Interpreter Lock (GIL)?

> El GIL es un candado que pone CPython para que **solo un hilo de Python ejecute bytecode a la vez**, incluso en multicore. Así protege estructuras internas, pero limita el paralelismo puro en CPU — dos hilos no suman CPUs reales en procesamiento pesado. No afecta a procesos (multiprocessing) ni a tareas I/O-bound (pueden liberar el GIL esperando I/O).

**Resumido:** 
- Permite un solo hilo de ejecución de código Python nativo a la vez.
- Es relevante solo en CPython; PyPy/Jython/etc. pueden no tenerlo.
- No impacta a procesos separados ni a librerías nativas que sueltan el GIL (como NumPy en C).

**Cuándo importa:** Scripts CPU intensivos multihilo; para I/O-bound (red, disco), threads siguen sirviendo.



## 6) Flashcards de 1-2 frases explicadas y ejemplificadas (P1/P2)

A continuación, resumen de conceptos clave, cada uno con una explicación breve y ejemplo:

### Cache Aside
**Explicación:** El patrón "cache aside" consiste en que la app primero consulta el caché; si hay un "miss" (es decir, el dato **no se encuentra** en el caché), va a la base de datos, luego actualiza el caché con ese dato. Al actualizar el dato en la base, se invalida o borra la clave correspondiente en el caché para mantener consistencia.

> **"miss"** significa que la clave/dato solicitado *no* estaba en caché y la app debe buscarlo en el origen (DB).
**Ejemplo:** Django lee usuario 123 en Redis → si no está, consulta en Postgres y guarda el resultado en Redis. Si el usuario se actualiza, borra la clave en Redis.

### Rate limiting
**Explicación:** Limita la cantidad de requests que un cliente puede hacer en cierto periodo para evitar abusos y proteger el sistema.
**Ejemplo:** API Gateway permite máximo 100 requests por minuto por IP. Si se supera, los siguientes devuelven 429 Too Many Requests.

### Circuit breaker
**Explicación:** Si un servicio externo falla repetidamente, el "breaker" corta el tráfico temporalmente para evitar sobrecargas. Tras un tiempo, deja pasar algunos requests de prueba.
**Ejemplo:** Llamos a un API de pagos; tras 5 errores seguidos, devolvemos error sin intentar hasta que pase el tiempo de recuperación ("cooldown").

### CQRS (Command Query Responsibility Segregation)
**Explicación:** Separar los modelos y lógicas de escritura (“Command”) y lectura (“Query”). Útil cuando optimizamos lecturas o queremos escalar cada flujo diferente.
**Ejemplo:** Guardar ventas en una DB normalizada (Command), pero consultas agregadas se hacen desde una vista/materializada o Elasticsearch (Query).

### CAP (Consistency, Availability, Partition tolerance)
**Explicación:** Ante una partición de red, sistemas eligen entre consistencia (los datos siempre iguales) o disponibilidad (el sistema responde aunque los datos no estén sincronizados).
**Ejemplo:** Una base SQL prioriza consistencia (puede rechazar operaciones si no puede garantizar integridad); un cache multi-nodo (Redis Cluster) puede responder con datos atrasados para mantener disponibilidad.

### Optimistic vs pessimistic locking
**Explicación:** Bloqueo optimista (optimistic): solo fallan las escrituras si dos procesos intentan el mismo cambio y el "version" no coincide. Pessimista: bloquea el recurso hasta terminar.
**Ejemplo:** Optimista: fila en la base tiene campo "version=1"; UPDATE al mismo tiempo falla si otro modificó antes. Pessimista: `SELECT ... FOR UPDATE` bloquea la fila hasta terminar el commit.

### OAuth2 vs JWT
**Explicación:** OAuth2 es un protocolo de autorización que gestiona flujos y permisos. JWT es un formato de token portable que puede usarse dentro de OAuth2.
**Ejemplo:** Una API usa OAuth2 para autorizar acceso y entrega un access_token que es un JWT (JSON Web Token) con info del usuario y expiración.

### Event-driven
**Explicación:** Se basa en emitir eventos (como "OrderPaid") a los que otros servicios escuchan y reaccionan, desacoplando procesos.
**Ejemplo:** Cuando se paga una orden, se publica “OrderPaid”; un microservicio de email y otro de facturación lo procesan independientemente.

## 7) Preguntas extra que suenan SR (ensaya 20s, pero agrega explicación y ejemplo)

**P: ¿Cómo versionas una API?**  
R: Normalmente, la versión de una API se pone en la URL, por ejemplo `/v1/usuarios` o usando un header personalizado (`Accept: application/vnd.miapi.v2+json`). Es clave nunca romper contratos a clientes existentes: agrega nuevas rutas/campos, pero mantén los viejos al menos un tiempo. Ejemplo: lanzo `/v2/orders`, pero mantengo `/v1/orders` hasta una fecha deprecada anunciada.

**P: ¿12-factor config?**  
R: Significa que toda la configuración (DB_URL, claves API, etc) vive en variables de entorno, nunca en el código ni en el repo. Así puedes promover cambios y desplegar la app a staging/producción cambiando solo las variables. Los secretos (por ejemplo, claves de Stripe) deben ir en un vault o gestor externo. Ejemplo: en Docker, usas `-e STRIPE_KEY=valor`. Además, los procesos deben ser stateless: no guardan nada en disco local, solo en una base o cache externo.

**P: ¿Qué testea un senior?**  
R: Un senior prioriza cubrir la lógica de negocio (los services, no solo las views) usando una base de test (puede ser SQLite, o mocks). Además, escribe algunas pruebas “smoke” a la API: por ejemplo, que retorna 401 si no hay token, 201 si el POST crea, 422 si le mando datos inválidos. No gasta tiempo cubriendo cada view de forma exhaustiva si no agregan valor. Ejemplo: testeo que `OrderService.crear_orden()` no deja ordenar si no hay stock.

**P: Observabilidad**  
R: Un sistema observable genera logs estructurados (en JSON, con campo `request_id` para tracear una petición), métricas como latencia promedio o porcentaje de errores 5xx, y en procesos críticos (como pagos), un trace distribuido para ver cada paso. Ejemplo: cuando falla un pago, puedes buscar por el `request_id` en tus logs y ver la latencia, el response, y cómo fluyó por los servicios.
