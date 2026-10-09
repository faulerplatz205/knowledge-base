---
title: "Bit, byte y conversiones de unidades"
description: "Fundamentos de bit, byte y kibi"
keywords:
  - "Bit"
  - "Byte"
  - "Unidades de datos"
  - "Conversión"
  - "Binario"
  - "Decimal"
  - "Almacenamiento"
machine_translated: true
---

# Bit, byte y conversiones de unidades

:::info
Los prefijos decimales utilizados aquí (kilo, mega, giga…) son los [prefijos SI](./si-prefixes.md) estándar aplicados a bytes. Los prefijos binarios (kibi, mebi, gibi…) son los equivalentes de la IEC específicos para potencias de 2.
:::

## Fundamentos de bit y byte {/*#bit--byte-basics*/}

| Unidad | Símbolo | En bits | En bytes |
| ------ | ------- | ------- | -------- |
| Bit    | b       | 1       | 0,125    |
| Byte   | B       | 8       | 1        |

**Información adicional:** Las velocidades de red utilizan **bits/s** (Mb/s, Gb/s); el almacenamiento utiliza **bytes** (MB, GB)

---

## Unidades decimales (base 10) {/*#decimal-units-base-10*/}

| Unidad   | Símbolo | Potencia | Factor | En bytes              |
| -------- | ------- | -------- | ------ | --------------------- |
| Kilobyte | kB      | 10³      | 1.000¹ | 1.000                 |
| Megabyte | MB      | 10⁶      | 1.000² | 1.000.000             |
| Gigabyte | GB      | 10⁹      | 1.000³ | 1.000.000.000         |
| Terabyte | TB      | 10¹²     | 1.000⁴ | 1.000.000.000.000     |
| Petabyte | PB      | 10¹⁵     | 1.000⁵ | 1.000.000.000.000.000 |

**Paso:** Un paso equivale a '³'  
**Utilizadas por:** Fabricantes de discos duros, marketing, redes

---

## Unidades binarias (base 2) {/*#binary-units-base-2*/}

| Unidad   | Símbolo | Potencia | Factor | En bytes              |
| -------- | ------- | -------- | ------ | --------------------- |
| Kibibyte | KiB     | 2¹⁰      | 1.024¹ | 1.024                 |
| Mebibyte | MiB     | 2²⁰      | 1.024² | 1.048.576             |
| Gibibyte | GiB     | 2³⁰      | 1.024³ | 1.073.741.824         |
| Tebibyte | TiB     | 2⁴⁰      | 1.024⁴ | 1.099.511.627.776     |
| Pebibyte | PiB     | 2⁵⁰      | 1.024⁵ | 1.125.899.906.842.624 |

**Paso:** Un paso equivale a '¹⁰'  
**Utilizadas por:** Sistemas operativos, RAM, cálculos reales de almacenamiento

---

## Métodos de conversión {/*#conversion-methods*/}

### 1. Bit ↔ Byte {/*#1-bit--byte*/}

#### Bit → Byte {/*#bit--byte*/}

```text
Formula: bits ÷ 8 = bytes

Example: 64 bits → bytes
64 ÷ 8 = 8 bytes
```

#### Byte → Bit {/*#byte--bit*/}

```text
Formula: bytes × 8 = bits

Example: 100 bytes → bits
100 × 8 = 800 bits
```

---

### 2. Unidades decimales (con 1.000) {/*#2-decimal-units-using-1000*/}

#### Hacia arriba (de menor a mayor) {/*#upward-smaller--larger*/}

```text
Steps: kB → MB → GB → TB → PB
Formula: value ÷ 10^steps

Example: 5,000,000 kB → GB
Steps: kB → MB → GB = 2 steps
5,000,000 kB ÷ 10⁶ = 5 GB
```

#### Hacia abajo (de mayor a menor) {/*#downward-larger--smaller*/}

```text
Steps: PB → TB → GB → MB → kB
Formula: value × 10^steps

Example: 2 TB → MB
Steps: TB → GB → MB = 2 steps
2 TB × 10⁶ = 2,000,000 MB
```

---

### 3. Unidades binarias (con 1.024) {/*#3-binary-units-using-1024*/}

#### Hacia arriba (de menor a mayor) {/*#upward-smaller--larger-1*/}

```text
Steps: KiB → MiB → GiB → TiB → PiB
Formula: value ÷ 2^steps

Example: 6,800,000 KiB → GiB
Steps: KiB → MiB → GiB = 2 steps
6,800,000 KiB ÷ 2²⁰ = 6.485 GiB
```

#### Hacia abajo (de mayor a menor) {/*#downward-larger--smaller-1*/}

```text
Steps: PiB → TiB → GiB → MiB → KiB
Formula: value × 2^steps

Example: 3 GiB → KiB
Steps: GiB → MiB → KiB = 2 steps
3 GiB × 2²⁰ = 3,145,728 KiB
```

---

### 4. Conversión decimal ↔ binario {/*#4-decimal--binary-conversion*/}

#### Decimal → binario (p. ej., MB → MiB) {/*#decimal--binary-eg-mb--mib*/}

```text
Formula: (decimal value) ÷ 1.024^steps ≈ binary value

Example: 1,000 MB → MiB
Steps: Both are "Mega" level = same position, but different base
1,000 MB ÷ 1.024 ≈ 976.56 MiB

Alternative (precise):
1,000 MB * 10⁶ = 1,000,000,000 bytes
1,000,000,000 bytes ÷ 2¹⁰ = 953.67 MiB
```

#### Binario → decimal (p. ej., GiB → GB) {/*#binary--decimal-eg-gib--gb*/}

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

## Referencia rápida {/*#quick-reference*/}

| Tipo de conversión | Fórmula    | Ejemplo               |
| ------------------ | ---------- | --------------------- |
| Bit → Byte         | ÷ 8        | 1.000 b → 125 B       |
| Byte → Bit         | × 8        | 125 B → 1.000 b       |
| Decimal hacia arriba | ÷ 10^pasos | 5.000 MB → 5 GB     |
| Decimal hacia abajo | × 10^pasos | 2 TB → 2.000.000 MB  |
| Binario hacia arriba | ÷ 2^pasos | 2.048 KiB → 2 MiB    |
| Binario hacia abajo | × 2^pasos | 3 GiB → 3.145.728 KiB |
| MB → MiB           | ÷ 1,024    | 1.000 MB ≈ 976,56 MiB |
| GiB → GB           | × 1,024    | 500 GiB ≈ 512 GB      |

---

## Errores habituales {/*#common-pitfalls*/}

- **No mezclar unidades:** `1 GB ≠ 1 GiB` (1 GB = 0,931 GiB)
- **Truco de marketing:** Un disco duro de "500 GB" son en realidad ~465,66 GiB
- **Velocidades de red:** 100 Mb/s ≠ 100 MB/s (100 Mb/s = 12,5 MB/s)

## Véase también {/*#see-also*/}

- [Prefijos SI](./si-prefixes.md): los prefijos métricos generales (kilo, mega, giga, mili, micro, etc.) aplicados a cualquier unidad, no solo a bytes
