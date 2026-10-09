---
title: "Expressions régulières"
description: "Aperçu de la syntaxe des expressions régulières, des classes de caractères, quantificateurs, ancres, groupes, assertions de contexte (lookaround) et des motifs courants."
keywords:
    - "Expressions régulières"
    - "Regex"
    - "Correspondance de motifs"
    - "Classes de caractères"
    - "Quantificateurs"
    - "Ancres"
    - "Lookahead"
    - "Lookbehind"
    - "Groupes"
tags:
    - ap2
machine_translated: true
---

# Expressions régulières

## Vue d'ensemble {/*#overview*/}

Les expressions régulières (regex) sont des motifs servant à repérer des combinaisons de caractères dans des chaînes. Elles sont prises en charge par pratiquement tous les langages de programmation et de nombreux outils en ligne de commande (par ex. `grep`, `sed`, `awk`). Un moteur de regex parcourt la chaîne d'entrée et vérifie si (et où) le motif correspond.

## Bases {/*#basics*/}

### Classes de caractères {/*#character-classes*/}

Correspondent à un **seul caractère** d'un ensemble défini.

| Syntaxe  | Signification                         |
| -------- | ------------------------------------- |
| `.`      | N'importe quel caractère sauf le saut de ligne |
| `[abc]`  | L'un de `a`, `b` ou `c`               |
| `[^abc]` | N'importe quel caractère sauf `a`, `b` ou `c` |
| `[a-z]`  | N'importe quelle lettre minuscule     |
| `[0-9]`  | N'importe quel chiffre                |
| `\d`     | Chiffre (`[0-9]`)                       |
| `\D`     | Non-chiffre (`[^0-9]`)                  |
| `\w`     | Caractère de mot (`[a-zA-Z0-9_]`)       |
| `\W`     | Caractère hors mot (`[^a-zA-Z0-9_]`)  |
| `\s`     | Espace blanc (`[ \t\n\r\f\v]`)          |
| `\S`     | Non-espace blanc (`[^\t\n\r\f\v]`)      |

#### Exemples {/*#examples*/}

```text
Pattern: [A-Z]\w+
Input:   "Hello World 123"
Matches: Hello, World
```

`[A-Z]` correspond à une lettre majuscule, `\w+` correspond ensuite à un ou plusieurs caractères de mot qui la suivent. `123` n'a pas de lettre majuscule au début et est donc ignoré. `\w` inclut bien des chiffres, mais `[A-Z]` restreint le premier caractère aux lettres uniquement.

```text
Pattern: \d\d\d
Input:   "Call 555-1234"
Matches: 555, 123
```

Trois chiffres consécutifs. Le `-` interrompt la séquence, de sorte que `1234` produit deux fenêtres qui se chevauchent, mais seul `123` correspond comme groupe complet de trois chiffres (le moteur poursuit alors à `4`, ce qui ne suffit pas à lui seul).

### Quantificateurs {/*#quantifiers*/}

Contrôlent **combien de fois** l'élément précédent doit apparaître.

| Syntaxe | Signification                         |
| ------- | ------------------------------------- |
| `*`     | 0 ou plus [(gourmand)](#greedy-vs-lazy) |
| `+`     | 1 ou plus [(gourmand)](#greedy-vs-lazy) |
| `?`     | 0 ou 1 (facultatif)                   |
| `{n}`   | Exactement n fois                     |
| `{n,}`  | n fois ou plus                        |
| `{n,m}` | Entre n et m fois                     |

#### Exemples {/*#examples-1*/}

```text
Pattern: colou?r
Input:   "color and colour"
Matches: color, colour
```

Le `?` rend le `u` facultatif, de sorte que `color` (0 fois `u`) et `colour` (1 fois `u`) correspondent tous deux.

```text
Pattern: \d{2,4}
Input:   "1 22 333 4444 55555"
Matches: 22, 333, 4444, 5555
```

Correspond à 2 à 4 chiffres consécutifs. `1` est trop court. `55555` donne `5555` (gourmand, le moteur prend donc le maximum de 4) et le `5` restant est trop court pour une autre correspondance.

### Ancres {/*#anchors*/}

Correspondent à une **position** plutôt qu'à un caractère.

| Syntaxe | Signification                      |
| ------ | ---------------------------------- |
| `^`    | Début de chaîne (ou de ligne avec `m`) |
| `$`    | Fin de chaîne (ou de ligne avec `m`)   |
| `\b`   | Limite de mot                      |
| `\B`   | Limite hors mot                    |

#### Exemples {/*#examples-2*/}

```text
Pattern: \bcat\b
Matches: "the cat sat"    => cat
No match: "concatenate"
```

`\b` marque la limite entre un caractère de mot et un caractère hors mot. Dans `concatenate`, `cat` est entouré d'autres lettres, de sorte que `\b` ne correspond pas à ces positions.

```text
Pattern: ^\d+
Input:   "42 is the answer"
Match:   42
```

`^` ancre la correspondance au début de la chaîne. `\d+` correspond ensuite à un ou plusieurs chiffres à partir de cette position. Comme `42` se trouve tout au début, la correspondance est établie.

```text
Pattern: \.$
Input:   "End of sentence."
Match:   .
```

`$` ancre la correspondance à la fin de la chaîne. `\.` correspond à un point littéral (échappé car `.` signifie normalement « n'importe quel caractère »). Ensemble, ils correspondent à un point en fin de chaîne.

### Groupes et alternation {/*#groups-and-alternation*/}

Les parenthèses `()` créent des groupes qui capturent la sous-chaîne correspondante.

```text
Pattern: (foo)(bar)
Input:   foobar
Group 1: foo
Group 2: bar
```

Chaque paire de `()` crée un groupe numéroté. La correspondance complète est `foobar`, mais les groupes permettent d'accéder à `foo` et à `bar` individuellement (par ex. pour la recherche et le remplacement ou l'extraction).

La barre verticale `|` joue le rôle d'un OU logique.

```text
Pattern: cat|dog
Matches: cat, dog
```

Le moteur essaie d'abord `cat` et, si cela échoue à la position courante, il essaie `dog`.

```text
Pattern: (\d{3})-(\d{4})
Input:   "555-1234"
Group 1: 555
Group 2: 1234
```

Les groupes peuvent capturer séparément des parties d'une chaîne structurée. Ici, l'indicatif et le numéro sont répartis en deux groupes, tandis que le `-` est reconnu mais non capturé.

### Drapeaux (flags) {/*#flags*/}

Les drapeaux modifient la manière dont le motif est appliqué.

| Drapeau | Nom              | Effet                                    |
| ---- | ---------------- | ---------------------------------------- |
| `g`  | Global           | Trouver toutes les correspondances, pas seulement la première |
| `i`  | Insensible à la casse | Ignorer les majuscules/minuscules   |
| `m`  | Multiligne       | `^` et `$` correspondent au début/à la fin de chaque ligne |
| `s`  | Dotall           | `.` correspond aussi aux sauts de ligne      |
| `u`  | Unicode          | Traiter le motif et l'entrée comme de l'Unicode       |

#### Exemples {/*#examples-3*/}

```text
Pattern (no flag): /hello/
Input:   "Hello World"
No match

Pattern (with i): /hello/i
Input:   "Hello World"
Match:   Hello
```

Sans le drapeau `i`, `hello` ne correspond pas à `Hello`, car le `H` est en majuscule. Avec le drapeau `i`, la casse est ignorée et la correspondance réussit.

## Motifs avancés {/*#advanced-patterns*/}

### Gourmand et paresseux (greedy vs. lazy) {/*#greedy-vs-lazy*/}

- **Gourmand** (par défaut) : correspond au maximum possible
- **Paresseux** (ajouter `?`) : correspond au minimum possible

| Syntaxe | Signification        |
| ------ | -------------------- |
| `*?`   | 0 ou plus (paresseux) |
| `+?`   | 1 ou plus (paresseux) |
| `??`   | 0 ou 1 (paresseux)    |

#### Exemples {/*#examples-4*/}

```text
Input:   <b>bold</b> and <b>more</b>

Greedy:  <.*>   => 1 match:  <b>bold</b> and <b>more</b>
Lazy:    <.*?>  => 4 matches: <b>, </b>, <b>, </b>
```

Le `.*` gourmand s'étend aussi loin que possible et correspond du premier `<` au tout dernier `>`, soit toute la chaîne en une seule correspondance. Le `.*?` paresseux s'arrête au premier `>` possible, de sorte que chaque balise correspond individuellement.

### Groupes non capturants {/*#non-capturing-groups*/}

`(?:...)` s'utilise lorsque le regroupement est nécessaire, mais pas la capture.

```text
Pattern: (?:foo|bar)baz
Matches: foobaz, barbaz
```

### Groupes nommés {/*#named-groups*/}

`(?<name>...)` s'utilise pour attribuer un nom à un groupe.

```text
Pattern: (?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})
Input:   2026-03-18
year:    2026
month:   03
day:     18
```

### Références arrière (backreferences) {/*#backreferences*/}

Un groupe capturé précédemment est référencé avec `\1`, `\2`, etc.

```text
Pattern: (\w+)\s\1
Matches: "hello hello"    => hello hello
No match: "hello world"
```

### Assertions de contexte (lookaround) {/*#lookaround*/}

Les assertions de contexte vérifient la présence d'un motif **sans consommer** de caractères.

| Syntaxe    | Nom                    | Signification          |
| ---------- | ---------------------- | ---------------------- |
| `(?=...)`  | Lookahead positif      | Suivi de ...           |
| `(?!...)`  | Lookahead négatif      | Non suivi de ...       |
| `(?<=...)` | Lookbehind positif     | Précédé de ...         |
| `(?<!...)` | Lookbehind négatif     | Non précédé de ...     |

#### Exemples {/*#examples-5*/}

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

### Motifs courants {/*#common-patterns*/}

```text
Email (simplified):     [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
IPv4 address:           \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
ISO date (YYYY-MM-DD):  \d{4}-\d{2}-\d{2}
Hex color code:         #[0-9a-fA-F]{3,8}
URL (simplified):       https?://[^\s]+
```

### Fonctions JavaScript {/*#javascript-functions*/}

JavaScript propose deux moyens principaux d'appliquer une regex à une chaîne : `.test()` et `.match()`.

#### `test()` {/*#test*/}

Renvoie `true` ou `false` ; à utiliser lorsqu'il suffit de savoir **si** un motif correspond.

```javascript
const pattern = /\d{3}/;
pattern.test("abc 123"); // true
pattern.test("no digits"); // false
```

#### `match()` {/*#match*/}

Renvoie les sous-chaînes correspondantes (ou `null`) ; à utiliser lorsque des données doivent être **extraites** de la chaîne.

Sans le drapeau `g`, `match()` renvoie la première correspondance ainsi que les groupes capturés :

```javascript
const result = "2026-03-18".match(/(\d{4})-(\d{2})-(\d{2})/);
// result[0] => "2026-03-18"  (full match)
// result[1] => "2026"        (group 1)
// result[2] => "03"          (group 2)
// result[3] => "18"          (group 3)
```

Avec le drapeau `g`, `match()` renvoie toutes les correspondances, mais **aucun groupe capturé** :

```javascript
"cat bat sat".match(/[a-z]at/g);
// => ["cat", "bat", "sat"]
```

Si rien ne correspond, `match()` renvoie `null` et **non** un tableau vide :

```javascript
"hello".match(/\d+/); // null
```

#### Quand utiliser laquelle {/*#when-to-use-which*/}

| Objectif                                   | Fonction  |
| ------------------------------------------ | --------- |
| Vérifier si un motif correspond            | `test()`  |
| Extraire les chaînes correspondantes       | `match()` |
