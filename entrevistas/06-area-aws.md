# Area 6 — AWS (Senior Full Stack)

> Voice interview answers: 30–60 sec. Focus on **why** you chose a service, not just what it does.

## Abbreviations (with meanings)

- AWS (Amazon Web Services)
- S3 (Simple Storage Service)
- CDN (Content Delivery Network)
- RDS (Relational Database Service)
- ECS (Elastic Container Service)
- EC2 (Elastic Compute Cloud)
- ALB (Application Load Balancer)
- API (Application Programming Interface)
- SQS (Simple Queue Service)
- SNS (Simple Notification Service)
- IAM (Identity and Access Management)
- VPC (Virtual Private Cloud)
- DDoS (Distributed Denial of Service)
- TTL (Time To Live)
- OOM (Out Of Memory)
- RTO (Recovery Time Objective)
- RPO (Recovery Point Objective)

---

## P: Which AWS services have you used in production?

**R (template — customize):**
"I've worked with **S3** for static assets and file uploads, **CloudFront** as CDN, **RDS PostgreSQL** for relational data, **ElastiCache Redis** for sessions and caching, **ECS Fargate** or **EC2** for Node/Python APIs behind an **ALB**, **Secrets Manager** for credentials, and **CloudWatch** for logs and alarms. For serverless I've used **Lambda** plus **API Gateway** for event-driven workloads."

---

## P: S3 — common use cases and best practices?

**R:**
"Store static files — images, PDFs, React build artifacts. Use presigned URLs for secure direct upload/download without proxying through the API. Enable versioning for critical buckets, lifecycle rules to move old data to Glacier, block public access by default. Serve via CloudFront with cache headers — filename hashing for immutable assets."

---

## P: How do you deploy a React SPA + API on AWS?

**R:**
"React build to **S3** plus **CloudFront** — HTTPS, custom domain via Route 53. API on **ECS Fargate** or **Elastic Beanstalk** behind **ALB** with health checks on `/health`. RDS in private subnet, no public access. Environment variables from Secrets Manager. CI/CD: GitHub Actions or CodePipeline — build, test, deploy. CORS on API allows only CloudFront domain."

---

## P: RDS vs DynamoDB — when do you pick each?

**R:**
"**RDS** — PostgreSQL/MySQL when I need joins, transactions, complex queries, reporting. **DynamoDB** — predictable scale, key-value or simple access patterns, single-digit ms at any scale, pay per request. For a typical full stack CRUD app with relations I'd default RDS. DynamoDB when access pattern is clear and I need massive write throughput or serverless pairing with Lambda."

---

## P: What is ECS Fargate vs EC2 vs Lambda?

**R:**
"**Lambda** — event-driven, short-lived, pay per invocation, cold starts, 15 min max. Best for low-traffic APIs, webhooks, cron. **ECS Fargate** — containers without managing servers, long-running APIs, WebSockets, more control. **EC2** — full control, reserved instances for cost, you patch the OS. Senior choice: start Fargate for APIs; Lambda for async jobs; EC2 when you need specific instance types or cost optimization at scale."

---

## P: ECS image is huge — what do you do?

**R:**
"Correct first answer: ship a **smaller runtime-only image**. Why it hurts: slower ECR pulls, slower task start, larger attack surface. How: multi-stage build, `python:slim` (or distroless), `.dockerignore`, don't copy tests/.git/venv, cache pip layer, non-root USER. Don't put models/assets in the image — use S3."

Full cheat sheet: `django-react-fastapi-senior/08-docker-aws.md`

---

## P: API Gateway — what is it for?

**R:**
"Managed entry point for REST or HTTP APIs. Handles throttling, API keys, JWT authorizers, request validation, mapping to Lambda or ALB. Useful for serverless. Trade-off: added latency and cost vs ALB directly to containers — I'd use it when Lambda is the backend or I need built-in rate limiting at the edge."

---

## P: CloudFront — why use a CDN?

**R:**
"Caches static and dynamic content at edge locations — lower latency globally, reduces load on origin. Pair with S3 for SPA. Cache-Control headers control TTL. Invalidate on deploy or use versioned filenames. Also DDoS protection at edge with AWS Shield Standard."

---

## P: SQS vs SNS — difference?

**R:**
"**SNS** — pub/sub, fan-out, one message to many subscribers. **SQS** — queue, one consumer processes each message, decouples services. Pattern: SNS topic triggers multiple SQS queues. For background jobs I'd enqueue to SQS from API, worker on ECS/Lambda processes async — emails, reports, image resize."

---

## P: How do you manage secrets in AWS?

**R:**
"Never in code or plain env files in repo. **Secrets Manager** for DB passwords with rotation, or **SSM Parameter Store** for config. ECS task definition or Lambda reads at runtime via IAM role — no hardcoded keys. IAM role per service — least privilege."

---

## P: IAM — roles vs users?

**R:**
"**Users** — humans or long-lived CLI access. **Roles** — assumed by services — ECS task role, Lambda execution role. Apps use roles, not access keys on disk. Principle of least privilege — policy grants only s3:GetObject on specific bucket, not s3:*."

---

## P: VPC basics for a web app?

**R:**
"Public subnets — ALB, NAT gateway. Private subnets — app servers, RDS, no direct internet. Security groups — stateful firewall per resource. RDS only accepts connections from app security group. Outbound from private subnet via NAT for package updates."

---

## P: CloudWatch — observability on AWS?

**R:**
"Logs from ECS/Lambda to CloudWatch Logs. Metrics — CPU, memory, request count, custom business metrics. Alarms trigger SNS on high error rate or latency. Dashboards for on-call. For distributed tracing I'd add X-Ray or OpenTelemetry export."

---

## P: How do you handle file uploads at scale on AWS?

**R:**
"Client requests presigned S3 URL from API — uploads directly to S3, no bytes through API server. S3 event triggers Lambda for thumbnail or virus scan. Store metadata in RDS. Multipart upload for large files. CloudFront can serve public files."

---

## P: High availability and disaster recovery?

**R:**
"Multi-AZ RDS — automatic failover. ECS service across 2+ AZs behind ALB. S3 cross-region replication for critical data if RTO/RPO requires. Backups — RDS automated snapshots, tested restore procedure. Health checks remove unhealthy targets."

---

## P: Cost optimization (Senior angle)?

**R:**
"Right-size RDS, reserved instances for steady load. S3 lifecycle to cheaper tiers. CloudFront reduces origin egress. Lambda for spiky low traffic vs always-on EC2. Monitor with Cost Explorer and tags per environment. Delete unused EBS snapshots and old AMIs."

---

## Voice scenarios

**P: API on ECS is returning 502 from ALB.**

**R:**
"Check target group health — failing health checks? ECS tasks crashing — OOM, bad deploy? CloudWatch logs for stack traces. Security group — ALB can reach app port? Recent task definition change — wrong env var or image tag. Roll back deployment if needed."

---

**P: How would you migrate on-prem app to AWS?**

**R:**
"Assess dependencies — DB, files, cron. Lift-and-shift to EC2/ECS first or strangler — new features on AWS. RDS migration with DMS or dump/restore. DNS cutover Route 53 with low TTL. Parallel run, compare metrics, rollback plan."

---

## AWS Well-Architected (mention 1–2 pillars)

| Pillar | One-liner |
|--------|-----------|
| Operational Excellence | IaC, CI/CD, runbooks |
| Security | IAM least privilege, encryption at rest/transit |
| Reliability | Multi-AZ, backups, health checks |
| Performance | CDN, caching, right-sizing |
| Cost | Tags, reserved capacity, serverless where fit |

---

## Code example

→ `ejemplos/aws-s3-presigned-upload.js`

## Related repo material

→ `../express/` (API patterns that run on AWS)  
→ `05-area-system-design-db.md` (caching, scaling)
