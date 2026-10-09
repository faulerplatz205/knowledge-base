---
title: Gerenciamento de Eventos
description: "Os três tipos de eventos de TI (Information, Warning e Exception) e como são gerenciados em ITSM"
keywords:
  - "Gerenciamento de Eventos"
  - "Statusmeldung"
  - "Information"
  - "Warning"
  - "Exception"
  - "Monitoramento"
  - "ITSM"
tags:
  - ap2
machine_translated: true
---

# Gerenciamento de Eventos

## Visão geral {/*#overview*/}

Os **eventos** não exigem um relato direto de um usuário. Eles são gerados automaticamente pelo sistema de monitoramento e representam mensagens de status sobre o estado de um sistema. O termo "evento" pode ser entendido como um gatilho ou uma notificação recebida, categorizada por relevância.

O suporte de software permite a filtragem e pode ser configurado de modo que as mensagens de exceção sejam encaminhadas aos responsáveis o mais rápido possível.

## Tipos de evento {/*#event-types*/}

### Information {/*#information*/}

Uma **mensagem de status sobre um sistema sem necessidade de ação**.

O sistema está operando normalmente; nenhuma intervenção é necessária.

**Exemplo:** A utilização da rede está entre 45 % e 48 %.

### Warning {/*#warning*/}

Uma **mensagem de status que indica a necessidade de monitoramento mais atento**; pode ser necessária uma ação em breve. O aviso sinaliza que um problema está se aproximando.

**Exemplo:** O array de dados RAID informa uma capacidade restante de 20 %.

### Exception {/*#exception*/}

Uma **mensagem de status que exige ação imediata**. O sistema ou serviço falhou ou ultrapassou um limite crítico. Exceptions normalmente levam a um [Incidente](./incident-management.md).

**Exemplo:** O switch de rede de 48 portas falhou.

## Exemplos de classificação de eventos {/*#event-classification-examples*/}

| Evento                                                                    | Tipo        | Motivo                                                                |
| ------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------- |
| Capacidade do disco rígido em 80 %                                        | Warning     | Ainda não é um problema, mas pode se tornar um em breve               |
| Rede funcionando de forma estável com 40 % de carga                       | Information | Estado normal do sistema                                              |
| Sistema ERP baseado na web inacessível                                    | Exception   | Falha que exige ação imediata                                         |
| Servidor web funcionando de forma estável com 85 % de carga               | Warning     | Carga alta, aproximando-se do nível crítico                           |
| 48 de 50 licenças User CAL em uso                                         | Warning     | Limite de licenças quase atingido; torna-se uma exception se excedido |
| 52 dispositivos conectados, mas apenas 50 licenças Device CAL disponíveis | Exception   | Limite de licenças excedido                                           |
