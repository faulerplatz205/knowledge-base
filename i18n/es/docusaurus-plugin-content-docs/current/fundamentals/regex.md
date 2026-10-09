---
title: "Expresiones regulares"
description: "Visión general de la sintaxis de las expresiones regulares, las clases de caracteres, los cuantificadores, los anclajes, los grupos, el lookaround y los patrones habituales."
keywords:
    - "Expresiones regulares"
    - "Regex"
    - "Coincidencia de patrones"
    - "Clases de caracteres"
    - "Cuantificadores"
    - "Anclajes"
    - "Lookahead"
    - "Lookbehind"
    - "Grupos"
tags:
    - ap2
machine_translated: true
---

# Expresiones regulares

## Visión general {/*#overview*/}

Las expresiones regulares (regex) son patrones que se utilizan para encontrar combinaciones de caracteres en cadenas. Son compatibles con prácticamente todos los lenguajes de programación y con muchas herramientas de línea de comandos (p. ej. `grep`, `sed`, `awk`). Un motor de expresiones regulares recorre la cadena de entrada y comprueba si el patrón coincide y en qué posición.

## Fundamentos {/*#basics*/}

### Clases de caracteres {/*#character-classes*/}

Coinciden con un **único carácter** de un conjunto definido.

| Sintaxis | Significado                                 |
| -------- | ------------------------------------------- |
| `.`      | Cualquier carácter excepto el salto de línea |
| `[abc]`  | Uno de `a`, `b` o `c`                       |
| `[^abc]` | Cualquier carácter excepto `a`, `b` o `c` |
| `[a-z]`  | Cualquier letra minúscula                   |
| `[0-9]`  | Cualquier dígito                            |
| `\d`     | Dígito (`[0-9]`)                            |
| `\D`     | No dígito (`[^0-9]`)                         |
| `\w`     | Carácter de palabra (`[a-zA-Z0-9_]`)               |
| `\W`     | Carácter que no es de palabra (`[^a-zA-Z0-9_]`)     |
| `\s`     | Espacio en blanco (`[ \t\n\r\f\v]`)                 |
| `\S`     | Distinto de espacio en blanco (`[^\t\n\r\f\v]`)     |

#### Ejemplos {/*#examples*/}

```text
Pattern: [A-Z]\w+
Input:   "Hello World 123"
Matches: Hello, World
```

`[A-Z]` coincide con una letra mayúscula y `\w+` coincide después con uno o más caracteres de palabra. `123` no tiene una letra mayúscula al principio, por lo que se omite. `\w` sí incluye dígitos, pero `[A-Z]` restringe el primer carácter a letras únicamente.

```text
Pattern: \d\d\d
Input:   "Call 555-1234"
Matches: 555, 123
```

Tres dígitos consecutivos. El `-` rompe la secuencia, por lo que `1234` produce dos ventanas superpuestas, pero solo `123` coincide como grupo completo de tres dígitos (el motor continúa entonces en `4`, que por sí solo no basta).

### Cuantificadores {/*#quantifiers*/}

Controlan **cuántas veces** debe aparecer el elemento anterior.

| Sintaxis | Significado                                |
| -------- | ------------------------------------------ |
| `*`      | 0 o más [(voraz)](#greedy-vs-lazy)         |
| `+`      | 1 o más [(voraz)](#greedy-vs-lazy)         |
| `?`      | 0 o 1 (opcional)                           |
| `{n}`    | Exactamente n veces                        |
| `{n,}`   | n o más veces                              |
| `{n,m}`  | Entre n y m veces                          |

#### Ejemplos {/*#examples-1*/}

```text
Pattern: colou?r
Input:   "color and colour"
Matches: color, colour
```

El `?` hace opcional el `u`, por lo que coinciden tanto `color` (0 veces `u`) como `colour` (1 vez `u`).

```text
Pattern: \d{2,4}
Input:   "1 22 333 4444 55555"
Matches: 22, 333, 4444, 5555
```

Coincide con entre 2 y 4 dígitos consecutivos. `1` es demasiado corto. `55555` produce `5555` (voraz, por lo que el motor toma el máximo de 4) y el `5` restante es demasiado corto para otra coincidencia.

### Anclajes {/*#anchors*/}

Coinciden con una **posición** en lugar de con un carácter.

| Sintaxis | Significado                                   |
| -------- | --------------------------------------------- |
| `^`      | Inicio de la cadena (o de la línea con `m`)   |
| `$`      | Fin de la cadena (o de la línea con `m`)      |
| `\b`     | Límite de palabra                             |
| `\B`     | Límite que no es de palabra                   |

#### Ejemplos {/*#examples-2*/}

```text
Pattern: \bcat\b
Matches: "the cat sat"    => cat
No match: "concatenate"
```

`\b` marca el límite entre un carácter de palabra y un carácter que no lo es. En `concatenate`, `cat` está rodeado de otras letras, por lo que `\b` no coincide en esas posiciones.

```text
Pattern: ^\d+
Input:   "42 is the answer"
Match:   42
```

`^` ancla la coincidencia al inicio de la cadena. `\d+` coincide entonces con uno o más dígitos desde esa posición. Como `42` está justo al principio, coincide.

```text
Pattern: \.$
Input:   "End of sentence."
Match:   .
```

`$` ancla la coincidencia al final de la cadena. `\.` coincide con un punto literal (escapado porque `.` normalmente significa «cualquier carácter»). Juntos coinciden con un punto al final de la cadena.

### Grupos y alternancia {/*#groups-and-alternation*/}

Los paréntesis `()` crean grupos que capturan la subcadena coincidente.

```text
Pattern: (foo)(bar)
Input:   foobar
Group 1: foo
Group 2: bar
```

Cada par de `()` crea un grupo numerado. La coincidencia completa es `foobar`, pero los grupos permiten acceder a `foo` y `bar` individualmente (p. ej. para buscar y reemplazar o para extraer).

La barra vertical `|` actúa como un OR lógico.

```text
Pattern: cat|dog
Matches: cat, dog
```

El motor prueba primero `cat` y, si falla en la posición actual, prueba `dog`.

```text
Pattern: (\d{3})-(\d{4})
Input:   "555-1234"
Group 1: 555
Group 2: 1234
```

Los grupos pueden capturar por separado partes de una cadena estructurada. Aquí el prefijo y el número se dividen en dos grupos, mientras que `-` coincide pero no se captura.

### Indicadores (flags) {/*#flags*/}

Los indicadores modifican cómo se aplica el patrón.

| Indicador | Nombre                          | Efecto                                                    |
| --------- | ------------------------------- | --------------------------------------------------------- |
| `g`       | Global                          | Encuentra todas las coincidencias, no solo la primera     |
| `i`       | Sin distinción de mayúsculas    | Ignora mayúsculas y minúsculas                            |
| `m`       | Multilínea                      | `^` y `$` coinciden con el inicio y el fin de cada línea  |
| `s`       | Dotall                          | `.` también coincide con los saltos de línea              |
| `u`       | Unicode                         | Trata el patrón y la entrada como Unicode                 |

#### Ejemplos {/*#examples-3*/}

```text
Pattern (no flag): /hello/
Input:   "Hello World"
No match

Pattern (with i): /hello/i
Input:   "Hello World"
Match:   Hello
```

Sin el indicador `i`, `hello` no coincide con `Hello` porque la `H` está en mayúscula. Con el indicador `i`, se ignora la distinción de mayúsculas y la coincidencia se produce.

## Patrones avanzados {/*#advanced-patterns*/}

### Voraz frente a perezoso {/*#greedy-vs-lazy*/}

- **Voraz** (por defecto): coincide con lo máximo posible
- **Perezoso** (se añade `?`): coincide con lo mínimo posible

| Sintaxis | Significado         |
| -------- | ------------------- |
| `*?`     | 0 o más (perezoso)  |
| `+?`     | 1 o más (perezoso)  |
| `??`     | 0 o 1 (perezoso)    |

#### Ejemplos {/*#examples-4*/}

```text
Input:   <b>bold</b> and <b>more</b>

Greedy:  <.*>   => 1 match:  <b>bold</b> and <b>more</b>
Lazy:    <.*?>  => 4 matches: <b>, </b>, <b>, </b>
```

El `.*` voraz se expande tanto como puede y coincide desde el primer `<` hasta el último `>`, es decir, toda la cadena en una sola coincidencia. El `.*?` perezoso se detiene en el primer `>` posible, por lo que cada etiqueta coincide por separado.

### Grupos sin captura {/*#non-capturing-groups*/}

Se utiliza `(?:...)` cuando se necesita agrupar pero no capturar.

```text
Pattern: (?:foo|bar)baz
Matches: foobaz, barbaz
```

### Grupos con nombre {/*#named-groups*/}

Se utiliza `(?<name>...)` para asignar un nombre a un grupo.

```text
Pattern: (?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})
Input:   2026-03-18
year:    2026
month:   03
day:     18
```

### Referencias inversas {/*#backreferences*/}

Se hace referencia a un grupo capturado previamente con `\1`, `\2`, etc.

```text
Pattern: (\w+)\s\1
Matches: "hello hello"    => hello hello
No match: "hello world"
```

### Lookaround {/*#lookaround*/}

Las aserciones lookaround comprueban un patrón **sin consumir** caracteres.

| Sintaxis   | Nombre                   | Significado           |
| ---------- | ------------------------ | --------------------- |
| `(?=...)`  | Lookahead positivo       | Seguido de ...        |
| `(?!...)`  | Lookahead negativo       | No seguido de ...     |
| `(?<=...)` | Lookbehind positivo      | Precedido de ...      |
| `(?<!...)` | Lookbehind negativo      | No precedido de ...   |

#### Ejemplos {/*#examples-5*/}

```text
Pattern: \d+(?= USD)
Input:   "100 USD and 200 EUR"
Match:   100
```

```text
Pattern: \b\w+\b(?!\.com)
Input:   "test.com and example.org"
Effect:  Matches words NOT followed by .com
```

```text
Pattern: (?<=\$)\d+
Input:   "Price: $50"
Match:   50
```

```text
Pattern: (?<!un)happy
Input:   "happy and unhappy"
Match:   happy (first one only)
```

### Patrones habituales {/*#common-patterns*/}

```text
Email (simplified):     [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
IPv4 address:           \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
ISO date (YYYY-MM-DD):  \d{4}-\d{2}-\d{2}
Hex color code:         #[0-9a-fA-F]{3,8}
URL (simplified):       https?://[^\s]+
```

### Funciones de JavaScript {/*#javascript-functions*/}

JavaScript ofrece dos formas principales de aplicar una expresión regular a una cadena: `.test()` y `.match()`.

#### `test()` {/*#test*/}

Devuelve `true` o `false`; se utiliza cuando solo se necesita saber **si** un patrón coincide.

```javascript
const pattern = /\d{3}/;
pattern.test("abc 123"); // true
pattern.test("no digits"); // false
```

#### `match()` {/*#match*/}

Devuelve las subcadenas coincidentes (o `null`); se utiliza cuando se necesita **extraer** datos de la cadena.

Sin el indicador `g`, `match()` devuelve la primera coincidencia más los grupos capturados:

```javascript
const result = "2026-03-18".match(/(\d{4})-(\d{2})-(\d{2})/);
// result[0] => "2026-03-18"  (full match)
// result[1] => "2026"        (group 1)
// result[2] => "03"          (group 2)
// result[3] => "18"          (group 3)
```

Con el indicador `g`, `match()` devuelve todas las coincidencias, pero **ningún grupo capturado**:

```javascript
"cat bat sat".match(/[a-z]at/g);
// => ["cat", "bat", "sat"]
```

Si no coincide nada, `match()` devuelve `null` y **no** una matriz vacía:

```javascript
"hello".match(/\d+/); // null
```

#### Cuándo utilizar cada una {/*#when-to-use-which*/}

| Objetivo                                   | Función   |
| ------------------------------------------ | --------- |
| Comprobar si un patrón coincide            | `test()`  |
| Extraer las cadenas coincidentes           | `match()` |
