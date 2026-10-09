---
title: "数据库模式"
description: "关系数据库模式：表、键、表示法、ER 模型到表的转换以及参照完整性。"
keywords:
    - "数据库模式"
    - "关系模式"
    - "关系模型"
    - "主键"
    - "外键"
    - "复合键"
    - "关联表"
    - "参照完整性"
    - "数据库设计"
tags:
    - ap2
machine_translated: true
---

# 数据库模式

数据库模式描述关系数据库的结构：其表、带数据类型的列、键以及表之间的引用。与 [ER 模型](./er-model.md)不同，它与关系模型绑定。联系不再作为独立元素存在，而是通过外键和关联表来表达。模式在[数据库开发](./database-development-phases.md)的语义阶段创建，并在物理阶段通过 `CREATE TABLE` 语句实现。

## 术语 {/*#terminology*/}

| 关系术语 | 通用术语        | 含义                                                  |
| --------------- | ------------------ | -------------------------------------------------------- |
| 关系        | 表              | 具有相同属性的行的集合                     |
| 元组           | 行、记录        | 表中的一条条目                                     |
| 属性       | 列             | 表中每一行都具有的特性               |
| 域          | 数据类型          | 属性可取值的集合                      |
| 关系模式 | 表定义   | 表名及其属性                            |
| 数据库模式 | 数据库结构 | 数据库的所有关系模式及其约束 |

## 键 {/*#keys*/}

- **候选键**：唯一标识每一行的最小属性集。一张表可以有多个候选键，例如 `CustomerID` 和 `Email`。
- **主键（PK）**：被选来标识行的候选键。它必须唯一，且不得为 `NULL`。
- **复合键**：由多个属性组成的键，例如 `(OrderID, LineNumber)`。
- **外键（FK）**：引用另一张表或同一张表主键的一个或多个属性。它也可以是主键的一部分，如在关联表或弱实体的表中。
- **自然键**：取自数据本身的键，例如 ISBN。
- **代理键**：在数据库之外没有含义的人工键，通常是自增数字或 UUID。

## 表示法 {/*#notation*/}

### 文本表示法 {/*#textual-notation*/}

每张表写作其名称，后跟括号中的属性：

| 标记                                          | 含义                                                    |
| ------------------------------------------------ | ---------------------------------------------------------- |
| 下划线                                       | 主键；对于复合键，每个部分都加下划线 |
| 前缀 `#` 或 `↑`，有时为虚线下划线 | 外键                                                |
| 后缀 `PK` 或 `FK`                              | 无法使用下划线时的纯文本替代   |

既是主键又是外键的属性加下划线，并标有 `#`。

### 表图 {/*#table-diagram*/}

- **方框**：一张表，表名作为标题，列位于分隔线下方
- **`PK` 和 `FK`**：列前的标记；`PK FK` 标记既是主键又是外键的列
- **线**：两张表之间的外键引用
- **线端**：基数，为 `1` 或 `N`

## 从 ER 模型转换 {/*#transformation-from-an-er-model*/}

| ER 元素                        | 数据库模式                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| 实体类型                       | 表                                                                                             |
| 属性                         | 列                                                                                            |
| 键属性                     | 主键                                                                                       |
| 复合属性               | 每个子属性一列，例如 `Street`、`City`、`ZIP`                                        |
| 多值属性             | 带有指向所有者的外键的独立表，例如 `PhoneNumbers (#CustomerID, Number)`         |
| 派生属性                 | 通常不存储，而是在查询中计算                                                     |
| 1:1 联系                  | 在两张表之一中设置带 `UNIQUE` 约束的外键                                   |
| 1:N 联系                  | N 方表中的外键                                                            |
| N:M 联系                  | 关联表，其主键由指向两张表的外键组成                      |
| 联系属性            | 持有外键的表中的列，对于 N:M 则在关联表中                        |
| 弱实体                       | 其主键由所有者的主键（同时也是外键）和部分键组合而成的表 |
| N 方的全部参与 | 声明为 `NOT NULL` 的外键                                                                   |

学生与课程之间带有联系属性 `EnrolledOn` 的 N:M 联系：

```text
Students    (StudentID, Name)
             ─────────
Courses     (CourseID, Title)
             ────────
Enrollments (#StudentID, #CourseID, EnrolledOn)
             ──────────  ─────────
```

## 参照完整性 {/*#referential-integrity*/}

每个外键值都必须与被引用表中现有的主键值匹配，或者在列允许时为 `NULL`。违反该规则的插入或更新会被 DBMS 拒绝。被引用的行被删除（`ON DELETE`）或其主键被更改（`ON UPDATE`）时会发生什么，由每个外键单独设定：

| 选项                   | 删除被引用行的效果                                   |
| ------------------------ | ----------------------------------------------------------------------- |
| `RESTRICT` / `NO ACTION` | 只要存在引用行，删除就会被拒绝（默认）             |
| `CASCADE`                | 引用行也一并删除，例如被删除订单的订单项 |
| `SET NULL`               | 外键被设为 `NULL`；该列必须允许 `NULL`              |

## 示例：订单管理 {/*#example-order-management*/}

[ER 模型](./er-model.md)中的示例变成三张表。1:N 联系 `places` 转化为 `Orders` 中的外键 `CustomerID`。标识性联系 `contains` 使 `OrderID` 成为 `OrderItems` 主键的一部分。

```text
Customers  (CustomerID, Name, Email)
            ──────────
Orders     (OrderID, #CustomerID, OrderDate)
            ───────
OrderItems (#OrderID, LineNumber, Quantity)
            ────────  ──────────
```

```text
┌─────────────────────┐          ┌──────────────────────┐
│ Customers           │          │ Orders               │
├─────────────────────┤          ├──────────────────────┤
│ PK     CustomerID   │1        N│ PK     OrderID       │
│        Name         ├──────────┤ FK     CustomerID    │
│        Email        │          │        OrderDate     │
└─────────────────────┘          └──────────┬───────────┘
                                            │ 1
                                            │
                                            │ N
                                 ┌──────────┴───────────┐
                                 │ OrderItems           │
                                 ├──────────────────────┤
                                 │ PK FK  OrderID       │
                                 │ PK     LineNumber    │
                                 │        Quantity      │
                                 └──────────────────────┘
```

```sql
CREATE TABLE Customers (
    CustomerID INT          PRIMARY KEY,
    Name       VARCHAR(100) NOT NULL,
    Email      VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Orders (
    OrderID    INT  PRIMARY KEY,
    CustomerID INT  NOT NULL,
    OrderDate  DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
);

CREATE TABLE OrderItems (
    OrderID    INT NOT NULL,
    LineNumber INT NOT NULL,
    Quantity   INT NOT NULL,
    PRIMARY KEY (OrderID, LineNumber),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID) ON DELETE CASCADE
);
```

## 常见错误 {/*#common-mistakes*/}

1. **有连线但没有外键列**：只要 N 方的表中缺少外键列，两张表之间的连线就不会建立任何引用。
2. **外键放在 1 方：**`Customers` 中的列 `OrderID` 每个客户只能容纳一个订单。
3. **N:M 没有关联表**：外键列每行只保存一个值，因此任一表中的外键都会把该侧限制为只有一个对应方。
4. **关联表只有代理键**：如果这对外键既不是主键也不是 `UNIQUE`，同一名学生就可以重复选修同一门课程。
5. **在模式中使用 ER 表示法**：菱形、属性椭圆和联系名称属于 ER 图。模式展示的是表、`PK` 和 `FK` 标记以及引用。
6. **将保留字用作表名：**`ORDER` 和 `GROUP` 是 SQL 的保留字，用作表名时必须在每条语句中加引号或改用其他名称。

## 另请参阅 {/*#see-also*/}

- [ER 模型](./er-model.md)：模式由此推导而来的概念模型
- [数据库开发阶段](./database-development-phases.md)：模式在概念阶段与物理阶段之间的位置
- [规范化](./normalization.md)：检查模式中的表是否存在冗余
- [SQL 子语言](./sql-sublanguages.md)：`CREATE TABLE` 及其他 DDL 语句
