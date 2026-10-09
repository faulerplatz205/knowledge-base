---
title: "规范化"
description: "三种数据库规范化形式（1NF、2NF、3NF）及示例概述。"
keywords:
    - "规范化"
    - "数据库"
    - "数据库"
    - "1NF"
    - "2NF"
    - "3NF"
    - "范式"
    - "关系型数据库"
tags:
    - ap2
machine_translated: true
---

# 规范化

## 概述 {/*#overview*/}

规范化是构建关系型数据库结构的过程，目的是减少数据冗余并提高数据完整性。每一级范式都建立在前一级之上。

## 冗余 {/*#redundancy*/}

冗余是指数据库中同一数据不必要的重复。

## 第一范式（1NF） {/*#first-normal-form-1nf*/}

**规则**：每一列必须包含原子（不可再分）值，且每一行必须唯一。

**违反：**`Phone` 列在一个单元格中存储多个号码。

| CustomerID | Name  | Phone            |
| ---------- | ----- | ---------------- |
| 1          | Alice | 111-111, 222-222 |

**修正后：**

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

**违反**：同一属性使用多个列。

| CustomerID | Name  | Phone1  | Phone2  |
| ---------- | ----- | ------- | ------- |
| 1          | Alice | 111-111 | 222-222 |

**修正后：**

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

## 第二范式（2NF） {/*#second-normal-form-2nf*/}

**规则：**必须满足 1NF，且每个非键属性必须依赖于**整个**主键，而不是仅依赖其一部分

**违反**：该表使用 `(OrderID, ProductID)` 作为复合键，但 `ProductName` 仅依赖于 `ProductID`。

| OrderID | ProductID | ProductName | Quantity |
| ------- | --------- | ----------- | -------- |
| 1       | 42        | Keyboard    | 2        |
| 2       | 42        | Keyboard    | 1        |

**修正后**：将 `ProductName` 移到单独的 `Products` 表中。

**Orders：**

| OrderID | ProductID | Quantity |
| ------- | --------- | -------- |
| 1       | 42        | 2        |
| 2       | 42        | 1        |

**Products：**

| ProductID | ProductName |
| --------- | ----------- |
| 42        | Keyboard    |

## 第三范式（3NF） {/*#third-normal-form-3nf*/}

**规则**：必须满足 2NF，且任何非键属性都不得依赖于另一个非键属性（无传递依赖）。

**违反：**`DepartmentHead` 依赖于 `Department`，而不是直接依赖于 `EmployeeID`。

| EmployeeID | Department | DepartmentHead |
| ---------- | ---------- | -------------- |
| 1          | Sales      | Carol          |
| 2          | Sales      | Carol          |
| 3          | IT         | Dave           |

**修正后**：将 `DepartmentHead` 移到单独的 `Departments` 表中。

**Employees：**

| EmployeeID | Department |
| ---------- | ---------- |
| 1          | Sales      |
| 2          | Sales      |
| 3          | IT         |

**Departments：**

| Department | DepartmentHead |
| ---------- | -------------- |
| Sales      | Carol          |
| IT         | Dave           |

## 总结 {/*#summary*/}

| 范式 | 要求                                                 |
| ----------- | ----------------------------------------------------------- |
| 1NF         | 原子值，无重复列，行唯一            |
| 2NF         | 1NF + 对复合键无部分依赖            |
| 3NF         | 2NF + 非键属性之间无传递依赖 |
