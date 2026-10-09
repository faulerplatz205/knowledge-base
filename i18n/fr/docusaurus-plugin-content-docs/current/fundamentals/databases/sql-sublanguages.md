---
title: "Sous-langages SQL"
description: ""
keywords:
    - "SQL"
    - "Sous-langages"
    - "DDL"
    - "DML"
    - "DQL"
    - "DCL"
    - "Langage de définition de données"
    - "Langage de manipulation de données"
    - "Langage de requête de données"
    - "Langage de contrôle de données"
    - "Base de données"
    - "Bases de données"
    - "Base de données relationnelle"
tags:
    - ap2
machine_translated: true
---

# Sous-langages SQL

## DDL (Data Definition Language) {/*#ddl-data-definition-language*/}

Les commandes DDL définissent et gèrent la structure d'une base de données, c'est-à-dire ses tables, colonnes, contraintes et index.

**Commandes courantes :**

- `CREATE` : crée une nouvelle table, une vue, un index ou une base de données
- `ALTER` : modifie une structure existante (par ex. ajout ou suppression d'une colonne)
- `DROP` : supprime définitivement une table ou une base de données
- `TRUNCATE` : supprime toutes les lignes d'une table sans supprimer la table elle-même

## DML (Data Manipulation Language) {/*#dml-data-manipulation-language*/}

Les commandes DML servent à modifier les données stockées proprement dites.

**Commandes courantes :**

- `INSERT` : ajoute de nouvelles lignes à une table
- `UPDATE` : modifie des lignes existantes
- `DELETE` : supprime des lignes d'une table

## DQL (Data Query Language) {/*#dql-data-query-language*/}

Le DQL sert à interroger et à récupérer des données de la base sans les modifier.

**Commandes courantes :**

- `SELECT` : récupère des lignes d'une ou de plusieurs tables, avec filtrage, regroupement ou tri facultatifs

## DCL (Data Control Language) {/*#dcl-data-control-language*/}

Le DCL gère les droits d'accès et les autorisations des utilisateurs de la base de données.

**Commandes courantes :**

- `GRANT` : accorde à un utilisateur l'autorisation d'effectuer des actions précises
- `REVOKE` : retire des autorisations accordées précédemment
