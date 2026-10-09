---
title: "Modelo OSI"
description: "O modelo de referência OSI de 7 camadas: uma visão geral do papel, das responsabilidades e dos protocolos comuns de cada camada."
keywords:
    - Modelo OSI
    - Camada OSI
    - Camada física
    - Camada de enlace de dados
    - Camada de rede
    - Camada de transporte
    - Camada de sessão
    - Camada de apresentação
    - Camada de aplicação
    - Redes
tags:
    - ap2
machine_translated: true
---

# Modelo OSI

## Visão geral {/*#overview*/}

O modelo OSI (Open Systems Interconnection) é uma estrutura conceitual que padroniza como diferentes sistemas de rede se comunicam entre si. Ele divide a comunicação em **7 camadas**, cada uma com um papel específico. O modelo é neutro em relação a fornecedores e serve como referência para entender como os protocolos interagem.

## As 7 camadas {/*#the-7-layers*/}

| #   | Nome         | Responsabilidade principal                      |
| --- | ------------ | --------------------------------------- |
| 7   | Aplicação (Application)  | Protocolos e serviços voltados ao usuário      |
| 6   | Apresentação (Presentation) | Formatação, codificação e criptografia de dados   |
| 5   | Sessão (Session)      | Gerenciamento de sessões entre aplicações |
| 4   | Transporte (Transport)    | Entrega de ponta a ponta entre processos   |
| 3   | Rede (Network)      | Endereçamento lógico e roteamento          |
| 2   | Enlace de dados (Data Link)    | Entrega de quadros dentro de uma rede local   |
| 1   | Física (Physical)     | Transmissão de bits brutos por um meio      |

## Detalhes das camadas {/*#layer-details*/}

### Camada 1 – Física {/*#layer-1--physical*/}

Transmite bits brutos por um meio físico (cabos, rádio, fibra). Define níveis de tensão, disposição de pinos e temporização de bits. Não tem conceito de endereçamento.

**Exemplos:** cabos Ethernet, sinais de rádio Wi-Fi, fibra óptica, hubs, repetidores

### Camada 2 – Enlace de dados {/*#layer-2--data-link*/}

Empacota bits em **quadros (frames)** e cuida da entrega dentro de um único segmento de rede usando **endereços MAC**. Também detecta erros de transmissão por meio de CRC.

**Subcamadas:** LLC (Logical Link Control) e MAC (Media Access Control)

**Exemplos:** Ethernet, Wi-Fi (802.11), ARP, switches

### Camada 3 – Rede {/*#layer-3--network*/}

Trata do **endereçamento lógico** (IP) e do roteamento de pacotes entre várias redes. Determina o melhor caminho da origem ao destino.

**Exemplos:** IP (IPv4, IPv6), ICMP, roteadores

### Camada 4 – Transporte {/*#layer-4--transport*/}

Fornece **comunicação de ponta a ponta** entre processos. Gerencia segmentação, remontagem, controle de fluxo e recuperação de erros.

- **TCP**: orientado a conexão, confiável, entrega ordenada
- **UDP**: sem conexão, mais rápido, sem garantia de entrega

**Exemplos:** TCP, UDP, números de porta

### Camada 5 – Sessão {/*#layer-5--session*/}

Estabelece, gerencia e encerra **sessões** (conexões lógicas) entre aplicações. Oferece suporte a sincronização e checkpoints em transferências longas de dados.

**Exemplos:** NetBIOS, RPC, tokens de sessão

### Camada 6 – Apresentação {/*#layer-6--presentation*/}

Traduz dados entre o formato da aplicação e o da rede. Trata de codificação, serialização, compressão e criptografia.

**Exemplos:** TLS/SSL (criptografia), JSON, XML, JPEG, MPEG

### Camada 7 – Aplicação {/*#layer-7--application*/}

A camada mais próxima do usuário. Fornece serviços de rede diretamente às aplicações. Não se refere às aplicações em si, mas aos protocolos que elas usam.

**Exemplos:** HTTP, HTTPS, FTP, SMTP, DNS, SSH

## Mnemônico {/*#mnemonic*/}

Para lembrar as camadas de baixo (1) para cima (7), vale a ordem em inglês:

> **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

**P**hysical, **D**ata Link, **N**etwork, **T**ransport, **S**ession, **P**resentation, **A**pplication
