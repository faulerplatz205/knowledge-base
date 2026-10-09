---
title: "Normalización"
description: "Una visión general de las tres formas normales de bases de datos (1FN, 2FN, 3FN) con ejemplos."
keywords:
    - "Normalización"
    - "Base de datos"
    - "Bases de datos"
    - "1FN"
    - "2FN"
    - "3FN"
    - "Formas normales"
    - "Base de datos relacional"
tags:
    - ap2
machine_translated: true
---

# Normalización

## Visión general {/*#overview*/}

La normalización es el proceso de estructurar una base de datos relacional para reducir la redundancia de datos y mejorar la integridad de los datos. Cada forma normal se basa en la anterior.

## Redundancia {/*#redundancy*/}

La redundancia es la repetición innecesaria de los mismos datos en una base de datos.

## Primera forma normal (1FN) {/*#first-normal-form-1nf*/}

**Regla**: cada columna debe contener valores atómicos (indivisibles) y cada fila debe ser única.

**Infracción**: una columna `Phone` que almacena varios números en una misma celda.

| CustomerID | Name  | Phone            |
| ---------- | ----- | ---------------- |
| 1          | Alice | 111-111, 222-222 |

**Corregido**:

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

**Infracción**: varias columnas para el mismo atributo.

| CustomerID | Name  | Phone1  | Phone2  |
| ---------- | ----- | ------- | ------- |
| 1          | Alice | 111-111 | 222-222 |

**Corregido**:

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

## Segunda forma normal (2FN) {/*#second-normal-form-2nf*/}

**Regla**: debe estar en 1FN y cada atributo no clave debe depender de **toda** la clave primaria, no solo de una parte de ella

**Infracción**: la tabla utiliza `(OrderID, ProductID)` como clave compuesta, pero `ProductName` depende únicamente de `ProductID`.

| OrderID | ProductID | ProductName | Quantity |
| ------- | --------- | ----------- | -------- |
| 1       | 42        | Keyboard    | 2        |
| 2       | 42        | Keyboard    | 1        |

**Corregido**: mover `ProductName` a una tabla `Products` independiente.

**Orders**:

| OrderID | ProductID | Quantity |
| ------- | --------- | -------- |
| 1       | 42        | 2        |
| 2       | 42        | 1        |

**Products**:

| ProductID | ProductName |
| --------- | ----------- |
| 42        | Keyboard    |

## Tercera forma normal (3FN) {/*#third-normal-form-3nf*/}

**Regla**: debe estar en 2FN y ningún atributo no clave puede depender de otro atributo no clave (sin dependencias transitivas).

**Infracción**: `DepartmentHead` depende de `Department`, no directamente de `EmployeeID`.

| EmployeeID | Department | DepartmentHead |
| ---------- | ---------- | -------------- |
| 1          | Sales      | Carol          |
| 2          | Sales      | Carol          |
| 3          | IT         | Dave           |

**Corregido**: mover `DepartmentHead` a una tabla `Departments` independiente.

**Employees**:

| EmployeeID | Department |
| ---------- | ---------- |
| 1          | Sales      |
| 2          | Sales      |
| 3          | IT         |

**Departments**:

| Department | DepartmentHead |
| ---------- | -------------- |
| Sales      | Carol          |
| IT         | Dave           |

## Resumen {/*#summary*/}

| Forma normal | Requisito                                                            |
| ------------ | -------------------------------------------------------------------- |
| 1FN          | Valores atómicos, sin columnas repetidas, filas únicas               |
| 2FN          | 1FN + sin dependencias parciales de una clave compuesta              |
| 3FN          | 2FN + sin dependencias transitivas entre atributos no clave          |
