# Voice Interview Guide — Senior Full Stack (~15 min)

> For **vtwo** and **EPAM (learn.epam.com)**. Stack: **React** + **Node** or **Python** + **AWS**. Language: **English**.

## Abbreviations (with meanings)

- API (Application Programming Interface)
- AI (Artificial Intelligence)
- AWS (Amazon Web Services)
- SQL (Structured Query Language)
- JWT (JSON Web Token)
- SSR (Server-Side Rendering)
- CSR (Client-Side Rendering)
- SSG (Static Site Generation)
- ISR (Incremental Static Regeneration)
- RSC (React Server Components)

---

## How this format works

| Aspect | What to expect |
|--------|----------------|
| Duration | ~15–20 min (depends on your answers) |
| Format | Live voice with AI or automated assistant |
| Language | English |
| Areas | ~5–7 topic blocks evaluated |
| Code | **No** live coding — you answer **out loud** |
| Review | A human recruiter reviews the recording afterward |

### Typical areas (15 min, Senior)

```
1. Intro + experience           (~3 min)  → Who you are, stack, recent project
2. Frontend (React)             (~3 min)  → Hooks, state, performance
3. Backend (Node or Python)     (~3 min)  → APIs, auth, architecture
4. Database + AWS + scenarios   (~3 min)  → SQL, indexes, S3, debugging
5. Senior architecture          (~2 min)  → Idempotency, relations, trade-offs
6. Closing / soft skills        (~2 min)  → Teamwork, code review, your questions
```

The AI may ask **follow-ups** if your answer is too short.

---

## Study plan

### Interview in less than 24 hours

1. `01-behavioral-experience.md` — practice 60-sec intro **out loud**
2. `02-react-frontend.md` — top 15 questions
3. Pick **one** backend: `03-node-backend.md` **or** `04-python-backend.md`
4. `05-system-design-db.md` + `06-aws.md` + `07-architecture-senior.md`
5. Company-specific: `vtwo/` or `epam/`

### 3–5 days preparation

| Day | Focus |
|-----|-------|
| 1 | Behavioral + STAR + English intro |
| 2 | React → `02-react-frontend.md` + `../react/` |
| 3 | Node or Python backend |
| 4 | DB + AWS + architecture (`05`, `06`, `07`) |
| 5 | 15-min voice mock recording |

---

## Golden rules to pass

### 1. Complete answers (not one-liners)

❌ "I used React and Node."

✅ "In my last project I built a React dashboard with TypeScript. The backend was Express on ECS with RDS PostgreSQL. I owned auth — JWT with refresh rotation — and cut API latency 40% after fixing N+1 queries and adding Redis cache."

### 2. 30–60 second structure

```
[Direct answer] → [Why / how it works] → [Real example from your experience]
```

### 3. Clear English beats perfect English

- Speak slowly, short sentences
- Don't understand? *"Could you repeat the question, please?"*
- Need time? *"Let me think for a second."*

### 4. Trade-offs = Senior level

Don't just say "use Redis." Say: *"I'd use Redis for session cache because reads are frequent, but PostgreSQL remains the source of truth for durability and complex queries."*

### 5. Memorize your intro

> "I'm a Senior Full Stack Engineer with X years of experience. I work mainly with React and TypeScript on the frontend and [Node/Python] on the backend, deployed on AWS. In my current role at [company], I [one concrete achievement]. I'm looking for [honest reason]."

---

## vtwo vs EPAM

| | vtwo | EPAM (learn.epam.com) |
|---|------|----------------------|
| Type | Initial voice screening | AI screening + longer process after |
| Focus | Senior Full Stack general | Background + motivation + basic technical |
| After | Likely live technical round | Online assessment + live coding + behavioral |
| Tip | Show ownership and technical decisions | Mention clients, English, distributed teams |

---

## 15-min mock interview (solo)

1. Set timer 15 min, record on phone
2. Answer without reading:
   - Tell me about yourself
   - Describe a recent full stack project on AWS
   - useEffect vs useMemo — when do you use each?
   - How does JWT authentication work?
   - What is idempotency and how do you implement it?
   - Explain 1:N vs N:M database relationships
   - A query is slow — how do you debug it?
   - Tell me about a technical disagreement
   - Do you have any questions for us?
3. Replay: did each answer last more than 20 seconds?

---

## Files in this folder

| File | Content |
|------|---------|
| `01-behavioral-experience.md` | Intro, STAR, soft skills |
| `02-react-frontend.md` | React voice Q&A |
| `03-node-backend.md` | Node/Express |
| `04-python-backend.md` | Python/FastAPI/Django |
| `05-system-design-db.md` | Scenarios + SQL/NoSQL |
| `06-aws.md` | AWS services, deployment, scenarios |
| `07-architecture-senior.md` | Idempotency, relations, distributed patterns |
| `vtwo/00-questions.md` | Likely vtwo questions |
| `epam/00-questions.md` | Likely EPAM questions |
| `ejemplos/` | Code reference with VOICE INTERVIEW comments |

## Related material in repo

- React: `../react/00-preguntas-respuestas.md`
- Express/Node: `../express/00-preguntas-respuestas.md`
- JavaScript async: `../javascript/08-asincronia/00-preguntas-respuestas.md`
- MySQL/Postgres: `../mysql/`, `../postgres/`
