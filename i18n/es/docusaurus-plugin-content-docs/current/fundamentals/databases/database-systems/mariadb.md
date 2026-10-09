---
title: "MariaDB"
description: "Resumen y referencia de comandos SQL de MariaDB, un sistema gestor de bases de datos relacionales de código abierto."
keywords:
    - "SQL"
    - "MariaDB"
    - "Base de datos"
    - "Sintaxis"
    - "Referencia"
    - "SELECT"
    - "INSERT"
    - "UPDATE"
    - "DELETE"
    - "JOIN"
    - "CREATE TABLE"
    - "ALTER TABLE"
    - "Índice"
    - "Vista"
    - "Transacción"
machine_translated: true
---

# MariaDB

## Resumen {/*#overview*/}

MariaDB es un sistema gestor de bases de datos relacionales de código abierto creado en 2009 por los desarrolladores originales de MySQL tras la adquisición de Sun Microsystems por parte de Oracle. Es un fork de MySQL impulsado por la comunidad y totalmente compatible con él en la mayoría de los casos de uso, lo que lo convierte en un sustituto directo habitual.

MariaDB cumple con ACID y admite varios motores de almacenamiento, entre ellos InnoDB y Aria. Se utiliza ampliamente en aplicaciones web, sistemas de gestión de contenidos como WordPress y Drupal, y cargas de trabajo OLTP de propósito general.

## CREATE TABLE {/*#create-table*/}

Define una nueva tabla con sus columnas, tipos de datos y restricciones.

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

Modifica una tabla existente añadiendo, eliminando o cambiando columnas.

```sql
ALTER TABLE users ADD COLUMN age INT;

ALTER TABLE users DROP COLUMN age;

ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

ALTER TABLE users RENAME COLUMN name TO full_name;
```

## DROP / TRUNCATE {/*#drop--truncate*/}

Elimina una tabla de forma permanente o suprime todas sus filas conservando la estructura.

```sql
DROP TABLE users;       -- Delete table including all data

TRUNCATE TABLE users;   -- Delete all rows, keep structure
```

## INSERT {/*#insert*/}

Añade una o más filas a una tabla.

```sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

INSERT INTO users (name, email) VALUES
    ('Bob',   'bob@example.com'),
    ('Carol', 'carol@example.com');
```

## SELECT {/*#select*/}

Recupera filas de una o más tablas, con filtrado, ordenación y paginación opcionales.

```sql
SELECT id, name, email
FROM   users
WHERE  created > '2024-01-01'
ORDER BY name ASC
LIMIT  10 OFFSET 20;
```

### Alias {/*#aliases*/}

Asigna nombres temporales a columnas o tablas para mejorar la legibilidad.

```sql
SELECT u.name AS user_name, o.total AS order_total
FROM   users  AS u
JOIN   orders AS o ON o.user_id = u.id;
```

### JOIN {/*#joins*/}

Combina filas de varias tablas a partir de una columna relacionada.

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

Agrupa filas por el valor de una columna y, opcionalmente, filtra los grupos tras la agregación.

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

Anida una consulta dentro de otra, ya sea como filtro o como tabla derivada.

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

Modifica filas existentes de una tabla.

```sql
UPDATE users
SET    name  = 'Alice Smith',
       email = 'alicesmith@example.com'
WHERE  id = 1;
```

## DELETE {/*#delete*/}

Elimina filas de una tabla.

```sql
DELETE FROM users WHERE id = 1;
```

## Índices {/*#indexes*/}

Acelera las consultas creando una estructura de datos para búsquedas más rápidas en una o más columnas.

```sql
CREATE INDEX idx_users_name ON users (name);

CREATE UNIQUE INDEX idx_users_email ON users (email);

DROP INDEX idx_users_email ON users;

SHOW INDEX FROM users;
```

## Vistas {/*#views*/}

Crea una consulta con nombre y reutilizable a la que se puede hacer referencia como a una tabla.

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = 1;

DROP VIEW active_users;
```

## Transacciones {/*#transactions*/}

Agrupa varias sentencias en una única unidad atómica que se completa con éxito en su totalidad o se revierte por completo.

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- ROLLBACK;   -- Undo all changes since START TRANSACTION
```

## Funciones {/*#functions*/}

### Cadenas {/*#string*/}

Funciones habituales para manipular valores de texto.

```sql
CONCAT(first_name, ' ', last_name)    -- Concatenate strings
LOWER(name)                            -- Lowercase
UPPER(name)                            -- Uppercase
LENGTH(name)                           -- Length in bytes
TRIM(name)                             -- Remove leading/trailing whitespace
SUBSTRING(name, 1, 3)                 -- Extract substring (1-indexed)
REPLACE(name, 'old', 'new')           -- Replace substring
```

### Fecha / hora {/*#date--time*/}

Funciones habituales para trabajar con valores de fecha y hora.

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

### Agregación {/*#aggregate*/}

Funciones que calculan un único valor a partir de un conjunto de filas.

```sql
COUNT(*)        -- Count all rows
COUNT(email)    -- Count non-NULL values
SUM(total)      -- Sum
AVG(total)      -- Average
MIN(total)      -- Minimum
MAX(total)      -- Maximum
```

### Condicionales {/*#conditional*/}

Funciones y expresiones para devolver distintos valores según condiciones.

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
