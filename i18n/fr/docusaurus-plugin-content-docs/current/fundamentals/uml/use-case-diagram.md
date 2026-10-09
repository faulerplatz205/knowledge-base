---
title: "Diagramme de cas d'utilisation"
description: "Diagrammes de cas d'utilisation UML : acteurs, frontière du système, associations, les relations include, extend et généralisation, la différence entre diagramme et description de cas d'utilisation, et leur rôle dans l'analyse des exigences."
keywords:
    - UML
    - Diagramme de cas d'utilisation
    - Acteur
    - Frontière du système
    - Include
    - Extend
    - Point d'extension
    - Généralisation
    - Description de cas d'utilisation
    - Analyse des exigences
tags:
    - ap2
machine_translated: true
---

# Diagramme de cas d'utilisation

## Aperçu {/*#overview*/}

Un diagramme de cas d'utilisation est un diagramme UML **de comportement**. Il montre *quels* services un système offre à son environnement et *qui* les utilise, mais ne dit délibérément rien sur *la manière* dont ces services sont implémentés. Le diagramme est donc la vue externe d'un système, et ce qu'il définit est le **périmètre du système**.

Applications typiques :

- Délimiter un projet : une réponse précoce à la question *qu'est-ce qui appartient au système et qu'est-ce qui n'en fait pas partie*
- Structurer les exigences fonctionnelles en unités porteuses de valeur métier
- Fournir un vocabulaire commun aux développeurs, clients et experts métier
- Servir d'index à un document d'exigences, avec une description par cas d'utilisation

Un cas d'utilisation est toujours un **service complet et autonome avec un résultat observable ayant de la valeur** pour au moins un acteur. `Place order` est un cas d'utilisation, `Click the order button` n'en est pas un.

---

## Notation {/*#notation*/}

| Élément                | Notation                                                           | Signification                                                                    |
| ---------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Acteur                 | Bonhomme filaire, nom en dessous                                   | Rôle extérieur au système qui interagit avec lui                                 |
| Acteur (système)       | Rectangle avec le mot-clé `<<actor>>` ou un bonhomme filaire          | Système externe dans le rôle d'un acteur                                         |
| Frontière du système   | Rectangle avec le nom du système sur le bord supérieur             | Tout ce qui est dessiné à l'intérieur fait partie du système considéré           |
| Cas d'utilisation      | Ellipse avec le nom à l'intérieur, toujours dans la frontière      | Un service autonome du système, nommé *verbe + objet*                            |
| Association            | Ligne continue sans pointe de flèche                               | Un acteur participe à un cas d'utilisation                                       |
| Include                | Flèche en pointillés avec `<<include>>`, pointant vers le cas inclus     | Le cas d'utilisation de base exécute **toujours** le cas inclus                  |
| Extend                 | Flèche en pointillés avec `<<extend>>`, pointant vers le cas de **base** | Le cas d'utilisation d'extension **peut** s'exécuter sous une condition         |
| Point d'extension      | Position nommée dans un compartiment du cas de base                | L'endroit où une extension est insérée                                           |
| Généralisation         | Ligne continue avec un triangle creux sur l'élément général        | Spécialisation d'acteurs ou de cas d'utilisation                                 |
| Note                   | Rectangle à coin corné relié par une ligne en pointillés           | Commentaire sans sémantique, par ex. la condition d'une relation extend          |

Règles de nommage qui préservent la lisibilité d'un diagramme :

- Les cas d'utilisation sont nommés *verbe + objet* du point de vue de l'acteur et dans le langage du domaine, non de l'implémentation : `Place order` et `Cancel invoice`, et non `Order management`, `orderService()` ou `Set the invoice status to 0`
- Les acteurs sont nommés d'après le **rôle**, non d'après la personne : `Clerk`, et non `Ms Weber`, car une même personne peut occuper plusieurs rôles

---

## Éléments constitutifs {/*#building-blocks*/}

### Acteurs {/*#actors*/}

Un acteur est un rôle extérieur au système qui échange des informations avec lui. Les acteurs ne sont pas nécessairement des personnes.

- **Acteur principal :** déclenche le cas d'utilisation et en tire le bénéfice. Par convention dessiné à gauche
- **Acteur secondaire :** est appelé par le système pendant l'exécution du cas d'utilisation et fournit quelque chose dont le système a besoin. Par convention dessiné à droite
- **Acteur humain :** une personne dans un rôle, dessinée comme un bonhomme filaire
- **Acteur système :** un système externe, un service ou une minuterie, dessiné comme un bonhomme filaire ou comme un rectangle avec le mot-clé `<<actor>>`

### Frontière du système {/*#system-boundary*/}

La frontière du système est un rectangle étiqueté avec le nom du système. Elle sépare la responsabilité de l'environnement :

- Les cas d'utilisation sont **toujours** dessinés à l'intérieur de la frontière, car ce sont des services du système
- Les acteurs sont **toujours** dessinés à l'extérieur de la frontière, car ils ne sont pas construits
- Les associations sont les seules lignes qui traversent la frontière

### Association {/*#association*/}

Une ligne continue entre un acteur et un cas d'utilisation signifie que cet acteur participe à ce cas d'utilisation. Elle ne porte aucune pointe de flèche, car elle exprime une participation et non une direction de flux de données. Des multiplicités telles que `1` ou `*` peuvent être notées aux extrémités, mais sont rarement nécessaires en pratique.

Les associations n'existent qu'entre un acteur et un cas d'utilisation, jamais entre deux cas d'utilisation ni entre deux acteurs.

### Include {/*#include*/}

`<<include>>` décrit une réutilisation obligatoire. Le cas d'utilisation de base exécute toujours le cas inclus, à un point fixe de son déroulement. La flèche en pointillés va du cas de base **vers** le cas inclus.

```text
 ╭─────────────────────╮                     ╭─────────────────────╮
(      Place order      )╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌►(   Authenticate user   )
 ╰─────────────────────╯     <<include>>     ╰─────────────────────╯
```

Le cas d'utilisation inclus est un fragment partagé par plusieurs cas de base. `Authenticate user` est également nécessaire à `Manage wish list` et `View invoices`, et son extraction évite de le décrire trois fois. Un cas inclus n'est généralement pas associé à un acteur propre, car il n'est jamais démarré seul.

### Extend {/*#extend*/}

`<<extend>>` décrit un comportement optionnel. Le cas d'utilisation d'extension ne s'exécute que si une condition est remplie, et il est inséré à un **point d'extension** nommé du cas de base. Sa flèche en pointillés pointe dans le sens opposé à celle de `<<include>>` : du cas d'extension **vers** le cas de base.

```text
 ╭─────────────────────────────╮
(          Place order          )
(  ---------------------------  )              ╭────────────────────╮
(  extension points:            )◄╌╌╌╌╌╌┬╌╌╌╌╌(   Redeem voucher     )
(   payment method selected     )       ╎      ╰────────────────────╯
 ╰─────────────────────────────╯   <<extend>>
                                        ╎
                     ┌──────────────────┴────────╮
                     │ Condition:                │
                     │ {voucher code entered}    │
                     │ extension point:          │
                     │  payment method selected  │
                     └───────────────────────────┘
```

Le cas de base est complet sans l'extension. `Place order` fonctionne parfaitement sans bon de réduction, alors qu'il ne fonctionne pas sans authentification. La condition est une contrainte et figure donc entre accolades. UML l'affiche, avec le point d'extension auquel elle se rapporte, dans une note rattachée à la relation extend. De nombreux outils et manuels abrègent la note en `<<extend>> {condition}` écrit à côté de la flèche, ce qui est une forme abrégée tolérée de la même chose.

Un test simple distingue les deux relations :

- Le cas de base peut-il être décrit sans jamais mentionner l'autre ? Si oui, il s'agit de `<<extend>>`
- Le cas de base cesse-t-il de fonctionner si l'autre est supprimé ? Si oui, il s'agit de `<<include>>`

### Généralisation {/*#generalization*/}

La généralisation exprime *est une sorte de*, pour les acteurs comme pour les cas d'utilisation. La ligne porte un triangle creux sur l'élément le plus général.

Généralisation d'acteurs : un acteur spécialisé hérite de chaque association de l'acteur général et peut en ajouter les siennes.

```text
                  ○
                 ╱│╲
                 ╱ ╲
              Customer
                  △
       ┌──────────┴──────────┐
       │                     │
       ○                     ○
      ╱│╲                   ╱│╲
      ╱ ╲                   ╱ ╲
  Registered               Guest
   customer
```

`Registered customer` et `Guest` héritent tous deux de chaque association de `Customer`, de sorte que `Search catalogue` n'a pas besoin d'être relié trois fois.

```text
                  ╭───────────────╮
                 (  Pay for order  )
                  ╰───────────────╯
                          △
           ┌──────────────┴──────────────┐
           │                             │
 ╭────────────────────╮       ╭─────────────────────╮
(  Pay by credit card  )     (  Pay by direct debit  )
 ╰────────────────────╯       ╰─────────────────────╯
```

La généralisation de cas d'utilisation est puissante mais facilement surutilisée. Lorsque les variantes ne diffèrent que par une étape optionnelle, `<<extend>>` est le choix le plus clair.

---

## Diagramme et description {/*#diagram-and-description*/}

Le diagramme seul est un aperçu rapide, non une spécification : il nomme les cas d'utilisation et leurs relations, mais ne dit rien du déroulement. Le détail figure dans la **description du cas d'utilisation**, rédigée en texte continu ou selon un modèle, une par cas d'utilisation.

| Champ                  | Contenu                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| Nom                    | Identique à l'étiquette du diagramme, *verbe + objet*                            |
| Description courte     | Une ou deux phrases sur la finalité et la valeur métier                          |
| Acteurs                | Acteur principal, acteurs secondaires                                            |
| Précondition           | Ce qui doit être vrai avant que le cas d'utilisation puisse démarrer             |
| Postcondition          | Ce qui est vrai après une exécution réussie                                      |
| Déclencheur            | L'événement qui démarre le cas d'utilisation                                     |
| Scénario principal     | Le déroulement standard numéroté, tout se passant bien                           |
| Flux alternatifs       | Écarts qui mènent tout de même à l'objectif, numérotés par rapport au scénario principal |
| Exceptions             | Écarts qui empêchent d'atteindre l'objectif                                      |
| Non fonctionnel        | Temps de réponse, volumes, contraintes légales                                   |

Un exemple rempli pour `Place order` :

- **Précondition :** le panier contient au moins un article, le client est authentifié
- **Postcondition :** la commande est enregistrée avec le statut `paid` et une confirmation a été envoyée
- **Déclencheur :** le client valide le panier
- **Scénario principal :** 1. le système affiche le récapitulatif de la commande => 2. le client choisit un mode de paiement => 3. le système réserve les marchandises => 4. le système traite le paiement => 5. le système confirme la commande
- **Flux alternatif 2a :** le client saisit un code de réduction, le système réduit le montant et continue à l'étape 3
- **Exception 3a :** un article n'est plus en stock, le système propose une livraison partielle ou annule la commande

Un scénario est *un chemin concret* à travers un cas d'utilisation : le scénario principal est le chemin attendu, les flux alternatifs sont les autres. Tout ce qui est dessiné comme `<<extend>>` dans le diagramme apparaît comme flux alternatif dans la description, tout ce qui est dessiné comme `<<include>>` apparaît comme renvoi vers une autre description.

---

## Rôle dans l'analyse des exigences {/*#role-in-requirements-analysis*/}

- Le **[cahier des charges](../../projectmanagement/requirements-specification.md#requirement-specification)** est rédigé par le client et indique *ce qui* est nécessaire et *pourquoi*. Les cas d'utilisation en constituent une excellente structure, car chacun décrit une exigence sans prescrire de solution
- Les **[spécifications fonctionnelles](../../projectmanagement/requirements-specification.md#functional-specification)** sont rédigées par le prestataire et indiquent *comment* les exigences sont satisfaites. Le diagramme de cas d'utilisation est repris, les descriptions sont affinées et les contraintes techniques sont ajoutées
- **Traçabilité :** chaque exigence devrait être traçable jusqu'à au moins un cas d'utilisation, et chaque cas d'utilisation jusqu'à au moins une exigence. Les cas d'utilisation sans exigence relèvent du gold plating, les exigences sans cas d'utilisation ont été oubliées
- **Estimation et planification :** les cas d'utilisation constituent une unité naturelle pour l'estimation de l'effort, la planification des versions et les tests de recette, car chacun peut être accepté individuellement
- **Base de test :** le scénario principal fournit le cas de test du chemin nominal, chaque flux alternatif et chaque exception fournit au moins un cas de test supplémentaire

Une user story est un petit incrément de planification, un cas d'utilisation est un service complet incluant chaque alternative. Un cas d'utilisation se décompose généralement en plusieurs user stories.

---

## Exemple : boutique en ligne {/*#example-online-shop*/}

Le système considéré est une boutique en ligne. Le client parcourt le catalogue et passe des commandes. Passer une commande requiert toujours une authentification et le traitement du paiement, et peut être étendu de manière optionnelle par l'utilisation d'un bon de réduction. Le traitement du paiement appelle un prestataire de paiement externe.

```text
                                 Online Shop
         ┌──────────────────────────────────────────────────────────┐
         │                                                          │
         │           ╭────────────────────╮                         │
    ┌────┼──────────(   Search catalogue   )                        │
    │    │           ╰────────────────────╯                         │
 ○  │    │                                                          │
╱│╲─┤    │                                                          │
╱ ╲ │    │           ╭────────────────────╮     ╭────────────────╮  │
    └────┼──────────(     Place order      )◄╌╌(  Redeem voucher  ) │
Customer │           ╰────────────────────╯     ╰────────────────╯  │
         │                  ╎       ╎       <<extend>>              │
         │      <<include>> ╎       ╎ <<include>>                   │
         │              ┌───┘       └───────────┐                   │
         │              ▼                       ▼                   │
         │     ╭─────────────────╮      ╭────────────────╮          │  ○
         │    (  Authenticate     )    (  Process payment )─────────┼─╱│╲
         │    (      user         )     ╰────────────────╯          │ ╱ ╲
         │     ╰─────────────────╯                                  │
         │                                                          │
         └──────────────────────────────────────────────────────────┘
                                                                    Payment
                                                                   Provider
```

Ce que cet exemple montre :

- `Customer` est l'acteur principal à gauche, `Payment Provider` un acteur système secondaire à droite : la boutique l'appelle, et non l'inverse
- `Authenticate user` est inclus car aucune commande ne peut être passée sans lui, et il n'a pas d'association propre puisqu'il n'est jamais démarré isolément
- `Redeem voucher` étend `Place order` : sa suppression laisse `Place order` pleinement fonctionnel, ce qui est exactement le critère de `<<extend>>`

---

## Erreurs courantes {/*#common-mistakes*/}

1. **Include et extend inversés :** `<<include>>` s'éloigne du cas de base et signifie *toujours*, `<<extend>>` pointe vers lui et signifie *éventuellement*
2. **Lignes continues et pointillées inversées :** les associations et généralisations sont dessinées en lignes continues, `<<include>>` et `<<extend>>` en flèches pointillées
3. **Étapes de processus au lieu de cas d'utilisation :** `Enter customer number`, `Validate input`, `Save record` sont des étapes d'un déroulement, non des services à valeur métier. Elles relèvent de la description du cas d'utilisation ou d'un diagramme d'activité
4. **Frontière du système manquante :** sans frontière, le diagramme ne dit plus quelles fonctionnalités appartiennent au système, et le périmètre devient négociable
5. **Acteur à l'intérieur de la frontière :** les acteurs sont à l'extérieur par définition, puisqu'ils ne font pas partie de ce qui est construit. Un acteur dessiné à l'intérieur signifie généralement qu'un composant a été pris pour un rôle
6. **Décomposition fonctionnelle via include :** découper chaque cas d'utilisation en trois sous-cas inclus transforme le diagramme en arbre d'appels. `<<include>>` sert à la réutilisation entre plusieurs cas de base, non à la structuration d'un seul déroulement
7. **Associations entre cas d'utilisation :** une ligne continue sans mot-clé entre deux ellipses n'a aucune signification en UML. Les relations entre cas d'utilisation ne sont que `<<include>>`, `<<extend>>` ou la généralisation
8. **Acteurs nommés d'après des personnes ou des intitulés de poste individuels :** un acteur est un rôle. La même personne peut être `Clerk` dans un cas d'utilisation et `Customer` dans un autre
9. **Pointes de flèche sur les associations :** l'association exprime la participation et ne porte aucune direction
10. **Diagramme sans descriptions :** le diagramme nomme les cas d'utilisation, il ne les spécifie pas. Un projet qui ne dispose que du diagramme a un index sans contenu
11. **Terminologie technique dans les noms :** `POST /orders` ou `saveOrder()` relèvent de l'implémentation, non d'un service vu de l'extérieur. Le nom doit être compréhensible par le client
12. **Crochets pour la condition d'extend :** la condition est une contrainte et figure donc entre accolades, dans une note rattachée à la relation extend. `[condition]` est la notation de garde des diagrammes [d'activité](./activity-diagram.md), [d'états](./state-machine-diagram.md) et [de séquence](./sequence-diagram.md)

---

## Outils {/*#tools*/}

- draw.io / diagrams.net (gratuit, dans le navigateur, bibliothèque de formes UML incluse)
- PlantUML (basé sur du texte, le diagramme est généré à partir de la source et peut être versionné)
- Mermaid (basé sur du texte, rendu directement dans Markdown sur de nombreuses plateformes)
- Visual Paradigm, StarUML, Lucidchart (commerciaux, avec versions gratuites)

## Voir aussi {/*#see-also*/}

- [Vue d'ensemble d'UML](./uml-overview.mdx) : classification des types de diagrammes en structure et comportement
- [Diagramme d'activité](./activity-diagram.md) : détail du déroulement d'un cas d'utilisation isolé
- [Diagramme de séquence](./sequence-diagram.md) : l'interaction entre acteur et système au sein d'un scénario
- [Diagramme de classes](./class-diagram.md) : le pendant structurel, modélisant les objets du domaine sur lesquels portent les cas d'utilisation
