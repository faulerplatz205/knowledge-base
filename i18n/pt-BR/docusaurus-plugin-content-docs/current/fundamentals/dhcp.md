---
title: "DHCP"
description: "Como o DHCP atribui automaticamente a configuração de IP aos clientes, incluindo o processo DORA, leases, escopos, opções, reservas, relay agents e failover."
keywords:
    - DHCP
    - Dynamic Host Configuration Protocol
    - DORA
    - Lease
    - Escopo
    - Relay Agent
    - Failover
    - DHCPv6
tags:
    - ap2
machine_translated: true
---

# DHCP (Dynamic Host Configuration Protocol)

O DHCP atribui automaticamente aos clientes um endereço IP, uma máscara de sub-rede e outros parâmetros de configuração dentro de uma rede local. Isso elimina a necessidade de configurar cada host manualmente. O DHCP usa as portas UDP `67` (servidor) e `68` (cliente).

## O processo DORA {/*#the-dora-process*/}

Um cliente obtém sua configuração em quatro etapas, lembradas como **DORA**:

1. **Discover** – O cliente envia um `DHCP Discover` por broadcast na rede local para encontrar um servidor.
2. **Offer** – Um servidor DHCP responde com um `DHCP Offer` contendo um endereço disponível e parâmetros de configuração.
3. **Request** – O cliente solicita o endereço oferecido com um `DHCP Request`.
4. **Acknowledge** – Se o endereço ainda estiver disponível, o servidor o confirma com um `DHCP Ack`.

## Conceitos principais {/*#key-concepts*/}

- **Lease** – Um endereço é concedido por tempo limitado (o lease). Isso evita que os endereços permaneçam presos a um cliente para sempre e permite sua reutilização.
- **Escopo** – A faixa de endereços IP que um servidor pode conceder (incluindo a máscara de sub-rede).
- **Opções** – Parâmetros adicionais distribuídos junto com o endereço, por exemplo gateway padrão, servidor DNS, máscara de sub-rede.
- **Reserva** – Um endereço IP fixo permanentemente vinculado a um endereço MAC específico, de modo que um cliente sempre recebe o mesmo endereço.

## Relay Agent {/*#relay-agent*/}

Como os roteadores não encaminham broadcasts, um servidor DHCP normalmente atende apenas a sua própria sub-rede. Um **DHCP relay agent** encaminha as requisições DHCP de outra sub-rede ao servidor DHCP (como unicast), permitindo que um servidor atenda várias sub-redes.

## Failover {/*#failover*/}

Para alta disponibilidade, dois servidores DHCP podem compartilhar os mesmos escopos e replicar suas informações de lease. Existem dois modos:

- **Balanceamento de carga** – Ambos os servidores concedem endereços simultaneamente (proporção padrão de 50/50, ajustável).
- **Hot standby** – Um servidor primário concede todos os endereços; um servidor secundário só assume se o primário falhar.

O failover suporta no máximo dois servidores e funciona apenas para escopos IPv4.

## DHCPv6 vs. SLAAC {/*#dhcpv6-vs-slaac*/}

Para IPv6, a configuração de endereços não exige estritamente o DHCP:

- **SLAAC** (Stateless Address Autoconfiguration) – O host constrói seu próprio endereço a partir de um prefixo global anunciado pelo roteador (Router Advertisement). Nenhum servidor central está envolvido.
- **DHCPv6** (stateful) – Um servidor DHCPv6 atribui e acompanha toda a configuração de forma centralizada, de modo semelhante ao IPv4. O roteador continua enviando Router Advertisements com o flag `managed` para que o host saiba que deve usar o DHCPv6.

## Comandos úteis (cliente) {/*#useful-commands-client*/}

| Comando             | Finalidade                                                         |
| ------------------- | --------------------------------------------------------------- |
| `ipconfig /all`     | Exibe a configuração de IP completa (adaptador, MAC, IP, DNS, gateway) |
| `ipconfig /release` | Libera o endereço atual (lease)                             |
| `ipconfig /renew`   | Solicita um novo lease ao servidor DHCP                        |
