---
title: "Diagrama de secuencia"
description: "Diagramas de secuencia UML: líneas de vida, especificaciones de ejecución, mensajes síncronos y asíncronos, respuestas, creación y destrucción de objetos, fragmentos combinados como alt, opt, loop y par, y delimitación frente a los diagramas de actividades y de comunicación."
keywords:
    - UML
    - Diagrama de secuencia
    - Diagrama de interacción
    - Línea de vida
    - Especificación de ejecución
    - Fragmento combinado
    - Mensaje síncrono
    - Mensaje asíncrono
    - Diagrama de comportamiento
tags:
    - ap2
machine_translated: true
---

# Diagrama de secuencia

## Visión general {/*#overview*/}

Un diagrama de secuencia es un diagrama UML de **comportamiento** y pertenece al grupo de los *diagramas de interacción*. Muestra qué interlocutores intercambian qué mensajes y en qué orden sucede. Los interlocutores se disponen uno junto a otro y el tiempo transcurre de arriba abajo.

Aplicaciones típicas:

- Detalle de un único escenario de un [caso de uso](./use-case-diagram.md), normalmente el curso normal más una excepción
- Documentación de la colaboración de objetos o componentes para una pieza de funcionalidad
- Descripción de un protocolo entre sistemas, por ejemplo cliente, servidor y base de datos
- Revisión de un borrador de diseño frente al [diagrama de clases](./class-diagram.md) en ambos sentidos: un mensaje que ninguna clase ofrece como operación pone de manifiesto una operación que falta, una línea de vida sin mensajes entrantes una clase inalcanzable

Un diagrama de secuencia muestra siempre *una* ejecución concreta. Las alternativas y las repeticiones pueden expresarse mediante fragmentos combinados, pero un diagrama que intenta cubrir todos los casos a la vez resulta ilegible. Por ello se prefieren varios diagramas pequeños a uno grande.

---

## Notación {/*#notation*/}

| Elemento                    | Notación                                                          | Significado                                                                |
| --------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Marco                       | Rectángulo con una pestaña pentagonal que indica `sd` más un nombre | Límite y nombre de la interacción                                     |
| Cabecera de línea de vida   | Rectángulo con `name : Class`, `:Class` o `name`                         | Un interlocutor, objeto, componente o actor                                |
| Línea de vida               | Línea vertical discontinua bajo la cabecera                       | Existencia de ese interlocutor a lo largo del tiempo                       |
| Especificación de ejecución | Rectángulo estrecho sobre la línea de vida (barra de activación)  | Período en el que el interlocutor está activo o procesa una llamada        |
| Mensaje síncrono            | Línea continua, punta de flecha rellena `──▶`                   | El emisor espera hasta que llega la respuesta                              |
| Mensaje asíncrono           | Línea continua, punta de flecha abierta `──>`                   | El emisor continúa de inmediato, sin esperar                               |
| Mensaje de respuesta        | Línea discontinua, punta de flecha abierta `<- - -`                | Devolución del control, opcionalmente etiquetada con el valor devuelto     |
| Mensaje a sí mismo          | Flecha que sale y vuelve a entrar en la misma línea de vida       | Un interlocutor llama a una de sus propias operaciones                     |
| Mensaje de creación         | Flecha discontinua con `«create»` hacia una cabecera de línea de vida | El receptor comienza a existir durante la interacción                   |
| Ocurrencia de destrucción   | Cruz `X` en el extremo inferior de una línea de vida          | El objeto se destruye, la línea de vida termina ahí                        |
| Fragmento combinado         | Rectángulo con el operador en la esquina superior izquierda       | Estructura de control, por ejemplo `alt`, `opt`, `loop`, `par`      |
| Operando                    | Sección de un fragmento, separada por una línea discontinua       | Un caso o una rama dentro del fragmento                                    |
| Guarda                      | `[condition]` al inicio de un operando                                  | Condición bajo la cual se aplica ese operando                              |
| Uso de interacción          | Fragmento con el operador `ref`                                 | Referencia a una interacción dibujada en un diagrama propio                |
| Invariante de estado        | `{condition}` sobre una línea de vida                                   | Condición que debe cumplirse en ese instante                               |
| Nota                        | Rectángulo con esquina doblada sobre una línea discontinua        | Comentario sin semántica                                                   |

Reglas de nomenclatura que mantienen legible un diagrama:

- Un mensaje lleva la firma de la operación llamada, por ejemplo `reserve(seatNo)`, no una frase como `the seat is reserved`
- Una respuesta se etiqueta con el valor devuelto, no de nuevo con el nombre de la operación
- Las líneas de vida se nombran según objetos, no según acciones: `:SeatRepository` es un interlocutor, `Save seat` no
- Los objetos anónimos se escriben como `:Class`, un objeto con nombre como `seat : Seat`, un rol solo por su nombre

---

## Elementos básicos {/*#building-blocks*/}

### Línea de vida, especificación de ejecución y respuesta {/*#lifeline-execution-specification-and-reply*/}

Un mensaje de un interlocutor a otro inicia una especificación de ejecución en el receptor, y la respuesta la termina. Un mensaje síncrono encaja con una llamada cuyo resultado necesita quien llama antes de poder continuar, por ejemplo una llamada a un método o una petición HTTP cuya respuesta se espera.

```text
   :Client                  :AuthService
      │                           │
     ┌┴┐                          │
     │ │─── login(user, pw) ────▶┌┴┐
     │ │                         │ │
     │ │<- - - - - token - - - - └┬┘
     │ │                          │
     └┬┘                          │
      │                           │
```

La respuesta puede omitirse si no aporta información.

### Mensaje asíncrono {/*#asynchronous-message*/}

Un mensaje asíncrono se entrega y el emisor continúa sin esperar. Encaja con eventos, notificaciones, mensajes a una cola y llamadas que se ejecutan en un hilo aparte, en las que el emisor no necesita un resultado. La barra del emisor es independiente de la barra del receptor y puede terminar antes que ella.

```text
:OrderService                   :MailService
      │                               │
     ┌┴┐                              │
     │ │──── sendMail(order) ───────>┌┴┐
     └┬┘                             │ │
      │                              │ │
      │                              └┬┘
      │                               │
```

### Mensaje a sí mismo {/*#self-message*/}

Un mensaje a sí mismo es una flecha que sale de una línea de vida y vuelve a entrar en la misma un poco más abajo. Se dibuja cuando un paso interno de un interlocutor, como una validación o un cálculo, es importante para comprender el flujo. Las llamadas auxiliares privadas sin esa relevancia se omiten. Una autollamada dibujada estrictamente recibe una especificación de ejecución anidada, una segunda barra ligeramente desplazada sobre la primera.

```text
:OrderService
      │
     ┌┴┐
     │ ├───┐ validate()
     │ ┌─┐◀┘
     │ │ │
     │ └─┘
     │ │
     └┬┘
      │
```

### Creación y destrucción de objetos {/*#creation-and-destruction-of-objects*/}

Un objeto que solo comienza a existir durante la interacción se dibuja con su cabecera en la posición vertical en la que se crea. El mensaje de creación apunta a la cabecera, no a la línea de vida. La destrucción se marca con una cruz al final de la línea de vida.

```text
  :Session
      │
     ┌┴┐
     │ │        «create»
     │ │- - - - - - - - - ->┌─────────┐
     │ │                    │  :Cart  │
     │ │                    └────┬────┘
     │ │──── addItem(item) ────▶┌┴┐
     │ │                        └┬┘
     │ │──── «destroy» ────────▶ X
     └┬┘
      │
```

---

## Fragmentos combinados {/*#combined-fragments*/}

Un fragmento combinado es un rectángulo alrededor de una parte de la interacción. El operador en la esquina superior izquierda determina qué estructura de control se aplica a los mensajes encerrados, por ejemplo una alternativa o un bucle. Las líneas horizontales discontinuas dividen el fragmento en operandos y, en un fragmento `alt`, cada operando lleva una guarda.

| Operador     | Significado                                                                         | Se corresponde con               |
| ------------ | ----------------------------------------------------------------------------------- | -------------------------------- |
| `alt`      | Alternativas, se ejecuta exactamente un operando, el caso restante se etiqueta `[else]` | `if / else if / else`                       |
| `opt`      | Un único operando que se ejecuta solo si se cumple la guarda                        | `if` sin `else`              |
| `loop`      | Repetición, escrita como `loop(min,max)` o con una guarda                                   | `while`, `for`, `do … while`        |
| `break`      | El operando sustituye al resto de la interacción que lo contiene                    | `return` anticipado, excepción    |
| `par`      | Los operandos se ejecutan de forma concurrente, sus mensajes pueden entrelazarse    | Hilos, tareas, llamadas paralelas |
| `ref`      | Referencia a una interacción dibujada en un diagrama propio                         | Llamada a método, subproceso     |
| `critical`      | El operando no debe ser interrumpido por operandos que se ejecuten concurrentemente | Sección crítica, bloqueo         |
| `neg`      | La secuencia encerrada no es válida y no debe producirse                            | Caso de prueba negativo          |
| `assert`      | La secuencia encerrada es la única continuación válida                              | Aserción                         |

En la práctica, `alt`, `opt` y `loop` cubren la gran mayoría de los diagramas.

### Alternativa {/*#alternative*/}

```text
      :Client                        :Booking
         │                               │
        ┌┴┐                              │
        │ │──── reserve(seatNo) ───────▶┌┴┐
        │ │                             │ │
 ┌──────┼─┼─────────────────────────────┼─┼────────┐
 │ alt  │ │ [seat is free]              │ │        │
 │      │ │<- - - - reservationId - - - │ │        │
 ├╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌┤
 │      │ │ [else]                      │ │        │
 │      │ │<- - - SeatTakenError - - - -│ │        │
 └──────┼─┼─────────────────────────────┼─┼────────┘
        └┬┘                             └┬┘
         │                               │
```

Las guardas de un fragmento `alt` deben ser mutuamente excluyentes y deberían cubrir todos los casos.

### Bucle {/*#loop*/}

```text
      :Order                         :LineItem
         │                               │
        ┌┴┐                              │
 ┌──────┼─┼──────────────────────────────┼─────────┐
 │ loop │ │ [more items]                 │         │
 │      │ │──── subtotal() ────────────▶┌┴┐        │
 │      │ │<- - - - amount - - - - - - -└┬┘        │
 └──────┼─┼──────────────────────────────┼─────────┘
        └┬┘                              │
         │                               │
```

`loop(1,n)` expresa un recuento en lugar de una condición, `loop` sin adición significa una repetición ilimitada.

---

## Ejemplo: detalle del caso de uso *Reservar asiento* {/*#example-detailing-the-use-case-book-seat*/}

El escenario detallado aquí es el curso normal del caso de uso *Reservar asiento*: un cliente reserva un asiento concreto, el sistema lo busca y, si sigue libre, lo marca como reservado. El diagrama se deriva de la descripción textual del caso de uso en estos pasos:

1. Se elige un escenario del caso de uso, normalmente el curso normal de la descripción textual.
2. El actor desencadenante se convierte en la línea de vida situada más a la izquierda.
3. Se añaden los interlocutores internos, normalmente siguiendo las capas de la arquitectura: interfaz de usuario, control, objeto de dominio, persistencia.
4. Cada paso del curso textual se convierte en un mensaje cuyo nombre coincide con una operación del receptor.
5. Las excepciones de la descripción textual se convierten en fragmentos `alt` o `break`, o en un diagrama aparte para cada una.

```text
┌────────────────┐
│ sd BookSeat    │
├────────────────┴─────────────────────────────────────────────────────┐
│                                                                      │
│       :Customer            :BookingService         :SeatRepository   │
│           │                       │                       │          │
│          ┌┴┐                      │                       │          │
│          │ │── bookSeat(id) ────▶┌┴┐                      │          │
│          │ │                     │ │── findSeat(id) ────▶┌┴┐         │
│          │ │                     │ │<- - seat - - - - - -└┬┘         │
│          │ │                     │ │                      │          │
│          │ │              ┌──────┼─┼──────────────────────┼───────┐  │
│          │ │              │ opt  │ │ [seat is free]       │       │  │
│          │ │              │      │ │── markBooked(id) ──▶┌┴┐      │  │
│          │ │              │      │ │<- - - - ok - - - - -└┬┘      │  │
│          │ │              └──────┼─┼──────────────────────┼───────┘  │
│          │ │<- - confirmation - -└┬┘                      │          │
│          └┬┘                      │                       │          │
│           │                       │                       │          │
└──────────────────────────────────────────────────────────────────────┘
```

Lo que puede leerse en este ejemplo:

- El caso fallido del fragmento `opt` no se dibuja aquí, se modelaría con `alt` o en un diagrama aparte.
- El paso de pago se insertaría como un fragmento `ref` para que este diagrama siga siendo legible y el pago tenga su propia interacción.

---

## Diagrama de secuencia, de actividades o de comunicación {/*#sequence-activity-or-communication-diagram*/}

Los tres son diagramas de comportamiento.

| Criterio       | Diagrama de secuencia                         | Diagrama de actividades                       | Diagrama de comunicación                        |
| -------------- | --------------------------------------------- | --------------------------------------------- | ----------------------------------------------- |
| Enfoque        | Intercambio de mensajes a lo largo del tiempo | Flujo de control de un proceso                | Estructura de la colaboración                   |
| Tiempo         | Explícito, como eje vertical                  | Implícito, mediante la dirección del flujo    | Solo mediante la numeración de los mensajes     |
| Participantes  | Líneas de vida una junto a otra               | Opcional, como particiones                    | Objetos colocados libremente, conectados por enlaces |
| Ramificación   | Fragmentos combinados, se satura rápido       | Nodos de decisión y fusión, bien legible      | Apenas legible                                  |
| Concurrencia   | Fragmento `par`                             | Bifurcación y unión                           | Posible, pero difícil de leer                   |
| Uso típico     | Detalle de un escenario                       | Modelado de un proceso completo               | Mostrar qué objeto conoce a qué otro            |

Reglas generales:

- Muchas ramas y bucles, pocos participantes => [diagrama de actividades](./activity-diagram.md)
- Pocas ramas, muchos participantes y un orden relevante => diagrama de secuencia
- La pregunta *quién está conectado con quién* en lugar de *en qué orden* => [diagrama de comunicación](./further-uml-diagrams.md#communication-diagram)
- El comportamiento de *un único* objeto a lo largo de toda su vida => [diagrama de máquina de estados](./state-machine-diagram.md)

---

## Errores comunes {/*#common-mistakes*/}

1. **Eje temporal ignorado:** el tiempo transcurre de arriba abajo en todas las líneas de vida. Una flecha dibujada hacia arriba invierte por tanto el orden previsto. Dos mensajes a la misma altura no tienen un orden definido.
2. **Respuesta como flecha continua:** una respuesta se dibuja como una línea discontinua con punta de flecha abierta. Una línea continua con punta de flecha rellena se lee como una nueva llamada en sentido contrario.
3. **Confusión entre síncrono y asíncrono:** la punta de flecha rellena significa que el emisor espera la respuesta. Los eventos, las notificaciones y los mensajes a una cola son asíncronos y llevan la punta de flecha abierta.
4. **Especificaciones de ejecución sin cerrar:** la barra de quien llama debe extenderse al menos hasta que llega la respuesta. Una barra que termina antes indica que quien llama ya había finalizado.
5. **Actividades en lugar de objetos en las líneas de vida:** una línea de vida representa a un interlocutor como `:SeatRepository`. Un paso como `Check availability` no es un interlocutor y se convierte en un mensaje.
6. **Guardas ausentes en los operandos alt:** sin guardas, el diagrama no muestra bajo qué condición se aplica cada operando del fragmento `alt`.

---

## Herramientas {/*#tools*/}

- draw.io / diagrams.net (gratuito, basado en navegador, biblioteca de formas UML incluida)
- PlantUML (basado en texto, especialmente potente para diagramas de secuencia, puede versionarse)
- Mermaid (basado en texto, se renderiza directamente en Markdown en muchas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciales, con niveles gratuitos)

## Véase también {/*#see-also*/}

- [Diagrama de actividades](./activity-diagram.md): la alternativa para procesos con muchas ramas y bucles
- [Diagrama de casos de uso](./use-case-diagram.md): aporta los escenarios que detalla un diagrama de secuencia
- [Diagrama de clases](./class-diagram.md): aporta las clases y operaciones a las que se refieren los mensajes
- [Diagrama de máquina de estados](./state-machine-diagram.md): el comportamiento de un único objeto en lugar de la interacción de varios
- [Visión general de UML](./uml-overview.mdx): clasificación de todos los tipos de diagrama
- [Fundamentos de la notación UML](./uml-notation-basics.md): elementos compartidos por todos los tipos de diagrama
