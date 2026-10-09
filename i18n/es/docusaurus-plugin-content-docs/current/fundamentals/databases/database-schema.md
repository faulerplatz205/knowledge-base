---
title: "Esquema de base de datos"
description: "El esquema de base de datos relacional: tablas, claves, notación, la transformación de un modelo ER en tablas e integridad referencial."
keywords:
    - "Esquema de base de datos"
    - "Esquema relacional"
    - "Modelo relacional"
    - "Clave primaria"
    - "Clave foránea"
    - "Clave compuesta"
    - "Tabla de unión"
    - "Integridad referencial"
    - "Diseño de bases de datos"
tags:
    - ap2
machine_translated: true
---

# Esquema de base de datos

Un esquema de base de datos describe la estructura de una base de datos relacional: sus tablas, sus columnas con los tipos de datos, las claves y las referencias entre las tablas. A diferencia del [modelo ER](./er-model.md), está ligado al modelo relacional. Las relaciones dejan de existir como elementos propios y se expresan mediante claves foráneas y tablas de unión. El esquema se crea en la fase semántica del [desarrollo de bases de datos](./database-development-phases.md) y se implementa en la fase física con sentencias `CREATE TABLE`.

## Terminología {/*#terminology*/}

| Término relacional | Término común           | Significado                                                       |
| ------------------ | ----------------------- | ----------------------------------------------------------------- |
| Relación           | Tabla                   | Conjunto de filas con los mismos atributos                        |
| Tupla              | Fila, registro          | Una entrada de una tabla                                          |
| Atributo           | Columna                 | Una propiedad que tiene cada fila de la tabla                     |
| Dominio            | Tipo de datos           | Conjunto de valores que puede tomar un atributo                   |
| Esquema de relación | Definición de tabla    | Nombre de la tabla y sus atributos                                |
| Esquema de base de datos | Estructura de la base de datos | Todos los esquemas de relación de una base de datos y sus restricciones |

## Claves {/*#keys*/}

- **Clave candidata:** Un conjunto mínimo de atributos que identifica de forma única cada fila. Una tabla puede tener varias, p. ej. `CustomerID` y `Email`.
- **Clave primaria (PK):** La clave candidata elegida para identificar las filas. Debe ser única y no debe ser `NULL`.
- **Clave compuesta:** Una clave formada por varios atributos, p. ej. `(OrderID, LineNumber)`.
- **Clave foránea (FK):** Uno o más atributos que hacen referencia a la clave primaria de otra tabla o de la misma tabla. También puede formar parte de la clave primaria, como en una tabla de unión o en la tabla de una entidad débil.
- **Clave natural:** Una clave tomada de los propios datos, p. ej. un ISBN.
- **Clave sustituta (surrogate key):** Una clave artificial sin significado fuera de la base de datos, normalmente un número autoincremental o un UUID.

## Notación {/*#notation*/}

### Notación textual {/*#textual-notation*/}

Cada tabla se escribe como su nombre seguido de sus atributos entre paréntesis:

| Marca                                                  | Significado                                                                       |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Subrayado                                              | Clave primaria; en una clave compuesta, se subraya cada parte                     |
| `#` o `↑` al principio, a veces un subrayado discontinuo | Clave foránea                                                  |
| Sufijo `PK` o `FK`                               | Sustitución en texto plano cuando no es posible el subrayado                      |

Un atributo que es a la vez clave primaria y clave foránea se subraya y se marca con `#`.

### Diagrama de tablas {/*#table-diagram*/}

- **Recuadro:** Una tabla, con el nombre de la tabla como encabezado y las columnas debajo de la línea
- **`PK` y `FK`:** Marca delante de una columna; `PK FK` marca una columna que es ambas cosas
- **Línea:** Referencia de clave foránea entre dos tablas
- **Extremos de la línea:** Cardinalidad, ya sea `1` o `N`

## Transformación a partir de un modelo ER {/*#transformation-from-an-er-model*/}

| Elemento ER                           | Esquema de base de datos                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Tipo de entidad                       | Tabla                                                                                                            |
| Atributo                              | Columna                                                                                                          |
| Atributo clave                        | Clave primaria                                                                                                   |
| Atributo compuesto                    | Una columna por subatributo, p. ej. `Street`, `City`, `ZIP`                                                    |
| Atributo multivalor                   | Tabla independiente con una clave foránea al propietario, p. ej. `PhoneNumbers (#CustomerID, Number)`                                         |
| Atributo derivado                     | Normalmente no se almacena, sino que se calcula en la consulta                                                   |
| Relación 1:1                          | Clave foránea con una restricción `UNIQUE` en una de las dos tablas                                               |
| Relación 1:N                          | Clave foránea en la tabla del lado N                                                                             |
| Relación N:M                          | Tabla de unión cuya clave primaria se compone de las claves foráneas a ambas tablas                              |
| Atributo de relación                  | Columna en la tabla que contiene la clave foránea; en N:M, en la tabla de unión                                  |
| Entidad débil                         | Tabla cuya clave primaria combina la clave primaria del propietario (también clave foránea) y la clave parcial   |
| Participación total en el lado N      | Clave foránea declarada `NOT NULL`                                                                                  |

Una relación N:M entre estudiantes y cursos con el atributo de relación `EnrolledOn`:

```text
Students    (StudentID, Name)
             ─────────
Courses     (CourseID, Title)
             ────────
Enrollments (#StudentID, #CourseID, EnrolledOn)
             ──────────  ─────────
```

## Integridad referencial {/*#referential-integrity*/}

Cada valor de clave foránea debe coincidir con un valor de clave primaria existente en la tabla referenciada o ser `NULL` cuando la columna lo permita. El SGBD rechaza una inserción o actualización que infrinja esta regla. Lo que ocurre cuando se elimina una fila referenciada (`ON DELETE`) o se modifica su clave primaria (`ON UPDATE`) se establece para cada clave foránea:

| Opción                   | Efecto de eliminar la fila referenciada                                               |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `RESTRICT` / `NO ACTION` | Se rechaza la eliminación mientras existan filas que la referencian (predeterminado)  |
| `CASCADE`                | Las filas que la referencian también se eliminan, p. ej. las líneas de un pedido eliminado |
| `SET NULL`               | La clave foránea se establece en `NULL`; la columna debe admitir `NULL`               |

## Ejemplo: gestión de pedidos {/*#example-order-management*/}

El ejemplo del [modelo ER](./er-model.md) se convierte en tres tablas. La relación 1:N `places` se convierte en la clave foránea `CustomerID` en `Orders`. La relación identificadora `contains` hace que `OrderID` forme parte de la clave primaria de `OrderItems`.

```text
Customers  (CustomerID, Name, Email)
            ──────────
Orders     (OrderID, #CustomerID, OrderDate)
            ───────
OrderItems (#OrderID, LineNumber, Quantity)
            ────────  ──────────
```

```text
┌─────────────────────┐          ┌──────────────────────┐
│ Customers           │          │ Orders               │
├─────────────────────┤          ├──────────────────────┤
│ PK     CustomerID   │1        N│ PK     OrderID       │
│        Name         ├──────────┤ FK     CustomerID    │
│        Email        │          │        OrderDate     │
└─────────────────────┘          └──────────┬───────────┘
                                            │ 1
                                            │
                                            │ N
                                 ┌──────────┴───────────┐
                                 │ OrderItems           │
                                 ├──────────────────────┤
                                 │ PK FK  OrderID       │
                                 │ PK     LineNumber    │
                                 │        Quantity      │
                                 └──────────────────────┘
```

```sql
CREATE TABLE Customers (
    CustomerID INT          PRIMARY KEY,
    Name       VARCHAR(100) NOT NULL,
    Email      VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Orders (
    OrderID    INT  PRIMARY KEY,
    CustomerID INT  NOT NULL,
    OrderDate  DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
);

CREATE TABLE OrderItems (
    OrderID    INT NOT NULL,
    LineNumber INT NOT NULL,
    Quantity   INT NOT NULL,
    PRIMARY KEY (OrderID, LineNumber),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID) ON DELETE CASCADE
);
```

## Errores frecuentes {/*#common-mistakes*/}

1. **Línea sin columna de clave foránea:** Una línea entre dos tablas no crea ninguna referencia mientras falte la columna de clave foránea en la tabla del lado N.
2. **Clave foránea en el lado 1:** Una columna `OrderID` en `Customers` solo puede contener un pedido por cliente.
3. **N:M sin tabla de unión:** Una columna de clave foránea contiene un valor por fila, por lo que una clave foránea en cualquiera de las tablas limita ese lado a un único registro asociado.
4. **Tabla de unión solo con clave sustituta:** Si el par de claves foráneas no es la clave primaria ni `UNIQUE`, el mismo estudiante puede matricularse dos veces en el mismo curso.
5. **Notación ER en el esquema:** Los rombos, las elipses de atributos y los nombres de las relaciones pertenecen al diagrama ER. El esquema muestra tablas, marcas `PK` y `FK` y referencias.
6. **Palabras reservadas como nombres de tabla:** `ORDER` y `GROUP` son palabras reservadas en SQL y deben entrecomillarse en cada sentencia o sustituirse cuando se usan como nombres de tabla.

## Véase también {/*#see-also*/}

- [Modelo ER](./er-model.md): el modelo conceptual del que se deriva el esquema
- [Fases del desarrollo de bases de datos](./database-development-phases.md): dónde se sitúa el esquema entre la fase conceptual y la física
- [Normalización](./normalization.md): comprobación de la redundancia en las tablas de un esquema
- [Sublenguajes SQL](./sql-sublanguages.md): `CREATE TABLE` y las demás sentencias DDL
