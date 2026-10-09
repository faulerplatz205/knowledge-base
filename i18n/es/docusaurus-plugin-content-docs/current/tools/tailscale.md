---
title: "Tailscale"
description: "Visión general de Tailscale: una VPN en malla basada en WireGuard para conectar dispositivos de forma segura a través de redes."
keywords:
  - "Tailscale"
  - "VPN"
  - "WireGuard"
  - "Red en malla"
  - "Tailnet"
  - "VPN sin configuración"
  - "Redes"
machine_translated: true
---

# Tailscale

## ¿Qué es Tailscale? {/*#what-is-tailscale*/}

Tailscale es un servicio de VPN en malla sin configuración construido sobre [WireGuard](../fundamentals/wireguard.md). Conecta dispositivos en una red privada llamada «**tailnet**», con independencia de su ubicación o de si están detrás de NAT, cortafuegos o proveedores de acceso a Internet distintos.

A diferencia de las VPN tradicionales, que enrutan todo el tráfico a través de una pasarela central, Tailscale establece **conexiones directas de igual a igual** (peer-to-peer) entre los dispositivos siempre que es posible. Esto se traduce en menor latencia y mayor rendimiento.

---

## Arquitectura {/*#architecture*/}

Tailscale tiene dos componentes principales:

- **Plano de control**: el servidor de coordinación de Tailscale gestiona el intercambio de claves y la autenticación, y distribuye la configuración de red a todos los nodos. Nunca ve el tráfico real.
- **Plano de datos**: el tráfico real fluye directamente entre los nodos a través de túneles WireGuard cifrados, sin pasar por los servidores de Tailscale.

```text
Device A <===[WireGuard tunnel (direct P2P)]===> Device B
             (Tailscale control plane: key exchange only)
```

Cuando no es posible una conexión directa (p. ej. cortafuegos estrictos en ambos lados), Tailscale recurre a sus servidores **DERP** (Designated Encrypted Relay for Packets), que retransmiten paquetes cifrados sin poder leerlos.

---

## Conceptos clave {/*#key-concepts*/}

### Tailnet {/*#tailnet*/}

Una tailnet es la red privada que forman todos los dispositivos conectados a Tailscale. Los dispositivos de la misma tailnet pueden comunicarse directamente entre sí como si estuvieran en la misma red local.

### Nodos {/*#nodes*/}

Cualquier dispositivo (portátil, servidor, teléfono, Raspberry Pi) registrado en Tailscale y unido a una tailnet se denomina **nodo**. Cada nodo recibe una dirección IP privada estable en el rango `100.64.0.0/10` (espacio CGNAT, Carrier-Grade NAT).

### MagicDNS {/*#magicdns*/}

MagicDNS asigna automáticamente nombres de host legibles a cada nodo de la tailnet (p. ej. `my-laptop`, `home-server`). Esto permite conectarse a los dispositivos por su nombre en lugar de por su dirección IP, sin configurar ningún DNS manualmente.

### Nodos de salida {/*#exit-nodes*/}

Un **nodo de salida** (exit node) es un nodo que enruta a través de sí mismo todo el tráfico dirigido a Internet procedente de otros nodos. Resulta útil para:

- Acceder a Internet como si se estuviera en otra ubicación
- Imponer una única IP de salida para todos los dispositivos
- Proteger el tráfico en redes no confiables (p. ej. Wi-Fi público)

### Enrutadores de subred {/*#subnet-routers*/}

Un **enrutador de subred** (subnet router) permite que un nodo de Tailscale anuncie el acceso a una red local (subred) existente. Los demás miembros de la tailnet pueden entonces alcanzar los dispositivos de esa subred sin instalar Tailscale en cada uno de ellos.

```text
Tailnet Node (subnet router) <===> Local Network (192.168.1.0/24)
                                         |
                               [Non-Tailscale devices]
```

**Caso de uso típico:** exponer una LAN doméstica o de oficina a todos los dispositivos Tailscale de la tailnet.

### ACL (listas de control de acceso) {/*#acls-access-control-lists*/}

Tailscale utiliza una política de ACL gestionada de forma centralizada para controlar qué nodos pueden comunicarse entre sí. Las reglas se escriben en un formato HuJSON basado en JSON en la consola de administración de Tailscale.

---

## Ventajas {/*#benefits*/}

- **Sin configuración**: sin reenvío de puertos, sin reglas de cortafuegos, sin gestión manual de claves
- **Funciona detrás de NAT**: utiliza técnicas de travesía de NAT (NAT traversal) para establecer conexiones directas
- **Cifrado de extremo a extremo**: todo el tráfico está cifrado por WireGuard; los servidores de Tailscale nunca ven el contenido de los datos transmitidos
- **Multiplataforma**: disponible en Linux, macOS, Windows, iOS, Android y más
- **Acceso basado en identidad**: autenticación mediante proveedores SSO (Google, GitHub, Microsoft, etc.)

---

## Casos de uso habituales {/*#common-use-cases*/}

| Caso de uso                        | Cómo                                   |
| ---------------------------------- | -------------------------------------- |
| Acceder remotamente al servidor doméstico | Registrar el servidor como nodo |
| Proteger el Wi-Fi público          | Enrutar el tráfico a través de un nodo de salida |
| Alcanzar dispositivos sin Tailscale | Usar un enrutador de subred           |
| Conectar un equipo distribuido     | Todos los miembros se unen a la misma tailnet |
| Acceso al laboratorio doméstico    | Registrar todas las máquinas del laboratorio como nodos |
