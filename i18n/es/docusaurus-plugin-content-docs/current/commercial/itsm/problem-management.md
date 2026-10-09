---
title: Gestión de problemas
description: "Gestión de problemas en ITSM: la distinción entre incidentes y problemas, control de problemas, control de errores, gestión proactiva de problemas y KPI clave"
keywords:
  - "Gestión de problemas"
  - "Error conocido"
  - "Base de datos de errores conocidos"
  - "Workaround"
  - "Control de problemas"
  - "Control de errores"
  - "Gestión proactiva de problemas"
  - "Análisis de causa raíz"
sidebar_position: 2
tags:
  - ap2
machine_translated: true
---

# Gestión de problemas

## Visión general {/*#overview*/}

La gestión de problemas es el **segundo nivel de la gestión de incidentes**. Mientras que la gestión de incidentes se centra en restablecer el servicio lo más rápido posible, la gestión de problemas identifica y elimina la causa raíz subyacente para evitar incidentes futuros.

## Incidente, problema y error conocido {/*#incident-vs-problem-vs-known-error*/}

| Término            | Definición                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **Incidente**      | Interrupción no planificada del servicio; la causa puede ser desconocida; se restablece el servicio con prioridad |
| **Problema**       | Uno o varios incidentes con una **causa raíz desconocida**; investigado por especialistas          |
| **Error conocido** | Un problema cuya causa raíz se conoce y para el que existe un workaround o una solución            |

Si el soporte de primer nivel no encuentra una solución, el ticket se **escala**: el incidente pasa a ser un problema gestionado por el soporte de segundo nivel.

## Las tres actividades de la gestión de problemas {/*#the-three-activities-of-problem-management*/}

### 1. Control de problemas {/*#1-problem-control*/}

Todos los problemas se analizan y documentan de forma sistemática. El objetivo es convertir causas desconocidas en **errores conocidos**.

Pasos:

1. Registrar el problema y compararlo con la base de datos de errores conocidos
2. Si ya existe un workaround o una solución => error conocido, actualizar el contador de ocurrencias
3. Clasificar el problema (categoría, subcategoría, prioridad, impacto en el negocio)
4. Analizar la causa raíz (véanse los [métodos de análisis](./analysis-methods.md))
5. Registrar el resultado como nuevo error conocido en la KEDB

### 2. Control de errores {/*#2-error-control*/}

Una vez que existe un error conocido, el control de errores gestiona el camino desde el workaround hasta la solución definitiva.

- **Workaround** proporcionado de inmediato para restablecer el servicio
- Solución definitiva iniciada mediante una **[RFC](./change-management.md#request-for-change-rfc)**
- Tras la implantación del cambio, la gestión de problemas recibe confirmación mediante una **[revisión posterior a la implantación (PIR)](./change-management.md#closing-a-change-pir)**
- Se informa al soporte de primer nivel para que pueda actualizar al cliente

### 3. Gestión proactiva de problemas {/*#3-proactive-problem-management*/}

Prevención de incidentes antes de que ocurran:

- Analizar los errores conocidos que se repiten con frecuencia (un contador de ocurrencias alto = candidato para la gestión proactiva de problemas)
- Evaluar las indicaciones del fabricante sobre futuros problemas de software/hardware
- Supervisar las advertencias y excepciones automáticas

## Workaround {/*#workaround*/}

Un **workaround** es una forma de eludir el problema, una alternativa o una solución provisional ("sortear" la incidencia) para restablecer el servicio de forma rápida y provisional mientras se aborda la causa raíz.

**Importante:** los workarounds deben marcarse claramente en el sistema como medidas temporales, de modo que la solución provisional no se convierta en un estado permanente.

**Ejemplos:**

| Fallo                                      | Workaround                                              |
| ------------------------------------------ | ------------------------------------------------------- |
| Webcam integrada defectuosa                | Conectar una cámara USB                                 |
| Dispositivo de captura de datos móvil defectuoso | Usar un dispositivo de préstamo                   |
| Puerto de red cableado defectuoso          | Usar un adaptador WLAN o un adaptador LAN               |
| Puerto DVI del monitor defectuoso          | Usar DisplayPort o HDMI si está disponible              |
| La impresora láser no arranca              | Desconectar de la corriente y reiniciar                 |
| El navegador muestra una página en blanco  | Borrar la caché del navegador o usar otro navegador     |

## Base de datos de errores conocidos (KEDB) {/*#known-error-database-kedb*/}

La KEDB almacena todos los problemas conocidos con su workaround o solución. El soporte de primer nivel la utiliza para ofrecer ayuda rápida sin escalar al segundo nivel.

Cada entrada tiene un **contador de ocurrencias** (Vorfallszähler) que registra la frecuencia con que se repite el problema. Un contador alto indica un candidato para la gestión proactiva de problemas.

## KPI clave {/*#key-kpis*/}

| KPI                                        | Significado                                                                                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Número de problemas nuevos**             | Total de problemas registrados en un período; la gestión proactiva busca minimizarlo resolviendo los errores antes de que se conviertan en incidentes        |
| **Número de incidentes por problema conocido** | Número medio de incidentes asociados al mismo problema; muestra la extensión del impacto e identifica candidatos para la gestión proactiva              |
| **Esfuerzo de resolución de problemas**    | Esfuerzo medio de trabajo para resolver un problema, desglosado por categoría; muestra qué categorías requieren más esfuerzo                                 |

## Separación entre localización y resolución de problemas {/*#separation-of-problem-localisation-and-problem-resolution*/}

La gestión de problemas localiza la causa raíz; la [gestión de cambios](./change-management.md) la resuelve. Esta separación:

- Permite concentrarse en una tarea cada vez
- Permite restablecer el servicio (workaround) antes de completar la investigación de la causa raíz
- No implica necesariamente equipos distintos, pero separa los pasos del proceso
