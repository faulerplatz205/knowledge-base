---
title: "Diagrama de casos de uso"
description: "Diagramas de casos de uso de UML: actores, límite del sistema, asociaciones, las relaciones include, extend y generalización, la diferencia entre diagrama y descripción de caso de uso, y su papel en el análisis de requisitos."
keywords:
    - UML
    - Diagrama de casos de uso
    - Actor
    - Límite del sistema
    - Include
    - Extend
    - Punto de extensión
    - Generalización
    - Descripción de caso de uso
    - Análisis de requisitos
tags:
    - ap2
machine_translated: true
---

# Diagrama de casos de uso

## Visión general {/*#overview*/}

Un diagrama de casos de uso es un diagrama **de comportamiento** de UML. Muestra *qué* servicios ofrece un sistema a su entorno y *quién* los utiliza, pero deliberadamente no dice nada sobre *cómo* se implementan esos servicios. El diagrama es, por tanto, la vista externa de un sistema, y lo que define es el **alcance del sistema**.

Aplicaciones típicas:

- Delimitar el alcance de un proyecto: una respuesta temprana a *qué pertenece al sistema y qué no*
- Estructurar los requisitos funcionales en unidades que aportan valor de negocio
- Proporcionar un vocabulario compartido para desarrolladores, clientes y expertos del dominio
- Servir como índice de un documento de requisitos, con una descripción por caso de uso

Un caso de uso es siempre un **servicio completo y autónomo con un resultado observable de valor** para al menos un actor. `Place order` es un caso de uso, `Click the order button` no lo es.

---

## Notación {/*#notation*/}

| Elemento             | Notación                                                              | Significado                                                                         |
| -------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Actor                | Figura de palo, nombre debajo                                         | Rol externo al sistema que interactúa con él                                        |
| Actor (sistema)      | Rectángulo con la palabra clave `<<actor>>` o una figura de palo          | Sistema externo en el papel de actor                                                |
| Límite del sistema   | Rectángulo con el nombre del sistema en el borde superior             | Todo lo dibujado dentro forma parte del sistema considerado                         |
| Caso de uso          | Elipse con el nombre en su interior, siempre dentro del límite        | Un servicio autónomo del sistema, nombrado *verbo + objeto*                         |
| Asociación           | Línea continua sin punta de flecha                                    | Un actor participa en un caso de uso                                                |
| Include              | Flecha discontinua con `<<include>>`, que apunta al caso de uso incluido    | El caso de uso base ejecuta **siempre** el incluido                                 |
| Extend               | Flecha discontinua con `<<extend>>`, que apunta al caso de uso **base**    | El caso de uso extensor **puede** ejecutarse bajo una condición                     |
| Punto de extensión   | Posición con nombre en un compartimento del caso de uso base          | El lugar en el que se inserta una extensión                                         |
| Generalización       | Línea continua con un triángulo hueco en el elemento general          | Especialización de actores o de casos de uso                                        |
| Nota                 | Rectángulo con esquina doblada sobre una línea discontinua            | Comentario sin semántica, p. ej. la condición de una relación extend                |

Reglas de nomenclatura que mantienen legible un diagrama:

- Los casos de uso se nombran *verbo + objeto* desde el punto de vista del actor y en el lenguaje del dominio, no de la implementación: `Place order` y `Cancel invoice`, no `Order management`, `orderService()` ni `Set the invoice status to 0`
- Los actores se nombran según el **rol**, no según la persona: `Clerk`, no `Ms Weber`, porque una persona puede ocupar varios roles

---

## Elementos básicos {/*#building-blocks*/}

### Actores {/*#actors*/}

Un actor es un rol externo al sistema que intercambia información con él. Los actores no son necesariamente personas.

- **Actor primario:** desencadena el caso de uso y obtiene el beneficio de él. Por convención se dibuja a la izquierda
- **Actor secundario:** es invocado por el sistema mientras se ejecuta el caso de uso y aporta algo que el sistema necesita. Por convención se dibuja a la derecha
- **Actor humano:** una persona en un rol, dibujada como figura de palo
- **Actor de sistema:** un sistema externo, un servicio o un temporizador, dibujado como figura de palo o como rectángulo con la palabra clave `<<actor>>`

### Límite del sistema {/*#system-boundary*/}

El límite del sistema es un rectángulo rotulado con el nombre del sistema. Separa la responsabilidad del entorno:

- Los casos de uso se dibujan **siempre** dentro del límite, porque son servicios del sistema
- Los actores se dibujan **siempre** fuera del límite, porque no se construyen
- Las asociaciones son las únicas líneas que cruzan el límite

### Asociación {/*#association*/}

Una línea continua entre un actor y un caso de uso significa que ese actor participa en ese caso de uso. No lleva punta de flecha, porque expresa participación, no una dirección de flujo de datos. Pueden escribirse multiplicidades como `1` o `*` en los extremos, pero rara vez se necesitan en la práctica.

Las asociaciones existen únicamente entre un actor y un caso de uso, nunca entre dos casos de uso y nunca entre dos actores.

### Include {/*#include*/}

`<<include>>` describe una reutilización obligatoria. El caso de uso base ejecuta siempre el incluido, en un punto fijo de su flujo. La flecha discontinua apunta desde el caso de uso base **hacia** el caso de uso incluido.

```text
 ╭─────────────────────╮                     ╭─────────────────────╮
(      Place order      )╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌►(   Authenticate user   )
 ╰─────────────────────╯     <<include>>     ╰─────────────────────╯
```

El caso de uso incluido es un fragmento compartido por varios casos de uso base. `Authenticate user` también lo necesitan `Manage wish list` y `View invoices`, y extraerlo evita describirlo tres veces. Un caso de uso incluido, por lo general, no se asocia con un actor propio, porque nunca se inicia por sí solo.

### Extend {/*#extend*/}

`<<extend>>` describe un comportamiento opcional. El caso de uso extensor se ejecuta solo si se cumple una condición y se inserta en un **punto de extensión** con nombre del caso de uso base. Su flecha discontinua apunta en sentido contrario a la de `<<include>>`: desde el caso de uso extensor **hacia** el caso de uso base.

```text
 ╭─────────────────────────────╮
(          Place order          )
(  ---------------------------  )              ╭────────────────────╮
(  extension points:            )◄╌╌╌╌╌╌┬╌╌╌╌╌(   Redeem voucher     )
(   payment method selected     )       ╎      ╰────────────────────╯
 ╰─────────────────────────────╯   <<extend>>
                                        ╎
                     ┌──────────────────┴────────╮
                     │ Condition:                │
                     │ {voucher code entered}    │
                     │ extension point:          │
                     │  payment method selected  │
                     └───────────────────────────┘
```

El caso de uso base está completo sin la extensión. `Place order` funciona perfectamente sin un cupón, mientras que no funciona sin autenticación. La condición es una restricción y por ello se escribe entre llaves. UML la muestra, junto con el punto de extensión al que se refiere, en una nota unida a la relación extend. Muchas herramientas y libros de texto abrevian la nota a `<<extend>> {condition}` escrito junto a la flecha, que es una forma abreviada tolerada de lo mismo.

Una prueba sencilla distingue las dos relaciones:

- ¿Puede describirse el caso de uso base sin mencionar nunca el otro? En caso afirmativo, es `<<extend>>`
- ¿Deja de funcionar el caso de uso base si se elimina el otro? En caso afirmativo, es `<<include>>`

### Generalización {/*#generalization*/}

La generalización expresa *es un tipo de*, tanto para actores como para casos de uso. La línea lleva un triángulo hueco en el elemento más general.

Generalización de actores: un actor especializado hereda todas las asociaciones del actor general y puede añadir las suyas propias.

```text
                  ○
                 ╱│╲
                 ╱ ╲
              Customer
                  △
       ┌──────────┴──────────┐
       │                     │
       ○                     ○
      ╱│╲                   ╱│╲
      ╱ ╲                   ╱ ╲
  Registered               Guest
   customer
```

Tanto `Registered customer` como `Guest` heredan todas las asociaciones de `Customer`, por lo que `Search catalogue` no necesita conectarse tres veces.

```text
                  ╭───────────────╮
                 (  Pay for order  )
                  ╰───────────────╯
                          △
           ┌──────────────┴──────────────┐
           │                             │
 ╭────────────────────╮       ╭─────────────────────╮
(  Pay by credit card  )     (  Pay by direct debit  )
 ╰────────────────────╯       ╰─────────────────────╯
```

La generalización de casos de uso es potente, pero se usa en exceso con facilidad. Cuando las variantes difieren solo en un paso opcional, `<<extend>>` es la opción más clara.

---

## Diagrama y descripción {/*#diagram-and-description*/}

El diagrama por sí solo es una vista rápida, no una especificación: nombra los casos de uso y sus relaciones, pero no dice nada sobre el flujo. El detalle reside en la **descripción del caso de uso**, redactada como texto continuo o con una plantilla, una por caso de uso.

| Campo                  | Contenido                                                                        |
| ---------------------- | -------------------------------------------------------------------------------- |
| Nombre                 | Idéntico a la etiqueta del diagrama, *verbo + objeto*                            |
| Descripción breve      | Una o dos frases sobre el propósito y el valor de negocio                        |
| Actores                | Actor primario, actores secundarios                                              |
| Precondición           | Lo que debe cumplirse antes de que pueda comenzar el caso de uso                 |
| Postcondición          | Lo que se cumple tras una ejecución satisfactoria                                |
| Disparador             | El evento que inicia el caso de uso                                              |
| Escenario principal    | El flujo estándar numerado, con todo saliendo bien                               |
| Flujos alternativos    | Desviaciones que aun así conducen al objetivo, numeradas respecto al escenario principal |
| Excepciones            | Desviaciones que impiden alcanzar el objetivo                                    |
| No funcionales         | Tiempos de respuesta, volúmenes, restricciones legales                           |

Un ejemplo completado para `Place order`:

- **Precondición:** el carrito contiene al menos un artículo y el cliente está autenticado
- **Postcondición:** el pedido se almacena con el estado `paid` y se ha enviado una confirmación
- **Disparador:** el cliente confirma el carrito
- **Escenario principal:** 1. el sistema muestra el resumen del pedido => 2. el cliente selecciona un método de pago => 3. el sistema reserva la mercancía => 4. el sistema procesa el pago => 5. el sistema confirma el pedido
- **Flujo alternativo 2a:** el cliente introduce un código de cupón, el sistema reduce el importe y continúa en el paso 3
- **Excepción 3a:** un artículo ya no está en stock, el sistema ofrece una entrega parcial o cancela el pedido

Un escenario es *un camino concreto* a través de un caso de uso: el escenario principal es el camino esperado, los flujos alternativos son los restantes. Todo lo dibujado como `<<extend>>` en el diagrama aparece como flujo alternativo en la descripción, todo lo dibujado como `<<include>>` aparece como referencia a otra descripción.

---

## Papel en el análisis de requisitos {/*#role-in-requirements-analysis*/}

- El **[pliego de requisitos](../../projectmanagement/requirements-specification.md#requirement-specification)** lo redacta el cliente y establece *qué* se necesita y *por qué*. Los casos de uso son una excelente estructura para él, ya que cada uno describe un requisito sin prescribir una solución
- El **[pliego de especificaciones funcionales](../../projectmanagement/requirements-specification.md#functional-specification)** lo redacta el contratista y establece *cómo* se cumplen los requisitos. Se adopta el diagrama de casos de uso, se refinan las descripciones y se añaden restricciones técnicas
- **Trazabilidad:** todo requisito debería poder trazarse hasta al menos un caso de uso, y todo caso de uso hasta al menos un requisito. Los casos de uso sin requisito son un exceso de funcionalidad, los requisitos sin caso de uso han sido olvidados
- **Estimación y planificación:** los casos de uso son una unidad natural para la estimación de esfuerzo, la planificación de versiones y las pruebas de aceptación, porque cada uno puede aceptarse por separado
- **Base de pruebas:** el escenario principal da lugar al caso de prueba del camino feliz, cada flujo alternativo y cada excepción dan lugar al menos a un caso de prueba adicional

Una historia de usuario es un pequeño incremento de planificación, un caso de uso es un servicio completo con todas sus alternativas. Un caso de uso se descompone normalmente en varias historias de usuario.

---

## Ejemplo: tienda en línea {/*#example-online-shop*/}

El sistema considerado es una tienda en línea. El cliente busca en el catálogo y realiza pedidos. Realizar un pedido requiere siempre autenticación y procesamiento del pago, y puede ampliarse opcionalmente con el canje de un cupón. El procesamiento del pago llama a un proveedor de pagos externo.

```text
                                 Online Shop
         ┌──────────────────────────────────────────────────────────┐
         │                                                          │
         │           ╭────────────────────╮                         │
    ┌────┼──────────(   Search catalogue   )                        │
    │    │           ╰────────────────────╯                         │
 ○  │    │                                                          │
╱│╲─┤    │                                                          │
╱ ╲ │    │           ╭────────────────────╮     ╭────────────────╮  │
    └────┼──────────(     Place order      )◄╌╌(  Redeem voucher  ) │
Customer │           ╰────────────────────╯     ╰────────────────╯  │
         │                  ╎       ╎       <<extend>>              │
         │      <<include>> ╎       ╎ <<include>>                   │
         │              ┌───┘       └───────────┐                   │
         │              ▼                       ▼                   │
         │     ╭─────────────────╮      ╭────────────────╮          │  ○
         │    (  Authenticate     )    (  Process payment )─────────┼─╱│╲
         │    (      user         )     ╰────────────────╯          │ ╱ ╲
         │     ╰─────────────────╯                                  │
         │                                                          │
         └──────────────────────────────────────────────────────────┘
                                                                    Payment
                                                                   Provider
```

Qué muestra este ejemplo:

- `Customer` es el actor primario a la izquierda, `Payment Provider` un actor de sistema secundario a la derecha: la tienda lo llama a él, no al revés
- `Authenticate user` está incluido porque no puede realizarse ningún pedido sin él, y no tiene asociación propia porque nunca se inicia de forma aislada
- `Redeem voucher` extiende `Place order`: al eliminarlo, `Place order` sigue siendo plenamente funcional, que es precisamente el criterio para `<<extend>>`

---

## Errores comunes {/*#common-mistakes*/}

1. **Include y extend intercambiados:** `<<include>>` apunta en sentido contrario al caso de uso base y significa *siempre*, `<<extend>>` apunta hacia él y significa *posiblemente*
2. **Líneas continuas y discontinuas intercambiadas:** las asociaciones y las generalizaciones se dibujan como líneas continuas, `<<include>>` y `<<extend>>` como flechas discontinuas
3. **Pasos de proceso en lugar de casos de uso:** `Enter customer number`, `Validate input`, `Save record` son pasos dentro de un flujo, no servicios con valor de negocio. Pertenecen a la descripción del caso de uso o a un diagrama de actividades
4. **Falta del límite del sistema:** sin límite, el diagrama deja de indicar qué funcionalidad pertenece al sistema y el alcance se vuelve negociable
5. **Actor dentro del límite:** los actores están fuera por definición, ya que no forman parte de lo que se construye. Un actor dibujado dentro suele indicar que se ha confundido un componente con un rol
6. **Descomposición funcional mediante include:** dividir cada caso de uso en tres subcasos incluidos convierte el diagrama en un árbol de llamadas. `<<include>>` sirve para la reutilización entre varios casos de uso base, no para estructurar un único flujo
7. **Asociaciones entre casos de uso:** una línea continua sin palabra clave entre dos elipses no tiene significado en UML. Las relaciones entre casos de uso son únicamente `<<include>>`, `<<extend>>` o generalización
8. **Actores nombrados según personas o cargos de individuos:** un actor es un rol. La misma persona puede ser `Clerk` en un caso de uso y `Customer` en otro
9. **Puntas de flecha en las asociaciones:** la asociación expresa participación y no lleva dirección
10. **Diagrama sin descripciones:** el diagrama nombra los casos de uso, no los especifica. Un proyecto que solo tiene el diagrama tiene un índice y ningún contenido
11. **Terminología técnica en los nombres:** `POST /orders` o `saveOrder()` son implementación, no un servicio visto desde fuera. El nombre debe ser comprensible para el cliente
12. **Corchetes para la condición de extend:** la condición es una restricción y por ello pertenece entre llaves, en una nota unida a la relación extend. `[condition]` es la notación de guarda de los diagramas de [actividades](./activity-diagram.md), de [máquina de estados](./state-machine-diagram.md) y de [secuencia](./sequence-diagram.md)

---

## Herramientas {/*#tools*/}

- draw.io / diagrams.net (gratuita, basada en navegador, biblioteca de formas UML incluida)
- PlantUML (basada en texto, el diagrama se genera a partir del código fuente y puede versionarse)
- Mermaid (basada en texto, se renderiza directamente en Markdown en muchas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciales, con niveles gratuitos)

## Véase también {/*#see-also*/}

- [Visión general de UML](./uml-overview.mdx): clasificación de los tipos de diagrama en estructura y comportamiento
- [Diagrama de actividades](./activity-diagram.md): detalle del flujo de un único caso de uso
- [Diagrama de secuencia](./sequence-diagram.md): la interacción entre actor y sistema dentro de un escenario
- [Diagrama de clases](./class-diagram.md): la contrapartida estructural, que modela los objetos del dominio sobre los que operan los casos de uso
