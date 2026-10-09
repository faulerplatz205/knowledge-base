---
title: "Sublenguajes de SQL"
description: ""
keywords:
    - "SQL"
    - "Sublenguajes"
    - "DDL"
    - "DML"
    - "DQL"
    - "DCL"
    - "Lenguaje de definición de datos"
    - "Lenguaje de manipulación de datos"
    - "Lenguaje de consulta de datos"
    - "Lenguaje de control de datos"
    - "Base de datos"
    - "Bases de datos"
    - "Base de datos relacional"
tags:
    - ap2
machine_translated: true
---

# Sublenguajes de SQL

## DDL (Data Definition Language) {/*#ddl-data-definition-language*/}

Los comandos DDL definen y gestionan la estructura de una base de datos, es decir, sus tablas, columnas, restricciones e índices.

**Comandos habituales:**

- `CREATE` — crea una nueva tabla, vista, índice o base de datos
- `ALTER` — modifica una estructura existente (p. ej., añadir o eliminar una columna)
- `DROP` — elimina de forma permanente una tabla o una base de datos
- `TRUNCATE` — elimina todas las filas de una tabla sin eliminar la propia tabla

## DML (Data Manipulation Language) {/*#dml-data-manipulation-language*/}

Los comandos DML se utilizan para modificar los datos almacenados.

**Comandos habituales:**

- `INSERT` — añade nuevas filas a una tabla
- `UPDATE` — modifica filas existentes
- `DELETE` — elimina filas de una tabla

## DQL (Data Query Language) {/*#dql-data-query-language*/}

DQL se utiliza para consultar y recuperar datos de la base de datos sin modificarlos.

**Comandos habituales:**

- `SELECT` — recupera filas de una o más tablas, opcionalmente filtradas, agrupadas u ordenadas

## DCL (Data Control Language) {/*#dcl-data-control-language*/}

DCL gestiona los derechos de acceso y los permisos de los usuarios de la base de datos.

**Comandos habituales:**

- `GRANT` — concede a un usuario permiso para realizar acciones específicas
- `REVOKE` — retira permisos concedidos anteriormente
