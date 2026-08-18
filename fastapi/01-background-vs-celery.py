"""
ENTREVISTA: BackgroundTasks (mismo proceso) vs Celery (cola).
"""

BACKGROUND = """
from fastapi import BackgroundTasks, FastAPI
app = FastAPI()

@app.post("/welcome")
def welcome(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email, email)  # after 200, same process
    return {"ok": True}
# API crash => task lost
"""

CELERY = """
@app.post("/invoice")
def invoice(order_id: int):
    send_invoice.delay(order_id)  # Redis/RabbitMQ -> worker
    return {"queued": True}
# worker crash => message still in broker (until ack)
"""

WHEN = {
    "BackgroundTasks": "log, email no critico, sin infra",
    "Celery": "pagos, facturas, retries, escala",
}

print("BackgroundTasks = same process | Celery = durable queue")
print(WHEN)
