---
title: "Diagrama de Gantt"
description: "Um diagrama de Gantt é um gráfico de barras horizontais usado para visualizar o cronograma de um projeto, mostrando tarefas, durações e sua linha do tempo."
keywords:
    - Diagrama de Gantt
    - Planejamento de projetos
    - Gerenciamento de projetos
tags:
    - ap2
machine_translated: true
---

# Diagrama de Gantt

## Visão geral {/*#overview*/}

Um diagrama de Gantt é um gráfico de barras horizontais que visualiza o cronograma de um projeto ao longo do tempo. É uma das ferramentas mais usadas para comunicar prazos de projetos a equipes e partes interessadas.

## Estrutura {/*#structure*/}

- **Linhas**: tarefas individuais ou pacotes de trabalho
- **Colunas**: escala de tempo (dias, semanas, meses)
- **Barras**: duração de cada tarefa com base nas datas de início e término
- **Dependências**: setas ou sobreposições podem indicar dependências entre tarefas

## Características {/*#characteristics*/}

- Fácil de entender e criar, mesmo para partes interessadas não técnicas
- Adequado para projetos de curto prazo com um número gerenciável de tarefas
- Foca no planejamento temporal, e não na alocação de recursos
- Normalmente usado em projetos em cascata ou baseados em fases
- Representação estática: reflete um retrato planejado, não o progresso em tempo real

## Vantagens {/*#advantages*/}

- Fácil de ler e de comunicar às partes interessadas
- Oferece uma visão geral clara do cronograma completo do projeto
- Mostra quais tarefas ocorrem em paralelo e quais são sequenciais
- Simples de criar e manter em projetos pequenos a médios

## Desvantagens {/*#disadvantages*/}

- Não identifica o caminho crítico
- Pode ficar difícil de manejar em projetos grandes com muitas tarefas
- Alterações em uma tarefa exigem ajuste manual das tarefas dependentes

## Exemplo {/*#example*/}

Uma pequena equipe tem a tarefa de construir uma landing page para o lançamento de um produto em cinco semanas. O gerente de projeto cria um diagrama de Gantt para planejar o cronograma:

1. **Requisitos** (semana 1): A equipe levanta os requisitos junto ao departamento de marketing, define o conteúdo da página e acorda o escopo
2. **Design** (semana 1 a 2): A pessoa de design começa a criar mockups enquanto os requisitos ainda estão sendo finalizados, com leve sobreposição à primeira fase
3. **Implementação** (semana 2 a 4): Quando a direção do design está clara, os desenvolvedores começam a construir a página. Esta é a fase mais longa
4. **Testes** (semana 4): O controle de qualidade começa a testar as seções concluídas enquanto o desenvolvimento ainda está em andamento
5. **Implantação** (semana 5): Após a aprovação final, a página é implantada em produção antes da data de lançamento

O diagrama de Gantt permite ver com facilidade quais fases se sobrepõem, onde ocorrem as transferências e se o prazo de cinco semanas é realista.

```text
| Task           |  Week 1 | Week 2 | Week 3 | Week 4  | Week 5 |
| -------------- | ------- | ------ | ------ | ------- | ------ |
| Requirements   |███████  |        |        |         |        |
| Design         |     ████|████    |        |         |        |
| Implementation |         |  ██████|████████|█████    |        |
| Testing        |         |        |        |  ███████|        |
| Deployment     |         |        |        |         |████████|
```
