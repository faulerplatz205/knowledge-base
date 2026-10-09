---
title: "SQLサブ言語"
description: ""
keywords:
    - "SQL"
    - "サブ言語"
    - "DDL"
    - "DML"
    - "DQL"
    - "DCL"
    - "データ定義言語"
    - "データ操作言語"
    - "データ問い合わせ言語"
    - "データ制御言語"
    - "データベース"
    - "データベース"
    - "リレーショナルデータベース"
tags:
    - ap2
machine_translated: true
---

# SQLサブ言語

## DDL (Data Definition Language) {/*#ddl-data-definition-language*/}

DDLコマンドは、データベースの構造、すなわちテーブル、列、制約、インデックスを定義および管理する。

**主なコマンド:**

- `CREATE` — 新しいテーブル、ビュー、インデックス、またはデータベースを作成する
- `ALTER` — 既存の構造を変更する(例: 列の追加や削除)
- `DROP` — テーブルまたはデータベースを完全に削除する
- `TRUNCATE` — テーブル自体は削除せずに、テーブルのすべての行を削除する

## DML (Data Manipulation Language) {/*#dml-data-manipulation-language*/}

DMLコマンドは、実際に保存されているデータを変更するために使用される。

**主なコマンド:**

- `INSERT` — テーブルに新しい行を追加する
- `UPDATE` — 既存の行を変更する
- `DELETE` — テーブルから行を削除する

## DQL (Data Query Language) {/*#dql-data-query-language*/}

DQLは、データを変更せずにデータベースから問い合わせて取得するために使用される。

**主なコマンド:**

- `SELECT` — 1つ以上のテーブルから行を取得する。条件による絞り込み、グループ化、並べ替えも可能

## DCL (Data Control Language) {/*#dcl-data-control-language*/}

DCLは、データベースユーザーのアクセス権と権限を管理する。

**主なコマンド:**

- `GRANT` — 特定の操作を実行する権限をユーザーに付与する
- `REVOKE` — 以前に付与した権限を取り消す
