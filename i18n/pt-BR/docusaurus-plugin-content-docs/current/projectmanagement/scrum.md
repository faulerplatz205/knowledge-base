---
title: "Scrum"
description: "Scrum é um framework ágil para desenvolver produtos complexos por meio de iterações curtas, papéis claros e reflexão regular."
keywords:
    - SCRUM
    - Ágil
    - Sprints
tags:
    - ap2
machine_translated: true
---

# Scrum

## Visão geral {/*#overview*/}

Scrum é um **framework ágil** para desenvolver produtos complexos. É usado com especial frequência no desenvolvimento de software e se baseia em iterações curtas chamadas **sprints**, **papéis** claros e **reflexão** regular.

---

## Os 3 papéis {/*#the-3-roles*/}

Um time Scrum é composto por um Product Owner, um Scrum Master e os Developers. Normalmente tem 10 ou menos membros e não possui subtimes nem hierarquias. Esses papéis também são chamados de **accountabilities**.

### Product Owner (PO) {/*#product-owner-po*/}

O Product Owner é a **única pessoa responsável pelo produto**. Ele representa os interesses das partes interessadas.

**Tarefas**:

- Mantém e prioriza o product backlog
- Define os requisitos (user stories)
- Decide o que será construído
- Testa os resultados

### Scrum Master {/*#scrum-master*/}

O Scrum Master é **responsável pelo processo** em si. Não é um gerente tradicional, mas um **líder servidor** (servant leader).

**Tarefas**:

- Garante que o Scrum seja aplicado corretamente
- Remove obstáculos (impedimentos)
- Orienta o time
- Modera as reuniões

### Developers {/*#developers*/}

Os Developers são as pessoas do time Scrum que **implementam os requisitos**. O time Scrum é **autogerenciado**: decide internamente quem faz o quê, quando e como, sem direcionamento externo.

- Multifuncionais
- Criam o sprint backlog
- Criam pelo menos um incremento utilizável por sprint

---

## Os 5 eventos {/*#the-5-events*/}

### Sprint {/*#sprint*/}

Uma sprint é um **período de tempo fixo** durante o qual o time trabalha em um conjunto de tarefas. É o **coração do Scrum** e fornece um ritmo regular para planejar, construir e revisar o trabalho.

- **Duração:** no máximo 1 mês (comumente 2 a 4 semanas)
- **Objetivo:** incremento pronto e utilizável

**Importante**: durante uma sprint, não devem ser introduzidas mudanças que coloquem em risco o sprint goal.

### Sprint Planning {/*#sprint-planning*/}

No início de cada sprint, o **time Scrum inteiro** se reúne para decidir qual trabalho será assumido. O time seleciona itens do product backlog e cria um plano de como entregá-los.

**Resultado**:

- Sprint Goal
- Sprint Backlog

### Daily Scrum / Daily Standup {/*#daily-scrum--daily-standup*/}

A Daily Scrum é uma **reunião curta de sincronização** em que os Developers alinham o progresso e identificam bloqueios. Também é chamada de "standup" porque os participantes muitas vezes ficam em pé durante a reunião, para incentivar a concisão e garantir o respeito ao **timebox de 15 minutos**.

- **Duração:** 15 minutos
- **Participantes:** Developers

Não há estrutura fixa prescrita. Três perguntas são comuns:

- O que foi feito ontem?
- O que será feito hoje?
- Há algum obstáculo?

### Sprint Review {/*#sprint-review*/}

Ao final de cada sprint, o time **apresenta o incremento pronto** às partes interessadas. O objetivo é coletar **feedback** e decidir em conjunto os próximos passos do produto.

- Apresentação dos resultados
- Feedback das partes interessadas
- Ajuste do product backlog

### Sprint Retrospective (Retro) {/*#sprint-retrospective-retro*/}

A retrospectiva é uma **reunião interna** do time Scrum para refletir sobre a sprint passada. O objetivo é identificar **melhorias concretas** para a próxima sprint, o que a torna o evento central da melhoria contínua.

Perguntas típicas:

- O que deu certo?
- O que deu errado?
- Como é possível melhorar?

---

## Os 3 artefatos {/*#the-3-artifacts*/}

Cada artefato tem um **compromisso** em relação ao qual seu progresso é medido: o product backlog tem o [product goal](#product-goal), o sprint backlog tem o [sprint goal](#sprint-goal) e o incremento tem a [Definition of Done](#definition-of-done-dod).

### Product Backlog {/*#product-backlog*/}

O product backlog é a **fonte única da verdade** para todo o trabalho a ser feito no produto. É um **documento vivo**, que evolui conforme o produto e seu ambiente mudam.

- Uma lista priorizada de todos os requisitos
- Mantido pelo Product Owner
- Entradas na maioria das vezes na forma de user stories (p. ex. "Como usuário, quero X para que Y")

### Sprint Backlog {/*#sprint-backlog*/}

O sprint backlog contém o **subconjunto do product backlog** selecionado para a sprint atual, o [sprint goal](#sprint-goal) e um plano para entregar os itens selecionados.

- Preenchido com as tarefas da sprint atual
- Criado pelos Developers
- Concreto e viável

### Incremento {/*#increment*/}

Um incremento é um **passo concreto** em direção ao [product goal](#product-goal) e se soma a todos os incrementos anteriores. Vários incrementos podem ser criados em uma mesma sprint, e sua soma é apresentada na sprint review. Cada incremento deve estar em um **estado utilizável**, independentemente de o Product Owner decidir lançá-lo.

- Componente de produto pronto e testado
- Deve atender à [Definition of Done (DoD)](#definition-of-done-dod)

---

## Termos importantes {/*#important-terms*/}

### Definition of Done (DoD) {/*#definition-of-done-dod*/}

A Definition of Done é um **acordo compartilhado** dentro do time que define critérios claros para considerar um item do backlog "concluído". Ela garante **qualidade consistente** e impede a entrega de trabalho incompleto.

**Exemplo**:

- Código escrito
- Testes passando
- Revisão realizada
- Documentação atualizada

### Product Goal {/*#product-goal*/}

O product goal descreve um **estado futuro do produto** e serve como objetivo de longo prazo do time Scrum. O time Scrum persegue exatamente um product goal por vez. Ele deve ser cumprido ou abandonado antes que o próximo seja assumido.

### Sprint Goal {/*#sprint-goal*/}

O sprint goal é um **objetivo abrangente** que dá ao time uma direção compartilhada para a sprint. Deve descrever um **resultado significativo** em vez de uma lista de tarefas.

Não "concluir 5 tickets", mas, por exemplo:

- "Usuários podem se registrar e fazer login"
- "Usuários podem dar feedback com um botão dedicado"

### Velocity {/*#velocity*/}

A velocity mede o **número médio de story points** que um time conclui por sprint. É usada como **ferramenta de planejamento** para prever quanto trabalho pode ser assumido de forma realista em sprints futuras. Não é uma ferramenta para classificar o desempenho.

### Story Points {/*#story-points*/}

Story points são uma **unidade relativa de estimativa** usada para expressar o esforço total necessário para implementar um item do backlog. Em vez de estimar em horas, os times **comparam os itens entre si**.

- Frequentemente Fibonacci (1, 2, 3, 5, 8, 13, ...)
- Considera complexidade, risco e esforço

---

## Fluxo típico de uma sprint {/*#typical-sprint-process*/}

1. [Sprint Planning](#sprint-planning)
2. Desenvolvimento + [Daily Standups](#daily-scrum--daily-standup)
3. [Sprint Review](#sprint-review)
4. [Sprint Retro](#sprint-retrospective-retro)
5. Nova sprint

---

## Prós e contras do Scrum {/*#pros-and-cons-of-scrum*/}

### Prós {/*#pros*/}

- Entrega rápida de valor
- Alta flexibilidade
- Feedback antecipado das partes interessadas
- Transparência
- Melhoria contínua

### Contras {/*#cons*/}

Na prática, o Scrum costuma ser implementado de forma incorreta. Isso leva a anti-padrões comuns:

- Papel do Product Owner mal compreendido
- Scrum Master como "mini-chefe"
- Daily como longa reunião de status para gerentes
- Ausência de autogerenciamento real
- "Fazemos Scrum, mas..."

---

## Diferença em relação ao gerenciamento de projetos tradicional (p. ex. modelo em cascata) {/*#difference-from-traditional-project-management-eg-waterfall-model*/}

| Cascata                          | Scrum                                  |
| -------------------------------- | -------------------------------------- |
| Planejamento fixo no início      | Abordagem iterativa                    |
| Mudanças são caras               | Mudanças são previstas                 |
| Uma única entrega                | Atualizações regulares por incrementos |
| Hierarquia forte                 | Autogerenciamento                      |
