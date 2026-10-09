---
title: "Modelo ER"
description: "Una visión general del modelo entidad-relación: entidades, atributos, relaciones, cardinalidad, entidades débiles y notación de Chen."
keywords:
    - "Modelo ER"
    - "Entidad-relación"
    - "Diseño de bases de datos"
    - "Modelado de datos"
    - "Entidades"
    - "Atributos"
    - "Relaciones"
    - "Cardinalidad"
    - "Entidad débil"
    - "Notación de Chen"
tags:
    - ap2
machine_translated: true
---

# Modelo ER

El modelo entidad-relación (modelo ER) es un modelo de datos conceptual que describe la estructura de una base de datos en un nivel alto e independientemente de cualquier sistema de bases de datos concreto. Fue introducido por Peter Chen en 1976. En el siguiente paso del diseño, el modelo ER se transforma en un [esquema de base de datos](./database-schema.md) compuesto por tablas, claves primarias y claves foráneas.

## Conceptos básicos {/*#core-concepts*/}

### Entidades {/*#entities*/}

Una entidad, también denominada **instancia de entidad**, es un objeto del mundo real o del pensamiento identificable de forma única, p. ej., un cliente concreto o un pedido concreto. Las entidades del mismo tipo se agrupan en **tipos de entidad** (p. ej., `Customer`, `Product`, `Order`).

### Atributos {/*#attributes*/}

Los atributos describen las propiedades de un tipo de entidad.

| Tipo         | Descripción                        | Ejemplo                         |
| ------------ | ---------------------------------- | ------------------------------- |
| Simple       | Valor atómico, indivisible         | `FirstName`, `Age`              |
| Compuesto    | Formado por subatributos           | `Address` = (Street, City, ZIP) |
| Multivalor   | Puede contener varios valores      | `PhoneNumbers`                  |
| Derivado     | Calculado a partir de otro atributo | `Age` derivado de `BirthDate`  |

El **atributo clave** identifica de forma única cada instancia de entidad, p. ej., `CustomerID`. Pasa a ser entonces la clave primaria en el esquema de base de datos.

### Relaciones {/*#relationships*/}

Una relación describe una asociación entre dos o más tipos de entidad. Al igual que las entidades, las relaciones se agrupan en **tipos de relación** (p. ej., un `Customer` *realiza* un `Order`). El propio tipo de relación expresa esta asociación, por lo que el modelo ER no contiene claves foráneas. Estas solo aparecen cuando el modelo se convierte en el esquema de base de datos. Las relaciones también pueden tener atributos propios (p. ej., una relación `WorksFor` podría incluir un `StartDate`).

## Cardinalidad {/*#cardinality*/}

La cardinalidad define cuántas instancias de una entidad pueden asociarse con instancias de otra.

| Tipo | Descripción                                    | Ejemplo                                                                              |
| ---- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1:1  | Una instancia se relaciona exactamente con otra | Una persona tiene un pasaporte                                                       |
| 1:N  | Una instancia se relaciona con muchas otras    | Un cliente realiza muchos pedidos                                                    |
| N:M  | Muchas instancias se relacionan con muchas otras | Los estudiantes se matriculan en varios cursos; los cursos tienen varios estudiantes |

La **participación** especifica además si cada instancia de entidad debe tomar parte en una relación:

- **Participación total** (obligatoria): cada instancia debe estar en al menos una relación, p. ej., cada pedido debe pertenecer a un cliente.
- **Participación parcial** (opcional): algunas instancias pueden no participar, p. ej., no todos los clientes han realizado un pedido.

## Entidades débiles {/*#weak-entities*/}

Una **entidad débil** no puede identificarse de forma única solo por sus propios atributos. Depende de una **entidad fuerte (propietaria)** para su identidad.

- La entidad débil tiene una **clave parcial** (discriminante) que es única solo en el contexto de su propietaria.
- La relación que conecta una entidad débil con su propietaria se denomina **relación identificadora**.
- Una entidad débil siempre tiene participación total en su relación identificadora.

**Ejemplo:** `OrderItem` es una entidad débil. Su clave parcial `LineNumber` es única solo dentro de un `Order` concreto. La identidad completa es `(OrderID, LineNumber)`.

## Notación {/*#notation*/}

| Elemento                           | Representa                                  |
| ---------------------------------- | ------------------------------------------- |
| Rectángulo                         | Tipo de entidad                             |
| Rectángulo de doble línea          | Tipo de entidad débil                       |
| Rombo                              | Tipo de relación                            |
| Rombo de doble línea               | Relación identificadora                     |
| Elipse                             | Atributo                                    |
| Elipse con el nombre subrayado     | Atributo clave                              |
| Elipse con subrayado discontinuo   | Clave parcial de una entidad débil          |
| Elipse de doble línea              | Atributo multivalor                         |
| Elipse discontinua                 | Atributo derivado                           |
| Elipse con otras elipses           | Atributo compuesto y sus subatributos       |
| Línea simple                       | Participación parcial                       |
| Línea doble                        | Participación total                         |
| `1`, `N`, `M` junto a una línea    | Cardinalidad                                |

**Importante:** a diferencia de un [diagrama de tablas](./database-schema.md#table-diagram) o de un [diagrama de clases UML](../uml/class-diagram.md), los atributos de una entidad no se escriben dentro de su rectángulo. Cada atributo tiene su propia elipse, conectada a la entidad mediante una línea.

## Ejemplo: gestión de pedidos {/*#example-order-management*/}

Un `Customer` realiza `Orders`, cada uno compuesto por uno o más `OrderItems`. Cada pedido pertenece a un cliente y contiene al menos un artículo, por lo que `Order` participa totalmente en ambas relaciones. Se permite un cliente sin pedidos.

```text
  ╭────────────╮    ╭──────╮    ╭───────╮
  │ CustomerID │    │ Name │    │ Email │
  │ ────────── │    ╰───┬──╯    ╰───┬───╯
  ╰─────┬──────╯        │           │
        └───────────────┼───────────┘
                        │
                ┌───────┴───────┐
                │   Customer    │
                └───────┬───────┘
                        │ 1
                  ╱─────┴─────╲
                 ╱    places   ╲
                 ╲             ╱
                  ╲─────╥─────╱
                        ║ N
                ┌───────╨───────┐        ╭─────────╮
                │     Order     ├───┬────┤ OrderID │
                └───────╥───────┘   │    │ ─────── │
                        ║           │    ╰─────────╯
                        ║ 1         │    ╭───────────╮
                        ║           └────┤ OrderDate │
                  ╱═════╩═════╲          ╰───────────╯
                 ╱╱  contains ╲╲
                 ╲╲           ╱╱
                  ╲═════╦═════╱
                        ║ N
                ╔═══════╩═══════╗        ╭────────────╮
                ║   OrderItem   ╟───┬────┤ LineNumber │
                ╚═══════════════╝   │    │ ╌╌╌╌╌╌╌╌╌╌ │
                                    │    ╰────────────╯
                                    │    ╭──────────╮
                                    └────┤ Quantity │
                                         ╰──────────╯
```

## Errores comunes {/*#common-mistakes*/}

1. **Atributos dentro del rectángulo de la entidad:** un rectángulo con una lista de columnas es una tabla de un esquema de base de datos, no un tipo de entidad de Chen.
2. **Claves foráneas como atributos:** `CustomerID` como atributo de `Order` duplica la relación `places` y solo corresponde al esquema de base de datos como clave foránea.
3. **Multiplicidades UML en un diagrama de Chen:** en lugar de rangos UML como `1..*` o `0..1`, Chen utiliza `1`, `N` y `M` y expresa el mínimo mediante líneas simples o dobles.
4. **Entidad débil sin relación identificadora:** un rectángulo de doble línea requiere un rombo de doble línea que lo conecte con su propietaria.

## Véase también {/*#see-also*/}

- [Esquema de base de datos](./database-schema.md): las tablas, claves y reglas de transformación derivadas de un modelo ER
- [Fases de desarrollo de una base de datos](./database-development-phases.md): el modelo ER como resultado de la fase conceptual
- [Normalización](./normalization.md): eliminación de la redundancia en las tablas derivadas de un modelo ER
