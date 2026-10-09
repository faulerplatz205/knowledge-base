---
title: "正規化"
description: "データベースの3つの正規形(第1正規形、第2正規形、第3正規形)の例を交えた概要。"
keywords:
    - "正規化"
    - "データベース"
    - "データベース群"
    - "1NF"
    - "2NF"
    - "3NF"
    - "正規形"
    - "リレーショナルデータベース"
tags:
    - ap2
machine_translated: true
---

# 正規化

## 概要 {/*#overview*/}

正規化は、データの冗長性を減らし、データの整合性を高めるために、リレーショナルデータベースを構造化するプロセスである。各正規形は、前の正規形の上に成り立つ。

## 冗長性 {/*#redundancy*/}

冗長性とは、データベース内での同じデータの不必要な繰り返しである。

## 第1正規形(1NF) {/*#first-normal-form-1nf*/}

**規則**: すべての列が原子的(分割できない)値を含み、各行が一意でなければならない。

**違反**: 1つのセルに複数の番号を格納する`Phone`列。

| CustomerID | Name  | Phone            |
| ---------- | ----- | ---------------- |
| 1          | Alice | 111-111, 222-222 |

**修正後**:

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

**違反**: 同じ属性に対して複数の列がある。

| CustomerID | Name  | Phone1  | Phone2  |
| ---------- | ----- | ------- | ------- |
| 1          | Alice | 111-111 | 222-222 |

**修正後**:

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

## 第2正規形(2NF) {/*#second-normal-form-2nf*/}

**規則**: 1NFであり、すべての非キー属性が主キーの一部だけでなく**全体**に従属していなければならない

**違反**: このテーブルは`(OrderID, ProductID)`を複合キーとして使っているが、`ProductName`は`ProductID`のみに従属している。

| OrderID | ProductID | ProductName | Quantity |
| ------- | --------- | ----------- | -------- |
| 1       | 42        | Keyboard    | 2        |
| 2       | 42        | Keyboard    | 1        |

**修正後**: `ProductName`を別の`Products`テーブルに移す。

**Orders**:

| OrderID | ProductID | Quantity |
| ------- | --------- | -------- |
| 1       | 42        | 2        |
| 2       | 42        | 1        |

**Products**:

| ProductID | ProductName |
| --------- | ----------- |
| 42        | Keyboard    |

## 第3正規形(3NF) {/*#third-normal-form-3nf*/}

**規則**: 2NFであり、どの非キー属性も別の非キー属性に従属していてはならない(推移的従属がない)。

**違反**: `DepartmentHead`は`EmployeeID`に直接ではなく、`Department`に従属している。

| EmployeeID | Department | DepartmentHead |
| ---------- | ---------- | -------------- |
| 1          | Sales      | Carol          |
| 2          | Sales      | Carol          |
| 3          | IT         | Dave           |

**修正後**: `DepartmentHead`を別の`Departments`テーブルに移す。

**Employees**:

| EmployeeID | Department |
| ---------- | ---------- |
| 1          | Sales      |
| 2          | Sales      |
| 3          | IT         |

**Departments**:

| Department | DepartmentHead |
| ---------- | -------------- |
| Sales      | Carol          |
| IT         | Dave           |

## まとめ {/*#summary*/}

| 正規形 | 要件                                                        |
| ------ | ----------------------------------------------------------- |
| 1NF    | 原子的な値、繰り返し列なし、一意の行                        |
| 2NF    | 1NF + 複合キーに対する部分従属がない                        |
| 3NF    | 2NF + 非キー属性間の推移的従属がない                        |
