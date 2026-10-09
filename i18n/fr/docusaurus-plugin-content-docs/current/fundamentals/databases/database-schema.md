---
title: "Schéma de base de données"
description: "Le schéma de base de données relationnelle : tables, clés, notation, transformation d'un modèle ER en tables et intégrité référentielle."
keywords:
    - "Schéma de base de données"
    - "Schéma relationnel"
    - "Modèle relationnel"
    - "Clé primaire"
    - "Clé étrangère"
    - "Clé composite"
    - "Table de jonction"
    - "Intégrité référentielle"
    - "Conception de base de données"
tags:
    - ap2
machine_translated: true
---

# Schéma de base de données

Un schéma de base de données décrit la structure d'une base de données relationnelle : ses tables, leurs colonnes avec les types de données, les clés et les références entre les tables. Contrairement au [modèle ER](./er-model.md), il est lié au modèle relationnel. Les associations n'existent plus comme éléments à part entière et sont exprimées par des clés étrangères et des tables de jonction. Le schéma est créé lors de la phase sémantique du [développement de la base de données](./database-development-phases.md) et implémenté lors de la phase physique avec des instructions `CREATE TABLE`.

## Terminologie {/*#terminology*/}

| Terme relationnel   | Terme courant           | Signification                                                    |
| ------------------- | ----------------------- | ---------------------------------------------------------------- |
| Relation            | Table                   | Ensemble de lignes ayant les mêmes attributs                     |
| N-uplet (tuple)     | Ligne, enregistrement   | Une entrée d'une table                                           |
| Attribut            | Colonne                 | Une propriété que possède chaque ligne de la table               |
| Domaine             | Type de données         | Ensemble des valeurs qu'un attribut peut prendre                 |
| Schéma de relation  | Définition de table     | Nom de la table et ses attributs                                 |
| Schéma de base de données | Structure de la base de données | Tous les schémas de relation d'une base de données et leurs contraintes |

## Clés {/*#keys*/}

- **Clé candidate :** Un ensemble minimal d'attributs qui identifie de manière unique chaque ligne. Une table peut en avoir plusieurs, par ex. `CustomerID` et `Email`.
- **Clé primaire (PK) :** La clé candidate choisie pour identifier les lignes. Elle doit être unique et ne doit pas être `NULL`.
- **Clé composite :** Une clé constituée de plusieurs attributs, par ex. `(OrderID, LineNumber)`.
- **Clé étrangère (FK) :** Un ou plusieurs attributs qui référencent la clé primaire d'une autre table ou de la même table. Elle peut aussi faire partie de la clé primaire, comme dans une table de jonction ou la table d'une entité faible.
- **Clé naturelle :** Une clé issue des données elles-mêmes, par ex. un ISBN.
- **Clé de substitution (surrogate) :** Une clé artificielle sans signification en dehors de la base de données, généralement un nombre auto-incrémenté ou un UUID.

## Notation {/*#notation*/}

### Notation textuelle {/*#textual-notation*/}

Chaque table est écrite sous la forme de son nom suivi de ses attributs entre parenthèses :

| Marquage                                                 | Signification                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Souligné                                                 | Clé primaire ; pour une clé composite, chaque partie est soulignée             |
| `#` ou `↑` en tête, parfois un soulignement en pointillés | Clé étrangère                                                  |
| Suffixe `PK` ou `FK`                               | Remplacement en texte brut lorsque le soulignement n'est pas possible          |

Un attribut qui est à la fois clé primaire et clé étrangère est souligné et marqué avec `#`.

### Diagramme de tables {/*#table-diagram*/}

- **Rectangle :** Une table, avec le nom de la table en en-tête et les colonnes sous la ligne
- **`PK` et `FK` :** Marqueur devant une colonne ; `PK FK` désigne une colonne qui est les deux à la fois
- **Ligne :** Référence de clé étrangère entre deux tables
- **Extrémités de ligne :** Cardinalité, soit `1` soit `N`

## Transformation à partir d'un modèle ER {/*#transformation-from-an-er-model*/}

| Élément ER                              | Schéma de base de données                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Type d'entité                           | Table                                                                                                  |
| Attribut                                | Colonne                                                                                                |
| Attribut clé                            | Clé primaire                                                                                           |
| Attribut composé                        | Une colonne par sous-attribut, par ex. `Street`, `City`, `ZIP`                                         |
| Attribut multivalué                     | Table distincte avec une clé étrangère vers le propriétaire, par ex. `PhoneNumbers (#CustomerID, Number)`         |
| Attribut dérivé                         | Généralement non stocké, mais calculé dans la requête                                                  |
| Association 1:1                         | Clé étrangère avec une contrainte `UNIQUE` dans l'une des deux tables                                   |
| Association 1:N                         | Clé étrangère dans la table du côté N                                                                  |
| Association N:M                         | Table de jonction dont la clé primaire est constituée des clés étrangères vers les deux tables         |
| Attribut d'association                   | Colonne dans la table contenant la clé étrangère, pour N:M dans la table de jonction                   |
| Entité faible                           | Table dont la clé primaire combine la clé primaire du propriétaire (aussi clé étrangère) et la clé partielle |
| Participation totale du côté N          | Clé étrangère déclarée `NOT NULL`                                                                         |

Une association N:M entre étudiants et cours avec l'attribut d'association `EnrolledOn` :

```text
Students    (StudentID, Name)
             ─────────
Courses     (CourseID, Title)
             ────────
Enrollments (#StudentID, #CourseID, EnrolledOn)
             ──────────  ─────────
```

## Intégrité référentielle {/*#referential-integrity*/}

Chaque valeur de clé étrangère doit correspondre à une valeur de clé primaire existante dans la table référencée, ou être `NULL` lorsque la colonne l'autorise. Le SGBD rejette une insertion ou une mise à jour qui viole cette règle. Ce qui se passe lorsqu'une ligne référencée est supprimée (`ON DELETE`) ou que sa clé primaire est modifiée (`ON UPDATE`) est défini pour chaque clé étrangère :

| Option                   | Effet de la suppression de la ligne référencée                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `RESTRICT` / `NO ACTION` | La suppression est rejetée tant que des lignes la référencent (par défaut)                            |
| `CASCADE`                | Les lignes qui la référencent sont aussi supprimées, par ex. les postes d'une commande supprimée           |
| `SET NULL`               | La clé étrangère est mise à `NULL` ; la colonne doit autoriser `NULL`                               |

## Exemple : gestion des commandes {/*#example-order-management*/}

L'exemple du [modèle ER](./er-model.md) devient trois tables. L'association 1:N `places` se transforme en la clé étrangère `CustomerID` dans `Orders`. L'association identifiante `contains` fait de `OrderID` une partie de la clé primaire de `OrderItems`.

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

## Erreurs fréquentes {/*#common-mistakes*/}

1. **Ligne sans colonne de clé étrangère :** Une ligne entre deux tables ne crée aucune référence tant que la colonne de clé étrangère est absente de la table du côté N.
2. **Clé étrangère du côté 1 :** Une colonne `OrderID` dans `Customers` ne peut contenir qu'une seule commande par client.
3. **N:M sans table de jonction :** Une colonne de clé étrangère contient une valeur par ligne, de sorte qu'une clé étrangère dans l'une ou l'autre table limite ce côté à un seul partenaire.
4. **Table de jonction avec seulement une clé de substitution :** Si la paire de clés étrangères n'est ni la clé primaire ni `UNIQUE`, le même étudiant peut s'inscrire deux fois au même cours.
5. **Notation ER dans le schéma :** Les losanges, les ellipses d'attributs et les noms d'associations appartiennent au diagramme ER. Le schéma montre des tables, des marqueurs `PK` et `FK` et des références.
6. **Mots réservés comme noms de tables :** `ORDER` et `GROUP` sont réservés en SQL et doivent être mis entre guillemets dans chaque instruction ou remplacés lorsqu'ils sont utilisés comme noms de tables.

## Voir aussi {/*#see-also*/}

- [Modèle ER](./er-model.md) : le modèle conceptuel dont le schéma est dérivé
- [Phases de développement d'une base de données](./database-development-phases.md) : la place du schéma entre la phase conceptuelle et la phase physique
- [Normalisation](./normalization.md) : vérification de la redondance dans les tables d'un schéma
- [Sous-langages SQL](./sql-sublanguages.md) : `CREATE TABLE` et les autres instructions DDL
