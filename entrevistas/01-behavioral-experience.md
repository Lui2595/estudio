# Area 1 — Behavioral & Experience

> **Very likely in the first 3 minutes.** Practice out loud in English.

## Abbreviations (with meanings)

- API (Application Programming Interface)
- AWS (Amazon Web Services)
- ECS (Elastic Container Service)
- RDS (Relational Database Service)
- S3 (Simple Storage Service)
- CDN (Content Delivery Network)
- UI (User Interface)
- P95 (95th Percentile Latency)
- STAR (Situation, Task, Action, Result)

---

## P: Tell me about yourself.

**R (60-sec template):**
"I'm a Senior Full Stack Engineer with [X] years building production web applications. On the frontend I work with React and TypeScript — hooks, server state with TanStack Query, and performance tuning. On the backend I've used [Node/Express | Python/FastAPI] with PostgreSQL, often deployed on AWS — ECS, RDS, S3, CloudFront. In my current role at [company], I [specific achievement — e.g. owned checkout flow, reduced p95 latency 40%, led API v2 migration]. I'm comfortable owning features end-to-end from schema to UI. I'm excited about this role because [specific reason]."

---

## P: Walk me through a recent full stack project.

**R:**
"I'll describe [project]. The business goal was [problem]. Frontend: React with [Query/Redux]. API: [Node/Python] on [ECS/Lambda] exposing REST. Database: [RDS PostgreSQL/MongoDB] because [reason]. AWS: [S3 for files, CloudFront CDN, etc.]. My responsibilities: [2–3]. One challenge: [e.g. duplicate payments on retry]. I fixed it with [idempotency keys + unique DB constraint]. Result: [metric]."

---

## P: What was the most challenging bug you fixed recently?

**R (STAR):**
- **S:** "Users saw intermittent 500s on checkout during peak traffic."
- **T:** "Find root cause without blocking releases."
- **A:** "Traced via CloudWatch and request IDs — race condition in async payment callback. Added idempotency keys and proper transaction boundaries."
- **R:** "Errors dropped to zero; documented pattern for the team."

---

## P: How do you handle conflicting requirements from product vs tech debt?

**R:**
"I align on business impact first. I explain trade-offs plainly — e.g. 'shipping now adds two days of debt; fixing auth properly saves a week later.' I propose phased delivery: MVP now, refactor next sprint with a ticket and estimate. I document decisions so we don't relitigate."

---

## P: Describe a time you disagreed with a technical decision.

**R:**
"A teammate wanted Redux for three shared state values. I suggested Context plus a custom hook first. We listed pros and cons — Redux scales for frequent updates but adds boilerplate. We chose Context with a migration path if profiling showed re-render issues. Avoided over-engineering."

---

## P: How do you work in a distributed / remote team?

**R:**
"I over-communicate in writing — clear PR descriptions, async Slack updates. Small PRs for reviewers in other time zones. Short calls for complex topics. Decisions documented in Confluence or README."

---

## P: Why are you interested in this role / company?

**R (customize):**
"I'm looking for a senior role owning full stack features on a modern stack — React plus [Node/Python] on AWS. [Company] works on [domain], which matches my experience in [your domain]. I value [remote-first / learning / scale] from your description."

---

## P: Strengths and weaknesses?

**Strengths:**
"I'm strong debugging across the stack — UI bug to API to slow query. I write maintainable code and test critical paths."

**Weakness (honest, safe):**
"Sometimes I optimize before validating with users. I've learned to ship MVP, measure, then optimize on real data."

---

## P: Where do you see yourself in 2–3 years?

**R:**
"Growing as a senior IC — deeper system design, mentoring, owning larger features. Not rushing into management unless it fits naturally."

---

## P: Do you have any questions for us?

**Smart questions (pick 2):**
- "What does a typical sprint look like for a full stack engineer?"
- "How is the architecture organized — monolith, microservices, modular monolith?"
- "What does success look like in the first 90 days?"
- "How do you handle code review and AWS/infrastructure ownership?"

---

## Useful phrases during the interview

| Situation | Phrase |
|-----------|--------|
| Need time | "That's a great question — let me think for a moment." |
| Didn't understand | "Could you clarify what you mean by [X]?" |
| Don't know | "I haven't used that in production, but my understanding is… I'd ramp up quickly given my experience with [similar]." |
| Structure answer | "I'll answer in three parts: first… second… finally…" |
