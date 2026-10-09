---
title: "Scrum"
description: "Scrum es un marco ágil para desarrollar productos complejos mediante iteraciones cortas, roles claros y reflexión periódica."
keywords:
    - SCRUM
    - Ágil
    - Sprints
tags:
    - ap2
machine_translated: true
---

# Scrum

## Visión general {/*#overview*/}

Scrum es un **marco ágil** para desarrollar productos complejos. Se utiliza con especial frecuencia en el desarrollo de software y se basa en iteraciones cortas llamadas **sprints**, **roles** claros y **reflexión** periódica.

---

## Los 3 roles {/*#the-3-roles*/}

Un equipo Scrum consta de un Product Owner, un Scrum Master y los Developers. Suele tener 10 miembros o menos y no tiene subequipos ni jerarquías. Estos roles también se denominan **responsabilidades** (accountabilities).

### Product Owner (PO) {/*#product-owner-po*/}

El Product Owner es la **única persona responsable del producto**. Representa los intereses de las partes interesadas.

**Tareas**:

- Mantiene y prioriza el product backlog
- Define los requisitos (historias de usuario)
- Decide qué se construirá
- Prueba los resultados

### Scrum Master {/*#scrum-master*/}

El Scrum Master es **responsable del proceso** en sí. No es un gestor tradicional, sino un **líder servidor**.

**Tareas**:

- Garantiza que Scrum se aplique correctamente
- Elimina obstáculos (impedimentos)
- Asesora al equipo
- Modera las reuniones

### Developers {/*#developers*/}

Los Developers son las personas del equipo Scrum que **implementan los requisitos**. El equipo Scrum es **autogestionado**: decide internamente quién hace qué, cuándo y cómo, sin recibir instrucciones de personas ajenas.

- Multifuncionales
- Crean el sprint backlog
- Crean al menos un incremento utilizable por sprint

---

## Los 5 eventos {/*#the-5-events*/}

### Sprint {/*#sprint*/}

Un sprint es un **periodo de tiempo fijo** durante el cual el equipo trabaja en un conjunto de tareas. Es el **latido de Scrum** y proporciona un ritmo regular para planificar, construir y revisar el trabajo.

- **Duración:** como máximo 1 mes (habitualmente de 2 a 4 semanas)
- **Objetivo:** incremento terminado y utilizable

**Importante**: durante un sprint no deben introducirse cambios que pongan en peligro el objetivo del sprint.

### Sprint Planning {/*#sprint-planning*/}

Al comienzo de cada sprint, **todo el equipo Scrum** se reúne para decidir qué trabajo se asumirá. El equipo selecciona elementos del product backlog y crea un plan de cómo entregarlos.

**Resultado**:

- Sprint Goal
- Sprint Backlog

### Daily Scrum / Daily Standup {/*#daily-scrum--daily-standup*/}

El Daily Scrum es una **reunión breve de sincronización** en la que los Developers se alinean sobre el progreso e identifican bloqueos. También se denomina «standup» porque los participantes suelen permanecer de pie durante la reunión para fomentar la brevedad y garantizar que se respete el **límite de 15 minutos**.

- **Duración:** 15 minutos
- **Participantes:** Developers

No se prescribe una estructura fija. Son habituales tres preguntas:

- ¿Qué hice ayer?
- ¿Qué hago hoy?
- ¿Hay algún obstáculo?

### Sprint Review {/*#sprint-review*/}

Al final de cada sprint, el equipo **presenta el incremento terminado** a las partes interesadas. El propósito es recoger **retroalimentación** y decidir de forma colaborativa los siguientes pasos del producto.

- Presentación de los resultados
- Retroalimentación de las partes interesadas
- Ajuste del product backlog

### Sprint Retrospective (Retro) {/*#sprint-retrospective-retro*/}

La retrospectiva es una **reunión interna** del equipo Scrum para reflexionar sobre el sprint pasado. El objetivo es identificar **mejoras concretas** para el siguiente sprint, lo que la convierte en el evento clave de la mejora continua.

Preguntas típicas:

- ¿Qué fue bien?
- ¿Qué fue mal?
- ¿Cómo podemos mejorar?

---

## Los 3 artefactos {/*#the-3-artifacts*/}

Cada artefacto tiene un **compromiso** con el que se mide su progreso: el product backlog tiene el [objetivo del producto](#product-goal), el sprint backlog el [objetivo del sprint](#sprint-goal) y el incremento la [Definition of Done](#definition-of-done-dod).

### Product Backlog {/*#product-backlog*/}

El product backlog es la **única fuente de verdad** de todo el trabajo que debe realizarse en el producto. Es un **documento vivo** que evoluciona a medida que cambian el producto y su entorno.

- Una lista priorizada de todos los requisitos
- Mantenida por el Product Owner
- Entradas mayoritariamente en forma de historias de usuario (p. ej. «Como usuario, quiero X para que Y»)

### Sprint Backlog {/*#sprint-backlog*/}

El sprint backlog contiene el **subconjunto del product backlog** seleccionado para el sprint actual, el [objetivo del sprint](#sprint-goal) y un plan para entregar los elementos seleccionados.

- Rellenado con tareas para el sprint actual
- Creado por los Developers
- Concreto y factible

### Incremento {/*#increment*/}

Un incremento es un **paso concreto** hacia el [objetivo del producto](#product-goal) y se suma a todos los incrementos anteriores. Pueden crearse varios incrementos dentro de un sprint y su suma se presenta en la sprint review. Cada incremento debe estar en un **estado utilizable**, con independencia de si el Product Owner decide publicarlo.

- Componente de producto terminado y probado
- Debe cumplir la [Definition of Done (DoD)](#definition-of-done-dod)

---

## Términos importantes {/*#important-terms*/}

### Definition of Done (DoD) {/*#definition-of-done-dod*/}

La Definition of Done es un **acuerdo compartido** dentro del equipo que define criterios claros para considerar «terminado» un elemento del backlog. Garantiza una **calidad coherente** e impide que se entregue trabajo incompleto.

**Ejemplo**:

- Código escrito
- Pruebas en verde
- Revisión realizada
- Documentación actualizada

### Objetivo del producto (Product Goal) {/*#product-goal*/}

El objetivo del producto describe un **estado futuro del producto** y sirve como meta a largo plazo del equipo Scrum. El equipo Scrum persigue exactamente un objetivo del producto a la vez. Debe cumplirse o abandonarse antes de asumir el siguiente.

### Objetivo del sprint (Sprint Goal) {/*#sprint-goal*/}

El objetivo del sprint es una **meta global** que da al equipo una dirección compartida durante el sprint. Debe describir un **resultado significativo** en lugar de una lista de tareas.

No «completar 5 tickets», sino, por ejemplo:

- «Los usuarios pueden registrarse e iniciar sesión»
- «Los usuarios pueden dar su opinión con un botón específico»

### Velocity (velocidad) {/*#velocity*/}

La velocity mide el **número medio de story points** que completa un equipo por sprint. Se utiliza como **herramienta de planificación** para pronosticar cuánto trabajo puede asumirse de forma realista en futuros sprints. No es una herramienta para clasificar el rendimiento.

### Story Points {/*#story-points*/}

Los story points son una **unidad de estimación relativa** utilizada para expresar el esfuerzo global necesario para implementar un elemento del backlog. En lugar de estimar en horas, los equipos **comparan los elementos entre sí**.

- A menudo Fibonacci (1, 2, 3, 5, 8, 13, ...)
- Tienen en cuenta la complejidad, el riesgo y el esfuerzo

---

## Proceso típico de un sprint {/*#typical-sprint-process*/}

1. [Sprint Planning](#sprint-planning)
2. Desarrollo + [Daily Standups](#daily-scrum--daily-standup)
3. [Sprint Review](#sprint-review)
4. [Sprint Retro](#sprint-retrospective-retro)
5. Nuevo sprint

---

## Ventajas y desventajas de Scrum {/*#pros-and-cons-of-scrum*/}

### Ventajas {/*#pros*/}

- Entrega rápida de valor
- Gran flexibilidad
- Retroalimentación temprana por parte de las partes interesadas
- Transparencia
- Mejora continua

### Desventajas {/*#cons*/}

En la práctica, Scrum se implementa a menudo de forma incorrecta. Esto conduce a antipatrones frecuentes:

- Rol del Product Owner malinterpretado
- Scrum Master como «minijefe»
- Daily como reunión de estado larga para directivos
- Ausencia de autogestión real
- «Hacemos Scrum, pero...»

---

## Diferencia con la gestión de proyectos tradicional (p. ej. modelo en cascada) {/*#difference-from-traditional-project-management-eg-waterfall-model*/}

| Cascada                            | Scrum                                   |
| ---------------------------------- | --------------------------------------- |
| Planificación fija al principio    | Enfoque iterativo                       |
| Los cambios son costosos           | Los cambios están previstos             |
| Una única entrega                  | Actualizaciones periódicas mediante incrementos |
| Jerarquía fuerte                   | Autogestionado                          |
