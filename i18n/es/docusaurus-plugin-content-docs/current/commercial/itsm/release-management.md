---
title: Gestión de versiones
description: "Gestión de versiones en ITSM: ejecución de cambios sin interrupciones mediante despliegue Big Bang o por fases, paquetes de versión, rollback, máquinas virtuales y la PIR"
keywords:
  - "Gestión de versiones"
  - "Big Bang"
  - "Despliegue por fases"
  - "Paquete de versión"
  - "Rollback"
  - "Máquina virtual"
  - "PIR"
  - "Gestión de cambios"
  - "ITSM"
sidebar_position: 4
tags:
  - ap2
machine_translated: true
---

# Gestión de versiones

## Visión general {/*#overview*/}

La **gestión de versiones** (Release Management) es el cuarto nivel de ITSM y la continuación de la gestión de cambios. Mientras que la gestión de cambios aprueba y planifica un cambio, la gestión de versiones lo **ejecuta**, con el objetivo de un despliegue fluido y sin interrupciones.

## Relación con la gestión de cambios {/*#relationship-to-change-management*/}

| Gestión de cambios                                                | Gestión de versiones                                                 |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| Aprueba y planifica los cambios                                   | Ejecuta los cambios                                                  |
| Crea la [RFC](./change-management.md#request-for-change-rfc)      | Implementa la [RFC](./change-management.md#request-for-change-rfc)   |
| Decide qué y cuándo                                               | Decide cómo y realiza el despliegue                                  |

## Paquete de versión {/*#release-package*/}

Antes del despliegue se crea un **paquete de versión** que contiene todos los cambios planificados. Las pruebas se realizan preferiblemente sobre un [CI](./incident-management.md#configuration-items-ci) tomado del entorno de producción en funcionamiento, actualizado y devuelto a un entorno de pruebas. Tras un período de pruebas definido y sin problemas, la versión puede desplegarse en todos los sistemas de destino.

Un sistema de distribución de software ayuda a distribuir versiones de forma eficiente a muchos [CI](./incident-management.md#configuration-items-ci).

## Enfoques de despliegue {/*#rollout-approaches*/}

### Big Bang {/*#big-bang*/}

Todos los destinatarios reciben la versión al mismo tiempo.

**Ventajas:**

- Implantación global más rápida
- Todos los sistemas tienen la misma actualización simultáneamente
- Resolución de problemas más eficiente (sin diferencias de versión)

**Desventajas:**

- Riesgo elevado si se producen errores (todos los sistemas se ven afectados a la vez)
- Carga elevada sobre la infraestructura durante el despliegue

### Por fases {/*#phased*/}

La versión se despliega primero en un **subconjunto** de destinatarios y después, de forma progresiva, en más.

**Ventajas:**

- Menor riesgo (solo se ve afectada una parte de los sistemas)
- Los errores se detectan antes y sin grandes interrupciones

**Desventajas:**

- La implantación lleva más tiempo
- Durante la transición se ejecutan simultáneamente distintas versiones de software

## Rollback {/*#rollback*/}

Si una versión falla de forma inesperada en el entorno de producción, siempre debería estar disponible un **rollback** al estado anterior. Una vez completado el despliegue, se informa al usuario sobre la actualización a través de las instancias de proceso.

## Máquinas virtuales en la gestión de versiones {/*#virtual-machines-in-release-management*/}

**Máquina virtual (VM):** encapsulación basada en software de un sistema informático que simula un PC real en un equipo anfitrión.

**Ventajas:**

- Las copias pueden crearse, iniciarse y modificarse con facilidad y sin riesgo
- Los sistemas físicos pueden convertirse en VM (P2V = Physical to Virtual)

**Beneficio para la gestión de versiones:** las nuevas versiones, actualizaciones y aplicaciones pueden probarse de forma segura en un entorno de VM. Las versiones anteriores pueden seguir ejecutándose en paralelo (eficiencia de recursos).

## Visión general de los procesos de ITSM {/*#itsm-process-overview*/}

Los cuatro niveles de ITSM funcionan conjuntamente como una cadena:

| Proceso                                                   | Función                                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| [**Gestión de incidentes**](./incident-management.md)    | Registra las interrupciones y filtra los problemas                       |
| [**Gestión de problemas**](./problem-management.md)      | Identifica las causas raíz y proporciona un workaround cuando es posible |
| [**Gestión de cambios**](./change-management.md)         | Aprueba y planifica los cambios razonables                               |
| [**Gestión de versiones**](./release-management.md)      | Ejecuta los cambios de forma segura                                      |

**Motivo de esta separación:** la orquestación de los procesos busca la sostenibilidad y aporta estructura a un flujo de trabajo complejo.

## Procesos de ITSM y [fases IMAC/R/D](./service-types.md#imacrd-lifecycle) {/*#itsm-processes-and-imacrd-phases*/}

| Actividad IMAC/R/D            | Procesos de ITSM relevantes                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| Wartung (mantenimiento)       | Gestión de cambios, gestión de versiones                                                 |
| Inspektion (inspección)       | Gestión de problemas, gestión de cambios, gestión de versiones                           |
| Instandsetzung (reparación)   | Gestión de incidentes, gestión de problemas, gestión de cambios, gestión de versiones    |
| Verbesserung (mejora)         | Gestión de cambios, gestión de versiones                                                 |
