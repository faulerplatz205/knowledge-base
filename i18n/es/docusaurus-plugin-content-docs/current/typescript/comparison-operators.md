---
title: "Operadores de comparación"
description: "Resumen de los operadores de comparación de JavaScript/TypeScript, incluidos los de igualdad, los relacionales, la comparación estricta frente a la laxa y la precedencia de operadores."
keywords:
  - "JavaScript"
  - "TypeScript"
  - "Operadores de comparación"
  - "Igualdad estricta"
  - "Igualdad laxa"
  - "Precedencia de operadores"
machine_translated: true
---

# Operadores de comparación

## Operadores de igualdad {/*#equality-operators*/}

| Operador | Nombre              | Descripción                                                  |
| -------- | ------------------- | ------------------------------------------------------------ |
| `===`    | Igualdad estricta   | Devuelve `true` si el valor **y** el tipo son iguales        |
| `!==`    | Desigualdad estricta | Devuelve `true` si el valor **o** el tipo difieren          |
| `==`     | Igualdad laxa       | Devuelve `true` si los valores son iguales tras la coerción de tipos |
| `!=`     | Desigualdad laxa    | Devuelve `true` si los valores difieren tras la coerción de tipos    |

### Ejemplos {/*#examples*/}

```typescript
1 === 1      // true
1 === "1"    // false (different types)

1 == "1"     // true (string is coerced to number)
0 == false   // true
null == undefined // true
```

**Importante:** Se prefieren siempre `===` y `!==` frente a `==` y `!=` para evitar coerciones de tipos inesperadas.

## Operadores relacionales {/*#relational-operators*/}

| Operador | Nombre                | Ejemplo            |
| -------- | --------------------- | ------------------ |
| `>`      | Mayor que             | `5 > 3` => `true`  |
| `<`      | Menor que             | `5 < 3` => `false` |
| `>=`     | Mayor o igual que     | `5 >= 5` => `true` |
| `<=`     | Menor o igual que     | `3 <= 5` => `true` |

## Comparaciones con valores nulos y especiales {/*#nullish-and-special-comparisons*/}

| Expresión            | Resultado | Motivo                                 |
| -------------------- | --------- | -------------------------------------- |
| `NaN === NaN`        | `false` | `NaN` no es igual a nada               |
| `null === undefined` | `false` | Tipos distintos                        |
| `null == undefined`  | `true`  | Regla especial de la igualdad laxa     |
| `null == 0`          | `false` | `null` solo es igual de forma laxa a `undefined` |

## Precedencia de operadores {/*#operator-precedence*/}

Los operadores con **mayor precedencia** se evalúan primero. Los operadores del **mismo nivel** se evalúan de izquierda a derecha.

| Precedencia  | Operador                 | Descripción            |
| ------------ | ------------------------ | ---------------------- |
| 1 (la mayor) | `()`                     | Agrupación             |
| 2            | `!`                      | NOT lógico             |
| 3            | `>`, `<`, `>=`, `<=`     | Relacionales           |
| 4            | `===`, `!==`, `==`, `!=` | Igualdad               |
| 5            | `&&`                     | AND lógico             |
| 6            | `\|\|`                   | OR lógico              |
| 7 (la menor) | `??`                     | Fusión de nulos        |

### Ejemplo {/*#example*/}

```typescript
const result = a > 0 && b === 1 || c !== 2;

// && binds tighter than ||, so this is equivalent to:
const result = (a > 0 && b === 1) || c !== 2;

// NOT:
const result = a > 0 && (b === 1 || c !== 2);

// Solution:
const result = a > 0 && (b === 1 || c !== 2);
```

**Consejo:** En caso de duda, se usan paréntesis `()` para dejar explícito el orden de evaluación previsto.
