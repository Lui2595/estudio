# Kafka vs Redis/Celery vs this jobs table
#
# - Jobs table / RQ / Celery+Redis: great for app background work (email, reports),
#   retries, same stack. This solution uses a DB queue for zero-infra local run.
# - SQS: managed, simple at-least-once, good in AWS without running Redis.
# - Kafka: event streaming, replay, many consumers — overkill for "send email after pay";
#   use when many services need the same OrderPaid event log.
