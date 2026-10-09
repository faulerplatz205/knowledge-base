---
title: "Modelo OSI"
description: "El modelo de referencia OSI de 7 capas: visión general de la función, las responsabilidades y los protocolos habituales de cada capa."
keywords:
    - Modelo OSI
    - Capa OSI
    - Capa física
    - Capa de enlace de datos
    - Capa de red
    - Capa de transporte
    - Capa de sesión
    - Capa de presentación
    - Capa de aplicación
    - Redes
tags:
    - ap2
machine_translated: true
---

# Modelo OSI

## Visión general {/*#overview*/}

El modelo OSI (Open Systems Interconnection) es un marco conceptual que estandariza cómo se comunican entre sí los distintos sistemas de red. Divide la comunicación en **7 capas**, cada una con una función específica. El modelo es independiente de los fabricantes y sirve como referencia para comprender cómo interactúan los protocolos.

## Las 7 capas {/*#the-7-layers*/}

| #   | Nombre        | Responsabilidad principal                              |
| --- | ------------- | ------------------------------------------------------ |
| 7   | Aplicación    | Protocolos y servicios orientados al usuario           |
| 6   | Presentación  | Formato, codificación y cifrado de datos               |
| 5   | Sesión        | Gestión de sesiones entre aplicaciones                 |
| 4   | Transporte    | Entrega de extremo a extremo entre procesos            |
| 3   | Red           | Direccionamiento lógico y enrutamiento                 |
| 2   | Enlace de datos | Entrega de tramas dentro de una red local            |
| 1   | Física        | Transmisión de bits en bruto a través de un medio      |

## Detalle de las capas {/*#layer-details*/}

### Capa 1 – Física {/*#layer-1--physical*/}

Transmite bits en bruto a través de un medio físico (cables, radio, fibra). Define niveles de tensión, disposición de pines y temporización de bits. No tiene concepto de direccionamiento.

**Ejemplos:** cables Ethernet, señales de radio Wi-Fi, fibra óptica, hubs, repetidores

### Capa 2 – Enlace de datos {/*#layer-2--data-link*/}

Empaqueta los bits en **tramas** y gestiona la entrega dentro de un único segmento de red mediante **direcciones MAC**. También detecta errores de transmisión mediante CRC.

**Subcapas:** LLC (Logical Link Control) y MAC (Media Access Control)

**Ejemplos:** Ethernet, Wi-Fi (802.11), ARP, switches

### Capa 3 – Red {/*#layer-3--network*/}

Gestiona el **direccionamiento lógico** (IP) y el enrutamiento de paquetes a través de varias redes. Determina la mejor ruta del origen al destino.

**Ejemplos:** IP (IPv4, IPv6), ICMP, routers

### Capa 4 – Transporte {/*#layer-4--transport*/}

Proporciona **comunicación de extremo a extremo** entre procesos. Gestiona la segmentación, el reensamblado, el control de flujo y la recuperación de errores.

- **TCP**: orientado a conexión, fiable, entrega ordenada
- **UDP**: sin conexión, más rápido, sin garantía de entrega

**Ejemplos:** TCP, UDP, números de puerto

### Capa 5 – Sesión {/*#layer-5--session*/}

Establece, gestiona y finaliza **sesiones** (conexiones lógicas) entre aplicaciones. Admite la sincronización y los puntos de control en transferencias de datos largas.

**Ejemplos:** NetBIOS, RPC, tokens de sesión

### Capa 6 – Presentación {/*#layer-6--presentation*/}

Traduce los datos entre el formato de la aplicación y el de la red. Se encarga de la codificación, la serialización, la compresión y el cifrado.

**Ejemplos:** TLS/SSL (cifrado), JSON, XML, JPEG, MPEG

### Capa 7 – Aplicación {/*#layer-7--application*/}

La capa más cercana al usuario. Proporciona servicios de red directamente a las aplicaciones. No se refiere a las aplicaciones en sí, sino a los protocolos que utilizan.

**Ejemplos:** HTTP, HTTPS, FTP, SMTP, DNS, SSH

## Regla mnemotécnica {/*#mnemonic*/}

Para recordar las capas desde abajo (1) hasta arriba (7), en inglés:

> **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way`

**P**hysical, **D**ata Link, **N**etwork, **T**ransport, **S**ession, **P**resentation, **A**pplication
