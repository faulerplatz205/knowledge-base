---
title: "Gestion des problèmes"
description: "Gestion des problèmes en ITSM : distinction entre incidents et problèmes, contrôle des problèmes, contrôle des erreurs, gestion proactive des problèmes et indicateurs clés"
keywords:
  - "Gestion des problèmes"
  - "Erreur connue"
  - "Base de données des erreurs connues"
  - "Solution de contournement"
  - "Contrôle des problèmes"
  - "Contrôle des erreurs"
  - "Gestion proactive des problèmes"
  - "Analyse des causes racines"
sidebar_position: 2
tags:
  - ap2
machine_translated: true
---

# Gestion des problèmes

## Aperçu {/*#overview*/}

La gestion des problèmes constitue le **deuxième niveau de la gestion des incidents**. Alors que la gestion des incidents vise à rétablir le service le plus vite possible, la gestion des problèmes identifie et élimine la cause racine sous-jacente afin d'éviter de futurs incidents.

## Incident, problème et erreur connue {/*#incident-vs-problem-vs-known-error*/}

| Terme               | Définition                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Incident**        | Interruption de service non planifiée ; la cause peut être inconnue ; le rétablissement du service est prioritaire |
| **Problème**        | Un ou plusieurs incidents dont la **cause racine est inconnue** ; examiné par des experts                       |
| **Erreur connue**   | Problème dont la cause racine est connue et pour lequel il existe une solution de contournement ou un correctif |

Si aucune solution n'est trouvée au support de premier niveau, le ticket est **escaladé** : l'incident devient un problème pris en charge par le support de deuxième niveau.

## Les trois activités de la gestion des problèmes {/*#the-three-activities-of-problem-management*/}

### 1. Contrôle des problèmes {/*#1-problem-control*/}

Tous les problèmes sont analysés et documentés de manière systématique. L'objectif est de transformer les causes inconnues en **erreurs connues**.

Étapes :

1. Enregistrer le problème et le comparer à la base de données des erreurs connues
2. Si une solution de contournement ou une solution existe déjà => erreur connue, mise à jour du compteur d'occurrences
3. Classer le problème (catégorie, sous-catégorie, priorité, impact métier)
4. Analyser la cause racine (voir [méthodes d'analyse](./analysis-methods.md))
5. Enregistrer le résultat comme nouvelle erreur connue dans la KEDB

### 2. Contrôle des erreurs {/*#2-error-control*/}

Dès qu'une erreur connue existe, le contrôle des erreurs gère le passage de la solution de contournement au correctif définitif.

- Une **solution de contournement** est fournie immédiatement pour rétablir le service
- Le correctif définitif est lancé via une **[RFC](./change-management.md#request-for-change-rfc)**
- Après la mise en œuvre du changement, la gestion des problèmes reçoit une confirmation via une **[revue post-implémentation (PIR)](./change-management.md#closing-a-change-pir)**
- Le support de premier niveau est informé afin de pouvoir tenir le client au courant

### 3. Gestion proactive des problèmes {/*#3-proactive-problem-management*/}

Prévenir les incidents avant qu'ils ne surviennent :

- Analyser les erreurs connues qui se répètent fréquemment (compteur d'occurrences élevé = candidat à la gestion proactive des problèmes)
- Évaluer les avis des fabricants sur les problèmes logiciels et matériels à venir
- Surveiller les avertissements et exceptions automatisés

## Solution de contournement {/*#workaround*/}

Une **solution de contournement** (workaround) est un contournement, une alternative ou une solution intermédiaire du problème, qui permet de rétablir rapidement le service à titre provisoire pendant que la cause racine est traitée.

**Important :** les solutions de contournement doivent être clairement signalées comme mesures temporaires dans le système, afin que la correction provisoire ne devienne pas un état permanent.

**Exemples :**

| Perturbation                                   | Solution de contournement                                 |
| ---------------------------------------------- | --------------------------------------------------------- |
| Webcam intégrée défectueuse                    | Brancher une caméra USB                                   |
| Terminal mobile de saisie de données défectueux | Utiliser un appareil de prêt                              |
| Port réseau filaire défectueux                 | Utiliser une clé WLAN ou un adaptateur LAN                |
| Port moniteur DVI défectueux                   | Utiliser DisplayPort ou HDMI si disponible                |
| L'imprimante laser ne démarre pas              | Débrancher l'alimentation et redémarrer                   |
| Le navigateur affiche une page blanche         | Vider le cache du navigateur ou utiliser un autre navigateur |

## Base de données des erreurs connues (KEDB) {/*#known-error-database-kedb*/}

La KEDB stocke tous les problèmes connus avec leur solution de contournement ou leur solution. Le support de premier niveau l'utilise pour apporter une aide rapide sans escalade vers le deuxième niveau.

Chaque entrée possède un **compteur d'occurrences** (Vorfallszähler) qui suit la fréquence de réapparition du problème. Un compteur élevé désigne un candidat à la gestion proactive des problèmes.

## Indicateurs clés (KPI) {/*#key-kpis*/}

| KPI                                                  | Signification                                                                                                                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nombre de nouveaux problèmes**                     | Total des problèmes enregistrés sur une période ; la gestion proactive vise à le réduire en résolvant les erreurs avant qu'elles ne deviennent des incidents               |
| **Nombre d'incidents par problème connu**            | Nombre moyen d'incidents associés à un même problème ; montre l'étendue de l'impact et identifie les candidats à la gestion proactive des problèmes                        |
| **Effort de résolution des problèmes**               | Effort de travail moyen pour résoudre un problème, ventilé par catégorie ; montre quelles catégories demandent le plus d'effort                                            |

## Séparation entre localisation et résolution des problèmes {/*#separation-of-problem-localisation-and-problem-resolution*/}

La gestion des problèmes localise la cause racine ; la [gestion des changements](./change-management.md) la résout. Cette séparation :

- Permet de se concentrer sur une tâche à la fois
- Permet de rétablir le service (solution de contournement) avant la fin de l'analyse de la cause racine
- N'implique pas nécessairement des équipes différentes, mais sépare les étapes du processus
