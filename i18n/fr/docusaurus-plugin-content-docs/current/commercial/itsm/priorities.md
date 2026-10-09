---
title: "Priorisation dans le support informatique"
description: "La matrice de priorité ITIL (urgence x impact) et la matrice d'Eisenhower comme outils de priorisation des incidents et des tâches dans le support informatique"
keywords:
  - "Matrice de priorité ITIL"
  - "Urgence"
  - "Impact"
  - "Matrice d'Eisenhower"
  - "Priorisation"
  - "Priorité des incidents"
  - "Temps de réponse"
  - "SLA"
tags:
  - ap2
machine_translated: true
---

# Priorisation dans le support informatique

## Aperçu {/*#overview*/}

Deux outils principaux servent à la priorisation dans le support informatique : la **matrice de priorité ITIL** et la **matrice d'Eisenhower**.

## Matrice de priorité ITIL {/*#itil-priority-matrix*/}

### Niveaux d'urgence {/*#urgency-levels*/}

| Niveau         | Description                                                                                                                                                                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Élevée (H)** | Le dommage causé par l'incident augmente rapidement. Les tâches qui ne peuvent pas être accomplies sont très critiques en termes de délai. Une action rapide peut empêcher qu'un incident mineur ne devienne un [incident majeur](./incident-management.md#major-incident). Plusieurs utilisateurs VIP sont concernés. |
| **Moyenne (M)** | Le dommage augmente avec le temps. Les tâches qui ne peuvent pas être accomplies ne sont que modérément critiques en termes de délai. Un utilisateur VIP est concerné.                                                                                                       |
| **Faible (N)** | Le dommage n'augmente pas avec le temps. Les tâches qui ne peuvent pas être accomplies ne sont pas critiques en termes de délai.                                                                                                                                             |

### Niveaux d'impact {/*#impact-levels*/}

| Niveau         | Description                                                                                                                                                                                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Élevé (H)**  | Grand nombre de collaborateurs concernés et/ou dans l'incapacité d'accomplir leurs tâches. Grand nombre de clients concernés ou sensiblement affectés. Dommage financier probable > 10 000 EUR. Atteinte probable à la réputation à grande échelle. Danger pour la vie et l'intégrité physique.            |
| **Moyen (M)**  | Nombre modéré de collaborateurs concernés et/ou dans l'incapacité d'accomplir leurs tâches comme prévu. Nombre modéré de clients concernés ou subissant des restrictions de confort. Dommage financier probable de 1 000 à 10 000 EUR. Atteinte modérée probable à la réputation.                         |
| **Faible (N)** | Nombre minime de collaborateurs concernés ; les tâches restent réalisables, mais avec un effort supplémentaire. Nombre minime de clients concernés ; seules de légères restrictions de confort. Dommage financier probable < 1 000 EUR. Seule une atteinte minime à la réputation est attendue.            |

### Matrice de priorité {/*#priority-matrix*/}

La **matrice urgence x impact** produit un niveau de priorité de 1 (le plus critique) à 5 (le plus bas) :

|               | **Impact H** | **Impact M** | **Impact N** |
| ------------- | ------------ | ------------ | ------------ |
| **Urgence H** | **1**        | 2            | 3            |
| **Urgence M** | 2            | **3**        | 4            |
| **Urgence N** | 3            | 4            | **5**        |

### Codes de priorité et temps de réponse/résolution du [SLA](./sla.md) {/*#priority-codes-and-sla-responseresolution-times*/}

| Priorité | Description                  | Temps de réponse | Temps de résolution |
| -------- | ---------------------------- | ---------------- | ------------------- |
| **1**    | Kritisch (critique)          | Immédiat         | 1 heure             |
| **2**    | Hoch (élevée)                | 10 minutes       | 4 heures            |
| **3**    | Mittel (moyenne)             | 1 heure          | 8 heures            |
| **4**    | Niedrig (faible)             | 4 heures         | 24 heures           |
| **5**    | Sehr niedrig (très faible)   | 1 jour           | 1 semaine           |

## Matrice d'Eisenhower {/*#eisenhower-matrix*/}

La **matrice d'Eisenhower** est une méthode de gestion du temps permettant de distinguer les tâches importantes des tâches urgentes. Elle porte le nom du président américain Dwight D. Eisenhower (1953-1961). Elle est aussi appelée méthode des quatre quadrants, méthode d'Eisenhower ou boîte d'Eisenhower.

**Objectif :** ne pas faire les choses correctement, mais faire les bonnes choses (efficacité, et pas seulement efficience).

Deux questions par tâche :

1. Quelle est l'importance de la tâche ?
2. Quelle est l'urgence de la tâche ?

### Les quatre quadrants {/*#the-four-quadrants*/}

|                   | **Urgent**                              | **Non urgent**                                 |
| ----------------- | --------------------------------------- | ---------------------------------------------- |
| **Important**     | **A : faire** (immédiatement, soi-même) | **B : planifier** (planifier et fixer un délai) |
| **Non important** | **C : déléguer** (ou automatiser)       | **D : écarter** (archiver ou supprimer)        |

### Principes {/*#principles*/}

- Les tâches importantes sont celles directement liées aux objectifs définis
- Les tâches urgentes ne tolèrent aucun retard et sont, idéalement, traitées immédiatement
- Tâches importantes ET urgentes : les traiter soi-même, le plus vite possible
- Tâches urgentes mais NON importantes : les déléguer ou les automatiser si possible, sinon les traiter après les tâches A
- Tâches importantes mais NON urgentes : les planifier et les programmer ; leur priorité est inférieure à celle des tâches A
- Tâches ni importantes ni urgentes : ne pas les traiter ; les archiver ou les supprimer selon le cas

## Comparaison : matrice ITIL et matrice d'Eisenhower {/*#comparison-itil-matrix-vs-eisenhower-matrix*/}

| Critère                 | Matrice de priorité ITIL                                                                                                    | Matrice d'Eisenhower                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **Finalité**            | Priorisation des [incidents](./incident-management.md)/[problèmes](./problem-management.md)/[changements](./change-management.md) informatiques | Priorisation de tâches personnelles ou d'équipe |
| **Dimensions**          | Urgence x impact (orienté métier)                                                                                           | Urgence x importance (orienté objectifs)      |
| **Échelle**             | 5 niveaux de priorité avec des temps [SLA](./sla.md) définis                                                                | 4 quadrants avec des actions                  |
| **Mieux adaptée à**     | Centre de services informatiques, équipes structurées                                                                       | Autogestion, organisation générale des tâches |
| **Aspect pratique**     | Objective, standardisée, évolutive                                                                                          | Plus simple, plus flexible, moins structurée  |
