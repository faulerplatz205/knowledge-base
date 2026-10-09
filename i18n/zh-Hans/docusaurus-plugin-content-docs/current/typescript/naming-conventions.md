---
title: "命名规范"
description: "TypeScript 中文件、变量、函数、类、接口、类型、枚举、泛型和布尔值的命名规范。"
keywords:
  - "TypeScript"
  - "命名规范"
  - "camelCase"
  - "PascalCase"
  - "kebab-case"
  - "UPPER_SNAKE_CASE"
machine_translated: true
---

# 命名规范

## 概述 {/*#overview*/}

一致的命名使代码更易于阅读和维护。这些规范反映了 TypeScript 社区广泛采用的标准。

## 文件与目录 {/*#files--directories*/}

- 文件和目录名使用 **kebab-case**:`user-service.ts`、`auth-utils/`
- 纯 TypeScript 使用 `.ts`，包含 JSX 的文件使用 `.tsx`
- 测试文件：`user-service.test.ts` 或 `user-service.spec.ts`
- 尽可能以文件的主要导出命名文件

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

## 变量与常量 {/*#variables--constants*/}

- 局部变量和函数作用域内的值使用 **camelCase**
- 值固定的模块级常量使用 **UPPER_SNAKE_CASE**
- 可变的模块级变量或复杂的常量对象使用 **camelCase**

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

## 函数与方法 {/*#functions--methods*/}

- 使用 **camelCase**
- 以描述该操作的**动词**开头
- 常见前缀：`get`、`set`、`create`、`update`、`delete`、`fetch`、`handle`、`validate`、`parse`、`format`、`convert`、`check`

```typescript
function getUserById(id: string): User { /* ... */ }
function validateEmail(email: string): boolean { /* ... */ }
function formatCurrency(amount: number): string { /* ... */ }
function parseResponseBody<T>(response: Response): T { /* ... */ }
```

## 类 {/*#classes*/}

- 使用 **PascalCase**
- 使用**名词**或名词短语
- 私有成员：以 `_` 为前缀或使用 `private` 关键字（两种约定都存在，每个项目选择其一）

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

## 接口与类型别名 {/*#interfaces--type-aliases*/}

- 两者都使用 **PascalCase**
- 接口**不使用 `I` 前缀**，这是 C# 的约定，并非 TypeScript 的惯用做法
- 对可能被扩展的对象形状使用接口，对联合类型、交叉类型和映射类型使用类型别名

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

## 枚举 {/*#enums*/}

- 枚举名称：**PascalCase**（单数）
- 枚举成员：**PascalCase**

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

### 为什么枚举成员使用 PascalCase？ {/*#why-pascalcase-for-enum-members*/}

TypeScript 编译器和标准库对枚举成员使用 PascalCase（例如 `TypeScript.SyntaxKind.MethodDeclaration`）。`UPPER_SNAKE_CASE` 在其他语言中很常见，但并非 TypeScript 的惯用做法。

## 泛型 {/*#generics*/}

- 对简单、众所周知的类型参数使用**单个大写字母**:`T`(类型)、`K`(键)、`V`(值)、`E`(元素)
- 当含义不明显或存在多个类型参数时，使用以 `T` 为前缀的**具有描述性的 PascalCase 名称**

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

## 布尔值 {/*#booleans*/}

- 以 **`is`**、**`has`**、**`should`**、**`can`** 或 **`was`** 为前缀
- 名称读起来应像一个是/否问题

```typescript
const isActive = true;
const hasPermission = user.roles.includes("admin");
const shouldRetry = retryCount < MAX_RETRIES;
const canEdit = isActive && hasPermission;
const wasProcessed = record.status === "done";
```

## 总结 {/*#summary*/}

| 元素             | 规范               | 示例                     |
| ---------------- | ------------------ | ------------------------ |
| 文件与目录       | kebab-case         | `user-service.ts`        |
| 变量             | camelCase          | `userName`               |
| 常量             | UPPER_SNAKE_CASE   | `MAX_RETRIES`            |
| 函数与方法       | camelCase          | `getUserById`            |
| 类               | PascalCase         | `UserRepository`         |
| 接口与类型       | PascalCase         | `UserProfile`            |
| 枚举             | PascalCase         | `HttpStatusCode`         |
| 枚举成员         | PascalCase         | `NotFound`               |
| 泛型             | T / PascalCase     | `T`、`TEntity`           |
| 布尔值           | is/has/can/should  | `isActive`               |
