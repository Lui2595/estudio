# Challenge 02 — Solution

```bash
cd solution
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py          # API :5001
# other terminal:
python worker.py
pytest -q
```

Idempotency: unique `idempotency_key` + stored response. Same key+body → replay. Same key+diff body → 409.
Email: enqueue `email_jobs`; worker marks `sent` with `sent_emails` PK for idempotent side effects.
