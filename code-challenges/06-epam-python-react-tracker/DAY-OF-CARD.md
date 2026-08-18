# EPAM day-of — 90 min timeline (print / keep beside you)

## Before join (15 min)
- [ ] Chrome, 1 monitor, camera, mic, water
- [ ] Phone away, no AI tabs
- [ ] IDE ready: empty folder + venv mentally mapped
- [ ] Intro 60 sec rehearsed in English

## If live coding starts
```
0–2 min   Clarify requirements out loud
2–10      Models + DB
10–35     Auth + main endpoints
35–55     React happy path
55–75     Edge cases + transaction + N+1
75–85     Tests / README / demo
85–90     Stop, summarize what you’d add next
```

## Say when stuck
"I'll implement the happy path first, then harden validation and authorization."

## End summary template
"Done: auth, project/task CRUD, React login+list+detail.  
Trade-off: SQLite for speed; production would use Postgres + migrations.  
Next: pagination, refresh tokens, more tests."
