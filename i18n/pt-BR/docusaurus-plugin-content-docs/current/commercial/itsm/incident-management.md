---
title: Gerenciamento de Incidentes
description: "Gerenciamento de incidentes em ITSM: itens de configuração, categorização, priorização, registro de incidente, incidentes graves e níveis de suporte"
keywords:
  - "Gerenciamento de Incidentes"
  - "Item de Configuração"
  - "CI"
  - "Registro de Incidente"
  - "Incidente Grave"
  - "Suporte de Primeiro Nível"
  - "Solicitação de Serviço"
  - "Sistema de rastreamento de problemas"
sidebar_position: 1
tags:
  - ap2
machine_translated: true
---

# Gerenciamento de Incidentes

## Visão geral {/*#overview*/}

O **Gerenciamento de Incidentes** (Incident Management) é o **primeiro nível do ITSM**, voltado a ajudar os usuários a retomar o trabalho o mais rápido possível após uma interrupção de TI.

## Itens de configuração (CI) {/*#configuration-items-ci*/}

Um **Configuration Item (CI)** é um termo amplo que abrange essencialmente todo o hardware e software. Os CIs são caracterizados por atributos e vinculados a outros CIs.

| Categoria                | Exemplos                                                      |
| ------------------------ | ------------------------------------------------------------- |
| Sistemas de hardware     | PC, notebook, servidor, thin client                           |
| Componentes de hardware  | Placas de vídeo, placas de rede, discos rígidos, processadores |
| Componentes de software  | Sistemas operacionais, software aplicativo                    |
| Componentes de rede      | Roteador, switch, hub, repetidor, patch panel, NAS            |
| Dispositivos periféricos | Impressora, scanner, webcam                                   |
| Dispositivos móveis      | Tablet, smartphone, dispositivos de coleta de dados           |

## Definição de incidente {/*#incident-definition*/}

Um **incidente** é qualquer interrupção não planejada ou redução de qualidade de um serviço de TI. Mesmo um evento que possa vir a prejudicar um serviço de TI no futuro conta como incidente. Isso inclui eventos menores, como a substituição de um cartucho de toner vazio.

**Objetivo principal: restabelecer o serviço afetado o mais rápido possível.**

## Categorização {/*#categorisation*/}

Os incidentes são categorizados no primeiro registro no sistema de rastreamento de problemas (Issue Tracking System):

- **HW** = problema de hardware
- **SW** = problema de software
- **NW** = problema de rede

Finalidade: garante que a equipe correta seja responsável e que a gravidade possa ser avaliada corretamente.

## Priorização {/*#prioritisation*/}

A priorização é determinada por dois fatores:

- **Urgência (Dringlichkeit)**: Quão gravemente a interrupção afeta o objetivo do usuário?
- **Impacto (Auswirkung)**: Quantas pessoas são afetadas pela interrupção?

A combinação de [urgência e impacto](./priorities.md#itil-priority-matrix) determina a ordem em que os tickets recebidos são processados.

## Níveis de suporte {/*#support-levels*/}

| Nível                        | Descrição                                                                                                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Suporte de Primeiro Nível** | Helpdesk / SPOC; trata problemas simples com o auxílio da base de conhecimento e atua como "firewall" para o Suporte de Segundo Nível, assumindo a comunicação direta com o cliente           |
| **Suporte de Segundo Nível**  | Especialistas em análise de causa raiz ([Gerenciamento de Problemas](./problem-management.md)); reavalia a prioridade inicial definida pelo Primeiro Nível                                    |
| **Suporte de Terceiro Nível** | Suporte do fabricante ou especialistas externos quando o Segundo Nível não consegue resolver o problema                                                                                       |

## Registro de incidente {/*#incident-record*/}

O **Incident Record** (registro de incidente) é um documento que contém todas as informações sobre um incidente e documenta seu ciclo de vida, da captura inicial até a resolução. É um documento informativo que não deve ser alterado após o encerramento da instância do processo.

Os 17 componentes padrão:

1. ID / identificador
2. Captura inicial (data/hora)
3. Tipo de notificação
4. Atendente do service desk
5. Dados do solicitante/usuário
6. Canal de comunicação
7. **Descrição do sintoma** (campo mais importante; auxilia no diagnóstico e na busca de soluções)
8. Usuários, locais e/ou áreas de negócio afetados
9. Serviços afetados
10. Priorização
11. Referências a CIs
12. Categoria do incidente
13. Vínculos com outros registros de incidente
14. Vínculos com registros de problema
15. Histórico de status do incidente
16. Histórico de atividades / tarefas
17. Dados de resolução e encerramento

**Os 5 principais campos que devem ser sempre registrados:** priorização, categoria do incidente, ID, usuário/serviço afetado, canal de comunicação.

## Incidente grave (Major Incident) {/*#major-incident*/}

Um **Major Incident** é um evento de alta prioridade e alto impacto que causa uma indisponibilidade crítica de serviço ou uma interrupção massiva, afetando significativamente as operações de negócio. Normalmente recebe a prioridade "Crítica" ou "Alta".

Características:

- Um número significativo de clientes ou grupos importantes de clientes é afetado
- Os custos e as perdas para os clientes e/ou para a organização de serviços são consideráveis
- A reputação do prestador de serviços tende a ser prejudicada
- O trabalho e o tempo necessários para resolver o incidente tendem a ser grandes, e os acordos de [SLA](./sla.md) existentes tendem a ser violados

## Solicitação de serviço x incidente {/*#service-request-vs-incident*/}

|                    | Solicitação de serviço (Service Request)                           | Incidente                                  |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------ |
| **Gatilho**        | O usuário entra em contato ativamente com o suporte com uma dúvida ou um pedido | Interrupção não planejada do serviço |
| **Exemplos**       | Senha esquecida, dúvida sobre software, configuração de novo posto de trabalho | Falha da impressora, ERP inacessível, ransomware |
| **Tratado por**    | Geralmente resolvido por completo no Suporte de Primeiro Nível     | Pode exigir escalonamento para o 2º/3º nível |
| **Processo**       | Request Fulfillment                                                | Gerenciamento de Incidentes                |
