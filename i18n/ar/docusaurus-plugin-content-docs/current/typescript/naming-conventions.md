---
title: "اصطلاحات التسمية"
description: "اصطلاحات التسمية في TypeScript للملفات والمتغيرات والدوال والفئات والواجهات والأنواع والتعدادات والأنواع العامة والقيم المنطقية."
keywords:
  - "TypeScript"
  - "اصطلاحات التسمية"
  - "camelCase"
  - "PascalCase"
  - "kebab-case"
  - "UPPER_SNAKE_CASE"
machine_translated: true
---

# اصطلاحات التسمية

## نظرة عامة {/*#overview*/}

يجعل اتساق التسمية الشيفرة أسهل قراءةً وصيانةً. تعكس هذه الاصطلاحات معايير مجتمع TypeScript المعتمدة على نطاق واسع.

## الملفات والدلائل {/*#files--directories*/}

- يُستخدم **kebab-case** لأسماء الملفات والدلائل: `user-service.ts`، `auth-utils/`
- يُستخدم `.ts` لـ TypeScript العادي و`.tsx` للملفات التي تحتوي على JSX
- ملفات الاختبار: `user-service.test.ts` أو `user-service.spec.ts`
- تُسمّى الملفات باسم التصدير الرئيسي فيها حيثما أمكن

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

## المتغيرات والثوابت {/*#variables--constants*/}

- يُستخدم **camelCase** للمتغيرات المحلية والقيم ضمن نطاق الدالة
- يُستخدم **UPPER_SNAKE_CASE** للثوابت على مستوى الوحدة ذات القيم الثابتة
- يُستخدم **camelCase** للمتغيرات القابلة للتغيير على مستوى الوحدة أو كائنات الثوابت المعقدة

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

## الدوال والطرق {/*#functions--methods*/}

- يُستخدم **camelCase**
- يبدأ الاسم بـ **فعل** يصف الإجراء
- البادئات الشائعة: `get`، `set`، `create`، `update`، `delete`، `fetch`، `handle`، `validate`، `parse`، `format`، `convert`، `check`

```typescript
function getUserById(id: string): User { /* ... */ }
function validateEmail(email: string): boolean { /* ... */ }
function formatCurrency(amount: number): string { /* ... */ }
function parseResponseBody<T>(response: Response): T { /* ... */ }
```

## الفئات {/*#classes*/}

- يُستخدم **PascalCase**
- تُستخدم **أسماء** أو عبارات اسمية
- الأعضاء الخاصة: تُسبق بـ `_` أو تُستخدم الكلمة المفتاحية `private` (كلا الاصطلاحين موجود، ويُختار واحد لكل مشروع)

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

## الواجهات وأسماء الأنواع المستعارة {/*#interfaces--type-aliases*/}

- يُستخدم **PascalCase** لكليهما
- **بدون بادئة `I`** للواجهات، فهذا اصطلاح C# وليس أسلوب TypeScript المعتاد
- تُستخدم الواجهات لأشكال الكائنات التي قد تُوسَّع، والأنواع للاتحادات والتقاطعات والأنواع المُعيَّنة (mapped types)

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

## التعدادات (Enums) {/*#enums*/}

- اسم التعداد: **PascalCase** (بصيغة المفرد)
- أعضاء التعداد: **PascalCase**

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

### لماذا PascalCase لأعضاء التعداد؟ {/*#why-pascalcase-for-enum-members*/}

يستخدم مترجم TypeScript ومكتبته القياسية PascalCase لأعضاء التعداد (مثل `TypeScript.SyntaxKind.MethodDeclaration`). أما `UPPER_SNAKE_CASE` فهو شائع في لغات أخرى لكنه ليس الأسلوب المعتاد في TypeScript.

## الأنواع العامة (Generics) {/*#generics*/}

- تُستخدم **أحرف كبيرة مفردة** لمعاملات الأنواع البسيطة المعروفة: `T` (النوع)، `K` (المفتاح)، `V` (القيمة)، `E` (العنصر)
- تُستخدم **أسماء وصفية بصيغة PascalCase** مسبوقة بـ `T` عندما لا يكون المعنى بديهيًا أو عند وجود عدة معاملات أنواع

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

## القيم المنطقية (Booleans) {/*#booleans*/}

- تُسبق بـ **`is`** أو **`has`** أو **`should`** أو **`can`** أو **`was`**
- يجب أن يُقرأ الاسم كسؤال بنعم/لا

```typescript
const isActive = true;
const hasPermission = user.roles.includes("admin");
const shouldRetry = retryCount < MAX_RETRIES;
const canEdit = isActive && hasPermission;
const wasProcessed = record.status === "done";
```

## ملخص {/*#summary*/}

| العنصر              | الاصطلاح         | مثال                  |
| -------------------- | ------------------ | ------------------------ |
| الملفات والدلائل  | kebab-case         | `user-service.ts`        |
| المتغيرات            | camelCase          | `userName`               |
| الثوابت            | UPPER_SNAKE_CASE   | `MAX_RETRIES`            |
| الدوال والطرق  | camelCase          | `getUserById`            |
| الفئات              | PascalCase         | `UserRepository`         |
| الواجهات والأنواع   | PascalCase         | `UserProfile`            |
| التعدادات                | PascalCase         | `HttpStatusCode`         |
| أعضاء التعداد         | PascalCase         | `NotFound`               |
| الأنواع العامة             | T / PascalCase     | `T`، `TEntity`           |
| القيم المنطقية             | is/has/can/should  | `isActive`               |
