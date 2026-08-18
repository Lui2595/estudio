# Self-check — Challenge 02

- [ ] Idempotency-Key required
- [ ] Replay returns same response, no double stock hit
- [ ] Different body + same key → 409
- [ ] Stock never negative
- [ ] Payment failure leaves stock intact
- [ ] Email is async (worker separate process)
- [ ] Email job retries + no duplicate "sent" side effect
- [ ] ≥3 tests green
- [ ] NOTES.md with queue trade-offs
- Minutes: ____
