---
title: "Diagrama de Atividades"
description: "Diagramas de atividades da UML: notação, ações, fluxo de controle, decisão e junção, laços, fork e join, raias e como os elementos se mapeiam para estruturas de controle de programas."
keywords:
    - UML
    - Diagrama de Atividades
    - Fluxo de Controle
    - Nó de Decisão
    - Nó de Junção
    - Fork e Join
    - Raia
    - Partição
    - Modelagem de Processos
    - Diagrama Comportamental
tags:
    - ap2
machine_translated: true
---

# Diagrama de Atividades

## Visão geral {/*#overview*/}

Um diagrama de atividades é um diagrama **comportamental** da UML. Ele descreve um processo como uma sequência de ações conectadas por fluxos de controle, incluindo ramificações, laços e passos executados em paralelo.

Aplicações típicas:

- Modelagem de um processo de negócio que atravessa vários departamentos ou sistemas
- Descrição de um algoritmo antes de sua implementação, independente de qualquer linguagem
- Detalhamento dos passos dentro de um único caso de uso
- Documentação de um fluxo de trabalho existente para revisão com partes interessadas não técnicas

---

## Notação {/*#notation*/}

| Elemento        | Notação                                      | Significado                                                        |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| Nó inicial      | Círculo preenchido `●`                       | Início da atividade, exatamente um por diagrama                    |
| Ação            | Retângulo arredondado                        | Um passo de trabalho indivisível, nomeado *verbo + objeto*         |
| Atividade (chamada) | Retângulo arredondado com símbolo de ancinho | Um passo detalhado em um diagrama próprio                         |
| Fluxo de controle | Seta contínua                              | Ordem de execução, leva de uma ação à seguinte                     |
| Guarda          | `[condition]` escrito sobre um fluxo               | Condição sob a qual esse fluxo pode ser seguido                    |
| Nó de decisão   | Losango, uma entrada e várias saídas         | Ramificação, os fluxos de saída têm guardas mutuamente exclusivas  |
| Nó de junção (merge) | Losango, várias entradas e uma saída    | Reúne caminhos alternativos, **não** espera                        |
| Fork            | Barra grossa, uma entrada e várias saídas    | Divide o fluxo em fluxos concorrentes                              |
| Join            | Barra grossa, várias entradas e uma saída    | Espera até que todos os fluxos de entrada tenham chegado           |
| Final de atividade | Círculo preenchido dentro de um anel `◉` | Encerra toda a atividade, incluindo caminhos ainda em execução  |
| Final de fluxo  | Círculo com uma cruz `⊗`                     | Encerra apenas o caminho que chega até ali, a atividade continua   |
| Nó de objeto    | Retângulo simples sobre um fluxo             | Dados repassados de uma ação à seguinte                            |
| Partição        | Raia rotulada                                | O ator, papel ou sistema responsável pelas ações dessa raia        |
| Nota            | Retângulo com canto dobrado sobre uma linha tracejada | Comentário sem semântica                                  |

Regras de nomenclatura que mantêm um diagrama legível:

- Ações são nomeadas *verbo + objeto*: `Validate order`, não `Order` e não `Validation`
- Guardas são escritas entre colchetes diretamente sobre o fluxo, nunca dentro da ação
- O caso restante de uma ramificação é rotulado `[else]` em vez de uma condição negada

---

## Blocos de construção {/*#building-blocks*/}

### Sequência {/*#sequence*/}

Ações executadas uma após a outra. O fluxo sai do nó inicial, passa por todas as ações e termina no nó de final de atividade.

```text
          ●
          │
          ▼
 ╭─────────────────╮
 │  Receive order  │
 ╰─────────────────╯
          │
          ▼
 ╭─────────────────╮
 │   Check stock   │
 ╰─────────────────╯
          │
          ▼
          ◉
```

### Decisão e junção {/*#decision-and-merge*/}

Um nó de decisão divide o fluxo em alternativas. Exatamente um fluxo de saída é seguido, de modo que as guardas devem ser mutuamente exclusivas e cobrir todos os casos possíveis. Um nó de junção reúne as alternativas novamente, repassa todo caminho que chega e nunca espera.

```text
                    │
                    ▼
              ╱───────────╲
             ╱   amount    ╲
             ╲   > 100 ?   ╱
              ╲───────────╱
               │         │
        [yes]  │         │ [no]
        ┌──────┘         └──────┐
        │                       │
        ▼                       ▼
╭───────────────╮       ╭───────────────╮
│Apply discount │       │  Keep price   │
╰───────────────╯       ╰───────────────╯
        │                       │
        └──────┐         ┌──────┘
               ▼         ▼
              ╱───────────╲
             ╱             ╲
             ╲             ╱
              ╲───────────╱
                    │
                    ▼
```

Uma ramificação com mais de dois resultados usa um único nó de decisão com vários fluxos com guarda, o que corresponde a `if / else if / else` ou a uma instrução `switch`. O nó de junção continua sendo um único losango, independentemente de quantos caminhos chegam a ele.

### Laço {/*#loop*/}

Um laço é um fluxo de controle que volta a um ponto anterior do diagrama. No diagrama abaixo, a decisão fica *depois* da ação, de modo que o corpo é executado pelo menos uma vez, o que corresponde a um laço `do … while`.

```text
              ●
              │
              ▼
     ╭─────────────────╮
┌───►│   Read record   │
│    ╰─────────────────╯
│             │
│             ▼
│       ╱───────────╲
│      ╱    more     ╲
│      ╲  records ?  ╱
│       ╲───────────╱
│        │         │
│  [yes] │         │ [no]
└────────┘         ▼
                   ◉
```

Posicionar a decisão *antes* da ação, com a aresta de retorno entrando acima dela, transforma a mesma estrutura em um laço `while` com teste no início, cujo corpo pode ser executado zero vezes.

### Fork e join {/*#fork-and-join*/}

Um fork divide um fluxo em vários fluxos executados de forma concorrente. Um join espera até que todos os fluxos de entrada tenham chegado e só então continua como um único fluxo. Sem um join, a atividade poderia terminar enquanto passos paralelos ainda estão em execução.

```text
                  │
                  ▼
        ━━━━━━━━━━━━━━━━━━━━━
        │                   │
        ▼                   ▼
╭─────────────────╮ ╭─────────────────╮
│  Reserve stock  │ │   Charge card   │
╰─────────────────╯ ╰─────────────────╯
        │                   │
        ▼                   ▼
        ━━━━━━━━━━━━━━━━━━━━━
                  │
                  ▼
```

Concorrente na UML significa *sem ordem prescrita*, não necessariamente *ao mesmo tempo em processadores separados*. Se os dois ramos são executados em duas threads ou simplesmente em uma sequência arbitrária é uma decisão de implementação.

---

## Partições (raias) {/*#partitions-swimlanes*/}

Uma partição agrupa ações pelo ator, papel, departamento ou sistema que as executa. As raias podem ser desenhadas na vertical ou na horizontal, e o fluxo simplesmente cruza os limites das raias.

Regras que vale ter em mente:

- Uma ação pertence a exatamente uma raia, a raia é a resposta para *quem faz isto*
- Nós de decisão e de junção pertencem à raia do ator que decide
- Um fork pode abranger várias raias, é justamente assim que o trabalho paralelo de diferentes atores é mostrado
- O número de cruzamentos de raias é uma medida aproximada do esforço de coordenação no processo

---

## Mapeamento para código {/*#mapping-to-code*/}

| Diagrama de atividades                      | Construção de programa                           |
| ------------------------------------------- | ------------------------------------------------ |
| Ações em sequência                          | Instruções uma após a outra                      |
| Decisão com duas guardas mais junção        | `if / else`                                      |
| Decisão com várias guardas mais `[else]`    | `if / else if / else` ou `switch`                |
| Aresta de retorno com a decisão após o corpo | `do … while`                                     |
| Aresta de retorno com a decisão antes do corpo | `while` ou `for`                              |
| Fork e join                                 | Threads, tasks, `Promise.all`, parallel stream   |
| Atividade chamada                           | Chamada de método ou função                      |
| Nó de objeto entre duas ações               | Valor de retorno repassado como parâmetro        |
| Final de atividade                          | Fim do método, `return`                      |
| Final de fluxo                              | Um caminho termina enquanto o restante continua em execução |

---

## Exemplo: processamento de um pedido online {/*#example-processing-an-online-order*/}

Três partições estão envolvidas: o cliente, o sistema da loja e o depósito. O pedido é validado pela loja, um pedido inválido é rejeitado, e um pedido válido é separado e enviado pelo depósito.

```text
      Customer       │       Shop System        │      Warehouse
─────────────────────┼──────────────────────────┼─────────────────────
          ●          │                          │
          │          │                          │
          ▼          │                          │
 ╭─────────────────╮ │                          │
 │   Place order   │ │                          │
 ╰─────────────────╯ │                          │
          │          │                          │
          └──────────┼────────────┐             │
                     │            │             │
                     │            ▼             │
                     │   ╭─────────────────╮    │
                     │   │ Validate order  │    │
                     │   ╰─────────────────╯    │
                     │            │             │
                     │            ▼             │
                     │      ╱───────────╲       │
                     │     ╱    order    ╲      │
                     │     ╲   valid ?   ╱      │
                     │      ╲───────────╱       │
                     │       │         │        │
                     │ [no]  │         │ [yes]  │
          ┌──────────┼───────┘         └────────┼──────────┐
          │          │                          │          │
          ▼          │                          │          ▼
 ╭─────────────────╮ │                          │ ╭─────────────────╮
 │ Read rejection  │ │                          │ │   Pick items    │
 ╰─────────────────╯ │                          │ ╰─────────────────╯
          │          │                          │          │
          ▼          │                          │          ▼
          ◉          │                          │ ╭─────────────────╮
                     │                          │ │   Ship parcel   │
                     │                          │ ╰─────────────────╯
                     │                          │          │
          ┌──────────┼──────────────────────────┼──────────┘
          │          │                          │
          ▼          │                          │
 ╭─────────────────╮ │                          │
 │ Receive parcel  │ │                          │
 ╰─────────────────╯ │                          │
          │          │                          │
          ▼          │                          │
          ◉          │                          │
```

O que este exemplo mostra:

- O cliente inicia o processo, de modo que o nó inicial fica na raia do cliente
- `Validate order` é uma única ação aqui. Se a validação for complexa, ela se torna uma atividade chamada com diagrama próprio
- As guardas `[no]` e `[yes]` são mutuamente exclusivas e cobrem todos os casos, de modo que o fluxo nunca pode ficar preso na decisão
- Ambos os ramos terminam em um nó de final de atividade, o processo tem dois resultados possíveis
- Nada é dito sobre *como* o pedido é validado ou *quanto tempo* o envio leva, um diagrama de atividades modela fluxo de controle, não estruturas de dados nem temporização

Uma extensão realista faria um fork após `[yes]`, de modo que `Charge card` na raia da loja e `Pick items` na raia do depósito sejam executados de forma concorrente, reunidos novamente por um join antes de `Ship parcel`.

---

## Erros comuns {/*#common-mistakes*/}

1. **Guardas ausentes ou sobrepostas:** cada fluxo de saída de uma decisão precisa de uma guarda, e as guardas devem ser mutuamente exclusivas e completas, caso contrário o fluxo não tem caminho algum ou tem vários
2. **Decisão usada em vez de fork:** um losango significa *um destes caminhos*, uma barra significa *todos estes caminhos*
3. **Fork sem join:** a atividade pode chegar a um nó final enquanto fluxos paralelos ainda estão em execução, e o nó final então os descarta
4. **Join sem fork:** um join espera por um fluxo que nunca chega e o processo entra em deadlock
5. **Substantivos como nomes de ações:** `Invoice` não diz nada, `Create invoice` diz
6. **Condições dentro da ação:** a condição pertence ao fluxo de saída, a ação é o que é feito, não o que é verificado
7. **Vários nós iniciais:** uma atividade tem exatamente um ponto de partida. Inícios concorrentes são modelados com um fork
8. **Raias como decoração:** se os atores são desenhados, mas o fluxo nunca cruza o limite de uma raia, o particionamento não acrescenta nada
9. **Mistura de fluxo de controle e fluxo de dados:** dados passados entre ações pertencem a nós de objeto, não aos rótulos dos fluxos de controle

---

## Ferramentas {/*#tools*/}

- draw.io / diagrams.net (gratuito, baseado em navegador, biblioteca de formas UML incluída)
- PlantUML (baseado em texto, o diagrama é gerado a partir do código-fonte e pode ser versionado)
- Mermaid (baseado em texto, renderiza diretamente em Markdown em muitas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciais, com planos gratuitos)

## Veja também {/*#see-also*/}

- [Diagrama de Classes](./class-diagram.md): a contraparte estrutural, que modela classes e seus relacionamentos
- [Modelo ER](../databases/er-model.md): modelagem dos dados sobre os quais as ações de um diagrama de atividades operam
