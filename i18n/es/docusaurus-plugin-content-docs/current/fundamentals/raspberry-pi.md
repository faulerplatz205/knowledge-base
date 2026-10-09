---
title: "Visión general de Raspberry Pi"
description: "Una visión práctica de Raspberry Pi: sus pines GPIO, la diferencia entre sensores y actuadores, cómo funciona una placa de pruebas (breadboard) y qué significan las conexiones de componentes habituales como un LED, un sensor de temperatura y un zumbador."
keywords:
    - Raspberry Pi
    - GPIO
    - Sensor
    - Actuador
    - Breadboard
    - LED
    - Sensor de temperatura
    - Zumbador
    - Cableado
    - VCC
    - VDD
    - GND
    - SDA
    - SCL
    - I2C
tags:
    - ap2
machine_translated: true
---

# Visión general de Raspberry Pi

## Qué es una Raspberry Pi {/*#what-is-a-raspberry-pi*/}

La Raspberry Pi es un pequeño ordenador de placa única. Además de los puertos habituales (USB, HDMI, red), incorpora una fila de **pines GPIO** que permiten conectar componentes electrónicos directamente, lo que la convierte en una plataforma popular para proyectos de hardware.

## Pines GPIO {/*#gpio-pins*/}

**GPIO** significa *General-Purpose Input/Output* (entrada/salida de propósito general). El conector de pines combina varios tipos de pines:

- **Pines de alimentación:** salidas fijas de **3,3 V** y **5 V** para alimentar componentes.
- **Pines de tierra (GND):** la referencia común y la vía de retorno de la corriente.
- **Pines de E/S:** pines programables libremente que pueden leerse (**entrada**) o establecerse (**salida**).

Un pin de E/S GPIO es puramente **digital**: solo conoce **HIGH** (3,3 V) y **LOW** (0 V). No puede medir directamente una tensión analógica, por lo que un sensor analógico necesita un [conversor analógico-digital (ADC)](./analog-digital-converter.mdx) intermedio. A la inversa, una salida de tipo analógico se aproxima mediante [modulación por ancho de pulso (PWM)](./pulse-width-modulation.md).

## Sensores frente a actuadores {/*#sensors-vs-actuators*/}

Los componentes se dividen en dos funciones opuestas:

- Un **sensor** es un componente que convierte una magnitud física del entorno (temperatura, humedad, presión, aceleración, etc.) en una **señal eléctrica**.
- Un **actuador** es la contrapartida de un sensor y hace exactamente lo contrario: convierte una **señal eléctrica** en una magnitud física como movimiento, presión, sonido o luz.

| Función  | Dirección                        | Ejemplos                                  |
| -------- | -------------------------------- | ----------------------------------------- |
| Sensor   | entorno => señal eléctrica       | sensor de temperatura, sensor de luz      |
| Actuador | señal eléctrica => entorno       | motor, lámpara/LED, altavoz, zumbador     |

## La placa de pruebas (breadboard) {/*#the-breadboard*/}

Una **breadboard** permite conectar componentes sin soldar: los cables y las patillas de los componentes simplemente se insertan en sus orificios. Los orificios que pertenecen a la misma tira interna están conectados eléctricamente:

- Los dos largos **carriles de alimentación** a lo largo de los bordes (marcados `+` y `-`) recorren toda la placa. Suelen alimentarse una sola vez desde un pin de 3,3 V / 5 V y un pin GND, de modo que la alimentación y la tierra están disponibles en todas partes.
- Las **tiras de terminales** interiores conectan entre sí los orificios de cada columna corta, divididas por un hueco en el centro de la placa.

Los componentes insertados en la misma tira conectada comparten una conexión eléctrica, que es como se construye un circuito.

## Conexión de componentes {/*#connecting-components*/}

La mayoría de los componentes exponen unas pocas conexiones claramente definidas. Las tres más habituales son la **alimentación (VCC / `+`)**, la **tierra (GND / `-`)** y una línea de **señal**.

| Componente            | Función  | Conexiones                     | Explicación adicional                                        |
| --------------------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| LED / lámpara         | actuador | ánodo (`+`), cátodo (`-`)      | la patilla más larga es `+`, la más corta es `-`             |
| Sensor de temperatura | sensor   | VCC (`+`), GND (`-`), señal    | la señal lleva el valor medido a un pin GPIO                 |
| Zumbador              | actuador | `+` (señal), `-` (GND)         | la señal conmuta o controla el sonido                        |

### Etiquetas de pin habituales {/*#common-pin-labels*/}

Los módulos de sensores y las placas de conexión rara vez escriben sus conexiones completas; en su lugar imprimen abreviaturas breves y estandarizadas junto a cada pin:

- **VDD / VDC / VCC (`+`):** la tensión de alimentación positiva (entrada de alimentación). `VDD` y `VCC` proceden del diseño de chips, `VDC` significa simplemente «voltios DC»; en la práctica las tres marcan el pin de alimentación (p. ej. 3,3 V o 5 V).
- **GND / VSS (`-`):** tierra, la referencia común y la vía de retorno de la corriente.
- **SDA:** la línea de **datos** del bus **I2C**, por la que un sensor intercambia valores con la Pi.
- **SCL:** la línea de **reloj** del bus **I2C**, que mantiene sincronizados ambos lados.

**I2C** es un bus de dos hilos (SDA + SCL) que permite que varios sensores digitales compartan los mismos dos pines GPIO, direccionándose cada uno individualmente. Un sensor I2C no necesita un [ADC](./analog-digital-converter.mdx); la conversión a valores digitales ya se realiza dentro del módulo.

### LED / lámpara {/*#led--lamp*/}

Un LED tiene dos patillas con polaridad fija:

- **Ánodo (`+`):** la patilla **más larga**, conectada hacia el GPIO o el lado positivo.
- **Cátodo (`-`):** la patilla **más corta** (también marcada por el borde plano de la montura), conectada a GND.

Un LED debe accionarse siempre a través de una **resistencia en serie** que limite la corriente; sin ella, el LED consume demasiada corriente y se quema.

### Sensor de temperatura {/*#temperature-sensor*/}

Un módulo de sensor típico tiene tres pines:

- **VCC (`+`):** alimentación, p. ej. 3,3 V.
- **GND (`-`):** tierra.
- **Señal:** la salida que transporta la medición.

Si la señal es **analógica** (una tensión proporcional a la temperatura), no puede entrar directamente en un pin GPIO; antes se necesita un [ADC](./analog-digital-converter.mdx).

### Zumbador {/*#buzzer*/}

Un zumbador tiene solo dos conexiones, `+` (señal) y `-` (GND), y existe en dos variantes:

- **Zumbador activo:** contiene su propio oscilador y solo necesita una señal HIGH / LOW para activar y desactivar el sonido. Reproduce un único tono fijo.
- **Zumbador pasivo:** no tiene oscilador y puede reproducir distintos tonos, pero necesita una señal variable. El tono lo determina la frecuencia de una señal [PWM](./pulse-width-modulation.md).

## Véase también {/*#see-also*/}

- [Conversor analógico-digital (ADC)](./analog-digital-converter.mdx): lectura de un sensor analógico en una Pi exclusivamente digital
- [Frecuencia (Hz) y modulación por ancho de pulso (PWM)](./pulse-width-modulation.md): aproximación de una salida analógica y control de un zumbador pasivo
- [Unidades eléctricas](./electrical-units.md): la tensión, la corriente y la resistencia presentes en cada conexión
