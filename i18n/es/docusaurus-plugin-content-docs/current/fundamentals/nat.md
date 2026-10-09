---
title: "NAT"
description: "Cómo NAT traduce direcciones IP privadas en públicas, incluidos PAT/sobrecarga y el reenvío de puertos."
keywords:
    - NAT
    - Traducción de direcciones de red
    - PAT
    - Traducción de direcciones de puerto
    - Reenvío de puertos
    - Redes
    - Dirección IP
    - IP privada
    - IP pública
tags:
    - ap2
machine_translated: true
---

# NAT (Network Address Translation)

## Visión general {/*#overview*/}

El rápido crecimiento de Internet habría agotado enseguida el conjunto disponible de direcciones IP si no existieran mecanismos para utilizarlas de forma más eficiente. NAT (Network Address Translation) lo resuelve al permitir que muchos dispositivos de una red privada compartan un pequeño número de direcciones IP públicas.

NAT opera en un dispositivo de frontera (normalmente un cortafuegos o un router). Cuando un paquete lo atraviesa, NAT sustituye la dirección IP de origen (una dirección privada no enrutable) por una dirección IP pública enrutable. En la respuesta, la dirección pública se vuelve a traducir a la dirección privada para que el paquete pueda entregarse al host interno correcto.

## Ventajas {/*#benefits*/}

- **Renumeración más sencilla**: Al cambiar de ISP, los hosts internos no necesitan nuevas direcciones IP. Solo cambia la dirección pública asignada por el nuevo ISP.
- **Ahorro de direcciones**: [PAT](#nat-overloading-pat) permite que muchos hosts internos compartan una única dirección IP pública, lo que reduce considerablemente el número de direcciones públicas necesarias.
- **Mayor seguridad**: Las direcciones internas y la topología de red quedan ocultas a las redes externas, ya que solo es visible la dirección pública.

## Funcionamiento de NAT {/*#how-nat-works*/}

1. Un host interno (p. ej. `10.0.0.3`) envía un paquete destinado a un host externo (p. ej. `128.23.2.2`)
2. El router de frontera (RTA) reconoce que el paquete se dirige a Internet y selecciona una dirección IP global disponible (p. ej. `179.9.8.80`)
3. RTA sustituye la dirección de origen del paquete por la dirección global y registra la asignación en la tabla NAT
4. El paquete se reenvía al destino
5. Cuando llega la respuesta dirigida a `179.9.8.80`, RTA consulta la tabla NAT, encuentra la dirección interna correspondiente, sustituye el campo de destino y reenvía el paquete internamente

La tabla NAT registra tres tipos de direcciones:

- **IP local interna**: La dirección IP privada del host interno
- **IP global interna**: La dirección IP pública que el router NAT asigna para representar al host interno hacia el exterior
- **IP global externa**: La dirección IP del host de destino en la red externa

**Ejemplo de tabla NAT:**

| IP local interna | IP global interna | IP global externa |
| ---------------- | ----------------- | ----------------- |
| 10.0.0.3         | 179.9.8.80        | 128.23.2.2        |

## Sobrecarga de NAT (PAT) {/*#nat-overloading-pat*/}

La sobrecarga de NAT, también llamada PAT (Port Address Translation), asigna varias direcciones IP privadas a una única dirección IP pública registrando además los números de puerto. Cada conexión interna recibe un número de puerto único en el lado público, lo que permite al router demultiplexar las respuestas entrantes hacia el host interno correcto.

**Tabla NAT con sobrecarga:**

| IP interna | Puerto interno | IP global  | Puerto externo |
| ---------- | -------------- | ---------- | -------------- |
| 10.0.0.2   | 1555           | 179.9.8.80 | 1555           |
| 10.0.0.3   | 1331           | 179.9.8.80 | 1331           |
| 10.0.0.4   | 1444           | 179.9.8.80 | 1444           |

## Reenvío de puertos {/*#port-forwarding*/}

De forma predeterminada, NAT bloquea todas las conexiones entrantes iniciadas desde el exterior. El reenvío de puertos permite que determinado tráfico externo llegue a un host interno al asignar un número de puerto de destino de la IP pública a una dirección IP interna concreta.

Flujo de ejemplo:

1. Un cliente envía una solicitud a `https://knowledge.moritz-grimm.dev` (IP pública `209.165.200.225`, puerto `443`)
2. El router recibe el paquete, ya que `209.165.200.225` es su propia IP pública
3. Una regla de reenvío de puertos asigna el puerto externo `443` al host interno `192.168.1.254:443`, de modo que el router reescribe el destino y reenvía el paquete internamente

:::info
Los números de puerto externo e interno no tienen por qué coincidir.
:::
