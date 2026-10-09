---
title: Gestión de eventos
description: "Los tres tipos de eventos de TI (información, advertencia y excepción) y cómo se gestionan en ITSM"
keywords:
  - "Gestión de eventos"
  - "Statusmeldung"
  - "Información"
  - "Advertencia"
  - "Excepción"
  - "Monitorización"
  - "ITSM"
tags:
  - ap2
machine_translated: true
---

# Gestión de eventos

## Resumen {/*#overview*/}

Los **eventos** no requieren un aviso directo de un usuario. Son generados automáticamente por el sistema de monitorización y representan mensajes de estado sobre la situación de un sistema. El término "evento" puede entenderse como un desencadenante o una notificación entrante que se categoriza según su relevancia.

El soporte de software permite filtrar y puede configurarse para que los mensajes de excepción se reenvíen lo más rápido posible a los responsables.

## Tipos de eventos {/*#event-types*/}

### Información {/*#information*/}

Un **mensaje de estado sobre un sistema sin que se requiera ninguna acción**.

El sistema funciona con normalidad; no es necesaria ninguna intervención.

**Ejemplo:** La utilización de la red se sitúa entre el 45 % y el 48 %.

### Advertencia {/*#warning*/}

Un **mensaje de estado que indica la necesidad de una monitorización más estrecha**; es posible que pronto se requiera una acción. La advertencia señala que se acerca un problema.

**Ejemplo:** La matriz de datos RAID informa de una capacidad restante del 20 %.

### Excepción {/*#exception*/}

Un **mensaje de estado que requiere una acción inmediata**. El sistema o servicio ha fallado o ha superado un umbral crítico. Las excepciones suelen dar lugar a un [incidente](./incident-management.md).

**Ejemplo:** El switch de red de 48 puertos ha fallado.

## Ejemplos de clasificación de eventos {/*#event-classification-examples*/}

| Evento                                                                | Tipo        | Motivo                                                                      |
| --------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------- |
| Capacidad del disco duro al 80 %                                      | Advertencia | Todavía no es un problema, pero podría serlo pronto                         |
| Red funcionando de forma estable con una carga del 40 %               | Información | Estado normal del sistema                                                   |
| Sistema ERP web inaccesible                                           | Excepción   | Caída que requiere una acción inmediata                                     |
| Servidor web funcionando de forma estable con una carga del 85 %      | Advertencia | Carga alta, cerca de lo crítico                                             |
| 48 de 50 licencias User CAL en uso                                    | Advertencia | Límite de licencias casi alcanzado; pasa a ser una excepción si se supera   |
| 52 dispositivos conectados, pero solo 50 licencias Device CAL disponibles | Excepción | Límite de licencias superado                                                |
