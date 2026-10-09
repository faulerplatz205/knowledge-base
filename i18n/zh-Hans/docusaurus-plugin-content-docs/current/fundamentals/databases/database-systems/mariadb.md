---
title: "MariaDB"
description: "开源关系型数据库管理系统 MariaDB 的概述与 SQL 命令参考。"
keywords:
    - "SQL"
    - "MariaDB"
    - "数据库"
    - "语法"
    - "参考"
    - "SELECT"
    - "INSERT"
    - "UPDATE"
    - "DELETE"
    - "JOIN"
    - "CREATE TABLE"
    - "ALTER TABLE"
    - "索引"
    - "视图"
    - "事务"
machine_translated: true
---

# MariaDB

## 概述 {/*#overview*/}

MariaDB 是一个开源关系型数据库管理系统，由原 MySQL 开发者在 Oracle 收购 Sun Microsystems 之后于 2009 年创建。它是社区驱动的 MySQL 分支，在大多数使用场景下与 MySQL 完全兼容，因此常被用作直接替代品。

MariaDB 符合 ACID，并支持多种存储引擎，包括 InnoDB 和 Aria。它广泛用于 Web 应用、WordPress 和 Drupal 等内容管理系统以及通用 OLTP 工作负载。

## CREATE TABLE {/*#create-table*/}

定义带有列、数据类型和约束的新表。

```sql
CREATE TABLE users (
    id      INT          NOT NULL AUTO_INCREMENT,
    name    VARCHAR(100) NOT NULL,
    email   VARCHAR(255) NOT NULL UNIQUE,
    created DATETIME     DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

## ALTER TABLE {/*#alter-table*/}

通过添加、删除或更改列来修改现有表。

```sql
ALTER TABLE users ADD COLUMN age INT;

ALTER TABLE users DROP COLUMN age;

ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

ALTER TABLE users RENAME COLUMN name TO full_name;
```

## DROP / TRUNCATE {/*#drop--truncate*/}

永久删除表，或在保留结构的同时删除其所有行。

```sql
DROP TABLE users;       -- Delete table including all data

TRUNCATE TABLE users;   -- Delete all rows, keep structure
```

## INSERT {/*#insert*/}

向表中添加一行或多行。

```sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

INSERT INTO users (name, email) VALUES
    ('Bob',   'bob@example.com'),
    ('Carol', 'carol@example.com');
```

## SELECT {/*#select*/}

从一个或多个表中检索行，可选择进行筛选、排序和分页。

```sql
SELECT id, name, email
FROM   users
WHERE  created > '2024-01-01'
ORDER BY name ASC
LIMIT  10 OFFSET 20;
```

### 别名 {/*#aliases*/}

为列或表指定临时名称以提高可读性。

```sql
SELECT u.name AS user_name, o.total AS order_total
FROM   users  AS u
JOIN   orders AS o ON o.user_id = u.id;
```

### JOIN {/*#joins*/}

基于相关列组合多个表中的行。

```sql
-- INNER JOIN — only rows that have a match in both tables
SELECT u.name, o.total
FROM   users  AS u
INNER JOIN orders AS o ON o.user_id = u.id;

-- LEFT JOIN — all rows from the left table, matched rows from the right
SELECT u.name, o.total
FROM   users  AS u
LEFT JOIN orders AS o ON o.user_id = u.id;

-- RIGHT JOIN — all rows from the right table, matched rows from the left
SELECT u.name, o.total
FROM   users  AS u
RIGHT JOIN orders AS o ON o.user_id = u.id;
```

### GROUP BY / HAVING {/*#group-by--having*/}

按列值对行分组，并可在聚合后筛选分组。

```sql
-- GROUP BY aggregates rows by column value
SELECT   department_id, COUNT(*) AS headcount
FROM     employees
GROUP BY department_id;

-- HAVING filters groups after aggregation (WHERE filters rows before)
SELECT   department_id, COUNT(*) AS headcount
FROM     employees
GROUP BY department_id
HAVING   headcount > 5;
```

### 子查询 {/*#subqueries*/}

将一个查询嵌套在另一个查询中，用作筛选条件或派生表。

```sql
SELECT name
FROM   users
WHERE  id IN (SELECT user_id FROM orders WHERE total > 100);

-- Subquery as derived table
SELECT dept, avg_salary
FROM (
    SELECT department_id AS dept, AVG(salary) AS avg_salary
    FROM   employees
    GROUP BY department_id
) AS dept_avg
WHERE avg_salary > 50000;
```

## UPDATE {/*#update*/}

修改表中的现有行。

```sql
UPDATE users
SET    name  = 'Alice Smith',
       email = 'alicesmith@example.com'
WHERE  id = 1;
```

## DELETE {/*#delete*/}

从表中删除行。

```sql
DELETE FROM users WHERE id = 1;
```

## 索引 {/*#indexes*/}

通过为一列或多列创建数据结构来加快查找，从而加速查询。

```sql
CREATE INDEX idx_users_name ON users (name);

CREATE UNIQUE INDEX idx_users_email ON users (email);

DROP INDEX idx_users_email ON users;

SHOW INDEX FROM users;
```

## 视图 {/*#views*/}

创建一个具名的、可复用的查询，可像表一样被引用。

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = 1;

DROP VIEW active_users;
```

## 事务 {/*#transactions*/}

将多条语句组合为一个原子单元，要么完全成功，要么完全回滚。

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- ROLLBACK;   -- Undo all changes since START TRANSACTION
```

## 函数 {/*#functions*/}

### 字符串 {/*#string*/}

用于处理文本值的常用函数。

```sql
CONCAT(first_name, ' ', last_name)    -- Concatenate strings
LOWER(name)                            -- Lowercase
UPPER(name)                            -- Uppercase
LENGTH(name)                           -- Length in bytes
TRIM(name)                             -- Remove leading/trailing whitespace
SUBSTRING(name, 1, 3)                 -- Extract substring (1-indexed)
REPLACE(name, 'old', 'new')           -- Replace substring
```

### 日期/时间 {/*#date--time*/}

用于处理日期和时间值的常用函数。

```sql
NOW()                                  -- Current date and time
CURDATE()                              -- Current date
DATE(created)                          -- Extract date part from datetime
YEAR(created)                          -- Extract year
MONTH(created)                         -- Extract month
DAY(created)                           -- Extract day
DATE_FORMAT(created, '%d.%m.%Y')      -- Format date as string
DATEDIFF(end_date, start_date)        -- Difference in days
DATE_ADD(created, INTERVAL 7 DAY)     -- Add interval
```

### 聚合 {/*#aggregate*/}

从一组行中计算出单个值的函数。

```sql
COUNT(*)        -- Count all rows
COUNT(email)    -- Count non-NULL values
SUM(total)      -- Sum
AVG(total)      -- Average
MIN(total)      -- Minimum
MAX(total)      -- Maximum
```

### 条件 {/*#conditional*/}

根据条件返回不同值的函数和表达式。

```sql
-- COALESCE — returns the first non-NULL value
SELECT COALESCE(nickname, name) AS display_name FROM users;

-- CASE
SELECT name,
       CASE
           WHEN score >= 90 THEN 'A'
           WHEN score >= 75 THEN 'B'
           ELSE 'C'
       END AS grade
FROM results;

-- IF
SELECT IF(active = 1, 'Active', 'Inactive') AS status FROM users;
```
