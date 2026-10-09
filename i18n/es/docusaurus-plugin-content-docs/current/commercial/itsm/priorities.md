---
title: Priorización en el soporte de TI
description: "La matriz de prioridades de ITIL (urgencia x impacto) y la matriz de Eisenhower como herramientas para priorizar incidentes y tareas en el soporte de TI"
keywords:
  - "Matriz de prioridades de ITIL"
  - "Urgencia"
  - "Impacto"
  - "Matriz de Eisenhower"
  - "Priorización"
  - "Prioridad de incidentes"
  - "Tiempo de respuesta"
  - "SLA"
tags:
  - ap2
machine_translated: true
---

# Priorización en el soporte de TI

## Visión general {/*#overview*/}

En el soporte de TI se utilizan dos herramientas principales para la priorización: la **matriz de prioridades de ITIL** y la **matriz de Eisenhower**.

## Matriz de prioridades de ITIL {/*#itil-priority-matrix*/}

### Niveles de urgencia {/*#urgency-levels*/}

| Nivel          | Descripción                                                                                                                                                                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alta (H)**   | El daño causado por el incidente aumenta rápidamente. Las tareas que no pueden cumplirse son muy críticas en cuanto al tiempo. Una actuación rápida puede evitar que un incidente menor se convierta en un [incidente mayor](./incident-management.md#major-incident). Se ven afectados varios usuarios VIP. |
| **Media (M)**  | El daño aumenta con el tiempo. Las tareas que no pueden cumplirse son solo moderadamente críticas en cuanto al tiempo. Se ve afectado un usuario VIP.                                                                                                                                              |
| **Baja (N)**   | El daño no aumenta con el tiempo. Las tareas que no pueden cumplirse no son críticas en cuanto al tiempo.                                                                                                                                                                                          |

### Niveles de impacto {/*#impact-levels*/}

| Nivel          | Descripción                                                                                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alto (H)**   | Gran número de empleados afectados y/o incapaces de cumplir sus tareas. Gran número de clientes afectados o sustancialmente perjudicados. Daño financiero probable > 10.000 EUR. Daño reputacional probable a gran escala. Riesgo para la vida y la integridad física.                        |
| **Medio (M)**  | Número moderado de empleados afectados y/o incapaces de cumplir las tareas según lo planificado. Número moderado de clientes afectados o con restricciones de comodidad. Daño financiero probable de 1.000–10.000 EUR. Daño reputacional moderado probable.                                  |
| **Bajo (N)**   | Número mínimo de empleados afectados; pueden seguir cumpliendo sus tareas, aunque con un esfuerzo adicional. Número mínimo de clientes afectados; solo restricciones de comodidad menores. Daño financiero probable < 1.000 EUR. Solo se espera un daño reputacional mínimo.                  |

### Matriz de prioridades {/*#priority-matrix*/}

La **matriz urgencia x impacto** produce un nivel de prioridad de 1 (más crítico) a 5 (más bajo):

|                | **Impacto H** | **Impacto M** | **Impacto N** |
| -------------- | ------------- | ------------- | ------------- |
| **Urgencia H** | **1**         | 2             | 3             |
| **Urgencia M** | 2             | **3**         | 4             |
| **Urgencia N** | 3             | 4             | **5**         |

### Códigos de prioridad y tiempos de respuesta/resolución del [SLA](./sla.md) {/*#priority-codes-and-sla-responseresolution-times*/}

| Prioridad | Descripción                  | Tiempo de respuesta | Tiempo de resolución |
| --------- | ---------------------------- | ------------------- | -------------------- |
| **1**     | Kritisch (crítica)           | Inmediato           | 1 hora               |
| **2**     | Hoch (alta)                  | 10 minutos          | 4 horas              |
| **3**     | Mittel (media)               | 1 hora              | 8 horas              |
| **4**     | Niedrig (baja)               | 4 horas             | 24 horas             |
| **5**     | Sehr niedrig (muy baja)      | 1 día               | 1 semana             |

## Matriz de Eisenhower {/*#eisenhower-matrix*/}

La **matriz de Eisenhower** es un método de gestión del tiempo para distinguir entre tareas importantes y urgentes. Debe su nombre al presidente estadounidense Dwight D. Eisenhower (1953–1961). También se conoce como método de los cuatro cuadrantes, método Eisenhower o caja de Eisenhower.

**Objetivo:** no hacer las cosas bien, sino hacer las cosas correctas (eficacia, no solo eficiencia).

Dos preguntas por tarea:

1. ¿Qué importancia tiene la tarea?
2. ¿Qué urgencia tiene la tarea?

### Los cuatro cuadrantes {/*#the-four-quadrants*/}

|                    | **Urgente**                              | **No urgente**                                    |
| ------------------ | ---------------------------------------- | ------------------------------------------------- |
| **Importante**     | **A: Hacer** (de inmediato, en persona)  | **B: Programar** (planificar y fijar un plazo)    |
| **No importante**  | **C: Delegar** (o automatizar)           | **D: Descartar** (archivar o eliminar)            |

### Principios {/*#principles*/}

- Las tareas importantes son las que están directamente relacionadas con los objetivos definidos
- Las tareas urgentes no toleran demora y deberían tratarse de inmediato en la medida de lo posible
- Tareas importantes Y urgentes: se resuelven personalmente, lo más rápido posible
- Tareas urgentes pero NO importantes: se delegan o automatizan si es posible; de lo contrario, se tratan después de las tareas A
- Tareas importantes pero NO urgentes: se planifican y programan; tienen menor prioridad que las tareas A
- Tareas que no son ni importantes ni urgentes: no se procesan; se archivan o eliminan según corresponda

## Comparación: matriz de ITIL frente a matriz de Eisenhower {/*#comparison-itil-matrix-vs-eisenhower-matrix*/}

| Criterio              | Matriz de prioridades de ITIL                                                                                                          | Matriz de Eisenhower                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **Finalidad**         | Priorización de [incidentes](./incident-management.md)/[problemas](./problem-management.md)/[cambios](./change-management.md) de TI   | Priorización de tareas personales o de equipo       |
| **Dimensiones**       | Urgencia x impacto (orientada al negocio)                                                                                              | Urgencia x importancia (orientada a objetivos)      |
| **Escala**            | 5 niveles de prioridad con tiempos de [SLA](./sla.md) definidos                                                                        | 4 cuadrantes con acciones                           |
| **Más adecuada para** | Service Desk de TI, equipos estructurados                                                                                              | Autogestión, organización general de tareas         |
| **Aplicabilidad**     | Objetiva, estandarizada, escalable                                                                                                     | Más sencilla, más flexible, menos estructurada      |
