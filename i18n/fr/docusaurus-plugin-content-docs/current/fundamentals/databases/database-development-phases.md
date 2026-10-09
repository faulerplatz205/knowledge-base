---
title: "Phases de développement d'une base de données"
description: "Aperçu des quatre phases du développement d'une base de données : externe, conceptuelle, sémantique et physique."
keywords:
    - "conception de base de données"
    - "développement de base de données"
    - "modèle ER"
    - "conception conceptuelle"
    - "conception physique"
    - "normalisation"
tags:
    - ap2
machine_translated: true
---

# Phases de développement d'une base de données

Le développement d'une base de données se décompose généralement en quatre phases successives, chacune produisant un artefact plus concret que la précédente.

## 1. Phase externe {/*#1-external-phase*/}

Recueillir et analyser les exigences de tous les futurs utilisateurs et groupes de parties prenantes. L'objectif est de comprendre quelles données le système doit gérer et quelles opérations il doit prendre en charge, sans encore réfléchir à la structure de la base de données.

Les livrables typiques sont des documents d'exigences et des descriptions informelles des données et des règles de gestion.

## 2. Phase conceptuelle {/*#2-conceptual-phase*/}

Traduire les exigences en un modèle de données abstrait, indépendant de l'implémentation. L'outil standard pour cela est le [**modèle entité-association (ERM)**](./er-model.md), qui représente les entités, leurs attributs et les associations entre elles.

Le modèle conceptuel est indépendant de la technologie : il décrit *quelle* forme ont les données, et non *comment* elles seront stockées.

## 3. Phase sémantique {/*#3-semantic-phase*/}

Affiner et formaliser le modèle conceptuel en définissant précisément les contraintes d'intégrité, les cardinalités et les règles de gestion. L'ERM est ensuite transformé en un [**schéma de base de données relationnelle**](./database-schema.md) (tables, colonnes, clés primaires, clés étrangères).

Cette phase comprend également la [**normalisation**](./normalization.md), qui élimine la redondance et les anomalies.

## 4. Phase physique {/*#4-physical-phase*/}

Implémenter le modèle relationnel dans un SGBD concret (par ex. PostgreSQL, MySQL). Cette phase comprend :

- L'écriture d'instructions `CREATE TABLE` avec des types de données appropriés
- La définition d'index pour optimiser les performances des requêtes
- La configuration des paramètres de stockage propres au SGBD choisi
- La mise en place du contrôle d'accès et des politiques de sécurité

Le modèle physique est étroitement lié au système cible et peut différer d'un produit SGBD à l'autre.
