---
title: "Service Level Agreement (SLA)"
description: "Structure et contenu des Service Level Agreements (SLA), Service Level Management, rôles du Service Level Manager et du Service Owner, et OLA"
keywords:
  - "SLA"
  - "Service Level Agreement"
  - "Service Level Management"
  - "OLA"
  - "Operational Level Agreement"
  - "Service Level Manager"
  - "KPI"
  - "Temps de réaction"
tags:
  - ap2
machine_translated: true
---

# Service Level Agreement (SLA)

## Aperçu {/*#overview*/}

Un **SLA (Service Level Agreement)** est un contrat entre un prestataire de services informatiques et un client, qui définit l'étendue, la qualité et les conditions des services informatiques fournis.

## Structure typique d'un SLA {/*#typical-sla-structure*/}

### 1. Description / étendue {/*#1-description--scope*/}

Définit quels problèmes informatiques sont couverts, comment ils sont traités et quels canaux de support sont utilisés (téléphone, e-mail). Précise également le matériel et les systèmes couverts.

### 2. [Priorités](./priorities.md) {/*#2-priorities*/}

Trois niveaux de priorité ou plus, avec des temps de réaction différents. Exemple :

| Priorité   | Temps de réaction                           |
| ---------- | ------------------------------------------- |
| Priorité 1 | 1 heure ouvrée, supplément pour traitement express |
| Priorité 2 | 5 heures ouvrées, priorité standard         |
| Priorité 3 | 1 jour ouvré                                |

**Temps de réaction :** durée entre le signalement de la perturbation au [helpdesk](./service-requests.md) et le début du traitement du problème au niveau de support responsable.

### 3. Heures de service {/*#3-service-times*/}

| Jour                        | Heures                |
| --------------------------- | --------------------- |
| Lun.–Ven.                   | 07:00–20:00           |
| Samedi                      | 09:00–18:00           |
| Dimanches et jours fériés   | Pas de service        |
| Horaires étendus            | Disponibles sur demande |

### 4. Langues {/*#4-languages*/}

Langues prises en charge pour le support (par ex. allemand, anglais).

### 5. Indicateurs de qualité : prise des appels {/*#5-quality-metrics-call-acceptance*/}

| Indicateur                        | Objectif                                         |
| --------------------------------- | ------------------------------------------------ |
| Appels décrochés                  | 95 % de tous les appels entrants, < 5 % perdus   |
| Décrochés en moins de 20 secondes | 75 %                                             |
| Décrochés en moins de 40 secondes | 90 %                                             |
| Traités via la messagerie vocale  | 10 % max.                                        |

### 6. Indicateurs de qualité : résolution des problèmes {/*#6-quality-metrics-problem-resolution*/}

| Indicateur                                      | Objectif                          |
| ----------------------------------------------- | --------------------------------- |
| Durée moyenne de traitement des appels          | 30 minutes max.                   |
| Point d'étape si non résolu dans un délai de    | 4 heures                          |
| Durée moyenne de traitement des perturbations   | 2 heures max.                     |
| Durée maximale de traitement                    | 3 jours                           |
| Taux de résolution minimal                      | 70 % en 2 jours ouvrés            |

### 7. Indicateur de qualité : satisfaction des clients {/*#7-quality-metric-customer-satisfaction*/}

Mesurée par une enquête en ligne et par des appels de contrôle (rappel et évaluation auprès de 10 % des appelants).

### 8. Reporting {/*#8-reporting*/}

Revue mensuelle ; évaluation statistique trimestrielle.

### 9. Validité et durée {/*#9-validity-and-duration*/}

Indique la durée du SLA et la date de sa renégociation (par ex. « valable jusqu'au 1er août 20xx »).

### 10. Signataires {/*#10-signatories*/}

Le prestataire et le client signent chacun l'accord.

## Service Level Management (SLM) {/*#service-level-management-slm*/}

Le **SLM** garantit que des SLA sont conclus avec les clients et que les services sont conçus pour atteindre les niveaux de service convenus.

**Tâches :**

- Recueillir les exigences de service
- Vérifier si les niveaux de service convenus sont respectés
- Fournir des informations dans des Service Level Reports

## Rôles {/*#roles*/}

### Service Level Manager {/*#service-level-manager*/}

Le responsable de processus du Service Level Management.

Responsabilités :

- Négocie les SLA
- Veille à leur respect
- Veille à ce que tous les processus ITSM, les OLA et les contrats avec des tiers soutiennent les objectifs de niveau de service convenus
- Surveille les niveaux de service et fournit des rapports

### Service Owner (Serviceverantwortlicher) {/*#service-owner-serviceverantwortlicher*/}

Responsable de la fourniture d'un service d'infrastructure dans le respect des SLA convenus.

Responsabilités :

- Sert d'interlocuteur de négociation au Service Level Manager lors de la convention des OLA
- Généralement un responsable qui dirige une équipe de spécialistes techniques ou un domaine de support interne

## OLA (Operational Level Agreement) {/*#ola-operational-level-agreement*/}

Un **OLA** est un accord interne entre équipes ou services informatiques sur la fourniture de services au niveau opérationnel. Les OLA soutiennent le respect des SLA externes.
