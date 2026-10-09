---
title: "Resumen de bases de datos"
description: "Un resumen de las bases de datos relacionales y no relacionales, conceptos básicos como la normalización y ACID, y sistemas de bases de datos habituales."
keywords:
    - Bases de datos
    - SQL
    - NoSQL
    - Base de datos relacional
    - ACID
    - Normalización
    - PostgreSQL
    - MongoDB
tags:
    - ap2
machine_translated: true
---

# Resumen de bases de datos

## Resumen {/*#overview*/}

Una base de datos es una colección organizada de datos estructurados gestionada por un sistema gestor de bases de datos (SGBD). Los dos paradigmas principales son las bases de datos **relacionales (SQL)** y las **no relacionales (NoSQL)**.

## Bases de datos relacionales (SQL) {/*#relational-databases-sql*/}

Los datos se almacenan en **tablas** con filas y columnas. Cada conjunto de datos se identifica de forma única con una **clave primaria** y las tablas se vinculan mediante **claves foráneas**, formando un esquema estructurado.

- Los datos se consultan con **SQL** (Structured Query Language)
- El esquema se define de antemano y lo aplica la base de datos
- Es la opción más adecuada para datos estructurados con relaciones claras

**Sistemas habituales**: PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Oracle DB

### Conceptos clave {/*#key-concepts*/}

**[Normalización](./normalization.md)**: Organización de las tablas para reducir la redundancia de datos:

- **1FN**: Valores atómicos, sin grupos repetidos
- **2FN**: Sin dependencias parciales de claves compuestas
- **3FN**: Sin dependencias transitivas

**Propiedades ACID**: Garantías para transacciones fiables:

- **Atomicidad**: Una transacción se completa con éxito en su totalidad o falla en su totalidad
- **Consistencia**: Los datos pasan siempre de un estado válido a otro
- **Aislamiento**: Las transacciones concurrentes no interfieren entre sí
- **Durabilidad**: Los cambios confirmados persisten incluso tras un fallo

## Bases de datos no relacionales (NoSQL) {/*#non-relational-databases-nosql*/}

Diseñadas para el almacenamiento flexible y escalable de datos no estructurados o semiestructurados. No requieren un esquema fijo.

| Tipo                | Descripción                                          | Sistemas de ejemplo |
| ------------------- | ---------------------------------------------------- | ------------------- |
| Documentos          | Almacena documentos de tipo JSON                     | MongoDB, CouchDB    |
| Clave-valor         | Pares sencillos clave => valor                       | Redis, DynamoDB     |
| Familia de columnas | Optimizada para lecturas/escrituras por columnas     | Apache Cassandra    |
| Grafos              | Nodos y aristas para datos con muchas relaciones     | Neo4j               |

## Relacional frente a NoSQL {/*#relational-vs-nosql*/}

|                     | Relacional                          | NoSQL                                              |
| ------------------- | ----------------------------------- | -------------------------------------------------- |
| Esquema             | Fijo, predefinido                   | Flexible / sin esquema                             |
| Lenguaje de consulta | SQL                                | Variable (p. ej., MongoDB Query Language)          |
| Escalado            | Vertical (scale up)                 | Horizontal (scale out)                             |
| Consistencia        | Fuerte (ACID)                       | A menudo consistencia eventual                     |
| Idóneo para         | Datos estructurados, joins complejos | Gran escala, datos flexibles o jerárquicos        |
