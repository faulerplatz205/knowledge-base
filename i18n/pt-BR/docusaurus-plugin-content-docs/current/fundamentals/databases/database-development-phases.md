---
title: "Fases do Desenvolvimento de Bancos de Dados"
description: "Visão geral das quatro fases do desenvolvimento de bancos de dados: externa, conceitual, semântica e física."
keywords:
    - "projeto de banco de dados"
    - "desenvolvimento de banco de dados"
    - "modelo ER"
    - "projeto conceitual"
    - "projeto físico"
    - "normalização"
tags:
    - ap2
machine_translated: true
---

# Fases do Desenvolvimento de Bancos de Dados

O desenvolvimento de um banco de dados costuma ser dividido em quatro fases sucessivas, cada uma produzindo um artefato mais concreto que o anterior.

## 1. Fase Externa {/*#1-external-phase*/}

Levantar e analisar os requisitos de todos os futuros usuários e grupos de partes interessadas. O objetivo é entender quais dados o sistema deve gerenciar e quais operações deve suportar, sem ainda pensar em como o banco de dados será estruturado.

Os resultados típicos são documentos de requisitos e descrições informais dos dados e das regras de negócio.

## 2. Fase Conceitual {/*#2-conceptual-phase*/}

Traduzir os requisitos em um modelo de dados abstrato e independente de implementação. A ferramenta padrão para isso é o [**Modelo Entidade-Relacionamento (MER)**](./er-model.md), que captura entidades, seus atributos e os relacionamentos entre elas.

O modelo conceitual é independente de tecnologia: ele descreve *qual é a aparência* dos dados, não *como* serão armazenados.

## 3. Fase Semântica {/*#3-semantic-phase*/}

Refinar e formalizar o modelo conceitual, definindo com precisão restrições de integridade, cardinalidades e regras de negócio. O MER é então transformado em um [**esquema de banco de dados relacional**](./database-schema.md) (tabelas, colunas, chaves primárias, chaves estrangeiras).

Esta fase também inclui a [**normalização**](./normalization.md), que elimina redundâncias e anomalias.

## 4. Fase Física {/*#4-physical-phase*/}

Implementar o modelo relacional em um SGBD concreto (p. ex. PostgreSQL, MySQL). Esta fase abrange:

- Escrever instruções `CREATE TABLE` com tipos de dados apropriados
- Definir índices para otimizar o desempenho das consultas
- Configurar parâmetros de armazenamento específicos do SGBD escolhido
- Configurar controle de acesso e políticas de segurança

O modelo físico está fortemente acoplado ao sistema de destino e pode diferir entre produtos de SGBD.
