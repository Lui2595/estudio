# Challenge 01 — Solution (Flask)

## Run

```bash
cd solution
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py
pytest -q
```

## Soft delete

`DELETE /api/tasks/:id` sets `deleted_at` (soft delete).

## Curl smoke

```bash
curl -X POST http://127.0.0.1:5000/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"a@test.com\",\"password\":\"Secret123!\"}"
curl -X POST http://127.0.0.1:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"a@test.com\",\"password\":\"Secret123!\"}"
```

Admin list uses `joinedload(Task.owner)` to avoid N+1.
