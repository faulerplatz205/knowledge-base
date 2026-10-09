---
title: Clasificación de solicitudes de servicio
description: "Los tres tipos de solicitudes de servicio entrantes en ITSM: eventos, solicitudes de servicio e incidentes, y el papel del helpdesk como SPOC"
keywords:
  - "Solicitud de servicio"
  - "Incidente"
  - "Evento"
  - "SPOC"
  - "Helpdesk"
  - "Soporte de primer nivel"
  - "Sistema de seguimiento de incidencias"
  - "Base de conocimiento"
tags:
  - ap2
machine_translated: true
---

# Clasificación de solicitudes de servicio

## Visión general {/*#overview*/}

Todos los mensajes entrantes llegan al punto central de la organización de TI, el **punto único de contacto (SPOC)**, también denominado **Helpdesk**. El helpdesk puede organizarse de forma local, descentralizada o virtual (varios helpdesks que desde fuera aparecen como uno solo). Este primer nivel de asistencia también se denomina **soporte de primer nivel**.

Los mensajes entrantes se dividen fundamentalmente en tres tipos:

## Los tres tipos {/*#the-three-types*/}

### [Evento](./event-management.md) {/*#event*/}

Un **mensaje generado automáticamente** sobre el estado de un sistema. Estos mensajes entrantes también se denominan **eventos** y no requieren un aviso directo de un usuario. Los genera el sistema de monitorización.

### Solicitud de servicio {/*#service-request*/}

Una **petición formal de un usuario** o solicitud de soporte, también denominada **Service Request**. Incluye preguntas generales, contraseñas olvidadas, instrucciones para usar un programa o peticiones de equipamiento nuevo.

### [Incidente](./incident-management.md) {/*#incident*/}

Un **aviso de una interrupción no planificada** de un servicio, denominado en ITSM también **incidente**.

## Sistema de seguimiento de incidencias {/*#issue-tracking-system*/}

El **sistema de seguimiento de incidencias** (Issue Tracking System) del helpdesk gestiona todas las solicitudes entrantes y las asigna automáticamente al personal libre del helpdesk. Permite una visión detallada del historial de interrupciones y solicitudes.

También denominado: **sistema de helpdesk** o **sistema de tickets de soporte**.

Flujo del proceso:

```text
Customer inquiry / disruption report
=> Create service ticket
=> Classify and prioritise (HW / SW / NW, urgency, impact)
=> Route to responsible team
=> Find and deliver solution
=> Document and close (incl. commercial aspects via CRM link)
```

Finalidad de la categorización y la priorización: garantizar que el equipo adecuado trate el ticket y que su gravedad pueda evaluarse correctamente.

## Base de conocimiento {/*#knowledge-base*/}

Un **sistema de apoyo al tratamiento de información basado en conocimiento** para consultas de autoservicio. El personal del helpdesk lo utiliza para encontrar rápidamente soluciones a problemas conocidos ([errores conocidos](./problem-management.md#known-error-database-kedb)).

| Ventajas                                                                                           | Desventajas                                                  |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Respuestas rápidas a problemas repetitivos                                                         | El conocimiento se queda obsoleto => requiere mucho mantenimiento |
| El conocimiento permanece en la empresa aunque el personal se marche => evita lagunas de conocimiento | No todos los problemas tienen una solución ya preparada      |
| Resolución de problemas rentable                                                                   | Menos interacción directa con el cliente                     |

## Proceso de cumplimiento de solicitudes {/*#request-fulfillment-process*/}

El subproceso **Request Fulfillment** gestiona las solicitudes de servicio (consultas de clientes). Su objetivo es procesar de forma eficiente los cambios menores (geringfügige) y las preguntas de los usuarios.

- Responsable: soporte de primer nivel
- Herramientas utilizadas: sistema de seguimiento de incidencias, base de conocimiento, manual
- Desencadenante: un cliente contacta con el soporte con una consulta de usuario
- Punto de decisión: clasificación de la consulta del usuario (Hilfestellung / Änderungswunsch / Passwortanfrage)
