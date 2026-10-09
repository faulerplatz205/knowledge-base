---
title: "Diagrama de clases"
description: "Explicación completa de los diagramas de clases UML. Incluye estructura, visibilidad, relaciones, cardinalidad, buenas prácticas y un ejemplo basado en un sistema de biblioteca."
keywords:
    - UML
    - Diagrama de clases
last_update:
    author: moritz-grimm
tags:
    - ap2
machine_translated: true
---

# Diagrama de clases

## Definición {/*#definition*/}

Un diagrama de clases es un diagrama UML estructural que visualiza la estructura estática de un sistema mostrando las clases, sus atributos, métodos y las relaciones entre ellos. Es uno de los diagramas más utilizados en la programación orientada a objetos y en el diseño de software.

## Finalidad {/*#purpose*/}

Los diagramas de clases se utilizan para:

- Modelar la estructura de un sistema
- Visualizar las relaciones entre clases
- Planificar la arquitectura del software antes de la implementación
- Documentar la estructura de código existente
- Comunicar decisiones de diseño a los miembros del equipo

## Componentes {/*#components*/}

### Clases {/*#classes*/}

Una clase se representa como un rectángulo dividido en tres secciones:

```text
┌─────────────────┐
│   ClassName     │  ← Class name (PascalCase)
├─────────────────┤
│   - attribute   │  ← Attributes (camelCase)
│   # attribute   │
├─────────────────┤
│   + method()    │  ← Methods (camelCase)
└─────────────────┘
```

### Atributos {/*#attributes*/}

Los atributos representan los datos o propiedades de una clase.

**Sintaxis:** `visibility name: dataType`

Ejemplo: `- email: String`

### Métodos {/*#methods*/}

Los métodos representan el comportamiento o las funciones de una clase.

**Sintaxis:** `visibility methodName(parameter: type): returnType`

Ejemplo: `+ getName(): String`

### Modificadores de visibilidad {/*#visibility-modifiers*/}

| Símbolo | Visibilidad | Significado                              | Cuándo usarlo                 |
| ------- | ----------- | ---------------------------------------- | ----------------------------- |
| `-`     | Privado     | Accesible solo dentro de la clase        | Valor por defecto para atributos |
| `#`     | Protegido   | Accesible en la clase y sus subclases    | Para atributos heredados      |
| `+`     | Público     | Accesible desde cualquier lugar          | Valor por defecto para métodos |
| `~`     | Paquete     | Accesible dentro del mismo paquete       | Raramente usado               |

## Relaciones {/*#relationships*/}

### Asociación {/*#association*/}

Una relación general entre dos clases que indica que los objetos de una clase están conectados con objetos de otra.

**Notación:** línea continua que conecta dos clases

**Ejemplo:** un `Customer` está asociado con un `Order`

```text
Customer ────── Order
```

### Agregación (propiedad débil) {/*#aggregation-weak-ownership*/}

Un tipo especial de asociación en el que una clase es un contenedor de otra, pero la clase contenida puede existir de forma independiente.

**Notación:** rombo hueco en el lado del contenedor

**Ejemplo:** una `Library` tiene `Books`, pero los libros pueden existir sin la biblioteca

```text
Library ◇────── Book
```

**Recordatorio:** si se destruye el contenedor, los objetos contenidos sobreviven.

### Composición (propiedad fuerte) {/*#composition-strong-ownership*/}

Una forma más fuerte de agregación en la que la clase contenida no puede existir sin el contenedor.

**Notación:** rombo relleno en el lado del contenedor

**Ejemplo:** un `Book` tiene `Chapters`, los capítulos no pueden existir sin el libro

```text
Book ◆────── Chapter
```

**Recordatorio:** si se destruye el contenedor, los objetos contenidos también se destruyen.

### Herencia {/*#inheritance*/}

Representa una relación en la que una clase (subclase o hija) hereda atributos y métodos de otra clase (superclase o padre).

**Notación:** flecha hueca que apunta a la clase padre

**Ejemplo:** `Dog` y `Cat` heredan de `Animal`

```text
      Animal
         △
         │
    ┌────┴────┐
    │         │
   Dog       Cat
```

**Importante:** los atributos heredados en la clase padre deben usar visibilidad `protected` (`#`) para que las subclases puedan acceder a ellos.

## Cardinalidad (multiplicidad) {/*#cardinality-multiplicity*/}

La cardinalidad especifica cuántas instancias de una clase pueden estar asociadas con instancias de otra clase.

| Notación           | Significado        | Ejemplo                                                |
| ------------------ | ------------------ | ------------------------------------------------------ |
| `1`                | Exactamente uno    | Una persona tiene exactamente una fecha de nacimiento  |
| `0..1`             | Cero o uno         | Una persona puede tener cero o un permiso de conducir  |
| `*` o `0..*`      | Cero o más         | Una biblioteca puede tener cero o más libros           |
| `1..*`             | Uno o más          | Un libro tiene una o más páginas                       |
| `n..m`             | Rango específico   | Un curso tiene entre 5 y 30 estudiantes                |

**Ubicación:** la cardinalidad se coloca cerca de la clase que describe.

```text
Library 1 ────── 0..* Book
```

Lectura: una biblioteca puede tener cero o más libros

## Convenciones de nomenclatura {/*#naming-conventions*/}

### Reglas generales {/*#general-rules*/}

1. **Nombres de clase:** comienzan con mayúscula (PascalCase)
   - ✅ `Customer`, `ShoppingCart`
   - ❌ `customer`, `shopping_cart`

2. **Atributos y métodos:** comienzan con minúscula (camelCase)
   - ✅ `firstName`, `calculateTotal()`
   - ❌ `FirstName`, `CalculateTotal()`

3. **Sin diéresis ni caracteres especiales**
   - ✅ `doppelgaenger`
   - ❌ `doppelgänger`

4. **Atributos booleanos:** prefijo `is`, `has` o `can`
   - ✅ `isActive`, `hasPermission`

5. **Nombres de método:** usar verbos
   - ✅ `calculateTotal()`, `saveData()`
   - ❌ `total()`, `data()`

## Buenas prácticas {/*#best-practices*/}

### Visibilidad de los atributos {/*#attribute-visibility*/}

- **Por defecto:** usar `private` (`-`) para todos los atributos
- **Excepción:** usar `protected` (`#`) para atributos que serán heredados por subclases
- **Evitar:** hacer los atributos `public` salvo que sea estrictamente necesario

### Visibilidad de los métodos {/*#method-visibility*/}

- **Por defecto:** usar `public` (`+`) para los métodos que forman la interfaz de la clase
- **Usar `private`:** para métodos auxiliares utilizados solo dentro de la clase

### Clases abstractas {/*#abstract-classes*/}

Las clases abstractas se indican:

- Escribiendo el nombre de la clase en *cursiva*
- O añadiendo `<<abstract>>` encima del nombre de la clase

```text
┌────────────────────────┐
│   <<abstract>>         │
│      Vehicle           │
├────────────────────────┤
│ # licensePlate: String │
├────────────────────────┤
│ + startEngine(): void  │
└────────────────────────┘
```

### Interfaces {/*#interfaces*/}

Las interfaces se indican añadiendo `<<interface>>` encima del nombre de la interfaz.

## Ejemplo completo: sistema de biblioteca {/*#complete-example-library-system*/}

Este ejemplo muestra todos los conceptos importantes de los diagramas de clases.

### Escenario {/*#scenario*/}

Un sistema sencillo de gestión de bibliotecas con libros, revistas, usuarios y funcionalidad de préstamo.

### Resumen de clases {/*#classes-overview*/}

- Medium (clase padre abstracta)
  - Clase abstracta que representa cualquier elemento prestable
  - Los atributos son `protected` porque se heredan

- Book (hereda de Medium)
  - Tipo específico de medio
  - Tiene una relación de composición con los capítulos

- Magazine (hereda de Medium)
  - Otro tipo específico de medio

- Chapter
  - Parte de un libro (composición)
  - No puede existir sin un libro

- Library
  - Contiene medios (agregación)
  - Los medios pueden existir sin la biblioteca

- Media
  - Forma parte de la biblioteca (agregación)
  - Puede existir sin la biblioteca

- User
  - Puede tomar prestados medios (asociación)

### Detalle de las clases {/*#class-details*/}

#### Medium (abstracta) {/*#medium-abstract*/}

```text
┌────────────────────────────┐
│     <<abstract>>           │
│        Medium              │
├────────────────────────────┤
│ # titel: String            │
│ # isbn: String             │
├────────────────────────────┤
│ + borrowMedium(): boolean  │
│ + returnMedium(): void     │
└────────────────────────────┘
```

#### Book {/*#book*/}

```text
┌─────────────────────────┐
│         Book            │
├─────────────────────────┤
│ - author: String        │
│ - numberOfPages: int    │
├─────────────────────────┤
│ + getAuthor(): String   │
└─────────────────────────┘
```

#### Magazine {/*#magazine*/}

```text
┌────────────────────────┐
│       Magazine         │
├────────────────────────┤
│ - edition: int         │
│ - releaseDate: Date    │
├────────────────────────┤
│ + getEdition(): int    │
└────────────────────────┘
```

#### Chapter {/*#chapter*/}

```text
┌─────────────────────────┐
│       Chapter           │
├─────────────────────────┤
│ - chapterNumber: int    │
│ - headline: String      │
├─────────────────────────┤
└─────────────────────────┘
```

#### Library {/*#library*/}

```text
┌──────────────────────────────────────────┐
│            Library                       │
├──────────────────────────────────────────┤
│ - name: String                           │
│ - adress: String                         │
├──────────────────────────────────────────┤
│ + addMedium(medium: Medium): void        │
│ + removeMedium(medium: Medium): boolean  │
└──────────────────────────────────────────┘
```

#### Benutzer {/*#benutzer*/}

```text
┌─────────────────────────────────────────┐
│           User                          │
├─────────────────────────────────────────┤
│ - userId: int                           │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Relaciones {/*#relationships-1*/}

1. **Herencia:**
   - `Book` hereda de `Medium`
   - `Magazine` hereda de `Medium`

2. **Composición:** `Book ◆────── 1..* Chapter`
   - Un libro debe tener al menos un capítulo
   - Los capítulos no pueden existir sin su libro

3. **Agregación:** `Library ◇────── 0..* Medium`
   - Una biblioteca puede tener cero o más medios
   - Los medios pueden existir con independencia de la biblioteca

4. **Asociación:** `User ────── * Medium` (etiquetada "borrows")
   - Los usuarios pueden tomar prestados varios medios
   - Los medios pueden ser tomados en préstamo por varios usuarios a lo largo del tiempo

### Representación visual {/*#visual-representation*/}

```text
                    ┌────────────────────────────┐
                    │     <<abstract>>           │
                    │        Medium              │
                    ├────────────────────────────┤
                    │ # titel: String            │
                    │ # isbn: String             │
                    ├────────────────────────────┤
                    │ + borrowMedium(): boolean  │
                    │ + returnMedium(): void     │
                    └───────────┬────────────────┘
                                △
                                │ (inheritance)
                    ┌───────────┴───────────┐
                    │                       │
        ┌───────────┴──────────┐   ┌────────┴──────────────┐
        │       Book           │   │    Magazine           │
        ├──────────────────────┤   ├───────────────────────┤
        │ - author: String     │   │ - edition: int        │
        │ - numberOfPages: int │   │ - releaseDate: Date   │
        ├──────────────────────┤   ├───────────────────────┤
        │ + getAuthor()        │   │ + getEdition()        │
        └─────────┬────────────┘   └───────────────────────┘
                  │
                  │ ◆ (composition)
                  │ 1..*
        ┌─────────┴────────────┐
        │      Chapter         │
        ├──────────────────────┤
        │ - chapterNumber: int │
        │ - headline: String   │
        └──────────────────────┘


┌────────────────────────┐                *  ┌────────────────┐
│        Library         │ ◇──────────────   │    Medium     │
├────────────────────────┤  (aggregation)    └────────────────┘
│ - name: String         │
│ - adress: String       │
├────────────────────────┤
│ + mediumHinzufuegen()  │
│ + mediumEntfernen()    │
└────────────────────────┘


┌─────────────────────────────────────────┐ 1         borrows         *  ┌─────────────────┐
│     User                                │ ───────────────────────────  │     Medium      │
├─────────────────────────────────────────┤        (association)         └─────────────────┘
│ - benutzerId: int                       │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Conclusiones de este ejemplo {/*#key-takeaways-from-this-example*/}

1. **Atributos protegidos en Medium:** `titel` y `isbn` son protegidos (`#`) para que `Buch` y `Zeitschrift` puedan heredarlos
2. **Composición frente a agregación:** los capítulos pertenecen fuertemente a los libros (composición), mientras que los medios pueden existir sin una biblioteca (agregación)
3. **Herencia:** tanto `Buch` como `Zeitschrift` heredan comportamiento común de `Medium`
4. **Cardinalidad:** un libro debe tener al menos un capítulo (`1..*`), pero una biblioteca puede tener cero medios (`0..*`)

## Errores comunes que evitar {/*#common-mistakes-to-avoid*/}

1. **Uso de atributos públicos:** casi siempre se usan privados o protegidos
2. **Olvidar la cardinalidad:** especificar siempre cuántas instancias pueden relacionarse
3. **Tipo de relación incorrecto:** comprender la diferencia entre agregación y composición
4. **Nomenclatura inconsistente:** usar camelCase para atributos y métodos, PascalCase para clases

## Herramientas para crear diagramas de clases {/*#tools-for-creating-class-diagrams*/}

- draw.io / diagrams.net (gratuito, basado en navegador)
- Lucidchart (versión gratuita limitada)
- PlantUML (basado en texto, requiere configuración)
- Visual Paradigm
- StarUML

## Véase también {/*#see-also*/}

- [Diagrama de objetos](./further-uml-diagrams.md#object-diagram): una instantánea concreta de instancias en un momento dado
- [Diagrama de secuencia](./sequence-diagram.md): la interacción entre objetos de estas clases a lo largo del tiempo
- [Diagrama de casos de uso](./use-case-diagram.md): la contrapartida de comportamiento, que muestra qué servicios ofrecen estas clases a los actores
- [Modelo ER](../databases/er-model.md): la contrapartida relacional, que describe cómo se persisten en tablas los atributos de estas clases
