---
title: "Aperçu des bases de données"
description: "Aperçu des bases de données relationnelles et non relationnelles, des concepts clés comme la normalisation et ACID, et des systèmes de bases de données courants."
keywords:
    - "Bases de données"
    - "SQL"
    - "NoSQL"
    - "Base de données relationnelle"
    - "ACID"
    - "Normalisation"
    - "PostgreSQL"
    - "MongoDB"
tags:
    - ap2
machine_translated: true
---

# Aperçu des bases de données

## Aperçu {/*#overview*/}

Une base de données est un ensemble organisé de données structurées gérées par un système de gestion de base de données (SGBD). Les deux principaux paradigmes sont les bases de données **relationnelles (SQL)** et **non relationnelles (NoSQL)**.

## Bases de données relationnelles (SQL) {/*#relational-databases-sql*/}

Les données sont stockées dans des **tables** composées de lignes et de colonnes. Chaque enregistrement est identifiable de manière unique par une **clé primaire**, et les tables sont reliées par des **clés étrangères**, ce qui forme un schéma structuré.

- Les données sont interrogées avec **SQL** (Structured Query Language)
- Le schéma est défini au préalable et appliqué par la base de données
- Convient particulièrement aux données structurées avec des relations claires

**Systèmes courants :** PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Oracle DB

### Concepts clés {/*#key-concepts*/}

**[Normalisation](./normalization.md) :** Organisation des tables pour réduire la redondance des données :

- **1NF :** Valeurs atomiques, pas de groupes répétitifs
- **2NF :** Pas de dépendances partielles vis-à-vis des clés composites
- **3NF :** Pas de dépendances transitives

**Propriétés ACID :** Garanties pour des transactions fiables :

- **Atomicité :** Une transaction réussit entièrement ou échoue entièrement
- **Cohérence :** Les données passent toujours d'un état valide à un autre
- **Isolation :** Les transactions concurrentes n'interfèrent pas entre elles
- **Durabilité :** Les modifications validées persistent même après une panne

## Bases de données non relationnelles (NoSQL) {/*#non-relational-databases-nosql*/}

Conçues pour le stockage flexible et évolutif de données non structurées ou semi-structurées. Aucun schéma fixe n'est requis.

| Type              | Description                                          | Exemples de systèmes |
| ----------------- | ---------------------------------------------------- | -------------------- |
| Document          | Stocke des documents de type JSON                    | MongoDB, CouchDB     |
| Clé-valeur        | Simples paires clé => valeur                         | Redis, DynamoDB      |
| Famille de colonnes | Optimisée pour les lectures/écritures en colonnes  | Apache Cassandra     |
| Graphe            | Nœuds et arêtes pour des données riches en relations | Neo4j                |

## Relationnel et NoSQL {/*#relational-vs-nosql*/}

|                     | Relationnel                              | NoSQL                                                |
| ------------------- | ---------------------------------------- | ---------------------------------------------------- |
| Schéma              | Fixe, prédéfini                          | Flexible / sans schéma                               |
| Langage de requête  | SQL                                      | Variable (par ex. MongoDB Query Language)            |
| Mise à l'échelle    | Verticale (scale up)                     | Horizontale (scale out)                              |
| Cohérence           | Forte (ACID)                             | Souvent cohérence à terme                            |
| Idéal pour          | Données structurées, jointures complexes | Grande échelle, données flexibles ou hiérarchiques   |
