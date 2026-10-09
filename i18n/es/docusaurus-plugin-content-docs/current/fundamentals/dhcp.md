---
title: "DHCP"
description: "Cómo DHCP asigna automáticamente la configuración IP a los clientes, incluidos el proceso DORA, las concesiones, los ámbitos, las opciones, las reservas, los agentes de retransmisión y la conmutación por error."
keywords:
    - DHCP
    - Protocolo de configuración dinámica de host
    - DORA
    - Concesión
    - Ámbito
    - Agente de retransmisión
    - Conmutación por error
    - DHCPv6
tags:
    - ap2
machine_translated: true
---

# DHCP (Dynamic Host Configuration Protocol)

DHCP asigna automáticamente a los clientes una dirección IP, una máscara de subred y otros parámetros de configuración dentro de una red local. Así se evita configurar cada host manualmente. DHCP utiliza los puertos UDP `67` (servidor) y `68` (cliente).

## El proceso DORA {/*#the-dora-process*/}

Un cliente obtiene su configuración en cuatro pasos, conocidos por la sigla **DORA**:

1. **Discover** – El cliente envía por difusión (broadcast) un `DHCP Discover` a la red local para encontrar un servidor.
2. **Offer** – Un servidor DHCP responde con un `DHCP Offer` que contiene una dirección disponible y los parámetros de configuración.
3. **Request** – El cliente solicita la dirección ofrecida mediante un `DHCP Request`.
4. **Acknowledge** – Si la dirección sigue disponible, el servidor la confirma con un `DHCP Ack`.

## Conceptos clave {/*#key-concepts*/}

- **Concesión (lease)** – Una dirección se entrega durante un tiempo limitado (la concesión). Así se evita que las direcciones queden asignadas a un cliente para siempre y se permite reutilizarlas.
- **Ámbito (scope)** – El rango de direcciones IP que un servidor puede entregar (incluida la máscara de subred).
- **Opciones** – Parámetros adicionales distribuidos junto con la dirección, p. ej. puerta de enlace predeterminada, servidor DNS, máscara de subred.
- **Reserva** – Una dirección IP fija vinculada de forma permanente a una dirección MAC concreta, de modo que un cliente recibe siempre la misma dirección.

## Agente de retransmisión {/*#relay-agent*/}

Dado que los routers no reenvían las difusiones, un servidor DHCP normalmente solo atiende a su propia subred. Un **agente de retransmisión DHCP** reenvía las solicitudes DHCP de otra subred al servidor DHCP (como unicast), lo que permite que un único servidor atienda varias subredes.

## Conmutación por error {/*#failover*/}

Para lograr alta disponibilidad, dos servidores DHCP pueden compartir los mismos ámbitos y replicar su información de concesiones. Existen dos modos:

- **Equilibrio de carga** – Ambos servidores entregan direcciones simultáneamente (proporción predeterminada 50/50, ajustable).
- **Espera activa (hot standby)** – Un servidor primario entrega todas las direcciones; un servidor secundario solo toma el relevo si el primario falla.

La conmutación por error admite como máximo dos servidores y solo funciona con ámbitos IPv4.

## DHCPv6 frente a SLAAC {/*#dhcpv6-vs-slaac*/}

En IPv6, la configuración de direcciones no requiere estrictamente DHCP:

- **SLAAC** (Stateless Address Autoconfiguration) – El host construye su propia dirección a partir de un prefijo global anunciado por el router (Router Advertisement). No interviene ningún servidor central.
- **DHCPv6** (con estado) – Un servidor DHCPv6 asigna y registra de forma centralizada toda la configuración, de manera similar a IPv4. El router sigue enviando Router Advertisements con el indicador `managed` para que el host sepa que debe usar DHCPv6.

## Comandos útiles (cliente) {/*#useful-commands-client*/}

| Comando             | Finalidad                                                                |
| ------------------- | ------------------------------------------------------------------------ |
| `ipconfig /all`     | Mostrar la configuración IP completa (adaptador, MAC, IP, DNS, puerta de enlace) |
| `ipconfig /release` | Liberar la dirección actual (concesión)                                  |
| `ipconfig /renew`   | Solicitar una nueva concesión al servidor DHCP                           |
