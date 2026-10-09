---
title: "Diagramme de composants"
description: "Diagrammes de composants UML : composants, interfaces fournies et requises, connecteurs d'assemblage et de délégation, ports, artefacts et manifestation, imbrication, dépendances, et distinction avec les diagrammes de classes et de déploiement."
keywords:
    - UML
    - Diagramme de composants
    - Composant
    - Interface fournie
    - Interface requise
    - Connecteur d'assemblage
    - Connecteur de délégation
    - Port
    - Artefact
    - Architecture logicielle
    - Diagramme structurel
tags:
    - ap2
machine_translated: true
---

# Diagramme de composants

## Vue d'ensemble {/*#overview*/}

Un diagramme de composants est un diagramme UML **structurel**. Il montre comment un système est découpé en blocs remplaçables et quelles interfaces ces blocs s'offrent et s'exigent mutuellement.

Un composant au sens d'UML est une partie modulaire d'un système dont le contenu est masqué et dont le comportement est entièrement défini par ses interfaces. Deux conséquences découlent de cette définition :

- Un composant peut être remplacé par tout autre composant qui fournit les mêmes interfaces.
- Rien à l'extérieur du composant ne doit dépendre de son fonctionnement interne.

Applications typiques :

- Documentation de l'architecture d'un système sous forme de vue d'ensemble à gros grain
- Fixation du contrat d'interface entre équipes avant le début de l'implémentation
- Visualisation des dépendances afin de rendre évident tout couplage cyclique ou excessif
- Planification des parties qui peuvent être construites, testées, déployées ou remplacées indépendamment

---

## Notation {/*#notation*/}

| Élément                                                             | Notation                                                        | Signification                                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Composant](#component)                                             | Rectangle avec le mot-clé `<<component>>`                      | Une partie remplaçable et autonome du système                                                         |
| [Icône de composant](#component)                                    | Petit rectangle avec deux ergots en saillie, en haut à droite   | Marquage alternatif d'un composant, utilisable à la place du mot-clé ou en complément                 |
| [Interface fournie](#provided-and-required-interfaces)              | Ligne se terminant par un cercle plein (*ball*, *lollipop*)     | Service que le composant offre à son environnement                                                    |
| [Interface requise](#provided-and-required-interfaces)              | Ligne se terminant par un demi-cercle (*socket*)                | Service dont le composant a besoin de la part de son environnement                                    |
| [Connecteur d'assemblage](#assembly-connector)                      | Demi-cercle placé sur un cercle plein                           | L'exigence d'un composant est satisfaite par l'offre d'un autre                                       |
| [Port](#ports-and-delegation-connectors)                            | Petit carré sur la frontière du composant                       | Point d'interaction nommé par lequel les interfaces sont exposées                                     |
| [Connecteur de délégation](#ports-and-delegation-connectors)        | Flèche d'un port vers un composant interne                      | Transmet ce qui arrive au port à la partie qui le traite                                              |
| [Interface](#provided-and-required-interfaces) (notation rectangle) | Rectangle avec le mot-clé `<<interface>>`                      | Contrat détaillé avec ses opérations, complète le cercle plein, qui ne porte que le nom               |
| [Dépendance](#dependencies)                                         | Flèche pointillée à pointe ouverte                              | La source a besoin de la cible, sans interface nommée                                                 |
| [Artefact](#artifacts-and-manifestation)                            | Rectangle avec le mot-clé `<<artifact>>`                       | Un fichier physique : `.jar`, `.dll`, `.war`, script, fichier de configuration                      |
| [Manifestation](#artifacts-and-manifestation)                       | Flèche pointillée libellée `<<manifest>>` de l'artefact vers le composant | L'artefact est la réalisation physique de ce composant                                             |
| [Composant imbriqué](#nested-components)                            | Composant dessiné à l'intérieur d'un autre composant            | Structure interne, les *parties* dont se compose le composant englobant                               |
| Note                                                                | Rectangle à coin corné relié par une ligne pointillée           | Commentaire sans sémantique                                                                           |

Règles de nommage qui préservent la lisibilité d'un diagramme :

- Les composants sont nommés d'après leur responsabilité sous forme de nom : `PaymentService`, et non `DoPayment` ni `Payments2`.
- Les interfaces sont nommées d'après le service, souvent avec un `I` en préfixe : `IPayment`, `IInventory`.
- Un même nom d'interface renvoie toujours au même contrat. Un diagramme ne doit pas employer un nom pour deux choses différentes.

---

## Éléments de base {/*#building-blocks*/}

### Composant {/*#component*/}

Un composant n'a pas de taille fixe. Les choix typiques sont un service déployable, une bibliothèque, une couche de l'architecture ou un domaine métier autonome.

```text
 ╭──────────────────────╮
 │ <<component>>     ⊞  │
 │ PaymentService       │
 ╰──────────────────────╯
```

### Interfaces fournies et requises {/*#provided-and-required-interfaces*/}

Dans la mesure du possible, les dépendances entre composants s'expriment par des interfaces, jamais par un accès direct aux éléments internes. Pour l'exception, voir [Dépendances](#dependencies).

- Une **interface fournie** est dessinée comme une ligne avec un cercle plein à son extrémité. Elle exprime la promesse *ceci est offert et peut être utilisé*.
- Une **interface requise** est dessinée comme une ligne avec un demi-cercle à son extrémité. Elle exprime l'exigence *ceci est nécessaire, quelqu'un doit le fournir*.

```text
   provided interface                  required interface
   (ball, lollipop)                    (socket)

 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │            │ <<component>>     ⊞  │
 │ PaymentService       │───○        │ OrderService         │───C
 ╰──────────────────────╯            ╰──────────────────────╯
```

Le cercle plein ne porte que le nom de l'interface. Dès que les opérations elles-mêmes comptent, l'interface est en plus dessinée comme un rectangle avec le mot-clé `<<interface>>` et sa liste d'opérations, relié au cercle plein.

### Connecteur d'assemblage {/*#assembly-connector*/}

Un connecteur d'assemblage relie une interface requise à une interface fournie. Graphiquement, le demi-cercle est placé sur le cercle plein, d'où le nom de notation *ball and socket*.

```text
 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │ IPayment   │ <<component>>     ⊞  │
 │ OrderService         │───C○───────│ PaymentService       │
 ╰──────────────────────╯            ╰──────────────────────╯
```

Le connecteur indique que `OrderService` utilise `PaymentService` **uniquement** par `IPayment`. Tout composant qui fournit `IPayment` peut prendre la place de `PaymentService`.

### Ports et connecteurs de délégation {/*#ports-and-delegation-connectors*/}

Un port est un point d'interaction explicitement nommé sur la frontière d'un composant. Il est dessiné comme un petit carré sur le bord et regroupe les interfaces accessibles en ce point. Les ports deviennent utiles dès qu'un composant offre la même interface à plusieurs endroits, par exemple un point d'entrée interne et un point d'entrée externe avec des règles d'accès différentes.

À l'intérieur du composant, un connecteur de délégation mène du port à la partie qui traite réellement la requête.

```text
               IOrdering
                   ○
                   │
 ╭─────────────────■─────────────────────────────────────────────╮
 │ <<component>>   │                                          ⊞  │
 │ OrderManagement │  delegation                                 │
 │                 │                                             │
 │    ╭────────────┴─────────╮            ╭──────────────────╮   │
 │    │ <<component>>     ⊞  │  IPricing  │ <<component>> ⊞  │   │
 │    │ OrderIntake          │───C○───────│ PricingEngine    │   │
 │    ╰──────────────────────╯            ╰──────────────────╯   │
 │                                                               │
 ╰───────────────────────────────────────────────────────────────╯
```

L'extérieur ne voit que `IOrdering` au niveau du port. Le fait que `OrderIntake` et `PricingEngine` existent derrière, et la manière dont ils sont reliés, peuvent être modifiés à tout moment.

### Composants imbriqués {/*#nested-components*/}

Les composants peuvent contenir d'autres composants. Les composants internes sont les *parties* à partir desquelles le composant englobant est assemblé. L'imbrication fait du diagramme de composants un outil à plusieurs niveaux d'abstraction : le niveau supérieur montre une poignée de sous-systèmes, et chacun peut être affiné dans un diagramme à part.

Deux règles garantissent la cohérence de l'affinage :

- Chaque interface du composant englobant est soit déléguée à une partie interne, soit réalisée par le composant englobant lui-même.
- Une partie interne n'est jamais connectée directement à l'extérieur. La connexion passe toujours par un port du composant englobant.

### Artefacts et manifestation {/*#artifacts-and-manifestation*/}

Un composant est une unité logique, un artefact est un fichier physique. La relation qui les lie s'appelle *manifestation* et se dessine comme une flèche pointillée avec le mot-clé `<<manifest>>` allant de l'artefact vers le composant.

```text
 ╭──────────────────────────────╮
 │ <<artifact>>                 │
 │ payment-service.jar          │
 ╰───────────────┬──────────────╯
                 ╎
                 ╎ <<manifest>>
                 ▼
 ╭───────────────────────────────╮
 │ <<component>>              ⊞  │
 │ PaymentService                │
 ╰───────────────────────────────╯
```

La correspondance n'est pas forcément biunivoque. Un artefact peut manifester plusieurs composants, et un composant peut être réparti sur plusieurs artefacts, par exemple une implémentation et un fichier de configuration distinct.

### Dépendances {/*#dependencies*/}

Outre les interfaces, une simple dépendance peut être dessinée comme une flèche pointillée à pointe ouverte. Elle signifie *la source a besoin de la cible* sans nommer de contrat, et constitue l'énoncé le plus faible et le moins précis.

Une dépendance convient aux relations qui n'ont réellement aucune interface propre, comme l'utilisation d'un modèle de données partagé ou d'un système externe qui n'est pas modélisé davantage. Partout où une interface existe, la notation ball and socket est préférée, car elle seule indique *par quoi* passe la dépendance.

---

## Correspondance avec l'implémentation {/*#mapping-to-implementation*/}

| Diagramme de composants | Implémentation typique                                                              |
| ----------------------- | ----------------------------------------------------------------------------------- |
| Composant               | Service déployable, module Maven/Gradle, paquet npm, assembly .NET                  |
| Interface fournie       | API publique d'un module, ressource REST, topic de messages                         |
| Interface requise       | Dépendance injectée, client stub                                                    |
| Connecteur d'assemblage | Câblage dans le conteneur d'injection de dépendances ou la composition root         |
| Port                    | Point d'accès publié, par exemple une URL de base ou un nom de file d'attente       |
| Connecteur de délégation | Transmission du point d'entrée vers la classe interne qui traite la requête        |
| Artefact                | Résultat de build : `.jar`, `.dll`, `.war`, image de conteneur, bundle           |
| Manifestation           | L'étape de build qui empaquette le code d'un composant dans ce fichier              |
| Dépendance              | Import ou `require` sans contrat convenu                                              |

---

## Distinction avec les autres diagrammes {/*#delimitation-from-other-diagrams*/}

### Diagramme de composants et diagramme de classes {/*#component-diagram-and-class-diagram*/}

| Aspect                | Diagramme de composants                               | Diagramme de classes                          |
| --------------------- | ----------------------------------------------------- | --------------------------------------------- |
| Unité représentée     | Sous-système, service, module                         | Classe, attribut, opération                   |
| Granularité           | Grossière, une poignée de boîtes par diagramme        | Fine, souvent des dizaines de classes         |
| Type de relation      | Interface fournie/requise, assemblage                 | Association, héritage, agrégation             |
| Question traitée      | Quelles parties existent et comment sont-elles couplées | Comment une partie est-elle structurée en interne |
| Public typique        | Architecture, frontières d'équipes, planification     | Implémentation d'un composant isolé           |

### Diagramme de composants et diagramme de déploiement {/*#component-diagram-and-deployment-diagram*/}

Un diagramme de composants est *logique*, un [diagramme de déploiement](./deployment-diagram.md) est *physique*.

| Aspect               | Diagramme de composants                      | Diagramme de déploiement                         |
| -------------------- | -------------------------------------------- | ------------------------------------------------ |
| Élément principal    | Composant                                    | Nœud : matériel, machine virtuelle, conteneur    |
| Question traitée     | Comment le logiciel est-il structuré         | Où le logiciel s'exécute-t-il                    |
| Relations            | Interfaces et connecteurs                    | Chemins de communication, protocoles             |
| Artefacts            | Apparaissent comme manifestation d'un composant | Apparaissent comme déploiement sur un nœud    |

---

## Exemple : boutique en ligne {/*#example-online-shop*/}

La boutique se compose d'une interface utilisateur, d'un service de commandes, d'un service de paiement et d'un service de stock. L'interface utilisateur ne sait rien de la manière dont les commandes sont traitées, elle a seulement besoin de `IOrdering`. Le service de commandes a de son côté besoin de `IPayment` et de `IStock` et ignore quels composants les fournissent.

```text
 ╭────────────────────╮          ╭────────────────────╮          ╭────────────────────╮
 │ <<component>>   ⊞  │IOrdering │ <<component>>   ⊞  │IPayment  │ <<component>>   ⊞  │
 │ ShopUI             │───C○─────│ OrderService       │───C○─────│ PaymentService     │
 ╰────────────────────╯          ╰──────────┬─────────╯          ╰────────────────────╯
                                            ∩
                                            ○  IStock
                                            │
                                 ╭──────────┴─────────╮
                                 │ <<component>>   ⊞  │
                                 │ StockService       │
                                 ╰────────────────────╯
```

Ce que montre cet exemple :

- `ShopUI` a exactement un demi-cercle et n'est donc couplé qu'à un seul contrat. Un second frontal, par exemple une application mobile, peut être ajouté sans rien modifier derrière `IOrdering`.
- `OrderService` porte deux demi-cercles. Un test de `OrderService` doit remplir les deux, avec `PaymentService` et `StockService` ou avec des doublures de test. Chaque demi-cercle supplémentaire est une dépendance de plus à fournir, si bien qu'un composant à nombreux demi-cercles est difficile à tester isolément.

Une extension réaliste regrouperait `OrderService`, `PaymentService` et `StockService` dans un composant `Backend` avec un port unique qui expose `IOrdering` et le délègue à `OrderService`. `ShopUI` serait alors connecté à ce port, et la structure interne du backend deviendrait interchangeable.

---

## Erreurs courantes {/*#common-mistakes*/}

1. **Composants reliés sans interface :** une simple ligne montre que deux composants sont couplés, mais pas par quel contrat. Là où une interface existe, elle est dessinée en ball and socket.
2. **Cercle plein et demi-cercle inversés :** le cercle plein appartient au composant qui *offre* le service, le demi-cercle à celui qui en *a besoin*.
3. **Interface requise sans fournisseur :** un demi-cercle ouvert signifie que le système ne peut pas fonctionner. Soit un composant manque, soit l'exigence est obsolète.
4. **Classes dessinées comme composants :** les attributs, opérations et associations relèvent du diagramme de classes.
5. **Parties internes connectées en contournant la frontière :** un connecteur d'un composant interne directement vers l'extérieur contourne le port du composant englobant.
6. **Dépendances cycliques :** deux composants qui exigent mutuellement leurs interfaces ne peuvent plus être construits, déployés ou remplacés séparément.
7. **Un même nom d'interface pour des contrats différents :** deux cercles pleins de même nom doivent offrir les mêmes opérations.
8. **Confusion entre composant et artefact :** `PaymentService` est le composant, `payment-service.jar` l'artefact qui le manifeste.
9. **Trop de composants dans un seul diagramme :** trop de boîtes rendent un diagramme illisible. Les détails relèvent d'un diagramme distinct qui affine un seul composant.

---

## Outils {/*#tools*/}

- draw.io / diagrams.net (gratuit, dans le navigateur, bibliothèque de formes UML incluse)
- PlantUML (textuel, le diagramme est généré à partir de la source et peut être versionné)
- Mermaid (textuel, s'affiche directement dans Markdown sur de nombreuses plateformes)
- Visual Paradigm, StarUML, Lucidchart (commerciaux, avec des offres gratuites)

## Voir aussi {/*#see-also*/}

- [Diagramme de classes](./class-diagram.md) : la structure fine à l'intérieur d'un composant
- [Diagramme de déploiement](./deployment-diagram.md) : le pendant physique, montrant où s'exécutent les artefacts des composants
- [Diagramme de séquence](./sequence-diagram.md) : montre comment les composants interagissent au fil du temps par leurs interfaces
- [Diagramme d'activité](./activity-diagram.md) : les processus qui s'exécutent à travers les composants
- [Vue d'ensemble d'UML](./uml-overview.mdx) : classification des types de diagrammes
- [Bases de la notation UML](./uml-notation-basics.md) : mots-clés, stéréotypes, notes et éléments communs à tous les types de diagrammes
