---
title: "Diagramme de Gantt"
description: "Un diagramme de Gantt est un diagramme à barres horizontales servant à visualiser le calendrier d'un projet, en montrant les tâches, leurs durées et leur déroulement dans le temps."
keywords:
    - Diagramme de Gantt
    - Planification de projet
    - Gestion de projet
tags:
    - ap2
machine_translated: true
---

# Diagramme de Gantt

## Aperçu {/*#overview*/}

Un diagramme de Gantt est un diagramme à barres horizontales qui visualise le calendrier d'un projet dans le temps. C'est l'un des outils les plus répandus pour communiquer les échéanciers d'un projet aux équipes et aux parties prenantes.

## Structure {/*#structure*/}

- **Lignes :** tâches individuelles ou lots de travaux
- **Colonnes :** échelle de temps (jours, semaines, mois)
- **Barres :** durée des tâches individuelles d'après leurs dates de début et de fin
- **Dépendances :** des flèches ou des chevauchements peuvent indiquer les dépendances entre tâches

## Caractéristiques {/*#characteristics*/}

- Facile à comprendre et à créer, même pour des parties prenantes non techniques
- Bien adapté aux projets à court terme comportant un nombre gérable de tâches
- Axé sur la planification temporelle plutôt que sur l'allocation des ressources
- Généralement utilisé pour les projets en cascade ou par phases
- Représentation statique : reflète un instantané planifié, non l'avancement en temps réel

## Avantages {/*#advantages*/}

- Facile à lire et à communiquer aux parties prenantes
- Offre une vue d'ensemble claire du calendrier global du projet
- Montre quelles tâches s'exécutent en parallèle et lesquelles sont séquentielles
- Simple à créer et à maintenir pour les projets de petite à moyenne taille

## Inconvénients {/*#disadvantages*/}

- Ne permet pas d'identifier le chemin critique
- Peut devenir difficile à manier pour de grands projets comportant de nombreuses tâches
- La modification d'une tâche exige un ajustement manuel des tâches dépendantes

## Exemple {/*#example*/}

Une petite équipe doit construire une page d'atterrissage pour le lancement d'un produit en cinq semaines. Le chef de projet crée un diagramme de Gantt pour planifier le calendrier :

1. **Exigences** (semaine 1) : l'équipe recueille les exigences auprès du service marketing, définit le contenu de la page et convient du périmètre
2. **Conception** (semaines 1 à 2) : le designer commence à créer des maquettes pendant que les exigences sont finalisées, avec un léger chevauchement avec la première phase
3. **Implémentation** (semaines 2 à 4) : dès que l'orientation de conception est claire, les développeurs commencent à construire la page. C'est la phase la plus longue
4. **Tests** (semaine 4) : l'assurance qualité commence à tester les sections terminées pendant que le développement se poursuit
5. **Déploiement** (semaine 5) : après l'approbation finale, la page est déployée en production avant la date de lancement

Le diagramme de Gantt permet à l'équipe de voir facilement quelles phases se chevauchent, où ont lieu les transferts et si l'échéance de cinq semaines est réaliste.

```text
| Task           |  Week 1 | Week 2 | Week 3 | Week 4  | Week 5 |
| -------------- | ------- | ------ | ------ | ------- | ------ |
| Requirements   |███████  |        |        |         |        |
| Design         |     ████|████    |        |         |        |
| Implementation |         |  ██████|████████|█████    |        |
| Testing        |         |        |        |  ███████|        |
| Deployment     |         |        |        |         |████████|
```
