---
title: Gestión de incidentes
description: "Gestión de incidentes en ITSM: elementos de configuración, categorización, priorización, el registro de incidentes, incidentes mayores y niveles de soporte"
keywords:
  - "Gestión de incidentes"
  - "Elemento de configuración"
  - "CI"
  - "Registro de incidentes"
  - "Incidente mayor"
  - "Soporte de primer nivel"
  - "Solicitud de servicio"
  - "Sistema de seguimiento de incidencias"
sidebar_position: 1
tags:
  - ap2
machine_translated: true
---

# Gestión de incidentes

## Resumen {/*#overview*/}

La **gestión de incidentes** es el **primer nivel de ITSM** y se centra en ayudar a los usuarios a retomar su trabajo lo antes posible tras una interrupción de TI.

## Elementos de configuración (CI) {/*#configuration-items-ci*/}

Un **elemento de configuración (Configuration Item, CI)** es un término amplio que abarca prácticamente todo el hardware y el software. Los CI se caracterizan por atributos y están vinculados a otros CI.

| Categoría                 | Ejemplos                                                         |
| ------------------------- | ---------------------------------------------------------------- |
| Sistemas de hardware      | PC, portátil, servidor, thin client                              |
| Componentes de hardware   | Tarjetas gráficas, tarjetas de red, discos duros, procesadores   |
| Componentes de software   | Sistemas operativos, software de aplicación                      |
| Componentes de red        | Router, switch, hub, repetidor, panel de conexiones, NAS         |
| Dispositivos periféricos  | Impresora, escáner, webcam                                       |
| Dispositivos móviles      | Tableta, smartphone, dispositivos de captura de datos            |

## Definición de incidente {/*#incident-definition*/}

Un **incidente** es cualquier interrupción no planificada o reducción de la calidad de un servicio de TI. También cuenta como incidente un suceso que pudiera afectar en el futuro a un servicio de TI. Esto incluye sucesos menores, como sustituir un cartucho de tóner vacío.

**Objetivo principal: restablecer el servicio afectado lo antes posible.**

## Categorización {/*#categorisation*/}

Los incidentes se categorizan al registrarse por primera vez en el sistema de seguimiento de incidencias:

- **HW** = Problema de hardware
- **SW** = Problema de software
- **NW** = Problema de red

Finalidad: garantiza que el equipo adecuado sea responsable y que la gravedad pueda evaluarse correctamente.

## Priorización {/*#prioritisation*/}

La priorización viene determinada por dos factores:

- **Urgencia (Dringlichkeit)**: ¿Con qué gravedad afecta la interrupción al objetivo del usuario?
- **Impacto (Auswirkung)**: ¿A cuántas personas afecta la interrupción?

La combinación de [urgencia e impacto](./priorities.md#itil-priority-matrix) determina el orden en que se procesan los tickets entrantes.

## Niveles de soporte {/*#support-levels*/}

| Nivel                         | Descripción                                                                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Soporte de primer nivel**   | Helpdesk / SPOC; gestiona incidencias sencillas con la base de conocimiento y actúa como "cortafuegos" del soporte de segundo nivel al encargarse de la comunicación directa con el cliente |
| **Soporte de segundo nivel**  | Expertos en análisis de causa raíz ([gestión de problemas](./problem-management.md)); reevalúan la prioridad inicial fijada por el primer nivel                                  |
| **Soporte de tercer nivel**   | Soporte del fabricante o especialistas externos cuando el segundo nivel no puede resolver la incidencia                                                                          |

## Registro de incidentes {/*#incident-record*/}

El **registro de incidentes (Incident Record)** es un documento que contiene toda la información sobre un incidente y documenta su ciclo de vida desde el registro inicial hasta la resolución. Es un documento informativo que no debe modificarse una vez cerrada la instancia del proceso.

Los 17 componentes estándar:

1. ID / identificador
2. Registro inicial (fecha/hora)
3. Tipo de notificación
4. Agente del service desk
5. Datos del notificante/usuario
6. Canal de comunicación
7. **Descripción del síntoma** (el campo más importante; ayuda a diagnosticar y a buscar soluciones)
8. Usuarios, ubicaciones y/o áreas de negocio afectados
9. Servicios afectados
10. Priorización
11. Referencias a CI
12. Categoría del incidente
13. Enlaces a otros registros de incidentes
14. Enlaces a registros de problemas
15. Historial de estados del incidente
16. Historial de actividades / tareas
17. Datos de resolución y cierre

**Los 5 campos principales que siempre deben registrarse:** priorización, categoría del incidente, ID, usuario/servicio afectado, canal de comunicación.

## Incidente mayor {/*#major-incident*/}

Un **incidente mayor (Major Incident)** es un suceso de alta prioridad y gran impacto que provoca una caída crítica de un servicio o una interrupción masiva que afecta de forma significativa a las operaciones del negocio. Normalmente se le asigna la prioridad "Crítica" o "Alta".

Características:

- Resulta afectado un número significativo de clientes o grupos de clientes importantes
- Los costes y las pérdidas para los clientes y/o la organización de servicio son considerables
- Es probable que se dañe la reputación del proveedor de servicios
- El trabajo y el tiempo necesarios para resolver el incidente son probablemente grandes, y es probable que se incumplan los acuerdos [SLA](./sla.md) existentes

## Solicitud de servicio frente a incidente {/*#service-request-vs-incident*/}

|                  | Solicitud de servicio                                                            | Incidente                                        |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Desencadenante** | El usuario contacta activamente con el soporte con una pregunta o un deseo     | Interrupción no planificada del servicio         |
| **Ejemplos**     | Contraseña olvidada, consulta sobre software, configuración de un nuevo puesto de trabajo | Falla la impresora, ERP inaccesible, ransomware |
| **Gestionado por** | Normalmente se resuelve por completo en el soporte de primer nivel             | Puede requerir escalado al nivel 2/3             |
| **Proceso**      | Request Fulfillment                                                              | Gestión de incidentes                            |
