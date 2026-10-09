---
title: "SQL 子语言"
description: ""
keywords:
    - "SQL"
    - "子语言"
    - "DDL"
    - "DML"
    - "DQL"
    - "DCL"
    - "数据定义语言"
    - "数据操纵语言"
    - "数据查询语言"
    - "数据控制语言"
    - "数据库"
    - "数据库"
    - "关系型数据库"
tags:
    - ap2
machine_translated: true
---

# SQL 子语言

## DDL（数据定义语言） {/*#ddl-data-definition-language*/}

DDL 命令用于定义和管理数据库的结构，即其表、列、约束和索引。

**常用命令：**

- `CREATE` — 创建新的表、视图、索引或数据库
- `ALTER` — 修改现有结构（例如添加或删除列）
- `DROP` — 永久删除表或数据库
- `TRUNCATE` — 删除表中的所有行，但不删除表本身

## DML（数据操纵语言） {/*#dml-data-manipulation-language*/}

DML 命令用于修改实际存储的数据。

**常用命令：**

- `INSERT` — 向表中添加新行
- `UPDATE` — 修改现有行
- `DELETE` — 从表中删除行

## DQL（数据查询语言） {/*#dql-data-query-language*/}

DQL 用于从数据库中查询和检索数据，而不修改数据。

**常用命令：**

- `SELECT` — 从一个或多个表中检索行，可选择进行筛选、分组或排序

## DCL（数据控制语言） {/*#dcl-data-control-language*/}

DCL 管理数据库用户的访问权限。

**常用命令：**

- `GRANT` — 授予用户执行特定操作的权限
- `REVOKE` — 撤销先前授予的权限
