-- TEMA: Stored Procedures, Triggers, Views
-- ENTREVISTA: ¿Cuándo NO usar stored procedures?

-- VIEW: query virtual reutilizable
CREATE VIEW active_users AS
SELECT id, name, email, created_at
FROM users
WHERE is_active = 1 AND deleted_at IS NULL;

SELECT * FROM active_users WHERE created_at > '2024-01-01';

-- STORED PROCEDURE
DELIMITER //
CREATE PROCEDURE transfer_funds(
    IN from_id INT,
    IN to_id INT,
    IN amount DECIMAL(10,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    UPDATE accounts SET balance = balance - amount WHERE id = from_id;
    UPDATE accounts SET balance = balance + amount WHERE id = to_id;
    COMMIT;
END //
DELIMITER ;

-- TRIGGER
DELIMITER //
CREATE TRIGGER before_user_delete
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, record_id, action, deleted_at)
    VALUES ('users', OLD.id, 'DELETE', NOW());
END //
DELIMITER ;

-- Evitar SP cuando:
-- - Lógica de negocio compleja (mejor en Laravel/PHP)
-- - Necesitas testear con PHPUnit
-- - Quieres versionar en Git con el código de la app
-- - Usar SP para "ocultar" SQL de desarrolladores
