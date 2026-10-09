---
title: "Unidades eléctricas – potencia, tensión, corriente y energía"
description: "La relación entre potencia (P), tensión (U), corriente (I), resistencia (R) y trabajo eléctrico o energía (W). Incluye el triángulo de potencia, la ley de Ohm y los kilovatios hora."
keywords:
    - Unidades eléctricas
    - Potencia
    - Tensión
    - Corriente
    - Vatio
    - Voltio
    - Amperio
    - Ley de Ohm
    - Triángulo de potencia
    - Trabajo eléctrico
    - Energía
    - Julio
    - Kilovatio hora
    - kWh
machine_translated: true
---

# Unidades eléctricas – potencia, tensión, corriente y energía

## Las tres unidades básicas {/*#the-three-core-units*/}

| Símbolo | Magnitud | Unidad       |
| ------- | -------- | ------------ |
| P       | Potencia | Vatio (W)    |
| U       | Tensión  | Voltio (V)   |
| I       | Corriente | Amperio (A) |

## El triángulo de potencia {/*#the-power-triangle*/}

Las tres magnitudes se relacionan mediante la fórmula **P = U x I**. Al tapar la magnitud que se desea calcular, se revela la fórmula:

```text
      P
    -----
    U | I
```

- **P = U x I** (Potencia = Tensión x Corriente)
- **U = P / I** (Tensión = Potencia / Corriente)
- **I = P / U** (Corriente = Potencia / Tensión)

## Ley de Ohm {/*#ohms-law*/}

La ley de Ohm introduce la resistencia **R** (medida en ohmios, Ω) y la relaciona con la tensión y la corriente.

Aquí se aplica el mismo método del triángulo:

```text
      U
    -----
    R | I
```

- **U = R x I** (Tensión = Resistencia x Corriente)
- **R = U / I** (Resistencia = Tensión / Corriente)
- **I = U / R** (Corriente = Tensión / Resistencia)

## Fórmulas combinadas {/*#combined-formulas*/}

Combinar la fórmula de la potencia con la ley de Ohm proporciona otras formas de calcular la potencia:

- **P = U² / R**
- **P = I² x R**

## Ejemplos {/*#examples*/}

**Ejemplo 1:** Un aparato funciona a 230 V y consume 2 A. ¿Cuál es su consumo de potencia (P)?

```text
P = U x I = 230 V x 2 A = 460 W
```

**Ejemplo 2:** Una bombilla de 100 W funciona a 230 V. ¿Qué corriente (I) consume?

```text
I = P / U = 100 W / 230 V ≈ 0.43 A
```

**Ejemplo 3:** Una resistencia de 50 Ω es recorrida por 3 A. ¿Qué tensión cae en ella?

```text
U = R x I = 50 Ω x 3 A = 150 V
```

## Trabajo eléctrico (energía) {/*#electrical-work-energy*/}

El trabajo eléctrico **W** (a menudo llamado energía, a veces escrito como **E**) es la cantidad de energía que un aparato consume o produce a lo largo del tiempo. La unidad del SI es el **julio (J)**, pero en el uso eléctrico cotidiano se expresa con más frecuencia en **vatios hora (Wh)** o **kilovatios hora (kWh)**.

La fórmula básica es:

- **W = P x t** (Trabajo = Potencia x Tiempo)

Sustituir **P** por **U x I** da una forma que calcula **W** directamente a partir de **U**, **I** y **t**, sin necesidad de calcular antes **P**:

- **W = U x I x t**

### Unidades habituales de energía {/*#common-units-of-energy*/}

| Unidad        | Símbolo | Equivale a             |
| ------------- | ------- | ---------------------- |
| Julio         | J       | 1 W x 1 s              |
| Vatio hora    | Wh      | 3600 J                 |
| Kilovatio hora | kWh    | 1000 Wh = 3 600 000 J  |

:::info
El símbolo **W** se utiliza tanto para la unidad «vatio» (unidad de potencia) como para la magnitud «trabajo». El contexto suele aclarar el significado. Algunas fuentes emplean **E** para el «trabajo» con el fin de evitar confusiones.
:::

### Ejemplos {/*#examples-1*/}

**Ejemplo 1:** Una bombilla de 60 W funciona durante 5 horas. ¿Cuánta energía consume?

```text
W = P x t = 60 W x 5 h = 300 Wh = 0.3 kWh
```

**Ejemplo 2:** Un aparato consume 2 A a 230 V durante 30 minutos. ¿Cuánta energía utiliza?

```text
W = U x I x t = 230 V x 2 A x 0.5 h = 230 Wh
```

**Ejemplo 3:** Una factura de electricidad indica 250 kWh consumidos a 0,30 € por kWh. ¿Cuál es el coste total?

```text
Cost = 250 kWh x €0.30/kWh = €75.00
```
