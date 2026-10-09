---
title: Service Level Agreement (SLA)
description: "Estrutura e conteúdo dos Service Level Agreements (SLAs), Service Level Management, os papéis de Service Level Manager e Service Owner e os OLAs"
keywords:
  - "SLA"
  - "Service Level Agreement"
  - "Service Level Management"
  - "OLA"
  - "Operational Level Agreement"
  - "Service Level Manager"
  - "KPI"
  - "Tempo de resposta"
tags:
  - ap2
machine_translated: true
---

# Service Level Agreement (SLA)

## Visão geral {/*#overview*/}

Um **SLA (Service Level Agreement)** é um contrato entre um prestador de serviços de TI e um cliente que define o escopo, a qualidade e as condições dos serviços de TI prestados.

## Estrutura típica de um SLA {/*#typical-sla-structure*/}

### 1. Descrição / escopo {/*#1-description--scope*/}

Define quais problemas de TI são abrangidos, como são tratados e quais canais de suporte são utilizados (telefone, e-mail). Também especifica o hardware e os sistemas abrangidos.

### 2. [Prioridades](./priorities.md) {/*#2-priorities*/}

Três ou mais níveis de prioridade com diferentes tempos de resposta. Exemplo:

| Prioridade   | Tempo de resposta                            |
| ------------ | -------------------------------------------- |
| Prioridade 1 | 1 hora útil, taxa adicional de urgência      |
| Prioridade 2 | 5 horas úteis, prioridade padrão             |
| Prioridade 3 | 1 dia útil                                   |

**Tempo de resposta:** o tempo entre o relato da interrupção ao [helpdesk](./service-requests.md) e o início do trabalho de resolução do problema no nível de suporte responsável.

### 3. Horários de atendimento {/*#3-service-times*/}

| Dia                        | Horário                |
| -------------------------- | ---------------------- |
| Seg–Sex                    | 07:00–20:00            |
| Sábado                     | 09:00–18:00            |
| Domingos e feriados        | Sem atendimento        |
| Horário estendido          | Disponível sob consulta |

### 4. Idiomas {/*#4-languages*/}

Idiomas suportados no suporte (p. ex., alemão, inglês).

### 5. Métricas de qualidade: atendimento de chamadas {/*#5-quality-metrics-call-acceptance*/}

| Métrica                          | Meta                                              |
| -------------------------------- | ------------------------------------------------- |
| Chamadas atendidas               | 95 % de todas as chamadas recebidas, < 5 % perdidas |
| Atendidas em até 20 segundos     | 75 %                                              |
| Atendidas em até 40 segundos     | 90 %                                              |
| Tratadas via caixa postal de voz | Máx. 10 %                                         |

### 6. Métricas de qualidade: resolução de problemas {/*#6-quality-metrics-problem-resolution*/}

| Métrica                                         | Meta                              |
| ----------------------------------------------- | --------------------------------- |
| Tempo médio de tratamento de chamadas           | Máx. 30 minutos                   |
| Relatório intermediário se não respondido em    | 4 horas                           |
| Tempo médio de tratamento de interrupções       | Máx. 2 horas                      |
| Tempo máximo de tratamento                      | 3 dias                            |
| Taxa mínima de resolução                        | 70 % em até 2 dias úteis          |

### 7. Métrica de qualidade: satisfação do cliente {/*#7-quality-metric-customer-satisfaction*/}

Medida por meio de pesquisa online e trailer calls (retorno de chamada e avaliação com 10 % dos autores das chamadas).

### 8. Relatórios {/*#8-reporting*/}

Revisão mensal; avaliação estatística trimestral.

### 9. Validade e duração {/*#9-validity-and-duration*/}

Indica a vigência do SLA e quando ele será renegociado (p. ex., "válido até 1.º de agosto de 20xx").

### 10. Signatários {/*#10-signatories*/}

Prestador e cliente assinam o acordo.

## Service Level Management (SLM) {/*#service-level-management-slm*/}

O **SLM** garante que SLAs sejam firmados com os clientes e que os serviços sejam projetados para atender aos níveis de serviço acordados.

**Tarefas:**

- Levantar os requisitos de serviço
- Verificar se os níveis de serviço acordados estão sendo cumpridos
- Fornecer informações em Service Level Reports

## Papéis {/*#roles*/}

### Service Level Manager {/*#service-level-manager*/}

O responsável pelo processo de Service Level Management.

Responsabilidades:

- Negocia os SLAs
- Garante seu cumprimento
- Garante que todos os processos de ITSM, OLAs e contratos com terceiros apoiem as metas de nível de serviço acordadas
- Monitora os níveis de serviço e fornece relatórios

### Service Owner (Serviceverantwortlicher) {/*#service-owner-serviceverantwortlicher*/}

Responsável por entregar um serviço de infraestrutura dentro dos SLAs acordados.

Responsabilidades:

- Atua como parceiro de negociação do Service Level Manager na definição dos OLAs
- Geralmente é um gestor que lidera uma equipe de especialistas técnicos ou uma área de suporte interna

## OLA (Operational Level Agreement) {/*#ola-operational-level-agreement*/}

Um **OLA** é um acordo interno entre equipes ou departamentos de TI sobre a prestação de serviços em nível operacional. Os OLAs apoiam o cumprimento dos SLAs externos.
