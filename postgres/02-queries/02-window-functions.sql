-- TEMA: Window Functions
-- ENTREVISTA: ¿Diferencia entre GROUP BY y window functions?

-- GROUP BY colapsa filas. Window functions mantienen cada fila.

-- Ranking
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank_with_gaps,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;

-- Running total
SELECT
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- Comparar con fila anterior/siguiente
SELECT
    date,
    revenue,
    LAG(revenue, 1)  OVER (ORDER BY date) AS prev_day,
    LEAD(revenue, 1) OVER (ORDER BY date) AS next_day,
    revenue - LAG(revenue, 1) OVER (ORDER BY date) AS daily_change
FROM daily_revenue;

-- Promedio móvil (últimas 7 filas)
SELECT
    date,
    revenue,
    AVG(revenue) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS avg_7_days
FROM daily_revenue;

-- Paginación eficiente con ROW_NUMBER
WITH numbered AS (
    SELECT *, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn
    FROM posts
)
SELECT * FROM numbered WHERE rn BETWEEN 21 AND 40;
