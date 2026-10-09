---
title: Métodos de análise de problemas
description: "Principais métodos para análise de problemas de TI: o método dos 5 porquês, o diagrama de Ishikawa, o ciclo DMAIC e a matriz de causa e efeito"
keywords:
  - "Método dos 5 porquês"
  - "Diagrama de Ishikawa"
  - "Diagrama de espinha de peixe"
  - "DMAIC"
  - "Análise de causa raiz"
  - "Análise de problemas"
  - "Matriz de causa e efeito"
tags:
  - ap2
machine_translated: true
---

# Métodos de análise de problemas

## Visão geral {/*#overview*/}

Estes métodos são utilizados no [Gerenciamento de Problemas](./problem-management.md) para encontrar sistematicamente a causa raiz de um problema.

## Método dos 5 porquês (5-W-Methode) {/*#5-why-method-5-w-methode*/}

**Objetivo:** encontrar a causa raiz de um problema perguntando "Por quê?" repetidamente, de modo que cada resposta se torne a próxima pergunta. Geralmente cinco iterações são suficientes.

**Exemplo (problema de impressora):**

| Etapa    | Pergunta                                                  | Resposta                                                              |
| -------- | --------------------------------------------------------- | --------------------------------------------------------------------- |
| Problema | A impressora não imprime com nitidez                      |                                                                       |
| Por quê? | Por que a impressora não imprime com nitidez?             | Nem todos os caracteres são exibidos com clareza / a saída é ilegível |
| Por quê? | Por que nem todos os caracteres são exibidos com clareza? | A tinta/o toner é de má qualidade                                     |
| Por quê? | Por que a tinta/o toner é de má qualidade?                | Borra e às vezes não imprime                                          |
| Por quê? | Por que borra e às vezes não imprime?                     | A qualidade do toner é baixa                                          |
| Por quê? | Por que a qualidade do toner é baixa?                     | **O toner mais barato foi comprado** (causa raiz)                     |

## Diagrama de Ishikawa (diagrama de espinha de peixe) {/*#ishikawa-diagram-fishbone-diagram*/}

O **diagrama de Ishikawa** (também chamado de **diagrama de causa e efeito** ou **diagrama de espinha de peixe**) foi desenvolvido pelo cientista japonês Kaoru Ishikawa na década de 1940. Ele visualiza as causas de um problema.

**Estrutura:**

- Seta horizontal apontando para a direita => **descrição do problema na ponta** (o efeito)
- Setas diagonais que partem da linha horizontal => **categorias principais de influência** (as "espinhas")
- Setas menores que partem das espinhas diagonais => **subcausas** (Nebenursachen)

**Significado das setas:** cada seta "contribui para" o efeito descrito na ponta.

### Categorias principais de influência (8M) {/*#main-influence-categories-8m*/}

- Categoria
- Material
- Pessoas
- Máquina
- Método
- Gestão
- Meio ambiente
- Medição
- Dinheiro

Outras categorias de influência também são possíveis, dependendo do problema.

### Criação de um diagrama de Ishikawa {/*#creating-an-ishikawa-diagram*/}

1. Escrever a descrição do problema na ponta da seta horizontal (extremo direito)
2. Definir as categorias principais de influência (8M)
3. Encontrar as causas principais por meio de brainstorming em equipe (desenhadas como setas paralelas ao eixo horizontal)
4. Encontrar as subcausas de cada causa principal (desenhadas como setas diagonais que partem da seta da causa principal)

## Ciclo DMAIC {/*#dmaic-cycle*/}

O **ciclo DMAIC** é utilizado para problemas e projetos complexos. A sigla representa as cinco fases:

| Fase                    | Pergunta-chave                      | Métodos / Ferramentas                                                                                                                  |
| ----------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Define** (Definir)    | Qual é o problema?                  | Feedback de clientes, definição do problema, escopo, análise de KPIs, matriz RACI                                                      |
| **Measure** (Medir)     | Qual é o tamanho do problema?       | Análise da situação atual (IST), revisão do [SLA](./sla.md), esclarecimento do nível de escalonamento                                  |
| **Analyse** (Analisar)  | Quais são as causas raiz?           | Método dos 5 porquês, pesquisas com clientes, [base de erros](./problem-management.md#known-error-database-kedb), diagrama de Ishikawa |
| **Improve** (Melhorar)  | É possível desenvolver uma solução? | Simulações, execuções de teste, matriz de soluções, diagrama de Ishikawa                                                               |
| **Control** (Controlar) | A melhoria pode ser assegurada?     | Monitoramento, sistema de gerenciamento de serviços                                                                                    |

## Problemlösungsmatrix / Ursachen-Wirkungs-Matrix {/*#problemlösungsmatrix--ursachen-wirkungs-matrix*/}

A **matriz de causa e efeito** (baseada no método Kepner-Tregoe) analisa um problema em quatro dimensões para restringir sistematicamente a causa raiz, comparando o que É o caso com o que NÃO É o caso:

| Dimensão                   | É (o problema)                                | NÃO É (o problema)                    | Desvio                                                       | Causa possível                |
| -------------------------- | --------------------------------------------- | ------------------------------------- | ------------------------------------------------------------ | ----------------------------- |
| **Identificar (O quê)**    | Qual é o problema?                            | Qual NÃO é o problema?                | Qual é a diferença entre o estado atual e o estado desejado? | Qual é a causa possível?      |
| **Localizar (Onde)**       | Onde o problema ocorre?                       | Onde ele NÃO ocorre?                  | O que é diferente nesse local?                               | Qual é a causa possível?      |
| **Tempo (Quando)**         | Quando o problema apareceu?                   | Quando ele NÃO apareceu?              | O que era diferente naquele momento?                         | Qual é a causa possível?      |
|                            | Em que período o problema foi identificado?   | Em que período ele NÃO apareceu?      | O que era diferente durante esse período?                    |                               |
| **Significância (Quanto)** | Qual é o tamanho / a abrangência do problema? | Quão pequeno ou limitado ele é?       | Qual é a diferença de escopo?                                | Qual é a causa possível?      |
|                            | Quantas (unidades) são afetadas?              | Quantas (unidades) NÃO são afetadas?  |                                                              |                               |
|                            | Qual parte é afetada?                         | Qual parte NÃO é afetada?             |                                                              |                               |
