---
title: "Resolución de nombres"
description: "Por qué es necesaria la resolución de nombres y visión general de los sistemas habituales en redes Windows y Linux: DNS, LLMNR, NetBIOS y mDNS."
keywords:
    - Resolución de nombres
    - DNS
    - LLMNR
    - NetBIOS
    - mDNS
    - Namensauflösung
tags:
    - ap2
machine_translated: true
---

# Resolución de nombres

Los equipos en red se identifican mediante direcciones únicas (dirección IP, dirección MAC) y las utilizan para comunicarse. Como a las personas les resulta difícil recordar las direcciones numéricas, se emplean nombres en su lugar. La **resolución de nombres** es el mecanismo que asigna un nombre (p. ej. el nombre de un equipo) a su dirección (p. ej. una dirección IP).

## Sistemas de resolución {/*#resolution-systems*/}

Existen varios sistemas para redes Windows y Linux:

| Sistema     | Ámbito                     | Nota                                                                                                                                              |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DNS**     | Toda la red / Internet     | Sistema más importante, requerido por Active Directory. Puerto UDP `53`, hasta 255 caracteres (p. ej. `pc01.bs1-landshut.de`)                                   |
| **LLMNR**   | Solo la misma subred       | Link Local Multicast Name Resolution (desde Windows Vista), para grupos de trabajo. Utiliza multicast, compatible con IPv6, no requiere configuración |
| **NetBIOS** | Misma subred / heredado    | Utilizado antes de Windows Vista para encontrar equipos. Máx. 15 caracteres, puertos `137/138/139/445`                                                        |
| **mDNS**    | LAN, link-local            | Multicast DNS (desarrollado por Apple), TLD `.local`, no necesita servidor de nombres. La implementación en Linux es `avahi`                          |

## DNS {/*#dns*/}

DNS (Domain Name System) es el principal sistema de resolución de nombres y la base de la resolución de nombres en Internet. Se trata en detalle en [DNS](./dns.md).

## LLMNR {/*#llmnr*/}

LLMNR resuelve nombres solo dentro de la misma subred y está pensado para pequeños grupos de trabajo. Utiliza multicast en lugar de difusiones (menos tráfico de red) y, a diferencia de NetBIOS, es compatible con IPv6. No puede resolver nombres de sistemas más antiguos (p. ej. Windows Server 2003, Windows XP).

## NetBIOS {/*#netbios*/}

NetBIOS (NetBIOS over TCP/IP, NetBT/NBT) fue relevante hasta Windows 2000/Vista y se utilizaba para explorar la red en busca de equipos. Se emplea como alternativa cuando DNS no está configurado y LLMNR está desactivado o no puede resolver un nombre.

## mDNS {/*#mdns*/}

mDNS (Multicast DNS) permite la resolución de nombres en una LAN sin un servidor de nombres dedicado, mediante mensajes multicast bajo el TLD link-local `.local`. A partir de Windows 11 22H2, Microsoft pretende que mDNS sustituya tanto a NetBIOS como a LLMNR.
