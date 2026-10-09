---
title: "Prefixos do SI"
description: "Prefixos comuns do SI (métricos) e seus multiplicadores, de pico a tera, usados para escalar unidades como metros, gramas, segundos, volts, watts e hertz."
keywords:
    - Prefixos do SI
    - Prefixos Métricos
    - Unidades
    - Tera
    - Giga
    - Mega
    - Quilo
    - Deci
    - Centi
    - Mili
    - Micro
    - Nano
    - Pico
machine_translated: true
---

# Prefixos do SI

Os prefixos do SI são multiplicadores padronizados acrescentados a uma unidade base para expressar quantidades muito grandes ou muito pequenas.  
Aplicam-se a qualquer unidade do SI: metros, gramas, segundos, volts, watts, hertz e assim por diante.

## Prefixos comuns {/*#common-prefixes*/}

A tabela está ordenada do maior prefixo para o menor. A unidade base (fator 1) fica no meio.

| Prefixo | Símbolo | Fator                 | Potência | Exemplo         |
| ------ | ------ | --------------------- | ----- | --------------- |
| tera   | T      | 1.000.000.000.000     | 10¹²  | TB, THz         |
| giga   | G      | 1.000.000.000         | 10⁹   | GHz, GW         |
| mega   | M      | 1.000.000             | 10⁶   | MW, MΩ          |
| quilo  | k      | 1.000                 | 10³   | km, kg, kV, kWh |
| —      | —      | 1                     | 10⁰   | m, g, V, W      |
| deci   | d      | 0,1                   | 10⁻¹  | dl, dm          |
| centi  | c      | 0,01                  | 10⁻²  | cm              |
| mili   | m      | 0,001                 | 10⁻³  | mm, mV, ms      |
| micro  | µ      | 0,000001              | 10⁻⁶  | µs, µm, µF      |
| nano   | n      | 0,000000001           | 10⁻⁹  | nm, ns          |
| pico   | p      | 0,000000000001        | 10⁻¹² | pF, ps          |

:::info
A sequência "principal" (quilo => mega => giga => tera e mili => micro => nano => pico) avança em passos de **1.000** (10³) por prefixo. **Deci** e **centi** ficam entre a unidade base e mili como passos intermediários menores (10⁻¹ e 10⁻²).
:::

## Conversão entre prefixos {/*#scaling-between-prefixes*/}

Cada prefixo é apenas uma potência de 10 (ver a coluna [Potência](#common-prefixes) acima). Para converter entre dois prefixos, toma-se a diferença de suas potências e aplica-se como passos.

### Para cima (menor => maior) {/*#upward-smaller--larger*/}

```text
Formula: value / 10^steps

Example: 2,500 mV => V
Steps: mV (10⁻³) => V (10⁰) = 3 powers of 10
2,500 mV / 10³ = 2.5 V
```

### Para baixo (maior => menor) {/*#downward-larger--smaller*/}

```text
Formula: value x 10^steps

Example: 5 km => mm
Steps: km (10³) => mm (10⁻³) = 6 powers of 10
5 km x 10⁶ = 5,000,000 mm
```

## Exemplos comuns na prática {/*#common-examples-in-practice*/}

- **kV** — quilovolt, 1.000 V (linhas de transmissão de alta tensão)
- **mA** — miliampère, 0,001 A (eletrônicos de pequeno porte)
- **MHz** — megahertz, 1.000.000 Hz (frequências de rádio, clocks de CPU)
- **nm** — nanômetro, 0,000000001 m (nós de processo de semicondutores, comprimentos de onda da luz)
- **kWh** — quilowatt-hora, 1.000 Wh (contas de energia elétrica)
- **µF** — microfarad, 0,000001 F (valores de capacitores)

## Veja também {/*#see-also*/}

- [Conversões de Bit, Byte e Unidades](./bit-byte-conversions.md): aplica esses prefixos a bytes (decimais) e os contrasta com os prefixos binários da IEC (kibi, mebi, gibi etc.)
- [Unidades Elétricas](./electrical-units.md): usa esses prefixos para V, A, W, Wh etc.
