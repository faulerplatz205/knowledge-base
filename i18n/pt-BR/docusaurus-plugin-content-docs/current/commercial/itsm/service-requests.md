---
title: Classificação de solicitações de serviço
description: "Os três tipos de solicitações de serviço recebidas em ITSM: eventos, solicitações de serviço e incidentes, e o papel do helpdesk como SPOC"
keywords:
  - "Solicitação de Serviço"
  - "Incidente"
  - "Evento"
  - "SPOC"
  - "Helpdesk"
  - "Suporte de Primeiro Nível"
  - "Sistema de rastreamento de problemas"
  - "Base de conhecimento"
tags:
  - ap2
machine_translated: true
---

# Classificação de solicitações de serviço

## Visão geral {/*#overview*/}

Todas as mensagens recebidas chegam ao ponto central da organização de TI, o **Single Point of Contact (SPOC)**, também chamado de **Helpdesk**. O helpdesk pode ser organizado de forma local, descentralizada ou virtual (vários helpdesks que se apresentam como um só externamente). Esse primeiro nível de assistência também é chamado de **Suporte de Primeiro Nível** (First Level Support).

As mensagens recebidas dividem-se fundamentalmente em três tipos:

## Os três tipos {/*#the-three-types*/}

### [Evento](./event-management.md) {/*#event*/}

Uma **mensagem gerada automaticamente** sobre o estado de um sistema. Essas mensagens recebidas também são chamadas de **Events** e não exigem um relato direto de um usuário. Elas são geradas pelo sistema de monitoramento.

### Solicitação de serviço (Service Request) {/*#service-request*/}

Uma **solicitação formal de um usuário** ou pedido de suporte, também chamada de **Service Request**. Isso inclui perguntas gerais, senhas esquecidas, instruções para o uso de um programa ou pedidos de novos equipamentos.

### [Incidente](./incident-management.md) {/*#incident*/}

Um **relato de uma interrupção não planejada** de um serviço, também denominado **Incident** em ITSM.

## Sistema de rastreamento de problemas (Issue Tracking System) {/*#issue-tracking-system*/}

O **Issue Tracking System** do helpdesk gerencia todas as solicitações recebidas e as atribui automaticamente à equipe de helpdesk disponível. Ele permite uma visão detalhada do histórico de interrupções e solicitações.

Também chamado de: **sistema de helpdesk** ou **sistema de tickets de suporte**.

Fluxo do processo:

```text
Customer inquiry / disruption report
=> Create service ticket
=> Classify and prioritise (HW / SW / NW, urgency, impact)
=> Route to responsible team
=> Find and deliver solution
=> Document and close (incl. commercial aspects via CRM link)
```

Finalidade da categorização e da priorização: garante que a equipe correta trate o ticket e que sua gravidade possa ser avaliada corretamente.

## Base de conhecimento (Knowledge Base) {/*#knowledge-base*/}

Um **sistema de apoio ao processamento de informações baseado em conhecimento** para consulta por autoatendimento. A equipe de helpdesk o utiliza para encontrar rapidamente soluções para problemas conhecidos ([Known Errors](./problem-management.md#known-error-database-kedb)).

| Vantagens                                                                                       | Desvantagens                                                |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Respostas rápidas para problemas repetitivos                                                    | O conhecimento se torna obsoleto => exige muita manutenção  |
| O conhecimento permanece na empresa mesmo quando colaboradores saem => evita lacunas de conhecimento | Nem todo problema tem uma solução pronta               |
| Resolução de problemas com bom custo-benefício                                                  | Menos interação direta com o cliente                        |

## Processo de Request Fulfillment {/*#request-fulfillment-process*/}

O subprocesso **Request Fulfillment** trata as Service Requests (consultas de clientes). Seu objetivo é processar com eficiência mudanças geringfügige (menores) e perguntas de usuários.

- Responsável: Suporte de Primeiro Nível
- Ferramentas utilizadas: Issue Tracking System, Knowledge Base, manual
- Acionado por: um cliente que entra em contato com o suporte com uma consulta de usuário
- Ponto de decisão: classificação da consulta do usuário (Hilfestellung / Änderungswunsch / Passwortanfrage)
