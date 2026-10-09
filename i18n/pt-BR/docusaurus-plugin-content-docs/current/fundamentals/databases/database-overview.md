---
title: "Visão Geral de Bancos de Dados"
description: "Uma visão geral de bancos de dados relacionais e não relacionais, conceitos centrais como normalização e ACID, e sistemas de banco de dados comuns."
keywords:
    - Bancos de Dados
    - SQL
    - NoSQL
    - Banco de Dados Relacional
    - ACID
    - Normalização
    - PostgreSQL
    - MongoDB
tags:
    - ap2
machine_translated: true
---

# Visão Geral de Bancos de Dados

## Visão Geral {/*#overview*/}

Um banco de dados é uma coleção organizada de dados estruturados, gerenciada por um Sistema de Gerenciamento de Banco de Dados (SGBD). Os dois paradigmas principais são os bancos de dados **relacionais (SQL)** e **não relacionais (NoSQL)**.

## Bancos de Dados Relacionais (SQL) {/*#relational-databases-sql*/}

Os dados são armazenados em **tabelas** com linhas e colunas. Cada conjunto de dados é identificado de forma única por uma **chave primária**, e as tabelas são ligadas por meio de **chaves estrangeiras**, formando um esquema estruturado.

- Os dados são consultados com **SQL** (Structured Query Language)
- O esquema é definido previamente e imposto pelo banco de dados
- Mais adequados para dados estruturados com relacionamentos claros

**Sistemas comuns**: PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Oracle DB

### Conceitos-Chave {/*#key-concepts*/}

**[Normalização](./normalization.md)**: Organização das tabelas para reduzir a redundância de dados:

- **1NF**: Valores atômicos, sem grupos repetidos
- **2NF**: Sem dependências parciais em chaves compostas
- **3NF**: Sem dependências transitivas

**Propriedades ACID**: Garantias para transações confiáveis:

- **Atomicidade**: Uma transação é totalmente bem-sucedida ou totalmente malsucedida
- **Consistência**: Os dados sempre passam de um estado válido para outro
- **Isolamento**: Transações concorrentes não interferem umas nas outras
- **Durabilidade**: As alterações confirmadas persistem mesmo após uma falha

## Bancos de Dados Não Relacionais (NoSQL) {/*#non-relational-databases-nosql*/}

Projetados para o armazenamento flexível e escalável de dados não estruturados ou semiestruturados. Nenhum esquema fixo é necessário.

| Tipo           | Descrição                                          | Sistemas de Exemplo |
| -------------- | -------------------------------------------------- | ------------------- |
| Documento      | Armazena documentos semelhantes a JSON             | MongoDB, CouchDB    |
| Chave-Valor    | Pares simples chave => valor                       | Redis, DynamoDB     |
| Família de Colunas | Otimizado para leituras/escritas colunares     | Apache Cassandra    |
| Grafo          | Nós e arestas para dados com muitos relacionamentos | Neo4j              |

## Relacional vs. NoSQL {/*#relational-vs-nosql*/}

|                     | Relacional                        | NoSQL                                        |
| ------------------- | --------------------------------- | -------------------------------------------- |
| Esquema             | Fixo, predefinido                 | Flexível / sem esquema                       |
| Linguagem de consulta | SQL                             | Varia (p. ex., MongoDB Query Language)       |
| Escalabilidade      | Vertical (scale up)               | Horizontal (scale out)                       |
| Consistência        | Forte (ACID)                      | Frequentemente consistência eventual         |
| Mais adequado para  | Dados estruturados, joins complexos | Grande escala, dados flexíveis ou hierárquicos |
