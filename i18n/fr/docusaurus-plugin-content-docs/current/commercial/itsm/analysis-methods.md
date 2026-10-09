---
title: Méthodes d'analyse de problèmes
description: "Principales méthodes d'analyse de problèmes informatiques : la méthode des 5 pourquoi, le diagramme d'Ishikawa, le cycle DMAIC et la matrice cause-effet"
keywords:
  - "Méthode des 5 pourquoi"
  - "Diagramme d'Ishikawa"
  - "Diagramme en arêtes de poisson"
  - "DMAIC"
  - "Analyse des causes racines"
  - "Analyse de problèmes"
  - "Matrice cause-effet"
tags:
  - ap2
machine_translated: true
---

# Méthodes d'analyse de problèmes

## Vue d'ensemble {/*#overview*/}

Ces méthodes sont utilisées dans la [gestion des problèmes](./problem-management.md) pour trouver systématiquement la cause racine d'un problème.

## Méthode des 5 pourquoi (5-W-Methode) {/*#5-why-method-5-w-methode*/}

**Objectif :** trouver la cause racine d'un problème en demandant « Pourquoi ? » de manière répétée, chaque réponse devenant la question suivante. Cinq itérations suffisent généralement.

**Exemple (problème d'imprimante) :**

| Étape     | Question                                           | Réponse                                                                  |
| --------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| Problème  | L'imprimante n'imprime pas clairement              |                                                                          |
| Pourquoi ? | Pourquoi l'imprimante n'imprime-t-elle pas clairement ? | Elle n'affiche pas tous les caractères distinctement / la sortie n'est pas lisible |
| Pourquoi ? | Pourquoi n'affiche-t-elle pas tous les caractères distinctement ? | L'encre/le toner est de mauvaise qualité                |
| Pourquoi ? | Pourquoi l'encre/le toner est-il de mauvaise qualité ? | Il bave et n'imprime parfois pas du tout                             |
| Pourquoi ? | Pourquoi bave-t-il et n'imprime-t-il parfois pas ? | La qualité du toner est faible                                           |
| Pourquoi ? | Pourquoi la qualité du toner est-elle faible ?     | **Le toner le moins cher a été acheté** (cause racine)                   |

## Diagramme d'Ishikawa (diagramme en arêtes de poisson) {/*#ishikawa-diagram-fishbone-diagram*/}

Le **diagramme d'Ishikawa** (également appelé **diagramme de causes et effets** ou **diagramme en arêtes de poisson**) a été développé par le scientifique japonais Kaoru Ishikawa dans les années 1940. Il visualise les causes d'un problème.

**Structure :**

- Flèche horizontale pointant vers la droite => **description du problème à la pointe** (l'effet)
- Flèches diagonales partant de la ligne horizontale => **catégories d'influence principales** (les « arêtes »)
- Flèches plus petites partant des arêtes diagonales => **causes secondaires** (Nebenursachen)

**Signification des flèches :** chaque flèche « contribue à » l'effet décrit à la pointe.

### Catégories d'influence principales (8M) {/*#main-influence-categories-8m*/}

- Catégorie
- Matière (Material)
- Personnes (People)
- Machine
- Méthode (Method)
- Management
- Environnement (Environment)
- Mesure (Measurement)
- Argent (Money)

D'autres catégories d'influence sont également possibles selon le problème.

### Création d'un diagramme d'Ishikawa {/*#creating-an-ishikawa-diagram*/}

1. Écrire la description du problème à la pointe de la flèche horizontale (à l'extrême droite)
2. Définir les catégories d'influence principales (8M)
3. Trouver les causes principales par un brainstorming d'équipe (dessinées comme des flèches parallèles à l'axe horizontal)
4. Trouver les causes secondaires de chaque cause principale (dessinées comme des flèches diagonales partant de la flèche de la cause principale)

## Cycle DMAIC {/*#dmaic-cycle*/}

Le **cycle DMAIC** est utilisé pour les problèmes et projets complexes. L'acronyme désigne les cinq phases :

| Phase                  | Question clé                              | Méthodes / outils                                                                                                                       |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Define** (définir)   | Quel est le problème ?                    | Retours clients, définition du problème, périmètre, analyse des KPI, matrice RACI                                                       |
| **Measure** (mesurer)  | Quelle est l'ampleur du problème ?        | Analyse de la situation IST, revue du [SLA](./sla.md), clarification du niveau d'escalade                                               |
| **Analyse** (analyser) | Quelles sont les causes racines ?         | Méthode des 5 pourquoi, enquêtes clients, [base de données des erreurs](./problem-management.md#known-error-database-kedb), diagramme d'Ishikawa |
| **Improve** (améliorer) | Une solution peut-elle être développée ? | Simulations, essais, matrice de solutions, diagramme d'Ishikawa                                                                         |
| **Control** (contrôler) | L'amélioration peut-elle être pérennisée ? | Surveillance, système de gestion des services                                                                                         |

## Problemlösungsmatrix / Ursachen-Wirkungs-Matrix (matrice cause-effet) {/*#problemlösungsmatrix--ursachen-wirkungs-matrix*/}

La **matrice cause-effet** (basée sur la méthode Kepner-Tregoe) analyse un problème selon quatre dimensions afin de cerner systématiquement la cause racine en comparant ce qui EST le cas avec ce qui n'EST PAS le cas :

| Dimension                    | EST (le problème)                                  | N'EST PAS (le problème)                         | Écart                                                    | Cause possible                |
| ---------------------------- | -------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------- | ----------------------------- |
| **Identifier (Quoi)**        | Quel est le problème ?                             | Quel n'est PAS le problème ?                    | Quelle est la différence entre l'état EST et l'état cible ? | Quelle est la cause possible ? |
| **Localiser (Où)**           | Où le problème se produit-il ?                     | Où ne se produit-il PAS ?                       | Qu'est-ce qui est différent à cet endroit ?              | Quelle est la cause possible ? |
| **Temps (Quand)**            | Quand le problème est-il apparu ?                  | Quand n'est-il PAS apparu ?                     | Qu'est-ce qui était différent à ce moment-là ?           | Quelle est la cause possible ? |
|                              | Sur quelle période le problème a-t-il été constaté ? | Sur quelle période n'est-il PAS apparu ?      | Qu'est-ce qui était différent pendant cette période ?    |                               |
| **Importance (Combien)**     | Quelle est l'ampleur / l'étendue du problème ?     | Quelle est sa petitesse ou sa limitation ?      | Quelle est la différence d'ampleur ?                     | Quelle est la cause possible ? |
|                              | Combien (d'unités) sont touchées ?                 | Combien (d'unités) ne sont PAS touchées ?       |                                                          |                               |
|                              | Quelle partie est touchée ?                        | Quelle partie n'est PAS touchée ?               |                                                          |                               |
