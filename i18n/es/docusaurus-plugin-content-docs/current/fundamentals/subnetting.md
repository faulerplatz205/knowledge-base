---
title: "Subnetting (IPv4)"
description: "Fundamentos, cálculos y ejemplos de subnetting (IPv4)"
keywords:
    - Subnetting
    - IPv4
last_update:
    author: moritz-grimm
tags:
    - ap2
machine_translated: true
---

# Subnetting (IPv4)

## Fundamentos del subnetting {/*#subnetting-basics*/}

El subnetting divide una red grande en subredes más pequeñas y manejables. Esto mejora el rendimiento, la organización y la seguridad.

| Término                  | Símbolo/Ref. | Definición                                                           | Ejemplo                |
| ------------------------ | ------------ | -------------------------------------------------------------------- | ---------------------- |
| **Dirección IP**         | IP           | Dirección única de un dispositivo en la red.                         | `192.168.1.10`         |
| **Máscara de subred**    | Netmask      | Separa la parte de red de la parte de host.                          | `255.255.255.0`        |
| **CIDR**                 | Notación /   | Formato abreviado de la máscara (número de bits "1").                | `/24`                  |
| **ID de red**            | Net ID       | El "nombre de la calle". La primera dirección de la subred.          | `192.168.1.0`          |
| **Broadcast**            | Bcast        | Llamada a *todos* los dispositivos. La última dirección.             | `192.168.1.255`        |
| **Host**                 | Host         | Un dispositivo (PC, router) dentro de la subred.                     | `.1` a `.254`         |
| **Bits de red**          | Net-Bits     | Bits de la dirección IP que identifican la red.                      | `/24` => primeros 24 bits |
| **Bits de host**         | Host-Bits    | Bits de la dirección IP que identifican hosts dentro de la red.      | `24` => últimos 8 bits    |

**Regla:** una dirección IPv4 consta de **32 bits**, divididos en 4 octetos (8 bits cada uno).  
**Formato:** `x.x.x.x` (decimal) o `11000000.10101000.00000001.00001010` (binario)

---

## Comprensión de las máscaras de subred y CIDR {/*#understanding-subnet-masks--cidr*/}

La máscara de subred indica al equipo qué parte de la IP es la **red** (calle) y cuál es el **host** (número de casa).

### Notación CIDR (Classless Inter-Domain Routing) {/*#cidr-notation-classless-inter-domain-routing*/}

CIDR (p. ej., `/24`) cuenta el número de **bits activos** de la máscara de izquierda a derecha.

| CIDR | Máscara de subred decimal | Máscara de subred binaria (primeros octetos) | Hosts por subred* |
| ---- | ------------------------- | -------------------------------------------- | ----------------- |
| /8   | 255.0.0.0                 | `11111111.00000000...`            | 16.777.214        |
| /16  | 255.255.0.0               | `11111111.11111111...`            | 65.534            |
| /24  | 255.255.255.0             | `11111111...11111111.0`           | 254               |
| /25  | 255.255.255.128           | `11111111...1.10000000`           | 126               |
| /26  | 255.255.255.192           | `11111111...1.11000000`           | 62                |
| /30  | 255.255.255.252           | `11111111...1.11111100`           | 2                 |

**Nota:** total de direcciones menos 2 (1 para la ID de red, 1 para el broadcast).

---

## Métodos de cálculo {/*#calculation-methods*/}

### 1. Cálculo del tamaño de la subred (número de hosts) {/*#1-calculating-subnet-size-number-of-hosts*/}

Cuántas **direcciones IP en total** contiene una subred (en todos los octetos)

```text
Formula (Total Addresses): 2^(Host-Bits) = Total Addresses
Formula (Usable Hosts): 2^(Host-Bits) - 2 = Usable Hosts

Host-Bits = 32 - (CIDR)
```

#### Ejemplo: red /24 {/*#example-24-network*/}

1. **Bits de host:** 32 - 24 = 8 bits
2. **Cálculo:** 2⁸ = 256
3. **Utilizables:** 256 - 2 = **254 hosts**

#### Ejemplo: red /26 {/*#example-26-network*/}

1. **Bits de host:** 32 - 26 = 6 bits
2. **Cálculo:** 2⁶ = 64
3. **Utilizables:** 64 - 2 = **62 hosts**

---

### 2. Obtención del "número mágico" (tamaño de bloque en el octeto interesante) {/*#2-finding-the-magic-number-block-size-in-the-interesting-octet*/}

El número mágico representa el **tamaño del paso** dentro del octeto en el que se realiza el subnetting.

**Importante:** el número mágico solo se aplica al "octeto interesante" (el octeto en el que la máscara de subred no es ni 0 ni 255).

```text
Method 1 (Binary Place):
Look at the last bit set to '1' in the subnetmask. Its value is the Magic Number.

Method 2 (Subtraction):
256 - (Last non-zero octet of the mask) = Magic Number
```

#### ¿Qué octeto es el "interesante"? {/*#which-octet-is-interesting*/}

- `/24 - /32`: cambia el **4.º octeto**
- `/16 - /23`: cambia el **3.er octeto**
- `/8 - /15`: cambia el **2.º octeto**

#### Relación entre los métodos [1](#1-calculating-subnet-size-number-of-hosts) y [2](#2-finding-the-magic-number-block-size-in-the-interesting-octet) {/*#relationship-between-methods-1--2*/}

- **Para `/24+` (subnetting en el 4.º octeto):** número mágico = 2^(bits de host) ✔
- **Para `/23-` (subnetting en un octeto anterior):** son distintos:
  - **Cálculo del tamaño de la subred:** el total de direcciones abarca varios octetos
  - **Obtención del "número mágico":** el número mágico es solo el tamaño del paso en un octeto

#### Ejemplo: máscara /26 => 255.255.255.192, subnetting en el 4.º octeto {/*#example-26-mask--255255255192---4th-octet-subnetting*/}

- **Octeto interesante:** 192
- **Cálculo:** 256 - 192 = **64**
- **Resultado:** las redes avanzan en pasos de 64 (0, 64, 128, 192).

#### Ejemplo: máscara `/18` => 255.255.192.0, subnetting en el 3.er octeto {/*#example-18-mask--2552551920---3rd-octet-subnetting*/}

**Tamaño total:**

- Bits de host: 32 - 18 = 14
- Total de direcciones: 2^14 = **16.384**

**Número mágico (tamaño del paso en el 3.er octeto):**

- Máscara: `255.255.192.0`
- Octeto interesante: 3.º (192)
- Número mágico: 256 - 192 = **64**
- Significado: el 3.er octeto se incrementa de 64 en 64 (0, 64, 128, 192)

**Cómo se relacionan:**

- El 64 es el paso en el 3.er octeto
- Cada paso contiene 256 direcciones (el 4.º octeto completo)
- Total: 64 x 256 = 16.384 ✔

---

### 3. Cálculo del número de subredes {/*#3-calculating-number-of-subnets*/}

Al dividir una red en subredes, se "toman prestados" bits de la parte de host para crear más redes.

```text
Formula: 2^(Borrowed Bits) = Number of Subnets

Borrowed Bits = New CIDR - Original CIDR
```

#### Ejemplo: de /24 a /26 {/*#example-from-24-to-26*/}

**Escenario:** se dispone de `192.168.1.0/24` y se desea dividirla en subredes `/26`.

1. **Red original:** `/24` (256 direcciones en total)
2. **Nuevo tamaño de subred:** `/26`
3. **Bits prestados:** 26 - 24 = **2 bits**
4. **Número de subredes:** 2² = **4 subredes**

**Resultado:** se obtienen 4 subredes, cada una con 64 direcciones (62 hosts utilizables).

| N.º de subred | ID de red     | Primer host   | Último host   | Broadcast     |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| 1             | 192.168.1.0   | 192.168.1.1   | 192.168.1.62  | 192.168.1.63  |
| 2             | 192.168.1.64  | 192.168.1.65  | 192.168.1.126 | 192.168.1.127 |
| 3             | 192.168.1.128 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 4             | 192.168.1.192 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

#### Ejemplo: de /16 a /24 {/*#example-from-16-to-24*/}

**Escenario:** el ISP asigna `10.0.0.0/16` y se desean redes `/24` para departamentos.

1. **Original:** `/16`
2. **Nueva:** `/24`
3. **Bits prestados:** 24 - 16 = **8 bits**
4. **Número de subredes:** 2⁸ = **256 subredes**

**Resultado:** pueden crearse 256 redes departamentales (10.0.0.0/24, 10.0.1.0/24, ..., 10.0.255.0/24).

---

## Ejemplo de cálculo paso a paso {/*#step-by-step-example-calculation*/}

**Tarea:** analizar la IP `192.168.10.150` con la máscara `255.255.255.192` (/26).

### Paso 1: obtener el número mágico (tamaño de bloque) {/*#step-1-find-the-magic-number-block-size*/}

- La máscara es `/26`. El cambio se produce en el 4.º octeto.
- Máscara en el 4.º octeto: `192`
- Número mágico: `256 - 192 = 64`

### Paso 2: determinar los rangos de subred {/*#step-2-determine-subnet-ranges*/}

Se incrementa de 64 en 64 hasta superar la dirección IP (`150`).

- Subred 1: `0 - 63`
- Subred 2: `64 - 127`
- Subred 3: `128 - 191`  (el 150 cae en este rango)
- Subred 4: `192 - 255`

### Paso 3: calcular las direcciones {/*#step-3-calculate-addresses*/}

La IP `192.168.10.150` pertenece a la subred `.128`.

| Tipo             | Cálculo                      | Resultado          |
| ---------------- | ---------------------------- | ------------------ |
| **ID de red**    | Inicio del bloque            | **192.168.10.128** |
| **Primer host**  | ID de red + 1                | **192.168.10.129** |
| **Último host**  | Broadcast - 1                | **192.168.10.190** |
| **Broadcast**    | Siguiente bloque (192) - 1   | **192.168.10.191** |

---

## Referencia rápida: subredes habituales {/*#quick-reference-common-subnets*/}

| CIDR    | Máscara (.x) | Número mágico | Hosts utilizables | Caso de uso típico                      |
| ------- | ------------ | ------------- | ----------------- | --------------------------------------- |
| **/24** | .0           | 256           | 254               | LAN estándar (hogar/oficina)            |
| **/25** | .128         | 128           | 126               | División de una LAN por la mitad        |
| **/26** | .192         | 64            | 62                | Redes departamentales                   |
| **/27** | .224         | 32            | 30                | Equipos pequeños                        |
| **/28** | .240         | 16            | 14                | Grupos muy pequeños                     |
| **/29** | .248         | 8             | 6                 | Redes de tránsito (router a router)     |
| **/30** | .252         | 4             | 2                 | Enlaces punto a punto                   |
| **/32** | .255         | 1             | 1                 | IP de host único (loopback)             |

---

## Errores habituales {/*#common-pitfalls*/}

- **Olvidar la ID de red y el broadcast:** siempre se restan 2 para obtener los hosts *utilizables*.
- **Pasos incorrectos:** los rangos de subred son inclusivos. La primera subred termina por tanto en `start + block size − 1`. Una vez que la primera subred es correcta, los finales de las siguientes subredes pueden calcularse sumando el tamaño de bloque al final de la subred anterior, o aplicando la misma fórmula `start + block size − 1` con la dirección de red de cada subred.
- **Par/impar:** las IDs de red suelen ser números pares; los broadcasts suelen ser números impares.
- **Octeto equivocado:** una subred `/18` cambia en el *3.er* octeto, no en el 4.º.
- `/8 - /15`: cambio en el 2.º octeto
- `/16 - /23`: cambio en el 3.er octeto
- `/24 - /32`: cambio en el 4.º octeto
