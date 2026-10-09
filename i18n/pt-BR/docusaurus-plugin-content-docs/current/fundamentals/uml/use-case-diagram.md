---
title: "Diagrama de casos de uso"
description: "Diagramas de casos de uso da UML: atores, fronteira do sistema, associações, os relacionamentos include, extend e generalização, a diferença entre diagrama e descrição de caso de uso e seu papel na análise de requisitos."
keywords:
    - UML
    - Diagrama de casos de uso
    - Ator
    - Fronteira do sistema
    - Include
    - Extend
    - Ponto de extensão
    - Generalização
    - Descrição de caso de uso
    - Análise de requisitos
tags:
    - ap2
machine_translated: true
---

# Diagrama de casos de uso

## Visão geral {/*#overview*/}

Um diagrama de casos de uso é um diagrama **comportamental** da UML. Ele mostra *quais* serviços um sistema oferece ao seu ambiente e *quem* os utiliza, mas deliberadamente nada diz sobre *como* esses serviços são implementados. O diagrama é, portanto, a visão externa de um sistema, e o que ele define é o **escopo do sistema**.

Aplicações típicas:

- Delimitar o escopo de um projeto: uma resposta antecipada a *o que pertence ao sistema e o que não pertence*
- Estruturar requisitos funcionais em unidades que carregam valor de negócio
- Fornecer um vocabulário compartilhado para desenvolvedores, clientes e especialistas de domínio
- Servir como índice de um documento de requisitos, com uma descrição por caso de uso

Um caso de uso é sempre um **serviço completo e autocontido, com um resultado observável de valor** para pelo menos um ator. `Place order` é um caso de uso, `Click the order button` não é.

---

## Notação {/*#notation*/}

| Elemento             | Notação                                                              | Significado                                                                  |
| -------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Ator                 | Figura de palito, nome abaixo                                        | Papel externo ao sistema que interage com ele                                |
| Ator (sistema)       | Retângulo com a palavra-chave `<<actor>>` ou uma figura de palito       | Sistema externo no papel de ator                                             |
| Fronteira do sistema | Retângulo com o nome do sistema na borda superior                    | Tudo o que é desenhado dentro faz parte do sistema considerado               |
| Caso de uso          | Elipse com o nome dentro, sempre dentro da fronteira                 | Um serviço autocontido do sistema, nomeado como *verbo + objeto*             |
| Associação           | Linha contínua sem ponta de seta                                     | Um ator participa de um caso de uso                                          |
| Include              | Seta tracejada com `<<include>>`, apontando para o caso de uso incluído    | O caso de uso base **sempre** executa o incluído                             |
| Extend               | Seta tracejada com `<<extend>>`, apontando para o caso de uso **base**    | O caso de uso que estende **pode** ser executado sob uma condição            |
| Ponto de extensão    | Posição nomeada em um compartimento do caso de uso base              | O local em que uma extensão é inserida                                       |
| Generalização        | Linha contínua com um triângulo vazado no elemento geral             | Especialização de atores ou de casos de uso                                  |
| Nota                 | Retângulo com canto dobrado em uma linha tracejada                   | Comentário sem semântica, p. ex. a condição de um relacionamento extend      |

Regras de nomenclatura que mantêm um diagrama legível:

- Casos de uso são nomeados como *verbo + objeto* do ponto de vista do ator e na linguagem do domínio, não da implementação: `Place order` e `Cancel invoice`, não `Order management`, `orderService()` ou `Set the invoice status to 0`
- Atores são nomeados pelo **papel**, não pela pessoa: `Clerk`, não `Ms Weber`, pois uma pessoa pode ocupar vários papéis

---

## Elementos construtivos {/*#building-blocks*/}

### Atores {/*#actors*/}

Um ator é um papel externo ao sistema que troca informações com ele. Atores não são necessariamente pessoas.

- **Ator primário:** dispara o caso de uso e tira proveito dele. Por convenção, desenhado à esquerda
- **Ator secundário:** é chamado pelo sistema enquanto o caso de uso é executado e fornece algo de que o sistema precisa. Por convenção, desenhado à direita
- **Ator humano:** uma pessoa em um papel, desenhada como figura de palito
- **Ator de sistema:** um sistema externo, um serviço ou um temporizador, desenhado como figura de palito ou como retângulo com a palavra-chave `<<actor>>`

### Fronteira do sistema {/*#system-boundary*/}

A fronteira do sistema é um retângulo rotulado com o nome do sistema. Ela separa a responsabilidade do ambiente:

- Casos de uso são **sempre** desenhados dentro da fronteira, pois são serviços do sistema
- Atores são **sempre** desenhados fora da fronteira, pois não são construídos
- Associações são as únicas linhas que cruzam a fronteira

### Associação {/*#association*/}

Uma linha contínua entre um ator e um caso de uso significa que esse ator participa desse caso de uso. Ela não tem ponta de seta, pois expressa participação, não uma direção de fluxo de dados. Multiplicidades como `1` ou `*` podem ser escritas nas extremidades, mas raramente são necessárias na prática.

Associações existem apenas entre um ator e um caso de uso, nunca entre dois casos de uso e nunca entre dois atores.

### Include {/*#include*/}

`<<include>>` descreve reutilização obrigatória. O caso de uso base sempre executa o incluído, em um ponto fixo do seu fluxo. A seta tracejada aponta do caso de uso base **para** o caso de uso incluído.

```text
 ╭─────────────────────╮                     ╭─────────────────────╮
(      Place order      )╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌►(   Authenticate user   )
 ╰─────────────────────╯     <<include>>     ╰─────────────────────╯
```

O caso de uso incluído é um fragmento compartilhado por vários casos de uso base. `Authenticate user` também é necessário para `Manage wish list` e `View invoices`, e extraí-lo evita descrevê-lo três vezes. Um caso de uso incluído geralmente não é associado a um ator próprio, pois nunca é iniciado isoladamente.

### Extend {/*#extend*/}

`<<extend>>` descreve comportamento opcional. O caso de uso que estende só é executado se uma condição for satisfeita, e é inserido em um **ponto de extensão** nomeado do caso de uso base. Sua seta tracejada aponta na direção oposta à de `<<include>>`: do caso de uso que estende **para** o caso de uso base.

```text
 ╭─────────────────────────────╮
(          Place order          )
(  ---------------------------  )              ╭────────────────────╮
(  extension points:            )◄╌╌╌╌╌╌┬╌╌╌╌╌(   Redeem voucher     )
(   payment method selected     )       ╎      ╰────────────────────╯
 ╰─────────────────────────────╯   <<extend>>
                                        ╎
                     ┌──────────────────┴────────╮
                     │ Condition:                │
                     │ {voucher code entered}    │
                     │ extension point:          │
                     │  payment method selected  │
                     └───────────────────────────┘
```

O caso de uso base é completo sem a extensão. `Place order` funciona perfeitamente sem um voucher, ao passo que não funciona sem autenticação. A condição é uma restrição (constraint) e, por isso, fica entre chaves. A UML a mostra, junto com o ponto de extensão ao qual se refere, em uma nota ligada ao relacionamento extend. Muitas ferramentas e livros didáticos abreviam a nota para `<<extend>> {condition}` escrito ao lado da seta, o que é uma forma abreviada tolerada da mesma coisa.

Um teste simples distingue os dois relacionamentos:

- O caso de uso base pode ser descrito sem jamais mencionar o outro? Se sim, é `<<extend>>`
- O caso de uso base deixa de funcionar se o outro for removido? Se sim, é `<<include>>`

### Generalização {/*#generalization*/}

A generalização expressa *é um tipo de*, tanto para atores quanto para casos de uso. A linha tem um triângulo vazado no elemento mais geral.

Generalização de atores: um ator especializado herda todas as associações do ator geral e pode adicionar as suas próprias.

```text
                  ○
                 ╱│╲
                 ╱ ╲
              Customer
                  △
       ┌──────────┴──────────┐
       │                     │
       ○                     ○
      ╱│╲                   ╱│╲
      ╱ ╲                   ╱ ╲
  Registered               Guest
   customer
```

Tanto `Registered customer` quanto `Guest` herdam todas as associações de `Customer`, de modo que `Search catalogue` não precisa ser conectado três vezes.

```text
                  ╭───────────────╮
                 (  Pay for order  )
                  ╰───────────────╯
                          △
           ┌──────────────┴──────────────┐
           │                             │
 ╭────────────────────╮       ╭─────────────────────╮
(  Pay by credit card  )     (  Pay by direct debit  )
 ╰────────────────────╯       ╰─────────────────────╯
```

A generalização de casos de uso é poderosa, mas facilmente usada em excesso. Quando as variantes diferem apenas em um passo opcional, `<<extend>>` é a escolha mais clara.

---

## Diagrama e descrição {/*#diagram-and-description*/}

O diagrama sozinho é uma visão geral rápida, não uma especificação: ele nomeia os casos de uso e seus relacionamentos, mas nada diz sobre o fluxo. O detalhe está na **descrição do caso de uso**, escrita como texto corrido ou em um modelo (template), uma por caso de uso.

| Campo                | Conteúdo                                                                          |
| -------------------- | --------------------------------------------------------------------------------- |
| Nome                 | Idêntico ao rótulo no diagrama, *verbo + objeto*                                  |
| Descrição breve      | Uma ou duas frases sobre a finalidade e o valor de negócio                        |
| Atores               | Ator primário, atores secundários                                                 |
| Pré-condição         | O que deve ser verdadeiro antes de o caso de uso poder começar                    |
| Pós-condição         | O que é verdadeiro após uma execução bem-sucedida                                 |
| Gatilho              | O evento que inicia o caso de uso                                                 |
| Cenário principal    | O fluxo padrão numerado, com tudo correndo bem                                    |
| Fluxos alternativos  | Desvios que ainda levam ao objetivo, numerados em relação ao cenário principal    |
| Exceções             | Desvios que impedem que o objetivo seja alcançado                                 |
| Não funcionais       | Tempos de resposta, volumes, restrições legais                                    |

Um exemplo preenchido para `Place order`:

- **Pré-condição:** o carrinho de compras contém pelo menos um item, o cliente está autenticado
- **Pós-condição:** o pedido está armazenado com o status `paid` e uma confirmação foi enviada
- **Gatilho:** o cliente confirma o carrinho de compras
- **Cenário principal:** 1. o sistema exibe o resumo do pedido => 2. o cliente seleciona uma forma de pagamento => 3. o sistema reserva as mercadorias => 4. o sistema processa o pagamento => 5. o sistema confirma o pedido
- **Fluxo alternativo 2a:** o cliente informa um código de voucher, o sistema reduz o valor e continua no passo 3
- **Exceção 3a:** um item não está mais em estoque, o sistema oferece uma entrega parcial ou cancela o pedido

Um cenário é *um caminho concreto* por um caso de uso: o cenário principal é o caminho esperado, os fluxos alternativos são os demais. Tudo o que é desenhado como `<<extend>>` no diagrama aparece como fluxo alternativo na descrição, tudo o que é desenhado como `<<include>>` aparece como referência a outra descrição.

---

## Papel na análise de requisitos {/*#role-in-requirements-analysis*/}

- O **[caderno de requisitos](../../projectmanagement/requirements-specification.md#requirement-specification)** é redigido pelo cliente e declara *o que* é necessário e *por quê*. Casos de uso são uma excelente estrutura para ele, pois cada um descreve um requisito sem prescrever uma solução
- O **[caderno de especificações funcionais](../../projectmanagement/requirements-specification.md#functional-specification)** é redigido pelo contratado e declara *como* os requisitos são atendidos. O diagrama de casos de uso é aproveitado, as descrições são refinadas e restrições técnicas são acrescentadas
- **Rastreabilidade:** todo requisito deve ser rastreável a pelo menos um caso de uso, e todo caso de uso a pelo menos um requisito. Casos de uso sem requisito são gold plating, requisitos sem caso de uso foram esquecidos
- **Estimativa e planejamento:** casos de uso são uma unidade natural para estimativa de esforço, planejamento de releases e testes de aceitação, pois cada um pode ser aceito isoladamente
- **Base de testes:** o cenário principal gera o caso de teste do caminho feliz (happy path), e cada fluxo alternativo e cada exceção geram pelo menos mais um caso de teste

Uma user story é um pequeno incremento de planejamento, um caso de uso é um serviço completo, incluindo todas as alternativas. Um caso de uso normalmente se decompõe em várias user stories.

---

## Exemplo: loja online {/*#example-online-shop*/}

O sistema considerado é uma loja online. O cliente pesquisa o catálogo e faz pedidos. Fazer um pedido sempre exige autenticação e processamento de pagamento, e pode ser estendido opcionalmente pelo resgate de um voucher. O processamento de pagamento chama um provedor de pagamentos externo.

```text
                                 Online Shop
         ┌──────────────────────────────────────────────────────────┐
         │                                                          │
         │           ╭────────────────────╮                         │
    ┌────┼──────────(   Search catalogue   )                        │
    │    │           ╰────────────────────╯                         │
 ○  │    │                                                          │
╱│╲─┤    │                                                          │
╱ ╲ │    │           ╭────────────────────╮     ╭────────────────╮  │
    └────┼──────────(     Place order      )◄╌╌(  Redeem voucher  ) │
Customer │           ╰────────────────────╯     ╰────────────────╯  │
         │                  ╎       ╎       <<extend>>              │
         │      <<include>> ╎       ╎ <<include>>                   │
         │              ┌───┘       └───────────┐                   │
         │              ▼                       ▼                   │
         │     ╭─────────────────╮      ╭────────────────╮          │  ○
         │    (  Authenticate     )    (  Process payment )─────────┼─╱│╲
         │    (      user         )     ╰────────────────╯          │ ╱ ╲
         │     ╰─────────────────╯                                  │
         │                                                          │
         └──────────────────────────────────────────────────────────┘
                                                                    Payment
                                                                   Provider
```

O que este exemplo mostra:

- `Customer` é o ator primário à esquerda, `Payment Provider` é um ator de sistema secundário à direita: a loja o chama, e não o contrário
- `Authenticate user` é incluído porque nenhum pedido pode ser feito sem ele, e não tem associação própria, pois nunca é iniciado isoladamente
- `Redeem voucher` estende `Place order`: removê-lo deixa `Place order` totalmente funcional, o que é exatamente o critério para `<<extend>>`

---

## Erros comuns {/*#common-mistakes*/}

1. **Include e extend trocados:** `<<include>>` aponta para longe do caso de uso base e significa *sempre*, `<<extend>>` aponta para ele e significa *possivelmente*
2. **Linhas contínuas e tracejadas trocadas:** associações e generalizações são desenhadas como linhas contínuas, `<<include>>` e `<<extend>>` como setas tracejadas
3. **Passos de processo em vez de casos de uso:** `Enter customer number`, `Validate input`, `Save record` são passos dentro de um fluxo, não serviços com valor de negócio. Pertencem à descrição do caso de uso ou a um diagrama de atividades
4. **Fronteira do sistema ausente:** sem fronteira, o diagrama deixa de dizer qual funcionalidade pertence ao sistema, e o escopo se torna negociável
5. **Ator dentro da fronteira:** atores ficam fora por definição, pois não fazem parte do que está sendo construído. Um ator desenhado dentro geralmente indica que um componente foi confundido com um papel
6. **Decomposição funcional via include:** dividir todo caso de uso em três subcasos de uso incluídos transforma o diagrama em uma árvore de chamadas. `<<include>>` serve para reutilização entre vários casos de uso base, não para estruturar um único fluxo
7. **Associações entre casos de uso:** uma linha contínua sem palavra-chave entre duas elipses não tem significado na UML. Relacionamentos entre casos de uso são apenas `<<include>>`, `<<extend>>` ou generalização
8. **Atores nomeados por pessoas ou cargos de indivíduos:** um ator é um papel. A mesma pessoa pode ser `Clerk` em um caso de uso e `Customer` em outro
9. **Pontas de seta em associações:** a associação expressa participação e não tem direção
10. **Diagrama sem descrições:** o diagrama nomeia os casos de uso, não os especifica. Um projeto que tem apenas o diagrama tem um índice e nenhum conteúdo
11. **Terminologia técnica nos nomes:** `POST /orders` ou `saveOrder()` são implementação, não um serviço visto de fora. O nome precisa ser compreensível para o cliente
12. **Colchetes para a condição do extend:** a condição é uma restrição (constraint) e, por isso, pertence a chaves, em uma nota ligada ao relacionamento extend. `[condition]` é a notação de guarda dos diagramas de [atividades](./activity-diagram.md), de [máquina de estados](./state-machine-diagram.md) e de [sequência](./sequence-diagram.md)

---

## Ferramentas {/*#tools*/}

- draw.io / diagrams.net (gratuito, baseado em navegador, biblioteca de formas UML incluída)
- PlantUML (baseado em texto, o diagrama é gerado a partir do código-fonte e pode ser versionado)
- Mermaid (baseado em texto, renderizado diretamente em Markdown em muitas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciais, com planos gratuitos)

## Veja também {/*#see-also*/}

- [Visão geral da UML](./uml-overview.mdx): classificação dos tipos de diagrama em estrutura e comportamento
- [Diagrama de atividades](./activity-diagram.md): detalhamento do fluxo de um único caso de uso
- [Diagrama de sequência](./sequence-diagram.md): a interação entre ator e sistema dentro de um cenário
- [Diagrama de classes](./class-diagram.md): a contrapartida estrutural, que modela os objetos de domínio sobre os quais os casos de uso operam
