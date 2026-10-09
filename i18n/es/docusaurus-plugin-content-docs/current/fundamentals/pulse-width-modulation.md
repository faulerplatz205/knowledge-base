---
title: "Frecuencia (Hz) y modulación por ancho de pulso (PWM)"
description: "Qué significa la frecuencia en hercios y cómo la modulación por ancho de pulso utiliza un ciclo de trabajo para aproximar niveles de salida analógicos con una señal puramente digital, incluidas las fórmulas de período, frecuencia y ciclo de trabajo."
keywords:
    - Frecuencia
    - Hercio
    - Hz
    - Período
    - Modulación por ancho de pulso
    - PWM
    - Ciclo de trabajo
    - GPIO
    - Regulación de intensidad
    - Control de motores
tags:
    - ap2
machine_translated: true
---

# Frecuencia (Hz) y modulación por ancho de pulso (PWM)

## Frecuencia (Hz) {/*#frequency-hz*/}

La **frecuencia** describe cuántas veces por segundo se repite una señal periódica. Su unidad es el **hercio (Hz)**: 1 Hz equivale a un ciclo completo por segundo.

La frecuencia `f` y la duración de un ciclo, el **período** `T`, son inversos entre sí:

```text
f = 1 / T        (frequency  = 1 / period)
T = 1 / f        (period     = 1 / frequency)
```

**Ejemplo:** Una señal se repite cada 1 ms (0,001 s).

```text
f = 1 / 0.001 s = 1000 Hz = 1 kHz
```

## El problema que resuelve PWM {/*#the-problem-pwm-solves*/}

Una salida GPIO digital solo puede suministrar dos estados: **HIGH** (por ejemplo 3,3 V) o **LOW** (0 V). No existe ningún valor intermedio. Sin embargo, muchas tareas necesitan algo intermedio, como regular la intensidad de un LED, hacer funcionar un motor a media velocidad o accionar un [zumbador](./raspberry-pi.md) pasivo.

La **modulación por ancho de pulso (PWM)** lo resuelve conmutando la salida entre HIGH y LOW muy rápidamente. La proporción entre el tiempo en HIGH y el ciclo total determina la potencia *media* suministrada, que el dispositivo conectado percibe como un valor entre totalmente apagado y totalmente encendido.

## Ciclo de trabajo {/*#duty-cycle*/}

El **ciclo de trabajo** (en alemán *Puls-Pause-Verhältnis*) es la parte de un período durante la cual la señal está en HIGH:

```text
Duty cycle = (t_on / T) x 100%

t_on = time HIGH within one period
T    = t_on + t_off (full period)
```

| Ciclo de trabajo | Señal                        | Efecto (a 3,3 V)       |
| ---------------- | ---------------------------- | ---------------------- |
| 0 %              | siempre LOW                  | totalmente apagado     |
| 25 %             | HIGH 1/4 del tiempo          | potencia baja          |
| 50 %             | HIGH la mitad del tiempo     | media potencia         |
| 75 %             | HIGH 3/4 del tiempo          | potencia alta          |
| 100 %            | siempre HIGH                 | totalmente encendido   |

**Ejemplo:** Una señal está en HIGH durante 0,25 ms dentro de un período de 1 ms.

```text
Duty cycle = (0.25 ms / 1 ms) x 100% = 25%
```

## Nivel medio de salida {/*#average-output-level*/}

La tensión media que percibe el dispositivo escala linealmente con el ciclo de trabajo:

```text
U_avg = duty cycle x U_max
```

**Ejemplo:** Una salida de 3,3 V con un ciclo de trabajo del 50 %.

```text
U_avg = 0.5 x 3.3 V = 1.65 V
```

:::note
PWM **no** reduce realmente la tensión: la salida sigue alternando entre 0 V y el nivel completo. El dispositivo solo *se comporta* como si recibiera el valor medio, porque la conmutación es más rápida de lo que puede reaccionar.
:::

## Cálculo del tiempo en HIGH {/*#calculating-the-high-time*/}

La combinación de las fórmulas anteriores proporciona el tiempo en HIGH para una frecuencia y un ciclo de trabajo elegidos:

```text
T = 1 / f
t_on = duty cycle x T
```

**Ejemplo:** Una señal de 1 kHz con un ciclo de trabajo del 25 %.

```text
T = 1 / 1000 Hz = 0.001 s = 1 ms
t_on = 0.25 x 1 ms = 0.25 ms
```

## Aplicaciones típicas {/*#typical-applications*/}

- **Regulación de la intensidad de un LED:** un ciclo de trabajo mayor significa un LED más brillante.
- **Velocidad de motores y ventiladores:** a una frecuencia relativamente alta la salida alterna entre HIGH y LOW; la proporción determina la potencia y, con ella, la velocidad.
- **Tonos en un [zumbador](./raspberry-pi.md) pasivo:** la *frecuencia* de la señal PWM determina el tono del sonido.

## Véase también {/*#see-also*/}

- [Visión general de Raspberry Pi](./raspberry-pi.md): cómo se conectan sensores y actuadores (como un zumbador pasivo)
- [Conversor analógico-digital (ADC)](./analog-digital-converter.mdx): la dirección inversa, que convierte una señal analógica en un valor digital
- [Unidades eléctricas](./electrical-units.md): fundamentos de tensión y potencia
