# 08 — Docker / ECS + AWS (EN + ES + ejemplo)

> Formato igual que `07`: **Te preguntan** → **Responde EN** → **Responde ES** → **Ejemplo**.  
> **Tu respuesta de imagen chica fue correcta.** Aquí está la versión senior + mapa AWS.

Abreviaturas (diles una vez): **ECS** Elastic Container Service · **EC2** Elastic Compute Cloud · **RDS** Relational Database Service · **ECR** Elastic Container Registry · **ALB** Application Load Balancer · **VPC** Virtual Private Cloud · **IAM** Identity and Access Management · **S3** Simple Storage Service · **SQS** Simple Queue Service · **SNS** Simple Notification Service.

---

## A) Docker en ECS (la que te hicieron)

### Te preguntan: la imagen que se despliega en ECS es muy grande — ¿qué haces?

**Tu respuesta en la entrevista:** usar una imagen reducida que solo tenga lo necesario para ejecutar la app.

**Responde (EN):** That’s the right call. A huge image slows **ECR pulls** and ECS task start, wastes disk, and widens the attack surface. I ship a **runtime-only** image: multi-stage build, slim base (`python:3.12-slim`), `.dockerignore` (no `.git`, tests, venv), copy `requirements.txt` before source so pip caches, and run as **non-root**. Assets/ML models go to **S3**, not inside the image.

**Responde (ES):** Correcto. Imagen enorme = pull lento en cada scale-out, más superficie de ataque. Dejo **solo runtime**: multi-stage, base slim, `.dockerignore`, layers de deps cacheadas, usuario no-root. Archivos pesados en S3.

**Ejemplo — por qué duele:**

```
ECR image 1.5 GB × 10 tasks Fargate en un deploy
  = 15 GB de red + minutos de arranque + timeouts
```

**Ejemplo — mal vs bien:**

```
MAL (1 GB+)
  FROM python:3.12
  COPY . .                 ← tests, .git, node_modules
  RUN pip install -r reqs  ← gcc se queda en la imagen

BIEN (80–200 MB)
  stage builder: instala deps
  stage runtime: slim + COPY --from=builder + USER nobody
```

```dockerfile
# Stage 1: build (puede tener gcc)
FROM python:3.12-slim AS builder
WORKDIR /w
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Stage 2: solo lo que corre
FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /install /usr/local
COPY src/ ./src/
USER nobody
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```dockerignore
.git
tests
*.md
.venv
node_modules
__pycache__
```

---

### Te preguntan: ¿Alpine o slim? / Alpine vs slim

**Responde (EN):** Alpine is smaller (musl libc) but Python wheels often **fail to compile**. Debian **slim** is the safe default for Django/FastAPI. I only use Alpine if I’ve proven the deps install.

**Responde (ES):** Alpine es más chica pero Python se pelea con musl. `slim` (Debian) es el trade-off habitual.

**Ejemplo:** `pip install psycopg2-binary` en Alpine a veces explota → `python:3.12-slim`.

---

### Te preguntan: ¿Distroless?

**Responde (EN):** Distroless has almost **no shell** — smaller and safer (harder to RCE into a bash). Trade-off: debugging in the container is painful. Production hardening yes; local debug no.

**Responde (ES):** Casi sin shell = más seguro, más difícil de debuggear. Prod sí, laptop no.

**Ejemplo:** `gcr.io/distroless/python3` — no puedes `docker exec … bash`.

---

### Te preguntan: ¿Cómo cacheas layers? / Docker layer cache

**Responde (EN):** Order Dockerfile so **rarely changing** files come first. `COPY requirements.txt` then `RUN pip` then `COPY src`. If only Python code changes, pip layer is reused in CI.

**Responde (ES):** Primero deps, después código. Si no cambió `requirements.txt`, CI no reinstala pip.

**Ejemplo:**

```dockerfile
COPY requirements.txt .          # cambia poco
RUN pip install -r requirements.txt
COPY src/ ./src/                 # cambia siempre
```

---

### Te preguntan: ¿Por qué no root en el contenedor?

**Responde (EN):** If there’s RCE (Remote Code Execution), root in the container is one step from host/volume damage. `USER nobody` (or a dedicated uid) reduces blast radius. ECS task **IAM role** still does AWS calls — that’s separate.

**Responde (ES):** No-root = si entran, no son dueños del filesystem. El acceso a AWS sigue siendo el **task role**, no el USER de Linux.

**Ejemplo:** `USER nobody` al final del Dockerfile.

---

### Te preguntan: ¿Dónde se buildea? CI → ECR → ECS

**Responde (EN):** GitHub Actions / CodeBuild: `docker build` → `docker push` to **ECR** → ECS new **task definition** + service rolling update. Don’t build on the laptop for prod.

**Responde (ES):** CI construye, sube a ECR, ECS saca la tag nueva. Prod no se buildea en tu PC.

**Ejemplo:**

```
git push
  → Actions: test + docker build + push ECR:gitsha
  → ECS update-service  (rolling: new tasks, drain old)
```

---

### Te preguntan: health check vs imagen chica

**Responde (EN):** A slim image does **not** replace health checks. ALB/ECS still hit `GET /health`. If the process is up but DB is down, the check should fail so ECS replaces the task.

**Responde (ES):** Imagen chica no quita `/health`. ECS/ALB necesitan saber si el proceso está vivo.

**Ejemplo:** `GET /health` → 200 si el proceso responde (a veces también “puedo hacer SELECT 1”).

---

### Te preguntan: la imagen sigue grande — ¿qué más?

**Responde (EN):** Don’t bake frontend `node_modules` or ML weights into the API image. Put static/SPA on **S3+CloudFront**. Don’t `COPY .` the whole monorepo.

**Responde (ES):** No metas el front ni modelos en la imagen del API. S3 para binarios pesados.

**Ejemplo:** SPA `npm run build` → S3. API image = solo Python + código backend.

---

## B) Cómputo AWS — te preguntan “¿ECS, EC2 o Lambda?”

### Te preguntan: ECS vs EC2 vs Lambda

**Responde (EN):** **Lambda** — short events (webhook, cron), pay per invoke, 15 min max, cold starts. **ECS Fargate** — long-running API/workers in Docker, no OS patching. **EC2** — you patch the VM; reserved instances for cost; special GPUs. Default for Django/FastAPI API: **ECS Fargate**.

**Responde (ES):** Lambda = evento corto. ECS Fargate = API en contenedor sin servidores. EC2 = tú administras la máquina.

**Ejemplo:**

```
POST /stripe/webhook     → Lambda (segundos)
API /orders 24/7         → ECS Fargate + ALB
Celery worker            → más tasks ECS (misma imagen o otra)
Entrenar modelo GPU      → EC2 / SageMaker
```

---

### Te preguntan: ¿Fargate vs ECS sobre EC2?

**Responde (EN):** **Fargate**: you pick vCPU/RAM, AWS runs the host. **EC2 launch type**: you manage a cluster of VMs (cheaper at huge scale, more ops). Start Fargate unless cost forces EC2.

**Responde (ES):** Fargate = no hay instancias que parchear. EC2 launch = más control y más trabajo.

---

### Te preguntan: ¿EKS? / Elastic Kubernetes Service

**Responde (EN):** Managed Kubernetes. Same containers, more portable/complex (ingress, helm). I don’t pick EKS for a 3-service shop if ECS Fargate is enough.

**Responde (ES):** Kubernetes gestionado. Más poder, más complejidad. ECS basta en muchos equipos.

---

### Te preguntan: Elastic Beanstalk

**Responde (EN):** PaaS: upload a zip, AWS builds ALB+EC2. Fast to start, less control than ECS. Fine for prototypes; production APIs I prefer ECS.

**Responde (ES):** Subes zip y AWS arma la infra. Menos control que ECS.

---

## C) Datos

### Te preguntan: RDS vs DynamoDB

**Responde (EN):** **RDS** (Postgres/MySQL) when I need joins, transactions (ACID), reporting — typical Django. **DynamoDB** when access is a known key, massive scale, Lambda-friendly, no joins. Default CRUD with relations → RDS.

**Responde (ES):** RDS = relacional, joins, `atomic()`. Dynamo = clave conocida, escala loca, sin joins.

**Ejemplo:**

```
User → Orders → Items     → RDS Postgres
session:{userId} → json   → Dynamo o Redis
```

---

### Te preguntan: ¿RDS en subnet pública?

**Responde (EN):** No. RDS in a **private subnet**, no public IP. ECS tasks reach it via VPC. Bastion/SSM if humans need SQL.

**Responde (ES):** RDS privado. Nunca 0.0.0.0/0 al puerto 5432.

---

### Te preguntan: ElastiCache (Redis)

**Responde (EN):** Managed Redis: cache-aside, sessions, rate limit, Celery broker. Not the source of truth for money.

**Responde (ES):** Redis gestionado para cache/sesiones/colas. Saldos → RDS.

---

### Te preguntan: S3 vs EFS

**Responde (EN):** **S3** = objects (images, backups, React build). **EFS** = shared NFS disk if several tasks must see the same files (rare for APIs).

**Responde (ES):** S3 archivos. EFS disco compartido (poco habitual en APIs).

---

### Te preguntan: Aurora

**Responde (EN):** RDS “super”: Postgres/MySQL compatible, fast replicas, often better failover. Costs more. I’d name it if they already use it.

**Responde (ES):** RDS de alto rendimiento. Compatible Postgres/MySQL.

---

## D) Red y entrada

### Te preguntan: VPC

**Responde (EN):** Your private network. Public subnets (ALB), private subnets (ECS, RDS). NAT Gateway so private tasks can call the internet (Stripe) without being inbound-public.

**Responde (ES):** Red privada. ALB afuera, API+RDS adentro. NAT para que el API salga a internet.

**Ejemplo:**

```
Internet → ALB (public)
         → ECS tasks (private)
         → RDS (private, security group solo desde ECS)
```

---

### Te preguntan: ALB vs NLB vs API Gateway

**Responde (EN):** **ALB** — HTTP/HTTPS, host/path routing, `/health` — typical ECS API. **NLB** — TCP, ultra-low latency. **API Gateway** — throttle, JWT authorizer, maps to **Lambda** (or ALB). Serverless APIs → Gateway; container APIs → ALB.

**Responde (ES):** ALB = HTTP a contenedores. NLB = TCP. API Gateway = puerta a Lambda.

---

### Te preguntan: CloudFront + Route 53

**Responde (EN):** **CloudFront** is the CDN (Content Delivery Network): cache SPA/static at the edge. **Route 53** is DNS: `app.com` → CloudFront or ALB.

**Responde (ES):** CloudFront cachea cerca del usuario. Route 53 es el DNS.

**Ejemplo:** `app.com` → CloudFront → S3 (React). `api.app.com` → ALB → ECS.

---

## E) Colas y eventos

### Te preguntan: SQS vs SNS

**Responde (EN):** **SQS** = queue, one message one consumer (jobs, Celery-like). **SNS** = pub/sub, one event many subscribers. Pattern: SNS fans out to several SQS queues.

**Responde (ES):** SQS = cola de trabajo. SNS = un evento a muchos.

**Ejemplo:**

```
OrderPaid → SNS
  → SQS email-worker
  → SQS invoice-worker
  → SQS analytics
```

---

### Te preguntan: EventBridge / Step Functions

**Responde (EN):** **EventBridge** = event bus + cron rules. **Step Functions** = orchestrate a saga (charge → email → invoice) with retries/compensation.

**Responde (ES):** EventBridge = bus/cron. Step Functions = orquestar pasos largos.

---

## F) Seguridad y observabilidad

### Te preguntan: IAM — ¿access keys en el código?

**Responde (EN):** Never. ECS **task role** (IAM) lets the container call S3/SQS. Rotate with AWS, not `.env` in Git.

**Responde (ES):** Rol de la task, no `AWS_SECRET` en el repo.

**Ejemplo:** Task role policy: `s3:PutObject` solo al bucket de uploads.

---

### Te preguntan: Secrets Manager vs Parameter Store

**Responde (EN):** Both store config. **Secrets Manager** = passwords, auto-rotation, audited. **SSM Parameter Store** = cheaper flags/config. DB password → Secrets Manager. ECS injects as env at start.

**Responde (ES):** Secretos de verdad (DB, JWT) en Secrets Manager. Flags baratos en SSM.

---

### Te preguntan: CloudWatch vs X-Ray vs CloudTrail

**Responde (EN):** **CloudWatch** = logs, metrics, alarms (CPU, 5xx). **X-Ray** = traces across API → Dynamo. **CloudTrail** = who called AWS APIs (“who deleted the RDS?”).

**Responde (ES):** CloudWatch = logs/métricas. X-Ray = traza del request. CloudTrail = auditoría de AWS.

---

### Te preguntan: WAF / Cognito

**Responde (EN):** **WAF** (Web Application Firewall) in front of ALB/CloudFront: rate limit, OWASP rules. **Cognito** = hosted user auth if you don’t want to own passwords.

**Responde (ES):** WAF filtra HTTP. Cognito = login de usuarios gestionado.

---

## G) Stack típico (dibújalo)

**Responde (EN/ES — memoriza el dibujo):**

```
Browser
  → CloudFront + S3              React SPA
  → ALB
      → ECS Fargate              Django/FastAPI  (imagen slim ← ECR)
  → RDS Postgres                 subnet privada
  → ElastiCache Redis            cache / broker Celery
  → SQS o workers ECS            jobs
  → S3                           uploads
IAM task role + Secrets Manager
CloudWatch logs / alarms
```

**Script de 20 s (EN):**  
> SPA on S3 and CloudFront. API on ECS Fargate behind an ALB. Postgres on RDS in a private subnet. Redis for cache. SQS or Celery workers. Secrets Manager, CloudWatch. Lambda for webhooks.

**Script de 20 s (ES):**  
> Front en S3+CloudFront. API en ECS Fargate detrás de un ALB. RDS privado. Redis de cache. Colas SQS o Celery. Secretos y logs en AWS. Lambda para webhooks.

---

## Mini-scripts

| Tema | EN | ES |
|------|----|----|
| Imagen grande | Pull time and attack surface. Multi-stage, slim, runtime-only, non-root. | Pull lento y más ataque. Multi-stage, slim, solo runtime, no root. |
| ECS vs Lambda | Lambda events. ECS long-running API. | Lambda eventos. ECS API 24/7. |
| RDS vs Dynamo | RDS for relations and transactions. Dynamo for a known key at huge scale. | RDS joins y atomic. Dynamo clave y escala. |
