---
title: "Outros Diagramas UML"
description: "Diagramas de objetos, de pacotes, de comunicação, de tempo, de visão geral de interação, de estrutura composta e de perfil: finalidade, elementos centrais de notação, uso típico e a fronteira com o diagrama UML mais próximo."
keywords:
    - UML
    - Diagrama de Objetos
    - Diagrama de Pacotes
    - Diagrama de Comunicação
    - Diagrama de Tempo
    - Diagrama de Visão Geral de Interação
    - Diagrama de Estrutura Composta
    - Diagrama de Perfil
    - Estereótipo
    - Diagrama Estrutural
    - Diagrama Comportamental
tags:
    - ap2
machine_translated: true
---

# Outros Diagramas UML

## Visão geral {/*#overview*/}

A UML 2.5 define catorze tipos de diagrama. Os sete que não têm entradas próprias estão listados aqui.

| Diagrama                              | Categoria    | Pergunta central                                                                   |
| ------------------------------------- | ------------ | ---------------------------------------------------------------------------------- |
| Diagrama de objetos                   | Estrutura    | Quais instâncias concretas existem em um dado momento e como estão ligadas?        |
| Diagrama de pacotes                   | Estrutura    | Como o modelo é dividido em unidades e qual unidade depende de qual?               |
| Diagrama de comunicação               | Comportamento | Quais objetos trocam mensagens e por quais ligações?                              |
| Diagrama de tempo                     | Comportamento | Qual estado um elemento assume em qual ponto do eixo do tempo?                    |
| Diagrama de visão geral de interação  | Comportamento | Em qual ordem interações inteiras são executadas?                                 |
| Diagrama de estrutura composta        | Estrutura    | Como um classificador é construído internamente e por quais portas ele se comunica? |
| Diagrama de perfil                    | Estrutura    | Como a própria UML é estendida para um domínio ou uma plataforma?                  |

---

## Diagrama de objetos {/*#object-diagram*/}

Um instantâneo de um sistema em um momento específico: as instâncias que existem e as ligações entre elas. A notação é a do [diagrama de classes](./class-diagram.md), mas no nível de instância.

Elementos centrais de notação:

- **Especificação de instância:** retângulo com um nome sublinhado na forma `name : Class`; o nome ou a classe podem ser omitidos (`o7 : Order`, `: Order`, `o7`)
- **Valores de atributos:** no compartimento inferior como `attribute = value`
- **Ligação:** linha contínua simples entre duas instâncias, a contrapartida da associação no nível de instância; sem multiplicidades, porque uma ligação sempre une exatamente duas instâncias

O texto puro não consegue mostrar sublinhado; na notação real, os nomes `m1 : Customer` e `o7 : Order` são sublinhados:

```text
 ┌────────────────────┐              ┌────────────────────┐
 │ m1 : Customer      │   places     │ o7 : Order         │
 ├────────────────────┤──────────────├────────────────────┤
 │ name = "Meier"     │              │ total = 249.90     │
 │ city = "Kiel"      │              │ status = "paid"    │
 └────────────────────┘              └────────────────────┘
```

Uso típico: explicar um diagrama de classes complicado com um exemplo concreto, discutir uma constelação de dados específica, documentar dados de teste ou o estado em que um defeito ocorre.

---

## Diagrama de pacotes {/*#package-diagram*/}

Um diagrama de pacotes mostra como um modelo é dividido em unidades e qual unidade depende de qual. Pacotes não têm comportamento próprio.

Elementos centrais de notação:

- **Pacote:** retângulo com uma aba; o aninhamento é escrito graficamente ou como `shop::service`
- **Dependência:** seta tracejada que aponta do pacote que usa para o pacote usado
- **`«import»`:** torna os elementos públicos do pacote de destino utilizáveis sem qualificação
- **`«access»`:** a mesma relação, mas sem repassar adiante os nomes importados
- **`«merge»`:** copia conceitualmente o conteúdo do pacote de destino para o pacote de origem e o combina com ele
- **Organização em camadas:** pacotes dispostos uns sobre os outros, com todas as dependências apontando em uma única direção

```text
┌──────┐
│ shop │
├──────┴──────────────────┐
│                         │
│   ┌─────────┐           │
│   │ ui      │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────┐           │
│   │ service │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────────┐       │
│   │ persistence │       │
│   ├─────────────┴───┐   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
└─────────────────────────┘
```

Uso típico: arquiteturas em camadas, divisão de um sistema em módulos, visualização de dependências cíclicas antes que cheguem ao código.

Fronteira: um [diagrama de componentes](./component-diagram.md) descreve blocos de construção substituíveis que oferecem e requerem interfaces em tempo de execução, enquanto um diagrama de pacotes apenas organiza elementos de modelo e de código-fonte em tempo de projeto.

---

## Diagrama de comunicação {/*#communication-diagram*/}

Um diagrama de comunicação mostra quais objetos trocam mensagens e por quais ligações o fazem. Os objetos são posicionados livremente, e a ordem das mensagens decorre de sua numeração.

Elementos centrais de notação:

- **Objeto:** retângulo com um `name : Class` sublinhado, como no diagrama de objetos
- **Ligação:** linha contínua entre dois objetos
- **Mensagem:** pequena seta desenhada ao lado da ligação, rotulada `1: placeOrder()`
- **Números de sequência hierárquicos:** `1`, `1.1`, `1.2`, com `1.1` e `1.2` enviadas uma após a outra como parte do tratamento da mensagem `1`
- **Marcador de iteração e guardas:** `*` e `[condition]` como parte do rótulo da mensagem

```text
  ┌──────────┐   1: placeOrder() ►  ┌─────────────┐
  │ : Client │──────────────────────│ : OrderCtrl │
  └──────────┘   ◄ 1.3: confirm()   └─────────────┘
                                           │
                                           │ ▼ 1.1: checkStock()
                                           │ ▼ 1.2: reserve()
                                           │
                                    ┌─────────────┐
                                    │ : Warehouse │
                                    └─────────────┘
```

Uso típico: tornar visível quais objetos se comunicam entre si, avaliar o acoplamento de um projeto, pequenas interações em que a estrutura importa mais do que a ordem exata.

Fronteira: um [diagrama de sequência](./sequence-diagram.md) mostra a mesma interação ao longo de um eixo de tempo explícito, de cima para baixo, e oferece fragmentos combinados como `alt`, `opt` e `loop`. Objetos, mensagens e sua ordem podem ser transferidos de um diagrama para o outro, mas os fragmentos combinados não têm equivalente no diagrama de comunicação. Alternativas e laços são mais fáceis de ler em um diagrama de sequência, enquanto a rede de ligações é mais fácil de ver em um diagrama de comunicação.

---

## Diagrama de tempo {/*#timing-diagram*/}

Um diagrama de tempo mostra como o estado ou o valor de um ou mais elementos evolui ao longo de um eixo de tempo explícito.

Elementos centrais de notação:

- **Eixo do tempo:** horizontal, com uma escala, uma raia por linha de vida
- **Linha de vida de estado:** linha em degraus entre os estados listados no eixo vertical
- **Linha de vida de valor:** forma compacta em faixa, na qual um cruzamento marca a mudança de valor
- **Duração e restrição de tempo:** `{d..3*d}` e `{t = 0}`
- **Eventos e mensagens:** setas entre as raias
- **Marcas de escala:** unidades da escala de tempo

```text
 : Motor
           │
   active  │         ┌──────────────┐
           │         │              │
   idle    ├─────────┘              └──────────
           │         ├── {20..40} ──┤
           └────┬────┬────┬────┬────┬────┬────┬───► t
           0    10   20   30   40   50   60   70  ms
```

Uso típico: sistemas de tempo real e embarcados, protocolos de barramento e de rede, controle ligado a hardware, requisitos de latência, timeouts e tempos mínimos de permanência.

Fronteira: um [diagrama de máquina de estados](./state-machine-diagram.md) define quais estados e transições são possíveis, sem eixo de tempo. Um diagrama de tempo mostra quando um elemento se encontra em qual desses estados.

---

## Diagrama de visão geral de interação {/*#interaction-overview-diagram*/}

Um diagrama de visão geral de interação organiza vários diagramas de sequência, de comunicação ou de tempo em um único fluxo de controle, em que cada nó é uma interação completa.

Elementos centrais de notação:

- **Moldura:** com o cabeçalho `sd <name>`
- **Uso de interação:** retângulo com a palavra-chave `ref` e o nome de um diagrama de interação existente
- **Interação em linha:** um pequeno diagrama de sequência incorporado diretamente como nó
- **Elementos de controle:** todos os do diagrama de atividades, isto é, nó inicial, decisão, junção (merge), fork, join, nó final

```text
 ┌ sd Checkout ─────────────────────────────┐
 │                  ●                       │
 │                  │                       │
 │                  ▼                       │
 │          ┌───────────────┐               │
 │          │ ref  Login    │               │
 │          └───────────────┘               │
 │                  │                       │
 │             ╱─────────╲                  │
 │            ╱  paid ?   ╲                 │
 │            ╲           ╱                 │
 │             ╲─────────╱                  │
 │       [yes]  │       │  [no]             │
 │     ┌────────┘       └────────┐          │
 │     ▼                         ▼          │
 │ ┌───────────────┐   ┌───────────────┐    │
 │ │ ref  Ship     │   │ ref  Cancel   │    │
 │ └───────────────┘   └───────────────┘    │
 │     │                         │          │
 │     └────────┐       ┌────────┘          │
 │              ▼       ▼                   │
 │                  ◉                       │
 └──────────────────────────────────────────┘
```

Uso típico: a visão geral de um protocolo ou de uma transação de negócio de longa duração que consiste em muitas interações individuais.

Fronteira: um [diagrama de atividades](./activity-diagram.md) usa os mesmos elementos de controle, mas seus nós são ações individuais. O diagrama de visão geral de interação também é uma alternativa a um diagrama de sequência superdimensionado, repleto de fragmentos `alt` e `loop` aninhados.

---

## Diagrama de estrutura composta {/*#composite-structure-diagram*/}

Um diagrama de estrutura composta olha para dentro de um único classificador: de quais partes ele consiste, como essas partes são interligadas e por quais pontos de interação ele está conectado ao seu ambiente.

Elementos centrais de notação:

- **Parte:** retângulo dentro da moldura do classificador, escrito como `role : Type` com uma multiplicidade opcional, p. ex. `wheels : Wheel [4]`
- **Porta:** pequeno quadrado na borda do classificador, um ponto de interação nomeado e tipado
- **Interfaces:** interface fornecida como pirulito `─○`, interface requerida como socket `─(`
- **Conectores:** conector de montagem entre duas partes, conector de delegação entre uma parte e uma porta
- **Colaboração:** elipse tracejada com papéis nomeados, que descreve um padrão de cooperação independentemente de classes concretas

```text
 ┌ Car ──────────────────────────────────────┐
 │                                           │
 │ ┌────────────┐        ┌──────────────┐    │
 │ │ e : Engine │────────│ g : Gearbox  │────┼──□───○ Drive
 │ └────────────┘        └──────────────┘    │
 │                                           │
 └───────────────────────────────────────────┘
```

Uso típico: a arquitetura interna de um componente, a interligação de partes no projeto de sistemas e de sistemas embarcados, a descrição de um padrão de projeto como colaboração de papéis.

Fronteira: um [diagrama de classes](./class-diagram.md) diz quais classes se relacionam em geral, enquanto um diagrama de estrutura composta diz como as instâncias dentro de um todo são interligadas em um papel específico. Um [diagrama de componentes](./component-diagram.md) usa a mesma notação de pirulito e socket, mas no nível dos blocos de construção implantáveis do sistema como um todo, e não do interior de um único classificador.

---

## Diagrama de perfil {/*#profile-diagram*/}

Um diagrama de perfil estende a própria UML para um domínio ou uma plataforma de destino.

Elementos centrais de notação:

- **Perfil:** pacote com a palavra-chave `«profile»`
- **Estereótipo:** retângulo com a palavra-chave `«stereotype»`, que estende uma metaclasse existente; qualquer nome entre aspas angulares que não seja uma palavra-chave UML predefinida é um estereótipo definido em algum perfil
- **Extensão:** linha contínua com ponta de seta preenchida do estereótipo até a metaclasse, p. ex. `«metaclass» Class`
- **Valor etiquetado:** atributo do estereótipo, p. ex. `table : String`, preenchido no elemento que carrega o estereótipo
- **Restrição:** regra entre chaves, escrita em OCL ou em texto livre
- **Aplicação:** dependência `«apply»` de um pacote para o perfil; seus elementos podem então carregar `«entity»`, `«controller»` e assim por diante

```text
 ┌ «profile» Persistence ─────────────────────┐
 │                                            │
 │  ┌─────────────────┐     ┌───────────────┐ │
 │  │ «stereotype»    │────►│ «metaclass»   │ │
 │  │ Entity          │     │ Class         │ │
 │  ├─────────────────┤     └───────────────┘ │
 │  │ table : String  │                       │
 │  └─────────────────┘                       │
 └────────────────────────────────────────────┘
```

Relação com o metamodelo: a UML é descrita por uma arquitetura de quatro camadas. `M0` contém os objetos reais, `M1` o modelo, `M2` o metamodelo da UML, que define o que é uma classe ou uma associação, e `M3` o MOF (Meta Object Facility), a linguagem na qual o próprio metamodelo é escrito. Um perfil é o mecanismo de extensão leve da UML: ele estende a camada `M2` sem modificá-la, razão pela qual modelos com perfis ainda podem ser trocados entre ferramentas. Uma extensão pesada alteraria o metamodelo diretamente e, com isso, criaria uma nova linguagem.

Uso típico: linguagens de modelagem específicas de domínio, como SysML ou MARTE, mapeamento de um modelo para uma plataforma como JPA ou EJB, convenções de modelagem de toda a empresa.

---

## Veja também {/*#see-also*/}

- [Visão Geral da UML](./uml-overview.mdx): classificação de todos os tipos de diagrama em estrutura e comportamento
- [Noções Básicas de Notação UML](./uml-notation-basics.md): elementos compartilhados por todo diagrama UML, incluindo palavras-chave, estereótipos e notas
- [Diagrama de Classes](./class-diagram.md): a base dos diagramas de objetos, de pacotes e de estrutura composta
- [Diagrama de Sequência](./sequence-diagram.md): a contrapartida orientada ao tempo do diagrama de comunicação
- [Modelo ER](../databases/er-model.md): modela os dados cujas instâncias concretas um diagrama de objetos mostra
