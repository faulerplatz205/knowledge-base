---
title: "Gestion des mises en production"
description: "Gestion des mises en production en ITSM : exécution fluide des changements par déploiement Big Bang ou progressif, paquets de release, retour arrière, machines virtuelles et PIR"
keywords:
  - "Gestion des mises en production"
  - "Big Bang"
  - "Déploiement progressif"
  - "Paquet de release"
  - "Retour arrière"
  - "Machine virtuelle"
  - "PIR"
  - "Gestion des changements"
  - "ITSM"
sidebar_position: 4
tags:
  - ap2
machine_translated: true
---

# Gestion des mises en production

## Aperçu {/*#overview*/}

La **gestion des mises en production** (Release Management) est le quatrième niveau de l'ITSM et le prolongement de la gestion des changements. Alors que la gestion des changements approuve et planifie un changement, la gestion des mises en production l'**exécute**, en visant un déploiement fluide et sans interruption.

## Relation avec la gestion des changements {/*#relationship-to-change-management*/}

| Gestion des changements                                          | Gestion des mises en production                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| Approuve et planifie les changements                             | Exécute les changements                                              |
| Crée la [RFC](./change-management.md#request-for-change-rfc)     | Met en œuvre la [RFC](./change-management.md#request-for-change-rfc) |
| Décide du quoi et du quand                                       | Décide du comment et déploie                                         |

## Paquet de release {/*#release-package*/}

Avant le déploiement, un **paquet de release** regroupant tous les changements planifiés est créé. Les tests s'effectuent de préférence sur un [CI](./incident-management.md#configuration-items-ci) prélevé dans l'environnement de production en fonctionnement, mis à jour, puis replacé dans un environnement de test. Après une période de test définie sans problème, la release peut être déployée sur tous les systèmes cibles.

Un système de distribution de logiciels aide à distribuer efficacement les releases à de nombreux [CI](./incident-management.md#configuration-items-ci).

## Approches de déploiement {/*#rollout-approaches*/}

### Big Bang {/*#big-bang*/}

Tous les destinataires reçoivent la release en même temps.

**Avantages :**

- Mise en œuvre globale plus rapide
- Tous les systèmes disposent simultanément de la même mise à jour
- Dépannage plus efficace (pas de différences de version)

**Inconvénients :**

- Risque élevé en cas d'erreur (tous les systèmes sont touchés en même temps)
- Forte charge sur l'infrastructure pendant le déploiement

### Progressif {/*#phased*/}

La release est d'abord déployée sur un **sous-ensemble** de destinataires, puis progressivement sur davantage de destinataires.

**Avantages :**

- Risque plus faible (seule une partie des systèmes est touchée)
- Les erreurs sont détectées plus tôt, sans panne majeure

**Inconvénients :**

- La mise en œuvre prend plus de temps
- Plusieurs versions logicielles fonctionnent simultanément pendant la transition

## Retour arrière {/*#rollback*/}

Si une release échoue de manière inattendue dans l'environnement de production, un **retour arrière** (rollback) vers l'état précédent doit toujours être disponible. Une fois le déploiement terminé, l'utilisateur est informé de la mise à jour via les instances de processus.

## Machines virtuelles dans la gestion des mises en production {/*#virtual-machines-in-release-management*/}

**Machine virtuelle (VM) :** encapsulation logicielle d'un système informatique qui simule un PC réel sur un ordinateur hôte.

**Avantages :**

- Les copies peuvent être créées, démarrées et modifiées facilement et sans risque
- Les systèmes physiques peuvent être convertis en VM (P2V = Physical to Virtual)

**Intérêt pour la gestion des mises en production :** les nouvelles versions, mises à jour et applications peuvent être testées en toute sécurité dans un environnement de VM. Les versions plus anciennes peuvent continuer à fonctionner en parallèle (efficacité des ressources).

## Aperçu des processus ITSM {/*#itsm-process-overview*/}

Les quatre niveaux de l'ITSM fonctionnent ensemble comme une chaîne :

| Processus                                                       | Rôle                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [**Gestion des incidents**](./incident-management.md)           | Enregistre les perturbations, filtre les problèmes                       |
| [**Gestion des problèmes**](./problem-management.md)            | Identifie les causes racines, fournit une solution de contournement si possible |
| [**Gestion des changements**](./change-management.md)           | Approuve et planifie les changements pertinents                          |
| [**Gestion des mises en production**](./release-management.md)  | Exécute les changements en toute sécurité                                |

**Raison de cette séparation :** l'orchestration des processus vise la durabilité et structure un flux de travail complexe.

## Processus ITSM et [phases IMAC/R/D](./service-types.md#imacrd-lifecycle) {/*#itsm-processes-and-imacrd-phases*/}

| Activité IMAC/R/D                  | Processus ITSM concernés                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Wartung (maintenance)              | Gestion des changements, gestion des mises en production                                                |
| Inspektion (inspection)            | Gestion des problèmes, gestion des changements, gestion des mises en production                         |
| Instandsetzung (remise en état)    | Gestion des incidents, gestion des problèmes, gestion des changements, gestion des mises en production  |
| Verbesserung (amélioration)        | Gestion des changements, gestion des mises en production                                                |
