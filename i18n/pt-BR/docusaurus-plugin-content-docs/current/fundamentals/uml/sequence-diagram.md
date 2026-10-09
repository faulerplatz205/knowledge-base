---
title: "Diagrama de Sequência"
description: "Diagramas de sequência UML: linhas de vida, especificações de execução, mensagens síncronas e assíncronas, respostas, criação e destruição de objetos, fragmentos combinados como alt, opt, loop e par, e a delimitação em relação aos diagramas de atividades e de comunicação."
keywords:
    - UML
    - Diagrama de Sequência
    - Diagrama de Interação
    - Linha de Vida
    - Especificação de Execução
    - Fragmento Combinado
    - Mensagem Síncrona
    - Mensagem Assíncrona
    - Diagrama Comportamental
tags:
    - ap2
machine_translated: true
---

# Diagrama de Sequência

## Visão geral {/*#overview*/}

Um diagrama de sequência é um diagrama UML **comportamental** e pertence ao grupo dos *diagramas de interação*. Mostra quais parceiros de comunicação trocam quais mensagens e em qual ordem isso acontece. Os parceiros são dispostos lado a lado, e o tempo corre de cima para baixo.

Aplicações típicas:

- Detalhamento de um único cenário de um [caso de uso](./use-case-diagram.md), normalmente o fluxo normal mais uma exceção
- Documentação da colaboração de objetos ou componentes para uma funcionalidade
- Descrição de um protocolo entre sistemas, por exemplo cliente, servidor e banco de dados
- Revisão de um projeto preliminar em relação ao [diagrama de classes](./class-diagram.md) nos dois sentidos: uma mensagem que nenhuma classe oferece como operação revela uma operação ausente, e uma linha de vida sem mensagens recebidas revela uma classe inalcançável

Um diagrama de sequência sempre mostra *uma* execução concreta. Alternativas e repetições podem ser expressas por fragmentos combinados, mas um diagrama que tenta cobrir todos os casos de uma vez se torna ilegível. Vários diagramas pequenos são, portanto, preferíveis a um grande.

---

## Notação {/*#notation*/}

| Elemento                    | Notação                                                  | Significado                                                       |
| --------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------- |
| Moldura                     | Retângulo com uma aba pentagonal com `sd` mais um nome | Limite e nome da interação                                        |
| Cabeça da linha de vida     | Retângulo com `name : Class`, `:Class` ou `name`                | Um parceiro de comunicação, objeto, componente ou ator            |
| Linha de vida               | Linha vertical tracejada abaixo da cabeça                | Existência desse parceiro ao longo do tempo                       |
| Especificação de execução   | Retângulo estreito sobre a linha de vida (barra de ativação) | Período em que o parceiro está ativo ou processando uma chamada |
| Mensagem síncrona           | Linha contínua, ponta de seta preenchida `──▶`         | O remetente aguarda até a resposta chegar                         |
| Mensagem assíncrona         | Linha contínua, ponta de seta aberta `──>`             | O remetente continua imediatamente, sem aguardar                  |
| Mensagem de resposta        | Linha tracejada, ponta de seta aberta `<- - -`            | Devolução do controle, opcionalmente rotulada com o valor retornado |
| Mensagem para si mesmo      | Seta que sai e volta a entrar na mesma linha de vida     | Um parceiro chama uma de suas próprias operações                  |
| Mensagem de criação         | Seta tracejada com `«create»` sobre a cabeça de uma linha de vida | O receptor passa a existir durante a interação              |
| Ocorrência de destruição    | Cruz `X` na extremidade inferior de uma linha de vida | O objeto é destruído, a linha de vida termina ali                |
| Fragmento combinado         | Retângulo com o operador no canto superior esquerdo      | Estrutura de controle, por exemplo `alt`, `opt`, `loop`, `par` |
| Operando                    | Seção de um fragmento, separada por uma linha tracejada  | Um caso ou um ramo dentro do fragmento                            |
| Guarda                      | `[condition]` no início de um operando                         | Condição sob a qual esse operando se aplica                       |
| Uso de interação            | Fragmento com o operador `ref`                         | Referência a uma interação desenhada em um diagrama próprio       |
| Invariante de estado        | `{condition}` sobre uma linha de vida                          | Condição que precisa valer nesse ponto no tempo                   |
| Nota                        | Retângulo com canto dobrado sobre uma linha tracejada    | Comentário sem semântica                                          |

Regras de nomenclatura que mantêm um diagrama legível:

- Uma mensagem leva a assinatura da operação chamada, por exemplo `reserve(seatNo)`, e não uma frase como `the seat is reserved`
- Uma resposta é rotulada com o valor retornado, e não novamente com o nome da operação
- Linhas de vida recebem nomes de objetos, e não de ações: `:SeatRepository` é um parceiro, `Save seat` não é
- Objetos anônimos são escritos como `:Class`, um objeto nomeado como `seat : Seat`, um papel apenas pelo seu nome

---

## Blocos de construção {/*#building-blocks*/}

### Linha de vida, especificação de execução e resposta {/*#lifeline-execution-specification-and-reply*/}

Uma mensagem de um parceiro para outro inicia uma especificação de execução no receptor, e a resposta a encerra. Uma mensagem síncrona se adequa a uma chamada cujo resultado o chamador precisa antes de poder continuar, por exemplo uma chamada de método ou uma requisição HTTP cuja resposta é aguardada.

```text
   :Client                  :AuthService
      │                           │
     ┌┴┐                          │
     │ │─── login(user, pw) ────▶┌┴┐
     │ │                         │ │
     │ │<- - - - - token - - - - └┬┘
     │ │                          │
     └┬┘                          │
      │                           │
```

A resposta pode ser omitida se não carregar nenhuma informação.

### Mensagem assíncrona {/*#asynchronous-message*/}

Uma mensagem assíncrona é entregue e o remetente continua sem aguardar. Adequa-se a eventos, notificações, mensagens para uma fila e chamadas executadas em uma thread separada, nas quais o remetente não precisa de resultado. A barra do remetente é independente da barra do receptor e pode terminar antes dela.

```text
:OrderService                   :MailService
      │                               │
     ┌┴┐                              │
     │ │──── sendMail(order) ───────>┌┴┐
     └┬┘                             │ │
      │                              │ │
      │                              └┬┘
      │                               │
```

### Mensagem para si mesmo {/*#self-message*/}

Uma mensagem para si mesmo é uma seta que sai de uma linha de vida e volta a entrar na mesma linha de vida um pouco mais abaixo. É desenhada quando uma etapa interna de um parceiro, como uma validação ou um cálculo, é importante para entender o fluxo. Chamadas auxiliares privadas sem essa relevância são omitidas. Uma autochamada desenhada com rigor recebe uma especificação de execução aninhada, uma segunda barra ligeiramente deslocada sobre a primeira.

```text
:OrderService
      │
     ┌┴┐
     │ ├───┐ validate()
     │ ┌─┐◀┘
     │ │ │
     │ └─┘
     │ │
     └┬┘
      │
```

### Criação e destruição de objetos {/*#creation-and-destruction-of-objects*/}

Um objeto que só passa a existir durante a interação é desenhado com sua cabeça na posição vertical em que é criado. A mensagem de criação aponta para a cabeça, e não para a linha de vida. A destruição é marcada com uma cruz no final da linha de vida.

```text
  :Session
      │
     ┌┴┐
     │ │        «create»
     │ │- - - - - - - - - ->┌─────────┐
     │ │                    │  :Cart  │
     │ │                    └────┬────┘
     │ │──── addItem(item) ────▶┌┴┐
     │ │                        └┬┘
     │ │──── «destroy» ────────▶ X
     └┬┘
      │
```

---

## Fragmentos combinados {/*#combined-fragments*/}

Um fragmento combinado é um retângulo ao redor de uma parte da interação. O operador no canto superior esquerdo determina qual estrutura de controle se aplica às mensagens envolvidas, por exemplo uma alternativa ou um laço. Linhas horizontais tracejadas dividem o fragmento em operandos, e em um fragmento `alt` cada operando leva uma guarda.

| Operador     | Significado                                                                       | Corresponde a                    |
| ------------ | --------------------------------------------------------------------------------- | -------------------------------- |
| `alt`      | Alternativas, exatamente um operando é executado, o caso restante é rotulado `[else]` | `if / else if / else`                       |
| `opt`      | Um único operando que é executado apenas se a guarda for satisfeita               | `if` sem `else`              |
| `loop`      | Repetição, escrita como `loop(min,max)` ou com uma guarda                                 | `while`, `for`, `do … while`        |
| `break`      | O operando substitui o restante da interação envolvente                           | `return` antecipado, exceção      |
| `par`      | Os operandos são executados de forma concorrente, suas mensagens podem se intercalar | Threads, tarefas, chamadas paralelas |
| `ref`      | Referência a uma interação desenhada em um diagrama próprio                       | Chamada de método, subprocesso   |
| `critical`      | O operando não pode ser interrompido por operandos executados concorrentemente    | Seção crítica, lock              |
| `neg`      | A sequência envolvida é inválida e não pode ocorrer                               | Caso de teste negativo           |
| `assert`      | A sequência envolvida é a única continuação válida                                | Asserção                         |

Na prática, `alt`, `opt` e `loop` cobrem a grande maioria dos diagramas.

### Alternativa {/*#alternative*/}

```text
      :Client                        :Booking
         │                               │
        ┌┴┐                              │
        │ │──── reserve(seatNo) ───────▶┌┴┐
        │ │                             │ │
 ┌──────┼─┼─────────────────────────────┼─┼────────┐
 │ alt  │ │ [seat is free]              │ │        │
 │      │ │<- - - - reservationId - - - │ │        │
 ├╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌┼╌╌╌╌╌╌╌╌┤
 │      │ │ [else]                      │ │        │
 │      │ │<- - - SeatTakenError - - - -│ │        │
 └──────┼─┼─────────────────────────────┼─┼────────┘
        └┬┘                             └┬┘
         │                               │
```

As guardas de um fragmento `alt` precisam ser mutuamente exclusivas e devem cobrir todos os casos.

### Laço {/*#loop*/}

```text
      :Order                         :LineItem
         │                               │
        ┌┴┐                              │
 ┌──────┼─┼──────────────────────────────┼─────────┐
 │ loop │ │ [more items]                 │         │
 │      │ │──── subtotal() ────────────▶┌┴┐        │
 │      │ │<- - - - amount - - - - - - -└┬┘        │
 └──────┼─┼──────────────────────────────┼─────────┘
        └┬┘                              │
         │                               │
```

`loop(1,n)` expressa uma contagem em vez de uma condição, e `loop` sem complemento significa uma repetição ilimitada.

---

## Exemplo: detalhamento do caso de uso *Reservar assento* {/*#example-detailing-the-use-case-book-seat*/}

O cenário detalhado aqui é o fluxo normal do caso de uso *Reservar assento*: um cliente reserva um assento específico, o sistema o procura e, se ainda estiver livre, o marca como reservado. O diagrama é derivado da descrição textual do caso de uso nestas etapas:

1. Um cenário do caso de uso é escolhido, normalmente o fluxo normal da descrição textual.
2. O ator que dispara a interação se torna a linha de vida mais à esquerda.
3. Os parceiros internos são adicionados, tipicamente ao longo das camadas da arquitetura: interface com o usuário, controle, objeto de domínio, persistência.
4. Cada passo do fluxo textual se torna uma mensagem cujo nome corresponde a uma operação do receptor.
5. As exceções da descrição textual se tornam fragmentos `alt` ou `break`, ou um diagrama separado para cada uma.

```text
┌────────────────┐
│ sd BookSeat    │
├────────────────┴─────────────────────────────────────────────────────┐
│                                                                      │
│       :Customer            :BookingService         :SeatRepository   │
│           │                       │                       │          │
│          ┌┴┐                      │                       │          │
│          │ │── bookSeat(id) ────▶┌┴┐                      │          │
│          │ │                     │ │── findSeat(id) ────▶┌┴┐         │
│          │ │                     │ │<- - seat - - - - - -└┬┘         │
│          │ │                     │ │                      │          │
│          │ │              ┌──────┼─┼──────────────────────┼───────┐  │
│          │ │              │ opt  │ │ [seat is free]       │       │  │
│          │ │              │      │ │── markBooked(id) ──▶┌┴┐      │  │
│          │ │              │      │ │<- - - - ok - - - - -└┬┘      │  │
│          │ │              └──────┼─┼──────────────────────┼───────┘  │
│          │ │<- - confirmation - -└┬┘                      │          │
│          └┬┘                      │                       │          │
│           │                       │                       │          │
└──────────────────────────────────────────────────────────────────────┘
```

O que se pode ler neste exemplo:

- O caso de falha do fragmento `opt` não é desenhado aqui; seria modelado com `alt` ou em um diagrama separado.
- A etapa de pagamento seria inserida como um fragmento `ref`, para que este diagrama permaneça legível e o pagamento tenha sua própria interação.

---

## Diagrama de sequência, de atividades ou de comunicação {/*#sequence-activity-or-communication-diagram*/}

Os três são diagramas comportamentais.

| Critério       | Diagrama de sequência                            | Diagrama de atividades                       | Diagrama de comunicação                        |
| -------------- | ------------------------------------------------ | -------------------------------------------- | ---------------------------------------------- |
| Foco           | Troca de mensagens ao longo do tempo             | Fluxo de controle de um processo             | Estrutura da colaboração                       |
| Tempo          | Explícito, como eixo vertical                    | Implícito, pela direção do fluxo             | Somente pela numeração das mensagens           |
| Participantes  | Linhas de vida lado a lado                       | Opcional, como partições                     | Objetos posicionados livremente, conectados por ligações |
| Ramificação    | Fragmentos combinados, fica rapidamente sobrecarregado | Nós de decisão e de junção, bem legível | Dificilmente legível                           |
| Concorrência   | Fragmento `par`                                | Fork e join                                  | Possível, mas difícil de ler                   |
| Uso típico     | Detalhamento de um cenário                       | Modelagem de um processo inteiro             | Mostrar qual objeto conhece qual outro         |

Regras práticas:

- Muitas ramificações e laços, poucos participantes => [diagrama de atividades](./activity-diagram.md)
- Poucas ramificações, muitos participantes e uma ordem relevante => diagrama de sequência
- A pergunta *quem está conectado a quem* em vez de *em qual ordem* => [diagrama de comunicação](./further-uml-diagrams.md#communication-diagram)
- O comportamento de *um único* objeto ao longo de toda a sua vida => [diagrama de máquina de estados](./state-machine-diagram.md)

---

## Erros comuns {/*#common-mistakes*/}

1. **Eixo do tempo ignorado:** o tempo corre de cima para baixo em todas as linhas de vida. Uma seta desenhada para cima, portanto, inverte a ordem pretendida. Duas mensagens na mesma altura não têm ordem definida.
2. **Resposta como seta contínua:** uma resposta é desenhada como uma linha tracejada com ponta de seta aberta. Uma linha contínua com ponta de seta preenchida é lida como uma nova chamada em sentido contrário.
3. **Síncrono e assíncrono confundidos:** a ponta de seta preenchida significa que o remetente aguarda a resposta. Eventos, notificações e mensagens para uma fila são assíncronos e recebem a ponta de seta aberta.
4. **Especificações de execução não encerradas:** a barra de um chamador precisa se estender pelo menos até a chegada da resposta. Uma barra que termina antes indica que o chamador já havia terminado.
5. **Atividades em vez de objetos nas linhas de vida:** uma linha de vida representa um parceiro de comunicação como `:SeatRepository`. Uma etapa como `Check availability` não é um parceiro e se torna uma mensagem.
6. **Guardas ausentes nos operandos alt:** sem guardas, o diagrama não mostra sob qual condição cada operando do fragmento `alt` se aplica.

---

## Ferramentas {/*#tools*/}

- draw.io / diagrams.net (gratuito, baseado em navegador, biblioteca de formas UML incluída)
- PlantUML (baseado em texto, particularmente forte para diagramas de sequência, pode ser versionado)
- Mermaid (baseado em texto, renderizado diretamente em Markdown em muitas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciais, com versões gratuitas)

## Veja também {/*#see-also*/}

- [Diagrama de Atividades](./activity-diagram.md): a alternativa para processos com muitas ramificações e laços
- [Diagrama de Casos de Uso](./use-case-diagram.md): fornece os cenários que um diagrama de sequência detalha
- [Diagrama de Classes](./class-diagram.md): fornece as classes e operações às quais as mensagens se referem
- [Diagrama de Máquina de Estados](./state-machine-diagram.md): o comportamento de um único objeto em vez da interação de vários
- [Visão Geral da UML](./uml-overview.mdx): classificação de todos os tipos de diagrama
- [Noções Básicas de Notação UML](./uml-notation-basics.md): elementos compartilhados por todos os tipos de diagrama
