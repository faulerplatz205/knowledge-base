---
title: "Diagrama de actividades"
description: "Diagramas de actividades UML: notación, acciones, flujo de control, decisión y fusión, bucles, bifurcación y unión, calles (swimlanes) y correspondencia de los elementos con las estructuras de control de un programa."
keywords:
    - UML
    - Diagrama de actividades
    - Flujo de control
    - Nodo de decisión
    - Nodo de fusión
    - Bifurcación y unión
    - Swimlane
    - Partición
    - Modelado de procesos
    - Diagrama de comportamiento
tags:
    - ap2
machine_translated: true
---

# Diagrama de actividades

## Visión general {/*#overview*/}

Un diagrama de actividades es un diagrama UML de **comportamiento**. Describe un proceso como una secuencia de acciones conectadas por flujos de control, con ramificaciones, bucles y pasos que se ejecutan en paralelo.

Aplicaciones típicas:

- Modelado de un proceso de negocio que atraviesa varios departamentos o sistemas
- Descripción de un algoritmo antes de implementarlo, con independencia del lenguaje
- Detalle de los pasos de un único caso de uso
- Documentación de un flujo de trabajo existente para su revisión con partes interesadas no técnicas

---

## Notación {/*#notation*/}

| Elemento             | Notación                                              | Significado                                                                  |
| -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| Nodo inicial         | Círculo relleno `●`                            | Inicio de la actividad, exactamente uno por diagrama                         |
| Acción               | Rectángulo redondeado                                 | Un paso de trabajo indivisible, nombrado *verbo + objeto*                    |
| Actividad (llamada)  | Rectángulo redondeado con símbolo de rastrillo        | Un paso que se desglosa en un diagrama propio                                |
| Flujo de control     | Flecha continua                                       | Orden de ejecución, conduce de una acción a la siguiente                     |
| Guarda               | `[condition]` escrita sobre un flujo              | Condición bajo la cual puede seguirse ese flujo                              |
| Nodo de decisión     | Rombo, una entrada y varias salidas                   | Ramificación, los flujos de salida llevan guardas mutuamente excluyentes     |
| Nodo de fusión       | Rombo, varias entradas y una salida                   | Reúne caminos alternativos, **no** espera                                    |
| Bifurcación (fork)   | Barra gruesa, una entrada y varias salidas            | Divide el flujo en flujos concurrentes                                       |
| Unión (join)         | Barra gruesa, varias entradas y una salida            | Espera hasta que hayan llegado todos los flujos de entrada                   |
| Final de actividad   | Círculo relleno dentro de un anillo `◉`        | Termina toda la actividad, incluidos los caminos que aún se ejecutan         |
| Final de flujo       | Círculo con una cruz `⊗`                       | Termina solo el camino que llega allí, la actividad continúa                 |
| Nodo de objeto       | Rectángulo simple sobre un flujo                      | Datos que pasan de una acción a la siguiente                                 |
| Partición            | Calle con etiqueta                                    | El actor, rol o sistema responsable de las acciones de esa calle             |
| Nota                 | Rectángulo con esquina doblada sobre una línea discontinua | Comentario sin semántica                                                |

Reglas de nomenclatura que mantienen legible un diagrama:

- Las acciones se nombran *verbo + objeto*: `Validate order`, no `Order` ni `Validation`
- Las guardas se escriben entre corchetes directamente sobre el flujo, nunca dentro de la acción
- El caso restante de una ramificación se etiqueta `[else]` en lugar de una condición negada

---

## Elementos básicos {/*#building-blocks*/}

### Secuencia {/*#sequence*/}

Acciones ejecutadas una tras otra. El flujo sale del nodo inicial, pasa por cada acción y termina en el nodo final de actividad.

```text
          ●
          │
          ▼
 ╭─────────────────╮
 │  Receive order  │
 ╰─────────────────╯
          │
          ▼
 ╭─────────────────╮
 │   Check stock   │
 ╰─────────────────╯
          │
          ▼
          ◉
```

### Decisión y fusión {/*#decision-and-merge*/}

Un nodo de decisión divide el flujo en alternativas. Se toma exactamente un flujo de salida, por lo que las guardas deben ser mutuamente excluyentes y cubrir todos los casos posibles. Un nodo de fusión reúne de nuevo las alternativas: deja pasar cada camino que llega y nunca espera.

```text
                    │
                    ▼
              ╱───────────╲
             ╱   amount    ╲
             ╲   > 100 ?   ╱
              ╲───────────╱
               │         │
        [yes]  │         │ [no]
        ┌──────┘         └──────┐
        │                       │
        ▼                       ▼
╭───────────────╮       ╭───────────────╮
│Apply discount │       │  Keep price   │
╰───────────────╯       ╰───────────────╯
        │                       │
        └──────┐         ┌──────┘
               ▼         ▼
              ╱───────────╲
             ╱             ╲
             ╲             ╱
              ╲───────────╱
                    │
                    ▼
```

Una ramificación con más de dos resultados utiliza un único nodo de decisión con varios flujos con guarda, lo que se corresponde con `if / else if / else` o con una sentencia `switch`. El nodo de fusión sigue siendo un único rombo, independientemente de cuántos caminos desemboquen en él.

### Bucle {/*#loop*/}

Un bucle es un flujo de control que vuelve a un punto anterior del diagrama. En el diagrama siguiente la decisión se sitúa *después* de la acción, por lo que el cuerpo se ejecuta al menos una vez, lo que se corresponde con un bucle `do … while`.

```text
              ●
              │
              ▼
     ╭─────────────────╮
┌───►│   Read record   │
│    ╰─────────────────╯
│             │
│             ▼
│       ╱───────────╲
│      ╱    more     ╲
│      ╲  records ?  ╱
│       ╲───────────╱
│        │         │
│  [yes] │         │ [no]
└────────┘         ▼
                   ◉
```

Si la decisión se sitúa *antes* de la acción, con la arista de retorno entrando por encima, la misma estructura se convierte en un bucle `while` controlado por la cabecera, cuyo cuerpo puede ejecutarse cero veces.

### Bifurcación y unión {/*#fork-and-join*/}

Una bifurcación divide un flujo en varios flujos que se ejecutan de forma concurrente. Una unión espera hasta que hayan llegado todos los flujos de entrada y solo entonces continúa como un único flujo. Sin unión, la actividad podría terminar mientras aún se ejecutan pasos paralelos.

```text
                  │
                  ▼
        ━━━━━━━━━━━━━━━━━━━━━
        │                   │
        ▼                   ▼
╭─────────────────╮ ╭─────────────────╮
│  Reserve stock  │ │   Charge card   │
╰─────────────────╯ ╰─────────────────╯
        │                   │
        ▼                   ▼
        ━━━━━━━━━━━━━━━━━━━━━
                  │
                  ▼
```

Concurrente en UML significa *sin un orden prescrito*, no necesariamente *al mismo tiempo en procesadores distintos*. Si las dos ramas se ejecutan en dos hilos o simplemente en una secuencia arbitraria es una decisión de implementación.

---

## Particiones (swimlanes) {/*#partitions-swimlanes*/}

Una partición agrupa las acciones según el actor, rol, departamento o sistema que las lleva a cabo. Las calles pueden dibujarse en vertical o en horizontal, y el flujo cruza los límites de las calles sin más.

Reglas que conviene tener presentes:

- Una acción pertenece exactamente a una calle, la calle es la respuesta a *quién hace esto*
- Los nodos de decisión y de fusión pertenecen a la calle del actor que decide
- Una bifurcación puede abarcar varias calles, así es precisamente como se representa el trabajo paralelo de distintos actores
- El número de cruces de calles es una medida aproximada del esfuerzo de coordinación del proceso

---

## Correspondencia con el código {/*#mapping-to-code*/}

| Diagrama de actividades                          | Construcción del programa                        |
| ------------------------------------------------ | ------------------------------------------------ |
| Acciones en secuencia                            | Sentencias una tras otra                         |
| Decisión con dos guardas más fusión              | `if / else`                                      |
| Decisión con varias guardas más `[else]`         | `if / else if / else` o `switch`                |
| Arista de retorno con la decisión tras el cuerpo | `do … while`                                     |
| Arista de retorno con la decisión antes del cuerpo | `while` o `for`                                 |
| Bifurcación y unión                              | Hilos, tareas, `Promise.all`, stream paralelo   |
| Actividad llamada                                | Llamada a método o función                       |
| Nodo de objeto entre dos acciones                | Valor de retorno pasado como parámetro           |
| Final de actividad                               | Fin del método, `return`                      |
| Final de flujo                                   | Un camino termina mientras el resto sigue ejecutándose |

---

## Ejemplo: procesamiento de un pedido en línea {/*#example-processing-an-online-order*/}

Intervienen tres particiones: el cliente, el sistema de la tienda y el almacén. La tienda valida el pedido, un pedido no válido se rechaza y uno válido es preparado y enviado por el almacén.

```text
      Customer       │       Shop System        │      Warehouse
─────────────────────┼──────────────────────────┼─────────────────────
          ●          │                          │
          │          │                          │
          ▼          │                          │
 ╭─────────────────╮ │                          │
 │   Place order   │ │                          │
 ╰─────────────────╯ │                          │
          │          │                          │
          └──────────┼────────────┐             │
                     │            │             │
                     │            ▼             │
                     │   ╭─────────────────╮    │
                     │   │ Validate order  │    │
                     │   ╰─────────────────╯    │
                     │            │             │
                     │            ▼             │
                     │      ╱───────────╲       │
                     │     ╱    order    ╲      │
                     │     ╲   valid ?   ╱      │
                     │      ╲───────────╱       │
                     │       │         │        │
                     │ [no]  │         │ [yes]  │
          ┌──────────┼───────┘         └────────┼──────────┐
          │          │                          │          │
          ▼          │                          │          ▼
 ╭─────────────────╮ │                          │ ╭─────────────────╮
 │ Read rejection  │ │                          │ │   Pick items    │
 ╰─────────────────╯ │                          │ ╰─────────────────╯
          │          │                          │          │
          ▼          │                          │          ▼
          ◉          │                          │ ╭─────────────────╮
                     │                          │ │   Ship parcel   │
                     │                          │ ╰─────────────────╯
                     │                          │          │
          ┌──────────┼──────────────────────────┼──────────┘
          │          │                          │
          ▼          │                          │
 ╭─────────────────╮ │                          │
 │ Receive parcel  │ │                          │
 ╰─────────────────╯ │                          │
          │          │                          │
          ▼          │                          │
          ◉          │                          │
```

Lo que muestra este ejemplo:

- El cliente inicia el proceso, por lo que el nodo inicial se sitúa en la calle del cliente
- `Validate order` es aquí una única acción. Si la validación es compleja, se convierte en una actividad llamada con su propio diagrama
- Las guardas `[no]` y `[yes]` son mutuamente excluyentes y cubren todos los casos, de modo que el flujo nunca puede quedarse bloqueado en la decisión
- Ambas ramas terminan en un nodo final de actividad, el proceso tiene dos resultados posibles
- No se dice nada sobre *cómo* se valida el pedido ni *cuánto tiempo* tarda el envío, un diagrama de actividades modela el flujo de control, no estructuras de datos ni tiempos

Una ampliación realista bifurcaría tras `[yes]` para que `Charge card` en la calle de la tienda y `Pick items` en la calle del almacén se ejecuten de forma concurrente, y se unirían de nuevo antes de `Ship parcel`.

---

## Errores comunes {/*#common-mistakes*/}

1. **Guardas ausentes o solapadas:** cada flujo de salida de una decisión necesita una guarda, y las guardas deben ser mutuamente excluyentes y completas, de lo contrario el flujo no tiene ningún camino o tiene varios
2. **Decisión usada en lugar de bifurcación:** un rombo significa *uno de estos caminos*, una barra significa *todos estos caminos*
3. **Bifurcación sin unión:** la actividad puede alcanzar un nodo final mientras aún se ejecutan flujos paralelos, y el nodo final los descarta
4. **Unión sin bifurcación:** una unión espera un flujo que nunca llega y el proceso se bloquea
5. **Sustantivos como nombres de acción:** `Invoice` no dice nada, `Create invoice` sí
6. **Condiciones dentro de la acción:** la condición pertenece al flujo de salida, la acción es lo que se hace, no lo que se comprueba
7. **Varios nodos iniciales:** una actividad tiene exactamente un punto de partida. Los inicios concurrentes se modelan con una bifurcación
8. **Calles como decoración:** si se dibujan los actores pero el flujo nunca cruza el límite de una calle, la partición no aporta nada
9. **Mezcla de flujo de control y flujo de datos:** los datos que pasan entre acciones pertenecen a nodos de objeto, no a las etiquetas de los flujos de control

---

## Herramientas {/*#tools*/}

- draw.io / diagrams.net (gratuito, basado en navegador, biblioteca de formas UML incluida)
- PlantUML (basado en texto, el diagrama se genera a partir del código fuente y puede versionarse)
- Mermaid (basado en texto, se renderiza directamente en Markdown en muchas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciales, con niveles gratuitos)

## Véase también {/*#see-also*/}

- [Diagrama de clases](./class-diagram.md): la contrapartida estructural, que modela clases y sus relaciones
- [Modelo ER](../databases/er-model.md): modelado de los datos sobre los que operan las acciones de un diagrama de actividades
