---
title: "ARP (Address Resolution Protocol)"
description: "Cómo ARP resuelve direcciones IP en direcciones MAC dentro de una red local, con la entrega local frente a la remota, el proceso de solicitud/respuesta y la caché ARP."
keywords:
    - ARP
    - Address Resolution Protocol
    - Dirección MAC
    - Dirección IP
    - Redes
    - Capa 2
    - Capa 3
    - Puerta de enlace predeterminada
tags:
    - ap2
machine_translated: true
---

# ARP (Address Resolution Protocol)

## Resumen {/*#overview*/}

ARP (Address Resolution Protocol) opera en el límite entre la capa 2 (enlace de datos) y la capa 3 (red) del [modelo OSI](./osi-model.md). Resuelve una **dirección IP** conocida en la **dirección MAC** correspondiente que se necesita para entregar una trama dentro de un segmento de red local.

## Dos tipos de direcciones {/*#two-types-of-addresses*/}

Cada dispositivo de una LAN Ethernet es accesible mediante dos direcciones distintas:

- **Dirección MAC**: Se utiliza para la comunicación entre tarjetas de interfaz de red dentro del mismo segmento de red. Es el direccionamiento de la trama Ethernet de la capa 2.
- **Dirección IP**: Se utiliza para enviar el paquete desde el origen inicial hasta el destino final, con independencia de cuántas redes haya de por medio. Es el direccionamiento del paquete IP de la capa 3.

La trama Ethernet se encapsula alrededor del paquete IP. Mientras el paquete IP viaja de extremo a extremo, la trama Ethernet que lo rodea solo existe en un único segmento de red.

## Por qué se necesita ARP {/*#why-arp-is-needed*/}

Los paquetes IP contienen las direcciones IP de origen y destino, pero las tramas Ethernet utilizan direcciones MAC para la entrega en el segmento local. Cuando un dispositivo quiere enviar datos, conoce la dirección IP de destino, pero primero debe descubrir la dirección MAC a la que debe dirigirse la trama.

## Entrega local frente a remota {/*#local-vs-remote-delivery*/}

El dispositivo emisor determina primero si el destino se encuentra en la **misma red** aplicando su máscara de subred (un AND lógico de su propia IP y de la IP de destino con la máscara). El resultado decide qué dirección MAC necesita la trama:

- **Misma red** – La dirección MAC de destino es la dirección MAC del propio host de destino. El dispositivo resuelve la IP de destino mediante ARP.
- **Red distinta** – La dirección MAC de destino es la dirección MAC de la **puerta de enlace predeterminada** (la interfaz de red del router). El dispositivo resuelve la IP de la puerta de enlace mediante ARP.

En ambos casos, las **direcciones IP de origen y destino del paquete no cambian nunca**. Solo se reescriben las direcciones MAC de la trama: cada router a lo largo de la ruta descarta la trama entrante y construye una nueva con las direcciones MAC de origen y destino para el siguiente salto.

## Consulta de la tabla ARP {/*#arp-table-lookup*/}

Antes de enviar, el dispositivo busca en su tabla ARP (almacenada en la RAM) la IP que necesita resolver:

- Si la IP de destino está en la **misma red**, busca la **dirección IP de destino**.
- Si la IP de destino está en una **red distinta**, busca la **dirección IP de la puerta de enlace predeterminada**.

Si existe una entrada coincidente, se utiliza la dirección MAC almacenada en caché para construir la trama. Si no existe ninguna entrada, el dispositivo envía una **solicitud ARP**.

## Proceso de solicitud/respuesta ARP {/*#arp-request--reply-process*/}

1. **Comprobar la caché ARP** – Si la dirección MAC de la IP necesaria ya está en caché, no se requiere ninguna solicitud
2. **Solicitud ARP (broadcast)** – Si no está en caché, el emisor difunde una solicitud ARP a todos los dispositivos del segmento: *"¿Quién tiene la IP X.X.X.X? Informar a la IP Y.Y.Y.Y"*. La dirección MAC de destino de esta trama de difusión es `FF:FF:FF:FF:FF:FF`
3. **Respuesta ARP (unicast)** – El dispositivo con la IP coincidente responde directamente al emisor con su dirección MAC; todos los demás dispositivos ignoran la solicitud
4. **Actualización de la caché** – El emisor almacena la asignación IP-MAC en su caché ARP para usos futuros
5. **Se envía la trama** – El emisor construye ahora la trama Ethernet con la dirección MAC resuelta

## Caché ARP {/*#arp-cache*/}

La caché ARP almacena las asignaciones IP-MAC recientes para evitar difusiones repetidas.

- Las entradas tienen un TTL (Time to Live) y caducan automáticamente
- Comandos habituales (Windows/Linux):

| Comando  | Finalidad                          |
| -------- | ---------------------------------- |
| `arp -a` | Mostrar la tabla ARP               |
| `arp -d` | Eliminar entradas de la tabla ARP  |

## Seguridad: suplantación ARP (ARP spoofing) {/*#security-arp-spoofing*/}

Dado que ARP no tiene ningún mecanismo de autenticación, un atacante puede enviar respuestas ARP falsas para envenenar la caché de otros dispositivos y redirigir el tráfico a través de su equipo (ataque Man-in-the-Middle).

Las contramedidas incluyen:

- **Dynamic ARP Inspection (DAI)** en conmutadores gestionados
- **Entradas ARP estáticas** para dispositivos críticos
- Supervisión de la red y detección de anomalías
