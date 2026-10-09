---
title: "Diagrama de componentes"
description: "Diagramas de componentes UML: componentes, interfaces provistas y requeridas, conectores de ensamblado y de delegación, puertos, artefactos y manifestación, anidamiento, dependencias y delimitación frente a los diagramas de clases y de despliegue."
keywords:
    - UML
    - Diagrama de componentes
    - Componente
    - Interfaz provista
    - Interfaz requerida
    - Conector de ensamblado
    - Conector de delegación
    - Puerto
    - Artefacto
    - Arquitectura de software
    - Diagrama estructural
tags:
    - ap2
machine_translated: true
---

# Diagrama de componentes

## Visión general {/*#overview*/}

Un diagrama de componentes es un diagrama UML **estructural**. Muestra cómo se divide un sistema en bloques de construcción sustituibles y qué interfaces se ofrecen y se requieren entre sí esos bloques.

Un componente en el sentido de UML es una parte modular de un sistema cuyo contenido está oculto y cuyo comportamiento queda definido por completo por sus interfaces. De esa definición se derivan dos consecuencias:

- Un componente puede sustituirse por cualquier otro componente que provea las mismas interfaces.
- Nada fuera del componente puede depender de cómo funciona internamente.

Aplicaciones típicas:

- Documentación de la arquitectura de un sistema como visión general de grano grueso
- Fijación del contrato de interfaces entre equipos antes de comenzar la implementación
- Visualización de las dependencias para que resulte evidente un acoplamiento cíclico o excesivo
- Planificación de qué partes pueden construirse, probarse, desplegarse o sustituirse de forma independiente

---

## Notación {/*#notation*/}

| Elemento                                                                | Notación                                                          | Significado                                                                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [Componente](#component)                                                | Rectángulo con la palabra clave `<<component>>`                   | Una parte sustituible y autocontenida del sistema                                                |
| [Icono de componente](#component)                                       | Rectángulo pequeño con dos pestañas salientes, arriba a la derecha | Marca alternativa de un componente, puede usarse en lugar de la palabra clave o junto con ella   |
| [Interfaz provista](#provided-and-required-interfaces)                  | Línea que termina en un círculo relleno (*bola*, *piruleta*)      | Servicio que el componente ofrece a su entorno                                                   |
| [Interfaz requerida](#provided-and-required-interfaces)                 | Línea que termina en un semicírculo (*enchufe*)                   | Servicio que el componente necesita de su entorno                                                |
| [Conector de ensamblado](#assembly-connector)                           | Enchufe colocado sobre una bola                                   | El requisito de un componente se satisface con la oferta de otro                                 |
| [Puerto](#ports-and-delegation-connectors)                              | Cuadrado pequeño en el borde del componente                       | Punto de interacción con nombre a través del cual se exponen las interfaces                      |
| [Conector de delegación](#ports-and-delegation-connectors)              | Flecha desde un puerto hasta un componente interno                | Reenvía lo que llega al puerto a la parte que lo gestiona                                        |
| [Interfaz](#provided-and-required-interfaces) (notación de rectángulo)  | Rectángulo con la palabra clave `<<interface>>`                   | Contrato detallado con sus operaciones, complementa la bola, que solo lleva el nombre            |
| [Dependencia](#dependencies)                                            | Flecha discontinua con punta abierta                              | El origen necesita el destino, sin una interfaz con nombre                                       |
| [Artefacto](#artifacts-and-manifestation)                               | Rectángulo con la palabra clave `<<artifact>>`                    | Un archivo físico: `.jar`, `.dll`, `.war`, script, archivo de configuración                     |
| [Manifestación](#artifacts-and-manifestation)                           | Flecha discontinua etiquetada `<<manifest>>` del artefacto al componente | El artefacto es la realización física de ese componente                                          |
| [Componente anidado](#nested-components)                                | Componente dibujado dentro de otro componente                     | Estructura interna, las *partes* de las que se compone el componente exterior                    |
| Nota                                                                    | Rectángulo con esquina doblada sobre una línea discontinua        | Comentario sin semántica                                                                         |

Reglas de nomenclatura que mantienen legible un diagrama:

- Los componentes se nombran según su responsabilidad, como sustantivo: `PaymentService`, no `DoPayment` ni `Payments2`.
- Las interfaces se nombran según el servicio, habitualmente con un `I` inicial: `IPayment`, `IInventory`.
- El mismo nombre de interfaz se refiere siempre al mismo contrato. Un diagrama no debe usar un nombre para dos cosas distintas.

---

## Elementos básicos {/*#building-blocks*/}

### Componente {/*#component*/}

Un componente no tiene un tamaño fijo. Las opciones típicas son un servicio desplegable, una biblioteca, una capa de la arquitectura o un área autocontenida del dominio.

```text
 ╭──────────────────────╮
 │ <<component>>     ⊞  │
 │ PaymentService       │
 ╰──────────────────────╯
```

### Interfaces provistas y requeridas {/*#provided-and-required-interfaces*/}

Siempre que sea posible, las dependencias entre componentes se expresan mediante interfaces, nunca mediante acceso directo a los elementos internos. Para la excepción, véase [Dependencias](#dependencies).

- Una **interfaz provista** se dibuja como una línea con un círculo relleno en su extremo. Es la promesa *esto se ofrece y puede utilizarse*.
- Una **interfaz requerida** se dibuja como una línea con un semicírculo en su extremo. Es la demanda *esto se necesita, alguien tiene que suministrarlo*.

```text
   provided interface                  required interface
   (ball, lollipop)                    (socket)

 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │            │ <<component>>     ⊞  │
 │ PaymentService       │───○        │ OrderService         │───C
 ╰──────────────────────╯            ╰──────────────────────╯
```

La bola solo lleva el nombre de la interfaz. Cuando las operaciones en sí son relevantes, la interfaz se dibuja además como un rectángulo con la palabra clave `<<interface>>` y su lista de operaciones, y se enlaza con la bola.

### Conector de ensamblado {/*#assembly-connector*/}

Un conector de ensamblado une una interfaz requerida con una provista. Gráficamente, el enchufe se coloca sobre la bola, por lo que la notación también se denomina *bola y enchufe*.

```text
 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │ IPayment   │ <<component>>     ⊞  │
 │ OrderService         │───C○───────│ PaymentService       │
 ╰──────────────────────╯            ╰──────────────────────╯
```

El conector establece que `OrderService` utiliza `PaymentService` **únicamente** a través de `IPayment`. Cualquier componente que provea `IPayment` puede ocupar el lugar de `PaymentService`.

### Puertos y conectores de delegación {/*#ports-and-delegation-connectors*/}

Un puerto es un punto de interacción con nombre explícito en el borde de un componente. Se dibuja como un cuadrado pequeño en el borde y agrupa las interfaces accesibles en ese punto. Los puertos resultan útiles en cuanto un componente ofrece la misma interfaz en varios lugares, por ejemplo un punto de entrada interno y otro externo con distintas reglas de acceso.

Dentro del componente, un conector de delegación lleva desde el puerto hasta la parte que gestiona realmente la solicitud.

```text
               IOrdering
                   ○
                   │
 ╭─────────────────■─────────────────────────────────────────────╮
 │ <<component>>   │                                          ⊞  │
 │ OrderManagement │  delegation                                 │
 │                 │                                             │
 │    ╭────────────┴─────────╮            ╭──────────────────╮   │
 │    │ <<component>>     ⊞  │  IPricing  │ <<component>> ⊞  │   │
 │    │ OrderIntake          │───C○───────│ PricingEngine    │   │
 │    ╰──────────────────────╯            ╰──────────────────╯   │
 │                                                               │
 ╰───────────────────────────────────────────────────────────────╯
```

El exterior solo ve `IOrdering` en el puerto. Que detrás existan `OrderIntake` y `PricingEngine`, y cómo estén conectados, puede cambiarse en cualquier momento.

### Componentes anidados {/*#nested-components*/}

Los componentes pueden contener otros componentes. Los internos son las *partes* con las que se ensambla el exterior. El anidamiento es lo que convierte un diagrama de componentes en una herramienta para varios niveles de abstracción: el nivel superior muestra un puñado de subsistemas y cada uno de ellos puede refinarse en un diagrama propio.

Dos reglas mantienen coherente el refinamiento:

- Toda interfaz del componente exterior se delega en una parte interna o la realiza el propio componente exterior.
- Una parte interna nunca se conecta directamente con el exterior. La conexión siempre pasa por un puerto del componente que la contiene.

### Artefactos y manifestación {/*#artifacts-and-manifestation*/}

Un componente es una unidad lógica, un artefacto es un archivo físico. La relación entre ambos se denomina *manifestación* y se dibuja como una flecha discontinua con la palabra clave `<<manifest>>` que apunta del artefacto al componente.

```text
 ╭──────────────────────────────╮
 │ <<artifact>>                 │
 │ payment-service.jar          │
 ╰───────────────┬──────────────╯
                 ╎
                 ╎ <<manifest>>
                 ▼
 ╭───────────────────────────────╮
 │ <<component>>              ⊞  │
 │ PaymentService                │
 ╰───────────────────────────────╯
```

La correspondencia no tiene que ser uno a uno. Un artefacto puede manifestar varios componentes y un componente puede repartirse en varios artefactos, por ejemplo una implementación y un archivo de configuración independiente.

### Dependencias {/*#dependencies*/}

Además de las interfaces, puede dibujarse una dependencia simple como una flecha discontinua con punta abierta. Significa *el origen necesita el destino* sin nombrar un contrato, y es la afirmación más débil y menos precisa.

Una dependencia es adecuada para relaciones que realmente no tienen una interfaz propia, como el uso de un modelo de datos compartido o de un sistema externo que no se modela con más detalle. Siempre que exista una interfaz, se prefiere la notación de bola y enchufe, porque solo ella indica *a través de qué* discurre la dependencia.

---

## Correspondencia con la implementación {/*#mapping-to-implementation*/}

| Diagrama de componentes | Implementación típica                                                              |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Componente              | Servicio desplegable, módulo Maven/Gradle, paquete npm, ensamblado .NET            |
| Interfaz provista       | API pública de un módulo, recurso REST, tema de mensajería                         |
| Interfaz requerida      | Dependencia inyectada, stub de cliente                                             |
| Conector de ensamblado  | Cableado en el contenedor de inyección de dependencias o en la raíz de composición |
| Puerto                  | Endpoint publicado, por ejemplo una URL base o el nombre de una cola               |
| Conector de delegación  | Reenvío del punto de entrada a la clase interna que gestiona la solicitud          |
| Artefacto               | Resultado de la compilación: `.jar`, `.dll`, `.war`, imagen de contenedor, bundle |
| Manifestación           | El paso de compilación que empaqueta el código de un componente en ese archivo     |
| Dependencia             | Import o `require` sin un contrato acordado                                        |

---

## Delimitación frente a otros diagramas {/*#delimitation-from-other-diagrams*/}

### Diagrama de componentes y diagrama de clases {/*#component-diagram-and-class-diagram*/}

| Aspecto                | Diagrama de componentes                         | Diagrama de clases                        |
| ---------------------- | ----------------------------------------------- | ----------------------------------------- |
| Unidad mostrada        | Subsistema, servicio, módulo                    | Clase, atributo, operación                |
| Granularidad           | Gruesa, un puñado de cajas por diagrama         | Fina, a menudo decenas de clases          |
| Tipo de relación       | Interfaz provista/requerida, ensamblado         | Asociación, herencia, agregación          |
| Pregunta que responde  | Qué partes existen y cómo están acopladas       | Cómo está estructurada internamente una parte |
| Audiencia típica       | Arquitectura, límites de equipos, planificación | Implementación de un único componente     |

### Diagrama de componentes y diagrama de despliegue {/*#component-diagram-and-deployment-diagram*/}

Un diagrama de componentes es *lógico*, un [diagrama de despliegue](./deployment-diagram.md) es *físico*.

| Aspecto               | Diagrama de componentes                    | Diagrama de despliegue                        |
| --------------------- | ------------------------------------------ | --------------------------------------------- |
| Elemento principal    | Componente                                 | Nodo: hardware, máquina virtual, contenedor   |
| Pregunta que responde | Cómo está estructurado el software         | Dónde se ejecuta el software                  |
| Relaciones            | Interfaces y conectores                    | Rutas de comunicación, protocolos             |
| Artefactos            | Aparecen como manifestación de un componente | Aparecen como despliegue sobre un nodo      |

---

## Ejemplo: tienda en línea {/*#example-online-shop*/}

La tienda consta de una interfaz de usuario, un servicio de pedidos, un servicio de pagos y un servicio de existencias. La interfaz de usuario no sabe nada sobre cómo se procesan los pedidos, solo necesita `IOrdering`. El servicio de pedidos, a su vez, necesita `IPayment` y `IStock` y no sabe qué componentes los suministran.

```text
 ╭────────────────────╮          ╭────────────────────╮          ╭────────────────────╮
 │ <<component>>   ⊞  │IOrdering │ <<component>>   ⊞  │IPayment  │ <<component>>   ⊞  │
 │ ShopUI             │───C○─────│ OrderService       │───C○─────│ PaymentService     │
 ╰────────────────────╯          ╰──────────┬─────────╯          ╰────────────────────╯
                                            ∩
                                            ○  IStock
                                            │
                                 ╭──────────┴─────────╮
                                 │ <<component>>   ⊞  │
                                 │ StockService       │
                                 ╰────────────────────╯
```

Lo que muestra este ejemplo:

- `ShopUI` tiene exactamente un enchufe y, por tanto, está acoplado a un único contrato. Puede añadirse un segundo front end, por ejemplo una aplicación móvil, sin cambiar nada detrás de `IOrdering`.
- `OrderService` lleva dos enchufes. Una prueba de `OrderService` tiene que rellenar ambos, con `PaymentService` y `StockService` o con dobles de prueba. Cada enchufe adicional es una dependencia más que proporcionar, de modo que un componente con muchos enchufes es difícil de probar de forma aislada.

Una ampliación realista encerraría `OrderService`, `PaymentService` y `StockService` en un componente `Backend` con un único puerto que exponga `IOrdering` y lo delegue en `OrderService`. `ShopUI` se conectaría entonces a ese puerto y la estructura interna del backend pasaría a ser intercambiable.

---

## Errores comunes {/*#common-mistakes*/}

1. **Componentes conectados sin interfaz:** una línea simple muestra que dos componentes están acoplados, pero no a través de qué contrato. Cuando existe una interfaz, se dibuja como bola y enchufe.
2. **Bola y enchufe intercambiados:** el círculo relleno pertenece al componente que *ofrece* el servicio, el semicírculo al que lo *necesita*.
3. **Interfaz requerida sin proveedor:** un enchufe abierto significa que el sistema no puede ejecutarse. Falta un componente o el requisito es obsoleto.
4. **Clases dibujadas como componentes:** los atributos, las operaciones y las asociaciones pertenecen al diagrama de clases.
5. **Partes internas conectadas saltándose el límite:** un conector desde un componente interno directamente hacia el exterior elude el puerto del componente que lo contiene.
6. **Dependencias cíclicas:** dos componentes que requieren mutuamente sus interfaces ya no pueden construirse, desplegarse ni sustituirse por separado.
7. **Un nombre de interfaz para contratos distintos:** dos bolas con el mismo nombre deben ofrecer las mismas operaciones.
8. **Confusión entre componente y artefacto:** `PaymentService` es el componente, `payment-service.jar` el artefacto que lo manifiesta.
9. **Demasiados componentes en un diagrama:** demasiadas cajas hacen ilegible un diagrama. Los detalles pertenecen a un diagrama aparte que refine un único componente.

---

## Herramientas {/*#tools*/}

- draw.io / diagrams.net (gratuito, basado en navegador, biblioteca de formas UML incluida)
- PlantUML (basado en texto, el diagrama se genera a partir del código fuente y puede versionarse)
- Mermaid (basado en texto, se renderiza directamente en Markdown en muchas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciales, con niveles gratuitos)

## Véase también {/*#see-also*/}

- [Diagrama de clases](./class-diagram.md): la estructura de grano fino dentro de un único componente
- [Diagrama de despliegue](./deployment-diagram.md): la contrapartida física, que muestra dónde se ejecutan los artefactos de los componentes
- [Diagrama de secuencia](./sequence-diagram.md): muestra cómo interactúan los componentes a lo largo del tiempo a través de sus interfaces
- [Diagrama de actividades](./activity-diagram.md): los procesos que se ejecutan a través de los componentes
- [Visión general de UML](./uml-overview.mdx): clasificación de los tipos de diagrama
- [Fundamentos de la notación UML](./uml-notation-basics.md): palabras clave, estereotipos, notas y los elementos compartidos por todos los tipos de diagrama
