---
title: "Diagramme de séquence"
description: "Diagrammes de séquence UML : lignes de vie, spécifications d'exécution, messages synchrones et asynchrones, réponses, création et destruction d'objets, fragments combinés tels que alt, opt, loop et par, et distinction avec les diagrammes d'activité et de communication."
keywords:
    - UML
    - Diagramme de séquence
    - Diagramme d'interaction
    - Ligne de vie
    - Spécification d'exécution
    - Fragment combiné
    - Message synchrone
    - Message asynchrone
    - Diagramme comportemental
tags:
    - ap2
machine_translated: true
---

# Diagramme de séquence

## Vue d'ensemble {/*#overview*/}

Un diagramme de séquence est un diagramme UML **comportemental** qui appartient au groupe des *diagrammes d'interaction*. Il montre quels partenaires de communication échangent quels messages, et dans quel ordre. Les partenaires sont disposés côte à côte, le temps s'écoule de haut en bas.

Applications typiques :

- Détail d'un scénario unique d'un [cas d'utilisation](./use-case-diagram.md), généralement le déroulement normal plus une exception
- Documentation de la collaboration d'objets ou de composants pour une fonctionnalité donnée
- Description d'un protocole entre systèmes, par exemple client, serveur et base de données
- Vérification d'une ébauche de conception par rapport au [diagramme de classes](./class-diagram.md) dans les deux sens : un message qu'aucune classe n'offre comme opération révèle une opération manquante, une ligne de vie sans message entrant une classe inaccessible

Un diagramme de séquence montre toujours *une seule* exécution concrète. Les alternatives et les répétitions s'expriment par des fragments combinés, mais un diagramme qui tente de couvrir tous les cas à la fois devient illisible. Plusieurs petits diagrammes sont donc préférables à un grand.

---

## Notation {/*#notation*/}

| Élément                      | Notation                                                       | Signification                                                              |
| ---------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Cadre                        | Rectangle avec un onglet pentagonal indiquant `sd` plus un nom | Frontière et nom de l'interaction                                       |
| Tête de ligne de vie         | Rectangle avec `name : Class`, `:Class` ou `name`                     | Un partenaire de communication, objet, composant ou acteur                 |
| Ligne de vie                 | Ligne verticale pointillée sous la tête                        | Existence de ce partenaire dans le temps                                   |
| Spécification d'exécution    | Rectangle étroit sur la ligne de vie (barre d'activation)      | Période pendant laquelle le partenaire est actif ou traite un appel        |
| Message synchrone            | Ligne continue, pointe de flèche pleine `──▶`                | L'émetteur attend l'arrivée de la réponse                                  |
| Message asynchrone           | Ligne continue, pointe de flèche ouverte `──>`               | L'émetteur continue immédiatement, sans attendre                           |
| Message de réponse           | Ligne pointillée, pointe de flèche ouverte `<- - -`             | Retour du contrôle, éventuellement libellé avec la valeur renvoyée         |
| Message réflexif             | Flèche quittant et réintégrant la même ligne de vie            | Un partenaire appelle l'une de ses propres opérations                      |
| Message de création          | Flèche pointillée avec `«create»` vers une tête de ligne de vie   | Le destinataire vient à l'existence pendant l'interaction                  |
| Occurrence de destruction    | Croix `X` à l'extrémité inférieure d'une ligne de vie      | L'objet est détruit, la ligne de vie s'arrête là                           |
| Fragment combiné             | Rectangle avec l'opérateur dans le coin supérieur gauche       | Structure de contrôle, par exemple `alt`, `opt`, `loop`, `par`      |
| Opérande                     | Section d'un fragment, séparée par une ligne pointillée        | Un cas ou une branche à l'intérieur du fragment                            |
| Garde                        | `[condition]` au début d'un opérande                                 | Condition sous laquelle cet opérande s'applique                            |
| Utilisation d'interaction    | Fragment avec l'opérateur `ref`                              | Référence à une interaction dessinée dans un diagramme à part              |
| Invariant d'état             | `{condition}` sur une ligne de vie                                   | Condition qui doit être vérifiée à cet instant                             |
| Note                         | Rectangle à coin corné relié par une ligne pointillée          | Commentaire sans sémantique                                                |

Règles de nommage qui préservent la lisibilité d'un diagramme :

- Un message porte la signature de l'opération appelée, par exemple `reserve(seatNo)`, et non une phrase telle que `the seat is reserved`
- Une réponse est libellée avec la valeur renvoyée, et non avec le nom de l'opération
- Les lignes de vie sont nommées d'après des objets, pas d'après des actions : `:SeatRepository` est un partenaire, `Save seat` n'en est pas un
- Les objets anonymes s'écrivent `:Class`, un objet nommé `seat : Seat`, un rôle uniquement par son nom

---

## Éléments de base {/*#building-blocks*/}

### Ligne de vie, spécification d'exécution et réponse {/*#lifeline-execution-specification-and-reply*/}

Un message d'un partenaire à un autre démarre une spécification d'exécution chez le destinataire, et la réponse la termine. Un message synchrone convient à un appel dont l'appelant a besoin du résultat pour continuer, par exemple un appel de méthode ou une requête HTTP dont la réponse est attendue.

```text
   :Client                  :AuthService
      │                           │
     ┌┴┐                          │
     │ │─── login(user, pw) ────▶┌┴┐
     │ │                         │ │
     │ │<- - - - - token - - - - └┬┘
     │ │                          │
     └┬┘                          │
      │                           │
```

La réponse peut être omise si elle ne transporte aucune information.

### Message asynchrone {/*#asynchronous-message*/}

Un message asynchrone est transmis et l'émetteur continue sans attendre. Il convient aux événements, aux notifications, aux messages vers une file d'attente et aux appels exécutés dans un thread séparé, lorsque l'émetteur n'a pas besoin de résultat. La barre de l'émetteur est indépendante de celle du destinataire et peut se terminer avant elle.

```text
:OrderService                   :MailService
      │                               │
     ┌┴┐                              │
     │ │──── sendMail(order) ───────>┌┴┐
     └┬┘                             │ │
      │                              │ │
      │                              └┬┘
      │                               │
```

### Message réflexif {/*#self-message*/}

Un message réflexif est une flèche qui quitte une ligne de vie et la réintègre un peu plus bas. Il est dessiné lorsqu'une étape interne d'un partenaire, comme une validation ou un calcul, compte pour la compréhension du flux. Les appels auxiliaires privés sans cette pertinence sont omis. Un auto-appel dessiné rigoureusement reçoit une spécification d'exécution imbriquée, une seconde barre légèrement décalée posée sur la première.

```text
:OrderService
      │
     ┌┴┐
     │ ├───┐ validate()
     │ ┌─┐◀┘
     │ │ │
     │ └─┘
     │ │
     └┬┘
      │
```

### Création et destruction d'objets {/*#creation-and-destruction-of-objects*/}

Un objet qui n'apparaît que pendant l'interaction est dessiné avec sa tête à la position verticale de sa création. Le message de création pointe vers la tête, et non vers la ligne de vie. La destruction est marquée par une croix à l'extrémité de la ligne de vie.

```text
  :Session
      │
     ┌┴┐
     │ │        «create»
     │ │- - - - - - - - - ->┌─────────┐
     │ │                    │  :Cart  │
     │ │                    └────┬────┘
     │ │──── addItem(item) ────▶┌┴┐
     │ │                        └┬┘
     │ │──── «destroy» ────────▶ X
     └┬┘
      │
```

---

## Fragments combinés {/*#combined-fragments*/}

Un fragment combiné est un rectangle autour d'une partie de l'interaction. L'opérateur dans le coin supérieur gauche détermine quelle structure de contrôle s'applique aux messages inclus, par exemple une alternative ou une boucle. Des lignes horizontales pointillées divisent le fragment en opérandes, et dans un fragment `alt` chaque opérande porte une garde.

| Opérateur  | Signification                                                                       | Correspond à                   |
| ---------- | ----------------------------------------------------------------------------------- | ------------------------------ |
| `alt`      | Alternatives, exactement un opérande s'exécute, le cas restant est libellé `[else]` | `if / else if / else`          |
| `opt`      | Un seul opérande qui ne s'exécute que si la garde est vraie                         | `if` sans `else`            |
| `loop`     | Répétition, écrite `loop(min,max)` ou avec une garde                                        | `while`, `for`, `do … while`   |
| `break`    | L'opérande remplace le reste de l'interaction englobante                            | `return` anticipé, exception   |
| `par`      | Les opérandes s'exécutent de façon concurrente, leurs messages peuvent s'entrelacer | Threads, tâches, appels parallèles |
| `ref`      | Référence à une interaction dessinée dans un diagramme à part                       | Appel de méthode, sous-processus |
| `critical` | L'opérande ne doit pas être interrompu par des opérandes s'exécutant en concurrence | Section critique, verrou       |
| `neg`      | La séquence incluse est invalide et ne doit pas se produire                         | Cas de test négatif            |
| `assert`   | La séquence incluse est la seule suite valide                                       | Assertion                      |

En pratique, `alt`, `opt` et `loop` couvrent la grande majorité des diagrammes.

### Alternative {/*#alternative*/}

```text
      :Client                        :Booking
         │                               │
        ┌┴┐                              │
        │ │──── reserve(seatNo) ───────▶┌┴┐
        │ │                             │ │
 ┌──────┼─┼─────────────────────────────┼─┼────────┐
 │ alt  │ │ [seat is free]              │ │        │
 │      │ │<- - - - reservationId - - - │ │        │
 ├╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌┤
 │      │ │ [else]                      │ │        │
 │      │ │<- - - SeatTakenError - - - -│ │        │
 └──────┼─┼─────────────────────────────┼─┼────────┘
        └┬┘                             └┬┘
         │                               │
```

Les gardes d'un fragment `alt` doivent être mutuellement exclusives et devraient couvrir tous les cas.

### Boucle {/*#loop*/}

```text
      :Order                         :LineItem
         │                               │
        ┌┴┐                              │
 ┌──────┼─┼──────────────────────────────┼─────────┐
 │ loop │ │ [more items]                 │         │
 │      │ │──── subtotal() ────────────▶┌┴┐        │
 │      │ │<- - - - amount - - - - - - -└┬┘        │
 └──────┼─┼──────────────────────────────┼─────────┘
        └┬┘                              │
         │                               │
```

`loop(1,n)` exprime un nombre au lieu d'une condition, `loop` sans complément signifie une répétition non bornée.

---

## Exemple : détail du cas d'utilisation *Réserver une place* {/*#example-detailing-the-use-case-book-seat*/}

Le scénario détaillé ici est le déroulement normal du cas d'utilisation *Réserver une place* : un client réserve une place précise, le système recherche la place et, si elle est encore libre, la marque comme réservée. Le diagramme est dérivé de la description textuelle du cas d'utilisation selon ces étapes :

1. Un scénario du cas d'utilisation est choisi, généralement le déroulement normal de la description textuelle.
2. L'acteur déclencheur devient la ligne de vie située le plus à gauche.
3. Les partenaires internes sont ajoutés, typiquement le long des couches de l'architecture : interface utilisateur, contrôle, objet métier, persistance.
4. Chaque étape du déroulement textuel devient un message dont le nom correspond à une opération du destinataire.
5. Les exceptions de la description textuelle deviennent des fragments `alt` ou `break`, ou un diagramme séparé pour chacune.

```text
┌────────────────┐
│ sd BookSeat    │
├────────────────┴─────────────────────────────────────────────────────┐
│                                                                      │
│       :Customer            :BookingService         :SeatRepository   │
│           │                       │                       │          │
│          ┌┴┐                      │                       │          │
│          │ │── bookSeat(id) ────▶┌┴┐                      │          │
│          │ │                     │ │── findSeat(id) ────▶┌┴┐         │
│          │ │                     │ │<- - seat - - - - - -└┬┘         │
│          │ │                     │ │                      │          │
│          │ │              ┌──────┼─┼──────────────────────┼───────┐  │
│          │ │              │ opt  │ │ [seat is free]       │       │  │
│          │ │              │      │ │── markBooked(id) ──▶┌┴┐      │  │
│          │ │              │      │ │<- - - - ok - - - - -└┬┘      │  │
│          │ │              └──────┼─┼──────────────────────┼───────┘  │
│          │ │<- - confirmation - -└┬┘                      │          │
│          └┬┘                      │                       │          │
│           │                       │                       │          │
└──────────────────────────────────────────────────────────────────────┘
```

Ce que l'on peut lire dans cet exemple :

- Le cas d'échec du fragment `opt` n'est pas dessiné ici, il serait modélisé soit avec `alt`, soit dans un diagramme séparé.
- L'étape de paiement serait insérée comme fragment `ref` afin que ce diagramme reste lisible et que le paiement ait sa propre interaction.

---

## Diagramme de séquence, d'activité ou de communication {/*#sequence-activity-or-communication-diagram*/}

Les trois sont des diagrammes comportementaux.

| Critère       | Diagramme de séquence                          | Diagramme d'activité                       | Diagramme de communication                          |
| ------------- | ---------------------------------------------- | ------------------------------------------ | --------------------------------------------------- |
| Focalisation  | Échange de messages dans le temps              | Flux de contrôle d'un processus            | Structure de la collaboration                       |
| Temps         | Explicite, comme axe vertical                  | Implicite, par le sens du flux             | Uniquement par la numérotation des messages         |
| Participants  | Lignes de vie côte à côte                      | Facultatifs, sous forme de partitions      | Objets placés librement, reliés par des liens       |
| Branchement   | Fragments combinés, devient vite encombré      | Nœuds de décision et de fusion, bien lisible | Difficilement lisible                             |
| Concurrence   | Fragment `par`                               | Fork et join                               | Possible, mais difficile à lire                     |
| Usage typique | Détail d'un scénario                           | Modélisation d'un processus entier         | Montrer quel objet connaît quel autre               |

Règles empiriques :

- Nombreuses branches et boucles, peu de participants => [diagramme d'activité](./activity-diagram.md)
- Peu de branches, nombreux participants et ordre pertinent => diagramme de séquence
- La question *qui est relié à qui* plutôt que *dans quel ordre* => [diagramme de communication](./further-uml-diagrams.md#communication-diagram)
- Le comportement d'*un seul* objet sur toute sa durée de vie => [diagramme d'états-transitions](./state-machine-diagram.md)

---

## Erreurs courantes {/*#common-mistakes*/}

1. **Axe temporel ignoré :** le temps s'écoule de haut en bas sur toutes les lignes de vie. Une flèche dessinée vers le haut inverse donc l'ordre voulu. Deux messages à la même hauteur n'ont pas d'ordre défini.
2. **Réponse en flèche pleine :** une réponse se dessine comme une ligne pointillée à pointe de flèche ouverte. Une ligne continue à pointe de flèche pleine se lit comme un nouvel appel en sens inverse.
3. **Confusion entre synchrone et asynchrone :** la pointe de flèche pleine signifie que l'émetteur attend la réponse. Les événements, notifications et messages vers une file d'attente sont asynchrones et reçoivent la pointe ouverte.
4. **Spécifications d'exécution non refermées :** la barre d'un appelant doit s'étendre au moins jusqu'à l'arrivée de la réponse. Une barre qui se termine plus tôt indique que l'appelant avait déjà fini.
5. **Activités au lieu d'objets sur les lignes de vie :** une ligne de vie représente un partenaire de communication tel que `:SeatRepository`. Une étape telle que `Check availability` n'est pas un partenaire et devient un message.
6. **Gardes manquantes sur les opérandes alt :** sans gardes, le diagramme ne montre pas sous quelle condition chaque opérande du fragment `alt` s'applique.

---

## Outils {/*#tools*/}

- draw.io / diagrams.net (gratuit, dans le navigateur, bibliothèque de formes UML incluse)
- PlantUML (textuel, particulièrement performant pour les diagrammes de séquence, versionnable)
- Mermaid (textuel, s'affiche directement dans Markdown sur de nombreuses plateformes)
- Visual Paradigm, StarUML, Lucidchart (commerciaux, avec des offres gratuites)

## Voir aussi {/*#see-also*/}

- [Diagramme d'activité](./activity-diagram.md) : l'alternative pour les processus à nombreuses branches et boucles
- [Diagramme de cas d'utilisation](./use-case-diagram.md) : fournit les scénarios qu'un diagramme de séquence détaille
- [Diagramme de classes](./class-diagram.md) : fournit les classes et opérations auxquelles se réfèrent les messages
- [Diagramme d'états-transitions](./state-machine-diagram.md) : le comportement d'un seul objet au lieu de l'interaction de plusieurs
- [Vue d'ensemble d'UML](./uml-overview.mdx) : classification de tous les types de diagrammes
- [Bases de la notation UML](./uml-notation-basics.md) : éléments communs à tous les types de diagrammes
