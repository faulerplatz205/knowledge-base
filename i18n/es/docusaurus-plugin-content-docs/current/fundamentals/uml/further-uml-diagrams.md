---
title: "Otros diagramas UML"
description: "Diagrama de objetos, de paquetes, de comunicación, de tiempos, de visión general de interacción, de estructura compuesta y de perfiles: finalidad, elementos centrales de notación, uso típico y límite con el diagrama UML más próximo."
keywords:
    - UML
    - Diagrama de objetos
    - Diagrama de paquetes
    - Diagrama de comunicación
    - Diagrama de tiempos
    - Diagrama de visión general de interacción
    - Diagrama de estructura compuesta
    - Diagrama de perfiles
    - Estereotipo
    - Diagrama estructural
    - Diagrama de comportamiento
tags:
    - ap2
machine_translated: true
---

# Otros diagramas UML

## Visión general {/*#overview*/}

UML 2.5 define catorce tipos de diagrama. Aquí se enumeran los siete que no cuentan con una entrada propia.

| Diagrama                                  | Categoría    | Pregunta central                                                                  |
| ----------------------------------------- | ------------ | --------------------------------------------------------------------------------- |
| Diagrama de objetos                       | Estructura   | ¿Qué instancias concretas existen en un momento dado y cómo están enlazadas?      |
| Diagrama de paquetes                      | Estructura   | ¿Cómo se divide el modelo en unidades y qué unidad depende de cuál?               |
| Diagrama de comunicación                  | Comportamiento | ¿Qué objetos intercambian mensajes y a lo largo de qué enlaces?                 |
| Diagrama de tiempos                       | Comportamiento | ¿Qué estado mantiene un elemento en qué punto del eje temporal?                 |
| Diagrama de visión general de interacción | Comportamiento | ¿En qué orden se ejecutan interacciones completas?                              |
| Diagrama de estructura compuesta          | Estructura   | ¿Cómo está construido internamente un clasificador y a través de qué puertos se comunica? |
| Diagrama de perfiles                      | Estructura   | ¿Cómo se extiende el propio UML para un dominio o una plataforma?                 |

---

## Diagrama de objetos {/*#object-diagram*/}

Una instantánea de un sistema en un momento concreto: las instancias que existen y los enlaces entre ellas. La notación es la del [diagrama de clases](./class-diagram.md), pero a nivel de instancia.

Elementos centrales de notación:

- **Especificación de instancia:** rectángulo con un nombre subrayado de la forma `name : Class`; el nombre o la clase pueden omitirse (`o7 : Order`, `: Order`, `o7`)
- **Valores de atributos:** en el compartimento inferior como `attribute = value`
- **Enlace:** línea continua simple entre dos instancias, la contrapartida a nivel de instancia de una asociación; sin multiplicidades, porque un enlace une siempre exactamente dos instancias

El texto plano no puede mostrar un subrayado; en la notación real los nombres `m1 : Customer` y `o7 : Order` están subrayados:

```text
 ┌────────────────────┐              ┌────────────────────┐
 │ m1 : Customer      │   places     │ o7 : Order         │
 ├────────────────────┤──────────────├────────────────────┤
 │ name = "Meier"     │              │ total = 249.90     │
 │ city = "Kiel"      │              │ status = "paid"    │
 └────────────────────┘              └────────────────────┘
```

Uso típico: explicar un diagrama de clases complicado con un ejemplo resuelto, debatir una constelación concreta de datos, documentar datos de prueba o el estado en el que se produce un defecto.

---

## Diagrama de paquetes {/*#package-diagram*/}

Un diagrama de paquetes muestra cómo se divide un modelo en unidades y qué unidad depende de cuál. Los paquetes no tienen comportamiento propio.

Elementos centrales de notación:

- **Paquete:** rectángulo con una pestaña; el anidamiento se escribe gráficamente o como `shop::service`
- **Dependencia:** flecha discontinua que apunta del paquete que utiliza al paquete utilizado
- **`«import»`:** hace utilizables sin cualificación los elementos públicos del paquete de destino
- **`«access»`:** la misma relación, pero sin transmitir más allá los nombres importados
- **`«merge»`:** copia conceptualmente el contenido del paquete de destino en el paquete de origen y lo combina con él
- **Estratificación:** paquetes dispuestos unos sobre otros con todas las dependencias apuntando en una dirección

```text
┌──────┐
│ shop │
├──────┴──────────────────┐
│                         │
│   ┌─────────┐           │
│   │ ui      │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────┐           │
│   │ service │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────────┐       │
│   │ persistence │       │
│   ├─────────────┴───┐   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
└─────────────────────────┘
```

Uso típico: arquitecturas en capas, división de un sistema en módulos, visualización de dependencias cíclicas antes de que lleguen al código.

Límite: un [diagrama de componentes](./component-diagram.md) describe bloques de construcción sustituibles que ofrecen y requieren interfaces en tiempo de ejecución, un diagrama de paquetes solo organiza elementos del modelo y del código fuente en tiempo de diseño.

---

## Diagrama de comunicación {/*#communication-diagram*/}

Un diagrama de comunicación muestra qué objetos intercambian mensajes y a lo largo de qué enlaces lo hacen. Los objetos se colocan libremente, el orden de los mensajes se deduce de su numeración.

Elementos centrales de notación:

- **Objeto:** rectángulo con un `name : Class` subrayado, como en el diagrama de objetos
- **Enlace:** línea continua entre dos objetos
- **Mensaje:** flecha pequeña dibujada junto al enlace, etiquetada `1: placeOrder()`
- **Números de secuencia jerárquicos:** `1`, `1.1`, `1.2`, con `1.1` y `1.2` enviados uno tras otro como parte de la gestión del mensaje `1`
- **Marcador de iteración y guardas:** `*` y `[condition]` como parte de la etiqueta del mensaje

```text
  ┌──────────┐   1: placeOrder() ►  ┌─────────────┐
  │ : Client │──────────────────────│ : OrderCtrl │
  └──────────┘   ◄ 1.3: confirm()   └─────────────┘
                                           │
                                           │ ▼ 1.1: checkStock()
                                           │ ▼ 1.2: reserve()
                                           │
                                    ┌─────────────┐
                                    │ : Warehouse │
                                    └─────────────┘
```

Uso típico: hacer visible qué objetos se comunican entre sí, valorar el acoplamiento de un diseño, interacciones pequeñas en las que la estructura importa más que el orden exacto.

Límite: un [diagrama de secuencia](./sequence-diagram.md) muestra la misma interacción a lo largo de un eje temporal explícito de arriba abajo y ofrece fragmentos combinados como `alt`, `opt` y `loop`. Los objetos, los mensajes y su orden pueden trasladarse de un diagrama al otro, los fragmentos combinados no tienen contrapartida en el diagrama de comunicación. Las alternativas y los bucles se leen mejor en un diagrama de secuencia, la red de enlaces se ve mejor en un diagrama de comunicación.

---

## Diagrama de tiempos {/*#timing-diagram*/}

Un diagrama de tiempos muestra cómo evoluciona el estado o el valor de uno o más elementos a lo largo de un eje temporal explícito.

Elementos centrales de notación:

- **Eje temporal:** horizontal, con una escala, un carril por línea de vida
- **Línea de vida de estado:** línea escalonada entre los estados enumerados en el eje vertical
- **Línea de vida de valor:** forma compacta de banda en la que un cruce marca el cambio de valor
- **Duración y restricción temporal:** `{d..3*d}` y `{t = 0}`
- **Eventos y mensajes:** flechas entre los carriles
- **Marcas de escala:** unidades de la escala temporal

```text
 : Motor
           │
   active  │         ┌──────────────┐
           │         │              │
   idle    ├─────────┘              └──────────
           │         ├── {20..40} ──┤
           └────┬────┬────┬────┬────┬────┬────┬───► t
           0    10   20   30   40   50   60   70  ms
```

Uso típico: sistemas de tiempo real y embebidos, protocolos de bus y de red, control relacionado con el hardware, requisitos de latencia, tiempos de espera y tiempos mínimos de retención.

Límite: un [diagrama de máquina de estados](./state-machine-diagram.md) define qué estados y transiciones son posibles, sin eje temporal. Un diagrama de tiempos muestra cuándo se encuentra un elemento en cada uno de esos estados.

---

## Diagrama de visión general de interacción {/*#interaction-overview-diagram*/}

Un diagrama de visión general de interacción ordena varios diagramas de secuencia, de comunicación o de tiempos en un único flujo de control, siendo cada nodo una interacción completa.

Elementos centrales de notación:

- **Marco:** con el encabezado `sd <name>`
- **Uso de interacción:** rectángulo con la palabra clave `ref` y el nombre de un diagrama de interacción existente
- **Interacción en línea:** un pequeño diagrama de secuencia incrustado directamente como nodo
- **Elementos de control:** todos los del diagrama de actividades, es decir, nodo inicial, decisión, fusión, bifurcación, unión, nodo final

```text
 ┌ sd Checkout ─────────────────────────────┐
 │                  ●                       │
 │                  │                       │
 │                  ▼                       │
 │          ┌───────────────┐               │
 │          │ ref  Login    │               │
 │          └───────────────┘               │
 │                  │                       │
 │             ╱─────────╲                  │
 │            ╱  paid ?   ╲                 │
 │            ╲           ╱                 │
 │             ╲─────────╱                  │
 │       [yes]  │       │  [no]             │
 │     ┌────────┘       └────────┐          │
 │     ▼                         ▼          │
 │ ┌───────────────┐   ┌───────────────┐    │
 │ │ ref  Ship     │   │ ref  Cancel   │    │
 │ └───────────────┘   └───────────────┘    │
 │     │                         │          │
 │     └────────┐       ┌────────┘          │
 │              ▼       ▼                   │
 │                  ◉                       │
 └──────────────────────────────────────────┘
```

Uso típico: la vista global de un protocolo o de una transacción de negocio de larga duración que consta de muchas interacciones individuales.

Límite: un [diagrama de actividades](./activity-diagram.md) utiliza los mismos elementos de control, pero sus nodos son acciones individuales. El diagrama de visión general de interacción es también una alternativa a un diagrama de secuencia desmesurado repleto de fragmentos `alt` y `loop` anidados.

---

## Diagrama de estructura compuesta {/*#composite-structure-diagram*/}

Un diagrama de estructura compuesta examina el interior de un único clasificador: de qué partes consta, cómo están conectadas esas partes y a través de qué puntos de interacción está conectado con su entorno.

Elementos centrales de notación:

- **Parte:** rectángulo dentro del marco del clasificador, escrito como `role : Type` con una multiplicidad opcional, p. ej. `wheels : Wheel [4]`
- **Puerto:** cuadrado pequeño en el borde del clasificador, un punto de interacción con nombre y tipo
- **Interfaces:** interfaz provista como piruleta `─○`, interfaz requerida como enchufe `─(`
- **Conectores:** conector de ensamblado entre dos partes, conector de delegación entre una parte y un puerto
- **Colaboración:** elipse discontinua con roles con nombre, que describe un patrón de cooperación con independencia de clases concretas

```text
 ┌ Car ──────────────────────────────────────┐
 │                                           │
 │ ┌────────────┐        ┌──────────────┐    │
 │ │ e : Engine │────────│ g : Gearbox  │────┼──□───○ Drive
 │ └────────────┘        └──────────────┘    │
 │                                           │
 └───────────────────────────────────────────┘
```

Uso típico: la arquitectura interna de un componente, el cableado de partes en el diseño de sistemas y embebido, la descripción de un patrón de diseño como colaboración de roles.

Límite: un [diagrama de clases](./class-diagram.md) indica qué clases se relacionan en general, un diagrama de estructura compuesta indica cómo están conectadas las instancias dentro de un todo en un rol específico. Un [diagrama de componentes](./component-diagram.md) utiliza la misma notación de piruleta y enchufe, pero al nivel de los bloques de construcción desplegables del sistema completo y no del interior de un clasificador.

---

## Diagrama de perfiles {/*#profile-diagram*/}

Un diagrama de perfiles extiende el propio UML para un dominio o una plataforma de destino.

Elementos centrales de notación:

- **Perfil:** paquete con la palabra clave `«profile»`
- **Estereotipo:** rectángulo con la palabra clave `«stereotype»`, que extiende una metaclase existente; cualquier nombre entre comillas angulares que no sea una palabra clave UML predefinida es un estereotipo definido en algún perfil
- **Extensión:** línea continua con punta de flecha rellena del estereotipo a la metaclase, p. ej. `«metaclass» Class`
- **Valor etiquetado:** atributo del estereotipo, p. ej. `table : String`, que se completa en el elemento que lleva el estereotipo
- **Restricción:** regla entre llaves, escrita en OCL o en texto libre
- **Aplicación:** dependencia `«apply»` de un paquete al perfil; sus elementos pueden entonces llevar `«entity»`, `«controller»`, etc.

```text
 ┌ «profile» Persistence ─────────────────────┐
 │                                            │
 │  ┌─────────────────┐     ┌───────────────┐ │
 │  │ «stereotype»    │────►│ «metaclass»   │ │
 │  │ Entity          │     │ Class         │ │
 │  ├─────────────────┤     └───────────────┘ │
 │  │ table : String  │                       │
 │  └─────────────────┘                       │
 └────────────────────────────────────────────┘
```

Relación con el metamodelo: UML se describe mediante una arquitectura de cuatro capas. `M0` contiene los objetos reales, `M1` el modelo, `M2` el metamodelo UML que define qué es una clase o una asociación, y `M3` MOF (Meta Object Facility), el lenguaje en el que se escribe el propio metamodelo. Un perfil es el mecanismo de extensión ligero de UML: extiende la capa `M2` sin modificarla, razón por la cual los modelos con perfiles aún pueden intercambiarse entre herramientas. Una extensión pesada alteraría directamente el metamodelo y crearía así un nuevo lenguaje.

Uso típico: lenguajes de modelado específicos de dominio como SysML o MARTE, correspondencia de un modelo con una plataforma como JPA o EJB, convenciones de modelado de toda una empresa.

---

## Véase también {/*#see-also*/}

- [Visión general de UML](./uml-overview.mdx): clasificación de todos los tipos de diagrama en estructura y comportamiento
- [Fundamentos de la notación UML](./uml-notation-basics.md): elementos compartidos por todos los diagramas UML, incluidos palabras clave, estereotipos y notas
- [Diagrama de clases](./class-diagram.md): la base de los diagramas de objetos, de paquetes y de estructura compuesta
- [Diagrama de secuencia](./sequence-diagram.md): la contrapartida orientada al tiempo del diagrama de comunicación
- [Modelo ER](../databases/er-model.md): modela los datos cuyas instancias concretas muestra un diagrama de objetos
