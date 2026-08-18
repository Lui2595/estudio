# 08 — Docker en ECS + AWS simple (listado de servicios)

> **Tu respuesta fue correcta.** Imagen más chica, solo lo necesario para **correr** la app = respuesta senior. Abajo: cómo decirlo mejor + 2–3 follow-ups + mapa AWS mínimo.

Abreviaturas: **ECS** (Elastic Container Service), **EC2** (Elastic Compute Cloud), **RDS** (Relational Database Service), **ECR** (Elastic Container Registry), **ALB** (Application Load Balancer).

---

## 1) Te preguntan: la imagen que despliegas en ECS es MUY grande — ¿qué haces?

### Tu respuesta

> Usar una imagen reducida que solo tenga lo necesario para ejecutar la app.

**Correcto.** Eso es el núcleo. Un senior añade *cómo* y *por qué duele*.

### Responde (voz, EN) — versión completa

> A huge image slows ECR pulls and ECS task start, wastes disk, and widens the security surface. I’d ship a **runtime-only** image: multi-stage build — compile/deps in a builder stage, copy just the artifact into a slim base (`python:3.12-slim` or distroless), drop compilers, tests, and `.git`. `.dockerignore` so we don’t copy `node_modules`/venv into the context. Then check layers: one COPY of requirements, cache pip, don’t run as root.

### Justifica

```
MAL (1 GB+)
  FROM python:3.12          ← OS completo
  COPY . .                  ← tests, .git, venv
  RUN pip install -r reqs   ← gcc, headers quedan

BIEN (80–200 MB)
  # stage 1 builder: gcc, pip install
  # stage 2 runtime: slim + COPY --from=builder /app
  USER appuser
```

```dockerfile
# Multi-stage — solo runtime en la imagen final
FROM python:3.12-slim AS runtime
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./src/
USER nobody
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0"]
```

**Por qué ECS lo nota:** Fargate/EC2 **baja la imagen de ECR** en cada deploy / scale-out. 1.5 GB × 10 tasks = minutos extra + más fallos de timeout.

### Follow-ups (si profundizan)

| Preguntan | Di esto |
|-----------|---------|
| ¿Alpine? | Más chica, pero wheels de Python a veces fallan (musl). `slim` (Debian) suele ser el trade-off seguro. |
| ¿Distroless? | Casi sin shell — más seguro, más difícil de debuggear. |
| ¿Build en CI? | `docker build` en GitHub Actions → push **ECR** → ECS nueva task definition. |
| ¿Caché de layers? | COPY `requirements.txt` **antes** del código: si no cambian deps, no reinstala pip. |
| ¿Root? | No. `USER` no-root. Menos blast radius si hay RCE. |
| ¿Healthcheck? | ECS usa ALB `/health` — imagen chica no quita eso. |

**Otras palancas si sigue grande:** no meter modelos ML/assets en la imagen (S3); no copiar `frontend/node_modules`; comprimir menos útil que **menos archivos**.

---

## 2) Mapa AWS — lo mínimo para listar (con 1 frase)

Di el **nombre completo** la primera vez.

### Cómputo (dónde corre el código)

| Servicio | Significado | Una frase |
|----------|-------------|-----------|
| **EC2** Elastic Compute Cloud | VM (servidor virtual) | Tú parcheas el OS; máximo control. |
| **ECS** Elastic Container Service | Orquesta contenedores | Corre tus Docker images; **Fargate** = sin servidores, **EC2 launch type** = tú pones las VMs. |
| **EKS** Elastic Kubernetes Service | Kubernetes gestionado | Igual que ECS pero K8s; más complejo. |
| **Lambda** | Función serverless | Evento → corre → se apaga. Max ~15 min. Webhooks, cron, poco tráfico. |
| **Elastic Beanstalk** | PaaS | Sube zip; AWS arma load balancer + EC2. Menos control. |
| **Fargate** | Motor serverless de ECS/EKS | Pagas vCPU/RAM, no instancias. |

**Frase ECS vs EC2 vs Lambda** (ya senior):  
> Lambda for short events. ECS Fargate for a long-running API. EC2 when I need a specific instance or cheaper reserved capacity.

### Datos

| Servicio | Significado | Una frase |
|----------|-------------|-----------|
| **RDS** Relational Database Service | Postgres/MySQL gestionado | Backups, Multi-AZ, no SSH al disco. Privado en VPC. |
| **Aurora** | RDS “super” | Compatible Postgres/MySQL, réplicas rápidas. |
| **DynamoDB** | NoSQL key-value | Sin joins; escala masiva; Lambda-friendly. |
| **ElastiCache** | Redis/Memcached gestionado | Cache, sesiones, rate limit. |
| **S3** Simple Storage Service | Objetos (archivos) | Imágenes, backups, build del React. |
| **EFS** Elastic File System | Disco compartido NFS | Varios tasks leen los mismos files (raro en APIs). |

### Red / entrada

| Servicio | Significado | Una frase |
|----------|-------------|-----------|
| **VPC** Virtual Private Cloud | Tu red privada | Subnets públicas/privadas. RDS **sin** IP pública. |
| **ALB** Application Load Balancer | Balanceador HTTP | HTTPS, `/health`, path routing. |
| **NLB** Network Load Balancer | TCP/UDP | Baja latencia, no HTTP features. |
| **API Gateway** | Puerta HTTP → Lambda/ALB | Throttle, JWT authorizer, serverless APIs. |
| **CloudFront** | CDN | Cache en edge; SPA en S3. |
| **Route 53** | DNS | Dominio → CloudFront / ALB. |
| **NAT Gateway** | Salida a internet desde subnet privada | Tasks privadas bajan pip/APIs externas. |

### Mensajes / async

| Servicio | Significado | Una frase |
|----------|-------------|-----------|
| **SQS** Simple Queue Service | Cola | Un mensaje, un consumer. Jobs (como Celery broker). |
| **SNS** Simple Notification Service | Pub/sub | Un evento, muchos subscribers. |
| **EventBridge** | Bus de eventos | Cron, reglas, fan-out entre servicios. |
| **Step Functions** | Orquestación | Sagas (pago → email → factura). |

### Seguridad / config / observabilidad

| Servicio | Significado | Una frase |
|----------|-------------|-----------|
| **IAM** Identity and Access Management | Quién puede qué | Roles en ECS task, no access keys en el código. |
| **Secrets Manager** / **SSM Parameter Store** | Secretos | DB password, JWT secret. |
| **Cognito** | Auth usuarios | Login hosted; o solo JWT propio. |
| **WAF** Web Application Firewall | Filtro HTTP | Rate limit, OWASP rules delante del ALB. |
| **CloudWatch** | Logs + métricas + alarms | `/aws/ecs/...` CPU, 5xx. |
| **X-Ray** | Tracing | Sigue un request entre API y Dynamo. |
| **CloudTrail** | Auditoría API de AWS | Quién borró el RDS. |

### CI / registro de imágenes

| Servicio | Significado | Una frase |
|----------|-------------|-----------|
| **ECR** Elastic Container Registry | Docker registry | `docker push` → ECS `image: tag`. |
| **CodePipeline** / **CodeBuild** | CI/CD AWS | O GitHub Actions → ECR → ECS. |

---

## 3) Dibujo de un stack típico (memoriza este)

```
Browser
  → CloudFront + S3          (React)
  → ALB
      → ECS Fargate tasks    (Django/FastAPI)   ← imagen slim desde ECR
  → RDS Postgres             (subnet privada)
  → ElastiCache Redis        (cache / Celery broker)
  → SQS / Celery workers     (más tasks ECS)
  → S3                       (uploads)
IAM task role + Secrets Manager
CloudWatch logs/alarms
```

---

## 4) Mini-scripts voz

**Imagen ECS grande:**  
> Pull time and attack surface. Multi-stage, slim base, only runtime files, .dockerignore, non-root. That’s the main lever.

**Qué servicios usas:**  
> S3 + CloudFront for the SPA, ECS Fargate behind an ALB for the API, RDS Postgres private, Redis for cache, SQS or Celery workers, Secrets Manager, CloudWatch. Lambda for webhooks or cron.

**RDS vs Dynamo:**  
> RDS when I need relations and transactions. Dynamo when the access pattern is a known key and I want serverless scale.
