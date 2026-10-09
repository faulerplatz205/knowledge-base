---
title: "ARP (Address Resolution Protocol)"
description: "Como o ARP resolve endereços IP em endereços MAC dentro de uma rede local, incluindo entrega local vs. remota, o processo de requisição/resposta e o cache ARP."
keywords:
    - ARP
    - Address Resolution Protocol
    - Endereço MAC
    - Endereço IP
    - Redes
    - Camada 2
    - Camada 3
    - Gateway Padrão
tags:
    - ap2
machine_translated: true
---

# ARP (Address Resolution Protocol)

## Visão Geral {/*#overview*/}

O ARP (Address Resolution Protocol) opera na fronteira entre a Camada 2 (Enlace de Dados) e a Camada 3 (Rede) do [modelo OSI](./osi-model.md). Ele resolve um **endereço IP** conhecido no **endereço MAC** correspondente, necessário para entregar um quadro dentro de um segmento de rede local.

## Dois Tipos de Endereços {/*#two-types-of-addresses*/}

Todo dispositivo em uma LAN Ethernet é alcançado por meio de dois endereços diferentes:

- **Endereço MAC**: Usado para a comunicação entre placas de interface de rede dentro do mesmo segmento de rede. É o endereçamento do quadro Ethernet da Camada 2.
- **Endereço IP**: Usado para enviar o pacote da origem original até o destino final, independentemente de quantas redes existam no caminho. É o endereçamento do pacote IP da Camada 3.

O quadro Ethernet é encapsulado em torno do pacote IP. Enquanto o pacote IP viaja de ponta a ponta, o quadro Ethernet que o envolve existe sempre em um único segmento de rede.

## Por que o ARP é Necessário {/*#why-arp-is-needed*/}

Os pacotes IP contêm endereços IP de origem e de destino, mas os quadros Ethernet usam endereços MAC para a entrega no segmento local. Quando um dispositivo quer enviar dados, ele conhece o endereço IP de destino, mas precisa primeiro descobrir o endereço MAC ao qual o quadro deve ser endereçado.

## Entrega Local vs. Remota {/*#local-vs-remote-delivery*/}

O dispositivo remetente determina primeiro se o destino está na **mesma rede**, aplicando sua máscara de sub-rede (um AND lógico entre o próprio IP e o IP de destino contra a máscara). O resultado decide qual endereço MAC o quadro precisa:

- **Mesma rede** – O endereço MAC de destino é o endereço MAC do próprio host de destino. O dispositivo resolve o IP de destino via ARP.
- **Rede diferente** – O endereço MAC de destino é o endereço MAC do **gateway padrão** (a interface de rede do roteador). O dispositivo resolve o IP do gateway via ARP.

Nos dois casos, os **endereços IP de origem e de destino no pacote nunca mudam**. Somente os endereços MAC no quadro são reescritos: cada roteador ao longo do caminho descarta o quadro recebido e constrói um novo com os endereços MAC de origem e de destino do próximo salto.

## Consulta à Tabela ARP {/*#arp-table-lookup*/}

Antes de enviar, o dispositivo procura em sua tabela ARP (mantida na RAM) o IP que precisa resolver:

- Se o IP de destino estiver na **mesma rede**, procura-se o **endereço IP de destino**.
- Se o IP de destino estiver em uma **rede diferente**, procura-se o **endereço IP do gateway padrão**.

Se existir uma entrada correspondente, o endereço MAC armazenado em cache é usado para construir o quadro. Se não existir nenhuma entrada, o dispositivo envia uma **requisição ARP**.

## Processo de Requisição / Resposta ARP {/*#arp-request--reply-process*/}

1. **Verificar o cache ARP** – Se o endereço MAC do IP necessário já estiver em cache, nenhuma requisição é necessária
2. **Requisição ARP (broadcast)** – Se não estiver em cache, o remetente envia por broadcast uma requisição ARP a todos os dispositivos do segmento: *"Quem tem o IP X.X.X.X? Informe ao IP Y.Y.Y.Y"*. O endereço MAC de destino desse quadro de broadcast é `FF:FF:FF:FF:FF:FF`
3. **Resposta ARP (unicast)** – O dispositivo com o IP correspondente responde diretamente ao remetente com seu endereço MAC; todos os demais dispositivos ignoram a requisição
4. **Atualização do cache** – O remetente armazena o mapeamento IP para MAC em seu cache ARP para uso futuro
5. **Envio do quadro** – O remetente constrói agora o quadro Ethernet com o endereço MAC resolvido

## Cache ARP {/*#arp-cache*/}

O cache ARP armazena mapeamentos recentes de IP para MAC para evitar broadcasts repetidos.

- As entradas têm um TTL (Time to Live) e expiram automaticamente
- Comandos comuns (Windows/Linux):

| Comando  | Finalidade                     |
| -------- | ------------------------------ |
| `arp -a` | Exibir a tabela ARP            |
| `arp -d` | Excluir entradas da tabela ARP |

## Segurança: ARP Spoofing {/*#security-arp-spoofing*/}

Como o ARP não possui mecanismo de autenticação, um invasor pode enviar respostas ARP falsas para envenenar o cache de outros dispositivos e redirecionar o tráfego pela máquina do invasor (ataque Man-in-the-Middle).

As contramedidas incluem:

- **Dynamic ARP Inspection (DAI)** em switches gerenciáveis
- **Entradas ARP estáticas** para dispositivos críticos
- Monitoramento de rede e detecção de anomalias
