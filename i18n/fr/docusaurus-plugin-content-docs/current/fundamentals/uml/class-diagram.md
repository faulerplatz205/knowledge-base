---
title: "Diagramme de classes"
description: "Explication complète des diagrammes de classes UML. Structure, visibilité, relations, cardinalité, bonnes pratiques et un exemple basé sur un système de bibliothèque."
keywords:
    - UML
    - Diagramme de classes
last_update:
    author: moritz-grimm
tags:
    - ap2
machine_translated: true
---

# Diagramme de classes

## Définition {/*#definition*/}

Un diagramme de classes est un diagramme UML structurel qui visualise la structure statique d'un système en montrant les classes, leurs attributs, leurs méthodes et les relations qui les lient. C'est l'un des diagrammes les plus utilisés en programmation orientée objet et en conception logicielle.

## Objectif {/*#purpose*/}

Les diagrammes de classes servent à :

- Modéliser la structure d'un système
- Visualiser les relations entre classes
- Planifier l'architecture logicielle avant l'implémentation
- Documenter la structure d'un code existant
- Communiquer les décisions de conception aux membres de l'équipe

## Composants {/*#components*/}

### Classes {/*#classes*/}

Une classe est représentée par un rectangle divisé en trois compartiments :

```text
┌─────────────────┐
│   ClassName     │  ← Class name (PascalCase)
├─────────────────┤
│   - attribute   │  ← Attributes (camelCase)
│   # attribute   │
├─────────────────┤
│   + method()    │  ← Methods (camelCase)
└─────────────────┘
```

### Attributs {/*#attributes*/}

Les attributs représentent les données et propriétés d'une classe.

**Syntaxe :** `visibility name: dataType`

Exemple : `- email: String`

### Méthodes {/*#methods*/}

Les méthodes représentent le comportement et les fonctions d'une classe.

**Syntaxe :** `visibility methodName(parameter: type): returnType`

Exemple : `+ getName(): String`

### Modificateurs de visibilité {/*#visibility-modifiers*/}

| Symbole | Visibilité | Signification                                  | Quand l'utiliser                  |
| ------- | ---------- | ---------------------------------------------- | --------------------------------- |
| `-`     | Privée     | Accessible uniquement au sein de la classe     | Par défaut pour les attributs     |
| `#`     | Protégée   | Accessible dans la classe et ses sous-classes  | Pour les attributs hérités        |
| `+`     | Publique   | Accessible de partout                          | Par défaut pour les méthodes      |
| `~`     | Paquetage  | Accessible au sein du même paquetage           | Rarement utilisée                 |

## Relations {/*#relationships*/}

### Association {/*#association*/}

Relation générale entre deux classes, indiquant que les objets de l'une sont reliés aux objets de l'autre.

**Notation :** ligne continue reliant deux classes

**Exemple :** un `Customer` est associé à un `Order`

```text
Customer ────── Order
```

### Agrégation (propriété faible) {/*#aggregation-weak-ownership*/}

Type particulier d'association où une classe est un conteneur pour une autre, mais où la classe contenue peut exister indépendamment.

**Notation :** losange vide du côté du conteneur

**Exemple :** une `Library` possède des `Books`, mais les livres peuvent exister sans la bibliothèque

```text
Library ◇────── Book
```

**À retenir :** si le conteneur est détruit, les objets contenus survivent.

### Composition (propriété forte) {/*#composition-strong-ownership*/}

Forme plus forte d'agrégation où la classe contenue ne peut pas exister sans le conteneur.

**Notation :** losange plein du côté du conteneur

**Exemple :** un `Book` possède des `Chapters`, les chapitres ne peuvent pas exister sans le livre

```text
Book ◆────── Chapter
```

**À retenir :** si le conteneur est détruit, les objets contenus le sont aussi.

### Héritage {/*#inheritance*/}

Représente une relation où une classe (sous-classe/enfant) hérite des attributs et des méthodes d'une autre classe (superclasse/parent).

**Notation :** flèche à pointe vide dirigée vers la classe parente

**Exemple :** `Dog` et `Cat` héritent de `Animal`

```text
      Animal
         △
         │
    ┌────┴────┐
    │         │
   Dog       Cat
```

**Important :** les attributs hérités dans la classe parente devraient utiliser la visibilité `protected` (`#`) afin que les sous-classes puissent y accéder.

## Cardinalité (multiplicité) {/*#cardinality-multiplicity*/}

La cardinalité indique combien d'instances d'une classe peuvent être associées à des instances d'une autre classe.

| Notation          | Signification      | Exemple                                                    |
| ----------------- | ------------------ | ---------------------------------------------------------- |
| `1`           | Exactement un      | Une personne a exactement une date de naissance            |
| `0..1`           | Zéro ou un         | Une personne peut avoir zéro ou un permis de conduire      |
| `*` ou `0..*` | Zéro ou plus      | Une bibliothèque peut avoir zéro livre ou plus             |
| `1..*`           | Un ou plus         | Un livre a une page ou plus                                |
| `n..m`           | Plage précise      | Un cours compte de 5 à 30 étudiants                        |

**Placement :** la cardinalité est placée près de la classe qu'elle décrit.

```text
Library 1 ────── 0..* Book
```

Lecture : une bibliothèque peut avoir zéro livre ou plus

## Conventions de nommage {/*#naming-conventions*/}

### Règles générales {/*#general-rules*/}

1. **Noms de classes :** commencent par une majuscule (PascalCase)
   - ✅ `Customer`, `ShoppingCart`
   - ❌ `customer`, `shopping_cart`

2. **Attributs et méthodes :** commencent par une minuscule (camelCase)
   - ✅ `firstName`, `calculateTotal()`
   - ❌ `FirstName`, `CalculateTotal()`

3. **Pas de trémas ni de caractères spéciaux**
   - ✅ `doppelgaenger`
   - ❌ `doppelgänger`

4. **Attributs booléens :** préfixés par `is`, `has` ou `can`
   - ✅ `isActive`, `hasPermission`

5. **Noms de méthodes :** utiliser des verbes
   - ✅ `calculateTotal()`, `saveData()`
   - ❌ `total()`, `data()`

## Bonnes pratiques {/*#best-practices*/}

### Visibilité des attributs {/*#attribute-visibility*/}

- **Par défaut :** utiliser `private` (`-`) pour tous les attributs
- **Exception :** utiliser `protected` (`#`) pour les attributs destinés à être hérités par des sous-classes
- **À éviter :** rendre les attributs `public` sauf nécessité absolue

### Visibilité des méthodes {/*#method-visibility*/}

- **Par défaut :** utiliser `public` (`+`) pour les méthodes qui forment l'interface de la classe
- **Utiliser `private` :** pour les méthodes auxiliaires employées uniquement au sein de la classe

### Classes abstraites {/*#abstract-classes*/}

Les classes abstraites sont indiquées par :

- Le nom de la classe écrit en *italique*
- Ou l'ajout de `<<abstract>>` au-dessus du nom de la classe

```text
┌────────────────────────┐
│   <<abstract>>         │
│      Vehicle           │
├────────────────────────┤
│ # licensePlate: String │
├────────────────────────┤
│ + startEngine(): void  │
└────────────────────────┘
```

### Interfaces {/*#interfaces*/}

Les interfaces sont indiquées en ajoutant `<<interface>>` au-dessus du nom de l'interface.

## Exemple complet : système de bibliothèque {/*#complete-example-library-system*/}

Cet exemple illustre tous les concepts importants des diagrammes de classes.

### Scénario {/*#scenario*/}

Un système simple de gestion de bibliothèque avec des livres, des magazines, des utilisateurs et une fonction d'emprunt.

### Aperçu des classes {/*#classes-overview*/}

- Medium (classe parente abstraite)
  - Classe abstraite représentant tout élément empruntable
  - Les attributs sont `protected` car ils sont hérités

- Book (hérite de Medium)
  - Type spécifique de média
  - Possède une relation de composition avec les chapitres

- Magazine (hérite de Medium)
  - Autre type spécifique de média

- Chapter
  - Partie d'un livre (composition)
  - Ne peut pas exister sans livre

- Library
  - Contient des médias (agrégation)
  - Les médias peuvent exister sans la bibliothèque

- Media
  - Fait partie de la bibliothèque (agrégation)
  - Peut exister sans la bibliothèque

- User
  - Peut emprunter des médias (association)

### Détail des classes {/*#class-details*/}

#### Medium (abstraite) {/*#medium-abstract*/}

```text
┌────────────────────────────┐
│     <<abstract>>           │
│        Medium              │
├────────────────────────────┤
│ # titel: String            │
│ # isbn: String             │
├────────────────────────────┤
│ + borrowMedium(): boolean  │
│ + returnMedium(): void     │
└────────────────────────────┘
```

#### Book {/*#book*/}

```text
┌─────────────────────────┐
│         Book            │
├─────────────────────────┤
│ - author: String        │
│ - numberOfPages: int    │
├─────────────────────────┤
│ + getAuthor(): String   │
└─────────────────────────┘
```

#### Magazine {/*#magazine*/}

```text
┌────────────────────────┐
│       Magazine         │
├────────────────────────┤
│ - edition: int         │
│ - releaseDate: Date    │
├────────────────────────┤
│ + getEdition(): int    │
└────────────────────────┘
```

#### Chapter {/*#chapter*/}

```text
┌─────────────────────────┐
│       Chapter           │
├─────────────────────────┤
│ - chapterNumber: int    │
│ - headline: String      │
├─────────────────────────┤
└─────────────────────────┘
```

#### Library {/*#library*/}

```text
┌──────────────────────────────────────────┐
│            Library                       │
├──────────────────────────────────────────┤
│ - name: String                           │
│ - adress: String                         │
├──────────────────────────────────────────┤
│ + addMedium(medium: Medium): void        │
│ + removeMedium(medium: Medium): boolean  │
└──────────────────────────────────────────┘
```

#### Utilisateur {/*#benutzer*/}

```text
┌─────────────────────────────────────────┐
│           User                          │
├─────────────────────────────────────────┤
│ - userId: int                           │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Relations {/*#relationships-1*/}

1. **Héritage :**
   - `Book` hérite de `Medium`
   - `Magazine` hérite de `Medium`

2. **Composition :** `Book ◆────── 1..* Chapter`
   - Un livre doit avoir au moins un chapitre
   - Les chapitres ne peuvent pas exister sans leur livre

3. **Agrégation :** `Library ◇────── 0..* Medium`
   - Une bibliothèque peut avoir zéro média ou plus
   - Les médias peuvent exister indépendamment de la bibliothèque

4. **Association :** `User ────── * Medium` (libellée "borrows")
   - Les utilisateurs peuvent emprunter plusieurs médias
   - Un média peut être emprunté par plusieurs utilisateurs au fil du temps

### Représentation visuelle {/*#visual-representation*/}

```text
                    ┌────────────────────────────┐
                    │     <<abstract>>           │
                    │        Medium              │
                    ├────────────────────────────┤
                    │ # titel: String            │
                    │ # isbn: String             │
                    ├────────────────────────────┤
                    │ + borrowMedium(): boolean  │
                    │ + returnMedium(): void     │
                    └───────────┬────────────────┘
                                △
                                │ (inheritance)
                    ┌───────────┴───────────┐
                    │                       │
        ┌───────────┴──────────┐   ┌────────┴──────────────┐
        │       Book           │   │    Magazine           │
        ├──────────────────────┤   ├───────────────────────┤
        │ - author: String     │   │ - edition: int        │
        │ - numberOfPages: int │   │ - releaseDate: Date   │
        ├──────────────────────┤   ├───────────────────────┤
        │ + getAuthor()        │   │ + getEdition()        │
        └─────────┬────────────┘   └───────────────────────┘
                  │
                  │ ◆ (composition)
                  │ 1..*
        ┌─────────┴────────────┐
        │      Chapter         │
        ├──────────────────────┤
        │ - chapterNumber: int │
        │ - headline: String   │
        └──────────────────────┘


┌────────────────────────┐                *  ┌────────────────┐
│        Library         │ ◇──────────────   │    Medium     │
├────────────────────────┤  (aggregation)    └────────────────┘
│ - name: String         │
│ - adress: String       │
├────────────────────────┤
│ + mediumHinzufuegen()  │
│ + mediumEntfernen()    │
└────────────────────────┘


┌─────────────────────────────────────────┐ 1         borrows         *  ┌─────────────────┐
│     User                                │ ───────────────────────────  │     Medium      │
├─────────────────────────────────────────┤        (association)         └─────────────────┘
│ - benutzerId: int                       │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Enseignements clés de cet exemple {/*#key-takeaways-from-this-example*/}

1. **Attributs protégés dans Medium :** `titel` et `isbn` sont protégés (`#`) afin que `Buch` et `Zeitschrift` puissent en hériter
2. **Composition vs agrégation :** les chapitres appartiennent fortement aux livres (composition), tandis que les médias peuvent exister sans bibliothèque (agrégation)
3. **Héritage :** `Buch` et `Zeitschrift` héritent tous deux d'un comportement commun de `Medium`
4. **Cardinalité :** un livre doit avoir au moins un chapitre (`1..*`), mais une bibliothèque peut n'avoir aucun média (`0..*`)

## Erreurs courantes à éviter {/*#common-mistakes-to-avoid*/}

1. **Utiliser des attributs publics :** utiliser presque toujours private ou protected
2. **Oublier la cardinalité :** toujours préciser combien d'instances peuvent être reliées
3. **Mauvais type de relation :** comprendre la différence entre agrégation et composition
4. **Nommage incohérent :** utiliser camelCase pour les attributs et méthodes, PascalCase pour les classes

## Outils pour créer des diagrammes de classes {/*#tools-for-creating-class-diagrams*/}

- draw.io / diagrams.net (gratuit, dans le navigateur)
- Lucidchart (version gratuite limitée)
- PlantUML (textuel, nécessite une installation)
- Visual Paradigm
- StarUML

## Voir aussi {/*#see-also*/}

- [Diagramme d'objets](./further-uml-diagrams.md#object-diagram) : un instantané concret d'instances à un moment donné
- [Diagramme de séquence](./sequence-diagram.md) : l'interaction entre objets de ces classes au fil du temps
- [Diagramme de cas d'utilisation](./use-case-diagram.md) : le pendant comportemental, montrant quels services ces classes fournissent aux acteurs
- [Modèle ER](../databases/er-model.md) : le pendant relationnel, décrivant comment les attributs de ces classes sont persistés dans des tables
