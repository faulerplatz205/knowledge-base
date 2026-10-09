---
title: "Conventions de nommage"
description: "Conventions de nommage TypeScript pour les fichiers, variables, fonctions, classes, interfaces, types, enums, génériques et booléens."
keywords:
  - "TypeScript"
  - "Conventions de nommage"
  - "camelCase"
  - "PascalCase"
  - "kebab-case"
  - "UPPER_SNAKE_CASE"
machine_translated: true
---

# Conventions de nommage

## Aperçu {/*#overview*/}

Un nommage cohérent rend le code plus facile à lire et à maintenir. Ces conventions reflètent des standards largement adoptés par la communauté TypeScript.

## Fichiers et répertoires {/*#files--directories*/}

- Utiliser **kebab-case** pour les noms de fichiers et de répertoires : `user-service.ts`, `auth-utils/`
- Utiliser `.ts` pour le TypeScript pur, `.tsx` pour les fichiers contenant du JSX
- Fichiers de test : `user-service.test.ts` ou `user-service.spec.ts`
- Nommer les fichiers d'après leur export principal lorsque c'est possible

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

## Variables et constantes {/*#variables--constants*/}

- Utiliser **camelCase** pour les variables locales et les valeurs à portée de fonction
- Utiliser **UPPER_SNAKE_CASE** pour les constantes de niveau module à valeur fixe
- Utiliser **camelCase** pour les variables modifiables de niveau module ou les objets constants complexes

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

## Fonctions et méthodes {/*#functions--methods*/}

- Utiliser **camelCase**
- Commencer par un **verbe** décrivant l'action
- Préfixes courants : `get`, `set`, `create`, `update`, `delete`, `fetch`, `handle`, `validate`, `parse`, `format`, `convert`, `check`

```typescript
function getUserById(id: string): User { /* ... */ }
function validateEmail(email: string): boolean { /* ... */ }
function formatCurrency(amount: number): string { /* ... */ }
function parseResponseBody<T>(response: Response): T { /* ... */ }
```

## Classes {/*#classes*/}

- Utiliser **PascalCase**
- Utiliser des **noms** ou des groupes nominaux
- Membres privés : préfixer avec `_` ou utiliser le mot-clé `private` (les deux conventions existent, en choisir une par projet)

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

## Interfaces et alias de types {/*#interfaces--type-aliases*/}

- Utiliser **PascalCase** pour les deux
- **Pas de préfixe `I`** pour les interfaces : il s'agit d'une convention C#, non idiomatique en TypeScript
- Utiliser des interfaces pour les formes d'objets susceptibles d'être étendues, des types pour les unions, intersections et types mappés

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

- Nom de l'enum : **PascalCase** (singulier)
- Membres de l'enum : **PascalCase**

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

### Pourquoi PascalCase pour les membres d'enum ? {/*#why-pascalcase-for-enum-members*/}

Le compilateur TypeScript et la bibliothèque standard utilisent PascalCase pour les membres d'enum (p. ex. `TypeScript.SyntaxKind.MethodDeclaration`). `UPPER_SNAKE_CASE` est courant dans d'autres langages, mais non idiomatique en TypeScript.

## Génériques {/*#generics*/}

- Utiliser **des lettres majuscules isolées** pour les paramètres de type simples et bien connus : `T` (type), `K` (clé), `V` (valeur), `E` (élément)
- Utiliser des **noms descriptifs en PascalCase** préfixés par `T` lorsque la signification n'est pas évidente ou en présence de plusieurs paramètres de type

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

## Booléens {/*#booleans*/}

- Préfixer avec **`is`**, **`has`**, **`should`**, **`can`** ou **`was`**
- Le nom doit se lire comme une question à réponse oui/non

```typescript
const isActive = true;
const hasPermission = user.roles.includes("admin");
const shouldRetry = retryCount < MAX_RETRIES;
const canEdit = isActive && hasPermission;
const wasProcessed = record.status === "done";
```

## Récapitulatif {/*#summary*/}

| Élément                  | Convention         | Exemple                  |
| ------------------------ | ------------------ | ------------------------ |
| Fichiers et répertoires  | kebab-case         | `user-service.ts`        |
| Variables                | camelCase          | `userName`               |
| Constantes               | UPPER_SNAKE_CASE   | `MAX_RETRIES`            |
| Fonctions et méthodes    | camelCase          | `getUserById`            |
| Classes                  | PascalCase         | `UserRepository`         |
| Interfaces et types      | PascalCase         | `UserProfile`            |
| Enums                    | PascalCase         | `HttpStatusCode`         |
| Membres d'enum           | PascalCase         | `NotFound`               |
| Génériques               | T / PascalCase     | `T`, `TEntity`           |
| Booléens                 | is/has/can/should  | `isActive`               |
