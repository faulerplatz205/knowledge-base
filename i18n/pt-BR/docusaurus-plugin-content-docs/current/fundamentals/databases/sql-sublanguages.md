---
title: "Sublinguagens SQL"
description: ""
keywords:
    - "SQL"
    - "Sublinguagens"
    - "DDL"
    - "DML"
    - "DQL"
    - "DCL"
    - "Data Definition Language"
    - "Data Manipulation Language"
    - "Data Query Language"
    - "Data Control Language"
    - "Banco de Dados"
    - "Bancos de Dados"
    - "Banco de Dados Relacional"
tags:
    - ap2
machine_translated: true
---

# Sublinguagens SQL

## DDL (Data Definition Language) {/*#ddl-data-definition-language*/}

Os comandos DDL definem e gerenciam a estrutura de um banco de dados, ou seja, suas tabelas, colunas, restrições e índices.

**Comandos comuns:**

- `CREATE` — cria uma nova tabela, view, índice ou banco de dados
- `ALTER` — modifica uma estrutura existente (p. ex. adicionar ou remover uma coluna)
- `DROP` — exclui permanentemente uma tabela ou um banco de dados
- `TRUNCATE` — remove todas as linhas de uma tabela sem excluir a própria tabela

## DML (Data Manipulation Language) {/*#dml-data-manipulation-language*/}

Os comandos DML são usados para modificar os dados efetivamente armazenados.

**Comandos comuns:**

- `INSERT` — adiciona novas linhas a uma tabela
- `UPDATE` — modifica linhas existentes
- `DELETE` — remove linhas de uma tabela

## DQL (Data Query Language) {/*#dql-data-query-language*/}

A DQL é usada para consultar e recuperar dados do banco de dados sem modificá-los.

**Comandos comuns:**

- `SELECT` — recupera linhas de uma ou mais tabelas, opcionalmente filtradas, agrupadas ou ordenadas

## DCL (Data Control Language) {/*#dcl-data-control-language*/}

A DCL gerencia direitos de acesso e permissões dos usuários do banco de dados.

**Comandos comuns:**

- `GRANT` — concede a um usuário permissão para executar ações específicas
- `REVOKE` — remove permissões concedidas anteriormente
