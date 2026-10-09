---
title: "Visão geral do Raspberry Pi"
description: "Uma visão geral prática do Raspberry Pi: seus pinos GPIO, a diferença entre sensores e atuadores, como funciona uma protoboard e o que significam as conexões de componentes comuns, como um LED, um sensor de temperatura e um buzzer."
keywords:
    - Raspberry Pi
    - GPIO
    - Sensor
    - Atuador
    - Protoboard
    - LED
    - Sensor de temperatura
    - Buzzer
    - Ligação elétrica
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

# Visão geral do Raspberry Pi

## O que é um Raspberry Pi {/*#what-is-a-raspberry-pi*/}

O Raspberry Pi é um pequeno computador de placa única. Além das portas usuais (USB, HDMI, rede), ele possui uma fileira de **pinos GPIO** que permite conectar componentes eletrônicos diretamente, o que o torna uma plataforma popular para projetos de hardware.

## Pinos GPIO {/*#gpio-pins*/}

**GPIO** significa *General-Purpose Input/Output* (entrada/saída de uso geral). O conector de pinos reúne vários tipos de pinos:

- **Pinos de alimentação:** saídas fixas de **3,3 V** e **5 V** para alimentar componentes.
- **Pinos de terra (GND):** a referência comum / caminho de retorno da corrente.
- **Pinos de E/S:** pinos livremente programáveis que podem ser lidos (**entrada**) ou definidos (**saída**).

Um pino de E/S GPIO é puramente **digital**: conhece apenas **HIGH** (3,3 V) e **LOW** (0 V). Ele não consegue medir diretamente uma tensão analógica, portanto um sensor analógico precisa de um [conversor analógico-digital (ADC)](./analog-digital-converter.mdx) no meio do caminho. Inversamente, uma saída de tipo analógico é aproximada com [modulação por largura de pulso (PWM)](./pulse-width-modulation.md).

## Sensores vs. atuadores {/*#sensors-vs-actuators*/}

Os componentes se dividem em dois papéis opostos:

- Um **sensor** é um componente que converte uma grandeza física do ambiente (temperatura, umidade, pressão, aceleração etc.) em um **sinal elétrico**.
- Um **atuador** é a contrapartida de um sensor e faz exatamente o oposto: converte um **sinal elétrico** em uma grandeza física, como movimento, pressão, som ou luz.

| Papel     | Direção                        | Exemplos                             |
| -------- | -------------------------------- | ------------------------------------ |
| Sensor   | ambiente => sinal elétrico | sensor de temperatura, sensor de luz     |
| Atuador | sinal elétrico => ambiente | motor, lâmpada/LED, alto-falante, buzzer |

## A protoboard {/*#the-breadboard*/}

Uma **protoboard** permite conectar componentes sem solda: fios e terminais de componentes são simplesmente inseridos em seus furos. Furos que pertencem à mesma trilha interna estão eletricamente conectados:

- As duas longas **trilhas de alimentação** nas bordas (marcadas como `+` e `-`) percorrem todo o comprimento da placa. Normalmente são alimentadas uma única vez por um pino de 3,3 V / 5 V e um pino GND, de modo que alimentação e terra ficam disponíveis em toda a placa.
- As **trilhas de terminais** internas conectam entre si os furos de cada coluna curta, divididas por um vão no meio da placa.

Componentes inseridos na mesma trilha conectada compartilham uma ligação elétrica, e é assim que um circuito é montado.

## Conexão de componentes {/*#connecting-components*/}

A maioria dos componentes expõe algumas conexões claramente definidas. As três mais comuns são **alimentação (VCC / `+`)**, **terra (GND / `-`)** e uma linha de **sinal**.

| Componente          | Papel     | Conexões                  | Explicação adicional                             |
| ------------------ | -------- | ---------------------------- | ----------------------------------------------- |
| LED / lâmpada         | atuador | ânodo (`+`), cátodo (`-`)   | a perna mais longa é `+`, a mais curta é `-`           |
| Sensor de temperatura | sensor   | VCC (`+`), GND (`-`), sinal | o sinal leva o valor medido a um pino GPIO |
| Buzzer             | atuador | `+` (sinal), `-` (GND)      | o sinal liga ou aciona o som         |

### Rótulos de pinos comuns {/*#common-pin-labels*/}

Módulos de sensores e placas de expansão raramente escrevem suas conexões por extenso; em vez disso, imprimem abreviações curtas e padronizadas ao lado de cada pino:

- **VDD / VDC / VCC (`+`):** a tensão de alimentação positiva (entrada de energia). `VDD` e `VCC` vêm do projeto de chips, `VDC` significa apenas "volts DC"; na prática, os três marcam o pino de alimentação (por exemplo 3,3 V ou 5 V).
- **GND / VSS (`-`):** terra, a referência comum e caminho de retorno da corrente.
- **SDA:** a linha de **dados** do barramento **I2C**, pela qual um sensor troca valores com o Pi.
- **SCL:** a linha de **clock** do barramento **I2C**, que mantém ambos os lados sincronizados.

O **I2C** é um barramento de dois fios (SDA + SCL) que permite que vários sensores digitais compartilhem os mesmos dois pinos GPIO, cada um endereçado individualmente. Um sensor I2C não precisa de [ADC](./analog-digital-converter.mdx), pois a conversão para valores digitais já ocorre dentro do módulo.

### LED / lâmpada {/*#led--lamp*/}

Um LED tem duas pernas com polaridade fixa:

- **Ânodo (`+`):** a perna **mais longa**, conectada ao lado do GPIO / positivo.
- **Cátodo (`-`):** a perna **mais curta** (também marcada pelo lado achatado da borda), conectada ao GND.

Um LED deve sempre ser acionado por meio de um **resistor em série** para limitar a corrente — sem ele, o LED consome corrente demais e queima.

### Sensor de temperatura {/*#temperature-sensor*/}

Um módulo de sensor típico tem três pinos:

- **VCC (`+`):** alimentação, por exemplo 3,3 V.
- **GND (`-`):** terra.
- **Sinal:** a saída que leva a medição.

Se o sinal for **analógico** (uma tensão proporcional à temperatura), ele não pode ir diretamente a um pino GPIO; primeiro é necessário um [ADC](./analog-digital-converter.mdx).

### Buzzer {/*#buzzer*/}

Um buzzer tem apenas duas conexões, `+` (sinal) e `-` (GND), e existe em duas variantes:

- **Buzzer ativo:** contém seu próprio oscilador e só precisa de um sinal HIGH / LOW para ligar e desligar o som. Reproduz um único tom fixo.
- **Buzzer passivo:** não tem oscilador e pode reproduzir tons diferentes, mas precisa de um sinal variável. A altura do tom é definida pela frequência de um sinal [PWM](./pulse-width-modulation.md).

## Veja também {/*#see-also*/}

- [Conversor analógico-digital (ADC)](./analog-digital-converter.mdx): leitura de um sensor analógico em um Pi exclusivamente digital
- [Frequência (Hz) e modulação por largura de pulso (PWM)](./pulse-width-modulation.md): aproximação de saída analógica e acionamento de um buzzer passivo
- [Unidades elétricas](./electrical-units.md): a tensão, a corrente e a resistência por trás de cada conexão
