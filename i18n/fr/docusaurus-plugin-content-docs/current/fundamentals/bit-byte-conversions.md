---
title: "Conversions de bits, d'octets et d'unités"
description: "Notions de base sur les bits, les octets et les unités binaires (kibi)"
keywords:
  - "Bit"
  - "Octet"
  - "Unités de données"
  - "Conversion"
  - "Binaire"
  - "Décimal"
  - "Stockage"
machine_translated: true
---

# Conversions de bits, d'octets et d'unités

:::info
Les préfixes décimaux utilisés ici (kilo, méga, giga…) sont les [préfixes SI](./si-prefixes.md) standard appliqués aux octets. Les préfixes binaires (kibi, mébi, gibi…) sont les équivalents CEI destinés spécifiquement aux puissances de 2.
:::

## Notions de base : bit et octet {/*#bit--byte-basics*/}

| Unité | Symbole | En bits | En octets |
| ----- | ------- | ------- | --------- |
| Bit   | b       | 1       | 0,125     |
| Octet | o (B)   | 8       | 1         |

**Information complémentaire :** Les débits réseau s'expriment en **bits/s** (Mb/s, Gb/s), le stockage en **octets** (Mo, Go)

---

## Unités décimales (base 10) {/*#decimal-units-base-10*/}

| Unité     | Symbole | Puissance | Facteur | En octets             |
| --------- | ------- | --------- | ------- | --------------------- |
| Kilooctet | ko (kB) | 10³       | 1 000¹  | 1 000                 |
| Mégaoctet | Mo (MB) | 10⁶       | 1 000²  | 1 000 000             |
| Gigaoctet | Go (GB) | 10⁹       | 1 000³  | 1 000 000 000         |
| Téraoctet | To (TB) | 10¹²      | 1 000⁴  | 1 000 000 000 000     |
| Pétaoctet | Po (PB) | 10¹⁵      | 1 000⁵  | 1 000 000 000 000 000 |

**Palier :** Un palier vaut '³'  
**Utilisées par :** Les fabricants de disques durs, le marketing, les réseaux

---

## Unités binaires (base 2) {/*#binary-units-base-2*/}

| Unité     | Symbole | Puissance | Facteur | En octets                 |
| --------- | ------- | --------- | ------- | ------------------------- |
| Kibioctet | Kio (KiB) | 2¹⁰     | 1 024¹  | 1 024                     |
| Mébioctet | Mio (MiB) | 2²⁰     | 1 024²  | 1 048 576                 |
| Gibioctet | Gio (GiB) | 2³⁰     | 1 024³  | 1 073 741 824             |
| Tébioctet | Tio (TiB) | 2⁴⁰     | 1 024⁴  | 1 099 511 627 776         |
| Pébioctet | Pio (PiB) | 2⁵⁰     | 1 024⁵  | 1 125 899 906 842 624     |

**Palier :** Un palier vaut '¹⁰'  
**Utilisées par :** Les systèmes d'exploitation, la RAM, les calculs de stockage réels

---

## Méthodes de conversion {/*#conversion-methods*/}

### 1. Bit ↔ octet {/*#1-bit--byte*/}

#### Bit → octet {/*#bit--byte*/}

```text
Formula: bits ÷ 8 = bytes

Example: 64 bits → bytes
64 ÷ 8 = 8 bytes
```

#### Octet → bit {/*#byte--bit*/}

```text
Formula: bytes × 8 = bits

Example: 100 bytes → bits
100 × 8 = 800 bits
```

---

### 2. Unités décimales (avec 1 000) {/*#2-decimal-units-using-1000*/}

#### Vers le haut (du plus petit au plus grand) {/*#upward-smaller--larger*/}

```text
Steps: kB → MB → GB → TB → PB
Formula: value ÷ 10^steps

Example: 5,000,000 kB → GB
Steps: kB → MB → GB = 2 steps
5,000,000 kB ÷ 10⁶ = 5 GB
```

#### Vers le bas (du plus grand au plus petit) {/*#downward-larger--smaller*/}

```text
Steps: PB → TB → GB → MB → kB
Formula: value × 10^steps

Example: 2 TB → MB
Steps: TB → GB → MB = 2 steps
2 TB × 10⁶ = 2,000,000 MB
```

---

### 3. Unités binaires (avec 1 024) {/*#3-binary-units-using-1024*/}

#### Vers le haut (du plus petit au plus grand) {/*#upward-smaller--larger-1*/}

```text
Steps: KiB → MiB → GiB → TiB → PiB
Formula: value ÷ 2^steps

Example: 6,800,000 KiB → GiB
Steps: KiB → MiB → GiB = 2 steps
6,800,000 KiB ÷ 2²⁰ = 6.485 GiB
```

#### Vers le bas (du plus grand au plus petit) {/*#downward-larger--smaller-1*/}

```text
Steps: PiB → TiB → GiB → MiB → KiB
Formula: value × 2^steps

Example: 3 GiB → KiB
Steps: GiB → MiB → KiB = 2 steps
3 GiB × 2²⁰ = 3,145,728 KiB
```

---

### 4. Conversion décimal ↔ binaire {/*#4-decimal--binary-conversion*/}

#### Décimal → binaire (par ex. Mo → Mio) {/*#decimal--binary-eg-mb--mib*/}

```text
Formula: (decimal value) ÷ 1.024^steps ≈ binary value

Example: 1,000 MB → MiB
Steps: Both are "Mega" level = same position, but different base
1,000 MB ÷ 1.024 ≈ 976.56 MiB

Alternative (precise):
1,000 MB * 10⁶ = 1,000,000,000 bytes
1,000,000,000 bytes ÷ 2¹⁰ = 953.67 MiB
```

#### Binaire → décimal (par ex. Gio → Go) {/*#binary--decimal-eg-gib--gb*/}

```text
Formula: (binary value) × 1.024^steps ≈ decimal value

Example: 500 GiB → GB
Steps: Both are "Giga" level = same position, but different base
500 × 1.024 ≈ 512 GB

Alternative (precise):
500 GiB * 2³⁰ = 536,870,912,000 bytes
536,870,912,000 bytes ÷ 10⁹ = 536,87
```

---

## Référence rapide {/*#quick-reference*/}

| Type de conversion | Formule    | Exemple                 |
| ------------------ | ---------- | ----------------------- |
| Bit → octet        | ÷ 8        | 1 000 b → 125 o         |
| Octet → bit        | × 8        | 125 o → 1 000 b         |
| Décimal, vers le haut | ÷ 10^paliers | 5 000 Mo → 5 Go      |
| Décimal, vers le bas  | × 10^paliers | 2 To → 2 000 000 Mo  |
| Binaire, vers le haut | ÷ 2^paliers  | 2 048 Kio → 2 Mio    |
| Binaire, vers le bas  | × 2^paliers  | 3 Gio → 3 145 728 Kio |
| Mo → Mio           | ÷ 1,024    | 1 000 Mo ≈ 976,56 Mio   |
| Gio → Go           | × 1,024    | 500 Gio ≈ 512 Go        |

---

## Pièges courants {/*#common-pitfalls*/}

- **Ne pas mélanger les unités :** `1 GB ≠ 1 GiB` (1 Go = 0,931 Gio)
- **Astuce marketing :** Un disque dur de « 500 Go » fait en réalité ~465,66 Gio
- **Débits réseau :** 100 Mb/s ≠ 100 Mo/s (100 Mb/s = 12,5 Mo/s)

## Voir aussi {/*#see-also*/}

- [Préfixes SI](./si-prefixes.md) : les préfixes métriques généraux (kilo, méga, giga, milli, micro, etc.) appliqués à n'importe quelle unité, pas seulement aux octets
