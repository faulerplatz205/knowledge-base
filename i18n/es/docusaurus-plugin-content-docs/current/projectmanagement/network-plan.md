---
title: "Plan de red"
description: "Un plan de red modela las tareas de un proyecto como un grafo dirigido para identificar dependencias, calcular los tiempos más tempranos y más tardíos y determinar la ruta crítica."
keywords:
    - Plan de red
    - CPM
    - Ruta crítica
    - Planificación de proyectos
    - Gestión de proyectos
tags:
    - ap2
machine_translated: true
---

# Plan de red

## Visión general {/*#overview*/}

:::info
Existen diferentes métodos de planificación en red, como CPM (Método de la Ruta Crítica), PERT y MPM. Este artículo trata el CPM.
:::

Un plan de red es un grafo dirigido que modela las tareas como nodos y las dependencias como flechas. Permite una programación precisa y la identificación de cuellos de botella.

## Estructura de un nodo {/*#node-structure*/}

Cada nodo del plan de red contiene los siguientes campos:

```text
┌──────────────────────────┐
│         Task Name        │
├─────────────┬────────────┤
│ EAT         │ EET        │
├─────────────┼────────────┤
│ Total Float │ Free Float │
├─────────────┼────────────┤
│ LAT         │ LET        │
├─────────────┴────────────┤
|          Duration        |
└──────────────────────────┘
```

- **EAT** (Earliest Start Time, inicio más temprano): el momento más temprano en que puede comenzar la tarea
- **EET** (Earliest End Time, fin más temprano): el momento más temprano en que puede terminar la tarea
- **LAT** (Latest Start Time, inicio más tardío): el momento más tardío en que puede comenzar la tarea sin retrasar el proyecto
- **LET** (Latest End Time, fin más tardío): el momento más tardío en que puede terminar la tarea
- **Free Float (holgura libre)**: `min(EAT of all successors) − EET`; cuánto puede retrasarse una tarea sin retrasar ninguno de sus sucesores inmediatos
- **Total Float (holgura total)**: `LAT − EAT`; la cantidad de tiempo que una tarea puede retrasarse sin retrasar la fecha de fin del proyecto

## Tipos de holgura {/*#buffer-types*/}

La **holgura libre** (Free Float) describe la flexibilidad *local*: cuánto puede retrasarse una tarea antes de retrasar a alguno de sus sucesores inmediatos. Solo mira un paso hacia delante en la red.

La **holgura total** (Total Float) describe la flexibilidad *global*: cuánto puede retrasarse una tarea antes de que se vea afectada la fecha de fin global del proyecto, con independencia de los efectos intermedios.

Ambas cumplen siempre `Free Float ≤ Total Float`. Cuando `Total Float > Free Float`, un retraso mayor que la holgura libre desplaza hacia delante a un sucesor de la cadena, pero ese sucesor dispone de holgura total propia suficiente para absorber el impacto sin retrasar el fin del proyecto. Las tareas de la ruta crítica tienen ambos valores iguales a cero.

## Cálculo del plan {/*#calculating-the-plan*/}

**Pasada hacia delante** – Calcular EAT y EET de izquierda a derecha:

- EET = EAT + duración
- Si una tarea tiene varios predecesores => EAT = el máximo EET de todos los predecesores

**Pasada hacia atrás** – Calcular LAT y LET de derecha a izquierda:

- LAT = LET − duración
- Si una tarea tiene varios sucesores => LET = el mínimo LAT de todos los sucesores

## Ruta crítica {/*#critical-path*/}

La ruta crítica es la secuencia más larga de tareas dependientes desde el inicio hasta el fin del proyecto. Las tareas de la ruta crítica tienen una **holgura total de cero**, lo que significa que cualquier retraso desplaza directamente la fecha de fin global del proyecto.

## Ventajas {/*#advantages*/}

- Modela explícitamente las dependencias entre tareas
- Identifica la ruta crítica y los cuellos de botella de la programación
- Permite calcular con precisión los tiempos de inicio y fin más tempranos y más tardíos
- Más adecuado para proyectos complejos y con muchas dependencias

## Desventajas {/*#disadvantages*/}

- Más complejo de construir y de leer que un [diagrama de Gantt](./gantt.md)
- Menos intuitivo para partes interesadas sin formación técnica
- Requiere estimaciones de duración precisas para ser significativo

## Ejemplo {/*#example*/}

**Proyecto:** lanzamiento de un sitio web

| ID | Tarea                     | Duración | Predecesores |
|----|---------------------------|----------|--------------|
| A  | Análisis de requisitos    | 2 días   | —            |
| B  | Diseño de la UI           | 3 días   | A            |
| C  | Desarrollo del backend    | 5 días   | A            |
| D  | Desarrollo del frontend   | 4 días   | B            |
| E  | Integración               | 2 días   | C, D         |
| F  | Pruebas                   | 3 días   | E            |
| G  | Despliegue                | 1 día    | F            |

**Estructura de la red:**

```text
    ┌──► B ──► D ───┐
A ──┤               ├──► E ──► F ──► G
    └──► C ─────────┘
```

**Valores calculados de los nodos:**

```text
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  A: Requirements     │      │  B: UI Design        │      │  C: Backend Dev      │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  EAT: 0  │  EET: 2   │      │  EAT: 2  │  EET: 5   │      │  EAT: 2  │  EET: 7   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │      │  TF:  2  │  FF:  2   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  LAT: 0  │  LET: 2   │      │  LAT: 2  │  LET: 5   │      │  LAT: 4  │  LET: 9   │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│        Dur: 2        │      │        Dur: 3        │      │        Dur: 5        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  D: Frontend Dev     │      │  E: Integration      │      │  F: Testing          │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  EAT: 5  │  EET: 9   │      │  EAT: 9  │  EET: 11  │      │  EAT: 11 │  EET: 14  │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  LAT: 5  │  LET: 9   │      │  LAT: 9  │  LET: 11  │      │  LAT: 11 │  LET: 14  │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│        Dur: 4        │      │        Dur: 2        │      │        Dur: 3        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐
│  G: Deployment       │
├──────────┬───────────┤
│  EAT: 14 │  EET: 15  │
├──────────┼───────────┤
│  TF:  0  │  FF:  0   │
├──────────┼───────────┤
│  LAT: 14 │  LET: 15  │
├──────────┴───────────┤
│        Dur: 1        │
└──────────────────────┘
```

**Ruta crítica:** A => B => D => E => F => G (15 días en total)

La tarea C tiene una holgura total de 2 días (que aquí coincide también con su holgura libre) y no está en la ruta crítica, por lo que el desarrollo del backend puede empezar hasta 2 días tarde sin retrasar a ningún sucesor ni la fecha de fin del proyecto.
