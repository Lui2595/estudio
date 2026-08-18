-- TEMA: Transacciones y locks en PostgreSQL
-- ENTREVISTA: ¿Cómo evitar deadlocks?

BEGIN;

-- SELECT FOR UPDATE: lock pesimista (igual que MySQL)
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;

-- SELECT FOR UPDATE SKIP LOCKED: ideal para job queues
-- Toma filas sin esperar las bloqueadas
SELECT * FROM jobs
WHERE status = 'pending'
ORDER BY created_at
FOR UPDATE SKIP LOCKED
LIMIT 1;

-- Advisory locks: locks a nivel aplicación
SELECT pg_advisory_lock(12345);
-- lógica crítica...
SELECT pg_advisory_unlock(12345);

-- Niveles de aislamiento
-- READ COMMITTED (default PG)
-- REPEATABLE READ
-- SERIALIZABLE (más estricto que MySQL)

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
-- operaciones...
COMMIT;

-- Evitar deadlocks:
-- 1. Acceder tablas/filas en el MISMO orden siempre
-- 2. Transacciones cortas
-- 3. Usar SKIP LOCKED para colas

-- Ver locks activos
-- SELECT * FROM pg_locks WHERE NOT granted;
