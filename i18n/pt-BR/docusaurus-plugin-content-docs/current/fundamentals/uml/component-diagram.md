---
title: "Diagrama de Componentes"
description: "Diagramas de componentes da UML: componentes, interfaces fornecidas e requeridas, conectores de montagem e de delegação, portas, artefatos e manifestação, aninhamento, dependências e a delimitação em relação aos diagramas de classes e de implantação."
keywords:
    - UML
    - Diagrama de Componentes
    - Componente
    - Interface Fornecida
    - Interface Requerida
    - Conector de Montagem
    - Conector de Delegação
    - Porta
    - Artefato
    - Arquitetura de Software
    - Diagrama Estrutural
tags:
    - ap2
machine_translated: true
---

# Diagrama de Componentes

## Visão geral {/*#overview*/}

Um diagrama de componentes é um diagrama **estrutural** da UML. Ele mostra como um sistema é dividido em blocos de construção substituíveis e quais interfaces esses blocos oferecem uns aos outros e requerem uns dos outros.

Um componente no sentido da UML é uma parte modular de um sistema, cujo conteúdo é oculto e cujo comportamento é completamente definido por suas interfaces. Duas consequências decorrem dessa definição:

- Um componente pode ser substituído por qualquer outro componente que forneça as mesmas interfaces.
- Nada fora do componente pode depender de como ele funciona internamente.

Aplicações típicas:

- Documentação da arquitetura de um sistema como uma visão geral de granularidade grossa
- Definição do contrato de interface entre equipes antes do início da implementação
- Visualização de dependências, de modo que acoplamentos cíclicos ou excessivos se tornem evidentes
- Planejamento de quais partes podem ser construídas, testadas, implantadas ou substituídas de forma independente

---

## Notação {/*#notation*/}

| Elemento                                                            | Notação                                                         | Significado                                                                                 |
| ------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [Componente](#component)                                            | Retângulo com a palavra-chave `<<component>>`                   | Uma parte substituível e autocontida do sistema                                             |
| [Ícone de componente](#component)                                   | Pequeno retângulo com duas abas salientes, no canto superior direito | Marcação alternativa de um componente, pode ser usada no lugar da palavra-chave ou junto com ela |
| [Interface fornecida](#provided-and-required-interfaces)            | Linha terminando em um círculo preenchido (*ball*, *pirulito*)  | Serviço que o componente oferece ao seu ambiente                                            |
| [Interface requerida](#provided-and-required-interfaces)            | Linha terminando em um semicírculo (*socket*)                   | Serviço de que o componente precisa do seu ambiente                                         |
| [Conector de montagem](#assembly-connector)                         | Socket posicionado sobre uma ball                               | A necessidade de um componente é atendida pela oferta de outro                              |
| [Porta](#ports-and-delegation-connectors)                           | Pequeno quadrado no limite do componente                        | Ponto de interação nomeado através do qual as interfaces são expostas                       |
| [Conector de delegação](#ports-and-delegation-connectors)           | Seta de uma porta para um componente interno                    | Encaminha o que chega à porta para a parte que o trata                                      |
| [Interface](#provided-and-required-interfaces) (notação de retângulo) | Retângulo com a palavra-chave `<<interface>>`                         | Contrato detalhado com suas operações, complementa a ball, que carrega apenas o nome        |
| [Dependência](#dependencies)                                        | Seta tracejada com ponta aberta                                 | A origem precisa do destino, sem uma interface nomeada                                      |
| [Artefato](#artifacts-and-manifestation)                            | Retângulo com a palavra-chave `<<artifact>>`                            | Um arquivo físico: `.jar`, `.dll`, `.war`, script, arquivo de configuração                 |
| [Manifestação](#artifacts-and-manifestation)                        | Seta tracejada rotulada `<<manifest>>` do artefato ao componente        | O artefato é a realização física desse componente                                           |
| [Componente aninhado](#nested-components)                           | Componente desenhado dentro de outro componente                 | Estrutura interna, as *partes* de que o componente externo é composto                       |
| Nota                                                                | Retângulo com canto dobrado sobre uma linha tracejada           | Comentário sem semântica                                                                    |

Regras de nomenclatura que mantêm um diagrama legível:

- Componentes são nomeados conforme sua responsabilidade, como substantivo: `PaymentService`, não `DoPayment` e não `Payments2`.
- Interfaces são nomeadas conforme o serviço, geralmente com um `I` inicial: `IPayment`, `IInventory`.
- O mesmo nome de interface sempre se refere ao mesmo contrato. Um diagrama não deve usar um nome para duas coisas diferentes.

---

## Blocos de construção {/*#building-blocks*/}

### Componente {/*#component*/}

Um componente não tem tamanho fixo. Escolhas típicas são um serviço implantável, uma biblioteca, uma camada da arquitetura ou uma área autocontida do domínio.

```text
 ╭──────────────────────╮
 │ <<component>>     ⊞  │
 │ PaymentService       │
 ╰──────────────────────╯
```

### Interfaces fornecidas e requeridas {/*#provided-and-required-interfaces*/}

Sempre que possível, as dependências entre componentes são expressas por meio de interfaces, nunca por acesso direto a elementos internos. Para a exceção, ver [Dependências](#dependencies).

- Uma **interface fornecida** é desenhada como uma linha com um círculo preenchido na extremidade. É a promessa *isto é oferecido e pode ser usado*.
- Uma **interface requerida** é desenhada como uma linha com um semicírculo na extremidade. É a demanda *isto é necessário, alguém precisa fornecê-lo*.

```text
   provided interface                  required interface
   (ball, lollipop)                    (socket)

 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │            │ <<component>>     ⊞  │
 │ PaymentService       │───○        │ OrderService         │───C
 ╰──────────────────────╯            ╰──────────────────────╯
```

A ball carrega apenas o nome da interface. Sempre que as próprias operações importam, a interface é desenhada adicionalmente como um retângulo com a palavra-chave `<<interface>>` e sua lista de operações, e é ligada à ball.

### Conector de montagem {/*#assembly-connector*/}

Um conector de montagem liga uma interface requerida a uma fornecida. Graficamente, o socket é posicionado sobre a ball, e por isso a notação também é chamada de *ball and socket*.

```text
 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │ IPayment   │ <<component>>     ⊞  │
 │ OrderService         │───C○───────│ PaymentService       │
 ╰──────────────────────╯            ╰──────────────────────╯
```

O conector afirma que `OrderService` usa `PaymentService` **apenas** por meio de `IPayment`. Qualquer componente que forneça `IPayment` pode ocupar o lugar de `PaymentService`.

### Portas e conectores de delegação {/*#ports-and-delegation-connectors*/}

Uma porta é um ponto de interação explicitamente nomeado no limite de um componente. Ela é desenhada como um pequeno quadrado na borda e agrupa as interfaces acessíveis nesse ponto. As portas se tornam úteis assim que um componente oferece a mesma interface em vários lugares, por exemplo um ponto de entrada interno e um externo com regras de acesso diferentes.

Dentro do componente, um conector de delegação leva da porta à parte que de fato trata a requisição.

```text
               IOrdering
                   ○
                   │
 ╭─────────────────■─────────────────────────────────────────────╮
 │ <<component>>   │                                          ⊞  │
 │ OrderManagement │  delegation                                 │
 │                 │                                             │
 │    ╭────────────┴─────────╮            ╭──────────────────╮   │
 │    │ <<component>>     ⊞  │  IPricing  │ <<component>> ⊞  │   │
 │    │ OrderIntake          │───C○───────│ PricingEngine    │   │
 │    ╰──────────────────────╯            ╰──────────────────╯   │
 │                                                               │
 ╰───────────────────────────────────────────────────────────────╯
```

O mundo externo vê apenas `IOrdering` na porta. Que `OrderIntake` e `PricingEngine` existam por trás dela, e como estão conectados, pode ser alterado a qualquer momento.

### Componentes aninhados {/*#nested-components*/}

Componentes podem conter outros componentes. Os internos são as *partes* de que o externo é montado. O aninhamento é o que transforma um diagrama de componentes em uma ferramenta para vários níveis de abstração: o nível superior mostra um punhado de subsistemas, e cada um deles pode ser refinado em um diagrama próprio.

Duas regras mantêm o refinamento consistente:

- Toda interface do componente externo é delegada a uma parte interna ou realizada pelo próprio componente externo.
- Uma parte interna nunca é conectada diretamente ao exterior. A conexão sempre passa por uma porta do componente que a envolve.

### Artefatos e manifestação {/*#artifacts-and-manifestation*/}

Um componente é uma unidade lógica, um artefato é um arquivo físico. O relacionamento entre eles é chamado de *manifestação* e é desenhado como uma seta tracejada com a palavra-chave `<<manifest>>` apontando do artefato para o componente.

```text
 ╭──────────────────────────────╮
 │ <<artifact>>                 │
 │ payment-service.jar          │
 ╰───────────────┬──────────────╯
                 ╎
                 ╎ <<manifest>>
                 ▼
 ╭───────────────────────────────╮
 │ <<component>>              ⊞  │
 │ PaymentService                │
 ╰───────────────────────────────╯
```

O mapeamento não precisa ser um para um. Um artefato pode manifestar vários componentes, e um componente pode estar distribuído em vários artefatos, por exemplo uma implementação e um arquivo de configuração separado.

### Dependências {/*#dependencies*/}

Além de interfaces, uma dependência simples pode ser desenhada como uma seta tracejada com ponta aberta. Ela significa *a origem precisa do destino* sem nomear um contrato, e é a afirmação mais fraca e menos precisa.

Uma dependência é apropriada para relacionamentos que genuinamente não têm uma interface própria, como o uso de um modelo de dados compartilhado ou de um sistema externo que não é modelado em mais detalhes. Sempre que existe uma interface, a notação ball and socket é preferida, pois apenas ela diz *por meio de quê* a dependência ocorre.

---

## Mapeamento para a implementação {/*#mapping-to-implementation*/}

| Diagrama de componentes | Implementação típica                                                         |
| -------------------- | ------------------------------------------------------------------------------ |
| Componente           | Serviço implantável, módulo Maven/Gradle, pacote npm, assembly .NET            |
| Interface fornecida  | API pública de um módulo, recurso REST, tópico de mensagens                    |
| Interface requerida  | Dependência injetada, client stub                                              |
| Conector de montagem | Ligação no contêiner de injeção de dependência ou na composition root          |
| Porta                | Endpoint publicado, por exemplo uma URL base ou o nome de uma fila             |
| Conector de delegação | Encaminhamento do ponto de entrada para a classe interna que trata a requisição |
| Artefato             | Resultado do build: `.jar`, `.dll`, `.war`, imagem de contêiner, bundle         |
| Manifestação         | A etapa de build que empacota o código de um componente nesse arquivo          |
| Dependência          | Import ou `require` sem um contrato acordado                                    |

---

## Delimitação em relação a outros diagramas {/*#delimitation-from-other-diagrams*/}

### Diagrama de componentes e diagrama de classes {/*#component-diagram-and-class-diagram*/}

| Aspecto           | Diagrama de componentes                    | Diagrama de classes                   |
| ----------------- | ------------------------------------------ | ------------------------------------- |
| Unidade mostrada  | Subsistema, serviço, módulo                | Classe, atributo, operação            |
| Granularidade     | Grossa, um punhado de caixas por diagrama  | Fina, frequentemente dezenas de classes |
| Tipo de relacionamento | Interface fornecida/requerida, montagem | Associação, herança, agregação        |
| Pergunta respondida | Quais partes existem e como estão acopladas | Como uma parte é estruturada internamente |
| Público típico    | Arquitetura, limites de equipes, planejamento | Implementação de um único componente |

### Diagrama de componentes e diagrama de implantação {/*#component-diagram-and-deployment-diagram*/}

Um diagrama de componentes é *lógico*, um [diagrama de implantação](./deployment-diagram.md) é *físico*.

| Aspecto           | Diagrama de componentes                | Diagrama de implantação                    |
| ----------------- | -------------------------------------- | ------------------------------------------ |
| Elemento principal | Componente                            | Nó: hardware, máquina virtual, contêiner   |
| Pergunta respondida | Como o software é estruturado        | Onde o software é executado                |
| Relacionamentos   | Interfaces e conectores                | Caminhos de comunicação, protocolos        |
| Artefatos         | Aparecem como manifestação de um componente | Aparecem como implantação em um nó    |

---

## Exemplo: loja online {/*#example-online-shop*/}

A loja consiste em uma interface de usuário, um serviço de pedidos, um serviço de pagamento e um serviço de estoque. A interface de usuário nada sabe sobre como os pedidos são processados, ela só precisa de `IOrdering`. O serviço de pedidos, por sua vez, precisa de `IPayment` e `IStock` e não sabe quais componentes os fornecem.

```text
 ╭────────────────────╮          ╭────────────────────╮          ╭────────────────────╮
 │ <<component>>   ⊞  │IOrdering │ <<component>>   ⊞  │IPayment  │ <<component>>   ⊞  │
 │ ShopUI             │───C○─────│ OrderService       │───C○─────│ PaymentService     │
 ╰────────────────────╯          ╰──────────┬─────────╯          ╰────────────────────╯
                                            ∩
                                            ○  IStock
                                            │
                                 ╭──────────┴─────────╮
                                 │ <<component>>   ⊞  │
                                 │ StockService       │
                                 ╰────────────────────╯
```

O que este exemplo mostra:

- `ShopUI` tem exatamente um socket e está, portanto, acoplado a um único contrato. Um segundo front end, por exemplo um aplicativo móvel, pode ser adicionado sem alterar nada por trás de `IOrdering`.
- `OrderService` tem dois sockets. Um teste de `OrderService` precisa preencher ambos, com `PaymentService` e `StockService` ou com test doubles. Cada socket adicional é mais uma dependência a fornecer, de modo que um componente com muitos sockets é difícil de testar isoladamente.

Uma extensão realista envolveria `OrderService`, `PaymentService` e `StockService` em um componente `Backend` com uma única porta que expõe `IOrdering` e a delega a `OrderService`. `ShopUI` seria então conectado a essa porta, e a estrutura interna do backend se tornaria intercambiável.

---

## Erros comuns {/*#common-mistakes*/}

1. **Componentes conectados sem uma interface:** uma linha simples mostra que dois componentes estão acoplados, mas não por meio de qual contrato. Onde existe uma interface, ela é desenhada como ball and socket.
2. **Ball e socket trocados:** o círculo preenchido pertence ao componente que *oferece* o serviço, o semicírculo ao que *precisa* dele.
3. **Interface requerida sem fornecedor:** um socket aberto significa que o sistema não pode ser executado. Ou falta um componente ou o requisito está obsoleto.
4. **Classes desenhadas como componentes:** atributos, operações e associações pertencem ao diagrama de classes.
5. **Partes internas conectadas além do limite:** um conector de um componente interno diretamente ao exterior contorna a porta do componente que o envolve.
6. **Dependências cíclicas:** dois componentes que requerem as interfaces um do outro não podem mais ser construídos, implantados ou substituídos separadamente.
7. **Um nome de interface para contratos diferentes:** duas balls com o mesmo nome devem oferecer as mesmas operações.
8. **Componente e artefato confundidos:** `PaymentService` é o componente, `payment-service.jar` o artefato que o manifesta.
9. **Componentes demais em um diagrama:** caixas demais tornam um diagrama ilegível. Os detalhes pertencem a um diagrama separado que refina um único componente.

---

## Ferramentas {/*#tools*/}

- draw.io / diagrams.net (gratuito, baseado em navegador, biblioteca de formas UML incluída)
- PlantUML (baseado em texto, o diagrama é gerado a partir do código-fonte e pode ser versionado)
- Mermaid (baseado em texto, renderiza diretamente em Markdown em muitas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciais, com planos gratuitos)

## Veja também {/*#see-also*/}

- [Diagrama de Classes](./class-diagram.md): a estrutura de granularidade fina dentro de um único componente
- [Diagrama de Implantação](./deployment-diagram.md): a contraparte física, que mostra onde os artefatos dos componentes são executados
- [Diagrama de Sequência](./sequence-diagram.md): mostra como os componentes interagem ao longo do tempo por meio de suas interfaces
- [Diagrama de Atividades](./activity-diagram.md): os processos que atravessam os componentes
- [Visão Geral da UML](./uml-overview.mdx): classificação dos tipos de diagramas
- [Noções Básicas de Notação UML](./uml-notation-basics.md): palavras-chave, estereótipos, notas e os elementos comuns a todos os tipos de diagramas
