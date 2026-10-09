---
title: "Unidades elétricas – potência, tensão, corrente e energia"
description: "A relação entre potência (P), tensão (U), corrente (I), resistência (R) e trabalho/energia elétrica (W). Incluindo o triângulo de potência, a lei de Ohm e quilowatts-hora."
keywords:
    - Unidades elétricas
    - Potência
    - Tensão
    - Corrente
    - Watt
    - Volt
    - Ampère
    - Lei de Ohm
    - Triângulo de potência
    - Trabalho elétrico
    - Energia
    - Joule
    - Quilowatt-hora
    - kWh
machine_translated: true
---

# Unidades elétricas – potência, tensão, corrente e energia

## As três unidades fundamentais {/*#the-three-core-units*/}

| Símbolo | Grandeza | Unidade       |
| ------ | -------- | ---------- |
| P      | Potência    | Watt (W)   |
| U      | Tensão  | Volt (V)   |
| I      | Corrente  | Ampère (A) |

## O triângulo de potência {/*#the-power-triangle*/}

As três grandezas se relacionam pela fórmula **P = U x I**. Cobrir a grandeza que se deseja calcular revela a fórmula:

```text
      P
    -----
    U | I
```

- **P = U x I** (Potência = Tensão x Corrente)
- **U = P / I** (Tensão = Potência / Corrente)
- **I = P / U** (Corrente = Potência / Tensão)

## Lei de Ohm {/*#ohms-law*/}

A lei de Ohm introduz a resistência **R** (medida em ohms, Ω) e a relaciona com a tensão e a corrente.

A mesma abordagem do triângulo se aplica aqui:

```text
      U
    -----
    R | I
```

- **U = R x I** (Tensão = Resistência x Corrente)
- **R = U / I** (Resistência = Tensão / Corrente)
- **I = U / R** (Corrente = Tensão / Resistência)

## Fórmulas combinadas {/*#combined-formulas*/}

Combinar a fórmula de potência com a lei de Ohm fornece outras formas de calcular a potência:

- **P = U² / R**
- **P = I² x R**

## Exemplos {/*#examples*/}

**Exemplo 1:** Um aparelho funciona a 230 V e consome 2 A. Qual é seu consumo de potência (P)?

```text
P = U x I = 230 V x 2 A = 460 W
```

**Exemplo 2:** Uma lâmpada de 100 W opera a 230 V. Quanta corrente (I) ela consome?

```text
I = P / U = 100 W / 230 V ≈ 0.43 A
```

**Exemplo 3:** Um resistor de 50 Ω é percorrido por 3 A. Qual tensão cai sobre ele?

```text
U = R x I = 50 Ω x 3 A = 150 V
```

## Trabalho elétrico (energia) {/*#electrical-work-energy*/}

O trabalho elétrico **W** (frequentemente chamado de energia, às vezes escrito como **E**) é a quantidade de energia que um aparelho consome ou produz ao longo do tempo. A unidade do SI é o **joule (J)**, mas no uso elétrico cotidiano é mais comum expressá-lo em **watts-hora (Wh)** ou **quilowatts-hora (kWh)**.

A fórmula básica é:

- **W = P x t** (Trabalho = Potência x Tempo)

Substituir **P** por **U x I** resulta em uma forma que calcula **W** diretamente a partir de **U**, **I** e **t**, sem precisar calcular **P** antes:

- **W = U x I x t**

### Unidades comuns de energia {/*#common-units-of-energy*/}

| Unidade          | Símbolo | Equivale a                 |
| ------------- | ------ | ---------------------- |
| Joule         | J      | 1 W x 1 s              |
| Watt-hora     | Wh     | 3.600 J                |
| Quilowatt-hora | kWh    | 1.000 Wh = 3.600.000 J |

:::info
O símbolo **W** é usado tanto para a unidade "watt" (unidade de potência) quanto para a grandeza "trabalho". O contexto geralmente deixa o significado claro. Algumas fontes usam **E** para "trabalho" a fim de evitar confusão.
:::

### Exemplos {/*#examples-1*/}

**Exemplo 1:** Uma lâmpada de 60 W funciona por 5 horas. Quanta energia ela consome?

```text
W = P x t = 60 W x 5 h = 300 Wh = 0.3 kWh
```

**Exemplo 2:** Um aparelho consome 2 A a 230 V durante 30 minutos. Quanta energia ele usa?

```text
W = U x I x t = 230 V x 2 A x 0.5 h = 230 Wh
```

**Exemplo 3:** Uma conta de luz mostra 250 kWh consumidos a € 0,30 por kWh. Qual é o custo total?

```text
Cost = 250 kWh x €0.30/kWh = €75.00
```
