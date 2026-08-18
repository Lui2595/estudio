# API patterns — Python Web (Flask / Django / FastAPI)

> Companion de `00-preguntas-respuestas.md` sección 04. Sin framework instalado aquí.

## Auth JWT (frase)

1. Register: hash password (werkzeug / Django / bcrypt).  
2. Login: verify → return access token.  
3. Protected routes: `Authorization: Bearer` → decode → user.  
4. Never return password hash.

## N+1 checklist

| ORM | Eager load FK | Eager load reverse/M2M | Count sin cargar rows |
|-----|---------------|------------------------|----------------------|
| Django | `select_related` | `prefetch_related` | `annotate(Count(...))` |
| SQLAlchemy | `joinedload` | `selectinload` | `func.count` + group |

## Challenge EPAM

Implementa el tracker timed:

`../code-challenges/06-epam-python-react-tracker/README.md`

Referencia Flask JWT:

`../code-challenges/01-python-task-api/solution/`
