---
title: Gerenciamento de Liberações
description: "Gerenciamento de liberações em ITSM: execução tranquila de mudanças por rollout Big Bang ou em fases, pacotes de release, rollback, máquinas virtuais e o PIR"
keywords:
  - "Gerenciamento de Liberações"
  - "Big Bang"
  - "Rollout em fases"
  - "Pacote de release"
  - "Rollback"
  - "Máquina virtual"
  - "PIR"
  - "Gerenciamento de Mudanças"
  - "ITSM"
sidebar_position: 4
tags:
  - ap2
machine_translated: true
---

# Gerenciamento de Liberações

## Visão geral {/*#overview*/}

O **Gerenciamento de Liberações** (Release Management) é o quarto nível do ITSM e a continuação do Gerenciamento de Mudanças. Enquanto o Gerenciamento de Mudanças aprova e planeja uma mudança, o Gerenciamento de Liberações **a executa**, visando um rollout tranquilo e sem interrupções.

## Relação com o Gerenciamento de Mudanças {/*#relationship-to-change-management*/}

| Gerenciamento de Mudanças                                         | Gerenciamento de Liberações                                          |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| Aprova e planeja mudanças                                         | Executa mudanças                                                     |
| Cria a [RFC](./change-management.md#request-for-change-rfc)       | Implementa a [RFC](./change-management.md#request-for-change-rfc)    |
| Decide o que e quando                                             | Decide como e realiza o rollout                                      |

## Pacote de release {/*#release-package*/}

Antes do rollout, é criado um **pacote de release** que contém todas as mudanças planejadas. Os testes são realizados de preferência em um [CI](./incident-management.md#configuration-items-ci) retirado do ambiente de produção em operação, atualizado e devolvido a um ambiente de teste. Após um período de teste definido e sem problemas, o release pode ser distribuído a todos os sistemas de destino.

Um sistema de distribuição de software ajuda a distribuir os releases com eficiência para muitos [CIs](./incident-management.md#configuration-items-ci).

## Abordagens de rollout {/*#rollout-approaches*/}

### Big Bang {/*#big-bang*/}

Todos os destinatários recebem o release ao mesmo tempo.

**Vantagens:**

- Implementação geral mais rápida
- Todos os sistemas recebem a mesma atualização simultaneamente
- Resolução de problemas mais eficiente (sem diferenças de versão)

**Desvantagens:**

- Alto risco em caso de erros (todos os sistemas afetados de uma só vez)
- Alta carga sobre a infraestrutura durante o rollout

### Em fases (Phased) {/*#phased*/}

O release é distribuído primeiro a um **subconjunto** de destinatários e, depois, progressivamente a mais destinatários.

**Vantagens:**

- Menor risco (apenas parte dos sistemas é afetada)
- Os erros são detectados mais cedo, sem grandes interrupções

**Desvantagens:**

- A implementação leva mais tempo
- Diferentes versões de software em execução simultânea durante a transição

## Rollback {/*#rollback*/}

Se um release falhar inesperadamente no ambiente de produção, deve estar sempre disponível um **rollback** para o estado anterior. Após a conclusão do rollout, o usuário é informado sobre a atualização por meio das instâncias de processo.

## Máquinas virtuais no Gerenciamento de Liberações {/*#virtual-machines-in-release-management*/}

**Máquina virtual (VM):** um encapsulamento baseado em software de um sistema de computador que simula um PC real em um computador hospedeiro.

**Vantagens:**

- Cópias podem ser criadas, iniciadas e modificadas de forma simples e sem riscos
- Sistemas físicos podem ser convertidos em VMs (P2V = Physical to Virtual)

**Benefício para o Gerenciamento de Liberações:** novas versões, atualizações e aplicações podem ser testadas com segurança em um ambiente de VMs. Versões mais antigas podem continuar em execução em paralelo (eficiência de recursos).

## Visão geral dos processos ITSM {/*#itsm-process-overview*/}

Os quatro níveis do ITSM funcionam juntos como uma cadeia:

| Processo                                                       | Papel                                                              |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| [**Gerenciamento de Incidentes**](./incident-management.md)    | Registra interrupções, filtra problemas                            |
| [**Gerenciamento de Problemas**](./problem-management.md)      | Identifica causas raiz, fornece uma solução de contorno quando possível |
| [**Gerenciamento de Mudanças**](./change-management.md)        | Aprova e planeja mudanças sensatas                                 |
| [**Gerenciamento de Liberações**](./release-management.md)     | Executa mudanças com segurança                                     |

**Motivo dessa separação:** a orquestração dos processos visa a sustentabilidade e traz estrutura a um fluxo de trabalho complexo.

## Processos ITSM e [fases IMAC/R/D](./service-types.md#imacrd-lifecycle) {/*#itsm-processes-and-imacrd-phases*/}

| Atividade IMAC/R/D            | Processos ITSM relevantes                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| Wartung (manutenção)          | Gerenciamento de Mudanças, Gerenciamento de Liberações                                    |
| Inspektion (inspeção)         | Gerenciamento de Problemas, Gerenciamento de Mudanças, Gerenciamento de Liberações        |
| Instandsetzung (reparo)       | Gerenciamento de Incidentes, Gerenciamento de Problemas, Gerenciamento de Mudanças, Gerenciamento de Liberações |
| Verbesserung (melhoria)       | Gerenciamento de Mudanças, Gerenciamento de Liberações                                    |
