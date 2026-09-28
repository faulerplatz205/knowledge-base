---
title: "ER Model"
description: "An overview of the Entity-Relationship model: entities, attributes, relationships, cardinality, weak entities and Chen notation."
keywords:
    - "ER Model"
    - "Entity-Relationship"
    - "Database Design"
    - "Data Modeling"
    - "Entities"
    - "Attributes"
    - "Relationships"
    - "Cardinality"
    - "Weak Entity"
    - "Chen Notation"
tags:
    - ap2
---

# ER Model

The Entity-Relationship (ER) model is a conceptual data model that describes the structure of a database at a high level and independently of any specific database system. It was introduced by Peter Chen in 1976. In the next design step, the ER model is transformed into a [database schema](./database-schema.md) made of tables, primary keys and foreign keys.

## Core Concepts

### Entities

An entity, also called an **entity instance**, is a uniquely identifiable object of the real world or of thought, e.g., a specific customer or a specific order. Entities of the same kind are grouped into **entity types** (e.g., `Customer`, `Product`, `Order`).

### Attributes

Attributes describe the properties of an entity type.

| Type        | Description                     | Example                         |
| ----------- | ------------------------------- | ------------------------------- |
| Simple      | Atomic, indivisible value       | `FirstName`, `Age`              |
| Composite   | Made up of sub-attributes       | `Address` = (Street, City, ZIP) |
| Multivalued | Can hold multiple values        | `PhoneNumbers`                  |
| Derived     | Computed from another attribute | `Age` derived from `BirthDate`  |

The **key attribute** uniquely identifies each entity instance, e.g., `CustomerID`. It then becomes the primary key in the database schema.

### Relationships

A relationship describes an association between two or more entity types. Like entities, relationships are grouped into **relationship types** (e.g., a `Customer` *places* an `Order`). The relationship type itself expresses this association, so the ER model contains no foreign keys. They only appear when the model is converted into the database schema. Relationships can also have their own attributes (e.g., a `WorksFor` relationship might carry a `StartDate`).

## Cardinality

Cardinality defines how many instances of one entity can be associated with instances of another.

| Type | Description                               | Example                                                             |
| ---- | ----------------------------------------- | ------------------------------------------------------------------- |
| 1:1  | One instance relates to exactly one other | One person has one passport                                         |
| 1:N  | One instance relates to many others       | One customer places many orders                                     |
| N:M  | Many instances relate to many others      | Students enroll in multiple courses; courses have multiple students |

**Participation** further specifies whether every entity instance must take part in a relationship:

- **Total participation** (mandatory): Every instance must be in at least one relationship, e.g., every order must belong to a customer.
- **Partial participation** (optional): Some instances may not participate, e.g., not every customer has placed an order.

## Weak Entities

A **weak entity** cannot be uniquely identified by its own attributes alone. It depends on a **strong (owner) entity** for its identity.

- The weak entity has a **partial key** (discriminator) that is unique only within the context of its owner.
- The relationship connecting a weak entity to its owner is called an **identifying relationship**.
- A weak entity always has total participation in its identifying relationship.

**Example:** `OrderItem` is a weak entity. Its partial key `LineNumber` is only unique within a specific `Order`. The full identity is `(OrderID, LineNumber)`.

## Notation

| Element                         | Represents                                 |
| ------------------------------- | ------------------------------------------ |
| Rectangle                       | Entity type                                |
| Double-lined rectangle          | Weak entity type                           |
| Diamond                         | Relationship type                          |
| Double-lined diamond            | Identifying relationship                   |
| Ellipse                         | Attribute                                  |
| Ellipse with an underlined name | Key attribute                              |
| Ellipse with a dashed underline | Partial key of a weak entity               |
| Double-lined ellipse            | Multivalued attribute                      |
| Dashed ellipse                  | Derived attribute                          |
| Ellipse with further ellipses   | Composite attribute and its sub-attributes |
| Single line                     | Partial participation                      |
| Double line                     | Total participation                        |
| `1`, `N`, `M` next to a line    | Cardinality                                |

**Important:** Unlike in a [table diagram](./database-schema.md#table-diagram) or a [UML class diagram](../uml/class-diagram.md), an entity's attributes are not written inside its rectangle. Each attribute gets its own ellipse, connected to the entity by a line.

## Example: Order Management

A `Customer` places `Orders`, each consisting of one or more `OrderItems`. Every order belongs to a customer and contains at least one item, so `Order` participates totally in both relationships. A customer without orders is allowed.

```text
  ╭────────────╮    ╭──────╮    ╭───────╮
  │ CustomerID │    │ Name │    │ Email │
  │ ────────── │    ╰───┬──╯    ╰───┬───╯
  ╰─────┬──────╯        │           │
        └───────────────┼───────────┘
                        │
                ┌───────┴───────┐
                │   Customer    │
                └───────┬───────┘
                        │ 1
                  ╱─────┴─────╲
                 ╱    places   ╲
                 ╲             ╱
                  ╲─────╥─────╱
                        ║ N
                ┌───────╨───────┐        ╭─────────╮
                │     Order     ├───┬────┤ OrderID │
                └───────╥───────┘   │    │ ─────── │
                        ║           │    ╰─────────╯
                        ║ 1         │    ╭───────────╮
                        ║           └────┤ OrderDate │
                  ╱═════╩═════╲          ╰───────────╯
                 ╱╱  contains ╲╲
                 ╲╲           ╱╱
                  ╲═════╦═════╱
                        ║ N
                ╔═══════╩═══════╗        ╭────────────╮
                ║   OrderItem   ╟───┬────┤ LineNumber │
                ╚═══════════════╝   │    │ ╌╌╌╌╌╌╌╌╌╌ │
                                    │    ╰────────────╯
                                    │    ╭──────────╮
                                    └────┤ Quantity │
                                         ╰──────────╯
```

## Common Mistakes

1. **Attributes inside the entity rectangle:** A rectangle with a list of columns is a table of a database schema, not a Chen entity type.
2. **Foreign keys as attributes:** `CustomerID` as an attribute of `Order` duplicates the `places` relationship and only belongs in the database schema as a foreign key.
3. **UML multiplicities in a Chen diagram:** Instead of UML ranges such as `1..*` or `0..1`, Chen uses `1`, `N` and `M` and expresses the minimum through single or double lines.
4. **Weak entity without an identifying relationship:** A double-lined rectangle requires a double-lined diamond connecting it to its owner.

## See Also

- [Database Schema](./database-schema.md): the tables, keys and transformation rules derived from an ER model
- [Database Development Phases](./database-development-phases.md): the ER model as the result of the conceptual phase
- [Normalization](./normalization.md): removing redundancy from the tables derived from an ER model
