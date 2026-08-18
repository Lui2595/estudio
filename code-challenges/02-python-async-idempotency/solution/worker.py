"""Poll email_jobs and mark sent (idempotent via sent_emails PK)."""

import time

from app import EmailJob, SentEmail, create_app, db


def process_once(app):
    with app.app_context():
        jobs = EmailJob.query.filter(EmailJob.status.in_(["queued", "failed"])).limit(10).all()
        for job in jobs:
            if job.attempts >= 3:
                continue
            job.attempts += 1
            try:
                existing = db.session.get(SentEmail, job.order_id)
                if not existing:
                    # simulate email I/O
                    time.sleep(0.05)
                    db.session.add(SentEmail(order_id=job.order_id))
                job.status = "sent"
                db.session.commit()
                print(f"sent email for order {job.order_id}")
            except Exception as exc:  # noqa: BLE001
                db.session.rollback()
                job = db.session.get(EmailJob, job.id)
                job.status = "failed"
                db.session.commit()
                print(f"fail {job.order_id}: {exc}")


def main():
    app = create_app()
    print("worker started")
    while True:
        process_once(app)
        time.sleep(1)


if __name__ == "__main__":
    main()
