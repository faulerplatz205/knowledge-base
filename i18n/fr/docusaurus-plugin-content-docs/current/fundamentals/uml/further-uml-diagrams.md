---
title: "Autres diagrammes UML"
description: "Diagrammes d'objets, de paquetages, de communication, de temps, de vue d'ensemble des interactions, de structure composite et de profils : objectif, éléments de notation centraux, usage typique et distinction avec le diagramme UML le plus proche."
keywords:
    - UML
    - Diagramme d'objets
    - Diagramme de paquetages
    - Diagramme de communication
    - Diagramme de temps
    - Diagramme de vue d'ensemble des interactions
    - Diagramme de structure composite
    - Diagramme de profils
    - Stéréotype
    - Diagramme structurel
    - Diagramme comportemental
tags:
    - ap2
machine_translated: true
---

# Autres diagrammes UML

## Vue d'ensemble {/*#overview*/}

UML 2.5 définit quatorze types de diagrammes. Les sept qui ne font pas l'objet d'entrées dédiées sont présentés ici.

| Diagramme                                 | Catégorie     | Question centrale                                                                     |
| ----------------------------------------- | ------------- | ------------------------------------------------------------------------------------- |
| Diagramme d'objets                        | Structure     | Quelles instances concrètes existent à un instant donné et comment sont-elles reliées ? |
| Diagramme de paquetages                   | Structure     | Comment le modèle est-il découpé en unités et quelle unité dépend de laquelle ?       |
| Diagramme de communication                | Comportement  | Quels objets échangent des messages, et le long de quels liens ?                      |
| Diagramme de temps                        | Comportement  | Quel état un élément détient-il à quel point de l'axe temporel ?                      |
| Diagramme de vue d'ensemble des interactions | Comportement | Dans quel ordre des interactions entières sont-elles exécutées ?                    |
| Diagramme de structure composite          | Structure     | Comment un classificateur est-il construit en interne et par quels ports communique-t-il ? |
| Diagramme de profils                      | Structure     | Comment UML lui-même est-il étendu pour un domaine ou une plateforme ?                |

---

## Diagramme d'objets {/*#object-diagram*/}

Un instantané d'un système à un moment précis : les instances qui existent et les liens qui les relient. La notation est celle du [diagramme de classes](./class-diagram.md), mais au niveau des instances.

Éléments de notation centraux :

- **Spécification d'instance :** rectangle avec un nom souligné de la forme `name : Class` ; le nom ou la classe peuvent être omis (`o7 : Order`, `: Order`, `o7`)
- **Valeurs d'attributs :** dans le compartiment inférieur sous la forme `attribute = value`
- **Lien :** simple ligne continue entre deux instances, pendant de l'association au niveau des instances ; pas de multiplicités, car un lien relie toujours exactement deux instances

Le texte brut ne permet pas de souligner ; dans la notation réelle, les noms `m1 : Customer` et `o7 : Order` sont soulignés :

```text
 ┌────────────────────┐              ┌────────────────────┐
 │ m1 : Customer      │   places     │ o7 : Order         │
 ├────────────────────┤──────────────├────────────────────┤
 │ name = "Meier"     │              │ total = 249.90     │
 │ city = "Kiel"      │              │ status = "paid"    │
 └────────────────────┘              └────────────────────┘
```

Usage typique : expliquer un diagramme de classes compliqué par un exemple concret, discuter d'une constellation de données précise, documenter des données de test ou l'état dans lequel un défaut survient.

---

## Diagramme de paquetages {/*#package-diagram*/}

Un diagramme de paquetages montre comment un modèle est découpé en unités et quelle unité dépend de laquelle. Les paquetages ne portent aucun comportement propre.

Éléments de notation centraux :

- **Paquetage :** rectangle avec un onglet ; l'imbrication est dessinée graphiquement ou écrite `shop::service`
- **Dépendance :** flèche pointillée allant du paquetage utilisateur vers le paquetage utilisé
- **`«import»` :** rend les éléments publics du paquetage cible utilisables sans qualification
- **`«access»` :** la même relation, mais sans retransmettre plus loin les noms importés
- **`«merge»` :** copie conceptuellement le contenu du paquetage cible dans le paquetage source et le combine avec lui
- **Stratification :** paquetages disposés les uns au-dessus des autres, toutes les dépendances pointant dans le même sens

```text
┌──────┐
│ shop │
├──────┴──────────────────┐
│                         │
│   ┌─────────┐           │
│   │ ui      │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────┐           │
│   │ service │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────────┐       │
│   │ persistence │       │
│   ├─────────────┴───┐   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
└─────────────────────────┘
```

Usage typique : architectures en couches, découpage d'un système en modules, mise en évidence des dépendances cycliques avant qu'elles n'atteignent le code.

Distinction : un [diagramme de composants](./component-diagram.md) décrit des blocs remplaçables qui offrent et exigent des interfaces à l'exécution, un diagramme de paquetages organise seulement les éléments du modèle et du code source au moment de la conception.

---

## Diagramme de communication {/*#communication-diagram*/}

Un diagramme de communication montre quels objets échangent des messages et le long de quels liens. Les objets sont placés librement, l'ordre des messages résulte de leur numérotation.

Éléments de notation centraux :

- **Objet :** rectangle avec un `name : Class` souligné, comme dans le diagramme d'objets
- **Lien :** ligne continue entre deux objets
- **Message :** petite flèche dessinée à côté du lien, libellée `1: placeOrder()`
- **Numéros de séquence hiérarchiques :** `1`, `1.1`, `1.2`, avec `1.1` et `1.2` envoyés l'un après l'autre lors du traitement du message `1`
- **Marqueur d'itération et gardes :** `*` et `[condition]` dans le libellé du message

```text
  ┌──────────┐   1: placeOrder() ►  ┌─────────────┐
  │ : Client │──────────────────────│ : OrderCtrl │
  └──────────┘   ◄ 1.3: confirm()   └─────────────┘
                                           │
                                           │ ▼ 1.1: checkStock()
                                           │ ▼ 1.2: reserve()
                                           │
                                    ┌─────────────┐
                                    │ : Warehouse │
                                    └─────────────┘
```

Usage typique : rendre visible quels objets communiquent entre eux, juger du couplage d'une conception, petites interactions où la structure compte plus que l'ordre exact.

Distinction : un [diagramme de séquence](./sequence-diagram.md) montre la même interaction le long d'un axe temporel explicite de haut en bas et offre des fragments combinés tels que `alt`, `opt` et `loop`. Les objets, les messages et leur ordre peuvent être repris d'un diagramme à l'autre, les fragments combinés n'ont pas d'équivalent dans le diagramme de communication. Les alternatives et les boucles sont plus faciles à lire dans un diagramme de séquence, le réseau de liens est plus facile à voir dans un diagramme de communication.

---

## Diagramme de temps {/*#timing-diagram*/}

Un diagramme de temps montre comment l'état ou la valeur d'un ou de plusieurs éléments évolue le long d'un axe temporel explicite.

Éléments de notation centraux :

- **Axe temporel :** horizontal, avec une échelle, une piste par ligne de vie
- **Ligne de vie d'états :** ligne en escalier entre les états listés sur l'axe vertical
- **Ligne de vie de valeurs :** forme compacte en bande où un croisement marque le changement de valeur
- **Durée et contrainte de temps :** `{d..3*d}` et `{t = 0}`
- **Événements et messages :** flèches entre les pistes
- **Graduations :** unités de l'échelle de temps

```text
 : Motor
           │
   active  │         ┌──────────────┐
           │         │              │
   idle    ├─────────┘              └──────────
           │         ├── {20..40} ──┤
           └────┬────┬────┬────┬────┬────┬────┬───► t
           0    10   20   30   40   50   60   70  ms
```

Usage typique : systèmes temps réel et embarqués, protocoles de bus et de réseau, commande liée au matériel, exigences de latence, de délais d'expiration et de durées minimales de maintien.

Distinction : un [diagramme d'états-transitions](./state-machine-diagram.md) définit quels états et transitions sont possibles, sans axe temporel. Un diagramme de temps montre quand un élément se trouve dans lequel de ces états.

---

## Diagramme de vue d'ensemble des interactions {/*#interaction-overview-diagram*/}

Un diagramme de vue d'ensemble des interactions organise plusieurs diagrammes de séquence, de communication ou de temps en un seul flux de contrôle, chaque nœud étant une interaction complète.

Éléments de notation centraux :

- **Cadre :** avec l'en-tête `sd <name>`
- **Utilisation d'interaction :** rectangle avec le mot-clé `ref` et le nom d'un diagramme d'interaction existant
- **Interaction en ligne :** un petit diagramme de séquence intégré directement comme nœud
- **Éléments de contrôle :** tous ceux du diagramme d'activité, c'est-à-dire nœud initial, décision, fusion, fork, join, nœud final

```text
 ┌ sd Checkout ─────────────────────────────┐
 │                  ●                       │
 │                  │                       │
 │                  ▼                       │
 │          ┌───────────────┐               │
 │          │ ref  Login    │               │
 │          └───────────────┘               │
 │                  │                       │
 │             ╱─────────╲                  │
 │            ╱  paid ?   ╲                 │
 │            ╲           ╱                 │
 │             ╲─────────╱                  │
 │       [yes]  │       │  [no]             │
 │     ┌────────┘       └────────┐          │
 │     ▼                         ▼          │
 │ ┌───────────────┐   ┌───────────────┐    │
 │ │ ref  Ship     │   │ ref  Cancel   │    │
 │ └───────────────┘   └───────────────┘    │
 │     │                         │          │
 │     └────────┐       ┌────────┘          │
 │              ▼       ▼                   │
 │                  ◉                       │
 └──────────────────────────────────────────┘
```

Usage typique : la vue globale d'un protocole ou d'une transaction métier de longue durée composée de nombreuses interactions individuelles.

Distinction : un [diagramme d'activité](./activity-diagram.md) utilise les mêmes éléments de contrôle, mais ses nœuds sont des actions isolées. Le diagramme de vue d'ensemble des interactions est aussi une alternative à un diagramme de séquence démesuré, bourré de fragments `alt` et `loop` imbriqués.

---

## Diagramme de structure composite {/*#composite-structure-diagram*/}

Un diagramme de structure composite regarde à l'intérieur d'un seul classificateur : de quelles parties il se compose, comment ces parties sont reliées et par quels points d'interaction il est connecté à son environnement.

Éléments de notation centraux :

- **Partie :** rectangle à l'intérieur du cadre du classificateur, écrit `role : Type` avec une multiplicité facultative, par ex. `wheels : Wheel [4]`
- **Port :** petit carré sur le bord du classificateur, un point d'interaction nommé et typé
- **Interfaces :** interface fournie sous forme de lollipop `─○`, interface requise sous forme de socket `─(`
- **Connecteurs :** connecteur d'assemblage entre deux parties, connecteur de délégation entre une partie et un port
- **Collaboration :** ellipse pointillée avec des rôles nommés, décrivant un schéma de coopération indépendamment des classes concrètes

```text
 ┌ Car ──────────────────────────────────────┐
 │                                           │
 │ ┌────────────┐        ┌──────────────┐    │
 │ │ e : Engine │────────│ g : Gearbox  │────┼──□───○ Drive
 │ └────────────┘        └──────────────┘    │
 │                                           │
 └───────────────────────────────────────────┘
```

Usage typique : l'architecture interne d'un composant, le câblage des parties en conception système et embarquée, la description d'un patron de conception comme collaboration de rôles.

Distinction : un [diagramme de classes](./class-diagram.md) indique quelles classes sont reliées en général, un diagramme de structure composite indique comment les instances à l'intérieur d'un tout sont reliées dans un rôle précis. Un [diagramme de composants](./component-diagram.md) utilise la même notation lollipop et socket, mais au niveau des blocs déployables de l'ensemble du système plutôt qu'à l'intérieur d'un classificateur.

---

## Diagramme de profils {/*#profile-diagram*/}

Un diagramme de profils étend UML lui-même pour un domaine ou une plateforme cible.

Éléments de notation centraux :

- **Profil :** paquetage avec le mot-clé `«profile»`
- **Stéréotype :** rectangle avec le mot-clé `«stereotype»`, étendant une métaclasse existante ; tout nom entre guillemets français qui n'est pas un mot-clé UML prédéfini est un stéréotype défini dans un profil
- **Extension :** ligne continue avec une pointe de flèche pleine du stéréotype vers la métaclasse, par ex. `«metaclass» Class`
- **Valeur étiquetée :** attribut du stéréotype, par ex. `table : String`, renseigné sur l'élément qui porte le stéréotype
- **Contrainte :** règle entre accolades, écrite en OCL ou en texte libre
- **Application :** dépendance `«apply»` d'un paquetage vers le profil ; ses éléments peuvent alors porter `«entity»`, `«controller»` et ainsi de suite

```text
 ┌ «profile» Persistence ─────────────────────┐
 │                                            │
 │  ┌─────────────────┐     ┌───────────────┐ │
 │  │ «stereotype»    │────►│ «metaclass»   │ │
 │  │ Entity          │     │ Class         │ │
 │  ├─────────────────┤     └───────────────┘ │
 │  │ table : String  │                       │
 │  └─────────────────┘                       │
 └────────────────────────────────────────────┘
```

Relation avec le métamodèle : UML est décrit par une architecture à quatre couches. `M0` contient les objets réels, `M1` le modèle, `M2` le métamodèle UML qui définit ce qu'est une classe ou une association, et `M3` le MOF (Meta Object Facility), le langage dans lequel le métamodèle lui-même est écrit. Un profil est le mécanisme d'extension léger d'UML : il étend la couche `M2` sans la modifier, ce qui explique que les modèles profilés puissent toujours être échangés entre outils. Une extension lourde modifierait directement le métamodèle et créerait ainsi un nouveau langage.

Usage typique : langages de modélisation spécifiques à un domaine tels que SysML ou MARTE, correspondance d'un modèle avec une plateforme telle que JPA ou EJB, conventions de modélisation à l'échelle d'une entreprise.

---

## Voir aussi {/*#see-also*/}

- [Vue d'ensemble d'UML](./uml-overview.mdx) : classification de tous les types de diagrammes en structure et comportement
- [Bases de la notation UML](./uml-notation-basics.md) : éléments communs à tous les diagrammes UML, dont mots-clés, stéréotypes et notes
- [Diagramme de classes](./class-diagram.md) : la base des diagrammes d'objets, de paquetages et de structure composite
- [Diagramme de séquence](./sequence-diagram.md) : le pendant orienté temps du diagramme de communication
- [Modèle ER](../databases/er-model.md) : modélise les données dont un diagramme d'objets montre les instances concrètes
