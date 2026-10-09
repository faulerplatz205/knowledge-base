---
title: "命名規則"
description: "ファイル、変数、関数、クラス、インターフェース、型、列挙型、ジェネリクス、真偽値に関するTypeScriptの命名規則。"
keywords:
  - "TypeScript"
  - "命名規則"
  - "camelCase"
  - "PascalCase"
  - "kebab-case"
  - "UPPER_SNAKE_CASE"
machine_translated: true
---

# 命名規則

## 概要 {/*#overview*/}

一貫した命名により、コードが読みやすく保守しやすくなる。これらの規則は、TypeScriptコミュニティで広く採用されている標準を反映している。

## ファイルとディレクトリ {/*#files--directories*/}

- ファイル名とディレクトリ名には**kebab-case**を使用する: `user-service.ts`、`auth-utils/`
- 純粋なTypeScriptには`.ts`、JSXを含むファイルには`.tsx`を使用する
- テストファイル: `user-service.test.ts`または`user-service.spec.ts`
- 可能な限り、主要なエクスポートにちなんでファイルに名前を付ける

```text
src/
  services/
    user-service.ts       => export class UserService
    auth-handler.ts       => export function authHandler
  models/
    user-profile.ts       => export interface UserProfile
  constants/
    http-status-codes.ts  => export enum HttpStatusCode
```

## 変数と定数 {/*#variables--constants*/}

- ローカル変数と関数スコープの値には**camelCase**を使用する
- 固定値を持つモジュールレベルの定数には**UPPER_SNAKE_CASE**を使用する
- 可変のモジュールレベル変数や複雑な定数オブジェクトには**camelCase**を使用する

```typescript
// Inside a function => camelCase
function processUser() {
  const userName = "Alice";
  let retryCount = 0;
}
```

```typescript
// Module level => UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = "https://api.example.com";

// Module level => complex objects stay camelCase
const defaultConfig = {
  timeout: 5000,
  retries: 3,
};
```

## 関数とメソッド {/*#functions--methods*/}

- **camelCase**を使用する
- 動作を表す**動詞**で始める
- 一般的なプレフィックス: `get`, `set`, `create`, `update`, `delete`, `fetch`, `handle`, `validate`, `parse`, `format`, `convert`, `check`

```typescript
function getUserById(id: string): User { /* ... */ }
function validateEmail(email: string): boolean { /* ... */ }
function formatCurrency(amount: number): string { /* ... */ }
function parseResponseBody<T>(response: Response): T { /* ... */ }
```

## クラス {/*#classes*/}

- **PascalCase**を使用する
- **名詞**または名詞句を使用する
- プライベートメンバー: `_`を接頭辞として付けるか、`private`キーワードを使用する(どちらの慣習も存在するため、プロジェクトごとに1つを選ぶ)

```typescript
class UserRepository {
  private _connection: DbConnection;

  constructor(connection: DbConnection) {
    this._connection = connection;
  }

  findById(id: string): User { /* ... */ }
}

class HttpClient { /* ... */ }
class EventEmitter { /* ... */ }
```

## インターフェースと型エイリアス {/*#interfaces--type-aliases*/}

- どちらも**PascalCase**を使用する
- インターフェースに **`I`プレフィックスは付けない**。これはC#の慣習であり、TypeScriptの慣用的な書き方ではない
- 拡張される可能性のあるオブジェクトの形状にはインターフェースを、ユニオン、インターセクション、マップ型には型エイリアスを使用する

```typescript
// Interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface Repository<T> {
  findById(id: string): T;
  save(entity: T): void;
}

// Type aliases
type Status = "active" | "inactive" | "pending";
type Nullable<T> = T | null;
type UserWithRole = UserProfile & { role: string };
```

## 列挙型 {/*#enums*/}

- 列挙型の名前: **PascalCase**(単数形)
- 列挙型のメンバー: **PascalCase**

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum HttpStatusCode {
  Ok = 200,
  NotFound = 404,
  InternalServerError = 500,
}
```

### 列挙型のメンバーにPascalCaseを使う理由 {/*#why-pascalcase-for-enum-members*/}

TypeScriptのコンパイラと標準ライブラリは、列挙型のメンバーにPascalCaseを使用している(例: `TypeScript.SyntaxKind.MethodDeclaration`)。`UPPER_SNAKE_CASE`は他の言語では一般的だが、TypeScriptでは慣用的ではない。

## ジェネリクス {/*#generics*/}

- 単純でよく知られた型パラメータには**大文字1文字**を使用する: `T`(型)、`K`(キー)、`V`(値)、`E`(要素)
- 意味が自明でない場合や型パラメータが複数ある場合は、`T`を接頭辞とした**説明的なPascalCase名**を使用する

```typescript
// Simple cases, single letters are clear enough
function identity<T>(value: T): T { return value; }
function mapEntries<K, V>(map: Map<K, V>): [K, V][] { /* ... */ }

// Multiple or domain-specific parameters, descriptive names help
function merge<TSource, TTarget>(source: TSource, target: TTarget): TSource & TTarget {
  /* ... */
}

interface Repository<TEntity, TId> {
  findById(id: TId): TEntity;
}
```

## 真偽値 {/*#booleans*/}

- **`is`**、**`has`**、**`should`**、**`can`**、**`was`** のいずれかを接頭辞として付ける
- 名前は、はい/いいえで答える質問のように読めるべきである

```typescript
const isActive = true;
const hasPermission = user.roles.includes("admin");
const shouldRetry = retryCount < MAX_RETRIES;
const canEdit = isActive && hasPermission;
const wasProcessed = record.status === "done";
```

## まとめ {/*#summary*/}

| 要素                 | 規則               | 例                       |
| -------------------- | ------------------ | ------------------------ |
| ファイルとディレクトリ | kebab-case       | `user-service.ts`        |
| 変数                 | camelCase          | `userName`               |
| 定数                 | UPPER_SNAKE_CASE   | `MAX_RETRIES`            |
| 関数とメソッド       | camelCase          | `getUserById`            |
| クラス               | PascalCase         | `UserRepository`         |
| インターフェースと型 | PascalCase         | `UserProfile`            |
| 列挙型               | PascalCase         | `HttpStatusCode`         |
| 列挙型のメンバー     | PascalCase         | `NotFound`               |
| ジェネリクス         | T / PascalCase     | `T`, `TEntity`           |
| 真偽値               | is/has/can/should  | `isActive`               |
