---
title: Gestion des changements
description: "Gestion des changements dans l'ITSM : RFC, types de changements (standard, normal, d'urgence), instances d'approbation (CAB, CIO, EC/ECAB), FSC, CMDB et PIR"
keywords:
  - "Gestion des changements"
  - "RFC"
  - "Request for Change"
  - "CAB"
  - "Change Advisory Board"
  - "Changement standard"
  - "Changement normal"
  - "Changement d'urgence"
  - "CMDB"
  - "FSC"
  - "PIR"
sidebar_position: 3
tags:
  - ap2
machine_translated: true
---

# Gestion des changements

## Vue d'ensemble {/*#overview*/}

La **gestion des changements** (Change Management) est le troisième niveau de l'ITSM. Elle traite l'approbation et la planification des modifications du système informatique.

**Objectif :** garantir que les changements ne sont pas effectués dans la précipitation et sans vue d'ensemble complète. Des spécialistes de différents domaines évaluent les risques pour éviter les erreurs consécutives. Seuls les changements d'urgence peuvent contourner ce processus, car la plus haute priorité y est le rétablissement le plus rapide possible du système.

## Request for Change (RFC) {/*#request-for-change-rfc*/}

Avant l'exécution d'un changement, une **Request for Change (RFC)** est créée, généralement par la [gestion des problèmes](./problem-management.md). La RFC est une demande formelle de réalisation d'un changement. Elle contient :

- La description du changement
- La raison du changement
- Le calendrier
- La priorité
- Les effets secondaires attendus
- Les coûts estimés

La RFC décrit **ce qui** doit être fait, mais pas **comment**, car le comment est élaboré dans le processus de gestion des changements.

## Priorisation des RFC {/*#rfc-prioritisation*/}

Les RFC entrantes sont priorisées selon l'**urgence** et l'**impact** :

### Niveaux d'urgence {/*#urgency-levels*/}

| Niveau                   | Description                |
| ------------------------ | -------------------------- |
| **Priority Low**         | Souhaitable mais pas urgent |
| **Priority Middle**      | Nécessaire mais pas urgent |
| **Priority High**        | Action immédiate requise   |
| **Priority Immediate**   | Action immédiate requise   |

### Niveaux d'impact {/*#impact-levels*/}

| Niveau            | Description                                                      | Exemple                      |
| ----------------- | ---------------------------------------------------------------- | ---------------------------- |
| **Effect Low**    | Effet minimal sur les services informatiques, effort réduit      | Remplacement d'un PC         |
| **Effect Middle** | Effet modéré, effort accru                                       | Mise à niveau de l'OS de tous les PC |
| **Effect High**   | Effet important sur les services informatiques, effort très élevé | Panne complète d'un serveur |

## Types de changements {/*#change-types*/}

| Type                                           | Caractéristiques                                                                                                          | Approbation                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **Changement standard** (Standard Change)      | Changements de routine pré-approuvés issus d'un catalogue ; risque faible ; autorisés automatiquement                      | Change Manager seul          |
| **Changement normal** (Normal Change)          | Risque moyen, complexité moyenne, urgence modérée ; nécessite une évaluation par des experts                                | CAB + CIO                    |
| **Changement d'urgence** (Emergency Change, Notfall Change) | Urgence élevée, solution à court terme requise ; le processus d'approbation structuré est contourné par souci de rapidité | EC / ECAB                    |

## Instances d'approbation {/*#approval-bodies*/}

| Instance                            | Description                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Change Manager (CM)**             | Décide seul des changements de faible portée (changement standard) ; responsable de la gestion du temps et du suivi                                           |
| **Change Advisory Board (CAB)**     | Comité d'experts issus de différents domaines métier ; décide des changements de portée moyenne (changement normal)                                           |
| **Chief Information Officer (CIO)** | Personne de niveau direction/conseil représentant les intérêts informatiques ; impliquée dans les décisions à large portée métier (p. ex. formation du personnel) |
| **Emergency Committee (EC / ECAB)** | Petite équipe d'experts dotée de pouvoirs étendus pour les décisions urgentes ; traite les changements d'urgence                                              |

## Planification des changements {/*#change-planning*/}

### Forward Schedule of Change (FSC) {/*#forward-schedule-of-change-fsc*/}

Un calendrier dans lequel tous les changements planifiés à long terme sont documentés. La planification doit toujours viser à réduire au minimum les temps d'arrêt.

### Configuration Management Database (CMDB) {/*#configuration-management-database-cmdb*/}

Une base de données centrale dans laquelle tous les CI sont stockés avec leurs spécifications et leurs numéros de licence. Toutes les modifications apportées aux CI y sont documentées de manière centralisée.

Le Change Manager (CM) est responsable de la mise en œuvre planifiée dans le temps et du suivi des changements.

## Approbation et exécution des changements {/*#approving-and-executing-changes*/}

La séparation entre l'approbation/l'autorisation et la planification/l'exécution d'un changement est intentionnelle dans l'ITSM. Elle garantit :

- Des décisions durables prises par des spécialistes qui considèrent le système dans son ensemble
- L'absence de correction réactive d'erreurs sans prise en compte du contexte plus large
- Une responsabilité documentée

## Clôture d'un changement (PIR) {/*#closing-a-change-pir*/}

Une fois un changement mis en œuvre, la gestion des changements documente toutes les mesures ainsi que la cause racine de la défaillance dans la CMDB et la KEDB pour référence ultérieure.

La **Post Implementation Review (PIR)** documente tous les points clés du changement :

- Résultats des tests
- Détails de la mise en œuvre
- Modifications par rapport à l'état précédent du système
- Coûts et effort
- Horodatages

**Objectif de la PIR :** favoriser l'amélioration continue en examinant et en évaluant les changements réalisés.

## Récapitulatif des types de changements et des approbations {/*#change-types-and-approval-summary*/}

| Type de changement     | Instance d'approbation | Caractéristique clé                                  |
| ---------------------- | ---------------------- | ---------------------------------------------------- |
| Changement standard    | Change Manager         | Basé sur un catalogue, pré-approuvé, risque faible   |
| Changement normal      | CAB + CIO              | Risque moyen, CAB impliqué                           |
| Changement d'urgence   | EC / ECAB              | Rapidité maximale, processus structuré contourné     |
