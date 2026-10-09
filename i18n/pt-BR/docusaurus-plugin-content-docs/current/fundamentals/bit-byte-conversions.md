---
title: "Conversões de Bit, Byte e Unidades"
description: "Fundamentos de Bit, Byte e Kibi"
keywords:
  - "Bit"
  - "Byte"
  - "Unidades de Dados"
  - "Conversão"
  - "Binário"
  - "Decimal"
  - "Armazenamento"
machine_translated: true
---

# Conversões de Bit, Byte e Unidades

:::info
Os prefixos decimais usados aqui (quilo, mega, giga…) são os [prefixos SI](./si-prefixes.md) padrão aplicados a bytes. Os prefixos binários (kibi, mebi, gibi…) são os equivalentes da IEC especificamente para potências de 2.
:::

## Fundamentos de Bit e Byte {/*#bit--byte-basics*/}

| Unidade | Símbolo | Em Bits | Em Bytes |
| ------- | ------- | ------- | -------- |
| Bit     | b       | 1       | 0,125    |
| Byte    | B       | 8       | 1        |

**Informação adicional:** Velocidades de rede usam **bits/s** (Mb/s, Gb/s), o armazenamento usa **bytes** (MB, GB)

---

## Unidades Decimais (Base 10) {/*#decimal-units-base-10*/}

| Unidade  | Símbolo | Potência | Fator  | Em Bytes              |
| -------- | ------- | -------- | ------ | --------------------- |
| Kilobyte | kB      | 10³      | 1.000¹ | 1.000                 |
| Megabyte | MB      | 10⁶      | 1.000² | 1.000.000             |
| Gigabyte | GB      | 10⁹      | 1.000³ | 1.000.000.000         |
| Terabyte | TB      | 10¹²     | 1.000⁴ | 1.000.000.000.000     |
| Petabyte | PB      | 10¹⁵     | 1.000⁵ | 1.000.000.000.000.000 |

**Passo:** Um passo equivale a '³'  
**Usado por:** Fabricantes de discos rígidos, marketing, redes

---

## Unidades Binárias (Base 2) {/*#binary-units-base-2*/}

| Unidade  | Símbolo | Potência | Fator  | Em Bytes              |
| -------- | ------- | -------- | ------ | --------------------- |
| Kibibyte | KiB     | 2¹⁰      | 1.024¹ | 1.024                 |
| Mebibyte | MiB     | 2²⁰      | 1.024² | 1.048.576             |
| Gibibyte | GiB     | 2³⁰      | 1.024³ | 1.073.741.824         |
| Tebibyte | TiB     | 2⁴⁰      | 1.024⁴ | 1.099.511.627.776     |
| Pebibyte | PiB     | 2⁵⁰      | 1.024⁵ | 1.125.899.906.842.624 |

**Passo:** Um passo equivale a '¹⁰'  
**Usado por:** Sistemas operacionais, RAM, cálculos reais de armazenamento

---

## Métodos de Conversão {/*#conversion-methods*/}

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

### 2. Unidades Decimais (Usando 1.000) {/*#2-decimal-units-using-1000*/}

#### Para Cima (Menor → Maior) {/*#upward-smaller--larger*/}

```text
Steps: kB → MB → GB → TB → PB
Formula: value ÷ 10^steps

Example: 5,000,000 kB → GB
Steps: kB → MB → GB = 2 steps
5,000,000 kB ÷ 10⁶ = 5 GB
```

#### Para Baixo (Maior → Menor) {/*#downward-larger--smaller*/}

```text
Steps: PB → TB → GB → MB → kB
Formula: value × 10^steps

Example: 2 TB → MB
Steps: TB → GB → MB = 2 steps
2 TB × 10⁶ = 2,000,000 MB
```

---

### 3. Unidades Binárias (Usando 1.024) {/*#3-binary-units-using-1024*/}

#### Para Cima (Menor → Maior) {/*#upward-smaller--larger-1*/}

```text
Steps: KiB → MiB → GiB → TiB → PiB
Formula: value ÷ 2^steps

Example: 6,800,000 KiB → GiB
Steps: KiB → MiB → GiB = 2 steps
6,800,000 KiB ÷ 2²⁰ = 6.485 GiB
```

#### Para Baixo (Maior → Menor) {/*#downward-larger--smaller-1*/}

```text
Steps: PiB → TiB → GiB → MiB → KiB
Formula: value × 2^steps

Example: 3 GiB → KiB
Steps: GiB → MiB → KiB = 2 steps
3 GiB × 2²⁰ = 3,145,728 KiB
```

---

### 4. Conversão Decimal ↔ Binário {/*#4-decimal--binary-conversion*/}

#### Decimal → Binário (p. ex., MB → MiB) {/*#decimal--binary-eg-mb--mib*/}

```text
Formula: (decimal value) ÷ 1.024^steps ≈ binary value

Example: 1,000 MB → MiB
Steps: Both are "Mega" level = same position, but different base
1,000 MB ÷ 1.024 ≈ 976.56 MiB

Alternative (precise):
1,000 MB * 10⁶ = 1,000,000,000 bytes
1,000,000,000 bytes ÷ 2¹⁰ = 953.67 MiB
```

#### Binário → Decimal (p. ex., GiB → GB) {/*#binary--decimal-eg-gib--gb*/}

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

## Referência Rápida {/*#quick-reference*/}

| Tipo de Conversão | Fórmula    | Exemplo                 |
| ----------------- | ---------- | ----------------------- |
| Bit → Byte        | ÷ 8        | 1.000 b → 125 B         |
| Byte → Bit        | × 8        | 125 B → 1.000 b         |
| Decimal para cima | ÷ 10^passos | 5.000 MB → 5 GB        |
| Decimal para baixo | × 10^passos | 2 TB → 2.000.000 MB   |
| Binário para cima | ÷ 2^passos | 2.048 KiB → 2 MiB       |
| Binário para baixo | × 2^passos | 3 GiB → 3.145.728 KiB  |
| MB → MiB          | ÷ 1,024    | 1.000 MB ≈ 976,56 MiB   |
| GiB → GB          | × 1,024    | 500 GiB ≈ 512 GB        |

---

## Armadilhas Comuns {/*#common-pitfalls*/}

- **Não misturar unidades:** `1 GB ≠ 1 GiB` (1 GB = 0,931 GiB)
- **Truque de marketing:** Um disco rígido de "500 GB" tem, na verdade, ~465,66 GiB
- **Velocidades de rede:** 100 Mb/s ≠ 100 MB/s (100 Mb/s = 12,5 MB/s)

## Veja Também {/*#see-also*/}

- [Prefixos SI](./si-prefixes.md): os prefixos métricos gerais (quilo, mega, giga, mili, micro etc.) aplicados a qualquer unidade, não apenas a bytes
