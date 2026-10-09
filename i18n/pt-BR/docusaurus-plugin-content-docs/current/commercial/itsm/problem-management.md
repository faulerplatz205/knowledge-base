---
title: Gerenciamento de Problemas
description: "Gerenciamento de problemas em ITSM: a distinção entre incidentes e problemas, controle de problemas, controle de erros, gerenciamento proativo de problemas e principais KPIs"
keywords:
  - "Gerenciamento de Problemas"
  - "Erro Conhecido"
  - "Base de Erros Conhecidos"
  - "Solução de contorno"
  - "Controle de Problemas"
  - "Controle de Erros"
  - "Gerenciamento Proativo de Problemas"
  - "Análise de causa raiz"
sidebar_position: 2
tags:
  - ap2
machine_translated: true
---

# Gerenciamento de Problemas

## Visão geral {/*#overview*/}

O Gerenciamento de Problemas (Problem Management) é o **segundo nível do Gerenciamento de Incidentes**. Enquanto o Gerenciamento de Incidentes se concentra em restabelecer o serviço o mais rápido possível, o Gerenciamento de Problemas identifica e elimina a causa raiz subjacente para evitar incidentes futuros.

## Incidente x problema x erro conhecido {/*#incident-vs-problem-vs-known-error*/}

| Termo                | Definição                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Incidente**        | Interrupção não planejada do serviço; a causa pode ser desconhecida; o serviço é restabelecido com prioridade |
| **Problema**         | Um ou mais incidentes com **causa raiz desconhecida**; investigado por especialistas                          |
| **Erro conhecido** (Known Error) | Um problema cuja causa raiz é conhecida e para o qual existe uma solução de contorno ou correção  |

Se nenhuma solução puder ser encontrada no Suporte de Primeiro Nível, o ticket é **escalonado**: o incidente passa a ser um problema tratado pelo Suporte de Segundo Nível.

## As três atividades do Gerenciamento de Problemas {/*#the-three-activities-of-problem-management*/}

### 1. Controle de problemas (Problem Control) {/*#1-problem-control*/}

Todos os problemas são analisados e documentados de forma sistemática. O objetivo é transformar causas desconhecidas em **Known Errors**.

Etapas:

1. Registrar o problema e compará-lo com a Known Error Database
2. Se já existir uma solução de contorno/solução => Known Error, atualizar o contador de ocorrências
3. Classificar o problema (categoria, subcategoria, prioridade, impacto no negócio)
4. Analisar a causa raiz (ver [métodos de análise](./analysis-methods.md))
5. Registrar o resultado como um novo Known Error na KEDB

### 2. Controle de erros (Error Control) {/*#2-error-control*/}

Quando existe um Known Error, o Error Control gerencia o caminho da solução de contorno até a correção definitiva.

- A **solução de contorno** é fornecida imediatamente para restabelecer o serviço
- A correção definitiva é iniciada por meio de uma **[RFC](./change-management.md#request-for-change-rfc)**
- Após a implementação da mudança, o Gerenciamento de Problemas recebe a confirmação por meio de uma **[Post Implementation Review (PIR)](./change-management.md#closing-a-change-pir)**
- O Suporte de Primeiro Nível é informado para poder atualizar o cliente

### 3. Gerenciamento proativo de problemas {/*#3-proactive-problem-management*/}

Prevenção de incidentes antes que ocorram:

- Analisar Known Errors recorrentes com frequência (contador de ocorrências alto = candidato ao PM proativo)
- Avaliar avisos de fabricantes sobre problemas futuros de software/hardware
- Monitorar avisos e exceptions automatizados

## Solução de contorno (workaround) {/*#workaround*/}

Uma **solução de contorno** (workaround) é um desvio, uma alternativa ou uma solução provisória ("contornar" o problema) para restabelecer o serviço rapidamente de forma provisória enquanto a causa raiz é tratada.

**Importante:** as soluções de contorno devem ser claramente marcadas como medidas temporárias no sistema, para que a correção provisória não se torne um estado permanente.

**Exemplos:**

| Interrupção                                  | Solução de contorno                                    |
| -------------------------------------------- | ------------------------------------------------------ |
| Webcam integrada com defeito                 | Conectar câmera USB                                    |
| Dispositivo móvel de coleta de dados com defeito | Usar um dispositivo de empréstimo                  |
| Porta de rede cabeada com defeito            | Usar adaptador WLAN USB ou adaptador LAN               |
| Porta de monitor DVI com defeito             | Usar DisplayPort ou HDMI, se disponível                |
| Impressora a laser não inicia                | Desconectar da energia e reiniciar                     |
| Navegador exibe página em branco             | Limpar o cache do navegador ou usar outro navegador    |

## Known Error Database (KEDB) {/*#known-error-database-kedb*/}

A KEDB armazena todos os problemas conhecidos com sua solução de contorno ou solução. O Suporte de Primeiro Nível a utiliza para oferecer ajuda rápida sem escalonar para o Segundo Nível.

Cada entrada possui um **contador de ocorrências** (Vorfallszähler) que registra com que frequência o problema se repete. Um contador alto indica um candidato ao Gerenciamento Proativo de Problemas.

## Principais KPIs {/*#key-kpis*/}

| KPI                                              | Significado                                                                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Número de novos problemas**                    | Total de problemas registrados em um período; o PM proativo busca minimizá-lo resolvendo erros antes que se transformem em incidentes                                     |
| **Número de incidentes por problema conhecido**  | Número médio de incidentes associados ao mesmo problema; mostra a abrangência do impacto e identifica candidatos ao PM proativo                                          |
| **Esforço de resolução de problemas**            | Esforço médio de trabalho para resolver um problema, discriminado por categoria; mostra quais categorias exigem mais esforço                                             |

## Separação entre localização e resolução de problemas {/*#separation-of-problem-localisation-and-problem-resolution*/}

O Gerenciamento de Problemas localiza a causa raiz; o [Gerenciamento de Mudanças](./change-management.md) a resolve. Essa separação:

- Permite concentrar-se em uma tarefa por vez
- Possibilita o restabelecimento do serviço (solução de contorno) antes de concluída a investigação da causa raiz
- Não envolve necessariamente equipes diferentes, mas separa as etapas do processo
