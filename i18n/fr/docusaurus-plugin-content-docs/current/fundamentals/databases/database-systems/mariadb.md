---
title: "MariaDB"
description: "Aperçu et référence des commandes SQL de MariaDB, un système de gestion de base de données relationnelle open source."
keywords:
    - "SQL"
    - "MariaDB"
    - "Base de données"
    - "Syntaxe"
    - "Référence"
    - "SELECT"
    - "INSERT"
    - "UPDATE"
    - "DELETE"
    - "JOIN"
    - "CREATE TABLE"
    - "ALTER TABLE"
    - "Index"
    - "Vue"
    - "Transaction"
machine_translated: true
---

# MariaDB

## Aperçu {/*#overview*/}

MariaDB est un système de gestion de base de données relationnelle open source créé en 2009 par les développeurs d'origine de MySQL après le rachat de Sun Microsystems par Oracle. Il s'agit d'un fork de MySQL piloté par la communauté et entièrement compatible avec celui-ci dans la plupart des cas d'usage, ce qui en fait un remplaçant direct courant.

MariaDB est conforme à ACID et prend en charge plusieurs moteurs de stockage, dont InnoDB et Aria. Il est largement utilisé pour les applications web, les systèmes de gestion de contenu tels que WordPress et Drupal, et les charges de travail OLTP généralistes.

## CREATE TABLE {/*#create-table*/}

Définit une nouvelle table avec ses colonnes, ses types de données et ses contraintes.

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

Modifie une table existante en ajoutant, supprimant ou modifiant des colonnes.

```sql
ALTER TABLE users ADD COLUMN age INT;

ALTER TABLE users DROP COLUMN age;

ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

ALTER TABLE users RENAME COLUMN name TO full_name;
```

## DROP / TRUNCATE {/*#drop--truncate*/}

Supprime définitivement une table ou retire toutes ses lignes tout en conservant la structure.

```sql
DROP TABLE users;       -- Delete table including all data

TRUNCATE TABLE users;   -- Delete all rows, keep structure
```

## INSERT {/*#insert*/}

Ajoute une ou plusieurs lignes à une table.

```sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

INSERT INTO users (name, email) VALUES
    ('Bob',   'bob@example.com'),
    ('Carol', 'carol@example.com');
```

## SELECT {/*#select*/}

Récupère des lignes d'une ou plusieurs tables, avec filtrage, tri et pagination facultatifs.

```sql
SELECT id, name, email
FROM   users
WHERE  created > '2024-01-01'
ORDER BY name ASC
LIMIT  10 OFFSET 20;
```

### Alias {/*#aliases*/}

Attribue des noms temporaires à des colonnes ou des tables pour améliorer la lisibilité.

```sql
SELECT u.name AS user_name, o.total AS order_total
FROM   users  AS u
JOIN   orders AS o ON o.user_id = u.id;
```

### JOIN {/*#joins*/}

Combine des lignes de plusieurs tables à partir d'une colonne liée.

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

Regroupe les lignes selon la valeur d'une colonne et filtre éventuellement les groupes après agrégation.

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

### Sous-requêtes {/*#subqueries*/}

Imbrique une requête dans une autre, soit comme filtre, soit comme table dérivée.

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

Modifie des lignes existantes d'une table.

```sql
UPDATE users
SET    name  = 'Alice Smith',
       email = 'alicesmith@example.com'
WHERE  id = 1;
```

## DELETE {/*#delete*/}

Supprime des lignes d'une table.

```sql
DELETE FROM users WHERE id = 1;
```

## Index {/*#indexes*/}

Accélère les requêtes en créant une structure de données permettant des recherches plus rapides sur une ou plusieurs colonnes.

```sql
CREATE INDEX idx_users_name ON users (name);

CREATE UNIQUE INDEX idx_users_email ON users (email);

DROP INDEX idx_users_email ON users;

SHOW INDEX FROM users;
```

## Vues {/*#views*/}

Crée une requête nommée et réutilisable, qui peut être référencée comme une table.

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = 1;

DROP VIEW active_users;
```

## Transactions {/*#transactions*/}

Regroupe plusieurs instructions en une seule unité atomique qui réussit entièrement ou est entièrement annulée.

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- ROLLBACK;   -- Undo all changes since START TRANSACTION
```

## Fonctions {/*#functions*/}

### Chaînes de caractères {/*#string*/}

Fonctions courantes de manipulation de valeurs textuelles.

```sql
CONCAT(first_name, ' ', last_name)    -- Concatenate strings
LOWER(name)                            -- Lowercase
UPPER(name)                            -- Uppercase
LENGTH(name)                           -- Length in bytes
TRIM(name)                             -- Remove leading/trailing whitespace
SUBSTRING(name, 1, 3)                 -- Extract substring (1-indexed)
REPLACE(name, 'old', 'new')           -- Replace substring
```

### Date / heure {/*#date--time*/}

Fonctions courantes pour travailler avec des valeurs de date et d'heure.

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

### Agrégation {/*#aggregate*/}

Fonctions qui calculent une valeur unique à partir d'un ensemble de lignes.

```sql
COUNT(*)        -- Count all rows
COUNT(email)    -- Count non-NULL values
SUM(total)      -- Sum
AVG(total)      -- Average
MIN(total)      -- Minimum
MAX(total)      -- Maximum
```

### Conditionnelles {/*#conditional*/}

Fonctions et expressions permettant de renvoyer différentes valeurs selon des conditions.

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
