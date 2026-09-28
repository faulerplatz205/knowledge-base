---
title: "Database Schema"
description: "The relational database schema: tables, keys, notation, the transformation of an ER model into tables and referential integrity."
keywords:
    - "Database Schema"
    - "Relational Schema"
    - "Relational Model"
    - "Primary Key"
    - "Foreign Key"
    - "Composite Key"
    - "Junction Table"
    - "Referential Integrity"
    - "Database Design"
tags:
    - ap2
---

# Database Schema

A database schema describes the structure of a relational database: its tables, their columns with data types, the keys and the references between the tables. Unlike the [ER model](./er-model.md), it is bound to the relational model. Relationships no longer exist as elements of their own and are expressed through foreign keys and junction tables instead. The schema is created in the semantic phase of [database development](./database-development-phases.md) and implemented in the physical phase with `CREATE TABLE` statements.

## Terminology

| Relational term | Common term        | Meaning                                                  |
| --------------- | ------------------ | -------------------------------------------------------- |
| Relation        | Table              | Set of rows with the same attributes                     |
| Tuple           | Row, record        | One entry of a table                                     |
| Attribute       | Column             | A property that every row of the table has               |
| Domain          | Data type          | Set of values an attribute may take                      |
| Relation schema | Table definition   | Table name and its attributes                            |
| Database schema | Database structure | All relation schemas of a database and their constraints |

## Keys

- **Candidate key:** A minimal set of attributes that uniquely identifies every row. A table can have several, e.g. `CustomerID` and `Email`.
- **Primary key (PK):** The candidate key chosen to identify the rows. It must be unique and must not be `NULL`.
- **Composite key:** A key made up of several attributes, e.g. `(OrderID, LineNumber)`.
- **Foreign key (FK):** One or more attributes that reference the primary key of another table or of the same table. It can also be part of the primary key, as in a junction table or the table of a weak entity.
- **Natural key:** A key taken from the data itself, e.g. an ISBN.
- **Surrogate key:** An artificial key without meaning outside the database, usually an auto-incremented number or a UUID.

## Notation

### Textual Notation

Each table is written as its name followed by its attributes in parentheses:

| Marking                                          | Meaning                                                    |
| ------------------------------------------------ | ---------------------------------------------------------- |
| Underlined                                       | Primary key; for a composite key, every part is underlined |
| Leading `#` or `↑`, sometimes a dashed underline | Foreign key                                                |
| Suffix `PK` or `FK`                              | Plain-text replacement where underlining is not possible   |

An attribute that is both primary key and foreign key is underlined and marked with `#`.

### Table Diagram

- **Box:** One table, with the table name as the header and the columns below the line
- **`PK` and `FK`:** Marker in front of a column; `PK FK` marks a column that is both
- **Line:** Foreign key reference between two tables
- **Line ends:** Cardinality, either `1` or `N`

## Transformation from an ER Model

| ER element                        | Database schema                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| Entity type                       | Table                                                                                             |
| Attribute                         | Column                                                                                            |
| Key attribute                     | Primary key                                                                                       |
| Composite attribute               | One column per sub-attribute, e.g. `Street`, `City`, `ZIP`                                        |
| Multivalued attribute             | Separate table with a foreign key to the owner, e.g. `PhoneNumbers (#CustomerID, Number)`         |
| Derived attribute                 | Usually not stored, but computed in the query                                                     |
| 1:1 relationship                  | Foreign key with a `UNIQUE` constraint in one of the two tables                                   |
| 1:N relationship                  | Foreign key in the table on the N side                                                            |
| N:M relationship                  | Junction table whose primary key consists of the foreign keys to both tables                      |
| Relationship attribute            | Column in the table holding the foreign key, for N:M in the junction table                        |
| Weak entity                       | Table whose primary key combines the owner's primary key (also a foreign key) and the partial key |
| Total participation on the N side | Foreign key declared `NOT NULL`                                                                   |

An N:M relationship between students and courses with the relationship attribute `EnrolledOn`:

```text
Students    (StudentID, Name)
             ─────────
Courses     (CourseID, Title)
             ────────
Enrollments (#StudentID, #CourseID, EnrolledOn)
             ──────────  ─────────
```

## Referential Integrity

Every foreign key value must match an existing primary key value in the referenced table, or be `NULL` where the column allows it. The DBMS rejects an insert or update that violates this rule. What happens when a referenced row is deleted (`ON DELETE`) or its primary key is changed (`ON UPDATE`) is set per foreign key:

| Option                   | Effect of deleting the referenced row                                   |
| ------------------------ | ----------------------------------------------------------------------- |
| `RESTRICT` / `NO ACTION` | Deletion is rejected while referencing rows exist (default)             |
| `CASCADE`                | Referencing rows are deleted as well, e.g. the items of a deleted order |
| `SET NULL`               | Foreign key is set to `NULL`; the column must allow `NULL`              |

## Example: Order Management

The example from the [ER model](./er-model.md) becomes three tables. The 1:N relationship `places` turns into the foreign key `CustomerID` in `Orders`. The identifying relationship `contains` makes `OrderID` part of the primary key of `OrderItems`.

```text
Customers  (CustomerID, Name, Email)
            ──────────
Orders     (OrderID, #CustomerID, OrderDate)
            ───────
OrderItems (#OrderID, LineNumber, Quantity)
            ────────  ──────────
```

```text
┌─────────────────────┐          ┌──────────────────────┐
│ Customers           │          │ Orders               │
├─────────────────────┤          ├──────────────────────┤
│ PK     CustomerID   │1        N│ PK     OrderID       │
│        Name         ├──────────┤ FK     CustomerID    │
│        Email        │          │        OrderDate     │
└─────────────────────┘          └──────────┬───────────┘
                                            │ 1
                                            │
                                            │ N
                                 ┌──────────┴───────────┐
                                 │ OrderItems           │
                                 ├──────────────────────┤
                                 │ PK FK  OrderID       │
                                 │ PK     LineNumber    │
                                 │        Quantity      │
                                 └──────────────────────┘
```

```sql
CREATE TABLE Customers (
    CustomerID INT          PRIMARY KEY,
    Name       VARCHAR(100) NOT NULL,
    Email      VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Orders (
    OrderID    INT  PRIMARY KEY,
    CustomerID INT  NOT NULL,
    OrderDate  DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
);

CREATE TABLE OrderItems (
    OrderID    INT NOT NULL,
    LineNumber INT NOT NULL,
    Quantity   INT NOT NULL,
    PRIMARY KEY (OrderID, LineNumber),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID) ON DELETE CASCADE
);
```

## Common Mistakes

1. **Line without a foreign key column:** A line between two tables creates no reference as long as the foreign key column is missing from the table on the N side.
2. **Foreign key on the 1 side:** A column `OrderID` in `Customers` can hold only one order per customer.
3. **N:M without a junction table:** A foreign key column holds one value per row, so a foreign key in either table limits that side to one partner.
4. **Junction table with only a surrogate key:** If the pair of foreign keys is neither the primary key nor `UNIQUE`, the same student can enroll in the same course twice.
5. **ER notation in the schema:** Diamonds, attribute ellipses and relationship names belong to the ER diagram. The schema shows tables, `PK` and `FK` markers and references.
6. **Reserved words as table names:** `ORDER` and `GROUP` are reserved in SQL and must be quoted in every statement or replaced when used as table names.

## See Also

- [ER Model](./er-model.md): the conceptual model the schema is derived from
- [Database Development Phases](./database-development-phases.md): where the schema sits between the conceptual and the physical phase
- [Normalization](./normalization.md): checking the tables of a schema for redundancy
- [SQL Sublanguages](./sql-sublanguages.md): `CREATE TABLE` and the other DDL statements
