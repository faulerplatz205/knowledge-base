---
title: "JSON"
description: "JSON 约定：文件命名、键命名，以及 JSON、JSONC 和 JSON5 的比较"
keywords:
  - "JSON"
  - "JSONC"
  - "JSON5"
  - "文件命名"
  - "键命名"
  - "kebab-case"
  - "camelCase"
  - "命名约定"
tags:
  - ap2
machine_translated: true
---

# JSON

## 概述 {/*#overview*/}

JSON（JavaScript Object Notation）是一种轻量级的文本数据格式，由 Douglas Crockford 于 2000 年代初提出。它源自 JavaScript 的对象字面量语法，但与语言无关。如今 JSON 是 Web 客户端与服务器之间数据交换、配置文件和 API 中使用最广泛的格式。

## 文件命名 {/*#file-naming*/}

### 结论：kebab-case {/*#answer-kebab-case*/}

```text
user-data.json
api-config.json
database-schema.json
```

### 为什么选择 kebab-case？ {/*#why-kebab-case*/}

- **跨平台安全**：不会在不区分大小写的文件系统（Windows/macOS）上出现问题
- **在文件列表和资源管理器中可读性更好**
- **对 URL 友好**：文件通过 HTTP 提供时无需编码

## 键命名 {/*#key-naming*/}

### 结论：camelCase {/*#answer-camelcase*/}

```json
{
  "userId": 123,
  "firstName": "Alice",
  "isActive": true
}
```

### 为什么选择 camelCase？ {/*#why-camelcase*/}

- 是 JavaScript/TypeScript 生态系统中的标准，JSON 即源于此
- JSON 规范本身并未规定键的风格
- 大多数公共 Web API（Google、GitHub、Stripe）使用 camelCase

### 注意 {/*#note*/}

`snake_case` 常见于以 Python 为中心的 API（例如 Django REST Framework、FastAPI）。应选定一种风格，并在项目内保持一致。

## JSON、JSONC 与 JSON5 对比 {/*#json-vs-jsonc-vs-json5*/}

| 特性               | JSON                | JSONC                              | JSON5                           |
| --------------------- | ------------------- | ---------------------------------- | ------------------------------- |
| 注释              | 否                  | `//` 和 `/* */`                   | `//` 和 `/* */`                |
| 尾随逗号       | 否                  | 是                                | 是                             |
| 无引号的键         | 否                  | 否                                 | 是                             |
| 单引号字符串 | 否                  | 否                                 | 是                             |
| 典型用途           | 数据交换、API | 配置文件（VS Code、TypeScript） | 配置文件、人工编辑的数据 |
