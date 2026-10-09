---
title: "Préfixes SI"
description: "Préfixes SI (métriques) courants et leurs multiplicateurs, de pico à téra, utilisés pour mettre à l'échelle des unités telles que le mètre, le gramme, la seconde, le volt, le watt et le hertz."
keywords:
    - Préfixes SI
    - Préfixes métriques
    - Unités
    - Téra
    - Giga
    - Méga
    - Kilo
    - Déci
    - Centi
    - Milli
    - Micro
    - Nano
    - Pico
machine_translated: true
---

# Préfixes SI

Les préfixes SI sont des multiplicateurs normalisés accolés à une unité de base pour exprimer des quantités très grandes ou très petites.  
Ils s'appliquent à toute unité SI : mètres, grammes, secondes, volts, watts, hertz, etc.

## Préfixes courants {/*#common-prefixes*/}

Le tableau est ordonné du plus grand préfixe au plus petit. L'unité de base (facteur 1) se situe au milieu.

| Préfixe | Symbole | Facteur               | Puissance | Exemple         |
| ------- | ------- | --------------------- | --------- | --------------- |
| téra    | T       | 1 000 000 000 000     | 10¹²      | To, THz         |
| giga    | G       | 1 000 000 000         | 10⁹       | GHz, GW         |
| méga    | M       | 1 000 000             | 10⁶       | MW, MΩ          |
| kilo    | k       | 1 000                 | 10³       | km, kg, kV, kWh |
| —       | —       | 1                     | 10⁰       | m, g, V, W      |
| déci    | d       | 0,1                   | 10⁻¹      | dl, dm          |
| centi   | c       | 0,01                  | 10⁻²      | cm              |
| milli   | m       | 0,001                 | 10⁻³      | mm, mV, ms      |
| micro   | µ       | 0,000001              | 10⁻⁶      | µs, µm, µF      |
| nano    | n       | 0,000000001           | 10⁻⁹      | nm, ns          |
| pico    | p       | 0,000000000001        | 10⁻¹²     | pF, ps          |

:::info
La séquence « principale » (kilo => méga => giga => téra et milli => micro => nano => pico) progresse par pas de **1 000** (10³) par préfixe. **Déci** et **centi** se situent entre l'unité de base et milli, comme étapes intermédiaires plus petites (10⁻¹ et 10⁻²).
:::

## Passage d'un préfixe à l'autre {/*#scaling-between-prefixes*/}

Chaque préfixe est une puissance de 10 (voir la colonne [Puissance](#common-prefixes) ci-dessus). Pour convertir entre deux préfixes, la différence de leurs puissances est calculée et appliquée sous forme de pas.

### Vers le haut (plus petit => plus grand) {/*#upward-smaller--larger*/}

```text
Formula: value / 10^steps

Example: 2,500 mV => V
Steps: mV (10⁻³) => V (10⁰) = 3 powers of 10
2,500 mV / 10³ = 2.5 V
```

### Vers le bas (plus grand => plus petit) {/*#downward-larger--smaller*/}

```text
Formula: value x 10^steps

Example: 5 km => mm
Steps: km (10³) => mm (10⁻³) = 6 powers of 10
5 km x 10⁶ = 5,000,000 mm
```

## Exemples courants en pratique {/*#common-examples-in-practice*/}

- **kV** : kilovolt, 1 000 V (lignes électriques à haute tension)
- **mA** : milliampère, 0,001 A (petite électronique)
- **MHz** : mégahertz, 1 000 000 Hz (fréquences radio, horloges de processeur)
- **nm** : nanomètre, 0,000000001 m (nœuds de gravure des semi-conducteurs, longueurs d'onde de la lumière)
- **kWh** : kilowattheure, 1 000 Wh (factures d'électricité)
- **µF** : microfarad, 0,000001 F (valeurs de condensateurs)

## Voir aussi {/*#see-also*/}

- [Bits, octets et conversions d'unités](./bit-byte-conversions.md) : applique ces préfixes aux octets (décimal) et les oppose aux préfixes binaires CEI (kibi, mébi, gibi, etc.)
- [Unités électriques](./electrical-units.md) : utilise ces préfixes pour V, A, W, Wh, etc.
