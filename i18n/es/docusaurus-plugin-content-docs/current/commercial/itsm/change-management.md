---
title: Gestión de cambios
description: "Gestión de cambios en ITSM: RFC, tipos de cambio (estándar, normal, de emergencia), órganos de aprobación (CAB, CIO, EC/ECAB), FSC, CMDB y PIR"
keywords:
  - "Gestión de cambios"
  - "RFC"
  - "Solicitud de cambio"
  - "CAB"
  - "Change Advisory Board"
  - "Cambio estándar"
  - "Cambio normal"
  - "Cambio de emergencia"
  - "CMDB"
  - "FSC"
  - "PIR"
sidebar_position: 3
tags:
  - ap2
machine_translated: true
---

# Gestión de cambios

## Resumen {/*#overview*/}

La **gestión de cambios** es el tercer nivel de ITSM. Se ocupa de la aprobación y planificación de los cambios en el sistema de TI.

**Objetivo:** garantizar que los cambios no se realicen de forma precipitada y sin una visión de conjunto. Especialistas de distintas áreas evalúan los riesgos para evitar errores derivados. Solo los cambios de emergencia pueden eludir este proceso, porque en ellos la máxima prioridad es restablecer el sistema lo antes posible.

## Solicitud de cambio (RFC) {/*#request-for-change-rfc*/}

Antes de ejecutar un cambio se crea una **solicitud de cambio (Request for Change, RFC)**, normalmente a partir de la [gestión de problemas](./problem-management.md). La RFC es una solicitud formal para llevar a cabo un cambio. Contiene:

- Descripción del cambio
- Motivo del cambio
- Calendario
- Prioridad
- Efectos secundarios previstos
- Costes estimados

La RFC describe **qué** debe hacerse, pero no **cómo**, ya que el cómo se elabora en el proceso de gestión de cambios.

## Priorización de las RFC {/*#rfc-prioritisation*/}

Las RFC entrantes se priorizan según la **urgencia** y el **impacto**:

### Niveles de urgencia {/*#urgency-levels*/}

| Nivel                  | Descripción                  |
| ---------------------- | ---------------------------- |
| **Prioridad baja**     | Deseable, pero no urgente    |
| **Prioridad media**    | Necesario, pero no urgente   |
| **Prioridad alta**     | Se requiere acción inmediata |
| **Prioridad inmediata** | Se requiere acción inmediata |

### Niveles de impacto {/*#impact-levels*/}

| Nivel             | Descripción                                             | Ejemplo                        |
| ----------------- | ------------------------------------------------------- | ------------------------------ |
| **Impacto bajo**  | Efecto mínimo en los servicios de TI, poco esfuerzo     | Sustituir un PC                |
| **Impacto medio** | Efecto moderado, mayor esfuerzo                         | Actualizar el SO de todos los PC |
| **Impacto alto**  | Efecto alto en los servicios de TI, esfuerzo muy elevado | Caída completa de un servidor |

## Tipos de cambio {/*#change-types*/}

| Tipo                                      | Características                                                                                         | Aprobación                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------- |
| **Cambio estándar (Standard Change)**     | Cambios rutinarios preaprobados de un catálogo; riesgo bajo; autorizados automáticamente                | Solo el Change Manager      |
| **Cambio normal (Normal Change)**         | Riesgo medio, complejidad media, urgencia moderada; requiere evaluación por expertos                    | CAB + CIO                   |
| **Cambio de emergencia (Emergency Change, Notfall Change)** | Urgencia alta, se requiere una solución a corto plazo; se elude el proceso de aprobación estructurado para ganar rapidez | EC / ECAB |

## Órganos de aprobación {/*#approval-bodies*/}

| Órgano                              | Descripción                                                                                                                                  |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Change Manager (CM)**             | Decide por sí solo sobre cambios de poco alcance (cambio estándar); responsable de la gestión del tiempo y del seguimiento                   |
| **Change Advisory Board (CAB)**     | Comité de expertos de diversas áreas de negocio; decide sobre cambios de alcance medio (cambio normal)                                       |
| **Chief Information Officer (CIO)** | Persona de nivel directivo que representa los intereses de TI; participa en decisiones con gran alcance para el negocio (p. ej. formación del personal) |
| **Emergency Committee (EC / ECAB)** | Equipo reducido de expertos con amplias competencias para decisiones urgentes; se ocupa de los cambios de emergencia                         |

## Planificación de cambios {/*#change-planning*/}

### Forward Schedule of Change (FSC) {/*#forward-schedule-of-change-fsc*/}

Un calendario en el que se documentan todos los cambios planificados a largo plazo. La planificación debe aspirar siempre a minimizar el tiempo de inactividad.

### Configuration Management Database (CMDB) {/*#configuration-management-database-cmdb*/}

Una base de datos central en la que se almacenan todos los CI con sus especificaciones y números de licencia. Todos los cambios en los CI se documentan aquí de forma centralizada.

El Change Manager (CM) es responsable de la implementación controlada en el tiempo y del seguimiento de los cambios.

## Aprobación y ejecución de cambios {/*#approving-and-executing-changes*/}

La separación entre aprobar o autorizar un cambio y planificarlo o ejecutarlo es intencionada en ITSM. Esto garantiza:

- Decisiones sostenibles de especialistas que consideran el sistema en su conjunto
- La prevención de la corrección reactiva de errores sin tener en cuenta el contexto más amplio
- Una responsabilidad documentada

## Cierre de un cambio (PIR) {/*#closing-a-change-pir*/}

Una vez implementado un cambio, la gestión de cambios documenta todas las medidas y la causa raíz del fallo en la CMDB y en la KEDB para futuras consultas.

La **Post Implementation Review (PIR)** documenta todos los puntos clave del cambio:

- Resultados de las pruebas
- Detalles de la implementación
- Cambios respecto al estado anterior del sistema
- Costes y esfuerzo
- Marcas de tiempo

**Objetivo de la PIR:** impulsar la mejora continua revisando y evaluando los cambios completados.

## Resumen de tipos de cambio y aprobación {/*#change-types-and-approval-summary*/}

| Tipo de cambio    | Órgano de aprobación | Característica clave                               |
| ----------------- | -------------------- | -------------------------------------------------- |
| Cambio estándar   | Change Manager       | Basado en catálogo, preaprobado, riesgo bajo       |
| Cambio normal     | CAB + CIO            | Riesgo medio, con participación del CAB            |
| Cambio de emergencia | EC / ECAB         | Máxima rapidez, proceso estructurado eludido       |
