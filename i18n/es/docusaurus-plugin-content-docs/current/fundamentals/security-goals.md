---
title: "Objetivos de seguridad informática"
description: "Los cuatro objetivos básicos de la seguridad informática, confidencialidad, integridad, disponibilidad y autenticidad, y lo que significan en la práctica."
keywords:
    - Objetivos de seguridad
    - Confidencialidad
    - Integridad
    - Disponibilidad
    - Autenticidad
tags:
    - ap2
machine_translated: true
---

# Objetivos de seguridad informática

## Visión general {/*#overview*/}

La seguridad informática se basa en cuatro objetivos fundamentales que definen lo que debe garantizar un sistema seguro.

## Confidencialidad {/*#confidentiality*/}

La información solo es accesible para las partes autorizadas.

- Los datos deben protegerse frente a accesos o divulgaciones no autorizados
- Se logra mediante cifrado, controles de acceso y el principio de necesidad de conocer
- **Ejemplo**: Solo el destinatario previsto puede leer un correo electrónico cifrado

## Integridad {/*#integrity*/}

La información es exacta y no ha sido manipulada.

- Los datos no deben modificarse, corromperse ni eliminarse sin autorización, ya sea de forma intencionada o accidental
- Se logra mediante funciones hash, firmas digitales y sumas de verificación
- **Ejemplo**: Un archivo descargado cuyo hash coincide con el valor publicado no ha sido alterado

## Disponibilidad {/*#availability*/}

Los sistemas y los datos son accesibles cuando los usuarios autorizados los necesitan.

- Los servicios deben permanecer operativos y responder; la indisponibilidad o la denegación de acceso es un fallo de seguridad
- Se logra mediante redundancia, copias de seguridad, protección frente a DDoS e infraestructura tolerante a fallos
- **Ejemplo**: Un servicio web protegido contra ataques DDoS sigue siendo accesible durante un ataque

## Autenticidad {/*#authenticity*/}

Puede verificarse la identidad de un interlocutor o el origen de los datos.

- Garantiza que las partes son quienes dicen ser y que los datos proceden de una fuente de confianza
- Se logra mediante certificados digitales, firmas y protocolos de autenticación (p. ej. TLS, MFA)
- **Ejemplo**: Un certificado TLS demuestra que un sitio web es operado por la organización indicada

## Resumen {/*#summary*/}

| Objetivo          | Pregunta                                  | Soluciones                         |
| ----------------- | ----------------------------------------- | ---------------------------------- |
| Confidencialidad  | ¿Quién puede acceder a esto?              | Cifrado, control de acceso         |
| Integridad        | ¿Ha sido manipulado?                      | Hashes, firmas digitales           |
| Disponibilidad    | ¿Es accesible cuando se necesita?         | Redundancia, copias de seguridad   |
| Autenticidad      | ¿Es realmente quien o lo que dice ser?    | Certificados, MFA                  |
