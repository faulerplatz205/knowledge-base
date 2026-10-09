---
title: "Prefijos del SI"
description: "Prefijos habituales del SI (sistema métrico) y sus multiplicadores, de pico a tera, utilizados para escalar unidades como metros, gramos, segundos, voltios, vatios y hercios."
keywords:
    - Prefijos del SI
    - Prefijos métricos
    - Unidades
    - Tera
    - Giga
    - Mega
    - Kilo
    - Deci
    - Centi
    - Mili
    - Micro
    - Nano
    - Pico
machine_translated: true
---

# Prefijos del SI

Los prefijos del SI son multiplicadores normalizados que se anteponen a una unidad base para expresar cantidades muy grandes o muy pequeñas.  
Se aplican a cualquier unidad del SI: metros, gramos, segundos, voltios, vatios, hercios, etc.

## Prefijos habituales {/*#common-prefixes*/}

La tabla está ordenada del prefijo mayor al menor. La unidad base (factor 1) se sitúa en el centro.

| Prefijo | Símbolo | Factor                | Potencia | Ejemplo         |
| ------- | ------- | --------------------- | -------- | --------------- |
| tera    | T       | 1.000.000.000.000     | 10¹²     | TB, THz         |
| giga    | G       | 1.000.000.000         | 10⁹      | GHz, GW         |
| mega    | M       | 1.000.000             | 10⁶      | MW, MΩ          |
| kilo    | k       | 1.000                 | 10³      | km, kg, kV, kWh |
| —       | —       | 1                     | 10⁰      | m, g, V, W      |
| deci    | d       | 0,1                   | 10⁻¹     | dl, dm          |
| centi   | c       | 0,01                  | 10⁻²     | cm              |
| mili    | m       | 0,001                 | 10⁻³     | mm, mV, ms      |
| micro   | µ       | 0,000001              | 10⁻⁶     | µs, µm, µF      |
| nano    | n       | 0,000000001           | 10⁻⁹     | nm, ns          |
| pico    | p       | 0,000000000001        | 10⁻¹²    | pF, ps          |

:::info
La secuencia "principal" (kilo => mega => giga => tera y mili => micro => nano => pico) avanza en pasos de **1.000** (10³) por prefijo. **Deci** y **centi** se sitúan entre la unidad base y mili como pasos intermedios más pequeños (10⁻¹ y 10⁻²).
:::

## Escalado entre prefijos {/*#scaling-between-prefixes*/}

Cada prefijo es una potencia de 10 (véase la columna [Potencia](#common-prefixes) de arriba). Para convertir entre dos prefijos, se toma la diferencia de sus potencias y se aplica como pasos.

### Hacia arriba (menor => mayor) {/*#upward-smaller--larger*/}

```text
Formula: value / 10^steps

Example: 2,500 mV => V
Steps: mV (10⁻³) => V (10⁰) = 3 powers of 10
2,500 mV / 10³ = 2.5 V
```

### Hacia abajo (mayor => menor) {/*#downward-larger--smaller*/}

```text
Formula: value x 10^steps

Example: 5 km => mm
Steps: km (10³) => mm (10⁻³) = 6 powers of 10
5 km x 10⁶ = 5,000,000 mm
```

## Ejemplos habituales en la práctica {/*#common-examples-in-practice*/}

- **kV** — kilovoltio, 1.000 V (líneas eléctricas de alta tensión)
- **mA** — miliamperio, 0,001 A (electrónica de pequeña escala)
- **MHz** — megahercio, 1.000.000 Hz (radiofrecuencias, relojes de CPU)
- **nm** — nanómetro, 0,000000001 m (nodos de proceso de semiconductores, longitudes de onda de la luz)
- **kWh** — kilovatio hora, 1.000 Wh (facturas de electricidad)
- **µF** — microfaradio, 0,000001 F (valores de condensadores)

## Véase también {/*#see-also*/}

- [Conversiones de bits, bytes y unidades](./bit-byte-conversions.md): aplica estos prefijos a los bytes (decimales) y los contrasta con los prefijos binarios de la IEC (kibi, mebi, gibi, etc.)
- [Unidades eléctricas](./electrical-units.md): utiliza estos prefijos para V, A, W, Wh, etc.
