---
title: "类图"
description: "UML 类图的全面讲解，包括结构、可见性、关系、基数、最佳实践，以及基于图书馆系统的示例。"
keywords:
    - UML
    - 类图
last_update:
    author: moritz-grimm
tags:
    - ap2
machine_translated: true
---

# 类图

## 定义 {/*#definition*/}

类图是一种结构型 UML 图，通过展示类、类的属性和方法以及它们之间的关系，来可视化系统的静态结构。它是面向对象编程和软件设计中最常用的图之一。

## 用途 {/*#purpose*/}

类图用于：

- 对系统结构建模
- 可视化类之间的关系
- 在实现之前规划软件架构
- 记录现有代码结构
- 向团队成员传达设计决策

## 组成部分 {/*#components*/}

### 类 {/*#classes*/}

类表示为分为三个部分的矩形：

```text
┌─────────────────┐
│   ClassName     │  ← Class name (PascalCase)
├─────────────────┤
│   - attribute   │  ← Attributes (camelCase)
│   # attribute   │
├─────────────────┤
│   + method()    │  ← Methods (camelCase)
└─────────────────┘
```

### 属性 {/*#attributes*/}

属性表示类的数据/特性。

**语法：** `visibility name: dataType`

示例：`- email: String`

### 方法 {/*#methods*/}

方法表示类的行为/功能。

**语法：** `visibility methodName(parameter: type): returnType`

示例：`+ getName(): String`

### 可见性修饰符 {/*#visibility-modifiers*/}

| 符号 | 可见性 | 含义 | 适用场合 |
| ------ | ---------- | ---------------------------------- | ------------------------ |
| `-`    | 私有 | 仅在类内部可访问 | 属性的默认选择 |
| `#`    | 受保护 | 在类及其子类中可访问 | 用于被继承的属性 |
| `+`    | 公有 | 可从任何位置访问 | 方法的默认选择 |
| `~`    | 包 | 在同一个包内可访问 | 很少使用 |

## 关系 {/*#relationships*/}

### 关联 {/*#association*/}

两个类之间的一般关系，表示一个类的对象与另一个类的对象相连。

**表示法：** 连接两个类的实线

**示例：** `Customer` 与 `Order` 相关联

```text
Customer ────── Order
```

### 聚合（弱所有权） {/*#aggregation-weak-ownership*/}

一种特殊的关联，其中一个类是另一个类的容器，但被包含的类可以独立存在。

**表示法：** 容器一侧的空心菱形

**示例：** `Library` 拥有 `Books`，但没有图书馆，书籍也可以存在

```text
Library ◇────── Book
```

**注意：** 容器被销毁时，被包含的对象依然存在。

### 组合（强所有权） {/*#composition-strong-ownership*/}

聚合的更强形式，其中被包含的类没有容器就无法存在。

**表示法：** 容器一侧的实心菱形

**示例：** `Book` 拥有 `Chapters`，没有书，章节就无法存在

```text
Book ◆────── Chapter
```

**注意：** 容器被销毁时，被包含的对象也会被销毁。

### 继承 {/*#inheritance*/}

表示一个类（子类）从另一个类（父类）继承属性和方法的关系。

**表示法：** 指向父类的空心箭头

**示例：** `Dog` 和 `Cat` 继承自 `Animal`

```text
      Animal
         △
         │
    ┌────┴────┐
    │         │
   Dog       Cat
```

**重要：** 父类中被继承的属性应使用 `protected` 可见性（`#`），以便子类可以访问它们。

## 基数（多重性） {/*#cardinality-multiplicity*/}

基数指定一个类的多少个实例可以与另一个类的实例相关联。

| 表示法 | 含义 | 示例 |
| ------------- | -------------- | ---------------------------------------------- |
| `1`           | 恰好一个 | 一个人恰好有一个出生日期 |
| `0..1`        | 零个或一个 | 一个人可能有零个或一个驾驶执照 |
| `*` 或 `0..*` | 零个或多个 | 一个图书馆可以有零本或多本书 |
| `1..*`        | 一个或多个 | 一本书有一页或多页 |
| `n..m`        | 特定范围 | 一门课程有 5..30 名学生 |

**位置：** 基数放置在其所描述的类附近。

```text
Library 1 ────── 0..* Book
```

读法：一个图书馆可以有零本或多本书

## 命名约定 {/*#naming-conventions*/}

### 一般规则 {/*#general-rules*/}

1. **类名：** 以大写字母开头（PascalCase）
   - ✅ `Customer`, `ShoppingCart`
   - ❌ `customer`, `shopping_cart`

2. **属性和方法：** 以小写字母开头（camelCase）
   - ✅ `firstName`, `calculateTotal()`
   - ❌ `FirstName`, `CalculateTotal()`

3. **不使用变音符号或特殊字符**
   - ✅ `doppelgaenger`
   - ❌ `doppelgänger`

4. **布尔属性：** 以 `is`、`has` 或 `can` 为前缀
   - ✅ `isActive`, `hasPermission`

5. **方法名：** 使用动词
   - ✅ `calculateTotal()`, `saveData()`
   - ❌ `total()`, `data()`

## 最佳实践 {/*#best-practices*/}

### 属性可见性 {/*#attribute-visibility*/}

- **默认：** 所有属性使用 `private`（`-`）
- **例外：** 将被子类继承的属性使用 `protected`（`#`）
- **避免：** 除非绝对必要，否则不要将属性设为 `public`

### 方法可见性 {/*#method-visibility*/}

- **默认：** 构成类接口的方法使用 `public`（`+`）
- **使用 `private`：** 用于仅在类内部使用的辅助方法

### 抽象类 {/*#abstract-classes*/}

抽象类通过以下方式标示：

- 将类名写成*斜体*
- 或在类名上方添加 `<<abstract>>`

```text
┌────────────────────────┐
│   <<abstract>>         │
│      Vehicle           │
├────────────────────────┤
│ # licensePlate: String │
├────────────────────────┤
│ + startEngine(): void  │
└────────────────────────┘
```

### 接口 {/*#interfaces*/}

通过在接口名上方添加 `<<interface>>` 来标示接口。

## 完整示例：图书馆系统 {/*#complete-example-library-system*/}

本示例展示了类图的所有重要概念。

### 场景 {/*#scenario*/}

一个简单的图书馆管理系统，包含图书、杂志、用户和借阅功能。

### 类概览 {/*#classes-overview*/}

- Medium（抽象父类）
  - 表示任何可借阅物品的抽象类
  - 属性为 `protected`，因为它们会被继承

- Book（继承自 Medium）
  - 介质的具体类型
  - 与章节之间存在组合关系

- Magazine（继承自 Medium）
  - 介质的另一种具体类型

- Chapter
  - 书的一部分（组合）
  - 没有书就无法存在

- Library
  - 包含介质（聚合）
  - 介质可以脱离图书馆而存在

- Media
  - 是图书馆的一部分（聚合）
  - 可以脱离图书馆而存在

- User
  - 可以借阅介质（关联）

### 类详情 {/*#class-details*/}

#### Medium（抽象） {/*#medium-abstract*/}

```text
┌────────────────────────────┐
│     <<abstract>>           │
│        Medium              │
├────────────────────────────┤
│ # titel: String            │
│ # isbn: String             │
├────────────────────────────┤
│ + borrowMedium(): boolean  │
│ + returnMedium(): void     │
└────────────────────────────┘
```

#### Book {/*#book*/}

```text
┌─────────────────────────┐
│         Book            │
├─────────────────────────┤
│ - author: String        │
│ - numberOfPages: int    │
├─────────────────────────┤
│ + getAuthor(): String   │
└─────────────────────────┘
```

#### Magazine {/*#magazine*/}

```text
┌────────────────────────┐
│       Magazine         │
├────────────────────────┤
│ - edition: int         │
│ - releaseDate: Date    │
├────────────────────────┤
│ + getEdition(): int    │
└────────────────────────┘
```

#### Chapter {/*#chapter*/}

```text
┌─────────────────────────┐
│       Chapter           │
├─────────────────────────┤
│ - chapterNumber: int    │
│ - headline: String      │
├─────────────────────────┤
└─────────────────────────┘
```

#### Library {/*#library*/}

```text
┌──────────────────────────────────────────┐
│            Library                       │
├──────────────────────────────────────────┤
│ - name: String                           │
│ - adress: String                         │
├──────────────────────────────────────────┤
│ + addMedium(medium: Medium): void        │
│ + removeMedium(medium: Medium): boolean  │
└──────────────────────────────────────────┘
```

#### 用户 {/*#benutzer*/}

```text
┌─────────────────────────────────────────┐
│           User                          │
├─────────────────────────────────────────┤
│ - userId: int                           │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### 关系 {/*#relationships-1*/}

1. **继承：**
   - `Book` 继承自 `Medium`
   - `Magazine` 继承自 `Medium`

2. **组合：** `Book ◆────── 1..* Chapter`
   - 一本书必须至少有一个章节
   - 章节不能脱离其所属的书而存在

3. **聚合：** `Library ◇────── 0..* Medium`
   - 一个图书馆可以有零个或多个介质
   - 介质可以独立于图书馆而存在

4. **关联：** `User ────── * Medium`（标注为 "borrows"）
   - 用户可以借阅多个介质
   - 一个介质可以在不同时间被多个用户借阅

### 可视化表示 {/*#visual-representation*/}

```text
                    ┌────────────────────────────┐
                    │     <<abstract>>           │
                    │        Medium              │
                    ├────────────────────────────┤
                    │ # titel: String            │
                    │ # isbn: String             │
                    ├────────────────────────────┤
                    │ + borrowMedium(): boolean  │
                    │ + returnMedium(): void     │
                    └───────────┬────────────────┘
                                △
                                │ (inheritance)
                    ┌───────────┴───────────┐
                    │                       │
        ┌───────────┴──────────┐   ┌────────┴──────────────┐
        │       Book           │   │    Magazine           │
        ├──────────────────────┤   ├───────────────────────┤
        │ - author: String     │   │ - edition: int        │
        │ - numberOfPages: int │   │ - releaseDate: Date   │
        ├──────────────────────┤   ├───────────────────────┤
        │ + getAuthor()        │   │ + getEdition()        │
        └─────────┬────────────┘   └───────────────────────┘
                  │
                  │ ◆ (composition)
                  │ 1..*
        ┌─────────┴────────────┐
        │      Chapter         │
        ├──────────────────────┤
        │ - chapterNumber: int │
        │ - headline: String   │
        └──────────────────────┘


┌────────────────────────┐                *  ┌────────────────┐
│        Library         │ ◇──────────────   │    Medium     │
├────────────────────────┤  (aggregation)    └────────────────┘
│ - name: String         │
│ - adress: String       │
├────────────────────────┤
│ + mediumHinzufuegen()  │
│ + mediumEntfernen()    │
└────────────────────────┘


┌─────────────────────────────────────────┐ 1         borrows         *  ┌─────────────────┐
│     User                                │ ───────────────────────────  │     Medium      │
├─────────────────────────────────────────┤        (association)         └─────────────────┘
│ - benutzerId: int                       │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### 本示例的要点 {/*#key-takeaways-from-this-example*/}

1. **Medium 中的受保护属性：** `titel` 和 `isbn` 为受保护（`#`），以便 `Buch` 和 `Zeitschrift` 可以继承它们
2. **组合与聚合：** 章节与书紧密相属（组合），而介质可以脱离图书馆而存在（聚合）
3. **继承：** `Buch` 和 `Zeitschrift` 都从 `Medium` 继承共同的行为
4. **基数：** 一本书必须至少有一个章节（`1..*`），但一个图书馆可以没有介质（`0..*`）

## 应避免的常见错误 {/*#common-mistakes-to-avoid*/}

1. **使用公有属性：** 几乎总是应使用私有或受保护
2. **遗漏基数：** 始终指定可以关联多少个实例
3. **关系类型错误：** 须理解聚合与组合之间的区别
4. **命名不一致：** 属性/方法使用 camelCase，类使用 PascalCase

## 创建类图的工具 {/*#tools-for-creating-class-diagrams*/}

- draw.io / diagrams.net（免费，基于浏览器）
- Lucidchart（有限的免费版本）
- PlantUML（基于文本，需要配置）
- Visual Paradigm
- StarUML

## 另请参阅 {/*#see-also*/}

- [对象图](./further-uml-diagrams.md#object-diagram)：某一时间点上实例的具体快照
- [序列图](./sequence-diagram.md)：这些类的对象之间随时间发生的交互
- [用例图](./use-case-diagram.md)：对应的行为型图，展示这些类向参与者提供哪些服务
- [ER 模型](../databases/er-model.md)：对应的关系型建模，描述这些类的属性如何持久化到表中
