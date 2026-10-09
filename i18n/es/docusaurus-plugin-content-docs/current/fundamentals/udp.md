---
title: "UDP"
description: "User Datagram Protocol: transporte sin conexión, estructura de la cabecera y casos de uso típicos."
keywords:
    - UDP
    - User Datagram Protocol
    - Sin conexión
    - Datagrama
    - Capa de transporte
    - TCP frente a UDP
    - Streaming
tags:
    - ap2
machine_translated: true
---

# UDP (User Datagram Protocol)

## Visión general {/*#overview*/}

UDP es un protocolo de transporte sin conexión de la capa 4 del [modelo OSI](./osi-model.md), especificado en la RFC 768. No añade casi nada a la entrega de paquetes de IP: números de puerto, un campo de longitud y una suma de comprobación. Cada datagrama se direcciona y se enruta de forma independiente, sin establecimiento previo de conexión, estado compartido, confirmación ni retransmisión. Un datagrama se envía y llega o no llega, y al emisor nunca se le informa de qué ha ocurrido. Un extremo UDP se direcciona mediante la combinación de dirección IP y número de puerto.

---

## Características {/*#characteristics*/}

| Propiedad               | Comportamiento en UDP                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| Conexión                | Sin conexión, un datagrama puede enviarse de inmediato                                   |
| Entrega                 | No fiable, los datagramas perdidos no se advierten ni se repiten                         |
| Orden                   | No garantizado, los datagramas pueden llegar en un orden distinto                        |
| Duplicados              | Posibles, su detección se deja a la aplicación                                           |
| Modelo de datos         | Orientado a mensajes, una operación de envío produce exactamente un datagrama            |
| Dirección               | Ambos lados pueden enviar en cualquier momento, cada datagrama es independiente          |
| Control de flujo        | Ninguno                                                                                  |
| Control de congestión   | Ninguno, un emisor puede inundar la red                                                  |
| Tamaño de cabecera      | 8 bytes, fijo                                                                            |
| Broadcast / multicast   | Admitido, un datagrama puede dirigirse a muchos receptores                               |

A cambio de la pequeña sobrecarga, UDP no ofrece garantías.

---

## Cabecera del datagrama {/*#datagram-header*/}

La cabecera consta de cuatro campos de 2 bytes cada uno:

| Campo                | Finalidad                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Puerto de origen     | Puerto de la aplicación emisora, puede ser 0 si no se espera respuesta                                                     |
| Puerto de destino    | Puerto de la aplicación receptora                                                                                          |
| Longitud             | Longitud de la cabecera y la carga útil en bytes                                                                           |
| Suma de comprobación | Detección de errores sobre la cabecera, la carga útil y partes de la cabecera IP, opcional en IPv4 y obligatoria en IPv6    |

Un datagrama dañado se descarta de forma silenciosa.

---

## Comunicación sin conexión {/*#communication-without-a-connection*/}

A diferencia de TCP, donde la carga útil solo sigue al three-way handshake, el primer datagrama ya transporta carga útil. Tras el último no queda ningún estado de conexión en ninguno de los dos lados.

```text
Client                                           Server

  | ---- datagram (query) ---------------------> |   application reads it
  |                                              |
  | <--- datagram (answer) --------------------- |
  |                                              |
  | ---- datagram (query) --------X              |   lost, nobody is informed
  |                                              |
  |  (timeout in the application)                |
  |                                              |
  | ---- datagram (query, repeated) -----------> |
```

- El cliente solo sabe por la respuesta que su consulta llegó. Una respuesta ausente puede significar una consulta perdida, una respuesta perdida o un servidor no disponible.
- La dirección de origen de un datagrama nunca se verifica mediante un handshake. Por ello son posibles las solicitudes falsificadas, que aprovechan los ataques de amplificación a través de DNS o NTP.
- Un datagrama enviado a un puerto cerrado se responde con el mensaje ICMP *port unreachable*. Un puerto abierto y un puerto filtrado suelen permanecer ambos en silencio, de modo que un escaneo de puertos UDP a menudo no puede distinguirlos.

---

## Sin control de flujo ni de congestión {/*#no-flow-or-congestion-control*/}

UDP transmite los datagramas tan rápido como la aplicación los envía. Si el búfer de recepción está lleno, los datagramas siguientes se descartan sin aviso. Si la red está sobrecargada, los datagramas se pierden en las colas de los routers.

Una aplicación que envía grandes volúmenes por UDP tiene que limitar ella misma su tasa (RFC 8085). De lo contrario desplaza el tráfico TCP, porque TCP reduce su tasa ante la pérdida de paquetes y UDP se apropia de la capacidad liberada.

---

## Casos de uso típicos {/*#typical-use-cases*/}

### UDP frente a TCP {/*#udp-vs-tcp*/}

|           | UDP                                                                                          | [TCP](./tcp.md)                                                                                                   |
| --------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Criterio  | Un paquete tardío carece de valor, o la sobrecarga de una conexión supera la carga útil      | La integridad importa más que la latencia                                                                         |
| Ejemplos  | Audio y vídeo en directo, juegos en línea, consultas cortas, telemetría, descubrimiento mediante multicast | Transferencia de archivos, páginas web, correo electrónico, administración remota, conexiones de bases de datos |

### Puertos UDP conocidos {/*#well-known-udp-ports*/}

| Puerto   | Servicio      | Por qué UDP                                                                                  |
| -------- | ------------- | -------------------------------------------------------------------------------------------- |
| 53       | DNS           | Una consulta corta, una respuesta corta, repetir es más barato que una conexión              |
| 67/68    | DHCP          | El cliente aún no tiene dirección IP y depende del broadcast                                 |
| 69       | TFTP          | Deliberadamente mínimo, utilizado en entornos de arranque                                    |
| 123      | NTP           | Una marca de tiempo retransmitida ya estaría obsoleta                                        |
| 161/162  | SNMP          | Muchos mensajes de estado pequeños, la pérdida de uno solo es aceptable                      |
| 443      | QUIC / HTTP/3 | La fiabilidad se implementa en QUIC sobre UDP                                                |
| 500/4500 | IPsec (IKE)   | Intercambio de claves y NAT traversal                                                        |
| 5060     | SIP           | Señalización para conexiones de voz                                                          |

En DNS ambos protocolos trabajan codo con codo: las consultas y las respuestas cortas van por UDP, mientras que las transferencias de zona y las respuestas que superan el límite de tamaño de UDP utilizan TCP. Ese límite es de 512 bytes, o el tamaño de búfer que el cliente anuncia mediante EDNS(0).

## Véase también {/*#see-also*/}

- [TCP](./tcp.md): la contraparte orientada a conexión, con fiabilidad, ordenación y control de flujo
- [Modelo OSI](./osi-model.md): dónde se sitúa la capa de transporte, entre la capa de red y la capa de sesión
- [DHCP](./dhcp.md): un protocolo que depende de broadcasts UDP
- [DNS](./dns.md): utiliza UDP para las consultas y TCP para las respuestas grandes
