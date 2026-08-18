# EPAM — Voice Interview (learn.epam.com)

> Initial **AI voice screening** ~15–20 min. English. Human recruiter reviews afterward.

## Abbreviations (with meanings)

- AI (Artificial Intelligence)
- CV (Curriculum Vitae)
- AWS (Amazon Web Services)
- API (Application Programming Interface)
- REST (Representational State Transfer)
- JWT (JSON Web Token)
- SQL (Structured Query Language)
- N+1 (One Query for List + N Queries for Relations)
- S3 (Simple Storage Service)

---

## What's different at EPAM

EPAM is a global consultancy — they also evaluate:

- **English** communication (clear, not perfect)
- **Motivation** and career plan
- **Remote / client** teamwork
- **Basic technical** aligned to your CV (React + Node/Python + AWS)

This voice screen is **not** the 60–90 min live coding round. It filters before assessments and deeper technicals.

---

## Frequent EPAM voice questions

### Motivation and background

**P: Why do you want to join EPAM?**

**R:**
"EPAM delivers complex systems for enterprise clients — that matches my full stack experience at scale. I value continuous learning and international teams. My stack — React, [Node/Python], AWS — aligns with many EPAM engagements."

---

**P: Why are you looking for a new opportunity?**

**R (positive):**
"I'm seeking new technical challenges and exposure to diverse projects. I want to grow in system design and work with strong engineers. This role offers that."

---

**P: Tell me about your experience with React, [Node/Python], and AWS.**

**R:** Use template from `01-behavioral-experience.md` with concrete examples.

---

**P: How do you stay updated with technology?**

**R:**
"Official docs and release notes. Small experiments. Code reviews and architecture discussions. Courses when we adopt new tools at work — e.g. when we moved uploads to S3 presigned URLs."

---

### Technical (screening level)

**P: var vs let vs const?**

**R:** "Block-scoped let/const. const no reassignment — object properties can change. Avoid var — hoisting issues."

---

**P: What is a closure?**

**R:** "Function remembering outer scope after it finished. Private state, factories. Loop+setTimeout classic bug — use let."

---

**P: async/await vs Promises?**

**R:** "Syntactic sugar — cleaner sequential async. await pauses until settle. try/catch for errors. Parallel still needs Promise.all."

---

**P: What is REST?**

**R:** "Resources as URLs, HTTP verbs, stateless, status codes, JSON. Constraints for scalable APIs."

---

**P: What is idempotency?**

**R:** "Same operation repeated has same effect. Important for payments and retries. Idempotency-Key header on POST, store and replay response."

---

**P: SQL JOIN types?**

**R:** "INNER — matching rows both sides. LEFT — all left plus matches, null if none. For optional relations."

---

**P: 1:N vs N:M relationship?**

**R:** "1:N — orders have one customer, FK customer_id. N:M — students and courses via enrollments junction table."

---

**P: AWS S3 — what do you use it for?**

**R:** "Static assets, user uploads via presigned URLs, React build hosting with CloudFront. Lifecycle rules, block public access by default."

---

**P: Errors in a React application?**

**R:** "Error boundaries for render errors. React Query for API errors. Sentry logging. User-friendly messages. Retry with backoff."

---

### Behavioral (consulting-style)

**P: Unclear requirements from client or PM?**

**R:**
"Clarifying questions and short spec before coding. List assumptions, validate early. Prefer one hour aligning over a week rebuilding."

---

**P: Working under pressure / tight deadline?**

**R (STAR):** Critical delivery → prioritized MVP → communicated risks → delivered with documented tech debt.

---

**P: International teams?**

**R:**
"English standups, async docs, PRs with context for other time zones. Clear writing over extra meetings."

---

## EPAM official tips (adapted)

1. **Complete answers** — they can't evaluate what you don't say  
2. **Clear structure** — conclusion first, then detail  
3. **Simple English** — avoid rare words that confuse speech recognition  
4. **Ask to repeat** — "Could you repeat the question?"  
5. **You can ask questions** — human follows up if AI can't answer  
6. **Be authentic** — deepen real experience, don't invent  

---

## After voice screening (future prep)

| Phase | What to expect |
|-------|----------------|
| Online test | MCQ OOP, DB, OS + 2–3 coding (Codility-style) |
| Technical live | DSA + core language 60–90 min |
| System design | Microservices, caching, AWS, DB (Senior) |
| Behavioral | STAR, client scenarios, conflict |

Study: `05-system-design-db.md`, `06-aws.md`, `07-architecture-senior.md`

---

## EPAM mock (12 questions, 15 min)

1. Tell me about yourself  
2. Why EPAM?  
3. React project you built  
4. Node/Python API you built  
5. AWS services you used  
6. What is idempotency?  
7. Explain 1:N database relationship  
8. var vs let vs const  
9. JWT how it works  
10. Unclear requirements — what do you do?  
11. Strengths and weaknesses  
12. Questions for us?

Record — each answer > 20 seconds?
