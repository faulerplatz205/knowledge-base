---
title: "Expressões Regulares"
description: "Visão geral da sintaxe de expressões regulares, classes de caracteres, quantificadores, âncoras, grupos, lookaround e padrões comuns."
keywords:
    - "Expressões Regulares"
    - "Regex"
    - "Correspondência de Padrões"
    - "Classes de Caracteres"
    - "Quantificadores"
    - "Âncoras"
    - "Lookahead"
    - "Lookbehind"
    - "Grupos"
tags:
    - ap2
machine_translated: true
---

# Expressões Regulares

## Visão geral {/*#overview*/}

Expressões regulares (regex) são padrões usados para encontrar combinações de caracteres em strings. São suportadas por praticamente todas as linguagens de programação e por muitas ferramentas de linha de comando (por exemplo, `grep`, `sed`, `awk`). Um mecanismo de regex percorre a string de entrada e verifica se (e onde) o padrão corresponde.

## Fundamentos {/*#basics*/}

### Classes de caracteres {/*#character-classes*/}

Correspondem a um **único caractere** de um conjunto definido.

| Sintaxe  | Significado                           |
| -------- | ------------------------------------- |
| `.`      | Qualquer caractere, exceto quebra de linha |
| `[abc]`  | Um entre `a`, `b` ou `c`               |
| `[^abc]` | Qualquer caractere, exceto `a`, `b` ou `c` |
| `[a-z]`  | Qualquer letra minúscula              |
| `[0-9]`  | Qualquer dígito                       |
| `\d`     | Dígito (`[0-9]`)                       |
| `\D`     | Não dígito (`[^0-9]`)                  |
| `\w`     | Caractere de palavra (`[a-zA-Z0-9_]`)       |
| `\W`     | Caractere que não é de palavra (`[^a-zA-Z0-9_]`)  |
| `\s`     | Espaço em branco (`[ \t\n\r\f\v]`)          |
| `\S`     | Não espaço em branco (`[^\t\n\r\f\v]`)      |

#### Exemplos {/*#examples*/}

```text
Pattern: [A-Z]\w+
Input:   "Hello World 123"
Matches: Hello, World
```

`[A-Z]` corresponde a uma letra maiúscula, `\w+` corresponde então a um ou mais caracteres de palavra depois dela. `123` não tem letra maiúscula no início e por isso é ignorado. `\w` inclui dígitos, mas `[A-Z]` restringe o primeiro caractere a letras.

```text
Pattern: \d\d\d
Input:   "Call 555-1234"
Matches: 555, 123
```

Três dígitos consecutivos. O `-` interrompe a sequência, de modo que `1234` produz duas janelas sobrepostas, mas apenas `123` corresponde como grupo completo de três dígitos (o mecanismo continua então em `4`, que sozinho não é suficiente).

### Quantificadores {/*#quantifiers*/}

Controlam **quantas vezes** o elemento anterior deve ocorrer.

| Sintaxe | Significado                           |
| ------- | ------------------------------------- |
| `*`     | 0 ou mais [(guloso)](#greedy-vs-lazy) |
| `+`     | 1 ou mais [(guloso)](#greedy-vs-lazy) |
| `?`     | 0 ou 1 (opcional)                     |
| `{n}`   | Exatamente n vezes                    |
| `{n,}`  | n ou mais vezes                       |
| `{n,m}` | Entre n e m vezes                     |

#### Exemplos {/*#examples-1*/}

```text
Pattern: colou?r
Input:   "color and colour"
Matches: color, colour
```

O `?` torna o `u` opcional, de modo que tanto `color` (0 vezes `u`) quanto `colour` (1 vez `u`) correspondem.

```text
Pattern: \d{2,4}
Input:   "1 22 333 4444 55555"
Matches: 22, 333, 4444, 5555
```

Corresponde a entre 2 e 4 dígitos consecutivos. `1` é curto demais. `55555` resulta em `5555` (guloso, portanto o mecanismo toma o máximo de 4) e o `5` restante é curto demais para outra correspondência.

### Âncoras {/*#anchors*/}

Correspondem a uma **posição** em vez de um caractere.

| Sintaxe | Significado                        |
| ------ | ---------------------------------- |
| `^`    | Início da string (ou da linha com `m`) |
| `$`    | Fim da string (ou da linha com `m`)   |
| `\b`   | Limite de palavra                  |
| `\B`   | Limite que não é de palavra        |

#### Exemplos {/*#examples-2*/}

```text
Pattern: \bcat\b
Matches: "the cat sat"    => cat
No match: "concatenate"
```

`\b` marca o limite entre um caractere de palavra e um caractere que não é de palavra. Em `concatenate`, `cat` está cercado por outras letras, de modo que `\b` não corresponde nessas posições.

```text
Pattern: ^\d+
Input:   "42 is the answer"
Match:   42
```

`^` ancora a correspondência no início da string. `\d+` corresponde então a um ou mais dígitos a partir dessa posição. Como `42` está bem no início, a correspondência ocorre.

```text
Pattern: \.$
Input:   "End of sentence."
Match:   .
```

`$` ancora a correspondência no fim da string. `\.` corresponde a um ponto literal (escapado porque `.` normalmente significa "qualquer caractere"). Juntos, correspondem a um ponto no fim da string.

### Grupos e alternância {/*#groups-and-alternation*/}

Parênteses `()` criam grupos que capturam a substring correspondente.

```text
Pattern: (foo)(bar)
Input:   foobar
Group 1: foo
Group 2: bar
```

Cada par de `()` cria um grupo numerado. A correspondência completa é `foobar`, mas os grupos permitem acessar `foo` e `bar` individualmente (por exemplo, para localizar e substituir ou para extração).

A barra vertical `|` atua como um OU lógico.

```text
Pattern: cat|dog
Matches: cat, dog
```

O mecanismo tenta `cat` primeiro e, se isso falhar na posição atual, tenta `dog`.

```text
Pattern: (\d{3})-(\d{4})
Input:   "555-1234"
Group 1: 555
Group 2: 1234
```

Grupos podem capturar partes de uma string estruturada separadamente. Aqui, o código de área e o número são divididos em dois grupos, enquanto o `-` é correspondido, mas não capturado.

### Flags {/*#flags*/}

Flags modificam a forma como o padrão é aplicado.

| Flag | Nome             | Efeito                                   |
| ---- | ---------------- | ---------------------------------------- |
| `g`  | Global           | Encontra todas as correspondências, não apenas a primeira |
| `i`  | Sem distinção de maiúsculas e minúsculas | Ignora maiúsculas/minúsculas |
| `m`  | Multilinha       | `^` e `$` correspondem ao início/fim de cada linha |
| `s`  | Dotall           | `.` também corresponde a quebras de linha      |
| `u`  | Unicode          | Trata padrão e entrada como Unicode      |

#### Exemplos {/*#examples-3*/}

```text
Pattern (no flag): /hello/
Input:   "Hello World"
No match

Pattern (with i): /hello/i
Input:   "Hello World"
Match:   Hello
```

Sem a flag `i`, `hello` não corresponde a `Hello`, porque o `H` está em maiúscula. Com a flag `i`, maiúsculas e minúsculas são ignoradas e a correspondência é bem-sucedida.

## Padrões avançados {/*#advanced-patterns*/}

### Guloso vs. preguiçoso {/*#greedy-vs-lazy*/}

- **Guloso** (padrão): corresponde ao máximo possível
- **Preguiçoso** (acrescentar `?`): corresponde ao mínimo possível

| Sintaxe | Significado          |
| ------ | ---------------- |
| `*?`   | 0 ou mais (preguiçoso) |
| `+?`   | 1 ou mais (preguiçoso) |
| `??`   | 0 ou 1 (preguiçoso)    |

#### Exemplos {/*#examples-4*/}

```text
Input:   <b>bold</b> and <b>more</b>

Greedy:  <.*>   => 1 match:  <b>bold</b> and <b>more</b>
Lazy:    <.*?>  => 4 matches: <b>, </b>, <b>, </b>
```

O `.*` guloso se expande o máximo possível, correspondendo do primeiro `<` até o último `>`, a string inteira em uma única correspondência. O `.*?` preguiçoso para no `>` mais próximo possível, de modo que cada tag é correspondida individualmente.

### Grupos sem captura {/*#non-capturing-groups*/}

`(?:...)` é usado quando o agrupamento é necessário, mas a captura não.

```text
Pattern: (?:foo|bar)baz
Matches: foobaz, barbaz
```

### Grupos nomeados {/*#named-groups*/}

`(?<name>...)` atribui um nome a um grupo.

```text
Pattern: (?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})
Input:   2026-03-18
year:    2026
month:   03
day:     18
```

### Referências retroativas {/*#backreferences*/}

Um grupo capturado anteriormente é referenciado com `\1`, `\2` etc.

```text
Pattern: (\w+)\s\1
Matches: "hello hello"    => hello hello
No match: "hello world"
```

### Lookaround {/*#lookaround*/}

Asserções de lookaround verificam um padrão **sem consumir** caracteres.

| Sintaxe    | Nome                | Significado         |
| ---------- | ------------------- | ------------------- |
| `(?=...)`  | Lookahead positivo  | Seguido de ...      |
| `(?!...)`  | Lookahead negativo  | Não seguido de ...  |
| `(?<=...)` | Lookbehind positivo | Precedido de ...    |
| `(?<!...)` | Lookbehind negativo | Não precedido de ... |

#### Exemplos {/*#examples-5*/}

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

### Padrões comuns {/*#common-patterns*/}

```text
Email (simplified):     [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
IPv4 address:           \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
ISO date (YYYY-MM-DD):  \d{4}-\d{2}-\d{2}
Hex color code:         #[0-9a-fA-F]{3,8}
URL (simplified):       https?://[^\s]+
```

### Funções do JavaScript {/*#javascript-functions*/}

O JavaScript oferece duas formas principais de aplicar uma regex a uma string: `.test()` e `.match()`.

#### `test()` {/*#test*/}

Retorna `true` ou `false`, adequado quando só é necessário saber **se** um padrão corresponde.

```javascript
const pattern = /\d{3}/;
pattern.test("abc 123"); // true
pattern.test("no digits"); // false
```

#### `match()` {/*#match*/}

Retorna as substrings correspondentes (ou `null`), adequado quando é necessário **extrair** dados da string.

Sem a flag `g`, `match()` retorna a primeira correspondência mais os grupos capturados:

```javascript
const result = "2026-03-18".match(/(\d{4})-(\d{2})-(\d{2})/);
// result[0] => "2026-03-18"  (full match)
// result[1] => "2026"        (group 1)
// result[2] => "03"          (group 2)
// result[3] => "18"          (group 3)
```

Com a flag `g`, `match()` retorna todas as correspondências, mas **nenhum grupo capturado**:

```javascript
"cat bat sat".match(/[a-z]at/g);
// => ["cat", "bat", "sat"]
```

Se nada corresponder, `match()` retorna `null` e **não** um array vazio:

```javascript
"hello".match(/\d+/); // null
```

#### Quando usar qual {/*#when-to-use-which*/}

| Objetivo                    | Função    |
| --------------------------- | --------- |
| Verificar se um padrão corresponde | `test()`  |
| Extrair as strings correspondentes | `match()` |
