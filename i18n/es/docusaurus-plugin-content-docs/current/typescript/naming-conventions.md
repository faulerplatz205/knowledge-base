---
title: "Convenciones de nomenclatura"
description: "Convenciones de nomenclatura de TypeScript para archivos, variables, funciones, clases, interfaces, tipos, enums, genéricos y booleanos."
keywords:
  - "TypeScript"
  - "Convenciones de nomenclatura"
  - "camelCase"
  - "PascalCase"
  - "kebab-case"
  - "UPPER_SNAKE_CASE"
machine_translated: true
---

# Convenciones de nomenclatura

## Visión general {/*#overview*/}

Una nomenclatura coherente facilita la lectura y el mantenimiento del código. Estas convenciones reflejan los estándares de la comunidad de TypeScript más extendidos.

## Archivos y directorios {/*#files--directories*/}

- Se usa **kebab-case** para los nombres de archivos y directorios: `user-service.ts`, `auth-utils/`
- Se usa `.ts` para TypeScript simple y `.tsx` para los archivos que contienen JSX
- Archivos de prueba: `user-service.test.ts` o `user-service.spec.ts`
- Los archivos se nombran según su exportación principal siempre que sea posible

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

## Variables y constantes {/*#variables--constants*/}

- Se usa **camelCase** para las variables locales y los valores de ámbito de función
- Se usa **UPPER_SNAKE_CASE** para las constantes de nivel de módulo con valores fijos
- Se usa **camelCase** para las variables mutables de nivel de módulo o los objetos constantes complejos

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

## Funciones y métodos {/*#functions--methods*/}

- Se usa **camelCase**
- Se empieza con un **verbo** que describa la acción
- Prefijos habituales: `get`, `set`, `create`, `update`, `delete`, `fetch`, `handle`, `validate`, `parse`, `format`, `convert`, `check`

```typescript
function getUserById(id: string): User { /* ... */ }
function validateEmail(email: string): boolean { /* ... */ }
function formatCurrency(amount: number): string { /* ... */ }
function parseResponseBody<T>(response: Response): T { /* ... */ }
```

## Clases {/*#classes*/}

- Se usa **PascalCase**
- Se usan **sustantivos** o sintagmas nominales
- Miembros privados: prefijo `_` o la palabra clave `private` (existen ambas convenciones, se elige una por proyecto)

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

## Interfaces y alias de tipo {/*#interfaces--type-aliases*/}

- Se usa **PascalCase** en ambos casos
- **Sin prefijo `I`** en las interfaces: es una convención de C# y no es idiomática en TypeScript
- Se usan interfaces para formas de objeto que pueden extenderse y tipos para uniones, intersecciones y tipos mapeados

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

## Enums {/*#enums*/}

- Nombre del enum: **PascalCase** (singular)
- Miembros del enum: **PascalCase**

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

### ¿Por qué PascalCase para los miembros de un enum? {/*#why-pascalcase-for-enum-members*/}

El compilador de TypeScript y la biblioteca estándar usan PascalCase para los miembros de enum (p. ej. `TypeScript.SyntaxKind.MethodDeclaration`). `UPPER_SNAKE_CASE` es habitual en otros lenguajes, pero no es idiomático en TypeScript.

## Genéricos {/*#generics*/}

- Se usan **letras mayúsculas sueltas** para parámetros de tipo simples y bien conocidos: `T` (tipo), `K` (clave), `V` (valor), `E` (elemento)
- Se usan **nombres descriptivos en PascalCase** con el prefijo `T` cuando el significado no es evidente o hay varios parámetros de tipo

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

## Booleanos {/*#booleans*/}

- Prefijo **`is`**, **`has`**, **`should`**, **`can`** o **`was`**
- El nombre debe leerse como una pregunta de sí o no

```typescript
const isActive = true;
const hasPermission = user.roles.includes("admin");
const shouldRetry = retryCount < MAX_RETRIES;
const canEdit = isActive && hasPermission;
const wasProcessed = record.status === "done";
```

## Resumen de convenciones {/*#summary*/}

| Elemento             | Convención         | Ejemplo                  |
| -------------------- | ------------------ | ------------------------ |
| Archivos y directorios | kebab-case       | `user-service.ts`        |
| Variables            | camelCase          | `userName`               |
| Constantes           | UPPER_SNAKE_CASE   | `MAX_RETRIES`            |
| Funciones y métodos  | camelCase          | `getUserById`            |
| Clases               | PascalCase         | `UserRepository`         |
| Interfaces y tipos   | PascalCase         | `UserProfile`            |
| Enums                | PascalCase         | `HttpStatusCode`         |
| Miembros de enum     | PascalCase         | `NotFound`               |
| Genéricos            | T / PascalCase     | `T`, `TEntity`           |
| Booleanos            | is/has/can/should  | `isActive`               |
