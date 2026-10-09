---
title: "Diagramme de déploiement"
description: "Diagrammes de déploiement UML : nœuds, dispositifs et environnements d'exécution, artefacts et leur déploiement, chemins de communication avec stéréotypes de protocole, multiplicités et imbrication."
keywords:
    - UML
    - Diagramme de déploiement
    - Nœud
    - Dispositif
    - Environnement d'exécution
    - Artefact
    - Chemin de communication
    - Déploiement
    - Paysage système
    - Diagramme structurel
tags:
    - ap2
machine_translated: true
---

# Diagramme de déploiement

## Vue d'ensemble {/*#overview*/}

Un diagramme de déploiement est un diagramme UML **structurel**. Il montre comment un système terminé est réparti physiquement : quel matériel et quels environnements d'exécution existent, quels fichiers y sont installés et par quels chemins de communication ces éléments échangent des données.

Applications typiques :

- Documentation du paysage système d'une application pour l'exploitation et la passation
- Représentation d'une architecture client-serveur ou à trois niveaux, avec ses frontières réseau
- Planification d'une installation : quel artefact est copié sur quelle machine
- Description d'un déploiement par conteneurs ou dans le cloud, avec ses protocoles et son nombre de réplicas
- Base de discussion sur la disponibilité, la mise à l'échelle et les zones de sécurité

---

## Notation {/*#notation*/}

| Élément                    | Notation                                                               | Signification                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Nœud                       | Parallélépipède (boîte en trois dimensions)                            | Ressource d'exécution sur laquelle quelque chose s'exécute ou est stocké                                        |
| Dispositif                 | Parallélépipède avec le mot-clé `<<device>>`                                | Matériel physique : serveur, poste de travail, smartphone, routeur, imprimante                                  |
| Environnement d'exécution  | Parallélépipède avec `<<executionEnvironment>>`, généralement imbriqué dans un dispositif | Logiciel qui héberge des artefacts : système d'exploitation, JVM, serveur d'applications, runtime de conteneurs, SGBD |
| Artefact                   | Rectangle avec le mot-clé `<<artifact>>` ou une icône de document             | Fichier physique produit par le processus de développement                                                      |
| Déploiement                | Artefact dessiné à l'intérieur d'un nœud, ou flèche pointillée `<<deploy>>` | L'artefact est installé sur ce nœud                                                                             |
| Manifestation              | Flèche pointillée `<<manifest>>` d'un artefact vers un composant ou une classe | L'artefact est la réalisation physique d'un élément logique                                                    |
| Chemin de communication    | Ligne continue entre deux nœuds                                        | Connexion par laquelle les nœuds échangent des données, sans direction                                          |
| Protocole                  | Stéréotype sur le chemin, par ex. `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`            | Protocole utilisé sur cette connexion                                                                           |
| Multiplicité               | Nombre à l'extrémité d'un chemin de communication, par ex. `2` ou `1..*` | Combien de nœuds à cette extrémité sont reliés à un nœud de l'autre extrémité                            |
| Imbrication                | Nœud ou artefact dessiné à l'intérieur d'un nœud                       | Contenance : le matériel contient le runtime, qui contient le fichier                                           |
| Instance                   | Nom souligné précédé de deux-points, par ex. `:AppServer`                   | Une instance concrète au lieu d'un type                                                                         |
| Note                       | Rectangle à coin corné relié par une ligne pointillée                  | Commentaire sans sémantique                                                                                     |

Règles de nommage qui préservent la lisibilité d'un diagramme :

- Un nœud est nommé comme un type, `ApplicationServer`, ou comme une machine concrète, `appsrv01:ApplicationServer`. Un nom d'instance est souligné dans un outil de dessin.
- Les artefacts portent le nom réel du fichier, extension comprise : `shop.war`, et non `Shop application`.
- Chaque chemin de communication porte un stéréotype de protocole, une ligne sans libellé indique seulement *relié d'une manière ou d'une autre*.
- Les mots-clés et stéréotypes s'écrivent entre guillemets français, `«device»`. L'écriture `<<device>>` est la forme ASCII utilisée par les outils textuels et c'est celle employée ci-dessous.

---

## Éléments de base {/*#building-blocks*/}

### Nœud {/*#node*/}

Deux types de nœuds se distinguent par leur mot-clé :

- **`<<device>>` :** matériel physique tel qu'un serveur, un poste de travail, un téléphone mobile ou un contrôleur embarqué
- **`<<executionEnvironment>>` :** un environnement logiciel qui héberge des artefacts et leur fournit des services tels que la gestion de la mémoire, les transactions ou la répartition des requêtes

Un environnement d'exécution est normalement imbriqué dans un dispositif. Un nœud sans mot-clé est simplement *une* ressource d'exécution.

```text
        ┌────────────────────────────────────────┐
       ╱                                        ╱│
      ┌────────────────────────────────────────┐ │
      │  <<device>>                            │ │
      │  ApplicationServer                     │ │
      │                                        │ │
      │  ┌──────────────────────────────────┐  │ │
      │  │  <<executionEnvironment>>        │  │ │
      │  │  Tomcat 10                       │  │ │
      │  │                                  │  │ │
      │  │  ┌────────────────────────────┐  │  │ │
      │  │  │  <<artifact>>              │  │  │ │
      │  │  │  shop.war                  │  │  │ │
      │  │  └────────────────────────────┘  │  │ │
      │  └──────────────────────────────────┘  │ ╱
      └────────────────────────────────────────┘╱
```

Dans un outil de dessin, chaque nœud est un parallélépipède, y compris les nœuds imbriqués. Les diagrammes présentés ici dessinent les nœuds internes comme de simples rectangles afin que l'imbrication reste lisible en texte brut.

### Artefact et déploiement {/*#artifact-and-deployment*/}

En pratique, un artefact est un fichier. Des exemples typiques sont `shop.war`, `payment-service.jar`, `setup.exe`, `schema.sql`, `nginx.conf` et une image de conteneur comme `shop-app:2.4.0`.

Deux notations indiquent qu'un artefact est installé sur un nœud :

- **Imbrication :** le rectangle de l'artefact est dessiné à l'intérieur du nœud. Cette forme est plus compacte et de loin la plus courante.
- **Dépendance :** une flèche pointillée avec le mot-clé `<<deploy>>` va de l'artefact vers le nœud. Cette forme est utile lorsque le même artefact est déployé sur plusieurs nœuds.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈┈ <<deploy>> ┈┈┈┈┈┈▶ │  <<device>>            │
 │  shop.war              │                          │  ApplicationServer     │
 └────────────────────────┘                          └────────────────────────┘
```

Une manifestation est la relation inverse, orientée vers la conception. Une flèche pointillée avec le mot-clé `<<manifest>>` va de l'artefact vers le composant ou la classe qu'il réalise physiquement, et montre ainsi quelle partie du modèle aboutit dans ce fichier.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈ <<manifest>> ┈┈┈┈┈▶ │  <<component>>         │
 │  payment-service.jar   │                          │  PaymentService        │
 └────────────────────────┘                          └────────────────────────┘
```

### Chemin de communication {/*#communication-path*/}

Un chemin de communication est une ligne continue sans pointe de flèche, car la connexion elle-même n'a pas de direction, et il est libellé avec le protocole sous forme de stéréotype.

```text
    ┌──────────────────────┐                  ┌──────────────────────┐
   ╱                      ╱│                 ╱                      ╱│
  ┌──────────────────────┐ │                ┌──────────────────────┐ │
  │  <<device>>          │ │ 2            1 │  <<device>>          │ │
  │  AppServer           │ ├──── <<JDBC>> ──┤  DatabaseServer      │ │
  │                      │ ╱                │                      │ ╱
  └──────────────────────┘╱                 └──────────────────────┘╱
```

Les stéréotypes de protocole courants sont `<<HTTP>>`, `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`, `<<REST>>`, `<<AMQP>>`, `<<SSH>>` et `<<SMTP>>`. Le choix dépend du niveau de détail visé : `<<TCP/IP>>` nomme le transport, `<<HTTPS>>` indique en plus que la connexion est chiffrée, ce qui est généralement l'information la plus utile.

### Multiplicité et imbrication {/*#multiplicity-and-nesting*/}

Une multiplicité s'écrit à l'extrémité d'un chemin de communication et exige des noms de types : une instance telle que `appsrv01:ApplicationServer` est toujours exactement une machine.

L'imbrication peut s'étendre sur plusieurs niveaux, chaque niveau s'exécutant sur celui qui l'entoure :

```text
<<device>>                  ServerHardware
  <<executionEnvironment>>    Linux
    <<executionEnvironment>>    Docker Engine
      <<artifact>>                shop-app:2.4.0
```

Les niveaux sans importance pour l'objectif du diagramme sont omis, par ex. le runtime de conteneurs dans un plan de capacité. Dans un plan de livraison, en revanche, l'étiquette de version de l'image est l'information clé.

---

## Exemple : boutique web à trois niveaux {/*#example-three-tier-web-shop*/}

La boutique se compose d'un frontal navigateur, d'une application dans un conteneur et d'une base de données relationnelle. Chaque niveau s'exécute sur sa propre machine, le serveur d'applications existe en double, et la base de données n'est accessible que depuis le serveur d'applications.

```text
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ClientPC                                  │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Browser                             │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 0..*
               <<HTTPS>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ApplicationServer                         │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Docker Engine                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-app:2.4.0                │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 2
                <<JDBC>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  DatabaseServer                            │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  PostgreSQL 16                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-schema.sql               │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
```

Ce que montre cet exemple :

- La multiplicité `2` à l'extrémité du serveur d'applications du chemin `<<JDBC>>` indique que deux serveurs d'applications accèdent à la base de données, `0..*` à l'extrémité du client que n'importe quel nombre de clients peut être connecté, y compris aucun.
- Rien n'est dit sur le *moment* où tel appel a lieu. L'ordre des appels relève d'un [diagramme de séquence](./sequence-diagram.md).

---

## Erreurs courantes {/*#common-mistakes*/}

1. **Classes ou composants à l'intérieur d'un nœud :** un nœud contient des artefacts. L'élément logique relève d'un [diagramme de classes](./class-diagram.md) ou d'un diagramme de composants et est relié à l'artefact par `<<manifest>>`.
2. **Chemin de communication sans protocole :** sans `<<HTTPS>>` ou `<<JDBC>>` sur la ligne, le diagramme ne montre plus quelles connexions sont chiffrées ni quels ports un pare-feu doit ouvrir.
3. **Confusion entre dispositif et environnement d'exécution :** `<<device>>` est du matériel, `<<executionEnvironment>>` est un logiciel qui s'y exécute. Un conteneur n'est pas un dispositif.
4. **Pointes de flèche sur un chemin de communication :** le chemin n'a pas de direction. Une direction relève d'une dépendance telle que `<<deploy>>` ou `<<manifest>>`.
5. **Tous les fichiers dessinés :** seul ce qui compte pour l'installation et l'exploitation appartient au diagramme, pas chaque bibliothèque ni chaque fichier de configuration.
6. **Multiplicités manquantes :** un cluster de quatre machines dessiné comme un seul nœud sans `4` masque sa taille.
7. **Niveaux logiques assimilés à des nœuds :** présentation, logique et couche de données forment un découpage logique, les nœuds un découpage physique. Trois niveaux peuvent très bien s'exécuter sur une seule machine.

---

## Outils {/*#tools*/}

- draw.io / diagrams.net (gratuit, dans le navigateur, bibliothèque de formes UML incluse)
- PlantUML (textuel, le diagramme est généré à partir de la source et peut être versionné)
- Mermaid (textuel, s'affiche directement dans Markdown sur de nombreuses plateformes)
- Visual Paradigm, StarUML, Lucidchart (commerciaux, avec des offres gratuites)

## Voir aussi {/*#see-also*/}

- [Diagramme de composants](./component-diagram.md) : les blocs logiques dont les artefacts sont déployés ici
- [Diagramme de classes](./class-diagram.md) : la structure fine du logiciel qui se retrouve dans les artefacts
- [Diagramme de séquence](./sequence-diagram.md) : l'interaction sur les chemins de communication représentés ici
- [Vue d'ensemble d'UML](./uml-overview.mdx) : classification des types de diagrammes
- [Bases de la notation UML](./uml-notation-basics.md) : mots-clés, stéréotypes, noms d'instances et éléments communs à tous les types de diagrammes
