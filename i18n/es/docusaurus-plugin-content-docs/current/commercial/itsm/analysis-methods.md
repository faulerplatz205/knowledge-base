---
title: Métodos de análisis de problemas
description: "Métodos clave para el análisis de problemas de TI: el método de los 5 porqués, el diagrama de Ishikawa, el ciclo DMAIC y la matriz causa-efecto"
keywords:
  - "Método de los 5 porqués"
  - "Diagrama de Ishikawa"
  - "Diagrama de espina de pescado"
  - "DMAIC"
  - "Análisis de causa raíz"
  - "Análisis de problemas"
  - "Matriz causa-efecto"
tags:
  - ap2
machine_translated: true
---

# Métodos de análisis de problemas

## Resumen {/*#overview*/}

Estos métodos se utilizan en la [gestión de problemas](./problem-management.md) para encontrar de forma sistemática la causa raíz de un problema.

## Método de los 5 porqués (5-W-Methode) {/*#5-why-method-5-w-methode*/}

**Objetivo:** Encontrar la causa raíz de un problema preguntando "¿Por qué?" repetidamente, de modo que cada respuesta se convierte en la siguiente pregunta. Normalmente bastan cinco iteraciones.

**Ejemplo (problema de impresora):**

| Paso     | Pregunta                                         | Respuesta                                                                |
| -------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| Problema | La impresora no imprime con claridad             |                                                                          |
| ¿Por qué? | ¿Por qué no imprime con claridad la impresora?  | No muestra todos los caracteres con claridad / la salida no es legible   |
| ¿Por qué? | ¿Por qué no muestra todos los caracteres con claridad? | La tinta o el tóner es de mala calidad                             |
| ¿Por qué? | ¿Por qué es mala la tinta o el tóner?           | Se mancha y a veces no imprime en absoluto                               |
| ¿Por qué? | ¿Por qué se mancha y a veces no imprime?        | La calidad del tóner es baja                                             |
| ¿Por qué? | ¿Por qué es baja la calidad del tóner?          | **Se compró el tóner más barato** (causa raíz)                           |

## Diagrama de Ishikawa (diagrama de espina de pescado) {/*#ishikawa-diagram-fishbone-diagram*/}

El **diagrama de Ishikawa** (también llamado **diagrama causa-efecto** o **diagrama de espina de pescado**) fue desarrollado por el científico japonés Kaoru Ishikawa en la década de 1940. Visualiza las causas de un problema.

**Estructura:**

- Flecha horizontal que apunta hacia la derecha => **Descripción del problema en la punta** (el efecto)
- Flechas diagonales que parten de la línea horizontal => **Categorías principales de influencia** (las "espinas")
- Flechas más pequeñas que parten de las espinas diagonales => **Causas secundarias** (Nebenursachen)

**Significado de las flechas:** cada flecha "contribuye al" efecto descrito en la punta.

### Categorías principales de influencia (8M) {/*#main-influence-categories-8m*/}

- Categoría
- Material
- Personas
- Máquina
- Método
- Gestión
- Entorno
- Medición
- Dinero

Según el problema, también son posibles otras categorías de influencia.

### Creación de un diagrama de Ishikawa {/*#creating-an-ishikawa-diagram*/}

1. Escribir la descripción del problema en la punta de la flecha horizontal (extremo derecho)
2. Definir las categorías principales de influencia (8M)
3. Encontrar las causas principales mediante una lluvia de ideas en equipo (dibujadas como flechas paralelas al eje horizontal)
4. Encontrar las causas secundarias de cada causa principal (dibujadas como flechas diagonales que parten de la flecha de la causa principal)

## Ciclo DMAIC {/*#dmaic-cycle*/}

El **ciclo DMAIC** se utiliza para problemas y proyectos complejos. El acrónimo corresponde a las cinco fases:

| Fase        | Pregunta clave                        | Métodos / herramientas                                                                                                                  |
| ----------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Define**  | ¿Cuál es el problema?                 | Comentarios de clientes, definición del problema, alcance, análisis de KPI, matriz RACI                                                 |
| **Measure** | ¿Qué magnitud tiene el problema?      | Análisis de la situación IST, revisión del [SLA](./sla.md), aclaración del nivel de escalado                                            |
| **Analyse** | ¿Cuáles son las causas raíz?          | Método de los 5 porqués, encuestas a clientes, [base de datos de errores](./problem-management.md#known-error-database-kedb), diagrama de Ishikawa |
| **Improve** | ¿Puede desarrollarse una solución?    | Simulaciones, pruebas, matriz de soluciones, diagrama de Ishikawa                                                                       |
| **Control** | ¿Puede asegurarse la mejora?          | Monitorización, sistema de gestión de servicios                                                                                         |

## Problemlösungsmatrix / Ursachen-Wirkungs-Matrix {/*#problemlösungsmatrix--ursachen-wirkungs-matrix*/}

La **matriz causa-efecto** (basada en el método Kepner-Tregoe) analiza un problema en cuatro dimensiones para acotar sistemáticamente la causa raíz comparando lo que ES con lo que NO ES:

| Dimensión                       | ES (el problema)                              | NO ES (el problema)                     | Desviación                                         | Posible causa                |
| ------------------------------- | --------------------------------------------- | --------------------------------------- | -------------------------------------------------- | ---------------------------- |
| **Identificar (Qué)**           | ¿Cuál es el problema?                         | ¿Cuál NO es el problema?                | ¿Cuál es la diferencia entre el estado ES y el estado objetivo? | ¿Cuál es la posible causa? |
| **Localizar (Dónde)**           | ¿Dónde se produce el problema?                | ¿Dónde NO se produce?                   | ¿Qué es distinto en ese lugar?                     | ¿Cuál es la posible causa?   |
| **Tiempo (Cuándo)**             | ¿Cuándo apareció el problema?                 | ¿Cuándo NO apareció?                    | ¿Qué era distinto en ese momento?                  | ¿Cuál es la posible causa?   |
|                                 | ¿En qué periodo se identificó el problema?    | ¿En qué periodo NO apareció?            | ¿Qué era distinto durante ese periodo?             |                              |
| **Significancia (Cuánto)**      | ¿Qué magnitud / extensión tiene el problema?  | ¿Qué tan pequeño o limitado es?         | ¿Cuál es la diferencia en el alcance?              | ¿Cuál es la posible causa?   |
|                                 | ¿Cuántas (unidades) están afectadas?          | ¿Cuántas (unidades) NO están afectadas? |                                                    |                              |
|                                 | ¿Qué parte está afectada?                     | ¿Qué parte NO está afectada?            |                                                    |                              |
