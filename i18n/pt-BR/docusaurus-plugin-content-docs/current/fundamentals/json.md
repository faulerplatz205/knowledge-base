---
title: "JSON"
description: "Convenções de JSON: nomenclatura de arquivos, nomenclatura de chaves e comparação entre JSON, JSONC e JSON5"
keywords:
  - "JSON"
  - "JSONC"
  - "JSON5"
  - "Nomenclatura de arquivos"
  - "Nomenclatura de chaves"
  - "kebab-case"
  - "camelCase"
  - "Convenções de nomenclatura"
tags:
  - ap2
machine_translated: true
---

# JSON

## Visão geral {/*#overview*/}

JSON (JavaScript Object Notation) é um formato de dados leve, baseado em texto, introduzido por Douglas Crockford no início dos anos 2000. Deriva da sintaxe de literais de objeto do JavaScript, mas é independente de linguagem. Hoje o JSON é o formato mais usado para troca de dados entre clientes e servidores web, arquivos de configuração e APIs.

## Nomenclatura de arquivos {/*#file-naming*/}

### Resposta: kebab-case {/*#answer-kebab-case*/}

```text
user-data.json
api-config.json
database-schema.json
```

### Por que kebab-case? {/*#why-kebab-case*/}

- **Seguro entre plataformas**: Sem problemas com sistemas de arquivos que não diferenciam maiúsculas de minúsculas (Windows/macOS)
- **Melhor legibilidade** em listas de arquivos e exploradores
- **Compatível com URLs**: Funciona sem codificação se os arquivos forem servidos via HTTP

## Nomenclatura de chaves {/*#key-naming*/}

### Resposta: camelCase {/*#answer-camelcase*/}

```json
{
  "userId": 123,
  "firstName": "Alice",
  "isActive": true
}
```

### Por que camelCase? {/*#why-camelcase*/}

- Padrão no ecossistema JavaScript/TypeScript, de onde o JSON se origina
- A própria especificação JSON não prescreve um estilo de chave
- A maioria das APIs web públicas (Google, GitHub, Stripe) usa camelCase

### Observação {/*#note*/}

`snake_case` é comum em APIs centradas em Python (por exemplo Django REST Framework, FastAPI). Convém escolher um estilo e mantê-lo consistente dentro de um projeto.

## JSON vs. JSONC vs. JSON5 {/*#json-vs-jsonc-vs-json5*/}

| Recurso               | JSON                | JSONC                              | JSON5                           |
| --------------------- | ------------------- | ---------------------------------- | ------------------------------- |
| Comentários              | Não                  | `//` e `/* */`                   | `//` e `/* */`                |
| Vírgulas finais       | Não                  | Sim                                | Sim                             |
| Chaves sem aspas         | Não                  | Não                                 | Sim                             |
| Strings com aspas simples | Não                  | Não                                 | Sim                             |
| Uso típico           | Troca de dados, APIs | Arquivos de configuração (VS Code, TypeScript) | Arquivos de configuração, dados editados manualmente |
