-- VOICE INTERVIEW: "Explain 1:N and N:M relationships with FK constraints"
--
-- Say out loud:
-- - 1:N: FK on the "many" side (orders.customer_id)
-- - N:M: junction table with composite unique (student_id, course_id)
-- - ON DELETE rules match business logic (RESTRICT vs CASCADE)

-- ========== 1:N — Customer has many Orders ==========
CREATE TABLE customers (
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    name       VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
    id          SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    -- RESTRICT: cannot delete customer with existing orders
    status      VARCHAR(20) NOT NULL DEFAULT 'pending',
    total       DECIMAL(10, 2) NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_customer_id ON orders (customer_id);
CREATE INDEX idx_orders_status ON orders (status);

-- ========== 1:1 — User has one Profile (optional split) ==========
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE user_profiles (
    user_id     INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    -- CASCADE: profile deleted when user deleted
    bio         TEXT,
    avatar_url  VARCHAR(500)
);

-- ========== N:M — Students enroll in many Courses ==========
CREATE TABLE students (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    id    SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL
);

CREATE TABLE enrollments (
    student_id  INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id   INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    grade       VARCHAR(2),
    PRIMARY KEY (student_id, course_id)
    -- composite PK prevents duplicate enrollment
);

-- ========== Soft delete pattern ==========
CREATE TABLE products (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(200) NOT NULL,
    price      DECIMAL(10, 2) NOT NULL,
    deleted_at TIMESTAMP NULL
);

-- Partial index: only active products (common filter)
CREATE INDEX idx_products_active ON products (name) WHERE deleted_at IS NULL;

-- ========== Optimistic locking (concurrent updates) ==========
CREATE TABLE inventory (
    id        SERIAL PRIMARY KEY,
    sku       VARCHAR(50) NOT NULL UNIQUE,
    quantity  INT NOT NULL DEFAULT 0,
    version   INT NOT NULL DEFAULT 1
);

-- UPDATE inventory
-- SET quantity = quantity - 1, version = version + 1
-- WHERE sku = 'ABC' AND version = :expected_version;
-- If 0 rows updated → 409 Conflict, someone else updated first

-- ========== Multi-tenant (shared schema) ==========
CREATE TABLE tenant_orders (
    id         SERIAL PRIMARY KEY,
    tenant_id  UUID NOT NULL,
    order_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tenant_orders_tenant ON tenant_orders (tenant_id, created_at DESC);
-- EVERY query must include: WHERE tenant_id = :current_tenant

-- VOICE: N+1 fix — one query with JOIN instead of loop
-- SELECT o.*, c.name AS customer_name
-- FROM orders o
-- JOIN customers c ON c.id = o.customer_id
-- WHERE o.customer_id = 42;
