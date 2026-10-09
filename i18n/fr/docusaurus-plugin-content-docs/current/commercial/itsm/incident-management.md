---
title: Gestion des incidents
description: "Gestion des incidents dans l'ITSM : éléments de configuration, catégorisation, priorisation, fiche d'incident, incidents majeurs et niveaux de support"
keywords:
  - "Gestion des incidents"
  - "Élément de configuration"
  - "CI"
  - "Fiche d'incident"
  - "Incident majeur"
  - "Support de premier niveau"
  - "Demande de service"
  - "Système de suivi des tickets"
sidebar_position: 1
tags:
  - ap2
machine_translated: true
---

# Gestion des incidents

## Vue d'ensemble {/*#overview*/}

La **gestion des incidents** (Incident Management) est le **premier niveau de l'ITSM**. Elle vise à aider les utilisateurs à reprendre leur travail aussi rapidement que possible après une perturbation informatique.

## Éléments de configuration (CI) {/*#configuration-items-ci*/}

Un **élément de configuration (Configuration Item, CI)** est un terme large couvrant pratiquement tout le matériel et tous les logiciels. Les CI sont caractérisés par des attributs et reliés à d'autres CI.

| Catégorie                 | Exemples                                                        |
| ------------------------- | --------------------------------------------------------------- |
| Systèmes matériels        | PC, ordinateur portable, serveur, client léger                  |
| Composants matériels      | Cartes graphiques, cartes réseau, disques durs, processeurs     |
| Composants logiciels      | Systèmes d'exploitation, logiciels applicatifs                  |
| Composants réseau         | Routeur, commutateur, concentrateur, répéteur, panneau de brassage, NAS |
| Périphériques             | Imprimante, scanner, webcam                                     |
| Appareils mobiles         | Tablette, smartphone, appareils de saisie de données            |

## Définition de l'incident {/*#incident-definition*/}

Un **incident** est toute interruption non planifiée ou réduction de la qualité d'un service informatique. Même un événement susceptible d'altérer un service informatique à l'avenir est considéré comme un incident. Cela inclut des événements mineurs tels que le remplacement d'une cartouche de toner vide.

**Objectif principal : rétablir le service concerné aussi rapidement que possible.**

## Catégorisation {/*#categorisation*/}

Les incidents sont catégorisés lors de leur première saisie dans le système de suivi des tickets (Issue Tracking System) :

- **HW** = problème matériel (hardware)
- **SW** = problème logiciel (software)
- **NW** = problème réseau (network)

Finalité : garantir que l'équipe compétente est responsable et que la gravité peut être évaluée correctement.

## Priorisation {/*#prioritisation*/}

La priorisation est déterminée par deux facteurs :

- **Urgence (Dringlichkeit) :** dans quelle mesure la perturbation affecte-t-elle l'objectif de l'utilisateur ?
- **Impact (Auswirkung) :** combien de personnes sont touchées par la perturbation ?

La combinaison de l'[urgence et de l'impact](./priorities.md#itil-priority-matrix) détermine l'ordre de traitement des tickets entrants.

## Niveaux de support {/*#support-levels*/}

| Niveau                    | Description                                                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Support de premier niveau** | Helpdesk / SPOC ; traite les problèmes simples à l'aide de la base de connaissances et fait office de « pare-feu » pour le support de deuxième niveau en assurant la communication directe avec le client |
| **Support de deuxième niveau** | Experts pour l'analyse des causes racines ([gestion des problèmes](./problem-management.md)) ; réévalue la priorité initiale définie par le premier niveau                     |
| **Support de troisième niveau** | Support du fabricant ou spécialistes externes lorsque le deuxième niveau ne peut pas résoudre le problème                                                                     |

## Fiche d'incident {/*#incident-record*/}

La **fiche d'incident** (Incident Record) est un document contenant toutes les informations sur un incident, documentant son cycle de vie de la saisie initiale à la résolution. Il s'agit d'un document d'information qui ne doit plus être modifié après la clôture de l'instance de processus.

Les 17 composants standard :

1. ID / identifiant
2. Saisie initiale (date/heure)
3. Type de notification
4. Agent du service desk
5. Données du déclarant/utilisateur
6. Canal de communication
7. **Description du symptôme** (champ le plus important ; aide à diagnostiquer et à rechercher des solutions)
8. Utilisateurs, sites et/ou domaines métier concernés
9. Services concernés
10. Priorisation
11. Références de CI
12. Catégorie d'incident
13. Liens vers d'autres fiches d'incident
14. Liens vers des fiches de problème
15. Historique des statuts de l'incident
16. Historique des activités / tâches
17. Données de résolution et de clôture

**Les 5 champs principaux à toujours saisir :** priorisation, catégorie d'incident, ID, utilisateur/service concerné, canal de communication.

## Incident majeur {/*#major-incident*/}

Un **incident majeur** (Major Incident) est un événement de haute priorité et de fort impact qui provoque une panne critique de service ou une perturbation massive affectant significativement les activités de l'entreprise. Il se voit généralement attribuer la priorité « Critical » ou « High ».

Caractéristiques :

- Un nombre important de clients ou de groupes de clients importants sont touchés
- Les coûts et les pertes pour les clients et/ou l'organisation de services sont considérables
- La réputation du prestataire de services risque d'être endommagée
- Le travail et le temps nécessaires pour résoudre l'incident sont probablement importants, et les accords [SLA](./sla.md) existants risquent d'être enfreints

## Demande de service et incident {/*#service-request-vs-incident*/}

|                     | Demande de service (Service Request)                                       | Incident                                         |
| ------------------- | -------------------------------------------------------------------------- | ------------------------------------------------ |
| **Déclencheur**     | L'utilisateur contacte activement le support avec une question ou un souhait | Perturbation non planifiée du service          |
| **Exemples**        | Mot de passe oublié, question sur un logiciel, installation d'un nouveau poste de travail | Panne d'imprimante, ERP inaccessible, rançongiciel |
| **Traité par**      | Généralement résolu entièrement au support de premier niveau               | Peut nécessiter une escalade vers le 2e/3e niveau |
| **Processus**       | Request Fulfillment                                                        | Gestion des incidents                            |
