---
title: "MariaDB"
description: "نظرة عامة ومرجع أوامر SQL لنظام MariaDB، وهو نظام مفتوح المصدر لإدارة قواعد البيانات العلائقية."
keywords:
    - "SQL"
    - "MariaDB"
    - "قاعدة البيانات"
    - "الصيغة"
    - "مرجع"
    - "SELECT"
    - "INSERT"
    - "UPDATE"
    - "DELETE"
    - "JOIN"
    - "CREATE TABLE"
    - "ALTER TABLE"
    - "الفهرس"
    - "العرض"
    - "المعاملة"
machine_translated: true
---

# MariaDB

## نظرة عامة {/*#overview*/}

MariaDB نظام مفتوح المصدر لإدارة قواعد البيانات العلائقية، أنشأه عام 2009 المطورون الأصليون لـ MySQL بعد استحواذ Oracle على Sun Microsystems. وهو تفرّع (fork) مدفوع بالمجتمع من MySQL ومتوافق معه تمامًا في معظم حالات الاستخدام، مما يجعله بديلًا شائعًا يمكن استخدامه مباشرة محله.

MariaDB متوافق مع ACID ويدعم عدة محركات تخزين، منها InnoDB وAria. ويُستخدم على نطاق واسع في تطبيقات الويب، وأنظمة إدارة المحتوى مثل WordPress وDrupal، وأحمال OLTP العامة.

## CREATE TABLE {/*#create-table*/}

تعرّف جدولًا جديدًا بأعمدته وأنواع بياناته وقيوده.

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

تعدّل جدولًا موجودًا بإضافة أعمدة أو إزالتها أو تغييرها.

```sql
ALTER TABLE users ADD COLUMN age INT;

ALTER TABLE users DROP COLUMN age;

ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

ALTER TABLE users RENAME COLUMN name TO full_name;
```

## DROP / TRUNCATE {/*#drop--truncate*/}

تحذف جدولًا نهائيًا أو تزيل جميع صفوفه مع الإبقاء على البنية.

```sql
DROP TABLE users;       -- Delete table including all data

TRUNCATE TABLE users;   -- Delete all rows, keep structure
```

## INSERT {/*#insert*/}

تضيف صفًا واحدًا أو أكثر إلى جدول.

```sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

INSERT INTO users (name, email) VALUES
    ('Bob',   'bob@example.com'),
    ('Carol', 'carol@example.com');
```

## SELECT {/*#select*/}

تسترجع صفوفًا من جدول واحد أو أكثر، مع تصفية وترتيب وتقسيم صفحات اختيارية.

```sql
SELECT id, name, email
FROM   users
WHERE  created > '2024-01-01'
ORDER BY name ASC
LIMIT  10 OFFSET 20;
```

### الأسماء المستعارة {/*#aliases*/}

تعيّن أسماء مؤقتة للأعمدة أو الجداول لتحسين القراءة.

```sql
SELECT u.name AS user_name, o.total AS order_total
FROM   users  AS u
JOIN   orders AS o ON o.user_id = u.id;
```

### JOINs {/*#joins*/}

تجمع صفوفًا من عدة جداول استنادًا إلى عمود مرتبط.

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

تجمّع الصفوف بحسب قيمة عمود، وتصفّي المجموعات اختياريًا بعد التجميع.

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

### الاستعلامات الفرعية {/*#subqueries*/}

تضمّن استعلامًا داخل استعلام آخر، إما كمرشِّح أو كجدول مشتق.

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

تعدّل صفوفًا موجودة في جدول.

```sql
UPDATE users
SET    name  = 'Alice Smith',
       email = 'alicesmith@example.com'
WHERE  id = 1;
```

## DELETE {/*#delete*/}

تزيل صفوفًا من جدول.

```sql
DELETE FROM users WHERE id = 1;
```

## الفهارس {/*#indexes*/}

تسرّع الاستعلامات بإنشاء بنية بيانات تتيح بحثًا أسرع في عمود واحد أو أكثر.

```sql
CREATE INDEX idx_users_name ON users (name);

CREATE UNIQUE INDEX idx_users_email ON users (email);

DROP INDEX idx_users_email ON users;

SHOW INDEX FROM users;
```

## العروض {/*#views*/}

تنشئ استعلامًا مسمًّى قابلًا لإعادة الاستخدام يمكن الإشارة إليه كجدول.

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = 1;

DROP VIEW active_users;
```

## المعاملات {/*#transactions*/}

تجمّع عدة عبارات في وحدة ذرية واحدة إما أن تنجح بالكامل أو يُتراجع عنها بالكامل.

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- ROLLBACK;   -- Undo all changes since START TRANSACTION
```

## الدوال {/*#functions*/}

### النصوص {/*#string*/}

دوال شائعة لمعالجة القيم النصية.

```sql
CONCAT(first_name, ' ', last_name)    -- Concatenate strings
LOWER(name)                            -- Lowercase
UPPER(name)                            -- Uppercase
LENGTH(name)                           -- Length in bytes
TRIM(name)                             -- Remove leading/trailing whitespace
SUBSTRING(name, 1, 3)                 -- Extract substring (1-indexed)
REPLACE(name, 'old', 'new')           -- Replace substring
```

### التاريخ / الوقت {/*#date--time*/}

دوال شائعة للتعامل مع قيم التاريخ والوقت.

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

### التجميعية {/*#aggregate*/}

دوال تحسب قيمة واحدة من مجموعة صفوف.

```sql
COUNT(*)        -- Count all rows
COUNT(email)    -- Count non-NULL values
SUM(total)      -- Sum
AVG(total)      -- Average
MIN(total)      -- Minimum
MAX(total)      -- Maximum
```

### الشرطية {/*#conditional*/}

دوال وتعبيرات تعيد قيمًا مختلفة بحسب الشروط.

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
