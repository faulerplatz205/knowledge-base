---
title: "Operadores de comparação"
description: "Visão geral dos operadores de comparação de JavaScript/TypeScript, incluindo igualdade, operadores relacionais, comparação estrita x flexível e precedência de operadores."
keywords:
  - "JavaScript"
  - "TypeScript"
  - "Operadores de comparação"
  - "Igualdade estrita"
  - "Igualdade flexível"
  - "Precedência de operadores"
machine_translated: true
---

# Operadores de comparação

## Operadores de igualdade {/*#equality-operators*/}

| Operador | Nome                | Descrição                                                  |
| -------- | ------------------- | ---------------------------------------------------------- |
| `===`    | Igualdade estrita   | Retorna `true` se valor **e** tipo são iguais              |
| `!==`    | Desigualdade estrita | Retorna `true` se valor **ou** tipo diferem              |
| `==`     | Igualdade flexível  | Retorna `true` se os valores são iguais após coerção de tipo |
| `!=`     | Desigualdade flexível | Retorna `true` se os valores diferem após coerção de tipo |

### Exemplos {/*#examples*/}

```typescript
1 === 1      // true
1 === "1"    // false (different types)

1 == "1"     // true (string is coerced to number)
0 == false   // true
null == undefined // true
```

**Importante:** `===` e `!==` são preferíveis a `==` e `!=` para evitar coerção de tipo inesperada.

## Operadores relacionais {/*#relational-operators*/}

| Operador | Nome             | Exemplo            |
| -------- | ---------------- | ------------------ |
| `>`      | Maior que        | `5 > 3` => `true`  |
| `<`      | Menor que        | `5 < 3` => `false` |
| `>=`     | Maior ou igual a | `5 >= 5` => `true` |
| `<=`     | Menor ou igual a | `3 <= 5` => `true` |

## Comparações nullish e especiais {/*#nullish-and-special-comparisons*/}

| Expressão            | Resultado | Motivo                                 |
| -------------------- | --------- | -------------------------------------- |
| `NaN === NaN`        | `false` | `NaN` não é igual a nada                |
| `null === undefined` | `false` | Tipos diferentes                       |
| `null == undefined`  | `true`  | Regra especial na igualdade flexível   |
| `null == 0`          | `false` | `null` só é flexivelmente igual a `undefined` |

## Precedência de operadores {/*#operator-precedence*/}

Operadores com **precedência maior** são avaliados primeiro. Operadores no **mesmo nível** são avaliados da esquerda para a direita.

| Precedência | Operador                 | Descrição            |
| ----------- | ------------------------ | -------------------- |
| 1 (maior)   | `()`                     | Agrupamento          |
| 2           | `!`                      | NOT lógico           |
| 3           | `>`, `<`, `>=`, `<=`     | Relacionais          |
| 4           | `===`, `!==`, `==`, `!=` | Igualdade            |
| 5           | `&&`                     | AND lógico           |
| 6           | `\|\|`                   | OR lógico            |
| 7 (menor)   | `??`                     | Nullish coalescing   |

### Exemplo {/*#example*/}

```typescript
const result = a > 0 && b === 1 || c !== 2;

// && binds tighter than ||, so this is equivalent to:
const result = (a > 0 && b === 1) || c !== 2;

// NOT:
const result = a > 0 && (b === 1 || c !== 2);

// Solution:
const result = a > 0 && (b === 1 || c !== 2);
```

**Dica:** Em caso de dúvida, parênteses `()` tornam explícita a ordem de avaliação pretendida.
