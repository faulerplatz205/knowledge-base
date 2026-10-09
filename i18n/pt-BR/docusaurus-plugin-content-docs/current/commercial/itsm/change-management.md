---
title: Gerenciamento de Mudanças
description: "Gerenciamento de mudanças em ITSM: RFC, tipos de mudança (Standard, Normal, Emergency), órgãos de aprovação (CAB, CIO, EC/ECAB), FSC, CMDB e PIR"
keywords:
  - "Gerenciamento de Mudanças"
  - "RFC"
  - "Request for Change"
  - "CAB"
  - "Change Advisory Board"
  - "Mudança Standard"
  - "Mudança Normal"
  - "Mudança de Emergência"
  - "CMDB"
  - "FSC"
  - "PIR"
sidebar_position: 3
tags:
  - ap2
machine_translated: true
---

# Gerenciamento de Mudanças

## Visão geral {/*#overview*/}

O **Gerenciamento de Mudanças** (Change Management) é o terceiro nível do ITSM. Ele trata da aprovação e do planejamento de mudanças no sistema de TI.

**Objetivo:** garantir que as mudanças não sejam feitas às pressas e sem uma visão completa. Especialistas de diferentes áreas avaliam os riscos para evitar erros subsequentes. Somente as Emergency Changes podem contornar esse processo, pois a maior prioridade nesse caso é restabelecer o sistema o mais rápido possível.

## Request for Change (RFC) {/*#request-for-change-rfc*/}

Antes de uma mudança ser executada, é criada uma **Request for Change (RFC)**, normalmente pelo [Gerenciamento de Problemas](./problem-management.md). A RFC é uma solicitação formal para realizar uma mudança. Ela contém:

- Descrição da mudança
- Motivo da mudança
- Cronograma
- Prioridade
- Efeitos colaterais esperados
- Custos estimados

A RFC descreve **o que** precisa ser feito, mas não **como**, pois o como é elaborado no processo de Gerenciamento de Mudanças.

## Priorização de RFCs {/*#rfc-prioritisation*/}

As RFCs recebidas são priorizadas por **urgência** e **impacto**:

### Níveis de urgência {/*#urgency-levels*/}

| Nível                  | Descrição                   |
| ---------------------- | --------------------------- |
| **Priority Low**       | Desejável, mas não urgente  |
| **Priority Middle**    | Necessária, mas não urgente |
| **Priority High**      | Ação imediata necessária    |
| **Priority Immediate** | Ação imediata necessária    |

### Níveis de impacto {/*#impact-levels*/}

| Nível             | Descrição                                               | Exemplo                           |
| ----------------- | ------------------------------------------------------- | --------------------------------- |
| **Effect Low**    | Efeito mínimo sobre os serviços de TI, pouco esforço    | Troca de um PC                    |
| **Effect Middle** | Efeito moderado, esforço maior                          | Atualização do SO de todos os PCs |
| **Effect High**   | Efeito alto sobre os serviços de TI, esforço muito alto | Falha completa de servidor        |

## Tipos de mudança {/*#change-types*/}

| Tipo                                  | Características                                                                                                           | Aprovação                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Standard Change**                   | Mudanças de rotina pré-aprovadas de um catálogo; baixo risco; autorizadas automaticamente                                 | Somente o Change Manager |
| **Normal Change**                     | Risco médio, complexidade média, urgência moderada; requer avaliação por especialistas                                    | CAB + CIO                |
| **Emergency Change (Notfall Change)** | Alta urgência, solução de curto prazo necessária; o processo de aprovação estruturado é contornado para ganhar velocidade | EC / ECAB                |

## Órgãos de aprovação {/*#approval-bodies*/}

| Órgão                               | Descrição                                                                                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Change Manager (CM)**             | Decide sozinho sobre mudanças de baixo alcance (Standard Change); responsável pela gestão do tempo e pelo monitoramento                                                |
| **Change Advisory Board (CAB)**     | Comitê de especialistas de várias áreas de negócio; decide sobre mudanças de alcance médio (Normal Change)                                                             |
| **Chief Information Officer (CIO)** | Pessoa em nível de diretoria/gestão que representa os interesses de TI; envolvida em decisões de grande alcance para o negócio (p. ex., treinamento de funcionários)   |
| **Emergency Committee (EC / ECAB)** | Equipe pequena de especialistas com amplos poderes para decisões urgentes; trata das Emergency Changes                                                                 |

## Planejamento de mudanças {/*#change-planning*/}

### Forward Schedule of Change (FSC) {/*#forward-schedule-of-change-fsc*/}

Um calendário no qual todas as mudanças planejadas de longo prazo são documentadas. O planejamento deve sempre visar minimizar o tempo de inatividade.

### Configuration Management Database (CMDB) {/*#configuration-management-database-cmdb*/}

Um banco de dados central no qual todos os CIs são armazenados com suas especificações e números de licença. Todas as alterações nos CIs são documentadas aqui de forma centralizada.

O Change Manager (CM) é responsável pela implementação controlada no tempo e pelo monitoramento das mudanças.

## Aprovação e execução de mudanças {/*#approving-and-executing-changes*/}

A separação entre aprovar/autorizar e planejar/executar uma mudança é intencional no ITSM. Isso garante:

- Decisões sustentáveis por especialistas que consideram o sistema como um todo
- Prevenção da correção reativa de erros sem considerar o contexto mais amplo
- Responsabilidade documentada

## Encerramento de uma mudança (PIR) {/*#closing-a-change-pir*/}

Após a implementação de uma mudança, o Gerenciamento de Mudanças documenta todas as medidas e a causa raiz da falha no CMDB e na KEDB para consulta futura.

A **Post Implementation Review (PIR)** documenta todos os pontos-chave da mudança:

- Resultados dos testes
- Detalhes da implementação
- Alterações em relação ao estado anterior do sistema
- Custos e esforço
- Registros de data e hora

**Objetivo da PIR:** impulsionar a melhoria contínua por meio da revisão e avaliação das mudanças concluídas.

## Resumo de tipos de mudança e aprovação {/*#change-types-and-approval-summary*/}

| Tipo de mudança  | Órgão de aprovação | Característica principal                           |
| ---------------- | ------------------ | -------------------------------------------------- |
| Standard Change  | Change Manager     | Baseada em catálogo, pré-aprovada, baixo risco     |
| Normal Change    | CAB + CIO          | Risco médio, CAB envolvido                         |
| Emergency Change | EC / ECAB          | Velocidade máxima, processo estruturado contornado |
