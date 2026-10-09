---
title: "DNS"
description: "Cómo el sistema de nombres de dominio resuelve nombres en direcciones IP: jerarquía y FQDN, zonas y tipos de registro, consultas recursivas frente a iterativas y almacenamiento en caché."
keywords:
    - DNS
    - Sistema de nombres de dominio
    - FQDN
    - Zona
    - Búsqueda directa
    - Búsqueda inversa
    - Consulta recursiva
    - Consulta iterativa
tags:
    - ap2
machine_translated: true
---

# DNS (Domain Name System)

DNS resuelve nombres DNS en direcciones IP y viceversa. Un nombre DNS consta de dos partes: el **nombre de host**, que identifica un único host, y el **nombre de dominio**, que identifica un grupo de hosts dentro de un espacio de nombres compartido. Ambos se separan con un punto.

## Jerarquía y FQDN {/*#hierarchy-and-fqdn*/}

DNS es un sistema jerárquico, estructurado desde la raíz hacia abajo:

- **Raíz** – La cúspide de la jerarquía (se escribe como `.`)
- **Dominio de nivel superior (TLD)** – p. ej. `com`, `net`, `de`, `org`
- **Dominio de segundo nivel** – p. ej. `heise` en `heise.de`
- **Subdominio / host** – niveles adicionales por debajo del dominio de segundo nivel, p. ej. `www`

Cuando se especifican todas las partes hasta la raíz, el resultado es el **FQDN** (Fully Qualified Domain Name, nombre de dominio completo), que debe ser único en la red, p. ej. `www.heise.de`.

## Zonas {/*#zones*/}

Cada servidor DNS es responsable de una parte delimitada del espacio de nombres, denominada **zona** (p. ej. `heise.de`). El servidor que gestiona el archivo de una zona posee la **autoridad** sobre ella.

- **Zona primaria** – Acceso de lectura y escritura; la copia autoritativa de la zona.
- **Zona secundaria** – Una copia de solo lectura de una zona primaria (para redundancia o reparto de carga). Puede responder consultas, pero no puede actualizar el archivo de zona.

Los datos de zona se intercambian entre servidores mediante **transferencia de zona** (dos servidores DNS sin controlador de dominio) o **replicación de zona** (zonas integradas en Active Directory en controladores de dominio).

Según la dirección:

- **Zona de búsqueda directa** – Resuelve nombres de dominio en direcciones IP.
- **Zona de búsqueda inversa** – Resuelve direcciones IP en nombres de dominio.

## Tipos de registro {/*#record-types*/}

| Registro  | Finalidad                                        |
| --------- | ------------------------------------------------ |
| **A**     | Nombre de dominio a dirección IPv4               |
| **AAAA**  | Nombre de dominio a dirección IPv6               |
| **CNAME** | Alias que apunta a otro registro de host         |
| **SRV**   | Resuelve un servicio en una dirección IP         |
| **PTR**   | Búsqueda inversa: dirección IP a nombre de dominio |

## Consultas recursivas frente a iterativas {/*#recursive-vs-iterative-queries*/}

- **Consulta recursiva** – El cliente la envía a su servidor de nombres y espera una respuesta final (la dirección IP). Si el servidor contiene la zona, devuelve una **respuesta autoritativa**.
- **Consulta iterativa** – Si el servidor no puede responder por sí mismo, consulta a otros servidores DNS a lo largo de la jerarquía. Cada uno puede limitarse a indicar el siguiente servidor responsable en lugar de la respuesta final, hasta alcanzar el servidor autoritativo.
- **Almacenamiento en caché** – Cada servidor implicado guarda los resultados en su **caché DNS**. Una respuesta tomada de la caché se devuelve como **respuesta no autoritativa**.

## Ejemplo de resolución (`www.example.com`) {/*#example-resolution-wwwexamplecom*/}

1. El cliente envía una consulta **recursiva** a su servidor DNS configurado.
2. Ese servidor no es autoritativo y no tiene ninguna entrada en caché, por lo que envía una consulta **iterativa** a un servidor de nombres **raíz**.
3. El servidor raíz responde con la dirección del servidor de nombres del TLD `com.`.
4. El servidor DNS consulta al servidor de nombres `com.`.
5. El servidor `com.` responde con la dirección del servidor de nombres `example.com.`.
6. El servidor DNS consulta al servidor de nombres `example.com.`.
7. Ese servidor, autoritativo para la zona, responde con la dirección IP del FQDN.
8. El servidor DNS devuelve la dirección IP al cliente (y la guarda en caché).

## Archivo HOSTS {/*#hosts-file*/}

En redes muy pequeñas, un archivo `HOSTS` estático (`C:\Windows\System32\Drivers\etc\HOSTS`) puede asignar nombres de host a direcciones IP en lugar de DNS. Como Active Directory requiere DNS, esta alternativa apenas se utiliza hoy en día.

## Comandos útiles (cliente) {/*#useful-commands-client*/}

| Comando                | Finalidad                    |
| ---------------------- | ---------------------------- |
| `ipconfig /displaydns` | Mostrar la caché DNS local   |
| `ipconfig /flushdns`   | Vaciar la caché DNS local    |

## Reglas de nomenclatura para dominios de Windows {/*#naming-rules-for-windows-domains*/}

- Para redes internas, utilizar un subdominio de un dominio oficial de Internet (p. ej. `media.ct.de` en lugar de `media.ct.local`).
- Mantener los nombres cortos (dominios de 64 caracteres como máximo).
