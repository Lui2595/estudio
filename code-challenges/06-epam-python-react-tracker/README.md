# EPAM Python.Web + React — Timed Challenge (~90 min)

> Simulacro de entrevista técnica **Python web + React**.  
> Sin soluciones en este enunciado. Cronómetro. **Sin IA / sin Google** (como EPAM).

| | |
|--|--|
| **Duración** | 90 minutos |
| **Stack** | Python (**Flask** *or* **Django REST**) + **React** (Vite) + SQLite OK |
| **Idioma UI/código** | Inglés (nombres, commits mentales, README) |
| **Entrevista real** | Thu Jul 23 · Python.Web · EPAM platform |

---

## Goal (what “pass” looks like)

Build a tiny **Project Tracker**:

- Users register/login (JWT or session token).
- Authenticated users manage **projects** and **tasks** inside a project.
- React SPA: login + project list + project detail (tasks) + create task.
- Backend prevents N+1, validates input, uses a transaction where it matters.

You will **not** finish a production app. You **will** finish a demoable happy path.

---

## Domain

### User
| Field | Notes |
|-------|--------|
| id | PK |
| email | unique |
| password | hashed |
| name | string |
| created_at | datetime |

### Project
| Field | Notes |
|-------|--------|
| id | PK |
| name | 3–100 chars |
| description | optional |
| owner_id | FK → User |
| status | `active` \| `archived` |
| created_at | |

### Task
| Field | Notes |
|-------|--------|
| id | PK |
| project_id | FK → Project |
| title | 3–120 chars |
| status | `todo` \| `doing` \| `done` |
| assignee_email | optional string |
| created_at | |

**Relations:** User **1:N** Project · Project **1:N** Task

---

## Backend requirements (must)

### Auth
| Method | Path | Auth | Behavior |
|--------|------|------|----------|
| POST | `/api/auth/register` | No | Create user, 201, **never** return password |
| POST | `/api/auth/login` | No | Return access token (JWT fine) |
| GET | `/api/auth/me` | Yes | Current user |

### Projects
| Method | Path | Auth | Behavior |
|--------|------|------|----------|
| GET | `/api/projects` | Yes | List **own** projects. Each item includes `tasks_count`. **No N+1**. |
| POST | `/api/projects` | Yes | Create project for current user |
| GET | `/api/projects/<id>` | Yes | Detail + **tasks** nested. Owner only → else **404** (don’t leak) |
| PATCH | `/api/projects/<id>` | Yes | Update name/description/status. Owner only |

### Tasks
| Method | Path | Auth | Behavior |
|--------|------|------|----------|
| POST | `/api/projects/<id>/tasks` | Yes | Create task in project (owner only). Validate status enum |
| PATCH | `/api/tasks/<id>` | Yes | Update title/status. Must own parent project |
| POST | `/api/projects/<id>/archive` | Yes | Set project `archived` **and** mark all open tasks `done` in **one DB transaction** |

### Senior musts
1. Password hashing  
2. Auth middleware/dependency on protected routes → 401  
3. Validation → 400/422 with field errors  
4. `tasks_count` without N+1 (annotate / subquery / join)  
5. Archive endpoint uses **transaction**  
6. CORS enabled for Vite (`http://localhost:5173`)  
7. Short `README.md`: how to run + 3 curl examples  
8. **At least 2 tests** (login OK + create project unauthorized **or** archive transactional)

### Nice-to-have (only if time)
- Pagination on projects  
- Soft delete  
- OpenAPI / swagger  

---

## Frontend requirements (must) — React + Vite

### Pages / views
1. **`/login`** — email + password → store token → redirect to projects  
2. **`/projects`** — list name, status, `tasks_count`; button “New project”; logout  
3. **`/projects/:id`** — project detail, list tasks, form “Add task”, button “Archive project”  

### UI musts
- Loading / empty / error states  
- Disable submit while request in flight (no double post)  
- Token on `Authorization: Bearer …`  
- Controlled inputs  
- Basic CSS readable (no design perfection)  

### React senior habits
- Extract `api.js` / `api.ts` fetch helper  
- `useEffect` cleanup or ignore stale response if you fetch on id change  
- Don’t put server list in Context unless needed — local state is fine  

TypeScript preferred if comfortable; JS OK.

---

## Timebox (follow this)

```
0:00–0:10   Models + migrations/create_all + seed optional
0:10–0:35   Auth + projects CRUD + tasks create + archive transaction
0:35–0:55   React: login + projects list + detail/create task
0:55–1:20   Polish: N+1 check, archive button, errors, 2 tests
1:20–1:30   README + manual smoke test + stop
```

If behind at **0:40**: skip PATCH project; keep GET list + POST project + POST task + login UI.

---

## Acceptance checklist

### Backend
- [ ] Register + login + me  
- [ ] Cannot access another user’s project (404)  
- [ ] Projects list has `tasks_count` without N+1  
- [ ] Archive is transactional (project archived + tasks done)  
- [ ] 401 without token  
- [ ] ≥2 automated tests green  

### Frontend
- [ ] Login works  
- [ ] See projects + task counts  
- [ ] Open project, add task, see it in list  
- [ ] Archive updates UI (refetch or local update)  
- [ ] Loading + error visible  

---

## How to scaffold

### Backend (Flask example)

```bash
mkdir epam-project-tracker && cd epam-project-tracker
python -m venv .venv
# Windows:
.venv\Scripts\activate
pip install flask flask-sqlalchemy flask-cors PyJWT werkzeug pytest
# create app.py / run.py yourself
python run.py
# http://127.0.0.1:5000
```

### Backend (Django + DRF example)

```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
django-admin startproject config .
python manage.py startapp accounts
python manage.py startapp tracker
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
npm create vite@latest web -- --template react-ts
cd web
npm install
npm run dev
# http://localhost:5173
```

Set `VITE_API_URL=http://127.0.0.1:5000` (or 8000).

---

## Suggested JSON shapes

### Login response
```json
{ "access_token": "...", "token_type": "Bearer" }
```

### Project list item
```json
{
  "id": 1,
  "name": "EPAM Prep",
  "status": "active",
  "tasks_count": 3
}
```

### Project detail
```json
{
  "id": 1,
  "name": "EPAM Prep",
  "status": "active",
  "tasks": [
    { "id": 10, "title": "Review JWT", "status": "todo" }
  ]
}
```

---

## Oral prep (say these out loud while coding)

Practice English one-liners:

1. **N+1:** “I’ll annotate tasks_count or prefetch tasks so list is one or two queries, not one per row.”  
2. **JWT:** “Short-lived access token in Authorization header; password hashed with werkzeug/Django hasher.”  
3. **404 vs 403:** “I return 404 for other users’ resources so I don’t leak existence.”  
4. **Transaction:** “Archive updates project and tasks in one transaction so we don’t leave half state.”  
5. **React:** “Controlled form, disable submit while pending, show error from API body.”  

---

## After the timer (review)

1. Did you finish happy path?  
2. Where did you lose time?  
3. Rewrite only the weakest part tomorrow (30 min).  

Optional: compare later with ideas in:
- `../01-python-task-api/solution/`
- `../03-laravel-next-orders/solution/` (API shape)
- `../../entrevistas/04-python-backend.md`
- `../../entrevistas/epam/00-questions.md`

---

## Forbidden during practice

- Cursor / ChatGPT / Copilot  
- Copy-pasting a finished tutorial repo  

Docs of Flask/Django/React official sites only if you must — prefer memory for interview realism.
