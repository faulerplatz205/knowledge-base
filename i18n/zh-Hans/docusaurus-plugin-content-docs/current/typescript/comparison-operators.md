---
title: "比较运算符"
description: "JavaScript/TypeScript 比较运算符概述，包括相等运算符、关系运算符、严格比较与宽松比较，以及运算符优先级。"
keywords:
  - "JavaScript"
  - "TypeScript"
  - "比较运算符"
  - "严格相等"
  - "宽松相等"
  - "运算符优先级"
machine_translated: true
---

# 比较运算符

## 相等运算符 {/*#equality-operators*/}

| 运算符   | 名称     | 说明                                           |
| -------- | -------- | ---------------------------------------------- |
| `===`    | 严格相等 | 当值**和**类型都相等时返回 `true`              |
| `!==`    | 严格不等 | 当值**或**类型不同时返回 `true`               |
| `==`     | 宽松相等 | 当类型转换后值相等时返回 `true`               |
| `!=`     | 宽松不等 | 当类型转换后值不同时返回 `true`               |

### 示例 {/*#examples*/}

```typescript
1 === 1      // true
1 === "1"    // false (different types)

1 == "1"     // true (string is coerced to number)
0 == false   // true
null == undefined // true
```

**重要：** 应始终优先使用 `===` 和 `!==`，而非 `==` 和 `!=`，以避免意外的类型转换。

## 关系运算符 {/*#relational-operators*/}

| 运算符   | 名称     | 示例               |
| -------- | -------- | ------------------ |
| `>`      | 大于     | `5 > 3` => `true`  |
| `<`      | 小于     | `5 < 3` => `false` |
| `>=`     | 大于等于 | `5 >= 5` => `true` |
| `<=`     | 小于等于 | `3 <= 5` => `true` |

## Nullish 与特殊比较 {/*#nullish-and-special-comparisons*/}

| 表达式               | 结果    | 原因                                 |
| -------------------- | ------- | ------------------------------------ |
| `NaN === NaN`        | `false` | `NaN` 不等于任何值                 |
| `null === undefined` | `false` | 类型不同                             |
| `null == undefined`  | `true`  | 宽松相等中的特殊规则                 |
| `null == 0`          | `false` | `null` 仅宽松等于 `undefined`           |

## 运算符优先级 {/*#operator-precedence*/}

**优先级较高**的运算符先求值。**同一级别**的运算符从左到右求值。

| 优先级      | 运算符                   | 说明           |
| ----------- | ------------------------ | -------------- |
| 1（最高）    | `()`                     | 分组           |
| 2           | `!`                      | 逻辑非         |
| 3           | `>`, `<`, `>=`, `<=`     | 关系           |
| 4           | `===`, `!==`, `==`, `!=` | 相等           |
| 5           | `&&`                     | 逻辑与         |
| 6           | `\|\|`                   | 逻辑或         |
| 7（最低）    | `??`                     | 空值合并       |

### 示例 {/*#example*/}

```typescript
const result = a > 0 && b === 1 || c !== 2;

// && binds tighter than ||, so this is equivalent to:
const result = (a > 0 && b === 1) || c !== 2;

// NOT:
const result = a > 0 && (b === 1 || c !== 2);

// Solution:
const result = a > 0 && (b === 1 || c !== 2);
```

**提示：** 如有疑问，可使用括号 `()` 明确指出预期的求值顺序。
