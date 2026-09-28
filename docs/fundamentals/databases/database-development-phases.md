---
title: "Database Development Phases"
description: "Overview of the four phases of database development: external, conceptual, semantic, and physical."
keywords:
    - "database design"
    - "database development"
    - "ER model"
    - "conceptual design"
    - "physical design"
    - "normalization"
tags:
    - ap2
---

# Database Development Phases

Developing a database is typically broken down into four successive phases, each producing a more concrete artifact than the last.

## 1. External Phase

Gather and analyze requirements from all future users and stakeholder groups. The goal is to understand what data the system must manage and what operations it must support, without yet thinking about how the database will be structured.

Typical outputs are requirement documents and informal descriptions of the data and business rules.

## 2. Conceptual Phase

Translate the requirements into an abstract, implementation-independent data model. The standard tool for this is the [**Entity-Relationship Model (ERM)**](./er-model.md), which captures entities, their attributes, and the relationships between them.

The conceptual model is technology-agnostic: it describes *what* the data looks like, not *how* it will be stored.

## 3. Semantic Phase

Refine and formalize the conceptual model by defining integrity constraints, cardinalities, and business rules precisely. The ERM is then transformed into a [**relational database schema**](./database-schema.md) (tables, columns, primary keys, foreign keys).

This phase also includes [**normalization**](./normalization.md), which eliminates redundancy and anomalies.

## 4. Physical Phase

Implement the relational model in a concrete DBMS (e.g. PostgreSQL, MySQL). This phase covers:

- Writing `CREATE TABLE` statements with appropriate data types
- Defining indexes to optimize query performance
- Configuring storage parameters specific to the chosen DBMS
- Setting up access control and security policies

The physical model is tightly coupled to the target system and may differ between DBMS products.
