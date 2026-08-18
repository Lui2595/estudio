-- TEMA: Normalización
-- ENTREVISTA: ¿Cuándo desnormalizarías a propósito?

-- 1NF: valores atómicos, sin arrays en columnas
-- 2NF: 1NF + sin dependencias parciales (PK compuesta)
-- 3NF: 2NF + sin dependencias transitivas

-- Ejemplo normalizado (3NF)
-- users: id, name, email
-- posts: id, user_id, title, body
-- tags: id, name
-- post_tag: post_id, tag_id

-- Desnormalización intencional (cache en BD):
-- posts: id, user_id, title, author_name  ← duplica name para evitar JOIN
-- Cuándo: lecturas >> escrituras, dashboards, reportes

-- JSON column (MySQL 5.7+): semi-estructurado sin perder todo
ALTER TABLE users ADD COLUMN settings JSON;
UPDATE users SET settings = '{"theme": "dark", "lang": "es"}' WHERE id = 1;
SELECT * FROM users WHERE settings->>'$.theme' = 'dark';

-- Trade-off JSON vs tablas relacionales:
-- JSON: flexible, un solo query, difícil indexar campos anidados
-- Relacional: integridad referencial, JOINs, índices precisos
