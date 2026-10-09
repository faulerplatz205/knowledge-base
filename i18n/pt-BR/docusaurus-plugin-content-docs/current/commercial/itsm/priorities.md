---
title: Priorização no suporte de TI
description: "A matriz de prioridades do ITIL (urgência x impacto) e a matriz de Eisenhower como ferramentas para priorizar incidentes e tarefas no suporte de TI"
keywords:
  - "Matriz de prioridades ITIL"
  - "Urgência"
  - "Impacto"
  - "Matriz de Eisenhower"
  - "Priorização"
  - "Prioridade de incidentes"
  - "Tempo de resposta"
  - "SLA"
tags:
  - ap2
machine_translated: true
---

# Priorização no suporte de TI

## Visão geral {/*#overview*/}

Duas ferramentas principais são utilizadas para a priorização no suporte de TI: a **matriz de prioridades do ITIL** e a **matriz de Eisenhower**.

## Matriz de prioridades do ITIL {/*#itil-priority-matrix*/}

### Níveis de urgência {/*#urgency-levels*/}

| Nível          | Descrição                                                                                                                                                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alta (H)**   | O dano causado pelo incidente aumenta rapidamente. As tarefas que não podem ser cumpridas são muito críticas em termos de tempo. Uma ação rápida pode evitar que um Minor Incident se torne um [Major Incident](./incident-management.md#major-incident). Vários usuários VIP são afetados. |
| **Média (M)**  | O dano aumenta com o tempo. As tarefas que não podem ser cumpridas são apenas moderadamente críticas em termos de tempo. Um usuário VIP é afetado.                                                                                                                                      |
| **Baixa (N)**  | O dano não aumenta com o tempo. As tarefas que não podem ser cumpridas não são críticas em termos de tempo.                                                                                                                                                                             |

### Níveis de impacto {/*#impact-levels*/}

| Nível         | Descrição                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alto (H)**  | Grande número de colaboradores afetados e/ou impedidos de cumprir suas tarefas. Grande número de clientes afetados ou substancialmente prejudicados. Dano financeiro provável > 10.000 EUR. Dano à reputação em grande escala provável. Risco à vida e à integridade física.                                     |
| **Médio (M)** | Número moderado de colaboradores afetados e/ou incapazes de cumprir as tarefas conforme o planejado. Número moderado de clientes afetados ou com restrições de conforto. Dano financeiro provável de 1.000 a 10.000 EUR. Dano moderado à reputação provável.                                                     |
| **Baixo (N)** | Número mínimo de colaboradores afetados; ainda conseguem cumprir as tarefas, mas com esforço adicional. Número mínimo de clientes afetados; apenas restrições de conforto leves. Dano financeiro provável < 1.000 EUR. Espera-se apenas dano mínimo à reputação.                                                  |

### Matriz de prioridades {/*#priority-matrix*/}

A **matriz urgência x impacto** produz um nível de prioridade de 1 (mais crítico) a 5 (mais baixo):

|                | **Impacto H** | **Impacto M** | **Impacto N** |
| -------------- | ------------- | ------------- | ------------- |
| **Urgência H** | **1**         | 2             | 3             |
| **Urgência M** | 2             | **3**         | 4             |
| **Urgência N** | 3             | 4             | **5**         |

### Códigos de prioridade e tempos de resposta/resolução do [SLA](./sla.md) {/*#priority-codes-and-sla-responseresolution-times*/}

| Prioridade | Descrição                | Tempo de resposta | Tempo de resolução |
| ---------- | ------------------------ | ----------------- | ------------------ |
| **1**      | Kritisch (Crítica)       | Imediatamente     | 1 hora             |
| **2**      | Hoch (Alta)              | 10 minutos        | 4 horas            |
| **3**      | Mittel (Média)           | 1 hora            | 8 horas            |
| **4**      | Niedrig (Baixa)          | 4 horas           | 24 horas           |
| **5**      | Sehr niedrig (Muito baixa) | 1 dia           | 1 semana           |

## Matriz de Eisenhower {/*#eisenhower-matrix*/}

A **matriz de Eisenhower** é um método de gestão do tempo para distinguir entre tarefas importantes e urgentes. Recebeu esse nome em homenagem ao presidente dos EUA Dwight D. Eisenhower (1953–1961). Também é chamada de método dos quatro quadrantes, método Eisenhower ou caixa de Eisenhower.

**Objetivo:** não fazer as coisas da maneira certa, mas fazer as coisas certas (eficácia, não apenas eficiência).

Duas perguntas por tarefa:

1. Qual é a importância da tarefa?
2. Qual é a urgência da tarefa?

### Os quatro quadrantes {/*#the-four-quadrants*/}

|                    | **Urgente**                                    | **Não urgente**                                 |
| ------------------ | ---------------------------------------------- | ----------------------------------------------- |
| **Importante**     | **A: Fazer** (imediatamente, pelo próprio responsável) | **B: Agendar** (planejar e definir um prazo) |
| **Não importante** | **C: Delegar** (ou automatizar)                | **D: Descartar** (arquivar ou excluir)          |

### Princípios {/*#principles*/}

- Tarefas importantes são aquelas diretamente relacionadas a objetivos definidos
- Tarefas urgentes não toleram atraso e, idealmente, são tratadas de imediato
- Tarefas importantes E urgentes: tratadas pelo próprio responsável, o mais rápido possível
- Tarefas urgentes, mas NÃO importantes: delegar ou automatizar, se possível; caso contrário, tratar após as tarefas A
- Tarefas importantes, mas NÃO urgentes: planejar e agendar; têm prioridade menor que as tarefas A
- Tarefas nem importantes nem urgentes: não processar; arquivar ou excluir conforme apropriado

## Comparação: matriz ITIL x matriz de Eisenhower {/*#comparison-itil-matrix-vs-eisenhower-matrix*/}

| Critério                  | Matriz de prioridades ITIL                                                                                                  | Matriz de Eisenhower                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Finalidade**            | Priorização de [incidentes](./incident-management.md)/[problemas](./problem-management.md)/[mudanças](./change-management.md) de TI | Priorização de tarefas pessoais ou de equipe |
| **Dimensões**             | Urgência x impacto (orientada ao negócio)                                                                                   | Urgência x importância (orientada a objetivos) |
| **Escala**                | 5 níveis de prioridade com tempos de [SLA](./sla.md) definidos                                                              | 4 quadrantes com ações                         |
| **Mais indicada para**    | Service Desk de TI, equipes estruturadas                                                                                    | Autogestão, organização geral de tarefas       |
| **Praticidade**           | Objetiva, padronizada, escalável                                                                                            | Mais simples, mais flexível, menos estruturada |
