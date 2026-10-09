---
title: "Diagramme d'activité"
description: "Diagrammes d'activité UML : notation, actions, flux de contrôle, décision et fusion, boucles, fork et join, couloirs, et correspondance des éléments avec les structures de contrôle des programmes."
keywords:
    - UML
    - Diagramme d'activité
    - Flux de contrôle
    - Nœud de décision
    - Nœud de fusion
    - Fork et Join
    - Couloir
    - Partition
    - Modélisation de processus
    - Diagramme comportemental
tags:
    - ap2
machine_translated: true
---

# Diagramme d'activité

## Vue d'ensemble {/*#overview*/}

Un diagramme d'activité est un diagramme UML **comportemental**. Il décrit un processus comme une suite d'actions reliées par des flux de contrôle, avec des branchements, des boucles et des étapes exécutées en parallèle.

Applications typiques :

- Modélisation d'un processus métier qui traverse plusieurs services ou systèmes
- Description d'un algorithme avant son implémentation, indépendamment de tout langage
- Détail des étapes à l'intérieur d'un cas d'utilisation
- Documentation d'un flux de travail existant en vue d'une revue avec des parties prenantes non techniques

---

## Notation {/*#notation*/}

| Élément              | Notation                                         | Signification                                                                  |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| Nœud initial         | Cercle plein `●`                            | Début de l'activité, exactement un par diagramme                               |
| Action               | Rectangle aux coins arrondis                     | Une étape de travail indivisible, nommée *verbe + objet*                       |
| Activité (appel)     | Rectangle aux coins arrondis avec un symbole de râteau | Une étape détaillée dans un diagramme à part                              |
| Flux de contrôle     | Flèche pleine                                    | Ordre d'exécution, mène d'une action à la suivante                             |
| Garde                | `[condition]` écrit sur un flux                        | Condition sous laquelle ce flux peut être emprunté                             |
| Nœud de décision     | Losange, un flux entrant et plusieurs sortants   | Branchement, les flux sortants portent des gardes mutuellement exclusives      |
| Nœud de fusion       | Losange, plusieurs flux entrants et un sortant   | Réunit des chemins alternatifs, n'attend **pas**                               |
| Fork                 | Barre épaisse, un flux entrant et plusieurs sortants | Scinde le flux en flux concurrents                                         |
| Join                 | Barre épaisse, plusieurs flux entrants et un sortant | Attend que tous les flux entrants soient arrivés                           |
| Fin d'activité       | Cercle plein dans un anneau `◉`              | Termine toute l'activité, y compris les chemins encore en cours                |
| Fin de flux          | Cercle barré d'une croix `⊗`                 | Termine uniquement le chemin qui y arrive, l'activité se poursuit              |
| Nœud d'objet         | Rectangle simple sur un flux                     | Données transmises d'une action à la suivante                                  |
| Partition            | Couloir nommé                                    | L'acteur, le rôle ou le système responsable des actions de ce couloir          |
| Note                 | Rectangle à coin corné relié par une ligne pointillée | Commentaire sans sémantique                                               |

Règles de nommage qui préservent la lisibilité d'un diagramme :

- Les actions sont nommées *verbe + objet* : `Validate order`, et non `Order` ni `Validation`
- Les gardes sont écrites entre crochets directement sur le flux, jamais à l'intérieur de l'action
- Le cas restant d'un branchement est libellé `[else]` au lieu d'une condition niée

---

## Éléments de base {/*#building-blocks*/}

### Séquence {/*#sequence*/}

Actions exécutées l'une après l'autre. Le flux quitte le nœud initial, traverse chaque action et se termine au nœud de fin d'activité.

```text
          ●
          │
          ▼
 ╭─────────────────╮
 │  Receive order  │
 ╰─────────────────╯
          │
          ▼
 ╭─────────────────╮
 │   Check stock   │
 ╰─────────────────╯
          │
          ▼
          ◉
```

### Décision et fusion {/*#decision-and-merge*/}

Un nœud de décision scinde le flux en alternatives. Un seul flux sortant est emprunté, de sorte que les gardes doivent être mutuellement exclusives et couvrir tous les cas possibles. Un nœud de fusion réunit les alternatives : il transmet chaque chemin qui arrive et n'attend jamais.

```text
                    │
                    ▼
              ╱───────────╲
             ╱   amount    ╲
             ╲   > 100 ?   ╱
              ╲───────────╱
               │         │
        [yes]  │         │ [no]
        ┌──────┘         └──────┐
        │                       │
        ▼                       ▼
╭───────────────╮       ╭───────────────╮
│Apply discount │       │  Keep price   │
╰───────────────╯       ╰───────────────╯
        │                       │
        └──────┐         ┌──────┘
               ▼         ▼
              ╱───────────╲
             ╱             ╲
             ╲             ╱
              ╲───────────╱
                    │
                    ▼
```

Un branchement à plus de deux issues utilise un seul nœud de décision avec plusieurs flux gardés, ce qui correspond à `if / else if / else` ou à une instruction `switch`. Le nœud de fusion reste un unique losange, quel que soit le nombre de chemins qui y mènent.

### Boucle {/*#loop*/}

Une boucle est un flux de contrôle qui revient à un point antérieur du diagramme. Dans le diagramme ci-dessous, la décision se situe *après* l'action, de sorte que le corps s'exécute au moins une fois, ce qui correspond à une boucle `do … while`.

```text
              ●
              │
              ▼
     ╭─────────────────╮
┌───►│   Read record   │
│    ╰─────────────────╯
│             │
│             ▼
│       ╱───────────╲
│      ╱    more     ╲
│      ╲  records ?  ╱
│       ╲───────────╱
│        │         │
│  [yes] │         │ [no]
└────────┘         ▼
                   ◉
```

Placer la décision *avant* l'action, avec l'arc de retour entrant au-dessus, transforme la même structure en boucle `while` à condition en tête, dont le corps peut s'exécuter zéro fois.

### Fork et Join {/*#fork-and-join*/}

Un fork scinde un flux en plusieurs flux qui s'exécutent de façon concurrente. Un join attend que tous les flux entrants soient arrivés et ne continue qu'ensuite sous la forme d'un flux unique. Sans join, l'activité pourrait se terminer alors que des étapes parallèles sont encore en cours.

```text
                  │
                  ▼
        ━━━━━━━━━━━━━━━━━━━━━
        │                   │
        ▼                   ▼
╭─────────────────╮ ╭─────────────────╮
│  Reserve stock  │ │   Charge card   │
╰─────────────────╯ ╰─────────────────╯
        │                   │
        ▼                   ▼
        ━━━━━━━━━━━━━━━━━━━━━
                  │
                  ▼
```

Concurrent signifie en UML *sans ordre prescrit*, et non nécessairement *simultanément sur des processeurs distincts*. Que les deux branches s'exécutent sur deux threads ou simplement dans un ordre arbitraire relève de l'implémentation.

---

## Partitions (couloirs) {/*#partitions-swimlanes*/}

Une partition regroupe les actions selon l'acteur, le rôle, le service ou le système qui les exécute. Les couloirs peuvent être dessinés verticalement ou horizontalement, le flux franchit simplement les limites des couloirs.

Règles utiles à retenir :

- Une action appartient à exactement un couloir, le couloir répond à la question *qui fait cela*
- Les nœuds de décision et de fusion appartiennent au couloir de l'acteur qui décide
- Un fork peut s'étendre sur plusieurs couloirs, c'est précisément ainsi que se représente le travail parallèle de différents acteurs
- Le nombre de franchissements de couloirs est une mesure approximative de l'effort de coordination dans le processus

---

## Correspondance avec le code {/*#mapping-to-code*/}

| Diagramme d'activité                             | Construction de programme                              |
| ------------------------------------------------ | ------------------------------------------------------ |
| Actions en séquence                              | Instructions les unes après les autres                 |
| Décision à deux gardes plus fusion               | `if / else`                                                |
| Décision à plusieurs gardes plus `[else]`         | `if / else if / else` ou `switch`                                     |
| Arc de retour avec la décision après le corps    | `do … while`                                                |
| Arc de retour avec la décision avant le corps    | `while` ou `for`                                     |
| Fork et join                                     | Threads, tâches, `Promise.all`, flux parallèle               |
| Activité appelée                                 | Appel de méthode ou de fonction                        |
| Nœud d'objet entre deux actions                  | Valeur de retour transmise comme paramètre             |
| Fin d'activité                                   | Fin de la méthode, `return`                             |
| Fin de flux                                      | Un chemin se termine tandis que le reste continue      |

---

## Exemple : traitement d'une commande en ligne {/*#example-processing-an-online-order*/}

Trois partitions interviennent : le client, le système de la boutique et l'entrepôt. La commande est validée par la boutique, une commande invalide est rejetée, une commande valide est préparée et expédiée par l'entrepôt.

```text
      Customer       │       Shop System        │      Warehouse
─────────────────────┼──────────────────────────┼─────────────────────
          ●          │                          │
          │          │                          │
          ▼          │                          │
 ╭─────────────────╮ │                          │
 │   Place order   │ │                          │
 ╰─────────────────╯ │                          │
          │          │                          │
          └──────────┼────────────┐             │
                     │            │             │
                     │            ▼             │
                     │   ╭─────────────────╮    │
                     │   │ Validate order  │    │
                     │   ╰─────────────────╯    │
                     │            │             │
                     │            ▼             │
                     │      ╱───────────╲       │
                     │     ╱    order    ╲      │
                     │     ╲   valid ?   ╱      │
                     │      ╲───────────╱       │
                     │       │         │        │
                     │ [no]  │         │ [yes]  │
          ┌──────────┼───────┘         └────────┼──────────┐
          │          │                          │          │
          ▼          │                          │          ▼
 ╭─────────────────╮ │                          │ ╭─────────────────╮
 │ Read rejection  │ │                          │ │   Pick items    │
 ╰─────────────────╯ │                          │ ╰─────────────────╯
          │          │                          │          │
          ▼          │                          │          ▼
          ◉          │                          │ ╭─────────────────╮
                     │                          │ │   Ship parcel   │
                     │                          │ ╰─────────────────╯
                     │                          │          │
          ┌──────────┼──────────────────────────┼──────────┘
          │          │                          │
          ▼          │                          │
 ╭─────────────────╮ │                          │
 │ Receive parcel  │ │                          │
 ╰─────────────────╯ │                          │
          │          │                          │
          ▼          │                          │
          ◉          │                          │
```

Ce que montre cet exemple :

- Le client déclenche le processus, le nœud initial se trouve donc dans le couloir du client
- `Validate order` est ici une action unique. Si la validation est complexe, elle devient une activité appelée avec son propre diagramme
- Les gardes `[no]` et `[yes]` sont mutuellement exclusives et couvrent tous les cas, le flux ne peut donc jamais rester bloqué à la décision
- Les deux branches se terminent par un nœud de fin d'activité, le processus a deux issues possibles
- Rien n'est dit sur la *manière* dont la commande est validée ni sur la *durée* de l'expédition, un diagramme d'activité modélise le flux de contrôle, pas les structures de données ni le temps

Une extension réaliste ferait un fork après `[yes]` afin que `Charge card` dans le couloir de la boutique et `Pick items` dans le couloir de l'entrepôt s'exécutent de façon concurrente, avec un join avant `Ship parcel`.

---

## Erreurs courantes {/*#common-mistakes*/}

1. **Gardes manquantes ou qui se chevauchent :** chaque flux sortant d'une décision a besoin d'une garde, les gardes doivent être mutuellement exclusives et complètes, sinon le flux n'a aucun chemin ou plusieurs
2. **Décision utilisée à la place d'un fork :** un losange signifie *l'un de ces chemins*, une barre signifie *tous ces chemins*
3. **Fork sans join :** l'activité peut atteindre un nœud final alors que des flux parallèles sont encore en cours, et le nœud final les abandonne alors
4. **Join sans fork :** un join attend un flux qui n'arrive jamais et le processus se bloque
5. **Noms utilisés comme noms d'actions :** `Invoice` ne dit rien, `Create invoice` en dit davantage
6. **Conditions à l'intérieur de l'action :** la condition appartient au flux sortant, l'action est ce qui est fait, pas ce qui est vérifié
7. **Plusieurs nœuds initiaux :** une activité a exactement un point de départ. Les démarrages concurrents se modélisent avec un fork
8. **Couloirs décoratifs :** si les acteurs sont dessinés mais que le flux ne franchit jamais la limite d'un couloir, le partitionnement n'apporte rien
9. **Mélange du flux de contrôle et du flux de données :** les données transmises entre actions appartiennent aux nœuds d'objet, pas aux libellés des flux de contrôle

---

## Outils {/*#tools*/}

- draw.io / diagrams.net (gratuit, dans le navigateur, bibliothèque de formes UML incluse)
- PlantUML (textuel, le diagramme est généré à partir de la source et peut être versionné)
- Mermaid (textuel, s'affiche directement dans Markdown sur de nombreuses plateformes)
- Visual Paradigm, StarUML, Lucidchart (commerciaux, avec des offres gratuites)

## Voir aussi {/*#see-also*/}

- [Diagramme de classes](./class-diagram.md) : le pendant structurel, qui modélise les classes et leurs relations
- [Modèle ER](../databases/er-model.md) : modélisation des données sur lesquelles opèrent les actions d'un diagramme d'activité
