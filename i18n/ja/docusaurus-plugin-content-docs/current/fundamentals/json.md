---
title: "JSON"
description: "JSONの規約: ファイル名の付け方、キー名の付け方、JSON、JSONC、JSON5の比較"
keywords:
  - "JSON"
  - "JSONC"
  - "JSON5"
  - "ファイル名の付け方"
  - "キー名の付け方"
  - "kebab-case"
  - "camelCase"
  - "命名規則"
tags:
  - ap2
machine_translated: true
---

# JSON

## 概要 {/*#overview*/}

JSON (JavaScript Object Notation) は、2000年代前半にDouglas Crockfordによって導入された、軽量でテキストベースのデータ形式である。JavaScriptのオブジェクトリテラル構文に由来するが、言語に依存しない。今日、JSONはWebクライアントとサーバー間のデータ交換、設定ファイル、APIで最も広く使われている形式である。

## ファイル名の付け方 {/*#file-naming*/}

### 答え: kebab-case {/*#answer-kebab-case*/}

```text
user-data.json
api-config.json
database-schema.json
```

### なぜkebab-caseか? {/*#why-kebab-case*/}

- **クロスプラットフォームで安全**: 大文字と小文字を区別しないファイルシステム(Windows/macOS)での問題がない
- ファイル一覧やエクスプローラーでの**可読性が高い**
- **URLに適している**: ファイルがHTTP経由で提供される場合も、エンコードなしで機能する

## キー名の付け方 {/*#key-naming*/}

### 答え: camelCase {/*#answer-camelcase*/}

```json
{
  "userId": 123,
  "firstName": "Alice",
  "isActive": true
}
```

### なぜcamelCaseか? {/*#why-camelcase*/}

- JSONの発祥であるJavaScript/TypeScriptエコシステムでの標準である
- JSONの仕様自体は、キーのスタイルを定めていない
- ほとんどの公開Web API(Google、GitHub、Stripe)がcamelCaseを使用している

### 注記 {/*#note*/}

`snake_case` は、Python中心のAPI(例: Django REST Framework、FastAPI)で一般的である。1つのスタイルを選び、プロジェクト内で一貫させる。

## JSON、JSONC、JSON5の比較 {/*#json-vs-jsonc-vs-json5*/}

| 機能               | JSON                | JSONC                              | JSON5                           |
| --------------------- | ------------------- | ---------------------------------- | ------------------------------- |
| コメント              | なし                  | `//` と `/* */`                   | `//` と `/* */`                |
| 末尾のカンマ       | なし                  | あり                                | あり                             |
| 引用符なしのキー         | なし                  | なし                                 | あり                             |
| シングルクォートの文字列 | なし                  | なし                                 | あり                             |
| 典型的な用途           | データ交換、API | 設定ファイル(VS Code、TypeScript) | 設定ファイル、人が編集するデータ |
