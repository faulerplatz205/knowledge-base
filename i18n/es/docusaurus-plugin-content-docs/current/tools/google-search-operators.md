---
title: "Operadores de búsqueda de Google"
description: "Visión general de los operadores de búsqueda avanzada de Google y de técnicas para obtener resultados más precisos."
keywords:
    - Google
    - Búsqueda
    - Operadores de búsqueda
    - Google Dorking
    - Búsqueda avanzada
machine_translated: true
---

# Operadores de búsqueda de Google

## Coincidencia exacta {/*#exact-match*/}

Una frase entre comillas dobles busca exactamente esa secuencia de palabras.

```text
"dependency injection in Angular"
```

Devuelve únicamente resultados que contienen esa frase exacta, no páginas que solo mencionan las palabras sueltas por separado.

## Excluir términos {/*#exclude-terms*/}

`-` justo antes de una palabra excluye los resultados que contienen ese término.

```text
python -snake
```

Busca «python», pero excluye las páginas sobre serpientes.

## Operador OR {/*#or-operator*/}

`OR` (en mayúsculas) entre términos encuentra páginas que contienen cualquiera de los dos términos.

```text
React OR Vue
```

## Comodín {/*#wildcard*/}

`*` sirve como marcador de posición para palabras desconocidas dentro de una frase de coincidencia exacta.

```text
"how to * a REST API"
```

## Búsqueda en un sitio {/*#site-search*/}

`site:` restringe los resultados a un dominio concreto.

```text
site:developer.mozilla.org flexbox
```

También puede dirigirse a un TLD:

```text
site:edu machine learning
```

## Tipo de archivo {/*#file-type*/}

`filetype:` permite encontrar formatos de archivo específicos.

```text
filetype:pdf network security
```

Tipos de archivo habituales: `pdf`, `docx`, `xlsx`, `pptx`, `csv`, `xml`, `json`, `txt`

## Filtros de URL, título y texto {/*#url-title-and-text-filters*/}

- `inurl:`: el término debe aparecer en la URL
- `intitle:`: el término debe aparecer en el título de la página
- `intext:`: el término debe aparecer en el texto del cuerpo
- `allinurl:`, `allintitle:`, `allintext:`: todos los términos siguientes deben aparecer en la ubicación respectiva

```text
intitle:cheatsheet javascript
```

```text
allinurl:api docs v2
```

## Intervalo de fechas {/*#date-range*/}

`before:` y `after:` con fechas en formato `YYYY-MM-DD`.

```text
"React Server Components" after:2025-01-01
```

## Related y Cache {/*#related-and-cache*/}

- `related:`: encuentra sitios similares a un dominio dado
- `cache:`: muestra la versión en caché de Google de una página

```text
related:stackoverflow.com
```

## Combinación de operadores {/*#combining-operators*/}

Los operadores pueden combinarse para búsquedas muy específicas.

```text
site:github.com filetype:md "contributing guidelines"
```

```text
"error handling" site:stackoverflow.com -closed after:2024-01-01
```

```text
intitle:resume filetype:pdf site:edu "computer science"
```
