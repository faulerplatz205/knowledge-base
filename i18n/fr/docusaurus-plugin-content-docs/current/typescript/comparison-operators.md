---
title: "Opérateurs de comparaison"
description: "Aperçu des opérateurs de comparaison de JavaScript/TypeScript : égalité, opérateurs relationnels, comparaison stricte et souple, précédence des opérateurs."
keywords:
  - "JavaScript"
  - "TypeScript"
  - "Opérateurs de comparaison"
  - "Égalité stricte"
  - "Égalité souple"
  - "Précédence des opérateurs"
machine_translated: true
---

# Opérateurs de comparaison

## Opérateurs d'égalité {/*#equality-operators*/}

| Opérateur | Nom                | Description                                                      |
| --------- | ------------------ | ---------------------------------------------------------------- |
| `===`    | Égalité stricte    | Renvoie `true` si la valeur **et** le type sont égaux            |
| `!==`   | Inégalité stricte  | Renvoie `true` si la valeur **ou** le type diffèrent           |
| `==`   | Égalité souple     | Renvoie `true` si les valeurs sont égales après coercition de type |
| `!=`   | Inégalité souple   | Renvoie `true` si les valeurs diffèrent après coercition de type |

### Exemples {/*#examples*/}

```typescript
1 === 1      // true
1 === "1"    // false (different types)

1 == "1"     // true (string is coerced to number)
0 == false   // true
null == undefined // true
```

**Important :** préférer toujours `===` et `!==` à `==` et `!=` afin d'éviter une coercition de type inattendue.

## Opérateurs relationnels {/*#relational-operators*/}

| Opérateur | Nom                   | Exemple             |
| --------- | --------------------- | ------------------- |
| `>`   | Supérieur à           | `5 > 3` => `true`  |
| `<`   | Inférieur à           | `5 < 3` => `false`  |
| `>=`   | Supérieur ou égal à   | `5 >= 5` => `true`  |
| `<=`   | Inférieur ou égal à   | `3 <= 5` => `true`  |

## Comparaisons nullish et cas particuliers {/*#nullish-and-special-comparisons*/}

| Expression | Résultat | Raison                                              |
| ---------- | -------- | --------------------------------------------------- |
| `NaN === NaN`    | `false`  | `NaN` n'est égal à aucune valeur                  |
| `null === undefined`    | `false`  | Types différents                                    |
| `null == undefined`    | `true`  | Règle particulière de l'égalité souple              |
| `null == 0`    | `false`  | `null` n'est égal que de manière souple à `undefined`  |

## Précédence des opérateurs {/*#operator-precedence*/}

Les opérateurs de **précédence supérieure** sont évalués en premier. Les opérateurs de **même niveau** sont évalués de gauche à droite.

| Précédence       | Opérateur                              | Description              |
| ---------------- | -------------------------------------- | ------------------------ |
| 1 (la plus haute) | `()`                               | Regroupement             |
| 2                | `!`                                | NON logique              |
| 3                | `>`, `<`, `>=`, `<=`     | Relationnels             |
| 4                | `===`, `!==`, `==`, `!=`     | Égalité                  |
| 5                | `&&`                                | ET logique               |
| 6                | `\|\|`                                | OU logique               |
| 7 (la plus basse) | `??`                               | Fusion nullish           |

### Exemple {/*#example*/}

```typescript
const result = a > 0 && b === 1 || c !== 2;

// && binds tighter than ||, so this is equivalent to:
const result = (a > 0 && b === 1) || c !== 2;

// NOT:
const result = a > 0 && (b === 1 || c !== 2);

// Solution:
const result = a > 0 && (b === 1 || c !== 2);
```

**Astuce :** en cas de doute, utiliser des parenthèses `()` pour rendre explicite l'ordre d'évaluation voulu.
