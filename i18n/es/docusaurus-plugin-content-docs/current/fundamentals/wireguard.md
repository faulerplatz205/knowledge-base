---
title: "WireGuard"
description: "Visión general de WireGuard: un protocolo VPN moderno y rápido que utiliza criptografía de última generación."
keywords:
  - "WireGuard"
  - "VPN"
  - "Tunelización"
  - "Criptografía"
  - "Redes"
  - "UDP"
machine_translated: true
---

# WireGuard

## Qué es WireGuard {/*#what-is-wireguard*/}

WireGuard es un protocolo VPN moderno que crea túneles cifrados entre dispositivos. Está diseñado para ser notablemente más simple y rápido que protocolos más antiguos como IPsec u OpenVPN, con una base de código mucho más pequeña (~4.000 líneas frente a cientos de miles).

WireGuard opera en la **[capa de red](./osi-model.md#layer-3--network) (capa 3)** y crea una interfaz de red virtual en cada dispositivo. El tráfico enrutado a través de esa interfaz se cifra y se envía a los pares mediante UDP.

---

## Cómo funciona {/*#how-it-works*/}

WireGuard utiliza un concepto llamado **cryptokey routing**: cada par se identifica por su clave pública, y cada par define qué direcciones IP son alcanzables a través de él.

```text
[Interface]
PrivateKey = <your private key>
Address    = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey  = <peer's public key>
AllowedIPs = 10.0.0.2/32
Endpoint   = 203.0.113.5:51820
```

Cuando la IP de destino de un paquete saliente coincide con `AllowedIPs` de un par, WireGuard lo cifra y lo envía a `Endpoint` de ese par. Los paquetes entrantes se descifran y se aceptan solo si proceden de una clave pública conocida y su IP de origen está dentro de `AllowedIPs` de ese par.

---

## Conceptos clave {/*#key-concepts*/}

### Pares de claves {/*#key-pairs*/}

Cada interfaz de WireGuard tiene una **clave privada** y una **clave pública** derivada. Las claves públicas se intercambian fuera de banda (manualmente o mediante una herramienta como [Tailscale](../tools/tailscale.md)) y sirven como identidad de un par.

### Interfaz {/*#interface*/}

Una **interfaz** de WireGuard es una interfaz de red virtual (p. ej. `wg0`) en un dispositivo. Tiene su propia dirección IP y escucha paquetes UDP entrantes en un puerto configurado.

### Par (peer) {/*#peer*/}

Un **par** (peer) es cualquier otra interfaz de WireGuard con la que esta interfaz tiene permitido comunicarse. Cada entrada de par define:

- **PublicKey**: la clave pública del par
- **AllowedIPs**: rangos de IP cuyo tráfico se enruta a través de este par
- **Endpoint** *(opcional)*: la dirección IP real y el puerto UDP del par

### AllowedIPs {/*#allowedips*/}

`AllowedIPs` tiene un doble propósito:

- **Saliente**: actúa como regla de enrutamiento; los paquetes dirigidos a estas IP se envían a este par
- **Entrante**: actúa como filtro; los paquetes de este par solo se aceptan si su IP de origen está dentro de este rango

Establecer `AllowedIPs = 0.0.0.0/0` enruta todo el tráfico a través de un par, lo que constituye la base de las configuraciones de nodo de salida (exit node) o VPN de túnel completo.

---

## Criptografía {/*#cryptography*/}

WireGuard utiliza un conjunto criptográfico fijo y moderno; no hay negociación, lo que elimina toda una clase de ataques de degradación:

| Propósito              | Algoritmo          |
| ---------------------- | ------------------ |
| Intercambio de claves  | Curve25519 (ECDH)  |
| Cifrado simétrico      | ChaCha20           |
| Autenticación          | Poly1305 (MAC)     |
| Hash                   | BLAKE2s            |
| Derivación de claves   | HKDF               |

---

## Comparación con otros protocolos VPN {/*#comparison-to-other-vpn-protocols*/}

| Propiedad                | WireGuard         | OpenVPN         | IPsec                 |
| ------------------------ | ----------------- | --------------- | --------------------- |
| Tamaño del código        | ~4.000 líneas     | ~70.000 líneas  | Muy grande            |
| Protocolo                | Solo UDP          | TCP o UDP       | UDP / ESP             |
| Configuración            | Sencilla          | Compleja        | Compleja              |
| Rendimiento              | Muy rápido        | Moderado        | Rápido                |
| Criptografía             | Fija, moderna     | Configurable    | Configurable          |
| Travesía de NAT          | Integrado         | Limitado        | Requiere complementos |

---

## Relación con Tailscale {/*#relation-to-tailscale*/}

WireGuard se ocupa únicamente del **plano de datos** => cifra y enruta paquetes entre pares. No se ocupa del descubrimiento de pares, la distribución de claves ni el control de acceso.

[Tailscale](../tools/tailscale.md) está construido sobre WireGuard y añade un **plano de control** gestionado: intercambio automático de claves, descubrimiento de pares, travesía de NAT, MagicDNS y ACL. De este modo se obtiene el rendimiento de WireGuard sin ninguna configuración manual.
