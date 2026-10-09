---
title: Service Level Agreement (SLA)
description: "Estructura y contenido de los Service Level Agreements (SLA), Service Level Management, los roles de Service Level Manager y Service Owner, y los OLA"
keywords:
  - "SLA"
  - "Service Level Agreement"
  - "Service Level Management"
  - "OLA"
  - "Operational Level Agreement"
  - "Service Level Manager"
  - "KPI"
  - "Tiempo de respuesta"
tags:
  - ap2
machine_translated: true
---

# Service Level Agreement (SLA)

## Resumen {/*#overview*/}

Un **SLA (Service Level Agreement)** es un contrato entre un proveedor de servicios de TI y un cliente que define el alcance, la calidad y las condiciones de los servicios de TI prestados.

## Estructura típica de un SLA {/*#typical-sla-structure*/}

### 1. Descripción / alcance {/*#1-description--scope*/}

Define qué problemas de TI están cubiertos, cómo se tratan y qué canales de soporte se utilizan (teléfono, correo electrónico). También especifica el hardware y los sistemas cubiertos.

### 2. [Prioridades](./priorities.md) {/*#2-priorities*/}

Tres o más niveles de prioridad con distintos tiempos de respuesta. Ejemplo:

| Prioridad   | Tiempo de respuesta                          |
| ----------- | -------------------------------------------- |
| Prioridad 1 | 1 hora laborable, recargo por servicio urgente |
| Prioridad 2 | 5 horas laborables, prioridad estándar       |
| Prioridad 3 | 1 día laborable                              |

**Tiempo de respuesta:** el tiempo entre la notificación de la incidencia al [helpdesk](./service-requests.md) y el inicio del trabajo de resolución en el nivel de soporte responsable.

### 3. Horarios de servicio {/*#3-service-times*/}

| Día                         | Horario              |
| --------------------------- | -------------------- |
| Lun–Vie                     | 07:00–20:00          |
| Sábado                      | 09:00–18:00          |
| Domingos y festivos         | Sin servicio         |
| Horario ampliado            | Disponible bajo petición |

### 4. Idiomas {/*#4-languages*/}

Idiomas admitidos para el soporte (p. ej. alemán, inglés).

### 5. Métricas de calidad: aceptación de llamadas {/*#5-quality-metrics-call-acceptance*/}

| Métrica                        | Objetivo                                         |
| ------------------------------ | ------------------------------------------------ |
| Llamadas atendidas             | 95 % de todas las llamadas entrantes, < 5 % perdidas |
| Atendidas en 20 segundos       | 75 %                                             |
| Atendidas en 40 segundos       | 90 %                                             |
| Gestionadas mediante buzón de voz | Máx. 10 %                                     |

### 6. Métricas de calidad: resolución de problemas {/*#6-quality-metrics-problem-resolution*/}

| Métrica                                        | Objetivo                          |
| ---------------------------------------------- | --------------------------------- |
| Tiempo medio de gestión de llamadas            | Máx. 30 minutos                   |
| Informe intermedio si no se ha respondido en   | 4 horas                           |
| Tiempo medio de gestión de incidencias         | Máx. 2 horas                      |
| Tiempo máximo de gestión                       | 3 días                            |
| Tasa mínima de resolución                      | 70 % en 2 días laborables         |

### 7. Métrica de calidad: satisfacción del cliente {/*#7-quality-metric-customer-satisfaction*/}

Se mide mediante una encuesta en línea y llamadas de seguimiento (devolución de llamada y evaluación con el 10 % de los llamantes).

### 8. Informes {/*#8-reporting*/}

Revisión mensual; evaluación estadística trimestral.

### 9. Vigencia y duración {/*#9-validity-and-duration*/}

Indica la duración del SLA y cuándo se renegociará (p. ej. "válido hasta el 1 de agosto de 20xx").

### 10. Firmantes {/*#10-signatories*/}

El proveedor y el cliente firman el acuerdo.

## Service Level Management (SLM) {/*#service-level-management-slm*/}

El **SLM** garantiza que se concluyan SLA con los clientes y que los servicios se diseñen para cumplir los niveles de servicio acordados.

**Tareas:**

- Recopilar los requisitos del servicio
- Comprobar si se cumplen los niveles de servicio acordados
- Proporcionar información en Service Level Reports

## Roles {/*#roles*/}

### Service Level Manager {/*#service-level-manager*/}

El responsable del proceso de Service Level Management.

Responsabilidades:

- Negocia los SLA
- Garantiza su cumplimiento
- Garantiza que todos los procesos ITSM, los OLA y los contratos con terceros respalden los objetivos de nivel de servicio acordados
- Supervisa los niveles de servicio y elabora informes

### Service Owner (Serviceverantwortlicher) {/*#service-owner-serviceverantwortlicher*/}

Responsable de prestar un servicio de infraestructura dentro de los SLA acordados.

Responsabilidades:

- Actúa como interlocutor del Service Level Manager en la negociación de los OLA
- Suele ser un responsable que dirige un equipo de especialistas técnicos o un área de soporte interna

## OLA (Operational Level Agreement) {/*#ola-operational-level-agreement*/}

Un **OLA** es un acuerdo interno entre equipos o departamentos de TI sobre la prestación de servicios a nivel operativo. Los OLA respaldan el cumplimiento de los SLA externos.
