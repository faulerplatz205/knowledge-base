---
title: "Diagrama de Máquina de Estados"
description: "Diagramas de máquina de estados UML: estados, transições com gatilho, guarda e efeito, atividades entry, do e exit, estados compostos, regiões, estados de histórico e a tabela de transição de estados."
keywords:
    - UML
    - Diagrama de Máquina de Estados
    - Diagrama de Estados
    - Transição
    - Guarda
    - Ação de Entrada
    - Estado Composto
    - Região
    - Estado de Histórico
    - Tabela de Transição de Estados
    - Diagrama Comportamental
tags:
    - ap2
machine_translated: true
---

# Diagrama de Máquina de Estados

## Visão geral {/*#overview*/}

Um diagrama de máquina de estados é um diagrama UML **comportamental**. Descreve o ciclo de vida de *um único* objeto, componente ou sistema: em quais estados pode estar, quais eventos o levam de um estado para o seguinte e o que acontece no caminho.

Aplicações típicas:

- Status de pedidos em um sistema de loja (`New`, `Paid`, `Shipped`, `Delivered`, `Cancelled`)
- Tratamento de sessão ou de login (`Anonymous`, `Authenticated`, `Locked`, `Expired`)
- Estados de dispositivos e de conexões (`Off`, `Booting`, `Ready`, `Error`)
- Lógica de protocolos e de parsers, em que o próximo caractere é interpretado de forma diferente conforme o estado
- O comportamento interno de uma classe cujos métodos só são permitidos em determinados estados

---

## Notação {/*#notation*/}

| Elemento                | Notação                                                  | Significado                                                                            |
| ----------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Pseudoestado inicial    | Círculo preenchido `●`                               | Onde o ciclo de vida começa, exatamente um por região                                  |
| Estado                  | Retângulo arredondado com um nome                        | Uma situação em que o objeto aguarda, nomeada como adjetivo ou substantivo             |
| Transição               | Seta de um estado para outro                             | Mudança de estado, rotulada `trigger [guard] / effect`, todas as partes opcionais                         |
| Gatilho                 | Nome do evento na transição                              | O evento que aciona a transição, p. ex. `cancel`, `timeout`                              |
| Transição de conclusão  | Transição sem gatilho                                    | Dispara assim que o comportamento do estado de origem termina                          |
| Guarda                  | `[condition]` na transição                                     | Condição booleana, a transição só dispara se for avaliada como verdadeira              |
| Efeito                  | `/ action` na transição                                     | Ação executada enquanto a transição dispara, não pode bloquear                         |
| Autotransição           | Seta que sai e volta a entrar no mesmo estado            | O estado é deixado e entrado novamente, `exit` e `entry` são executados               |
| Transição interna       | `trigger / effect` dentro da caixa do estado                        | Reação sem mudança de estado, `exit` e `entry` **não** são executados                |
| Atividade entry         | `entry / action` dentro da caixa do estado                        | Executada toda vez que o estado é entrado, independentemente da transição usada        |
| Atividade do            | `do / activity` dentro da caixa do estado                        | Executada continuamente enquanto o estado está ativo, pode ser interrompida            |
| Atividade exit          | `exit / action` dentro da caixa do estado                        | Executada toda vez que o estado é deixado, independentemente da transição usada        |
| Estado composto         | Caixa de estado contendo outros estados                  | Um estado decomposto em subestados                                                     |
| Região                  | Parte de um estado composto, separada por uma linha tracejada | Subestados que estão ativos ao mesmo tempo                                        |
| Escolha                 | Losango em uma transição                                 | Ramificação avaliada após o efeito, as transições de saída levam guardas               |
| Histórico raso          | Círculo contendo `H`                                 | Na reentrada, o subestado que esteve ativo por último nesse estado composto é retomado |
| Histórico profundo      | Círculo contendo `H*`                                 | Retoma o último subestado ativo, incluindo todos os níveis aninhados                   |
| Estado final            | Círculo preenchido dentro de um anel `◉`             | O ciclo de vida termina aqui, o objeto não aceita mais eventos                         |

Regras de nomenclatura que mantêm um diagrama legível:

- Estados descrevem uma condição, e não uma atividade: `Paid`, `Waiting for payment`, e não `Pay`
- Gatilhos são nomeados segundo o evento, e não segundo o método que o trata: `cancel`, e não `handleCancel`
- Efeitos e atividades internas são nomeados como operações com parênteses: `/ refundPayment()`

---

## Blocos de construção {/*#building-blocks*/}

### Estados e transições {/*#states-and-transitions*/}

```text
              ●
              │
              ▼
   ╭────────────────────────╮
   │         Idle           │
   ╰────────────────────────╯
              │
              │ coinInserted [amount >= price] / unlock()
              ▼
   ╭────────────────────────╮
   │        Ready           │
   ╰────────────────────────╯
              │
              │ productSelected / dispense()
              ▼
              ◉
```

Lido como uma frase: *no estado `Idle`, quando o evento `coinInserted` ocorre e a condição `amount >= price` é satisfeita, `unlock()` é executado e a máquina muda para `Ready`*. Se o evento ocorre, mas a guarda é falsa, o evento é descartado e o estado não muda.

### Autotransição {/*#self-transition*/}

Após uma autotransição, o objeto está no mesmo estado de antes. No caminho, o estado é deixado e entrado novamente, de modo que `exit` e `entry` são executados e uma atividade `do` é reiniciada.

```text
        ┌───────────────────────────────────┐
        │   digitPressed / appendDigit()    │
        │                                   │
        │   ╭───────────────────────────╮   │
        └──►│        Collecting         │───┘
            ╰───────────────────────────╯
```

Se reiniciar `entry`, `do` e `exit` for indesejável, usa-se uma **transição interna**. Ela é escrita dentro da caixa do estado e mantém o estado ativo:

```text
╭───────────────────────────────────────────╮
│               Collecting                  │
├───────────────────────────────────────────┤
│ digitPressed / appendDigit()              │
╰───────────────────────────────────────────╯
```

Por exemplo, um timeout implementado como `entry / startTimer()` é reiniciado por uma autotransição e mantido em execução por uma transição interna.

### Atividades internas {/*#internal-activities*/}

Três palavras-chave descrevem comportamento que pertence ao próprio estado, e não a uma transição:

- `entry / action`: executada uma vez em cada entrada, antes de qualquer atividade do
- `do / activity`: executada enquanto o estado está ativo, pode durar muito tempo e ser interrompida por uma transição de saída
- `exit / action`: executada uma vez em cada saída, depois que a atividade do terminou ou foi abortada

```text
╭───────────────────────────────────────────╮
│                 Heating                   │
├───────────────────────────────────────────┤
│ entry / switchHeaterOn()                  │
│ do / measureTemperature()                 │
│ exit / switchHeaterOff()                  │
╰───────────────────────────────────────────╯
```

A ordem em uma mudança de estado é sempre: `exit` do estado de origem, depois o efeito da transição e, por fim, `entry` do estado de destino.

Colocar uma ação em `entry` em vez de em cada transição de entrada elimina duplicação e garante que a ação não seja esquecida quando uma nova transição para esse estado for adicionada mais tarde.

### Estados compostos {/*#composite-states*/}

Um estado composto contém uma máquina de estados própria. Mantém os diagramas pequenos e permite desenhar uma transição uma única vez para um grupo inteiro de subestados.

```text
╭────────────────────────────────────────────────────────╮
│ Active                                                 │
│                                                        │
│    ●                                                   │
│    │                                                   │
│    ▼                                                   │
│  ╭───────────────────╮  connected  ╭───────────────────╮
│  │     Dialling      │────────────►│    Talking        │
│  ╰───────────────────╯             ╰───────────────────╯
│                                                        │
╰────────────────────────────────────────────────────────╯
              │
              │ hangUp
              ▼
   ╭───────────────────╮
   │       Idle        │
   ╰───────────────────╯
```

A transição `hangUp` começa na *borda* do estado composto, de modo que se aplica igualmente a `Dialling` e `Talking`.

Regras que vale ter em mente:

- Um estado composto precisa de seu próprio pseudoestado inicial, caso contrário é indefinido qual subestado se torna ativo
- Exatamente um subestado está ativo por vez em cada região, juntamente com o estado composto que o contém
- Uma transição também pode apontar diretamente para um subestado, o que contorna o pseudoestado inicial
- Um estado final dentro de um estado composto encerra essa máquina interna, o que então dispara a transição de conclusão de saída do estado composto

### Regiões e estados paralelos {/*#regions-and-parallel-states*/}

Um estado composto pode ser dividido em **regiões** por uma linha tracejada. Cada região tem seu próprio pseudoestado inicial, subestados e transições. Enquanto o estado composto está ativo, um subestado está ativo em cada região ao mesmo tempo. Isso modela aspectos independentes de um objeto, como o áudio e o vídeo de uma gravação.

```text
╭──────────────────────────────────────────────────────────╮
│ Recording                                                │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮   muteAudio   ╭───────────────╮       │
│  │ AudioRunning  │──────────────►│  AudioMuted   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                                          │
│    ●                                                     │
│    │                                                     │
│    ▼                                                     │
│  ╭───────────────╮  pauseVideo   ╭───────────────╮       │
│  │ VideoRunning  │──────────────►│ VideoPaused   │       │
│  ╰───────────────╯               ╰───────────────╯       │
│                                                          │
╰──────────────────────────────────────────────────────────╯
```

Um evento é oferecido a todas as regiões. Pode disparar uma transição em uma região, em várias regiões ou em nenhuma.

### Estado de histórico {/*#history-state*/}

Um estado de histórico responde à pergunta *onde a máquina continua após uma interrupção*. Sem ele, reentrar em um estado composto sempre começa em seu pseudoestado inicial.

```text
              ╭──────────────────────────────────────────╮
              │ Playing                                  │
   resume     │                                          │
 ┌───────────►│   (H)                                    │
 │            │    │                                     │
 │            │    ▼                                     │
 │            │  ╭───────────╮        ╭───────────╮      │
 │            │  │  Track 1  │───────►│  Track 2  │      │
 │            │  ╰───────────╯        ╰───────────╯      │
 │            ╰──────────────────────────────────────────╯
 │                           │ pause
 │            ╭──────────────▼───────────╮
 └────────────│          Paused          │
              ╰──────────────────────────╯
```

O histórico raso `(H)` restaura o subestado que esteve ativo por último nesse nível. Um histórico profundo `(H*)` restaura a última configuração, incluindo todos os níveis aninhados. Se o estado composto nunca foi entrado antes, a transição para o estado de histórico recorre ao pseudoestado inicial.

---

## Tabela de transição de estados {/*#state-transition-table*/}

Um diagrama de máquina de estados também pode ser escrito como uma **tabela de transição de estados**. A tabela é mais fácil de verificar quanto à completude do que o diagrama, porque combinações ausentes de estado e evento se destacam quando as linhas são agrupadas por estado.

| Estado atual | Evento            | Guarda            | Efeito                 | Próximo estado |
| ------------ | ----------------- | ----------------- | ---------------------- | -------------- |
| `New`         | `itemAdded`       | –                 | `recalculateTotal()`   | –           |
| `New`         | `paymentReceived` | –                 | `capturePayment()`     | `Paid`      |
| `New`         | `cancel`          | –                 | `releaseReservation()` | `Cancelled` |
| `Paid`        | `dispatched`      | `allItemsInStock` | `sendTrackingMail()`   | `Shipped`   |
| `Paid`        | `cancel`          | –                 | `refundPayment()`      | `Cancelled` |
| `Shipped`     | `delivered`       | –                 | –                      | `Delivered` |

Uma combinação que não aparece na tabela não dispara nenhuma transição. O evento é descartado sem efeito.

Uma linha com a coluna *Próximo estado* vazia e a coluna *Efeito* preenchida descreve uma transição interna. Uma linha cujo estado atual e próximo estado são idênticos descreve uma autotransição.

---

## Exemplo: status de pedido {/*#example-order-status*/}

O ciclo de vida de um pedido em um sistema de loja, da criação até a entrega ou o cancelamento.

```text
                          ●
                          │
                          ▼
                ╭────────────────────────╮
                │          New           │
                │ entry / reserveItems() │
                ╰────────────────────────╯
                     │              │
    paymentReceived  │              │ cancel
    / capturePayment()              │ / releaseReservation()
         ┌───────────┘              └────────────┐
         ▼                                       │
╭────────────────────────╮                       │
│          Paid          │──────────────────────►┤
╰────────────────────────╯  cancel               │
         │                  / refundPayment()    │
         │ dispatched [allItemsInStock]          │
         │ / sendTrackingMail()                  ▼
         ▼                          ╭────────────────────────╮
╭────────────────────────╮          │       Cancelled        │
│        Shipped         │          ╰────────────────────────╯
╰────────────────────────╯                       │
         │                                       │
         │ delivered                             │
         ▼                                       │
╭────────────────────────╮                       │
│       Delivered        │                       │
╰────────────────────────╯                       │
         │                                       │
         └───────────────────┐   ┌───────────────┘
                             ▼   ▼
                             ◉
```

O que este exemplo mostra:

- O reembolso fica na transição `Paid => Cancelled` e **não** como atividade `entry` de `Cancelled`, porque um pedido cancelado a partir de `New` nunca foi pago.
- `dispatched` leva uma guarda. Se faltar estoque, o pedido permanece em `Paid`.
- `Shipped` não tem transição para `cancel`. A regra de negócio *um pedido despachado não pode mais ser cancelado* é expressa pela ausência de uma transição.

Implementado em código, cada estado se torna um valor de uma enumeração, e a tabela se torna um `switch` sobre estado e evento. Tudo o que não está listado na tabela cai no ramo padrão e é rejeitado. Uma mudança de estado inválida é, portanto, impossível por construção.

---

## Delimitação em relação ao diagrama de atividades {/*#delimitation-from-the-activity-diagram*/}

| Aspecto           | Diagrama de máquina de estados          | [Diagrama de atividades](./activity-diagram.md)  |
| ----------------- | --------------------------------------- | ------------------------------------------------ |
| Nó                | Um **estado**, o objeto aguarda         | Uma **ação**, trabalho está sendo realizado      |
| Nomenclatura      | Adjetivo ou substantivo: `Paid`       | Verbo + objeto: `Capture payment`                         |
| Seta              | Disparada por um **evento**             | Dispara quando a ação anterior **termina**       |
| Escopo            | O ciclo de vida de um objeto            | Uma execução de processo, possivelmente com vários atores |
| Ramificação       | Guardas nas transições de saída         | Nó de decisão com fluxos protegidos por guardas  |
| Paralelismo       | Regiões dentro de um estado composto    | Bifurcação e junção (fork e join)                |
| Pergunta típica   | *Em qual estado o pedido está?*         | *Qual passo vem a seguir?*                       |

Se uma seta só pode ser rotulada com algo como *depois*, um diagrama de atividades é a escolha certa. Se a seta precisa de um nome como `cancel`, `timeout` ou `paymentReceived`, um diagrama de máquina de estados é adequado.

---

## Erros comuns {/*#common-mistakes*/}

1. **Atividades usadas como nomes de estado:** `Pay` é uma ação e pertence a um diagrama de atividades. O estado é `Paid` ou `Waiting for payment`.
2. **Transições sem gatilho:** uma seta entre dois estados sem evento é uma transição de conclusão. Ela dispara assim que o estado de origem termina seu comportamento.
3. **Guardas sobrepostas:** se duas transições com o mesmo gatilho podem ter ambas a guarda verdadeira, o comportamento é indefinido. As guardas precisam se excluir mutuamente.
4. **Guarda confundida com gatilho:** `[cancel]` é uma condição, e não um evento. `cancel [orderNotShipped]` separa os dois corretamente.
5. **Pseudoestado inicial ausente:** sem ele, o estado de partida é indefinido. Todo diagrama e toda região precisam de exatamente um.
6. **Estados inalcançáveis ou sem saída:** um estado sem transição de entrada nunca é alcançado. Um estado sem transição de saída que não seja um estado final prende o objeto.
7. **Autotransição onde se pretendia uma transição interna:** uma autotransição reinicia `entry`, `do` e `exit`. Um temporizador iniciado em `entry` é reiniciado como resultado.
8. **Explosão de estados:** combinar aspectos independentes em um único conjunto plano de estados multiplica o número de estados. Regiões ou atributos adicionais evitam isso.

---

## Ferramentas {/*#tools*/}

- draw.io / diagrams.net (gratuito, baseado em navegador, biblioteca de formas UML incluída)
- PlantUML (baseado em texto, o diagrama é gerado a partir do código-fonte e pode ser versionado)
- Mermaid (baseado em texto, `stateDiagram-v2` renderizado diretamente em Markdown em muitas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciais, com versões gratuitas)

## Veja também {/*#see-also*/}

- [Diagrama de Atividades](./activity-diagram.md): a visão de processo, ações e fluxo de controle em vez de estados e eventos
- [Diagrama de Sequência](./sequence-diagram.md): mostra, ao longo do tempo, quais mensagens disparam os eventos usados aqui
- [Diagrama de Classes](./class-diagram.md): a classe cujo ciclo de vida é descrito por um diagrama de máquina de estados
- [Diagrama de Casos de Uso](./use-case-diagram.md): a visão externa da qual se originam os eventos de uma máquina de estados
- [Visão Geral da UML](./uml-overview.mdx): classificação dos tipos de diagrama em estrutura e comportamento
- [Noções Básicas de Notação UML](./uml-notation-basics.md): elementos de notação compartilhados por todos os tipos de diagrama
- [Outros Diagramas UML](./further-uml-diagrams.md): os demais tipos de diagrama em resumo
