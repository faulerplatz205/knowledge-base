---
title: "Normalisation"
description: "Aperçu des trois formes normales des bases de données (1NF, 2NF, 3NF) avec des exemples."
keywords:
    - "Normalisation"
    - "Base de données"
    - "Bases de données"
    - "1NF"
    - "2NF"
    - "3NF"
    - "Formes normales"
    - "Base de données relationnelle"
tags:
    - ap2
machine_translated: true
---

# Normalisation

## Aperçu {/*#overview*/}

La normalisation est le processus de structuration d'une base de données relationnelle visant à réduire la redondance des données et à améliorer leur intégrité. Chaque forme normale s'appuie sur la précédente.

## Redondance {/*#redundancy*/}

La redondance est la répétition inutile des mêmes données dans une base de données.

## Première forme normale (1NF) {/*#first-normal-form-1nf*/}

**Règle :** Chaque colonne doit contenir des valeurs atomiques (indivisibles), et chaque ligne doit être unique.

**Violation :** Une colonne `Phone` stockant plusieurs numéros dans une même cellule.

| CustomerID | Name  | Phone            |
| ---------- | ----- | ---------------- |
| 1          | Alice | 111-111, 222-222 |

**Corrigé :**

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

**Violation :** Plusieurs colonnes pour le même attribut.

| CustomerID | Name  | Phone1  | Phone2  |
| ---------- | ----- | ------- | ------- |
| 1          | Alice | 111-111 | 222-222 |

**Corrigé :**

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

## Deuxième forme normale (2NF) {/*#second-normal-form-2nf*/}

**Règle :** Doit être en 1NF, et chaque attribut non clé doit dépendre de **l'intégralité** de la clé primaire, et non d'une partie seulement

**Violation :** La table utilise `(OrderID, ProductID)` comme clé composite, mais `ProductName` ne dépend que de `ProductID`.

| OrderID | ProductID | ProductName | Quantity |
| ------- | --------- | ----------- | -------- |
| 1       | 42        | Keyboard    | 2        |
| 2       | 42        | Keyboard    | 1        |

**Corrigé :** Déplacer `ProductName` dans une table `Products` distincte.

**Orders :**

| OrderID | ProductID | Quantity |
| ------- | --------- | -------- |
| 1       | 42        | 2        |
| 2       | 42        | 1        |

**Products :**

| ProductID | ProductName |
| --------- | ----------- |
| 42        | Keyboard    |

## Troisième forme normale (3NF) {/*#third-normal-form-3nf*/}

**Règle :** Doit être en 2NF, et aucun attribut non clé ne doit dépendre d'un autre attribut non clé (pas de dépendances transitives).

**Violation :** `DepartmentHead` dépend de `Department`, et non directement de `EmployeeID`.

| EmployeeID | Department | DepartmentHead |
| ---------- | ---------- | -------------- |
| 1          | Sales      | Carol          |
| 2          | Sales      | Carol          |
| 3          | IT         | Dave           |

**Corrigé :** Déplacer `DepartmentHead` dans une table `Departments` distincte.

**Employees :**

| EmployeeID | Department |
| ---------- | ---------- |
| 1          | Sales      |
| 2          | Sales      |
| 3          | IT         |

**Departments :**

| Department | DepartmentHead |
| ---------- | -------------- |
| Sales      | Carol          |
| IT         | Dave           |

## Récapitulatif {/*#summary*/}

| Forme normale | Exigence                                                            |
| ------------- | ------------------------------------------------------------------- |
| 1NF           | Valeurs atomiques, pas de colonnes répétées, lignes uniques         |
| 2NF           | 1NF + pas de dépendances partielles vis-à-vis d'une clé composite   |
| 3NF           | 2NF + pas de dépendances transitives entre attributs non clés       |
