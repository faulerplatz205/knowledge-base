---
title: "Scrum"
description: "Scrum est un cadre agile pour le développement de produits complexes reposant sur de courtes itérations, des rôles clairs et une réflexion régulière."
keywords:
    - SCRUM
    - Agile
    - Sprints
tags:
    - ap2
machine_translated: true
---

# Scrum

## Aperçu {/*#overview*/}

Scrum est un **cadre agile** pour le développement de produits complexes. Il est particulièrement utilisé dans le développement logiciel et repose sur de courtes itérations appelées **sprints**, des **rôles** clairs et une **réflexion** régulière.

---

## Les 3 rôles {/*#the-3-roles*/}

Une équipe Scrum se compose d'un Product Owner, d'un Scrum Master et des Developers. Elle compte généralement 10 membres ou moins, sans sous-équipes ni hiérarchies. Ces rôles sont aussi appelés **accountabilities** (responsabilités).

### Product Owner (PO) {/*#product-owner-po*/}

Le Product Owner est la **seule personne responsable du produit**. Il représente les intérêts des parties prenantes.

**Tâches :**

- Maintient et priorise le product backlog
- Définit les exigences (user stories)
- Décide de ce qui sera construit
- Teste les résultats

### Scrum Master {/*#scrum-master*/}

Le Scrum Master est **responsable du processus** lui-même. Il n'est pas un manager traditionnel mais un **servant leader**.

**Tâches :**

- Veille à la bonne application de Scrum
- Élimine les obstacles (impediments)
- Accompagne l'équipe
- Anime les réunions

### Developers {/*#developers*/}

Les Developers sont les membres de l'équipe Scrum qui **implémentent les exigences**. L'équipe Scrum est **auto-organisée** : elle décide en interne qui fait quoi, quand et comment, sans être dirigée par des personnes extérieures.

- Pluridisciplinaires
- Créent le sprint backlog
- Créent au moins un incrément utilisable par sprint

---

## Les 5 événements {/*#the-5-events*/}

### Sprint {/*#sprint*/}

Un sprint est une **période de temps fixe** pendant laquelle l'équipe travaille sur un ensemble de tâches. C'est le **battement de cœur de Scrum**, qui fournit un rythme régulier pour planifier, construire et examiner le travail.

- **Durée :** 1 mois au maximum (couramment 2 à 4 semaines)
- **Objectif :** incrément terminé et utilisable

**Important :** pendant un sprint, aucune modification mettant en péril l'objectif du sprint ne doit être introduite.

### Sprint Planning {/*#sprint-planning*/}

Au début de chaque sprint, **toute l'équipe Scrum** se réunit pour décider du travail à entreprendre. L'équipe sélectionne des éléments du product backlog et établit un plan pour les livrer.

**Résultat :**

- Sprint Goal
- Sprint Backlog

### Daily Scrum / Daily Standup {/*#daily-scrum--daily-standup*/}

Le Daily Scrum est une **courte réunion de synchronisation** au cours de laquelle les Developers s'alignent sur l'avancement et identifient les blocages. Il est aussi appelé « standup », car les participants restent souvent debout pendant la réunion afin d'encourager la concision et de garantir le respect de la **limite de 15 minutes**.

- **Durée :** 15 minutes
- **Participants :** Developers

Aucune structure fixe n'est prescrite. Trois questions sont courantes :

- Qu'ai-je fait hier ?
- Que fais-je aujourd'hui ?
- Y a-t-il des obstacles ?

### Sprint Review {/*#sprint-review*/}

À la fin de chaque sprint, l'équipe **présente l'incrément terminé** aux parties prenantes. Le but est de recueillir des **retours** et de décider ensemble des prochaines étapes du produit.

- Présentation des résultats
- Retours des parties prenantes
- Ajustement du product backlog

### Sprint Retrospective (Retro) {/*#sprint-retrospective-retro*/}

La rétrospective est une **réunion interne** de l'équipe Scrum pour réfléchir au sprint écoulé. L'objectif est d'identifier des **améliorations concrètes** pour le prochain sprint, ce qui en fait l'événement clé de l'amélioration continue.

Questions typiques :

- Qu'est-ce qui s'est bien passé ?
- Qu'est-ce qui s'est mal passé ?
- Comment s'améliorer ?

---

## Les 3 artefacts {/*#the-3-artifacts*/}

Chaque artefact possède un **engagement** par rapport auquel son avancement est mesuré : le product backlog a le [Product Goal](#product-goal), le sprint backlog le [Sprint Goal](#sprint-goal), et l'incrément la [Definition of Done](#definition-of-done-dod).

### Product Backlog {/*#product-backlog*/}

Le product backlog est la **source unique de vérité** pour tout le travail à effectuer sur le produit. C'est un **document vivant** qui évolue avec le produit et son environnement.

- Une liste priorisée de toutes les exigences
- Maintenu par le Product Owner
- Entrées le plus souvent sous forme de user stories (par ex. « En tant qu'utilisateur, je veux X afin de Y »)

### Sprint Backlog {/*#sprint-backlog*/}

Le sprint backlog contient le **sous-ensemble du product backlog** sélectionné pour le sprint en cours, le [Sprint Goal](#sprint-goal) et un plan pour livrer les éléments sélectionnés.

- Rempli avec les tâches du sprint en cours
- Créé par les Developers
- Concret et réalisable

### Incrément {/*#increment*/}

Un incrément est une **étape concrète** vers le [Product Goal](#product-goal) et s'ajoute à tous les incréments précédents. Plusieurs incréments peuvent être créés au cours d'un sprint, et leur somme est présentée lors de la sprint review. Chaque incrément doit être dans un **état utilisable**, que le Product Owner décide ou non de le publier.

- Composant de produit terminé et testé
- Doit respecter la [Definition of Done (DoD)](#definition-of-done-dod)

---

## Termes importants {/*#important-terms*/}

### Definition of Done (DoD) {/*#definition-of-done-dod*/}

La Definition of Done est un **accord partagé** au sein de l'équipe qui définit des critères clairs pour qu'un élément du backlog soit considéré comme « terminé ». Elle garantit une **qualité homogène** et empêche la livraison de travail incomplet.

**Exemple :**

- Code écrit
- Tests au vert
- Revue effectuée
- Documentation mise à jour

### Product Goal {/*#product-goal*/}

Le Product Goal décrit un **état futur du produit** et sert d'objectif à long terme de l'équipe Scrum. L'équipe Scrum poursuit exactement un Product Goal à la fois. Il doit être atteint ou abandonné avant que le suivant ne soit entrepris.

### Sprint Goal {/*#sprint-goal*/}

Le Sprint Goal est un **objectif général** qui donne à l'équipe une direction commune pour le sprint. Il doit décrire un **résultat significatif** plutôt qu'une liste de tâches.

Non pas « terminer 5 tickets », mais par exemple :

- « Les utilisateurs peuvent s'inscrire et se connecter »
- « Les utilisateurs peuvent donner leur avis avec un bouton dédié »

### Velocity (vélocité) {/*#velocity*/}

La vélocité mesure le **nombre moyen de story points** qu'une équipe termine par sprint. Elle sert d'**outil de planification** pour prévoir la quantité de travail réaliste pour les sprints futurs. Ce n'est pas un outil de classement des performances.

### Story Points {/*#story-points*/}

Les story points sont une **unité d'estimation relative** servant à exprimer l'effort global nécessaire pour implémenter un élément du backlog. Plutôt que d'estimer en heures, les équipes **comparent les éléments entre eux**.

- Souvent Fibonacci (1, 2, 3, 5, 8, 13, ...)
- Prend en compte la complexité, le risque et l'effort

---

## Déroulement typique d'un sprint {/*#typical-sprint-process*/}

1. [Sprint Planning](#sprint-planning)
2. Développement + [Daily Standups](#daily-scrum--daily-standup)
3. [Sprint Review](#sprint-review)
4. [Sprint Retro](#sprint-retrospective-retro)
5. Nouveau sprint

---

## Avantages et inconvénients de Scrum {/*#pros-and-cons-of-scrum*/}

### Avantages {/*#pros*/}

- Livraison rapide de valeur
- Grande flexibilité
- Retours précoces des parties prenantes
- Transparence
- Amélioration continue

### Inconvénients {/*#cons*/}

En pratique, Scrum est souvent mal mis en œuvre. Cela conduit à des anti-patterns courants :

- Rôle du Product Owner mal compris
- Scrum Master en « mini-chef »
- Daily transformé en longue réunion d'état pour les managers
- Pas de véritable auto-organisation
- « On fait du Scrum, mais... »

---

## Différence avec la gestion de projet traditionnelle (par ex. modèle en cascade) {/*#difference-from-traditional-project-management-eg-waterfall-model*/}

| Cascade                              | Scrum                                  |
| ------------------------------------ | -------------------------------------- |
| Planification fixe au début          | Approche itérative                     |
| Les modifications sont coûteuses     | Les modifications sont prévues         |
| Une seule livraison                  | Mises à jour régulières par incréments |
| Hiérarchie forte                     | Auto-organisation                      |
