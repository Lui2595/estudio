-- TEMA: Transacciones y ACID
-- ENTREVISTA: Explica ACID y los niveles de aislamiento en MySQL.

-- ACID:
-- Atomicity: todo o nada
-- Consistency: reglas de integridad se mantienen
-- Isolation: transacciones concurrentes no se interfieren
-- Durability: datos persisten tras commit

START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Si algo falla:
-- ROLLBACK;

COMMIT;

-- Niveles de aislamiento (InnoDB default: REPEATABLE READ)
-- READ UNCOMMITTED    → dirty reads
-- READ COMMITTED      → no dirty reads
-- REPEATABLE READ     → no non-repeatable reads (default InnoDB)
-- SERIALIZABLE        → más estricto, más lento

SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
-- operaciones...
COMMIT;

-- Lock explícito para evitar race conditions
START TRANSACTION;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;
-- Procesar...
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- SAVEPOINT
START TRANSACTION;
INSERT INTO orders (user_id, total) VALUES (1, 500);
SAVEPOINT before_items;
INSERT INTO order_items (order_id, product_id) VALUES (999, 1); -- puede fallar
ROLLBACK TO SAVEPOINT before_items;
COMMIT;
