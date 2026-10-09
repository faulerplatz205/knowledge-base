---
title: "Modelo ER"
description: "Uma visão geral do modelo Entidade-Relacionamento: entidades, atributos, relacionamentos, cardinalidade, entidades fracas e notação de Chen."
keywords:
    - "Modelo ER"
    - "Entidade-Relacionamento"
    - "Projeto de Banco de Dados"
    - "Modelagem de Dados"
    - "Entidades"
    - "Atributos"
    - "Relacionamentos"
    - "Cardinalidade"
    - "Entidade Fraca"
    - "Notação de Chen"
tags:
    - ap2
machine_translated: true
---

# Modelo ER

O modelo Entidade-Relacionamento (ER) é um modelo de dados conceitual que descreve a estrutura de um banco de dados em alto nível e independentemente de qualquer sistema de banco de dados específico. Foi introduzido por Peter Chen em 1976. Na etapa seguinte do projeto, o modelo ER é transformado em um [esquema de banco de dados](./database-schema.md) composto por tabelas, chaves primárias e chaves estrangeiras.

## Conceitos Centrais {/*#core-concepts*/}

### Entidades {/*#entities*/}

Uma entidade, também chamada de **instância de entidade**, é um objeto do mundo real ou do pensamento identificável de forma única, p. ex., um cliente específico ou um pedido específico. Entidades do mesmo tipo são agrupadas em **tipos de entidade** (p. ex., `Customer`, `Product`, `Order`).

### Atributos {/*#attributes*/}

Os atributos descrevem as propriedades de um tipo de entidade.

| Tipo          | Descrição                          | Exemplo                         |
| ------------- | ---------------------------------- | ------------------------------- |
| Simples       | Valor atômico, indivisível         | `FirstName`, `Age`                |
| Composto      | Formado por subatributos           | `Address` = (Rua, Cidade, CEP)    |
| Multivalorado | Pode conter vários valores         | `PhoneNumbers`                         |
| Derivado      | Calculado a partir de outro atributo | `Age` derivado de `BirthDate`   |

O **atributo-chave** identifica de forma única cada instância de entidade, p. ex., `CustomerID`. Ele se torna então a chave primária no esquema de banco de dados.

### Relacionamentos {/*#relationships*/}

Um relacionamento descreve uma associação entre dois ou mais tipos de entidade. Assim como as entidades, os relacionamentos são agrupados em **tipos de relacionamento** (p. ex., um `Customer` *faz* um `Order`). O próprio tipo de relacionamento expressa essa associação, de modo que o modelo ER não contém chaves estrangeiras. Elas só aparecem quando o modelo é convertido para o esquema de banco de dados. Os relacionamentos também podem ter atributos próprios (p. ex., um relacionamento `WorksFor` pode conter um `StartDate`).

## Cardinalidade {/*#cardinality*/}

A cardinalidade define quantas instâncias de uma entidade podem estar associadas a instâncias de outra.

| Tipo | Descrição                                 | Exemplo                                                                   |
| ---- | ----------------------------------------- | ------------------------------------------------------------------------- |
| 1:1  | Uma instância se relaciona com exatamente uma outra | Uma pessoa tem um passaporte                                    |
| 1:N  | Uma instância se relaciona com várias outras | Um cliente faz vários pedidos                                          |
| N:M  | Várias instâncias se relacionam com várias outras | Alunos se matriculam em vários cursos; cursos têm vários alunos   |

A **participação** especifica ainda se cada instância de entidade deve tomar parte em um relacionamento:

- **Participação total** (obrigatória): Toda instância deve estar em pelo menos um relacionamento, p. ex., todo pedido deve pertencer a um cliente.
- **Participação parcial** (opcional): Algumas instâncias podem não participar, p. ex., nem todo cliente fez um pedido.

## Entidades Fracas {/*#weak-entities*/}

Uma **entidade fraca** não pode ser identificada de forma única apenas por seus próprios atributos. Ela depende de uma **entidade forte (proprietária)** para sua identidade.

- A entidade fraca possui uma **chave parcial** (discriminador) que é única apenas no contexto de seu proprietário.
- O relacionamento que liga uma entidade fraca ao seu proprietário é chamado de **relacionamento identificador**.
- Uma entidade fraca sempre tem participação total em seu relacionamento identificador.

**Exemplo:** `OrderItem` é uma entidade fraca. Sua chave parcial `LineNumber` é única apenas dentro de um `Order` específico. A identidade completa é `(OrderID, LineNumber)`.

## Notação {/*#notation*/}

| Elemento                           | Representa                                    |
| ---------------------------------- | --------------------------------------------- |
| Retângulo                          | Tipo de entidade                              |
| Retângulo de linha dupla           | Tipo de entidade fraca                        |
| Losango                            | Tipo de relacionamento                        |
| Losango de linha dupla             | Relacionamento identificador                  |
| Elipse                             | Atributo                                      |
| Elipse com nome sublinhado         | Atributo-chave                                |
| Elipse com sublinhado tracejado    | Chave parcial de uma entidade fraca           |
| Elipse de linha dupla              | Atributo multivalorado                        |
| Elipse tracejada                   | Atributo derivado                             |
| Elipse com outras elipses          | Atributo composto e seus subatributos         |
| Linha simples                      | Participação parcial                          |
| Linha dupla                        | Participação total                            |
| `1`, `N`, `M` ao lado de uma linha | Cardinalidade                    |

**Importante:** Diferentemente de um [diagrama de tabelas](./database-schema.md#table-diagram) ou de um [diagrama de classes UML](../uml/class-diagram.md), os atributos de uma entidade não são escritos dentro de seu retângulo. Cada atributo recebe sua própria elipse, ligada à entidade por uma linha.

## Exemplo: Gerenciamento de Pedidos {/*#example-order-management*/}

Um `Customer` faz `Orders`, cada um composto por um ou mais `OrderItems`. Todo pedido pertence a um cliente e contém pelo menos um item, de modo que `Order` participa totalmente em ambos os relacionamentos. Um cliente sem pedidos é permitido.

```text
  ╭────────────╮    ╭──────╮    ╭───────╮
  │ CustomerID │    │ Name │    │ Email │
  │ ────────── │    ╰───┬──╯    ╰───┬───╯
  ╰─────┬──────╯        │           │
        └───────────────┼───────────┘
                        │
                ┌───────┴───────┐
                │   Customer    │
                └───────┬───────┘
                        │ 1
                  ╱─────┴─────╲
                 ╱    places   ╲
                 ╲             ╱
                  ╲─────╥─────╱
                        ║ N
                ┌───────╨───────┐        ╭─────────╮
                │     Order     ├───┬────┤ OrderID │
                └───────╥───────┘   │    │ ─────── │
                        ║           │    ╰─────────╯
                        ║ 1         │    ╭───────────╮
                        ║           └────┤ OrderDate │
                  ╱═════╩═════╲          ╰───────────╯
                 ╱╱  contains ╲╲
                 ╲╲           ╱╱
                  ╲═════╦═════╱
                        ║ N
                ╔═══════╩═══════╗        ╭────────────╮
                ║   OrderItem   ╟───┬────┤ LineNumber │
                ╚═══════════════╝   │    │ ╌╌╌╌╌╌╌╌╌╌ │
                                    │    ╰────────────╯
                                    │    ╭──────────╮
                                    └────┤ Quantity │
                                         ╰──────────╯
```

## Erros Comuns {/*#common-mistakes*/}

1. **Atributos dentro do retângulo da entidade:** Um retângulo com uma lista de colunas é uma tabela de um esquema de banco de dados, não um tipo de entidade de Chen.
2. **Chaves estrangeiras como atributos:** `CustomerID` como atributo de `Order` duplica o relacionamento `places` e só pertence ao esquema de banco de dados, como chave estrangeira.
3. **Multiplicidades UML em um diagrama de Chen:** Em vez de intervalos UML como `1..*` ou `0..1`, Chen usa `1`, `N` e `M` e expressa o mínimo por meio de linhas simples ou duplas.
4. **Entidade fraca sem relacionamento identificador:** Um retângulo de linha dupla exige um losango de linha dupla que o ligue ao seu proprietário.

## Veja Também {/*#see-also*/}

- [Esquema de Banco de Dados](./database-schema.md): as tabelas, chaves e regras de transformação derivadas de um modelo ER
- [Fases do Desenvolvimento de Bancos de Dados](./database-development-phases.md): o modelo ER como resultado da fase conceitual
- [Normalização](./normalization.md): remoção de redundância das tabelas derivadas de um modelo ER
