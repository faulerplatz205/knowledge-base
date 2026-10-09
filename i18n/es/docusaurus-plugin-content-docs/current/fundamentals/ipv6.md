---
title: "IPv6 (Internet Protocol Version 6)"
description: "Cómo se estructuran, comprimen y expanden las direcciones IPv6, incluidas las direcciones reservadas más importantes (loopback, link-local), los tipos unicast, multicast y anycast, y los ámbitos de dirección."
keywords:
    - IPv6
    - Protocolo de Internet
    - Redes
    - Loopback
    - Link-Local
    - Unicast
    - Multicast
    - Anycast
    - Ámbito
tags:
    - ap2
machine_translated: true
---

# IPv6 (Internet Protocol Version 6)

## Visión general {/*#overview*/}

IPv6 es el sucesor de IPv4 y se introdujo para superar el agotamiento del espacio de direcciones IPv4 de 32 bits. Una dirección IPv6 tiene **128 bits** de longitud, lo que proporciona 2¹²⁸ (aproximadamente 3,4 x 10³⁸) direcciones posibles.

La dirección se escribe como **8 grupos de 16 bits** (a menudo llamados *hextetos* o *grupos*), cada uno representado por 4 dígitos hexadecimales y separados por dos puntos (`:`).

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
```

- 8 grupos x 16 bits = 128 bits
- Los dígitos hexadecimales no distinguen entre mayúsculas y minúsculas (`ff00` equivale a `FF00`); sin embargo, la forma canónica recomendada es en minúsculas

## Estructura de la dirección {/*#address-structure*/}

Una dirección unicast IPv6 típica se divide en dos mitades de 64 bits cada una:

| Parte                 | Longitud | Finalidad                                                         |
| --------------------- | -------- | ----------------------------------------------------------------- |
| **Prefijo de red**    | 64 bits  | Identifica la red (prefijo de enrutamiento + ID de subred).       |
| **ID de interfaz**    | 64 bits  | Identifica la interfaz individual dentro de esa red.              |

La longitud del prefijo se escribe en notación CIDR, p. ej. `2001:db8:abcd:1234::/64`. Un `/64` es el tamaño estándar para una única subred.

## Abreviación (compresión) {/*#shortening-compression*/}

Dos reglas permiten escribir una dirección IPv6 de forma más compacta. Pueden combinarse.

### Regla 1: eliminar los ceros a la izquierda {/*#rule-1-remove-leading-zeros*/}

Dentro de cada grupo pueden omitirse los ceros a la izquierda. Debe quedar al menos un dígito por grupo.

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8:0:0:0:ff00:42:8329
```

### Regla 2: colapsar una secuencia de grupos de ceros (`::`) {/*#rule-2-collapse-one-run-of-zero-groups-*/}

Una única secuencia contigua de uno o más grupos formados solo por ceros puede sustituirse por dos puntos dobles `::`.

```text
2001:db8:0:0:0:ff00:42:8329
2001:db8::ff00:42:8329
```

**Importante:** `::` puede aparecer **solo una vez** en una dirección; de lo contrario, la longitud sería ambigua. Si existen dos secuencias de ceros igual de largas, debe comprimirse la situada más a la izquierda.

```text
fe80:0:0:0:1:0:0:1   =>   fe80::1:0:0:1   (correct)
fe80:0:0:0:1:0:0:1   =>   fe80::1::1      (invalid, two "::")
```

## Expansión {/*#expanding*/}

La expansión revierte la compresión para recuperar la forma completa de 128 bits. Resulta útil para comparar direcciones o para el cálculo manual de subredes.

1. **Restaurar el `::`** – Contar los grupos presentes e insertar tantos grupos `0` como sean necesarios para alcanzar 8 grupos en total.
2. **Completar cada grupo** – Añadir ceros a la izquierda hasta que cada grupo tenga 4 dígitos hexadecimales.

```text
2001:db8::ff00:42:8329

Step 1 (restore zero groups, 5 groups present => insert 3):
2001:db8:0:0:0:ff00:42:8329

Step 2 (pad to 4 digits each):
2001:0db8:0000:0000:0000:ff00:0042:8329
```

## Tipos de dirección {/*#address-types*/}

IPv6 no tiene difusión (broadcast). Su lugar lo ocupa multicast.

| Tipo          | Significado                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| **Unicast**   | Uno a uno. Identifica una única interfaz; un paquete se entrega exactamente a esa interfaz.                   |
| **Multicast** | Uno a varios. Se entrega a todas las interfaces que se han unido al grupo multicast.                          |
| **Anycast**   | Uno al más cercano. Compartida por varias interfaces; se entrega a la más cercana topológicamente.            |

## Ámbitos {/*#scopes*/}

El *ámbito* define la región de la red en la que una dirección es válida y enrutable. Los dos ámbitos unicast más relevantes son:

- **Link-Local** – Válido solo en el enlace conectado directamente (un segmento). No se enruta. Se configura automáticamente en cada interfaz IPv6.
- **Global** – Único a nivel mundial y enrutable a través de Internet, comparable a una dirección IPv4 pública.

Las direcciones multicast incluyen un campo de ámbito explícito (p. ej. local a la interfaz, link-local, site-local, global).

### Índice de zona para link-local {/*#zone-index-for-link-local*/}

Como las direcciones link-local (`fe80::/10`) no son únicas entre varias interfaces, la interfaz de salida debe especificarse mediante un índice de zona añadido con `%`.

```text
ping fe80::1%eth0      # Linux (interface name)
ping fe80::1%12        # Windows (interface index)
```

## Direcciones importantes {/*#important-addresses*/}

| Dirección / prefijo | Nombre                | Descripción                                                                                         |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| `::/128`         | Sin especificar       | Todo ceros. Se utiliza como dirección de origen antes de que se asigne una (similar a `0.0.0.0`).     |
| `::1/128`        | Loopback              | El host local, equivalente a `127.0.0.1` en IPv4.                                                       |
| `fe80::/10`      | Link-Local            | Autoconfigurada, válida solo en el enlace local, nunca se enruta.                                   |
| `fc00::/7`       | Unique Local (ULA)    | Direcciones privadas de uso interno, no enrutadas en Internet (similar a RFC 1918).                 |
| `2000::/3`       | Unicast global        | Direcciones públicas enrutables a nivel mundial.                                                    |
| `ff00::/8`       | Multicast             | Todas las direcciones multicast comienzan por `ff`.                                              |
| `ff02::1`        | Todos los nodos (enlace) | Multicast a todos los nodos del enlace.                                                          |
| `ff02::2`        | Todos los routers (enlace) | Multicast a todos los routers del enlace.                                                      |
| `2001:db8::/32`  | Documentación         | Reservada para ejemplos y documentación, nunca se utiliza en producción.                            |

## IPv6 frente a IPv4 {/*#ipv6-vs-ipv4*/}

| Propiedad              | IPv4                       | IPv6                              |
| ---------------------- | -------------------------- | --------------------------------- |
| Longitud de dirección  | 32 bits                    | 128 bits                          |
| Notación               | Decimal, separada por puntos | Hexadecimal, separada por dos puntos |
| Difusión (broadcast)   | Sí                         | No (sustituida por multicast)     |
| Loopback               | `127.0.0.1`            | `::1`                        |
| Autoconfiguración      | DHCP / APIPA               | SLAAC + link-local                |
