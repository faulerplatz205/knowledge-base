---
title: "Frequência (Hz) e modulação por largura de pulso (PWM)"
description: "O que significa frequência em hertz e como a modulação por largura de pulso usa um ciclo de trabalho para aproximar níveis de saída analógicos com um sinal puramente digital, incluindo as fórmulas de período, frequência e ciclo de trabalho."
keywords:
    - Frequência
    - Hertz
    - Hz
    - Período
    - Modulação por largura de pulso
    - PWM
    - Ciclo de trabalho
    - GPIO
    - Dimerização
    - Controle de motores
tags:
    - ap2
machine_translated: true
---

# Frequência (Hz) e modulação por largura de pulso (PWM)

## Frequência (Hz) {/*#frequency-hz*/}

A **frequência** descreve quantas vezes por segundo um sinal periódico se repete. Sua unidade é o **hertz (Hz)**: 1 Hz equivale a um ciclo completo por segundo.

A frequência `f` e a duração de um ciclo, o **período** `T`, são inversas uma da outra:

```text
f = 1 / T        (frequency  = 1 / period)
T = 1 / f        (period     = 1 / frequency)
```

**Exemplo:** Um sinal se repete a cada 1 ms (0,001 s).

```text
f = 1 / 0.001 s = 1000 Hz = 1 kHz
```

## O problema que o PWM resolve {/*#the-problem-pwm-solves*/}

Uma saída GPIO digital só consegue fornecer dois estados: **HIGH** (por exemplo 3,3 V) ou **LOW** (0 V). Não existe valor intermediário. No entanto, muitas tarefas exigem algo intermediário, como dimerizar um LED, fazer um motor girar a meia velocidade ou acionar um [buzzer](./raspberry-pi.md) passivo.

A **modulação por largura de pulso (PWM)** resolve isso ao alternar a saída entre HIGH e LOW muito rapidamente. A proporção entre o tempo em HIGH e o ciclo total determina a potência *média* fornecida, que o dispositivo conectado percebe como um valor entre totalmente desligado e totalmente ligado.

## Ciclo de trabalho (duty cycle) {/*#duty-cycle*/}

O **ciclo de trabalho** (em alemão *Puls-Pause-Verhältnis*) é a parcela de um período durante a qual o sinal está em HIGH:

```text
Duty cycle = (t_on / T) x 100%

t_on = time HIGH within one period
T    = t_on + t_off (full period)
```

| Ciclo de trabalho | Sinal                       | Efeito (a 3,3 V)      |
| ---------- | ---------------------------- | ---------------------- |
| 0 %        | sempre LOW                   | totalmente desligado              |
| 25 %       | HIGH em 1/4 do tempo         | baixa potência              |
| 50 %       | HIGH em metade do tempo           | meia potência             |
| 75 %       | HIGH em 3/4 do tempo         | alta potência             |
| 100 %      | sempre HIGH                  | totalmente ligado               |

**Exemplo:** Um sinal fica em HIGH por 0,25 ms em um período de 1 ms.

```text
Duty cycle = (0.25 ms / 1 ms) x 100% = 25%
```

## Nível médio de saída {/*#average-output-level*/}

A tensão média percebida pelo dispositivo varia linearmente com o ciclo de trabalho:

```text
U_avg = duty cycle x U_max
```

**Exemplo:** Uma saída de 3,3 V operando com ciclo de trabalho de 50 %.

```text
U_avg = 0.5 x 3.3 V = 1.65 V
```

:::note
O PWM **não** reduz de fato a tensão: a saída continua alternando entre 0 V e o nível completo. O dispositivo apenas *se comporta* como se recebesse a média, porque a comutação é mais rápida do que ele consegue reagir.
:::

## Cálculo do tempo em HIGH {/*#calculating-the-high-time*/}

A combinação das fórmulas acima fornece o tempo em HIGH para uma frequência e um ciclo de trabalho escolhidos:

```text
T = 1 / f
t_on = duty cycle x T
```

**Exemplo:** Um sinal de 1 kHz com ciclo de trabalho de 25 %.

```text
T = 1 / 1000 Hz = 0.001 s = 1 ms
t_on = 0.25 x 1 ms = 0.25 ms
```

## Aplicações típicas {/*#typical-applications*/}

- **Dimerização de um LED:** um ciclo de trabalho maior significa um LED mais brilhante.
- **Velocidade de motores e ventoinhas:** em uma frequência relativamente alta, a saída alterna entre HIGH e LOW; a proporção define a potência e, portanto, a velocidade.
- **Tons em um [buzzer](./raspberry-pi.md) passivo:** a *frequência* do sinal PWM define a altura do tom.

## Veja também {/*#see-also*/}

- [Visão geral do Raspberry Pi](./raspberry-pi.md): como sensores e atuadores (como um buzzer passivo) são ligados
- [Conversor analógico-digital (ADC)](./analog-digital-converter.mdx): o sentido inverso, transformando um sinal analógico em um valor digital
- [Unidades elétricas](./electrical-units.md): fundamentos de tensão e potência
