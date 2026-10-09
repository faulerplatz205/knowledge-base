---
title: "Convenções de Nomenclatura"
description: "Convenções de nomenclatura do TypeScript para arquivos, variáveis, funções, classes, interfaces, tipos, enums, genéricos e booleanos."
keywords:
  - "TypeScript"
  - "Convenções de Nomenclatura"
  - "camelCase"
  - "PascalCase"
  - "kebab-case"
  - "UPPER_SNAKE_CASE"
machine_translated: true
---

# Convenções de Nomenclatura

## Visão geral {/*#overview*/}

Uma nomenclatura consistente torna o código mais fácil de ler e manter. Estas convenções refletem padrões amplamente adotados pela comunidade TypeScript.

## Arquivos e diretórios {/*#files--directories*/}

- Usar **kebab-case** para nomes de arquivos e diretórios: `user-service.ts`, `auth-utils/`
- Usar `.ts` para TypeScript puro e `.tsx` para arquivos que contêm JSX
- Arquivos de teste: `user-service.test.ts` ou `user-service.spec.ts`
- Nomear os arquivos conforme a exportação principal, sempre que possível

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

## Variáveis e constantes {/*#variables--constants*/}

- Usar **camelCase** para variáveis locais e valores com escopo de função
- Usar **UPPER_SNAKE_CASE** para constantes de nível de módulo com valores fixos
- Usar **camelCase** para variáveis mutáveis de nível de módulo ou objetos constantes complexos

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

## Funções e métodos {/*#functions--methods*/}

- Usar **camelCase**
- Começar com um **verbo** que descreva a ação
- Prefixos comuns: `get`, `set`, `create`, `update`, `delete`, `fetch`, `handle`, `validate`, `parse`, `format`, `convert`, `check`

```typescript
function getUserById(id: string): User { /* ... */ }
function validateEmail(email: string): boolean { /* ... */ }
function formatCurrency(amount: number): string { /* ... */ }
function parseResponseBody<T>(response: Response): T { /* ... */ }
```

## Classes {/*#classes*/}

- Usar **PascalCase**
- Usar **substantivos** ou locuções nominais
- Membros privados: prefixar com `_` ou usar a palavra-chave `private` (ambas as convenções existem, escolher uma por projeto)

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

## Interfaces e aliases de tipo {/*#interfaces--type-aliases*/}

- Usar **PascalCase** para ambos
- **Sem prefixo `I`** para interfaces: trata-se de uma convenção do C#, não do TypeScript idiomático
- Usar interfaces para formas de objeto que podem ser estendidas e types para uniões, interseções e mapped types

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

- Nome do enum: **PascalCase** (singular)
- Membros do enum: **PascalCase**

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

### Por que PascalCase para membros de enum? {/*#why-pascalcase-for-enum-members*/}

O compilador do TypeScript e a biblioteca padrão usam PascalCase para membros de enum (p. ex. `TypeScript.SyntaxKind.MethodDeclaration`). `UPPER_SNAKE_CASE` é comum em outras linguagens, mas não é idiomático em TypeScript.

## Genéricos {/*#generics*/}

- Usar **letras maiúsculas únicas** para parâmetros de tipo simples e bem conhecidos: `T` (type), `K` (key), `V` (value), `E` (element)
- Usar **nomes descritivos em PascalCase** prefixados com `T` quando o significado não é óbvio ou quando há vários parâmetros de tipo

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

- Prefixar com **`is`**, **`has`**, **`should`**, **`can`** ou **`was`**
- O nome deve soar como uma pergunta de sim ou não

```typescript
const isActive = true;
const hasPermission = user.roles.includes("admin");
const shouldRetry = retryCount < MAX_RETRIES;
const canEdit = isActive && hasPermission;
const wasProcessed = record.status === "done";
```

## Resumo {/*#summary*/}

| Elemento             | Convenção          | Exemplo                  |
| -------------------- | ------------------ | ------------------------ |
| Arquivos e diretórios | kebab-case        | `user-service.ts`        |
| Variáveis            | camelCase          | `userName`               |
| Constantes           | UPPER_SNAKE_CASE   | `MAX_RETRIES`            |
| Funções e métodos    | camelCase          | `getUserById`            |
| Classes              | PascalCase         | `UserRepository`         |
| Interfaces e types   | PascalCase         | `UserProfile`            |
| Enums                | PascalCase         | `HttpStatusCode`         |
| Membros de enum      | PascalCase         | `NotFound`               |
| Genéricos            | T / PascalCase     | `T`, `TEntity`           |
| Booleanos            | is/has/can/should  | `isActive`               |
