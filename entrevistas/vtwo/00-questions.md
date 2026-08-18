# vtwo — Voice Interview Senior Full Stack (~15 min)

> Format: **5–7 areas**, **English**, **voice**. No on-screen coding.

## Abbreviations (with meanings)

- AWS (Amazon Web Services)
- SQL (Structured Query Language)
- RDS (Relational Database Service)
- ECS (Elastic Container Service)
- S3 (Simple Storage Service)
- API (Application Programming Interface)
- JWT (JSON Web Token)
- APM (Application Performance Monitoring)
- DB (Database)

---

## What they evaluate

| # | Area | What they look for |
|---|------|-------------------|
| 1 | Background | Years, stack, recent project, ownership |
| 2 | Frontend | React, state, performance, hooks |
| 3 | Backend | Node or Python, APIs, auth |
| 4 | Database | SQL, relations, indexes, N+1 |
| 5 | AWS + architecture | S3, RDS, ECS, idempotency, trade-offs |
| 6 | Communication | Clear English, structured Senior answers |

---

## Likely questions (typical order)

### Block 1 — Warm-up

**P: Tell me about yourself and your experience as a Full Stack Engineer.**

**P: What technologies are you most comfortable with?**

**P: Describe the architecture of your current or last project.**

*Include: React, API, RDS, S3, CloudFront if true for you.*

---

### Block 2 — React

**P: Explain the React component lifecycle with hooks.**

**R:** "Mount: useEffect `[]`. Update: state/props change. Unmount: effect cleanup."

**P: How do you prevent unnecessary re-renders?**

**R:** "React.memo, useMemo/useCallback, split context, React Query for server cache, state colocation."

**P: How do you fetch data in React today?**

**R:** "TanStack Query — cache, loading, error, invalidation. useEffect+fetch only for trivial cases."

---

### Block 3 — Backend

**Node:**
- How does Express middleware work?
- How do you handle errors in async route handlers?
- Explain JWT authentication flow.

**Python:**
- FastAPI vs Django REST?
- How do you avoid N+1 in the ORM?
- Background tasks with Celery?

---

### Block 4 — Database, AWS, architecture

**P: Explain 1:N and N:M relationships.**

**R:** "1:N FK on many side. N:M junction table with composite key. Index FKs. ON DELETE per business rules."

**P: What is idempotency and why does it matter?**

**R:** "Same request twice, same effect. Idempotency-Key on POST, store response, return cache on duplicate. Critical for payments and webhooks."

**P: How would you deploy a React app and API on AWS?**

**R:** "S3+CloudFront SPA. ECS Fargate or Lambda API behind ALB. RDS private subnet. Secrets Manager. CloudWatch logs/alarms."

**P: A production endpoint became slow — debugging process?**

**R:** "Reproduce with request ID. APM — DB vs app time. EXPLAIN query, N+1, indexes. CloudWatch. Rollback if bad deploy."

---

### Block 5 — Senior / closing

**P: Tell me about a time you improved system performance.**

**P: How do you approach code reviews?**

**R:** "Correctness, tests, security, readability. Questions not orders. Block on bugs or missing tests on critical paths."

**P: What questions do you have for us?**

---

## Express study plan (1 day before)

| Time | Activity |
|------|----------|
| 30 min | `01-behavioral-experience.md` — intro x5 out loud |
| 30 min | `02-react-frontend.md` — top 10 |
| 30 min | `03` or `04` backend |
| 30 min | `05-system-design-db.md` + `06-aws.md` |
| 30 min | `07-architecture-senior.md` — idempotency + relations |
| 30 min | Recorded 15-min mock |

---

## vtwo-specific tips

1. **Senior = decisions** — why you chose the tool, not just the name  
2. **Full stack end-to-end** — DB + API + UI + AWS in one example  
3. **Test microphone** before Start  
4. **Don't cut answers short** — follow-ups mean they want more depth  

---

## Senior vs Junior answers

| Topic | Junior | Senior |
|-------|--------|--------|
| React state | "useState" | "Local vs server state; Query for API" |
| Auth | "JWT" | "Short access + refresh rotation, httpOnly, idempotency on sensitive POST" |
| Slow DB | "Add index" | "EXPLAIN first, N+1, pagination, cache with invalidation" |
| AWS | "I used S3" | "Presigned uploads, CloudFront cache, RDS Multi-AZ, least-privilege IAM" |
| Relations | "Foreign key" | "1:N vs N:M, ON DELETE policy, soft delete, tenant_id every query" |
