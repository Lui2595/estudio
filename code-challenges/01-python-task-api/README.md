# Challenge 01 — Task API with Authentication

**Stack:** Python 3.11+ · **Flask** *or* **Django REST Framework** (elige uno)  
**DB:** SQLite OK for local · prefer PostgreSQL if you have it  
**Timebox:** 75 minutes  
**Level:** Senior  
**Interview fit:** EPAM Python web

---

## Problem

Build a small **Task Management API** for an internal team tool.

Users can register/login and manage their own tasks.  
Admins can list all users' tasks.

You must implement this as a real runnable project (not pseudocode).

---

## Domain

### User
| Field | Type | Notes |
|-------|------|-------|
| id | integer | PK (Primary Key) |
| email | string | unique, required |
| password | string | hashed (never plain text) |
| role | string | `user` or `admin` (default `user`) |
| created_at | datetime | |

### Task
| Field | Type | Notes |
|-------|------|-------|
| id | integer | PK |
| title | string | required, 3–120 chars |
| description | text | optional |
| status | string | `todo` \| `in_progress` \| `done` |
| priority | integer | 1 (low) – 5 (high) |
| owner_id | FK (Foreign Key) → User | required |
| due_date | date | optional |
| created_at | datetime | |
| updated_at | datetime | |

---

## Required endpoints

### Auth
| Method | Path | Auth | Behavior |
|--------|------|------|----------|
| POST | `/api/auth/register` | No | Create user. Return 201 + user (no password). |
| POST | `/api/auth/login` | No | Return JWT (JSON Web Token) access token. |
| GET | `/api/auth/me` | Yes | Current user profile. |

### Tasks
| Method | Path | Auth | Behavior |
|--------|------|------|----------|
| GET | `/api/tasks` | Yes | List **own** tasks. Admin sees all. Support filters: `?status=`, `?priority=`, `?q=` (search title). Pagination: `?page=&page_size=` (default 10, max 50). |
| POST | `/api/tasks` | Yes | Create task for current user. |
| GET | `/api/tasks/<id>` | Yes | Get one. Owner or admin only. Else 404 (not 403 — don't leak existence). |
| PATCH | `/api/tasks/<id>` | Yes | Partial update. Owner or admin. |
| DELETE | `/api/tasks/<id>` | Yes | Soft or hard delete (document which). Owner or admin. |

---

## Senior requirements (must)

1. **Password hashing** (bcrypt / argon2 / Django password hasher).
2. **JWT** auth (Bearer header). Short-lived access token is enough (e.g. 30–60 min).
3. **Validation** with clear 400 responses (field errors).
4. **Role-based access** (user vs admin).
5. **No N+1** when listing tasks with owner email for admin view (use `select_related` / join / explicit query).
6. At least **2 automated tests** (e.g. login success + create task unauthorized).
7. `README` in your project: how to run + example `curl` commands.

## Nice-to-have (if time)

- Refresh token
- Rate limit on `/login`
- OpenAPI / Swagger docs
- Soft delete with `deleted_at`

---

## Acceptance criteria

- [ ] Register + login works; protected routes reject missing/invalid token with 401
- [ ] User A cannot read/update User B's task (404)
- [ ] Admin can list all tasks including owner email without N+1
- [ ] Invalid payload returns 400 with useful error body
- [ ] Passwords never returned in JSON
- [ ] App boots with one command after install
- [ ] At least 2 tests pass

---

## How to set up & run

### Option A — Flask

```bash
mkdir task-api && cd task-api
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

pip install flask flask-sqlalchemy flask-jwt-extended marshmallow python-dotenv bcrypt pytest

# Create your app structure yourself, e.g.:
# app/
#   __init__.py
#   models.py
#   routes/
#   services/
#   auth.py
# run.py
# tests/

# Example run (you decide the entrypoint):
set FLASK_APP=run.py
flask run
# or: python run.py
```

### Option B — Django + DRF

```bash
python -m venv .venv
.venv\Scripts\activate
pip install django djangorestframework djangorestframework-simplejwt psycopg2-binary pytest pytest-django

django-admin startproject config .
python manage.py startapp accounts
python manage.py startapp tasks
python manage.py migrate
python manage.py runserver
```

### Seed helper

Use `starter/seed_data.json` as sample data shape (import it yourself).

### Suggested curl smoke test

```bash
curl -X POST http://127.0.0.1:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"a@test.com\",\"password\":\"Secret123!\"}"

curl -X POST http://127.0.0.1:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"a@test.com\",\"password\":\"Secret123!\"}"
```

---

## What interviewers look for

- Clean separation: routes ≠ business logic ≠ DB access
- Correct HTTP semantics
- Security basics (hashing, authz, no password leaks)
- Explicit handling of edge cases (empty list, invalid status, overdue optional)
- You can explain trade-offs: Flask vs Django for this API

## Forbidden during practice

- AI code generation
- Copy-pasting a finished tutorial repo wholesale

You may read official docs only.
