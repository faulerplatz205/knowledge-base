---
title: "Normalização"
description: "Uma visão geral das três formas normais de banco de dados (1NF, 2NF, 3NF) com exemplos."
keywords:
    - "Normalização"
    - "Banco de Dados"
    - "Bancos de Dados"
    - "1NF"
    - "2NF"
    - "3NF"
    - "Formas Normais"
    - "Banco de Dados Relacional"
tags:
    - ap2
machine_translated: true
---

# Normalização

## Visão Geral {/*#overview*/}

A normalização é o processo de estruturar um banco de dados relacional para reduzir a redundância de dados e melhorar a integridade dos dados. Cada forma normal se baseia na anterior.

## Redundância {/*#redundancy*/}

Redundância é a repetição desnecessária dos mesmos dados em um banco de dados.

## Primeira Forma Normal (1NF) {/*#first-normal-form-1nf*/}

**Regra**: Toda coluna deve conter valores atômicos (indivisíveis), e cada linha deve ser única.

**Violação**: Uma coluna `Phone` que armazena vários números em uma única célula.

| CustomerID | Name  | Phone            |
| ---------- | ----- | ---------------- |
| 1          | Alice | 111-111, 222-222 |

**Corrigido**:

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

**Violação**: Várias colunas para o mesmo atributo.

| CustomerID | Name  | Phone1  | Phone2  |
| ---------- | ----- | ------- | ------- |
| 1          | Alice | 111-111 | 222-222 |

**Corrigido**:

| CustomerID | Name  | Phone   |
| ---------- | ----- | ------- |
| 1          | Alice | 111-111 |
| 1          | Alice | 222-222 |

## Segunda Forma Normal (2NF) {/*#second-normal-form-2nf*/}

**Regra**: Deve estar na 1NF, e todo atributo não chave deve depender da chave primária **inteira**, e não apenas de parte dela

**Violação**: A tabela usa `(OrderID, ProductID)` como chave composta, mas `ProductName` depende apenas de `ProductID`.

| OrderID | ProductID | ProductName | Quantity |
| ------- | --------- | ----------- | -------- |
| 1       | 42        | Keyboard    | 2        |
| 2       | 42        | Keyboard    | 1        |

**Corrigido**: Mover `ProductName` para uma tabela `Products` separada.

**Orders**:

| OrderID | ProductID | Quantity |
| ------- | --------- | -------- |
| 1       | 42        | 2        |
| 2       | 42        | 1        |

**Products**:

| ProductID | ProductName |
| --------- | ----------- |
| 42        | Keyboard    |

## Terceira Forma Normal (3NF) {/*#third-normal-form-3nf*/}

**Regra**: Deve estar na 2NF, e nenhum atributo não chave pode depender de outro atributo não chave (sem dependências transitivas).

**Violação**: `DepartmentHead` depende de `Department`, e não diretamente de `EmployeeID`.

| EmployeeID | Department | DepartmentHead |
| ---------- | ---------- | -------------- |
| 1          | Sales      | Carol          |
| 2          | Sales      | Carol          |
| 3          | IT         | Dave           |

**Corrigido**: Mover `DepartmentHead` para uma tabela `Departments` separada.

**Employees**:

| EmployeeID | Department |
| ---------- | ---------- |
| 1          | Sales      |
| 2          | Sales      |
| 3          | IT         |

**Departments**:

| Department | DepartmentHead |
| ---------- | -------------- |
| Sales      | Carol          |
| IT         | Dave           |

## Resumo {/*#summary*/}

| Forma Normal | Requisito                                                          |
| ------------ | ------------------------------------------------------------------ |
| 1NF          | Valores atômicos, sem colunas repetidas, linhas únicas             |
| 2NF          | 1NF + sem dependências parciais de uma chave composta              |
| 3NF          | 2NF + sem dependências transitivas entre atributos não chave       |
