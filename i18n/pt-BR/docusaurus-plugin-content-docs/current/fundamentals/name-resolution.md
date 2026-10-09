---
title: "Resolução de nomes"
description: "Por que a resolução de nomes é necessária e uma visão geral dos sistemas comuns para redes Windows e Linux: DNS, LLMNR, NetBIOS e mDNS."
keywords:
    - Resolução de nomes
    - DNS
    - LLMNR
    - NetBIOS
    - mDNS
    - Namensauflösung
tags:
    - ap2
machine_translated: true
---

# Resolução de nomes

Computadores em rede são identificados por endereços únicos (endereço IP, endereço MAC) e os usam para se comunicar. Como endereços numéricos são difíceis de memorizar, usam-se nomes. A **resolução de nomes** é o mecanismo que mapeia um nome (por exemplo o nome de um computador) para o seu endereço (por exemplo um endereço IP).

## Sistemas de resolução {/*#resolution-systems*/}

Existem vários sistemas para redes Windows e Linux:

| Sistema      | Abrangência                    | Observação                                                                                                                              |
| ----------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **DNS**     | Rede inteira / internet | Sistema mais importante, exigido pelo Active Directory. Porta UDP `53`, até 255 caracteres (por exemplo `pc01.bs1-landshut.de`)            |
| **LLMNR**   | Somente a mesma sub-rede         | Link Local Multicast Name Resolution (desde o Windows Vista), para grupos de trabalho. Usa multicast, é compatível com IPv6, não exige configuração |
| **NetBIOS** | Mesma sub-rede / legado     | Usado antes do Windows Vista para localizar computadores. Máx. de 15 caracteres, portas `137/138/139/445`                                          |
| **mDNS**    | LAN, link-local          | Multicast DNS (desenvolvido pela Apple), TLD `.local`, não exige servidor de nomes. A implementação no Linux é `avahi`                          |

## DNS {/*#dns*/}

O DNS (Domain Name System) é o principal sistema de resolução de nomes e a base da resolução de nomes na internet. Ele é tratado em detalhe em [DNS](./dns.md).

## LLMNR {/*#llmnr*/}

O LLMNR resolve nomes apenas dentro da mesma sub-rede e destina-se a pequenos grupos de trabalho. Usa multicast em vez de broadcasts (menos tráfego de rede) e, diferentemente do NetBIOS, é compatível com IPv6. Não consegue resolver nomes de sistemas mais antigos (por exemplo Windows Server 2003, Windows XP).

## NetBIOS {/*#netbios*/}

O NetBIOS (NetBIOS over TCP/IP, NetBT/NBT) foi relevante até o Windows 2000/Vista e era usado para navegar na rede em busca de computadores. É usado como alternativa quando o DNS não está configurado e o LLMNR está desativado ou não consegue resolver um nome.

## mDNS {/*#mdns*/}

O mDNS (Multicast DNS) permite a resolução de nomes em uma LAN sem um servidor de nomes dedicado, usando mensagens multicast sob o TLD link-local `.local`. A partir do Windows 11 22H2, a Microsoft pretende que o mDNS substitua tanto o NetBIOS quanto o LLMNR.
