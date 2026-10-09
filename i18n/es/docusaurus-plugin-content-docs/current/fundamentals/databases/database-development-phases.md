---
title: "Fases del desarrollo de bases de datos"
description: "Resumen de las cuatro fases del desarrollo de bases de datos: externa, conceptual, semántica y física."
keywords:
    - "diseño de bases de datos"
    - "desarrollo de bases de datos"
    - "modelo ER"
    - "diseño conceptual"
    - "diseño físico"
    - "normalización"
tags:
    - ap2
machine_translated: true
---

# Fases del desarrollo de bases de datos

El desarrollo de una base de datos se divide normalmente en cuatro fases sucesivas, cada una de las cuales produce un artefacto más concreto que la anterior.

## 1. Fase externa {/*#1-external-phase*/}

Recopilar y analizar los requisitos de todos los futuros usuarios y grupos de interesados. El objetivo es comprender qué datos debe gestionar el sistema y qué operaciones debe admitir, sin pensar todavía en cómo se estructurará la base de datos.

Los resultados típicos son documentos de requisitos y descripciones informales de los datos y de las reglas de negocio.

## 2. Fase conceptual {/*#2-conceptual-phase*/}

Traducir los requisitos a un modelo de datos abstracto e independiente de la implementación. La herramienta estándar para ello es el [**modelo entidad-relación (ERM)**](./er-model.md), que recoge las entidades, sus atributos y las relaciones entre ellas.

El modelo conceptual es independiente de la tecnología: describe *qué* aspecto tienen los datos, no *cómo* se almacenarán.

## 3. Fase semántica {/*#3-semantic-phase*/}

Refinar y formalizar el modelo conceptual definiendo con precisión las restricciones de integridad, las cardinalidades y las reglas de negocio. Después, el ERM se transforma en un [**esquema de base de datos relacional**](./database-schema.md) (tablas, columnas, claves primarias, claves foráneas).

Esta fase incluye también la [**normalización**](./normalization.md), que elimina la redundancia y las anomalías.

## 4. Fase física {/*#4-physical-phase*/}

Implementar el modelo relacional en un SGBD concreto (p. ej. PostgreSQL, MySQL). Esta fase abarca:

- Escribir sentencias `CREATE TABLE` con los tipos de datos adecuados
- Definir índices para optimizar el rendimiento de las consultas
- Configurar parámetros de almacenamiento específicos del SGBD elegido
- Establecer el control de acceso y las políticas de seguridad

El modelo físico está estrechamente ligado al sistema de destino y puede diferir entre productos de SGBD.
