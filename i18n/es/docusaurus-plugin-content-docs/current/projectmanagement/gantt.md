---
title: "Diagrama de Gantt"
description: "Un diagrama de Gantt es un gráfico de barras horizontal utilizado para visualizar el cronograma de un proyecto, mostrando las tareas, sus duraciones y su línea temporal."
keywords:
    - Diagrama de Gantt
    - Planificación de proyectos
    - Gestión de proyectos
tags:
    - ap2
machine_translated: true
---

# Diagrama de Gantt

## Visión general {/*#overview*/}

Un diagrama de Gantt es un gráfico de barras horizontal que visualiza el cronograma de un proyecto a lo largo del tiempo. Es una de las herramientas más utilizadas para comunicar los plazos de un proyecto a los equipos y a las partes interesadas.

## Estructura {/*#structure*/}

- **Filas**: tareas individuales o paquetes de trabajo
- **Columnas**: escala temporal (días, semanas, meses)
- **Barras**: duración de las tareas individuales según sus fechas de inicio y fin
- **Dependencias**: las flechas o los solapamientos pueden indicar dependencias entre tareas

## Características {/*#characteristics*/}

- Fácil de entender y de crear, incluso para partes interesadas sin formación técnica
- Muy adecuado para proyectos a corto plazo con un número manejable de tareas
- Se centra en la planificación temporal en lugar de en la asignación de recursos
- Se utiliza normalmente en proyectos en cascada o por fases
- Representación estática: refleja una instantánea planificada, no el progreso en tiempo real

## Ventajas {/*#advantages*/}

- Fácil de leer y de comunicar a las partes interesadas
- Ofrece una visión clara del cronograma global del proyecto
- Muestra qué tareas se ejecutan en paralelo y cuáles de forma secuencial
- Sencillo de crear y mantener en proyectos pequeños y medianos

## Desventajas {/*#disadvantages*/}

- No identifica la ruta crítica
- Puede volverse inmanejable en proyectos grandes con muchas tareas
- Los cambios en una tarea exigen ajustar manualmente las tareas dependientes

## Ejemplo {/*#example*/}

Un equipo pequeño debe construir una página de aterrizaje para el lanzamiento de un producto en cinco semanas. El director del proyecto crea un diagrama de Gantt para planificar el cronograma:

1. **Requisitos** (semana 1): el equipo recopila los requisitos del departamento de marketing, define el contenido de la página y acuerda el alcance
2. **Diseño** (semanas 1 a 2): el equipo de diseño empieza a crear maquetas mientras se ultiman los requisitos, solapándose ligeramente con la primera fase
3. **Implementación** (semanas 2 a 4): una vez clara la dirección del diseño, los desarrolladores comienzan a construir la página. Es la fase más larga
4. **Pruebas** (semana 4): el equipo de QA comienza a probar las secciones terminadas mientras el desarrollo continúa
5. **Despliegue** (semana 5): tras la aprobación final, la página se despliega en producción antes de la fecha de lanzamiento

El diagrama de Gantt permite al equipo ver fácilmente qué fases se solapan, dónde se producen los traspasos y si el plazo de cinco semanas es realista.

```text
| Task           |  Week 1 | Week 2 | Week 3 | Week 4  | Week 5 |
| -------------- | ------- | ------ | ------ | ------- | ------ |
| Requirements   |███████  |        |        |         |        |
| Design         |     ████|████    |        |         |        |
| Implementation |         |  ██████|████████|█████    |        |
| Testing        |         |        |        |  ███████|        |
| Deployment     |         |        |        |         |████████|
```
