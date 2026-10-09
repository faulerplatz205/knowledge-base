---
title: "TCP"
description: "Transmission Control Protocol: establecimiento y cierre de conexiones, mecanismos de fiabilidad, control de flujo y de congestión, casos de uso típicos."
keywords:
    - TCP
    - Transmission Control Protocol
    - Three-Way Handshake
    - Orientado a conexión
    - Fiabilidad
    - Control de flujo
    - Control de congestión
    - Capa de transporte
tags:
    - ap2
machine_translated: true
---

# TCP (Transmission Control Protocol)

## Visión general {/*#overview*/}

TCP es un protocolo de transporte orientado a conexión de la capa 4 del [modelo OSI](./osi-model.md), especificado en la RFC 9293. Convierte la entrega de paquetes no fiable de IP en un flujo de bytes fiable y ordenado entre dos aplicaciones: todo lo que se escribe en un lado llega al otro completo, en el orden correcto y sin duplicados, o bien la conexión notifica un error. Un extremo TCP se direcciona mediante la combinación de dirección IP y número de puerto.

---

## Características {/*#characteristics*/}

| Propiedad               | Comportamiento en TCP                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Conexión                | Orientado a conexión, se establece una conexión antes de la primera carga útil         |
| Entrega                 | Fiable, los segmentos perdidos se retransmiten                                         |
| Orden                   | Garantizado, los segmentos se reordenan por número de secuencia antes de la entrega    |
| Duplicados              | Detectados y descartados                                                               |
| Modelo de datos         | Flujo continuo de bytes, no se conservan los límites de los mensajes                   |
| Dirección               | Full duplex, ambos lados pueden enviar al mismo tiempo                                 |
| Control de flujo        | Sí, mediante la ventana de recepción                                                   |
| Control de congestión   | Sí, la tasa de envío se adapta a la carga de la red                                    |
| Tamaño de cabecera      | 20 bytes como mínimo, hasta 60 bytes con opciones                                      |
| Broadcast / multicast   | No es posible, una conexión siempre tiene exactamente dos extremos                     |

El coste de estas garantías consiste en una cabecera mayor, un viaje de ida y vuelta adicional para establecer la conexión y un retardo cada vez que debe retransmitirse un segmento perdido.

---

## Cabecera del segmento {/*#segment-header*/}

| Campo                       | Finalidad                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------- |
| Puerto de origen            | Puerto de la aplicación emisora                                                    |
| Puerto de destino           | Puerto de la aplicación receptora                                                  |
| Número de secuencia         | Posición del primer byte de carga útil de este segmento en el flujo de bytes       |
| Número de confirmación      | Siguiente byte que el emisor de este segmento espera recibir                       |
| Flags                       | Bits de control, véase más abajo                                                   |
| Ventana                     | Número de bytes que el emisor de este segmento puede aceptar actualmente           |
| Suma de comprobación        | Detección de errores sobre la cabecera y la carga útil                             |
| Opciones                    | Maximum Segment Size, escalado de ventana, confirmación selectiva                  |

### Flags de control {/*#control-flags*/}

| Flag                      | Significado                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| `SYN` (Synchronize)     | Solicita una conexión y sincroniza los números de secuencia                     |
| `ACK` (Acknowledgement) | El número de confirmación es válido                                             |
| `FIN` (Finish)          | No se enviarán más datos en esta dirección                                      |
| `RST` (Reset)           | Aborta la conexión de inmediato sin un cierre ordenado                          |
| `PSH` (Push)            | Solicita al receptor que pase los datos a la aplicación sin demora              |
| `URG` (Urgent)          | Marca datos urgentes (obsoleto en la práctica)                                  |

---

## Establecimiento de la conexión (Three-Way Handshake) {/*#connection-establishment-three-way-handshake*/}

Ambos lados anuncian su propio número de secuencia inicial (`x` y `y` en el diagrama) y confirman el del otro lado con `ack = x + 1` o `ack = y + 1`.

```text
Client                                           Server

  | ---- SYN, seq = x -------------------------> |   listening
  |                                              |
  | <--- SYN, ACK, seq = y, ack = x + 1 -------- |   connection accepted
  |                                              |
  | ---- ACK, ack = y + 1 ---------------------> |   connection established
  |                                              |
  | ==== payload ==============================> |
```

- El cliente sabe tras el segundo segmento, y el servidor tras el tercero, que la conexión funciona en ambas direcciones.
- El handshake cuesta un viaje de ida y vuelta antes de que pueda enviarse el primer byte de carga útil.
- Un `SYN` enviado a un puerto cerrado se responde con `RST`, que es la forma en que un escaneo de puertos distingue un puerto cerrado de uno filtrado.

---

## Cierre de la conexión {/*#connection-teardown*/}

Un cierre ordenado termina cada dirección por separado y requiere por tanto cuatro segmentos. `FIN` solo significa *este lado ha terminado de enviar*. La otra dirección aún puede transportar datos (half-close).

```text
Client                                           Server

  | ---- FIN ----------------------------------> |
  | <--- ACK ----------------------------------- |
  | <--- FIN ----------------------------------- |
  | ---- ACK ----------------------------------> |
  |                                              |
  | (TIME_WAIT, then the connection is released) |
```

El lado que cierra primero permanece durante un breve período en `TIME_WAIT`, de modo que los segmentos retrasados de la conexión antigua no puedan confundirse con segmentos de una nueva conexión sobre el mismo par de puertos. Un `RST` omite este procedimiento y descarta todo lo que aún está en tránsito.

---

## Fiabilidad {/*#reliability*/}

- **Números de secuencia:** cada byte de carga útil tiene una posición en el flujo, lo que permite reordenar y detectar duplicados.
- **Confirmaciones:** el receptor confirma el siguiente byte esperado y, con ello, confirma de forma acumulativa todo lo recibido hasta el momento.
- **Timeout de retransmisión:** un segmento que no se confirma dentro del timeout se envía de nuevo. El timeout se deriva del tiempo de ida y vuelta medido.
- **Retransmisión rápida:** varias confirmaciones duplicadas para el mismo byte indican la pérdida de un único segmento y desencadenan una retransmisión antes de que expire el timeout.
- **Suma de comprobación:** un segmento dañado se descarta y, por tanto, nunca se confirma. La confirmación ausente desencadena una retransmisión.
- **Confirmación selectiva (SACK):** una opción que permite al receptor informar exactamente de qué rangos de bytes han llegado, de modo que solo se reenvíen los rangos que faltan.

---

## Control de flujo {/*#flow-control*/}

El control de flujo protege al *receptor* frente a una sobrecarga. Cada segmento anuncia en su campo de ventana cuántos bytes puede almacenar su emisor en ese momento. El otro lado nunca puede tener más datos sin confirmar en tránsito de lo que permite esta ventana.

Un receptor cuyo búfer está lleno anuncia una ventana de cero. El emisor hace entonces una pausa hasta que un segmento posterior anuncie una ventana mayor.

## Control de congestión {/*#congestion-control*/}

El control de congestión protege a la *red* frente a una sobrecarga y funciona con independencia de la ventana de recepción. El límite de envío efectivo es el menor entre la ventana de recepción y la ventana de congestión.

| Fase                    | Comportamiento                                                                    |
| ----------------------- | --------------------------------------------------------------------------------- |
| Slow start              | La ventana de congestión empieza siendo pequeña y crece de forma exponencial      |
| Congestion avoidance    | Por encima de un umbral, la ventana solo crece de forma lineal                    |
| Pérdida detectada       | La ventana se reduce porque la pérdida de paquetes señala congestión              |
| Fast recovery           | Tras una retransmisión rápida, la transferencia continúa con una ventana reducida |

---

## Casos de uso típicos {/*#typical-use-cases*/}

### TCP frente a UDP {/*#tcp-vs-udp*/}

|           | TCP                                                                                      | [UDP](./udp.md)                                                                                |
| --------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Criterio  | La integridad importa más que la latencia                                                | Un paquete tardío carece de valor, o la sobrecarga de una conexión supera la carga útil        |
| Ejemplos  | Transferencia de archivos, páginas web, correo electrónico, administración remota, conexiones de bases de datos | Audio y vídeo en directo, juegos en línea, protocolos sencillos de consulta/respuesta |

### Puertos TCP conocidos {/*#well-known-tcp-ports*/}

| Puerto  | Servicio                                                                  |
| ------- | ------------------------------------------------------------------------- |
| 20/21   | FTP datos / control                                                       |
| 22      | SSH                                                                       |
| 25      | SMTP                                                                      |
| 53      | Transferencias de zona DNS y respuestas que superan el límite de tamaño de UDP |
| 80      | HTTP                                                                      |
| 110/995 | POP3 / POP3S                                                              |
| 143/993 | IMAP / IMAPS                                                              |
| 443     | HTTPS                                                                     |
| 3306    | MySQL / MariaDB                                                           |

## Véase también {/*#see-also*/}

- [UDP](./udp.md): la contraparte sin conexión, sin establecimiento de conexión, fiabilidad ni control de flujo
- [Modelo OSI](./osi-model.md): dónde se sitúa la capa de transporte, entre la capa de red y la capa de sesión
