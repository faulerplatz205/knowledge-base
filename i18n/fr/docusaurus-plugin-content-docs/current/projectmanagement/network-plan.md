---
title: "Réseau de planification"
description: "Un réseau de planification modélise les tâches d'un projet sous forme de graphe orienté afin d'identifier les dépendances, de calculer les dates au plus tôt et au plus tard et de déterminer le chemin critique."
keywords:
    - Réseau de planification
    - CPM
    - Chemin critique
    - Planification de projet
    - Gestion de projet
tags:
    - ap2
machine_translated: true
---

# Réseau de planification

## Aperçu {/*#overview*/}

:::info
Il existe différentes méthodes de planification en réseau, telles que CPM (Critical Path Method), PERT et MPM. Cet article traite de la CPM.
:::

Un réseau de planification est un graphe orienté qui modélise les tâches sous forme de nœuds, les flèches représentant les dépendances. Il permet une planification précise et l'identification des goulots d'étranglement.

## Structure d'un nœud {/*#node-structure*/}

Chaque nœud du réseau de planification contient les champs suivants :

```text
┌──────────────────────────┐
│         Task Name        │
├─────────────┬────────────┤
│ EAT         │ EET        │
├─────────────┼────────────┤
│ Total Float │ Free Float │
├─────────────┼────────────┤
│ LAT         │ LET        │
├─────────────┴────────────┤
|          Duration        |
└──────────────────────────┘
```

- **EAT** (Earliest Start Time, début au plus tôt) : le moment le plus précoce où la tâche peut commencer
- **EET** (Earliest End Time, fin au plus tôt) : le moment le plus précoce où la tâche peut se terminer
- **LAT** (Latest Start Time, début au plus tard) : le moment le plus tardif où la tâche peut commencer sans retarder le projet
- **LET** (Latest End Time, fin au plus tard) : le moment le plus tardif où la tâche peut se terminer
- **Marge libre (Free Float) :** `min(EAT of all successors) − EET` ; de combien une tâche peut être retardée sans retarder aucun de ses successeurs immédiats
- **Marge totale (Total Float) :** `LAT − EAT` ; la durée dont une tâche peut être retardée sans repousser la date de fin du projet

## Types de marges {/*#buffer-types*/}

La **marge libre** décrit une flexibilité *locale* : combien de temps une tâche peut déraper avant de retarder l'un de ses successeurs immédiats. Elle ne regarde qu'une étape en avant dans le réseau.

La **marge totale** décrit une flexibilité *globale* : combien de temps une tâche peut déraper avant que la date de fin globale du projet ne soit affectée, indépendamment des effets intermédiaires.

Les deux satisfont toujours `Free Float ≤ Total Float`. Lorsque `Total Float > Free Float`, un retard supérieur à la marge libre décale un successeur plus tôt dans la chaîne, mais ce successeur dispose de suffisamment de marge totale propre pour absorber l'impact sans repousser la fin du projet. Les tâches du chemin critique ont les deux valeurs égales à zéro.

## Calcul du plan {/*#calculating-the-plan*/}

**Calcul aller** – calcul de EAT et EET de gauche à droite :

- EET = EAT + durée
- Si une tâche a plusieurs prédécesseurs => EAT = le maximum des EET de tous les prédécesseurs

**Calcul retour** – calcul de LAT et LET de droite à gauche :

- LAT = LET − durée
- Si une tâche a plusieurs successeurs => LET = le minimum des LAT de tous les successeurs

## Chemin critique {/*#critical-path*/}

Le chemin critique est la plus longue séquence de tâches dépendantes entre le début et la fin du projet. Les tâches du chemin critique ont une **marge totale de zéro**, ce qui signifie que tout retard repousse directement la date de fin globale du projet.

## Avantages {/*#advantages*/}

- Modélise explicitement les dépendances entre tâches
- Identifie le chemin critique et les goulots d'étranglement de la planification
- Permet un calcul précis des dates de début et de fin au plus tôt et au plus tard
- Mieux adapté aux projets complexes à fortes dépendances

## Inconvénients {/*#disadvantages*/}

- Plus complexe à construire et à lire qu'un [diagramme de Gantt](./gantt.md)
- Moins intuitif pour les parties prenantes non techniques
- Exige des estimations de durée précises pour être pertinent

## Exemple {/*#example*/}

**Projet :** lancement d'un site web

| ID | Tâche                    | Durée    | Prédécesseurs |
|----|--------------------------|----------|---------------|
| A  | Analyse des exigences    | 2 jours  | —             |
| B  | Conception de l'interface | 3 jours | A             |
| C  | Développement backend    | 5 jours  | A             |
| D  | Développement frontend   | 4 jours  | B             |
| E  | Intégration              | 2 jours  | C, D          |
| F  | Tests                    | 3 jours  | E             |
| G  | Déploiement              | 1 jour   | F             |

**Structure du réseau :**

```text
    ┌──► B ──► D ───┐
A ──┤               ├──► E ──► F ──► G
    └──► C ─────────┘
```

**Valeurs calculées des nœuds :**

```text
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  A: Requirements     │      │  B: UI Design        │      │  C: Backend Dev      │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  EAT: 0  │  EET: 2   │      │  EAT: 2  │  EET: 5   │      │  EAT: 2  │  EET: 7   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │      │  TF:  2  │  FF:  2   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  LAT: 0  │  LET: 2   │      │  LAT: 2  │  LET: 5   │      │  LAT: 4  │  LET: 9   │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│        Dur: 2        │      │        Dur: 3        │      │        Dur: 5        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  D: Frontend Dev     │      │  E: Integration      │      │  F: Testing          │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  EAT: 5  │  EET: 9   │      │  EAT: 9  │  EET: 11  │      │  EAT: 11 │  EET: 14  │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  LAT: 5  │  LET: 9   │      │  LAT: 9  │  LET: 11  │      │  LAT: 11 │  LET: 14  │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│        Dur: 4        │      │        Dur: 2        │      │        Dur: 3        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐
│  G: Deployment       │
├──────────┬───────────┤
│  EAT: 14 │  EET: 15  │
├──────────┼───────────┤
│  TF:  0  │  FF:  0   │
├──────────┼───────────┤
│  LAT: 14 │  LET: 15  │
├──────────┴───────────┤
│        Dur: 1        │
└──────────────────────┘
```

**Chemin critique :** A => B => D => E => F => G (15 jours au total)

La tâche C a une marge totale de 2 jours (qui est ici aussi égale à sa marge libre) et ne se trouve pas sur le chemin critique. Le développement backend peut donc démarrer avec jusqu'à 2 jours de retard sans retarder aucun successeur ni la date de fin du projet.
