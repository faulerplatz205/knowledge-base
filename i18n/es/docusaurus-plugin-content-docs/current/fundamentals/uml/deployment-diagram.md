---
title: "Diagrama de despliegue"
description: "Diagramas de despliegue UML: nodos, dispositivos y entornos de ejecución, artefactos y su despliegue, rutas de comunicación con estereotipos de protocolo, multiplicidades y anidamiento."
keywords:
    - UML
    - Diagrama de despliegue
    - Nodo
    - Dispositivo
    - Entorno de ejecución
    - Artefacto
    - Ruta de comunicación
    - Despliegue
    - Panorama de sistemas
    - Diagrama estructural
tags:
    - ap2
machine_translated: true
---

# Diagrama de despliegue

## Visión general {/*#overview*/}

Un diagrama de despliegue es un diagrama UML **estructural**. Muestra cómo se distribuye físicamente un sistema terminado: qué hardware y qué entornos de ejecución existen, qué archivos se instalan en ellos y a través de qué rutas de comunicación intercambian datos esas partes.

Aplicaciones típicas:

- Documentación del panorama de sistemas de una aplicación para operaciones y traspaso
- Representación de una arquitectura cliente-servidor o de tres capas, incluidos sus límites de red
- Planificación de una instalación: qué artefacto se copia en qué máquina
- Descripción de un despliegue en contenedores o en la nube con sus protocolos y número de réplicas
- Base para debatir sobre disponibilidad, escalado y zonas de seguridad

---

## Notación {/*#notation*/}

| Elemento              | Notación                                                               | Significado                                                                                           |
| --------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Nodo                  | Cuboide (caja tridimensional)                                          | Recurso de ejecución en el que algo se ejecuta o se almacena                                          |
| Dispositivo           | Cuboide con la palabra clave `<<device>>`                                   | Hardware físico: servidor, estación de trabajo, smartphone, router, impresora                         |
| Entorno de ejecución  | Cuboide con `<<executionEnvironment>>`, normalmente anidado dentro de un dispositivo      | Software que aloja artefactos: sistema operativo, JVM, servidor de aplicaciones, runtime de contenedores, SGBD |
| Artefacto             | Rectángulo con la palabra clave `<<artifact>>` o un icono de documento        | Archivo físico producido por el proceso de desarrollo                                                 |
| Despliegue            | Artefacto dibujado dentro de un nodo, o una flecha discontinua `<<deploy>>` | El artefacto está instalado en ese nodo                                                               |
| Manifestación         | Flecha discontinua `<<manifest>>` de un artefacto a un componente o clase     | El artefacto es la realización física de un elemento lógico                                           |
| Ruta de comunicación  | Línea continua entre dos nodos                                         | Conexión a través de la cual los nodos intercambian datos, sin dirección                              |
| Protocolo             | Estereotipo sobre la ruta, p. ej. `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`            | Protocolo utilizado en esa conexión                                                                   |
| Multiplicidad         | Número en el extremo de una ruta de comunicación, p. ej. `2` o `1..*` | Cuántos nodos de ese extremo están conectados con un nodo del otro extremo                          |
| Anidamiento           | Nodo o artefacto dibujado dentro de un nodo                            | Contención: el hardware contiene el runtime, que contiene el archivo                                  |
| Instancia             | Nombre subrayado con dos puntos al inicio, p. ej. `:AppServer`              | Una instancia concreta en lugar de un tipo                                                            |
| Nota                  | Rectángulo con esquina doblada sobre una línea discontinua             | Comentario sin semántica                                                                              |

Reglas de nomenclatura que mantienen legible un diagrama:

- Un nodo se nombra como tipo, `ApplicationServer`, o como máquina concreta, `appsrv01:ApplicationServer`. El nombre de una instancia se subraya en una herramienta de dibujo.
- Los artefactos llevan el nombre real del archivo, incluida su extensión: `shop.war`, no `Shop application`.
- Cada ruta de comunicación lleva un estereotipo de protocolo, una línea sin etiqueta indica solo *conectado de algún modo*.
- Las palabras clave y los estereotipos se escriben entre comillas angulares, `«device»`. La grafía `<<device>>` es la forma ASCII utilizada por las herramientas basadas en texto y es la que se emplea a continuación.

---

## Elementos básicos {/*#building-blocks*/}

### Nodo {/*#node*/}

Se distinguen dos tipos de nodo por la palabra clave:

- **`<<device>>`:** hardware físico, como un servidor, una estación de trabajo, un teléfono móvil o un controlador embebido
- **`<<executionEnvironment>>`:** un entorno de software que aloja artefactos y les proporciona servicios como gestión de memoria, transacciones o despacho de solicitudes

Un entorno de ejecución normalmente se anida dentro de un dispositivo. Un nodo sin palabra clave es simplemente *algún* recurso de ejecución.

```text
        ┌────────────────────────────────────────┐
       ╱                                        ╱│
      ┌────────────────────────────────────────┐ │
      │  <<device>>                            │ │
      │  ApplicationServer                     │ │
      │                                        │ │
      │  ┌──────────────────────────────────┐  │ │
      │  │  <<executionEnvironment>>        │  │ │
      │  │  Tomcat 10                       │  │ │
      │  │                                  │  │ │
      │  │  ┌────────────────────────────┐  │  │ │
      │  │  │  <<artifact>>              │  │  │ │
      │  │  │  shop.war                  │  │  │ │
      │  │  └────────────────────────────┘  │  │ │
      │  └──────────────────────────────────┘  │ ╱
      └────────────────────────────────────────┘╱
```

En una herramienta de dibujo, todos los nodos son cuboides, también los anidados. Los diagramas de aquí dibujan los nodos internos como rectángulos simples para que el anidamiento siga siendo legible en texto plano.

### Artefacto y despliegue {/*#artifact-and-deployment*/}

En la práctica, un artefacto es un archivo. Ejemplos típicos son `shop.war`, `payment-service.jar`, `setup.exe`, `schema.sql`, `nginx.conf` y una imagen de contenedor como `shop-app:2.4.0`.

Dos notaciones indican que un artefacto está instalado en un nodo:

- **Anidamiento:** el rectángulo del artefacto se dibuja dentro del nodo. Esta forma es más compacta y, con mucho, la más habitual.
- **Dependencia:** una flecha discontinua con la palabra clave `<<deploy>>` lleva del artefacto al nodo. Esta forma resulta útil cuando el mismo artefacto se despliega en varios nodos.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈┈ <<deploy>> ┈┈┈┈┈┈▶ │  <<device>>            │
 │  shop.war              │                          │  ApplicationServer     │
 └────────────────────────┘                          └────────────────────────┘
```

Una manifestación es la contrapartida que apunta hacia el diseño. Una flecha discontinua con la palabra clave `<<manifest>>` lleva del artefacto al componente o clase que realiza físicamente, y muestra así qué parte del modelo acaba en este archivo.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈ <<manifest>> ┈┈┈┈┈▶ │  <<component>>         │
 │  payment-service.jar   │                          │  PaymentService        │
 └────────────────────────┘                          └────────────────────────┘
```

### Ruta de comunicación {/*#communication-path*/}

Una ruta de comunicación es una línea continua sin punta de flecha, porque la conexión en sí no tiene dirección, y se etiqueta con el protocolo como estereotipo.

```text
    ┌──────────────────────┐                  ┌──────────────────────┐
   ╱                      ╱│                 ╱                      ╱│
  ┌──────────────────────┐ │                ┌──────────────────────┐ │
  │  <<device>>          │ │ 2            1 │  <<device>>          │ │
  │  AppServer           │ ├──── <<JDBC>> ──┤  DatabaseServer      │ │
  │                      │ ╱                │                      │ ╱
  └──────────────────────┘╱                 └──────────────────────┘╱
```

Estereotipos de protocolo habituales son `<<HTTP>>`, `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`, `<<REST>>`, `<<AMQP>>`, `<<SSH>>` y `<<SMTP>>`. La elección depende del nivel de detalle pretendido: `<<TCP/IP>>` nombra el transporte, `<<HTTPS>>` indica además que la conexión está cifrada, lo que suele ser la información más útil.

### Multiplicidad y anidamiento {/*#multiplicity-and-nesting*/}

Una multiplicidad se escribe en el extremo de una ruta de comunicación y requiere nombres de tipo: una instancia como `appsrv01:ApplicationServer` es siempre exactamente una máquina.

El anidamiento puede abarcar varios niveles, y cada nivel se ejecuta sobre el que lo rodea:

```text
<<device>>                  ServerHardware
  <<executionEnvironment>>    Linux
    <<executionEnvironment>>    Docker Engine
      <<artifact>>                shop-app:2.4.0
```

Los niveles que no importan para la finalidad del diagrama se omiten, p. ej. el runtime de contenedores en un plan de capacidad. En un plan de versiones, en cambio, la etiqueta de versión de la imagen es la información clave.

---

## Ejemplo: tienda web de tres capas {/*#example-three-tier-web-shop*/}

La tienda consta de un front end en el navegador, una aplicación en un contenedor y una base de datos relacional. Cada capa se ejecuta en su propia máquina, el servidor de aplicaciones existe dos veces y la base de datos solo es accesible desde el servidor de aplicaciones.

```text
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ClientPC                                  │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Browser                             │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 0..*
               <<HTTPS>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ApplicationServer                         │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Docker Engine                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-app:2.4.0                │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 2
                <<JDBC>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  DatabaseServer                            │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  PostgreSQL 16                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-schema.sql               │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
```

Lo que muestra este ejemplo:

- La multiplicidad `2` en el extremo del servidor de aplicaciones de la ruta `<<JDBC>>` indica que dos servidores de aplicaciones acceden a la base de datos, y `0..*` en el extremo del cliente, que puede conectarse cualquier número de clientes, incluso ninguno.
- No se dice nada sobre *cuándo* tiene lugar cada llamada. El orden de las llamadas pertenece a un [diagrama de secuencia](./sequence-diagram.md).

---

## Errores comunes {/*#common-mistakes*/}

1. **Clases o componentes dentro de un nodo:** un nodo contiene artefactos. El elemento lógico pertenece a un [diagrama de clases](./class-diagram.md) o a un diagrama de componentes y se enlaza con el artefacto mediante `<<manifest>>`.
2. **Ruta de comunicación sin protocolo:** sin `<<HTTPS>>` o `<<JDBC>>` en la línea, el diagrama ya no muestra qué conexiones están cifradas ni qué puertos tiene que abrir un cortafuegos.
3. **Confusión entre dispositivo y entorno de ejecución:** `<<device>>` es hardware, `<<executionEnvironment>>` es el software que se ejecuta en él. Un contenedor no es un dispositivo.
4. **Puntas de flecha en una ruta de comunicación:** la ruta no tiene dirección. Una dirección pertenece a una dependencia como `<<deploy>>` o `<<manifest>>`.
5. **Cada archivo dibujado:** solo lo que importa para la instalación y la operación pertenece al diagrama, no cada biblioteca y archivo de configuración.
6. **Multiplicidades ausentes:** un clúster de cuatro máquinas dibujado como un único nodo sin `4` oculta su tamaño.
7. **Capas lógicas equiparadas con nodos:** la capa de presentación, la de lógica y la de datos son una división lógica, los nodos son una división física. Tres capas pueden perfectamente ejecutarse en una sola máquina.

---

## Herramientas {/*#tools*/}

- draw.io / diagrams.net (gratuito, basado en navegador, biblioteca de formas UML incluida)
- PlantUML (basado en texto, el diagrama se genera a partir del código fuente y puede versionarse)
- Mermaid (basado en texto, se renderiza directamente en Markdown en muchas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciales, con niveles gratuitos)

## Véase también {/*#see-also*/}

- [Diagrama de componentes](./component-diagram.md): los bloques de construcción lógicos cuyos artefactos se despliegan aquí
- [Diagrama de clases](./class-diagram.md): la estructura de grano fino del software que acaba dentro de los artefactos
- [Diagrama de secuencia](./sequence-diagram.md): la interacción a través de las rutas de comunicación mostradas aquí
- [Visión general de UML](./uml-overview.mdx): clasificación de los tipos de diagrama
- [Fundamentos de la notación UML](./uml-notation-basics.md): palabras clave, estereotipos, nombres de instancia y los elementos compartidos por todos los tipos de diagrama
