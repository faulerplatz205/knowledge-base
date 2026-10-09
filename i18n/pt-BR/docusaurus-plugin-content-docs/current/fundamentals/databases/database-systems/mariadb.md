---
title: "MariaDB"
description: "Visão geral e referência de comandos SQL do MariaDB, um sistema de gerenciamento de banco de dados relacional de código aberto."
keywords:
    - "SQL"
    - "MariaDB"
    - "Banco de Dados"
    - "Sintaxe"
    - "Referência"
    - "SELECT"
    - "INSERT"
    - "UPDATE"
    - "DELETE"
    - "JOIN"
    - "CREATE TABLE"
    - "ALTER TABLE"
    - "Índice"
    - "View"
    - "Transação"
machine_translated: true
---

# MariaDB

## Visão Geral {/*#overview*/}

O MariaDB é um sistema de gerenciamento de banco de dados relacional de código aberto, criado em 2009 pelos desenvolvedores originais do MySQL após a aquisição da Sun Microsystems pela Oracle. É um fork do MySQL mantido pela comunidade e totalmente compatível com ele na maioria dos casos de uso, o que o torna um substituto direto comum.

O MariaDB é compatível com ACID e suporta vários mecanismos de armazenamento, incluindo InnoDB e Aria. É amplamente utilizado em aplicações web, em sistemas de gerenciamento de conteúdo como WordPress e Drupal e em cargas de trabalho OLTP de uso geral.

## CREATE TABLE {/*#create-table*/}

Define uma nova tabela com suas colunas, tipos de dados e restrições.

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

Modifica uma tabela existente adicionando, removendo ou alterando colunas.

```sql
ALTER TABLE users ADD COLUMN age INT;

ALTER TABLE users DROP COLUMN age;

ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

ALTER TABLE users RENAME COLUMN name TO full_name;
```

## DROP / TRUNCATE {/*#drop--truncate*/}

Exclui permanentemente uma tabela ou remove todas as suas linhas, mantendo a estrutura.

```sql
DROP TABLE users;       -- Delete table including all data

TRUNCATE TABLE users;   -- Delete all rows, keep structure
```

## INSERT {/*#insert*/}

Adiciona uma ou mais linhas a uma tabela.

```sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

INSERT INTO users (name, email) VALUES
    ('Bob',   'bob@example.com'),
    ('Carol', 'carol@example.com');
```

## SELECT {/*#select*/}

Recupera linhas de uma ou mais tabelas, com filtragem, ordenação e paginação opcionais.

```sql
SELECT id, name, email
FROM   users
WHERE  created > '2024-01-01'
ORDER BY name ASC
LIMIT  10 OFFSET 20;
```

### Aliases {/*#aliases*/}

Atribui nomes temporários a colunas ou tabelas para facilitar a leitura.

```sql
SELECT u.name AS user_name, o.total AS order_total
FROM   users  AS u
JOIN   orders AS o ON o.user_id = u.id;
```

### JOINs {/*#joins*/}

Combina linhas de várias tabelas com base em uma coluna relacionada.

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

Agrupa linhas pelo valor de uma coluna e, opcionalmente, filtra os grupos após a agregação.

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

### Subconsultas {/*#subqueries*/}

Aninha uma consulta dentro de outra, seja como filtro ou como tabela derivada.

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

Modifica linhas existentes em uma tabela.

```sql
UPDATE users
SET    name  = 'Alice Smith',
       email = 'alicesmith@example.com'
WHERE  id = 1;
```

## DELETE {/*#delete*/}

Remove linhas de uma tabela.

```sql
DELETE FROM users WHERE id = 1;
```

## Índices {/*#indexes*/}

Acelera consultas criando uma estrutura de dados para buscas mais rápidas em uma ou mais colunas.

```sql
CREATE INDEX idx_users_name ON users (name);

CREATE UNIQUE INDEX idx_users_email ON users (email);

DROP INDEX idx_users_email ON users;

SHOW INDEX FROM users;
```

## Views {/*#views*/}

Cria uma consulta nomeada e reutilizável que pode ser referenciada como uma tabela.

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = 1;

DROP VIEW active_users;
```

## Transações {/*#transactions*/}

Agrupa várias instruções em uma única unidade atômica que é totalmente bem-sucedida ou totalmente revertida.

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- ROLLBACK;   -- Undo all changes since START TRANSACTION
```

## Funções {/*#functions*/}

### String {/*#string*/}

Funções comuns para manipular valores de texto.

```sql
CONCAT(first_name, ' ', last_name)    -- Concatenate strings
LOWER(name)                            -- Lowercase
UPPER(name)                            -- Uppercase
LENGTH(name)                           -- Length in bytes
TRIM(name)                             -- Remove leading/trailing whitespace
SUBSTRING(name, 1, 3)                 -- Extract substring (1-indexed)
REPLACE(name, 'old', 'new')           -- Replace substring
```

### Data / Hora {/*#date--time*/}

Funções comuns para trabalhar com valores de data e hora.

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

### Agregação {/*#aggregate*/}

Funções que calculam um único valor a partir de um conjunto de linhas.

```sql
COUNT(*)        -- Count all rows
COUNT(email)    -- Count non-NULL values
SUM(total)      -- Sum
AVG(total)      -- Average
MIN(total)      -- Minimum
MAX(total)      -- Maximum
```

### Condicional {/*#conditional*/}

Funções e expressões para retornar valores diferentes com base em condições.

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
