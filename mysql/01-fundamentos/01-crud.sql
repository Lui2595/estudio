-- TEMA: SELECT, INSERT, UPDATE, DELETE
-- ENTREVISTA: ¿Cuál es la diferencia entre DELETE y TRUNCATE?

-- SELECT básico
SELECT id, name, email, created_at
FROM users
WHERE is_active = 1
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;

-- INSERT
INSERT INTO users (name, email, password, is_active)
VALUES ('Ana García', 'ana@test.com', 'hash...', 1);

-- INSERT múltiple
INSERT INTO tags (name) VALUES ('php'), ('laravel'), ('react');

-- UPDATE (siempre con WHERE en producción)
UPDATE users
SET is_active = 0, updated_at = NOW()
WHERE last_login_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);

-- DELETE: fila por fila, activa triggers, se puede rollback
DELETE FROM sessions WHERE expires_at < NOW();

-- TRUNCATE: vacía tabla completa, más rápido, resetea AUTO_INCREMENT
-- TRUNCATE TABLE temp_logs;

-- REPLACE vs INSERT ON DUPLICATE KEY UPDATE
INSERT INTO stats (user_id, login_count)
VALUES (1, 1)
ON DUPLICATE KEY UPDATE login_count = login_count + 1;
