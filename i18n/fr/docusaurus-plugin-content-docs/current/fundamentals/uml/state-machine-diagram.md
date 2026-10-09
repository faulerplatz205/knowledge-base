---
title: "Diagramme d'états-transitions"
description: "Diagrammes d'états-transitions UML : états, transitions avec déclencheur, garde et effet, activités entry, do et exit, états composites, régions, états d'historique et table de transitions d'états."
keywords:
    - UML
    - Diagramme d'états-transitions
    - Diagramme d'états
    - Transition
    - Garde
    - Action d'entrée
    - État composite
    - Région
    - État d'historique
    - Table de transitions d'états
    - Diagramme comportemental
tags:
    - ap2
machine_translated: true
---

# Diagramme d'états-transitions

## Vue d'ensemble {/*#overview*/}

Un diagramme d'états-transitions est un diagramme UML **comportemental**. Il décrit le cycle de vie d'*un seul* objet, composant ou système : dans quels états il peut se trouver, quels événements le font passer d'un état au suivant, et ce qui se passe en chemin.

Applications typiques :

- Statut de commande dans un système de boutique (`New`, `Paid`, `Shipped`, `Delivered`, `Cancelled`)
- Gestion de session ou de connexion (`Anonymous`, `Authenticated`, `Locked`, `Expired`)
- États d'appareils et de connexions (`Off`, `Booting`, `Ready`, `Error`)
- Logique de protocole et d'analyseur, où le caractère suivant est interprété différemment selon l'état
- Le comportement interne d'une classe dont les méthodes ne sont autorisées que dans certains états

---

## Notation {/*#notation*/}

| Élément                  | Notation                                                  | Signification                                                                        |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Pseudo-état initial      | Cercle plein `●`                                      | Début du cycle de vie, exactement un par région                                      |
| État                     | Rectangle aux coins arrondis avec un nom                  | Une situation dans laquelle l'objet attend, nommée par un adjectif ou un nom         |
| Transition               | Flèche d'un état vers un autre                            | Changement d'état, libellée `trigger [guard] / effect`, chaque partie facultative                       |
| Déclencheur              | Nom d'événement sur la transition                         | L'événement qui rend la transition possible, par ex. `cancel`, `timeout`                        |
| Transition d'achèvement  | Transition sans déclencheur                               | Se déclenche dès que le comportement de l'état source est terminé                    |
| Garde                    | `[condition]` sur la transition                                 | Condition booléenne, la transition ne se déclenche que si elle vaut vrai             |
| Effet                    | `/ action` sur la transition                                 | Action exécutée pendant le déclenchement de la transition, elle ne doit pas bloquer  |
| Auto-transition          | Flèche quittant et réintégrant le même état               | L'état est quitté puis réintégré, `exit` et `entry` s'exécutent                     |
| Transition interne       | `trigger / effect` à l'intérieur du cadre de l'état                  | Réaction sans changement d'état, `exit` et `entry` ne s'exécutent **pas**          |
| Activité d'entrée        | `entry / action` à l'intérieur du cadre de l'état                  | S'exécute à chaque entrée dans l'état, quelle que soit la transition utilisée        |
| Activité do              | `do / activity` à l'intérieur du cadre de l'état                  | S'exécute en continu tant que l'état est actif, peut être interrompue                |
| Activité de sortie       | `exit / action` à l'intérieur du cadre de l'état                  | S'exécute à chaque sortie de l'état, quelle que soit la transition utilisée          |
| État composite           | Cadre d'état contenant d'autres états                     | Un état décomposé en sous-états                                                      |
| Région                   | Partie d'un état composite, séparée par une ligne pointillée | Sous-états actifs en même temps                                                   |
| Choix                    | Losange sur une transition                                | Branchement évalué après l'effet, les transitions sortantes portent des gardes       |
| Historique superficiel   | Cercle contenant `H`                                  | À la réentrée, le dernier sous-état actif de cet état composite est repris           |
| Historique profond       | Cercle contenant `H*`                                  | Reprend le dernier sous-état actif, tous niveaux imbriqués compris                   |
| État final               | Cercle plein dans un anneau `◉`                       | Le cycle de vie s'arrête ici, l'objet n'accepte plus d'événements                    |

Règles de nommage qui préservent la lisibilité d'un diagramme :

- Les états décrivent une condition, pas une activité : `Paid`, `Waiting for payment`, et non `Pay`
- Les déclencheurs sont nommés d'après l'événement, pas d'après la méthode qui le traite : `cancel`, et non `handleCancel`
- Les effets et activités internes sont nommés comme des opérations avec parenthèses : `/ refundPayment()`

---

## Éléments de base {/*#building-blocks*/}

### États et transitions {/*#states-and-transitions*/}

```text
              ●
              │
              ▼
   ╭────────────────────────╮
   │         Idle           │
   ╰────────────────────────╯
              │
              │ coinInserted [amount >= price] / unlock()
              ▼
   ╭────────────────────────╮
   │        Ready           │
   ╰────────────────────────╯
              │
              │ productSelected / dispense()
              ▼
              ◉
```

Lu comme une phrase : *dans l'état `Idle`, lorsque l'événement `coinInserted` se produit et que la condition `amount >= price` est vérifiée, `unlock()` est exécuté et la machine passe à `Ready`*. Si l'événement se produit mais que la garde est fausse, l'événement est écarté et l'état ne change pas.

### Auto-transition {/*#self-transition*/}

Après une auto-transition, l'objet se trouve dans le même état qu'auparavant. En chemin, l'état est quitté puis réintégré, de sorte que `exit` et `entry` s'exécutent et qu'une activité `do` est relancée.

```text
        ┌───────────────────────────────────┐
        │   digitPressed / appendDigit()    │
        │                                   │
        │   ╭───────────────────────────╮   │
        └──►│        Collecting         │───┘
            ╰───────────────────────────╯
```

Si relancer `entry`, `do` et `exit` n'est pas souhaitable, une **transition interne** est utilisée à la place. Elle s'écrit à l'intérieur du cadre de l'état et laisse l'état actif :

```text
╭───────────────────────────────────────────╮
│               Collecting                  │
├───────────────────────────────────────────┤
│ digitPressed / appendDigit()              │
╰───────────────────────────────────────────╯
```

Par exemple, un délai d'expiration implémenté comme `entry / startTimer()` est réinitialisé par une auto-transition et poursuivi par une transition interne.

### Activités internes {/*#internal-activities*/}

Trois mots-clés décrivent un comportement qui appartient à l'état lui-même plutôt qu'à une transition :

- `entry / action` : exécuté une fois à chaque entrée, avant toute activité do
- `do / activity` : exécuté tant que l'état est actif, peut durer longtemps et être interrompu par une transition sortante
- `exit / action` : exécuté une fois à chaque sortie, après la fin ou l'abandon de l'activité do

```text
╭───────────────────────────────────────────╮
│                 Heating                   │
├───────────────────────────────────────────┤
│ entry / switchHeaterOn()                  │
│ do / measureTemperature()                 │
│ exit / switchHeaterOff()                  │
╰───────────────────────────────────────────╯
```

L'ordre d'un changement d'état est toujours : `exit` de l'état source, puis l'effet de la transition, puis `entry` de l'état cible.

Placer une action dans `entry` plutôt que sur chaque transition entrante supprime la duplication et garantit que l'action ne puisse pas être oubliée lorsqu'une nouvelle transition vers cet état est ajoutée plus tard.

### États composites {/*#composite-states*/}

Un état composite contient sa propre machine à états. Il garde les diagrammes petits et permet de dessiner une transition une seule fois pour tout un groupe de sous-états.

```text
╭────────────────────────────────────────────────────────╮
│ Active                                                 │
│                                                        │
│    ●                                                   │
│    │                                                   │
│    ▼                                                   │
│  ╭───────────────────╮  connected  ╭───────────────────╮
│  │     Dialling      │────────────►│    Talking        │
│  ╰───────────────────╯             ╰───────────────────╯
│                                                        │
╰────────────────────────────────────────────────────────╯
              │
              │ hangUp
              ▼
   ╭───────────────────╮
   │       Idle        │
   ╰───────────────────╯
```

La transition `hangUp` part de la *bordure* de l'état composite, elle s'applique donc de la même façon à `Dialling` et à `Talking`.

Règles utiles à retenir :

- Un état composite a besoin de son propre pseudo-état initial, sinon le sous-état qui devient actif est indéfini
- Exactement un sous-état est actif à la fois par région, avec l'état composite qui le contient
- Une transition peut aussi pointer directement vers un sous-état, ce qui contourne le pseudo-état initial
- Un état final à l'intérieur d'un état composite termine cette machine interne, ce qui déclenche alors la transition d'achèvement sortante de l'état composite

### Régions et états parallèles {/*#regions-and-parallel-states*/}

Un état composite peut être divisé en **régions** par une ligne pointillée. Chaque région a son propre pseudo-état initial, ses sous-états et ses transitions. Tant que l'état composite est actif, un sous-état est actif dans chaque région en même temps. Cela modélise des aspects indépendants d'un même objet, comme l'audio et la vidéo d'un enregistrement.

```text
╭──────────────────────────────────────────────────────────╮
│ Recording                                                │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮   muteAudio   ╭───────────────╮       │
│  │ AudioRunning  │──────────────►│  AudioMuted   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮  pauseVideo   ╭───────────────╮       │
│  │ VideoRunning  │──────────────►│ VideoPaused   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
╰──────────────────────────────────────────────────────────╯
```

Un événement est proposé à chaque région. Il peut déclencher une transition dans une région, dans plusieurs régions ou dans aucune.

### État d'historique {/*#history-state*/}

Un état d'historique répond à la question *où la machine continue-t-elle après une interruption*. Sans lui, la réentrée dans un état composite démarre toujours à son pseudo-état initial.

```text
              ╭──────────────────────────────────────────╮
              │ Playing                                  │
   resume     │                                          │
 ┌───────────►│   (H)                                    │
 │            │    │                                     │
 │            │    ▼                                     │
 │            │  ╭───────────╮        ╭───────────╮      │
 │            │  │  Track 1  │───────►│  Track 2  │      │
 │            │  ╰───────────╯        ╰───────────╯      │
 │            ╰──────────────────────────────────────────╯
 │                           │ pause
 │            ╭──────────────▼───────────╮
 └────────────│          Paused          │
              ╰──────────────────────────╯
```

L'historique superficiel `(H)` restaure le sous-état qui était actif en dernier à ce niveau. Un historique profond `(H*)` restaure la dernière configuration, tous niveaux imbriqués compris. Si l'état composite n'a jamais été visité auparavant, la transition vers l'état d'historique se replie sur le pseudo-état initial.

---

## Table de transitions d'états {/*#state-transition-table*/}

Un diagramme d'états-transitions peut aussi s'écrire sous forme de **table de transitions d'états**. La table est plus facile à vérifier du point de vue de l'exhaustivité que le diagramme, car les combinaisons manquantes d'état et d'événement ressortent lorsque les lignes sont regroupées par état.

| État courant  | Événement         | Garde             | Effet                  | État suivant |
| ------------- | ----------------- | ----------------- | ---------------------- | ------------ |
| `New`         | `itemAdded`       | –                 | `recalculateTotal()`   | –            |
| `New`         | `paymentReceived` | –                 | `capturePayment()`     | `Paid`      |
| `New`         | `cancel`          | –                 | `releaseReservation()` | `Cancelled` |
| `Paid`        | `dispatched`      | `allItemsInStock` | `sendTrackingMail()`   | `Shipped`   |
| `Paid`        | `cancel`          | –                 | `refundPayment()`      | `Cancelled` |
| `Shipped`     | `delivered`       | –                 | –                      | `Delivered` |

Une combinaison absente de la table ne déclenche aucune transition. L'événement est écarté sans effet.

Une ligne dont la colonne *État suivant* est vide et la colonne *Effet* renseignée décrit une transition interne. Une ligne dont l'état courant et l'état suivant sont identiques décrit une auto-transition.

---

## Exemple : statut d'une commande {/*#example-order-status*/}

Le cycle de vie d'une commande dans un système de boutique, de la création à la livraison ou à l'annulation.

```text
                          ●
                          │
                          ▼
                ╭────────────────────────╮
                │          New           │
                │ entry / reserveItems() │
                ╰────────────────────────╯
                     │              │
    paymentReceived  │              │ cancel
    / capturePayment()              │ / releaseReservation()
         ┌───────────┘              └────────────┐
         ▼                                       │
╭────────────────────────╮                       │
│          Paid          │──────────────────────►┤
╰────────────────────────╯  cancel               │
         │                  / refundPayment()    │
         │ dispatched [allItemsInStock]          │
         │ / sendTrackingMail()                  ▼
         ▼                          ╭────────────────────────╮
╭────────────────────────╮          │       Cancelled        │
│        Shipped         │          ╰────────────────────────╯
╰────────────────────────╯                       │
         │                                       │
         │ delivered                             │
         ▼                                       │
╭────────────────────────╮                       │
│       Delivered        │                       │
╰────────────────────────╯                       │
         │                                       │
         └───────────────────┐   ┌───────────────┘
                             ▼   ▼
                             ◉
```

Ce que montre cet exemple :

- Le remboursement se situe sur la transition `Paid => Cancelled` et **non** comme activité `entry` de `Cancelled`, car une commande annulée depuis `New` n'a jamais été payée.
- `dispatched` porte une garde. Si le stock manque, la commande reste dans `Paid`.
- `Shipped` n'a pas de transition pour `cancel`. La règle métier *une commande expédiée ne peut plus être annulée* s'exprime par l'absence de transition.

Implémenté en code, chaque état devient une valeur d'une énumération, et la table devient un `switch` sur l'état et l'événement. Tout ce qui n'est pas listé dans la table tombe dans la branche par défaut et est rejeté. Un changement d'état invalide est ainsi impossible par construction.

---

## Distinction avec le diagramme d'activité {/*#delimitation-from-the-activity-diagram*/}

| Aspect              | Diagramme d'états-transitions        | [Diagramme d'activité](./activity-diagram.md)       |
| ------------------- | ------------------------------------ | --------------------------------------------------- |
| Nœud                | Un **état**, l'objet attend          | Une **action**, un travail est effectué             |
| Nommage             | Adjectif ou nom : `Paid`           | Verbe + objet : `Capture payment`                            |
| Flèche              | Déclenchée par un **événement**      | Se déclenche lorsque l'action précédente **est terminée** |
| Portée              | Le cycle de vie d'un objet           | Une exécution de processus, éventuellement entre plusieurs acteurs |
| Branchement         | Gardes sur les transitions sortantes | Nœud de décision avec flux gardés                   |
| Parallélisme        | Régions dans un état composite       | Fork et join                                        |
| Question typique    | *Dans quel état est la commande ?*   | *Quelle étape vient ensuite ?*                      |

Si une flèche ne peut être libellée que par quelque chose comme *ensuite*, un diagramme d'activité est le bon choix. Si la flèche a besoin d'un nom tel que `cancel`, `timeout` ou `paymentReceived`, un diagramme d'états-transitions convient.

---

## Erreurs courantes {/*#common-mistakes*/}

1. **Activités utilisées comme noms d'états :** `Pay` est une action et relève d'un diagramme d'activité. L'état est `Paid` ou `Waiting for payment`.
2. **Transitions sans déclencheur :** une flèche entre deux états sans événement est une transition d'achèvement. Elle se déclenche dès que l'état source a terminé son comportement.
3. **Gardes qui se chevauchent :** si deux transitions de même déclencheur peuvent avoir toutes deux une garde vraie, le comportement est indéfini. Les gardes doivent s'exclure mutuellement.
4. **Garde confondue avec le déclencheur :** `[cancel]` est une condition, pas un événement. `cancel [orderNotShipped]` sépare correctement les deux.
5. **Pseudo-état initial manquant :** sans lui, l'état de départ est indéfini. Chaque diagramme et chaque région en a besoin d'exactement un.
6. **États inaccessibles ou sans issue :** un état sans transition entrante n'est jamais atteint. Un état sans transition sortante qui n'est pas un état final piège l'objet.
7. **Auto-transition là où une transition interne est voulue :** une auto-transition relance `entry`, `do` et `exit`. Un minuteur démarré dans `entry` est ainsi réinitialisé.
8. **Explosion d'états :** combiner des aspects indépendants en un unique ensemble plat d'états multiplie le nombre d'états. Des régions ou des attributs supplémentaires l'évitent.

---

## Outils {/*#tools*/}

- draw.io / diagrams.net (gratuit, dans le navigateur, bibliothèque de formes UML incluse)
- PlantUML (textuel, le diagramme est généré à partir de la source et peut être versionné)
- Mermaid (textuel, `stateDiagram-v2` s'affiche directement dans Markdown sur de nombreuses plateformes)
- Visual Paradigm, StarUML, Lucidchart (commerciaux, avec des offres gratuites)

## Voir aussi {/*#see-also*/}

- [Diagramme d'activité](./activity-diagram.md) : la vue processus, actions et flux de contrôle au lieu d'états et d'événements
- [Diagramme de séquence](./sequence-diagram.md) : montre dans le temps quels messages déclenchent les événements utilisés ici
- [Diagramme de classes](./class-diagram.md) : la classe dont le cycle de vie est décrit par un diagramme d'états-transitions
- [Diagramme de cas d'utilisation](./use-case-diagram.md) : la vue extérieure d'où proviennent les événements d'une machine à états
- [Vue d'ensemble d'UML](./uml-overview.mdx) : classification des types de diagrammes en structure et comportement
- [Bases de la notation UML](./uml-notation-basics.md) : éléments de notation communs à tous les types de diagrammes
- [Autres diagrammes UML](./further-uml-diagrams.md) : les autres types de diagrammes en un coup d'œil
