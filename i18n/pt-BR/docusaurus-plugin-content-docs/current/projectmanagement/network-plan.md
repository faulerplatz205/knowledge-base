---
title: "Diagrama de rede"
description: "Um diagrama de rede modela as tarefas de um projeto como um grafo direcionado para identificar dependências, calcular os tempos mais cedo e mais tarde e determinar o caminho crítico."
keywords:
    - Diagrama de rede
    - CPM
    - Caminho crítico
    - Planejamento de projetos
    - Gerenciamento de projetos
tags:
    - ap2
machine_translated: true
---

# Diagrama de rede

## Visão geral {/*#overview*/}

:::info
Existem diferentes métodos de planejamento em rede, como CPM (Critical Path Method), PERT e MPM. Este artigo trata do CPM.
:::

Um diagrama de rede é um grafo direcionado que modela as tarefas como nós, com setas representando as dependências. Ele permite um agendamento preciso e a identificação de gargalos.

## Estrutura do nó {/*#node-structure*/}

Cada nó do diagrama de rede contém os seguintes campos:

```text
┌──────────────────────────┐
│         Task Name        │
├─────────────┬────────────┤
│ EAT         │ EET        │
├─────────────┼────────────┤
│ Total Float │ Free Float │
├─────────────┼────────────┤
│ LAT         │ LET        │
├─────────────┴────────────┤
|          Duration        |
└──────────────────────────┘
```

- **EAT** (Earliest Start Time, início mais cedo): o momento mais cedo em que a tarefa pode começar
- **EET** (Earliest End Time, término mais cedo): o momento mais cedo em que a tarefa pode terminar
- **LAT** (Latest Start Time, início mais tarde): o momento mais tarde em que a tarefa pode começar sem atrasar o projeto
- **LET** (Latest End Time, término mais tarde): o momento mais tarde em que a tarefa pode terminar
- **Folga livre**: `min(EAT of all successors) − EET`; quanto uma tarefa pode ser atrasada sem atrasar nenhuma de suas sucessoras imediatas
- **Folga total**: `LAT − EAT`; o tempo pelo qual uma tarefa pode ser atrasada sem atrasar a data de término do projeto

## Tipos de folga {/*#buffer-types*/}

A **folga livre** descreve a flexibilidade *local*: por quanto tempo uma tarefa pode escorregar antes de atrasar qualquer uma de suas sucessoras imediatas. Ela olha apenas um passo adiante na rede.

A **folga total** descreve a flexibilidade *global*: por quanto tempo uma tarefa pode escorregar antes que a data de término geral do projeto seja afetada, independentemente de efeitos intermediários.

As duas sempre satisfazem `Free Float ≤ Total Float`. Quando `Total Float > Free Float`, um atraso maior que a folga livre desloca uma sucessora mais cedo na cadeia, mas essa sucessora tem folga total própria suficiente para absorver o impacto sem adiar o término do projeto. Tarefas no caminho crítico têm ambos os valores iguais a zero.

## Cálculo do diagrama {/*#calculating-the-plan*/}

**Passagem para frente** – Calcular EAT e EET da esquerda para a direita:

- EET = EAT + duração
- Se uma tarefa tem várias predecessoras => EAT = o maior EET entre todas as predecessoras

**Passagem para trás** – Calcular LAT e LET da direita para a esquerda:

- LAT = LET − duração
- Se uma tarefa tem várias sucessoras => LET = o menor LAT entre todas as sucessoras

## Caminho crítico {/*#critical-path*/}

O caminho crítico é a sequência mais longa de tarefas dependentes, do início ao fim do projeto. Tarefas no caminho crítico têm **folga total igual a zero**, o que significa que qualquer atraso adia diretamente a data de término geral do projeto.

## Vantagens {/*#advantages*/}

- Modela explicitamente as dependências entre tarefas
- Identifica o caminho crítico e os gargalos do cronograma
- Permite o cálculo preciso dos tempos de início e término mais cedo e mais tarde
- Mais adequado para projetos complexos e com muitas dependências

## Desvantagens {/*#disadvantages*/}

- Mais complexo de construir e ler do que um [diagrama de Gantt](./gantt.md)
- Menos intuitivo para partes interessadas não técnicas
- Exige estimativas de duração precisas para ser significativo

## Exemplo {/*#example*/}

**Projeto:** lançamento de um site

| ID | Tarefa                | Duração | Predecessoras |
|----|-----------------------|---------|---------------|
| A  | Análise de requisitos | 2 dias  | —             |
| B  | Design da interface   | 3 dias  | A             |
| C  | Desenvolvimento backend | 5 dias | A            |
| D  | Desenvolvimento frontend | 4 dias | B           |
| E  | Integração            | 2 dias  | C, D          |
| F  | Testes                | 3 dias  | E             |
| G  | Implantação           | 1 dia   | F             |

**Estrutura da rede:**

```text
    ┌──► B ──► D ───┐
A ──┤               ├──► E ──► F ──► G
    └──► C ─────────┘
```

**Valores calculados dos nós:**

```text
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  A: Requirements     │      │  B: UI Design        │      │  C: Backend Dev      │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  EAT: 0  │  EET: 2   │      │  EAT: 2  │  EET: 5   │      │  EAT: 2  │  EET: 7   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │      │  TF:  2  │  FF:  2   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  LAT: 0  │  LET: 2   │      │  LAT: 2  │  LET: 5   │      │  LAT: 4  │  LET: 9   │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│        Dur: 2        │      │        Dur: 3        │      │        Dur: 5        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  D: Frontend Dev     │      │  E: Integration      │      │  F: Testing          │
├──────────┬───────────┤      ├──────────┬───────────┤      ├──────────┬───────────┤
│  EAT: 5  │  EET: 9   │      │  EAT: 9  │  EET: 11  │      │  EAT: 11 │  EET: 14  │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │      │  TF:  0  │  FF:  0   │
├──────────┼───────────┤      ├──────────┼───────────┤      ├──────────┼───────────┤
│  LAT: 5  │  LET: 9   │      │  LAT: 9  │  LET: 11  │      │  LAT: 11 │  LET: 14  │
├──────────┴───────────┤      ├──────────┴───────────┤      ├──────────┴───────────┤
│        Dur: 4        │      │        Dur: 2        │      │        Dur: 3        │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘

┌──────────────────────┐
│  G: Deployment       │
├──────────┬───────────┤
│  EAT: 14 │  EET: 15  │
├──────────┼───────────┤
│  TF:  0  │  FF:  0   │
├──────────┼───────────┤
│  LAT: 14 │  LET: 15  │
├──────────┴───────────┤
│        Dur: 1        │
└──────────────────────┘
```

**Caminho crítico:** A => B => D => E => F => G (15 dias no total)

A tarefa C tem folga total de 2 dias (que aqui também é igual à sua folga livre) e não está no caminho crítico, de modo que o desenvolvimento backend pode começar com até 2 dias de atraso sem atrasar nenhuma sucessora nem a data de término do projeto.
