---
title: Gestion des événements
description: "Les trois types d'événements informatiques (Information, Warning et Exception) et leur gestion dans l'ITSM"
keywords:
  - "Gestion des événements"
  - "Message d'état"
  - "Information"
  - "Warning"
  - "Exception"
  - "Surveillance"
  - "ITSM"
tags:
  - ap2
machine_translated: true
---

# Gestion des événements

## Vue d'ensemble {/*#overview*/}

Les **événements** ne nécessitent pas de signalement direct par un utilisateur. Ils sont générés automatiquement par le système de surveillance et représentent des messages d'état sur la situation d'un système. Le terme « événement » peut être compris comme un déclencheur ou une notification entrante classée selon sa pertinence.

Une prise en charge logicielle permet le filtrage et peut être configurée de manière à transmettre les messages d'exception aux responsables le plus rapidement possible.

## Types d'événements {/*#event-types*/}

### Information {/*#information*/}

Un **message d'état sur un système, sans action requise**.

Le système fonctionne normalement ; aucune intervention n'est nécessaire.

**Exemple :** l'utilisation du réseau se situe entre 45 % et 48 %.

### Warning {/*#warning*/}

Un **message d'état indiquant la nécessité d'une surveillance plus étroite** ; une action peut devenir nécessaire prochainement. L'avertissement signale qu'un problème approche.

**Exemple :** la grappe de données RAID signale une capacité restante de 20 %.

### Exception {/*#exception*/}

Un **message d'état exigeant une action immédiate**. Le système ou le service est tombé en panne ou a dépassé un seuil critique. Les exceptions conduisent généralement à un [incident](./incident-management.md).

**Exemple :** le commutateur réseau à 48 ports est tombé en panne.

## Exemples de classification d'événements {/*#event-classification-examples*/}

| Événement                                                                | Type        | Raison                                                                         |
| ------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------ |
| Capacité du disque dur à 80 %                                            | Warning     | Pas encore un problème, mais cela pourrait le devenir bientôt                  |
| Réseau stable à 40 % de charge                                           | Information | État normal du système                                                         |
| Système ERP web inaccessible                                             | Exception   | Panne exigeant une action immédiate                                            |
| Serveur web stable à 85 % de charge                                      | Warning     | Charge élevée, proche du seuil critique                                        |
| 48 licences User CAL sur 50 utilisées                                    | Warning     | Limite de licences presque atteinte ; devient une exception en cas de dépassement |
| 52 appareils connectés mais seulement 50 licences Device CAL disponibles | Exception   | Limite de licences dépassée                                                    |
