---
title: "クラス図"
description: "UMLクラス図の包括的な解説。構造、可視性、関係、多重度、ベストプラクティス、図書館システムを題材にした例を含む。"
keywords:
    - UML
    - クラス図
last_update:
    author: moritz-grimm
tags:
    - ap2
machine_translated: true
---

# クラス図

## 定義 {/*#definition*/}

クラス図は、クラス、その属性とメソッド、およびそれらの間の関係を示すことで、システムの静的構造を可視化する構造のUML図である。オブジェクト指向プログラミングとソフトウェア設計で最もよく使われる図の1つである。

## 目的 {/*#purpose*/}

クラス図は次の目的で用いられる。

- システムの構造のモデリング
- クラス間の関係の可視化
- 実装前のソフトウェアアーキテクチャの設計
- 既存のコード構造の文書化
- 設計上の判断のチームメンバーへの伝達

## 構成要素 {/*#components*/}

### クラス {/*#classes*/}

クラスは3つの区画に分けられた長方形で表される。

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

属性は、クラスのデータ・プロパティを表す。

**構文:** `visibility name: dataType`

例: `- email: String`

### メソッド {/*#methods*/}

メソッドは、クラスの振る舞い・機能を表す。

**構文:** `visibility methodName(parameter: type): returnType`

例: `+ getName(): String`

### 可視性修飾子 {/*#visibility-modifiers*/}

| 記号   | 可視性     | 意味                                   | 使用する場面             |
| ------ | ---------- | -------------------------------------- | ------------------------ |
| `-`    | Private    | クラス内からのみアクセス可能           | 属性の既定値             |
| `#`    | Protected  | クラスとサブクラスからアクセス可能     | 継承される属性           |
| `+`    | Public     | どこからでもアクセス可能               | メソッドの既定値         |
| `~`    | Package    | 同じパッケージ内からアクセス可能       | ほとんど使われない       |

## 関係 {/*#relationships*/}

### 関連 {/*#association*/}

2つのクラス間の一般的な関係で、一方のクラスのオブジェクトが他方のクラスのオブジェクトと結びついていることを示す。

**表記:** 2つのクラスを結ぶ実線

**例:** `Customer` は `Order` と関連している

```text
Customer ────── Order
```

### 集約（弱い所有） {/*#aggregation-weak-ownership*/}

あるクラスが別のクラスのコンテナとなるが、含まれるクラスは独立して存在できる特殊な関連。

**表記:** コンテナ側の白抜きのひし形

**例:** `Library` は `Books` を持つが、本は図書館がなくても存在できる

```text
Library ◇────── Book
```

**覚えておく点:** コンテナが破棄されても、含まれていたオブジェクトは残る。

### コンポジション（強い所有） {/*#composition-strong-ownership*/}

集約のより強い形で、含まれるクラスはコンテナなしには存在できない。

**表記:** コンテナ側の塗りつぶしたひし形

**例:** `Book` は `Chapters` を持ち、章は本なしには存在できない

```text
Book ◆────── Chapter
```

**覚えておく点:** コンテナが破棄されると、含まれていたオブジェクトも破棄される。

### 継承 {/*#inheritance*/}

あるクラス（サブクラス・子）が、別のクラス（スーパークラス・親）から属性とメソッドを継承する関係を表す。

**表記:** 親クラスを指す白抜きの矢印

**例:** `Dog` と `Cat` は `Animal` を継承する

```text
      Animal
         △
         │
    ┌────┴────┐
    │         │
   Dog       Cat
```

**重要:** 親クラスで継承される属性には、サブクラスからアクセスできるよう `protected` の可視性（`#`）を用いる。

## 多重度 {/*#cardinality-multiplicity*/}

多重度は、あるクラスのインスタンスが、別のクラスのインスタンスといくつ関連付けられるかを指定する。

| 表記          | 意味           | 例                                             |
| ------------- | -------------- | ---------------------------------------------- |
| `1`           | ちょうど1つ    | 人にはちょうど1つの生年月日がある              |
| `0..1`        | 0または1       | 人は運転免許証を0または1つ持つ                 |
| `*` または `0..*` | 0以上   | 図書館は0冊以上の本を持てる                    |
| `1..*`        | 1以上          | 本は1ページ以上を持つ                          |
| `n..m`        | 特定の範囲     | コースには5..30人の学生がいる                  |

**配置:** 多重度は、それが説明するクラスの近くに置く。

```text
Library 1 ────── 0..* Book
```

読み方: 1つの図書館は0冊以上の本を持てる

## 命名規則 {/*#naming-conventions*/}

### 一般規則 {/*#general-rules*/}

1. **クラス名:** 大文字で始める（PascalCase）
   - ✅ `Customer`、`ShoppingCart`
   - ❌ `customer`、`shopping_cart`

2. **属性とメソッド:** 小文字で始める（camelCase）
   - ✅ `firstName`、`calculateTotal()`
   - ❌ `FirstName`、`CalculateTotal()`

3. **ウムラウトや特殊文字を使わない**
   - ✅ `doppelgaenger`
   - ❌ `doppelgänger`

4. **真偽値の属性:** 接頭辞に `is`、`has`、`can` を付ける
   - ✅ `isActive`、`hasPermission`

5. **メソッド名:** 動詞を使う
   - ✅ `calculateTotal()`、`saveData()`
   - ❌ `total()`、`data()`

## ベストプラクティス {/*#best-practices*/}

### 属性の可視性 {/*#attribute-visibility*/}

- **既定:** すべての属性に `private`（`-`）を用いる
- **例外:** サブクラスに継承される属性には `protected`（`#`）を用いる
- **避ける:** やむを得ない場合を除き、属性を `public` にしない

### メソッドの可視性 {/*#method-visibility*/}

- **既定:** クラスのインターフェースを構成するメソッドには `public`（`+`）を用いる
- **`private` を使う場合:** クラス内でのみ使われるヘルパーメソッド

### 抽象クラス {/*#abstract-classes*/}

抽象クラスは次のいずれかで示す。

- クラス名を*斜体*で書く
- またはクラス名の上に `<<abstract>>` を追加する

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

### インターフェース {/*#interfaces*/}

インターフェースは、インターフェース名の上に `<<interface>>` を追加して示す。

## 完全な例: 図書館システム {/*#complete-example-library-system*/}

この例は、クラス図のすべての重要な概念を示す。

### シナリオ {/*#scenario*/}

書籍、雑誌、ユーザー、貸出機能を持つ簡単な図書館管理システム。

### クラスの概要 {/*#classes-overview*/}

- Medium（抽象の親クラス）
  - 貸出可能なあらゆるアイテムを表す抽象クラス
  - 属性は継承されるため `protected` である

- Book（Mediumを継承）
  - メディアの具体的な種類
  - 章とのコンポジション関係を持つ

- Magazine（Mediumを継承）
  - メディアの別の具体的な種類

- Chapter
  - 本の一部（コンポジション）
  - 本なしには存在できない

- Library
  - メディアを含む（集約）
  - メディアは図書館がなくても存在できる

- Media
  - 図書館の一部である（集約）
  - 図書館がなくても存在できる

- User
  - メディアを借りることができる（関連）

### クラスの詳細 {/*#class-details*/}

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

#### ユーザー {/*#benutzer*/}

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

### 関係 {/*#relationships-1*/}

1. **継承:**
   - `Book` は `Medium` を継承する
   - `Magazine` は `Medium` を継承する

2. **コンポジション:** `Book ◆────── 1..* Chapter`
   - 本には少なくとも1つの章がなければならない
   - 章は所属する本なしには存在できない

3. **集約:** `Library ◇────── 0..* Medium`
   - 図書館は0個以上のメディアを持てる
   - メディアは図書館とは独立して存在できる

4. **関連:** `User ────── * Medium`（「borrows」とラベル付け）
   - ユーザーは複数のメディアを借りられる
   - メディアは時間の経過とともに複数のユーザーに借りられうる

### 視覚的な表現 {/*#visual-representation*/}

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

### この例の要点 {/*#key-takeaways-from-this-example*/}

1. **Mediumのprotected属性:** `titel` と `isbn` は、`Buch` と `Zeitschrift` が継承できるようprotected（`#`）になっている
2. **コンポジションと集約:** 章は本に強く属する（コンポジション）が、メディアは図書館なしでも存在できる（集約）
3. **継承:** `Buch` と `Zeitschrift` の両方が、`Medium` から共通の振る舞いを継承する
4. **多重度:** 本には少なくとも1つの章が必要（`1..*`）だが、図書館はメディアを0個持つこともできる（`0..*`）

## 避けるべきよくある間違い {/*#common-mistakes-to-avoid*/}

1. **public属性の使用:** ほぼ常にprivateまたはprotectedを使う
2. **多重度の記載漏れ:** 関連しうるインスタンスの数を必ず指定する
3. **関係の種類の誤り:** 集約とコンポジションの違いを理解する
4. **一貫性のない命名:** 属性・メソッドにはcamelCase、クラスにはPascalCaseを使う

## クラス図を作成するためのツール {/*#tools-for-creating-class-diagrams*/}

- draw.io / diagrams.net（無料、ブラウザベース）
- Lucidchart（機能制限付きの無料版あり）
- PlantUML（テキストベース、セットアップが必要）
- Visual Paradigm
- StarUML

## 関連項目 {/*#see-also*/}

- [オブジェクト図](./further-uml-diagrams.md#object-diagram): ある時点でのインスタンスの具体的なスナップショット
- [シーケンス図](./sequence-diagram.md): これらのクラスのオブジェクト間の、時間に沿った相互作用
- [ユースケース図](./use-case-diagram.md): 振る舞い面での対となる図で、これらのクラスがアクターに提供するサービスを示す
- [ERモデル](../databases/er-model.md): リレーショナル面での対となるもので、これらのクラスの属性がテーブルにどのように永続化されるかを記述する
