---
title: "Unités électriques : puissance, tension, courant et énergie"
description: "La relation entre puissance (P), tension (U), courant (I), résistance (R) et travail électrique/énergie (W), avec le triangle de puissance, la loi d'Ohm et les kilowattheures."
keywords:
    - Unités électriques
    - Puissance
    - Tension
    - Courant
    - Watt
    - Volt
    - Ampère
    - Loi d'Ohm
    - Triangle de puissance
    - Travail électrique
    - Énergie
    - Joule
    - Kilowattheure
    - kWh
machine_translated: true
---

# Unités électriques : puissance, tension, courant et énergie

## Les trois unités fondamentales {/*#the-three-core-units*/}

| Symbole | Grandeur   | Unité      |
| ------- | ---------- | ---------- |
| P       | Puissance  | Watt (W)   |
| U       | Tension    | Volt (V)   |
| I       | Courant    | Ampère (A) |

## Le triangle de puissance {/*#the-power-triangle*/}

Les trois grandeurs sont liées par la formule **P = U x I**. Masquer la grandeur à calculer fait apparaître la formule :

```text
      P
    -----
    U | I
```

- **P = U x I** (puissance = tension x courant)
- **U = P / I** (tension = puissance / courant)
- **I = P / U** (courant = puissance / tension)

## Loi d'Ohm {/*#ohms-law*/}

La loi d'Ohm introduit la résistance **R** (mesurée en ohms, Ω) et la relie à la tension et au courant.

La même méthode du triangle s'applique ici :

```text
      U
    -----
    R | I
```

- **U = R x I** (tension = résistance x courant)
- **R = U / I** (résistance = tension / courant)
- **I = U / R** (courant = tension / résistance)

## Formules combinées {/*#combined-formulas*/}

La combinaison de la formule de puissance et de la loi d'Ohm donne d'autres façons de calculer la puissance :

- **P = U² / R**
- **P = I² x R**

## Exemples {/*#examples*/}

**Exemple 1 :** un appareil fonctionne sous 230 V et absorbe 2 A. Quelle est sa consommation de puissance (P) ?

```text
P = U x I = 230 V x 2 A = 460 W
```

**Exemple 2 :** une ampoule de 100 W fonctionne sous 230 V. Quel courant (I) absorbe-t-elle ?

```text
I = P / U = 100 W / 230 V ≈ 0.43 A
```

**Exemple 3 :** une résistance de 50 Ω est parcourue par un courant de 3 A. Quelle tension chute à ses bornes ?

```text
U = R x I = 50 Ω x 3 A = 150 V
```

## Travail électrique (énergie) {/*#electrical-work-energy*/}

Le travail électrique **W** (souvent appelé énergie, parfois noté **E**) est la quantité d'énergie qu'un appareil consomme ou produit au fil du temps. L'unité SI est le **joule (J)**, mais dans l'usage électrique courant, il est plus souvent exprimé en **wattheures (Wh)** ou en **kilowattheures (kWh)**.

La formule de base est :

- **W = P x t** (travail = puissance x temps)

Remplacer **P** par **U x I** donne une forme qui calcule **W** directement à partir de **U**, **I** et **t**, sans devoir calculer **P** au préalable :

- **W = U x I x t**

### Unités courantes d'énergie {/*#common-units-of-energy*/}

| Unité         | Symbole | Équivaut à             |
| ------------- | ------- | ---------------------- |
| Joule         | J       | 1 W x 1 s              |
| Wattheure     | Wh      | 3 600 J                |
| Kilowattheure | kWh     | 1 000 Wh = 3 600 000 J |

:::info
Le symbole **W** désigne à la fois l'unité « watt » (unité de puissance) et la grandeur « travail ». Le contexte rend généralement le sens clair. Certaines sources utilisent **E** pour le « travail » afin d'éviter toute confusion.
:::

### Exemples {/*#examples-1*/}

**Exemple 1 :** une ampoule de 60 W fonctionne pendant 5 heures. Quelle énergie consomme-t-elle ?

```text
W = P x t = 60 W x 5 h = 300 Wh = 0.3 kWh
```

**Exemple 2 :** un appareil absorbe 2 A sous 230 V pendant 30 minutes. Quelle énergie utilise-t-il ?

```text
W = U x I x t = 230 V x 2 A x 0.5 h = 230 Wh
```

**Exemple 3 :** une facture d'électricité indique 250 kWh consommés à 0,30 € par kWh. Quel est le coût total ?

```text
Cost = 250 kWh x €0.30/kWh = €75.00
```
