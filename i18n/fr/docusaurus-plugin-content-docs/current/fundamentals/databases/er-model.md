---
title: "Modèle ER"
description: "Aperçu du modèle entité-association : entités, attributs, associations, cardinalité, entités faibles et notation de Chen."
keywords:
    - "Modèle ER"
    - "Entité-association"
    - "Conception de base de données"
    - "Modélisation des données"
    - "Entités"
    - "Attributs"
    - "Associations"
    - "Cardinalité"
    - "Entité faible"
    - "Notation de Chen"
tags:
    - ap2
machine_translated: true
---

# Modèle ER

Le modèle entité-association (ER) est un modèle de données conceptuel qui décrit la structure d'une base de données à un niveau élevé et indépendamment de tout système de base de données spécifique. Il a été introduit par Peter Chen en 1976. À l'étape de conception suivante, le modèle ER est transformé en un [schéma de base de données](./database-schema.md) composé de tables, de clés primaires et de clés étrangères.

## Concepts de base {/*#core-concepts*/}

### Entités {/*#entities*/}

Une entité, aussi appelée **instance d'entité**, est un objet identifiable de manière unique du monde réel ou de la pensée, par ex. un client précis ou une commande précise. Les entités de même nature sont regroupées en **types d'entités** (par ex. `Customer`, `Product`, `Order`).

### Attributs {/*#attributes*/}

Les attributs décrivent les propriétés d'un type d'entité.

| Type        | Description                       | Exemple                          |
| ----------- | --------------------------------- | -------------------------------- |
| Simple      | Valeur atomique, indivisible      | `FirstName`, `Age`               |
| Composé     | Constitué de sous-attributs       | `Address` = (rue, ville, code postal) |
| Multivalué  | Peut contenir plusieurs valeurs   | `PhoneNumbers`                   |
| Dérivé      | Calculé à partir d'un autre attribut | `Age` dérivé de `BirthDate`   |

L'**attribut clé** identifie de manière unique chaque instance d'entité, par ex. `CustomerID`. Il devient ensuite la clé primaire dans le schéma de base de données.

### Associations {/*#relationships*/}

Une association décrit un lien entre deux types d'entités ou plus. Comme les entités, les associations sont regroupées en **types d'associations** (par ex. un `Customer` *passe* une `Order`). Le type d'association exprime lui-même ce lien, de sorte que le modèle ER ne contient aucune clé étrangère. Les clés étrangères n'apparaissent que lors de la conversion du modèle en schéma de base de données. Les associations peuvent aussi avoir leurs propres attributs (par ex. une association `WorksFor` peut porter un `StartDate`).

## Cardinalité {/*#cardinality*/}

La cardinalité définit combien d'instances d'une entité peuvent être associées à des instances d'une autre.

| Type | Description                                      | Exemple                                                                  |
| ---- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| 1:1  | Une instance est liée à exactement une autre     | Une personne possède un passeport                                        |
| 1:N  | Une instance est liée à plusieurs autres         | Un client passe plusieurs commandes                                      |
| N:M  | Plusieurs instances sont liées à plusieurs autres | Les étudiants suivent plusieurs cours ; les cours ont plusieurs étudiants |

La **participation** précise en outre si chaque instance d'entité doit prendre part à une association :

- **Participation totale** (obligatoire) : Chaque instance doit figurer dans au moins une association, par ex. chaque commande doit appartenir à un client.
- **Participation partielle** (facultative) : Certaines instances peuvent ne pas participer, par ex. tous les clients n'ont pas passé de commande.

## Entités faibles {/*#weak-entities*/}

Une **entité faible** ne peut pas être identifiée de manière unique par ses seuls attributs. Elle dépend d'une **entité forte (propriétaire)** pour son identité.

- L'entité faible possède une **clé partielle** (discriminant) qui n'est unique que dans le contexte de son propriétaire.
- L'association qui relie une entité faible à son propriétaire est appelée **association identifiante**.
- Une entité faible a toujours une participation totale dans son association identifiante.

**Exemple :** `OrderItem` est une entité faible. Sa clé partielle `LineNumber` n'est unique qu'au sein d'un `Order` donné. L'identité complète est `(OrderID, LineNumber)`.

## Notation {/*#notation*/}

| Élément                              | Représente                                     |
| ------------------------------------ | ---------------------------------------------- |
| Rectangle                            | Type d'entité                                  |
| Rectangle à double trait             | Type d'entité faible                           |
| Losange                              | Type d'association                             |
| Losange à double trait               | Association identifiante                       |
| Ellipse                              | Attribut                                       |
| Ellipse avec un nom souligné         | Attribut clé                                   |
| Ellipse avec un soulignement en pointillés | Clé partielle d'une entité faible        |
| Ellipse à double trait               | Attribut multivalué                            |
| Ellipse en pointillés                | Attribut dérivé                                |
| Ellipse avec d'autres ellipses       | Attribut composé et ses sous-attributs         |
| Trait simple                         | Participation partielle                        |
| Trait double                         | Participation totale                           |
| `1`, `N`, `M` à côté d'un trait    | Cardinalité                                    |

**Important :** Contrairement à un [diagramme de tables](./database-schema.md#table-diagram) ou à un [diagramme de classes UML](../uml/class-diagram.md), les attributs d'une entité ne sont pas écrits à l'intérieur de son rectangle. Chaque attribut possède sa propre ellipse, reliée à l'entité par un trait.

## Exemple : gestion des commandes {/*#example-order-management*/}

Un `Customer` passe des `Orders`, chacune composée d'un ou plusieurs `OrderItems`. Chaque commande appartient à un client et contient au moins un poste, de sorte que `Order` participe totalement aux deux associations. Un client sans commande est autorisé.

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

## Erreurs fréquentes {/*#common-mistakes*/}

1. **Attributs à l'intérieur du rectangle de l'entité :** Un rectangle avec une liste de colonnes est une table d'un schéma de base de données, et non un type d'entité de Chen.
2. **Clés étrangères comme attributs :** `CustomerID` comme attribut de `Order` duplique l'association `places` et n'a sa place dans le schéma de base de données que comme clé étrangère.
3. **Multiplicités UML dans un diagramme de Chen :** Au lieu des intervalles UML tels que `1..*` ou `0..1`, Chen utilise `1`, `N` et `M` et exprime le minimum par des traits simples ou doubles.
4. **Entité faible sans association identifiante :** Un rectangle à double trait exige un losange à double trait le reliant à son propriétaire.

## Voir aussi {/*#see-also*/}

- [Schéma de base de données](./database-schema.md) : les tables, clés et règles de transformation dérivées d'un modèle ER
- [Phases de développement d'une base de données](./database-development-phases.md) : le modèle ER comme résultat de la phase conceptuelle
- [Normalisation](./normalization.md) : suppression de la redondance dans les tables dérivées d'un modèle ER
