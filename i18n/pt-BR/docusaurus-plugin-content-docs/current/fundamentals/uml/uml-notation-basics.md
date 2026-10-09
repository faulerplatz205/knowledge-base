---
title: "Noções Básicas de Notação UML"
description: "Notação UML comum a todos os diagramas: marcadores de visibilidade, multiplicidades e como lê-las, palavras-chave, estereótipos, notas, valores etiquetados, restrições, nomes de papel, convenções de nomenclatura e molduras de diagrama."
keywords:
    - UML
    - Notação
    - Visibilidade
    - Multiplicidade
    - Palavra-chave
    - Estereótipo
    - Valor Etiquetado
    - Restrição
    - Nome de Papel
    - Moldura de Diagrama
tags:
    - ap2
machine_translated: true
---

# Noções Básicas de Notação UML

## Visão geral {/*#overview*/}

Um punhado de elementos de notação aparece em quase todo diagrama UML, independentemente do tipo de diagrama. Marcadores de visibilidade, multiplicidades, palavras-chave e estereótipos, notas, restrições e molduras de diagrama têm o mesmo significado em um [diagrama de classes](./class-diagram.md), em um [diagrama de componentes](./component-diagram.md) e em um [diagrama de máquina de estados](./state-machine-diagram.md).

---

## Visibilidade {/*#visibility*/}

A visibilidade indica quem pode acessar uma característica (atributo, operação ou membro de um pacote ou componente). É escrita como um único caractere diretamente antes do nome da característica.

| Marcador | Nome       | Acesso concedido a                                         | Uso típico                              |
| -------- | ---------- | ---------------------------------------------------------- | --------------------------------------- |
| `+`  | público    | Todo elemento que pode ver o classificador                 | Interface de uma classe                 |
| `-`  | privado    | Somente o próprio classificador                            | Estado interno, operações auxiliares    |
| `#`  | protegido  | O classificador e suas especializações (subclasses)        | Pontos de extensão para subclasses      |
| `~`  | pacote     | Todo elemento no mesmo pacote                              | Colaboração dentro de um módulo         |

Dois outros marcadores são frequentemente confundidos com visibilidade, mas expressam outra coisa:

- `/` antes de um nome marca uma característica **derivada**, cujo valor é calculado a partir de outras características (`/ age` a partir de `dateOfBirth`).
- Um nome sublinhado marca uma característica **estática**, que pertence ao classificador e não a um objeto individual.

A classe a seguir usa todos esses marcadores. O texto puro não consegue mostrar sublinhado, de modo que o atributo estático `MAX_LIMIT` é marcado com `(static)`:

```text
┌──────────────────────────────────────┐
│               Account                │
├──────────────────────────────────────┤
│ + accountNumber: String              │
│ - balance: Decimal                   │
│ # owner: Customer                    │
│ ~ auditLog: LogEntry [0..*]          │
│ / available: Decimal                 │
│ + MAX_LIMIT: Decimal = 5000 (static) │
├──────────────────────────────────────┤
│ + deposit(amount: Decimal)           │
│ + withdraw(amount: Decimal): Bool    │
│ - validate(amount: Decimal): Bool    │
└──────────────────────────────────────┘
```

A visibilidade é opcional na UML. A ausência de marcador significa *não especificado*, e não *público*, embora muitas ferramentas adotem público como padrão.

---

## Multiplicidades {/*#multiplicities*/}

Uma multiplicidade indica quantos objetos podem participar em uma extremidade de uma associação, ou quantos valores um atributo pode conter. É escrita ao lado da extremidade da associação ou entre colchetes após o tipo do atributo.

| Notação  | Intervalo                | Leitura                                                  |
| -------- | ------------------------ | -------------------------------------------------------- |
| `1`  | exatamente 1             | Obrigatório, exatamente um objeto                        |
| `0..1`  | 0 ou 1                   | Opcional, no máximo um objeto                            |
| `*`  | 0 a ilimitado            | Forma abreviada de `0..*`, sem limite inferior implícito de 1 |
| `0..*`  | 0 a ilimitado            | Opcional, qualquer quantidade                            |
| `1..*`  | 1 a ilimitado            | Obrigatório, pelo menos um                               |
| `n..m`  | n a m                    | Intervalo explícito, por exemplo `2..4`                 |
| `5`  | exatamente 5             | Número fixo                                              |
| `1..3,7`  | 1 a 3, ou exatamente 7   | Vários intervalos                                        |

Regras para ler e escrever multiplicidades:

- A multiplicidade é colocada ao lado da classe que descreve e indica quantos objetos dessa classe estão ligados a um objeto na outra extremidade.
- O limite inferior decide se o relacionamento é opcional (`0`) ou obrigatório (`1` ou maior).
- O limite superior decide se a implementação mantém uma única referência (`1`) ou uma coleção (`*`).
- Uma multiplicidade omitida é formalmente indefinida; a maioria das ferramentas e dos livros-texto a interpreta como `1`.

### Leitura de uma associação {/*#reading-an-association*/}

```text
┌──────────────┐ 1          0..* ┌──────────────┐
│   Customer   ├─────────────────┤    Order     │
└──────────────┘   places   ▶    └──────────────┘
```

A frase é construída a partir da classe em uma extremidade, do nome da associação e da multiplicidade na outra extremidade, e depois repetida no sentido oposto:

- Um `Customer` faz **zero ou mais** objetos `Order`.
- Um `Order` é feito por **exatamente um** `Customer`.

O pequeno triângulo preenchido `▶` após o nome da associação é o marcador de **sentido de leitura**. Indica em qual sentido o nome forma uma frase e não carrega nenhuma outra semântica. O triângulo é opcional; sem ele, o nome é lido da esquerda para a direita ou de cima para baixo.

---

## Palavras-chave e estereótipos {/*#keywords-and-stereotypes*/}

Um rótulo entre aspas angulares (`«…»`) acrescenta significado a um elemento de modelo existente sem inventar uma nova forma para ele. É escrito acima ou antes do nome do elemento.

```text
┌──────────────────────┐
│     «interface»      │
│      Printable       │
├──────────────────────┤
│ + print(): void      │
└──────────────────────┘
```

Onde as aspas angulares não estão disponíveis, os colchetes angulares duplos `<<interface>>` são aceitos como substituto, e é por isso que as duas grafias aparecem na prática.

Dois tipos de rótulo são escritos dessa forma:

- Uma **palavra-chave** é predefinida pela própria UML. Nomeia uma metaclasse ou uma variante fixa dela, é reservada e pode ser usada sem declarar nada antes.
- Um **estereótipo** é definido pelo modelador ou por uma ferramenta e adapta um elemento a um domínio, a uma tecnologia ou a um padrão da empresa. Só tem significado onde é definido.

Palavras-chave predefinidas pela UML:

| Palavra-chave              | Aplica-se a                    | Significado                                      |
| -------------------------- | ------------------------------ | ------------------------------------------------ |
| `<<interface>>`                    | Classe                         | Declara operações sem implementação              |
| `<<enumeration>>`                    | Classe                         | Um tipo com um conjunto fixo de literais         |
| `<<include>>`                    | Relacionamento de caso de uso  | Um caso de uso sempre usa outro                  |
| `<<extend>>`                    | Relacionamento de caso de uso  | Um caso de uso estende opcionalmente outro       |
| `<<use>>`                    | Dependência                    | O cliente requer o fornecedor                    |
| `<<create>>`                    | Mensagem                       | A mensagem cria o objeto receptor                |
| `<<destroy>>`                    | Mensagem                       | A mensagem destrói o objeto receptor             |
| `<<device>>`                    | Nó                             | Um componente físico de hardware                 |
| `<<executionEnvironment>>`                    | Nó                             | Ambiente de execução em um dispositivo           |
| `<<artifact>>`                    | Artefato                       | Um arquivo implantável                           |

Estereótipos se somam a essas palavras-chave e são igualmente legítimos, desde que estejam definidos em algum lugar; em um projeto pequeno, uma legenda curta com os estereótipos em uso é suficiente. Exemplos clássicos da modelagem de análise são `<<entity>>` para um objeto de negócio persistente, `<<boundary>>` para um elemento na fronteira do sistema e `<<control>>` para um elemento coordenador.

---

## Notas e comentários {/*#notes-and-comments*/}

Uma nota é um retângulo com um canto dobrado, ligado ao elemento que comenta por uma linha tracejada. Não carrega semântica; é texto livre para o leitor.

```text
┌──────────────┐         ┌───────────────────────────┐
│   Invoice    │- - - - -│ Net amounts only, VAT is  └─┐
└──────────────┘         │ added by the tax service.   │
                         └─────────────────────────────┘
```

Orientações para o uso de notas:

- Uma nota explica o *porquê*, e não o *quê*; repetir o nome do elemento em prosa não acrescenta nada.
- Uma nota pode ser ligada a vários elementos por várias linhas tracejadas.
- Suposições, questões em aberto e decisões com sua justificativa são conteúdo típico.
- Um modelo que só se torna compreensível por suas notas geralmente tem um problema estrutural.

---

## Valores etiquetados {/*#tagged-values*/}

Um valor etiquetado associa uma propriedade nomeada a um elemento de modelo, escrito como `name = value` entre chaves. Valores etiquetados normalmente são introduzidos por um estereótipo, que define quais etiquetas existem e o que significam.

```text
┌───────────────────────────────────┐
│             «entity»              │
│             Customer              │
│ {table = "CUST", schema = "crm"}  │
└───────────────────────────────────┘
```

Aplicações típicas:

- Informações técnicas de mapeamento, por exemplo o nome de uma tabela ou coluna para persistência
- Metadados de processo, como `{author = "Team A", version = "1.2", status = "reviewed"}`
- Requisitos não funcionais, como `{maxResponseTime = "200ms"}`
- Dicas de geração de código consumidas por uma cadeia de ferramentas orientada a modelos

Vários valores etiquetados são separados por vírgulas dentro de um único par de chaves, ou escritos em linhas separadas em uma nota ligada ao elemento.

---

## Restrições {/*#constraints*/}

Uma restrição é uma condição que precisa ser satisfeita para que o modelo seja válido. É escrita entre chaves, diretamente no elemento ou em uma nota ligada a ele.

| Restrição                | Aplica-se a                | Significado                                                 |
| ------------------------ | -------------------------- | ----------------------------------------------------------- |
| `{readOnly}`                  | Atributo, extremidade      | O valor é definido uma vez e não é modificado depois        |
| `{abstract}`                  | Classe, operação           | Sem implementação, alternativa ao itálico                   |
| `{xor}`                  | Duas associações           | Exatamente uma das duas associações pode ser instanciada    |
| `{complete, disjoint}`                  | Conjunto de generalização  | Todo objeto pertence a exatamente uma subclasse             |

Uma restrição em texto livre é igualmente válida e muito mais comum na prática:

```text
┌──────────────┐         ┌─────────────────────────────┐
│   Account    │- - - - -│ {balance >= overdraftLimit} └─┐
└──────────────┘         └───────────────────────────────┘
```

### OCL {/*#ocl*/}

Para condições que precisam ser formuladas de modo formal, a OMG define a **Object Constraint Language** (OCL), uma linguagem textual separada usada junto com a UML. A condição da nota acima, escrita em OCL:

```text
context Account
  inv: balance >= overdraftLimit
```

`context` nomeia a classe à qual a condição se aplica, `inv` marca uma invariante, uma condição que precisa valer o tempo todo. Na prática, uma condição informal entre chaves costuma ser suficiente; o que importa é que esteja ligada ao elemento correto.

---

## Nomes de papel e navegabilidade {/*#role-names-and-navigability*/}

Uma extremidade de associação pode levar um **nome de papel**, que indica a função que a classe desempenha nesse relacionamento. O nome de papel é escrito na extremidade que descreve, em minúsculas, e se torna o nome do atributo na implementação.

```text
┌──────────────┐ employer        employee ┌──────────────┐
│   Company    ├──────────────────────────┤    Person    │
└──────────────┘ 1                    0..*└──────────────┘
```

Leitura: um `Person` tem exatamente um `Company` no papel `employer`, e um `Company` tem zero ou mais objetos `Person` no papel `employee`. A implementação teria um campo `employer` em `Person` e uma coleção `employee` em `Company`.

Nomes de papel se tornam indispensáveis quando duas classes estão conectadas mais de uma vez, ou quando uma classe está associada a si mesma:

```text
┌────────────────────┐
│      Employee      │
└──┬──────────────┬──┘
   │ 0..1         │ 0..*
   │ supervisor   │ subordinate
   └──────────────┘
```

Leitura: um `Employee` tem no máximo um outro `Employee` no papel `supervisor` e zero ou mais no papel `subordinate`.

Elementos que dão uma direção a uma associação:

- **Sentido de leitura (`▶`):** ao lado do nome da associação, puramente um auxílio de leitura
- **Navegabilidade (ponta de seta aberta):** em uma extremidade, essa extremidade pode ser alcançada a partir da outra
- **Não navegabilidade (pequena cruz `x`):** em uma extremidade, essa extremidade explicitamente não pode ser alcançada
- **Sem pontas de seta:** navegabilidade não especificada, na prática interpretada como *navegável nos dois sentidos*

---

## Convenções de nomenclatura {/*#naming-conventions*/}

As convenções a seguir não fazem parte da especificação UML, mas são quase universais na prática.

| Elemento              | Convenção                                  | Exemplo                       |
| --------------------- | ------------------------------------------ | ----------------------------- |
| Classe                | PascalCase, substantivo no singular        | `Invoice`, `CustomerAccount`              |
| Interface             | PascalCase, frequentemente um adjetivo     | `Printable`, `Comparable`              |
| Atributo              | camelCase, substantivo                     | `orderDate`, `totalAmount`             |
| Operação              | camelCase, verbo + objeto                  | `calculateTotal()`                      |
| Nome de papel         | camelCase, substantivo que nomeia o papel  | `employer`, `lineItems`            |
| Nome de associação    | Verbo na terceira pessoa do singular       | `places`, `contains`            |
| Pacote                | Minúsculas, singular                       | `billing`, `reporting`            |
| Caso de uso           | Verbo + objeto no infinitivo               | `Place order`                      |
| Ator                  | Substantivo de papel, nunca o nome de uma pessoa | `Customer`, `Payment Service`      |
| Ação                  | Verbo + objeto no infinitivo               | `Validate order`                      |
| Estado                | Adjetivo ou particípio                     | `Paid`, `Awaiting approval`            |
| Componente            | Substantivo que descreve o serviço         | `OrderService`                      |
| Nó                    | Substantivo que descreve dispositivo ou host | `Application Server`                    |

Duas regras valem para todos eles:

- Um nome para um conceito em todo o modelo; uma classe chamada `Customer` em um diagrama não é `Client` no seguinte.
- O idioma do modelo é escolhido uma única vez, para o modelo inteiro, e não é misturado.

---

## Molduras de diagrama {/*#diagram-frames*/}

Todo diagrama UML pode ser desenhado dentro de uma moldura: um retângulo cujo canto superior esquerdo leva uma etiqueta pentagonal com o tipo e o nome do diagrama.

```text
┌─────────────────────────────────────────────┐
│ sd Place Order ╱                            │
├───────────────┘                             │
│                                             │
│          (contents of the diagram)          │
│                                             │
└─────────────────────────────────────────────┘
```

O cabeçalho da moldura segue o padrão `<kind> <name>`, opcionalmente com parâmetros. Palavras-chave de tipo comuns, na forma curta e na forma longa que as ferramentas também aceitam:

| Curta     | Longa            | Diagrama                          |
| --------- | ---------------- | --------------------------------- |
| `sd`  | `interaction`         | Sequência, comunicação, tempo     |
| `act`  | `activity`         | Atividades                        |
| `stm`  | `state machine`         | Máquina de estados                |
| `cmp`  | `component`         | Componentes                       |
| `dep`  | `deployment`         | Implantação                       |
| `cls`  | `class`         | Classes                           |
| `uc`  | `use case`         | Casos de uso                      |
| `pkg`  | `package`         | Pacotes                           |

Quando a moldura é exigida em vez de opcional:

- Em um [diagrama de sequência](./sequence-diagram.md), em que a moldura é padrão e fragmentos combinados aninhados (`alt`, `opt`, `loop`, `ref`) são desenhados como molduras próprias
- Sempre que um diagrama é referenciado a partir de outro, pois a referência usa o nome da moldura
- Sempre que vários diagramas aparecem em uma página ou em um documento e precisam ser diferenciados

Para um único diagrama em sua própria página, a moldura geralmente é omitida e um título toma seu lugar.

---

## Mapeamento para código {/*#mapping-to-code*/}

| Notação                    | Construção no programa                          |
| -------------------------- | ----------------------------------------------- |
| `+`                   | `public`                                        |
| `-`                   | `private`                                        |
| `#`                   | `protected`                                        |
| `~`                   | Package-private em Java, `internal` em C#         |
| Nome sublinhado            | `static`                                        |
| `/` antes de um nome  | Getter que calcula o valor, sem campo armazenado |
| `1`                   | Campo que não pode ser `null`                 |
| `0..1`                   | Campo anulável, `Optional<T>`, `T?`              |
| `{readOnly}`                   | `final`, `readonly`, `const`                    |
| `<<interface>>`                   | `interface`                                        |
| `<<enumeration>>`                   | `enum`                                        |
| `{abstract}`                   | `abstract class`                                        |
| Nome de papel              | Nome do campo que contém a referência           |
| `inv` em OCL            | Verificação no construtor e em cada setter      |

---

## Erros comuns {/*#common-mistakes*/}

1. **Confundir `-` com um traço:** um `-` inicial é o marcador de visibilidade *privado*, e não decoração; um atributo privado não é acessível a partir de outra classe.
2. **Ler `*` como "muitos, mas pelo menos um":** `*` significa `0..*`; se pelo menos um objeto é exigido, a notação é `1..*`.
3. **Multiplicidade na extremidade errada:** a multiplicidade ao lado de uma classe indica quantos objetos *dessa* classe participam, vistos a partir da extremidade oposta.
4. **Chaves e aspas angulares trocadas:** `{...}` contém uma restrição ou um valor etiquetado, `«...»` uma palavra-chave ou um estereótipo; os dois não são intercambiáveis.
5. **Estereótipos sem definição:** um estereótipo inventado e não explicado em lugar algum é decoração, e não informação.
6. **Nome de papel idêntico ao nome da classe:** um papel `customer` em um `Customer` não acrescenta nada; um nome de papel só vale a pena quando diz mais do que o tipo.
7. **Notas que carregam semântica do modelo:** uma condição que o sistema precisa impor pertence a uma restrição, e não a uma nota em prosa.
8. **Sentido de leitura confundido com navegabilidade:** o triângulo preenchido `▶` diz respeito à frase, e a ponta de seta aberta diz respeito ao acesso.
9. **Idiomas misturados e nomes inconsistentes:** o mesmo conceito sob dois nomes produz dois conceitos na cabeça do leitor.
10. **Omitir a visibilidade em todo lugar e implementar tudo como público:** uma visibilidade não especificada é uma lacuna no modelo, e não uma decisão.

---

## Ferramentas {/*#tools*/}

- draw.io / diagrams.net (gratuito, baseado em navegador, biblioteca de formas UML incluída)
- PlantUML (baseado em texto, suporta estereótipos, valores etiquetados e molduras diretamente no código-fonte)
- Mermaid (baseado em texto, renderizado em Markdown, suporta um subconjunto da notação)
- Visual Paradigm, StarUML, Enterprise Architect (comerciais, com suporte a OCL)

## Veja também {/*#see-also*/}

- [Visão Geral da UML](./uml-overview.mdx): os tipos de diagrama da UML e como se relacionam entre si
- [Diagrama de Classes](./class-diagram.md): onde visibilidade, multiplicidade e nomes de papel são usados com mais intensidade
- [Diagrama de Atividades](./activity-diagram.md): notas e molduras em um diagrama comportamental
- [Diagrama de Casos de Uso](./use-case-diagram.md): as palavras-chave `<<include>>` e `<<extend>>` em contexto
- [Diagrama de Sequência](./sequence-diagram.md): molduras como fragmentos combinados
- [Diagrama de Máquina de Estados](./state-machine-diagram.md): guardas e restrições em transições
- [Diagrama de Componentes](./component-diagram.md): palavras-chave em componentes e interfaces
- [Diagrama de Implantação](./deployment-diagram.md): as palavras-chave de nó `<<device>>` e `<<executionEnvironment>>`
- [Outros Diagramas UML](./further-uml-diagrams.md): os demais tipos de diagrama e suas palavras-chave de moldura
- [Modelo ER](../databases/er-model.md): cardinalidades na modelagem de dados em comparação com as multiplicidades da UML
