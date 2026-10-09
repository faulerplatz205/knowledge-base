---
title: "Classification des demandes de service"
description: "Les trois types de demandes de service entrantes en ITSM : événements, demandes de service et incidents, ainsi que le rôle du helpdesk comme SPOC"
keywords:
  - "Demande de service"
  - "Incident"
  - "Événement"
  - "SPOC"
  - "Helpdesk"
  - "Support de premier niveau"
  - "Système de suivi des tickets"
  - "Base de connaissances"
tags:
  - ap2
machine_translated: true
---

# Classification des demandes de service

## Aperçu {/*#overview*/}

Tous les messages entrants arrivent au point central de l'organisation informatique, le **point de contact unique (Single Point of Contact, SPOC)**, aussi appelé **helpdesk**. Le helpdesk peut être organisé de manière locale, décentralisée ou virtuelle (plusieurs helpdesks apparaissant comme un seul vis-à-vis de l'extérieur). Ce premier niveau d'assistance est aussi appelé **support de premier niveau**.

Les messages entrants se répartissent fondamentalement en trois types :

## Les trois types {/*#the-three-types*/}

### [Événement](./event-management.md) {/*#event*/}

**Message généré automatiquement** sur l'état d'un système. Ces messages entrants sont aussi appelés **événements** (Events) et ne nécessitent aucun signalement direct de la part d'un utilisateur. Ils sont générés par le système de supervision.

### Demande de service {/*#service-request*/}

**Demande formelle d'un utilisateur** ou demande d'assistance, aussi appelée **Service Request**. Cela comprend les questions générales, les mots de passe oubliés, les instructions d'utilisation d'un programme ou les demandes de nouveau matériel.

### [Incident](./incident-management.md) {/*#incident*/}

**Signalement d'une interruption non planifiée** d'un service, appelé en ITSM **Incident**.

## Système de suivi des tickets {/*#issue-tracking-system*/}

Le **système de suivi des tickets** (Issue Tracking System) du helpdesk gère toutes les demandes entrantes et les attribue automatiquement au personnel du helpdesk disponible. Il offre une vue détaillée de l'historique des perturbations et des demandes.

Aussi appelé : **système de helpdesk** ou **système de tickets de support**.

Déroulement du processus :

```text
Customer inquiry / disruption report
=> Create service ticket
=> Classify and prioritise (HW / SW / NW, urgency, impact)
=> Route to responsible team
=> Find and deliver solution
=> Document and close (incl. commercial aspects via CRM link)
```

Finalité de la catégorisation et de la priorisation : garantir que la bonne équipe traite le ticket et que sa gravité puisse être évaluée correctement.

## Base de connaissances {/*#knowledge-base*/}

**Système d'aide au traitement de l'information fondé sur la connaissance**, consultable en libre-service. Le personnel du helpdesk l'utilise pour trouver rapidement des solutions aux problèmes connus ([erreurs connues](./problem-management.md#known-error-database-kedb)).

| Avantages                                                                                    | Inconvénients                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Réponses rapides aux problèmes répétitifs                                                    | Les connaissances deviennent obsolètes => maintenance coûteuse |
| Les connaissances restent dans l'entreprise même après le départ du personnel => évite les lacunes de connaissances | Tous les problèmes n'ont pas de solution toute prête           |
| Dépannage économique                                                                         | Moins d'interaction directe avec le client                     |

## Processus de traitement des demandes (Request Fulfillment) {/*#request-fulfillment-process*/}

Le sous-processus **Request Fulfillment** traite les demandes de service (questions des clients). Son objectif est de traiter efficacement les modifications mineures (geringfügige) et les questions des utilisateurs.

- Responsable : support de premier niveau
- Outils utilisés : système de suivi des tickets, base de connaissances, manuel
- Déclencheur : un client contacte le support avec une question d'utilisateur
- Point de décision : classification de la demande de l'utilisateur (Hilfestellung / Änderungswunsch / Passwortanfrage)
