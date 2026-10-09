---
title: "JSON"
description: "Convenciones de JSON: nomenclatura de archivos, nomenclatura de claves y comparación de JSON, JSONC y JSON5"
keywords:
  - "JSON"
  - "JSONC"
  - "JSON5"
  - "Nomenclatura de archivos"
  - "Nomenclatura de claves"
  - "kebab-case"
  - "camelCase"
  - "Convenciones de nomenclatura"
tags:
  - ap2
machine_translated: true
---

# JSON

## Visión general {/*#overview*/}

JSON (JavaScript Object Notation) es un formato de datos ligero basado en texto, introducido por Douglas Crockford a principios de la década de 2000. Deriva de la sintaxis de literales de objeto de JavaScript, pero es independiente del lenguaje. Hoy en día JSON es el formato más utilizado para el intercambio de datos entre clientes y servidores web, archivos de configuración y API.

## Nomenclatura de archivos {/*#file-naming*/}

### Respuesta: kebab-case {/*#answer-kebab-case*/}

```text
user-data.json
api-config.json
database-schema.json
```

### ¿Por qué kebab-case? {/*#why-kebab-case*/}

- **Seguro entre plataformas**: Sin problemas con sistemas de archivos que no distinguen mayúsculas de minúsculas (Windows/macOS)
- **Mejor legibilidad** en listas de archivos y exploradores
- **Apto para URL**: Funciona sin codificación si los archivos se sirven por HTTP

## Nomenclatura de claves {/*#key-naming*/}

### Respuesta: camelCase {/*#answer-camelcase*/}

```json
{
  "userId": 123,
  "firstName": "Alice",
  "isActive": true
}
```

### ¿Por qué camelCase? {/*#why-camelcase*/}

- Estándar en el ecosistema JavaScript/TypeScript, de donde procede JSON
- La propia especificación de JSON no prescribe un estilo de claves
- La mayoría de las API web públicas (Google, GitHub, Stripe) utilizan camelCase

### Nota {/*#note*/}

`snake_case` es habitual en API centradas en Python (p. ej. Django REST Framework, FastAPI). Conviene elegir un estilo y mantenerlo de forma coherente dentro de un proyecto.

## JSON frente a JSONC frente a JSON5 {/*#json-vs-jsonc-vs-json5*/}

| Característica                | JSON                        | JSONC                                | JSON5                                    |
| ----------------------------- | --------------------------- | ------------------------------------ | ---------------------------------------- |
| Comentarios                   | No                          | `//` y `/* */`                   | `//` y `/* */`                       |
| Comas finales                 | No                          | Sí                                   | Sí                                       |
| Claves sin comillas           | No                          | No                                   | Sí                                       |
| Cadenas con comillas simples  | No                          | No                                   | Sí                                       |
| Uso típico                    | Intercambio de datos, API   | Archivos de configuración (VS Code, TypeScript) | Archivos de configuración, datos editados manualmente |
