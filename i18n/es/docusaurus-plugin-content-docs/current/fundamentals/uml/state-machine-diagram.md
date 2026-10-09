---
title: "Diagrama de máquina de estados"
description: "Diagramas de máquina de estados UML: estados, transiciones con disparador, guarda y efecto, actividades entry, do y exit, estados compuestos, regiones, estados de historia y la tabla de transición de estados."
keywords:
    - UML
    - Diagrama de máquina de estados
    - Diagrama de estados
    - Transición
    - Guarda
    - Acción de entrada
    - Estado compuesto
    - Región
    - Estado de historia
    - Tabla de transición de estados
    - Diagrama de comportamiento
tags:
    - ap2
machine_translated: true
---

# Diagrama de máquina de estados

## Visión general {/*#overview*/}

Un diagrama de máquina de estados es un diagrama UML de **comportamiento**. Describe el ciclo de vida de *un único* objeto, componente o sistema: en qué estados puede encontrarse, qué eventos lo llevan de un estado al siguiente y qué sucede por el camino.

Aplicaciones típicas:

- Estado de un pedido en un sistema de tienda (`New`, `Paid`, `Shipped`, `Delivered`, `Cancelled`)
- Gestión de sesiones o de inicio de sesión (`Anonymous`, `Authenticated`, `Locked`, `Expired`)
- Estados de dispositivos y de conexiones (`Off`, `Booting`, `Ready`, `Error`)
- Lógica de protocolos y de analizadores sintácticos, donde el siguiente carácter se interpreta de forma distinta según el estado
- El comportamiento interno de una clase cuyos métodos solo están permitidos en determinados estados

---

## Notación {/*#notation*/}

| Elemento                  | Notación                                                    | Significado                                                                         |
| ------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Pseudoestado inicial      | Círculo relleno `●`                                     | Dónde comienza el ciclo de vida, exactamente uno por región                         |
| Estado                    | Rectángulo redondeado con un nombre                         | Una situación en la que el objeto espera, nombrada como adjetivo o sustantivo       |
| Transición                | Flecha de un estado a otro                                  | Cambio de estado, etiquetada `trigger [guard] / effect`, cada parte es opcional                        |
| Disparador (trigger)      | Nombre del evento sobre la transición                       | El evento que ofrece la transición, p. ej. `cancel`, `timeout`                         |
| Transición de finalización | Transición sin disparador                                  | Se activa en cuanto termina el comportamiento del estado de origen                  |
| Guarda                    | `[condition]` sobre la transición                                 | Condición booleana, la transición solo se activa si se evalúa como verdadera        |
| Efecto                    | `/ action` sobre la transición                                 | Acción ejecutada mientras se activa la transición, no debe bloquear                 |
| Autotransición            | Flecha que sale y vuelve a entrar en el mismo estado        | El estado se abandona y se vuelve a entrar, `exit` y `entry` sí se ejecutan        |
| Transición interna        | `trigger / effect` dentro del recuadro del estado                      | Reacción sin cambio de estado, `exit` y `entry` **no** se ejecutan                 |
| Actividad de entrada      | `entry / action` dentro del recuadro del estado                      | Se ejecuta cada vez que se entra en el estado, con independencia de la transición utilizada |
| Actividad do              | `do / activity` dentro del recuadro del estado                      | Se ejecuta de forma continua mientras el estado está activo, puede interrumpirse    |
| Actividad de salida       | `exit / action` dentro del recuadro del estado                      | Se ejecuta cada vez que se abandona el estado, con independencia de la transición utilizada |
| Estado compuesto          | Recuadro de estado que contiene otros estados               | Un estado desglosado en subestados                                                  |
| Región                    | Parte de un estado compuesto, separada por una línea discontinua | Subestados que están activos al mismo tiempo                                   |
| Elección (choice)         | Rombo sobre una transición                                  | Ramificación evaluada tras el efecto, las transiciones de salida llevan guardas     |
| Historia superficial      | Círculo que contiene `H`                                | Al volver a entrar, se retoma el subestado activo por última vez en ese estado compuesto |
| Historia profunda         | Círculo que contiene `H*`                                | Retoma el último subestado activo incluidos todos los niveles anidados              |
| Estado final              | Círculo relleno dentro de un anillo `◉`                 | El ciclo de vida termina aquí, el objeto no acepta más eventos                      |

Reglas de nomenclatura que mantienen legible un diagrama:

- Los estados describen una condición, no una actividad: `Paid`, `Waiting for payment`, no `Pay`
- Los disparadores se nombran según el evento, no según el método que lo gestiona: `cancel`, no `handleCancel`
- Los efectos y las actividades internas se nombran como operaciones con paréntesis: `/ refundPayment()`

---

## Elementos básicos {/*#building-blocks*/}

### Estados y transiciones {/*#states-and-transitions*/}

```text
              ●
              │
              ▼
   ╭────────────────────────╮
   │         Idle           │
   ╰────────────────────────╯
              │
              │ coinInserted [amount >= price] / unlock()
              ▼
   ╭────────────────────────╮
   │        Ready           │
   ╰────────────────────────╯
              │
              │ productSelected / dispense()
              ▼
              ◉
```

Leído como una frase: *en el estado `Idle`, cuando ocurre el evento `coinInserted` y se cumple la condición `amount >= price`, se ejecuta `unlock()` y la máquina pasa a `Ready`*. Si el evento ocurre pero la guarda es falsa, el evento se descarta y el estado no cambia.

### Autotransición {/*#self-transition*/}

Tras una autotransición, el objeto se encuentra en el mismo estado que antes. Por el camino, el estado se abandona y se vuelve a entrar, por lo que se ejecutan `exit` y `entry` y se reinicia una actividad `do`.

```text
        ┌───────────────────────────────────┐
        │   digitPressed / appendDigit()    │
        │                                   │
        │   ╭───────────────────────────╮   │
        └──►│        Collecting         │───┘
            ╰───────────────────────────╯
```

Si no es deseable reiniciar `entry`, `do` y `exit`, se utiliza en su lugar una **transición interna**. Se escribe dentro del recuadro del estado y deja el estado activo:

```text
╭───────────────────────────────────────────╮
│               Collecting                  │
├───────────────────────────────────────────┤
│ digitPressed / appendDigit()              │
╰───────────────────────────────────────────╯
```

Por ejemplo, un tiempo de espera implementado como `entry / startTimer()` se reinicia con una autotransición y se mantiene en marcha con una transición interna.

### Actividades internas {/*#internal-activities*/}

Tres palabras clave describen un comportamiento que pertenece al propio estado y no a una transición:

- `entry / action`: se ejecuta una vez en cada entrada, antes de cualquier actividad do
- `do / activity`: se ejecuta mientras el estado está activo, puede durar mucho tiempo y puede ser interrumpida por una transición de salida
- `exit / action`: se ejecuta una vez en cada salida, después de que la actividad do haya terminado o haya sido abortada

```text
╭───────────────────────────────────────────╮
│                 Heating                   │
├───────────────────────────────────────────┤
│ entry / switchHeaterOn()                  │
│ do / measureTemperature()                 │
│ exit / switchHeaterOff()                  │
╰───────────────────────────────────────────╯
```

El orden de un cambio de estado es siempre: `exit` del estado de origen, después el efecto de la transición y después `entry` del estado de destino.

Poner una acción en `entry` en lugar de en cada transición entrante elimina la duplicación y garantiza que la acción no pueda olvidarse cuando más adelante se añada una nueva transición hacia ese estado.

### Estados compuestos {/*#composite-states*/}

Un estado compuesto contiene una máquina de estados propia. Mantiene pequeños los diagramas y permite dibujar una transición una sola vez para todo un grupo de subestados.

```text
╭────────────────────────────────────────────────────────╮
│ Active                                                 │
│                                                        │
│    ●                                                   │
│    │                                                   │
│    ▼                                                   │
│  ╭───────────────────╮  connected  ╭───────────────────╮
│  │     Dialling      │────────────►│    Talking        │
│  ╰───────────────────╯             ╰───────────────────╯
│                                                        │
╰────────────────────────────────────────────────────────╯
              │
              │ hangUp
              ▼
   ╭───────────────────╮
   │       Idle        │
   ╰───────────────────╯
```

La transición `hangUp` parte del *borde* del estado compuesto, por lo que se aplica por igual a `Dialling` y a `Talking`.

Reglas que conviene tener presentes:

- Un estado compuesto necesita su propio pseudoestado inicial, de lo contrario no está definido qué subestado pasa a estar activo
- Exactamente un subestado está activo a la vez por región, junto con el estado compuesto que lo contiene
- Una transición también puede apuntar directamente a un subestado, lo que elude el pseudoestado inicial
- Un estado final dentro de un estado compuesto termina esa máquina interna, lo que a su vez activa la transición de finalización saliente del estado compuesto

### Regiones y estados paralelos {/*#regions-and-parallel-states*/}

Un estado compuesto puede dividirse en **regiones** mediante una línea discontinua. Cada región tiene su propio pseudoestado inicial, subestados y transiciones. Mientras el estado compuesto está activo, hay un subestado activo en cada región al mismo tiempo. Así se modelan aspectos independientes de un mismo objeto, como el audio y el vídeo de una grabación.

```text
╭──────────────────────────────────────────────────────────╮
│ Recording                                                │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮   muteAudio   ╭───────────────╮       │
│  │ AudioRunning  │──────────────►│  AudioMuted   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮  pauseVideo   ╭───────────────╮       │
│  │ VideoRunning  │──────────────►│ VideoPaused   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
╰──────────────────────────────────────────────────────────╯
```

Un evento se ofrece a cada región. Puede activar una transición en una región, en varias regiones o en ninguna.

### Estado de historia {/*#history-state*/}

Un estado de historia responde a la pregunta *dónde continúa la máquina tras una interrupción*. Sin él, volver a entrar en un estado compuesto comienza siempre en su pseudoestado inicial.

```text
              ╭──────────────────────────────────────────╮
              │ Playing                                  │
   resume     │                                          │
 ┌───────────►│   (H)                                    │
 │            │    │                                     │
 │            │    ▼                                     │
 │            │  ╭───────────╮        ╭───────────╮      │
 │            │  │  Track 1  │───────►│  Track 2  │      │
 │            │  ╰───────────╯        ╰───────────╯      │
 │            ╰──────────────────────────────────────────╯
 │                           │ pause
 │            ╭──────────────▼───────────╮
 └────────────│          Paused          │
              ╰──────────────────────────╯
```

La historia superficial `(H)` restablece el subestado que estuvo activo por última vez en este nivel. Una historia profunda `(H*)` restablece la última configuración incluidos todos los niveles anidados. Si nunca se ha entrado antes en el estado compuesto, la transición hacia el estado de historia recurre al pseudoestado inicial.

---

## Tabla de transición de estados {/*#state-transition-table*/}

Un diagrama de máquina de estados también puede escribirse como **tabla de transición de estados**. La tabla es más fácil de comprobar en cuanto a completitud que el diagrama, porque las combinaciones ausentes de estado y evento destacan cuando las filas se agrupan por estado.

| Estado actual | Evento            | Guarda            | Efecto                 | Estado siguiente |
| ------------- | ----------------- | ----------------- | ---------------------- | ---------------- |
| `New`         | `itemAdded`       | –                 | `recalculateTotal()`   | –           |
| `New`         | `paymentReceived` | –                 | `capturePayment()`     | `Paid`      |
| `New`         | `cancel`          | –                 | `releaseReservation()` | `Cancelled` |
| `Paid`        | `dispatched`      | `allItemsInStock` | `sendTrackingMail()`   | `Shipped`   |
| `Paid`        | `cancel`          | –                 | `refundPayment()`      | `Cancelled` |
| `Shipped`     | `delivered`       | –                 | –                      | `Delivered` |

Una combinación que no aparece en la tabla no activa ninguna transición. El evento se descarta sin efecto.

Una fila con la columna *Estado siguiente* vacía y la columna *Efecto* rellena describe una transición interna. Una fila cuyo estado actual y estado siguiente son idénticos describe una autotransición.

---

## Ejemplo: estado de un pedido {/*#example-order-status*/}

El ciclo de vida de un pedido en un sistema de tienda, desde su creación hasta la entrega o la cancelación.

```text
                          ●
                          │
                          ▼
                ╭────────────────────────╮
                │          New           │
                │ entry / reserveItems() │
                ╰────────────────────────╯
                     │              │
    paymentReceived  │              │ cancel
    / capturePayment()              │ / releaseReservation()
         ┌───────────┘              └────────────┐
         ▼                                       │
╭────────────────────────╮                       │
│          Paid          │──────────────────────►┤
╰────────────────────────╯  cancel               │
         │                  / refundPayment()    │
         │ dispatched [allItemsInStock]          │
         │ / sendTrackingMail()                  ▼
         ▼                          ╭────────────────────────╮
╭────────────────────────╮          │       Cancelled        │
│        Shipped         │          ╰────────────────────────╯
╰────────────────────────╯                       │
         │                                       │
         │ delivered                             │
         ▼                                       │
╭────────────────────────╮                       │
│       Delivered        │                       │
╰────────────────────────╯                       │
         │                                       │
         └───────────────────┐   ┌───────────────┘
                             ▼   ▼
                             ◉
```

Lo que muestra este ejemplo:

- El reembolso se sitúa en la transición `Paid => Cancelled` y **no** como actividad `entry` de `Cancelled`, porque un pedido cancelado desde `New` nunca se ha pagado.
- `dispatched` lleva una guarda. Si faltan existencias, el pedido permanece en `Paid`.
- `Shipped` no tiene transición para `cancel`. La regla de negocio *un pedido enviado ya no puede cancelarse* se expresa mediante la ausencia de una transición.

Implementado en código, cada estado se convierte en un valor de una enumeración y la tabla pasa a ser un `switch` sobre estado y evento. Todo lo que no figura en la tabla cae en la rama por defecto y se rechaza. Un cambio de estado no válido es, por tanto, imposible por construcción.

---

## Delimitación frente al diagrama de actividades {/*#delimitation-from-the-activity-diagram*/}

| Aspecto            | Diagrama de máquina de estados        | [Diagrama de actividades](./activity-diagram.md)  |
| ------------------ | ------------------------------------- | ------------------------------------------------- |
| Nodo               | Un **estado**, el objeto espera       | Una **acción**, se está realizando trabajo        |
| Nomenclatura       | Adjetivo o sustantivo: `Paid`       | Verbo + objeto: `Capture payment`                          |
| Flecha             | Activada por un **evento**            | Se activa cuando la acción anterior **ha terminado** |
| Alcance            | El ciclo de vida de un objeto         | Una ejecución de un proceso, posiblemente con varios actores |
| Ramificación       | Guardas en las transiciones de salida | Nodo de decisión con flujos con guarda            |
| Paralelismo        | Regiones dentro de un estado compuesto | Bifurcación y unión                              |
| Pregunta típica    | *¿En qué estado se encuentra el pedido?* | *¿Qué paso viene a continuación?*              |

Si una flecha solo puede etiquetarse con algo como *después*, la elección correcta es un diagrama de actividades. Si la flecha necesita un nombre como `cancel`, `timeout` o `paymentReceived`, encaja un diagrama de máquina de estados.

---

## Errores comunes {/*#common-mistakes*/}

1. **Actividades usadas como nombres de estado:** `Pay` es una acción y pertenece a un diagrama de actividades. El estado es `Paid` o `Waiting for payment`.
2. **Transiciones sin disparador:** una flecha entre dos estados sin evento es una transición de finalización. Se activa en cuanto el estado de origen ha terminado su comportamiento.
3. **Guardas solapadas:** si dos transiciones con el mismo disparador pueden tener ambas una guarda verdadera, el comportamiento no está definido. Las guardas deben excluirse mutuamente.
4. **Guarda confundida con disparador:** `[cancel]` es una condición, no un evento. `cancel [orderNotShipped]` separa correctamente ambos.
5. **Pseudoestado inicial ausente:** sin él, el estado de partida no está definido. Cada diagrama y cada región necesitan exactamente uno.
6. **Estados inalcanzables o sin salida:** un estado sin transición entrante nunca se alcanza. Un estado sin transición saliente que no sea un estado final atrapa al objeto.
7. **Autotransición donde se pretende una transición interna:** una autotransición reinicia `entry`, `do` y `exit`. Un temporizador iniciado en `entry` se restablece como consecuencia.
8. **Explosión de estados:** combinar aspectos independientes en un único conjunto plano de estados multiplica el número de estados. Las regiones o los atributos adicionales lo evitan.

---

## Herramientas {/*#tools*/}

- draw.io / diagrams.net (gratuito, basado en navegador, biblioteca de formas UML incluida)
- PlantUML (basado en texto, el diagrama se genera a partir del código fuente y puede versionarse)
- Mermaid (basado en texto, `stateDiagram-v2` se renderiza directamente en Markdown en muchas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciales, con niveles gratuitos)

## Véase también {/*#see-also*/}

- [Diagrama de actividades](./activity-diagram.md): la vista de proceso, acciones y flujo de control en lugar de estados y eventos
- [Diagrama de secuencia](./sequence-diagram.md): muestra a lo largo del tiempo qué mensajes activan los eventos utilizados aquí
- [Diagrama de clases](./class-diagram.md): la clase cuyo ciclo de vida describe un diagrama de máquina de estados
- [Diagrama de casos de uso](./use-case-diagram.md): la vista externa de la que proceden los eventos de una máquina de estados
- [Visión general de UML](./uml-overview.mdx): clasificación de los tipos de diagrama en estructura y comportamiento
- [Fundamentos de la notación UML](./uml-notation-basics.md): elementos de notación compartidos por todos los tipos de diagrama
- [Otros diagramas UML](./further-uml-diagrams.md): los restantes tipos de diagrama de un vistazo
