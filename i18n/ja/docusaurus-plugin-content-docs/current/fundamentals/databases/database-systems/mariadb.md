---
title: "MariaDB"
description: "オープンソースのリレーショナルデータベース管理システムであるMariaDBの概要とSQLコマンドリファレンス。"
keywords:
    - "SQL"
    - "MariaDB"
    - "データベース"
    - "構文"
    - "リファレンス"
    - "SELECT"
    - "INSERT"
    - "UPDATE"
    - "DELETE"
    - "JOIN"
    - "CREATE TABLE"
    - "ALTER TABLE"
    - "インデックス"
    - "ビュー"
    - "トランザクション"
machine_translated: true
---

# MariaDB

## 概要 {/*#overview*/}

MariaDBは、OracleがSun Microsystemsを買収した後の2009年に、MySQLのオリジナルの開発者たちによって作られたオープンソースのリレーショナルデータベース管理システムである。MySQLのコミュニティ主導のフォークであり、ほとんどの用途でMySQLと完全な互換性があるため、置き換え用として広く使われている。

MariaDBはACIDに準拠しており、InnoDBやAriaを含む複数のストレージエンジンをサポートする。Webアプリケーション、WordPressやDrupalなどのコンテンツ管理システム、汎用的なOLTPワークロードで広く使われている。

## CREATE TABLE {/*#create-table*/}

列、データ型、制約を持つ新しいテーブルを定義する。

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

列の追加、削除、変更によって既存のテーブルを変更する。

```sql
ALTER TABLE users ADD COLUMN age INT;

ALTER TABLE users DROP COLUMN age;

ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

ALTER TABLE users RENAME COLUMN name TO full_name;
```

## DROP / TRUNCATE {/*#drop--truncate*/}

テーブルを完全に削除するか、構造を残したまますべての行を削除する。

```sql
DROP TABLE users;       -- Delete table including all data

TRUNCATE TABLE users;   -- Delete all rows, keep structure
```

## INSERT {/*#insert*/}

テーブルに1行以上を追加する。

```sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

INSERT INTO users (name, email) VALUES
    ('Bob',   'bob@example.com'),
    ('Carol', 'carol@example.com');
```

## SELECT {/*#select*/}

1つ以上のテーブルから行を取得する。フィルタリング、並べ替え、ページ分割を任意で指定できる。

```sql
SELECT id, name, email
FROM   users
WHERE  created > '2024-01-01'
ORDER BY name ASC
LIMIT  10 OFFSET 20;
```

### エイリアス {/*#aliases*/}

可読性のために、列やテーブルに一時的な名前を付ける。

```sql
SELECT u.name AS user_name, o.total AS order_total
FROM   users  AS u
JOIN   orders AS o ON o.user_id = u.id;
```

### JOIN {/*#joins*/}

関連する列に基づいて、複数のテーブルの行を結合する。

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

列の値で行をグループ化し、必要に応じて集計後にグループをフィルタリングする。

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

### サブクエリ {/*#subqueries*/}

フィルタまたは派生テーブルとして、クエリを別のクエリの内部に入れ子にする。

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

テーブル内の既存の行を変更する。

```sql
UPDATE users
SET    name  = 'Alice Smith',
       email = 'alicesmith@example.com'
WHERE  id = 1;
```

## DELETE {/*#delete*/}

テーブルから行を削除する。

```sql
DELETE FROM users WHERE id = 1;
```

## インデックス {/*#indexes*/}

1つ以上の列に対する検索を高速化するデータ構造を作成することで、クエリを高速化する。

```sql
CREATE INDEX idx_users_name ON users (name);

CREATE UNIQUE INDEX idx_users_email ON users (email);

DROP INDEX idx_users_email ON users;

SHOW INDEX FROM users;
```

## ビュー {/*#views*/}

テーブルのように参照できる、名前付きで再利用可能なクエリを作成する。

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = 1;

DROP VIEW active_users;
```

## トランザクション {/*#transactions*/}

複数の文を、完全に成功するか完全にロールバックされるかのいずれかである、1つの不可分な単位にまとめる。

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- ROLLBACK;   -- Undo all changes since START TRANSACTION
```

## 関数 {/*#functions*/}

### 文字列 {/*#string*/}

テキスト値を操作するための一般的な関数。

```sql
CONCAT(first_name, ' ', last_name)    -- Concatenate strings
LOWER(name)                            -- Lowercase
UPPER(name)                            -- Uppercase
LENGTH(name)                           -- Length in bytes
TRIM(name)                             -- Remove leading/trailing whitespace
SUBSTRING(name, 1, 3)                 -- Extract substring (1-indexed)
REPLACE(name, 'old', 'new')           -- Replace substring
```

### 日付/時刻 {/*#date--time*/}

日付と時刻の値を扱うための一般的な関数。

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

### 集計 {/*#aggregate*/}

行の集合から単一の値を計算する関数。

```sql
COUNT(*)        -- Count all rows
COUNT(email)    -- Count non-NULL values
SUM(total)      -- Sum
AVG(total)      -- Average
MIN(total)      -- Minimum
MAX(total)      -- Maximum
```

### 条件 {/*#conditional*/}

条件に応じて異なる値を返すための関数と式。

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
