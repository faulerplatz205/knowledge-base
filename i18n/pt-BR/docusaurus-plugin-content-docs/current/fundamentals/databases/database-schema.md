---
title: "Esquema de Banco de Dados"
description: "O esquema de banco de dados relacional: tabelas, chaves, notação, a transformação de um modelo ER em tabelas e a integridade referencial."
keywords:
    - "Esquema de Banco de Dados"
    - "Esquema Relacional"
    - "Modelo Relacional"
    - "Chave Primária"
    - "Chave Estrangeira"
    - "Chave Composta"
    - "Tabela de Junção"
    - "Integridade Referencial"
    - "Projeto de Banco de Dados"
tags:
    - ap2
machine_translated: true
---

# Esquema de Banco de Dados

Um esquema de banco de dados descreve a estrutura de um banco de dados relacional: suas tabelas, suas colunas com tipos de dados, as chaves e as referências entre as tabelas. Diferentemente do [modelo ER](./er-model.md), ele está vinculado ao modelo relacional. Os relacionamentos deixam de existir como elementos próprios e passam a ser expressos por chaves estrangeiras e tabelas de junção. O esquema é criado na fase semântica do [desenvolvimento de bancos de dados](./database-development-phases.md) e implementado na fase física com instruções `CREATE TABLE`.

## Terminologia {/*#terminology*/}

| Termo relacional | Termo comum          | Significado                                                       |
| ---------------- | -------------------- | ----------------------------------------------------------------- |
| Relação          | Tabela               | Conjunto de linhas com os mesmos atributos                        |
| Tupla            | Linha, registro      | Uma entrada de uma tabela                                         |
| Atributo         | Coluna               | Uma propriedade que toda linha da tabela possui                   |
| Domínio          | Tipo de dados        | Conjunto de valores que um atributo pode assumir                  |
| Esquema de relação | Definição de tabela | Nome da tabela e seus atributos                                  |
| Esquema de banco de dados | Estrutura do banco de dados | Todos os esquemas de relação de um banco de dados e suas restrições |

## Chaves {/*#keys*/}

- **Chave candidata:** Um conjunto mínimo de atributos que identifica de forma única cada linha. Uma tabela pode ter várias, p. ex. `CustomerID` e `Email`.
- **Chave primária (PK):** A chave candidata escolhida para identificar as linhas. Ela deve ser única e não pode ser `NULL`.
- **Chave composta:** Uma chave formada por vários atributos, p. ex. `(OrderID, LineNumber)`.
- **Chave estrangeira (FK):** Um ou mais atributos que referenciam a chave primária de outra tabela ou da mesma tabela. Ela também pode fazer parte da chave primária, como em uma tabela de junção ou na tabela de uma entidade fraca.
- **Chave natural:** Uma chave extraída dos próprios dados, p. ex. um ISBN.
- **Chave substituta:** Uma chave artificial sem significado fora do banco de dados, geralmente um número autoincrementado ou um UUID.

## Notação {/*#notation*/}

### Notação Textual {/*#textual-notation*/}

Cada tabela é escrita como seu nome seguido de seus atributos entre parênteses:

| Marcação                                                  | Significado                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| Sublinhado                                                | Chave primária; em uma chave composta, cada parte é sublinhada           |
| `#` ou `↑` no início, às vezes um sublinhado tracejado | Chave estrangeira                                                   |
| Sufixo `PK` ou `FK`                                 | Substituição em texto simples onde o sublinhado não é possível           |

Um atributo que é ao mesmo tempo chave primária e chave estrangeira é sublinhado e marcado com `#`.

### Diagrama de Tabelas {/*#table-diagram*/}

- **Caixa:** Uma tabela, com o nome da tabela como cabeçalho e as colunas abaixo da linha
- **`PK` e `FK`:** Marcador na frente de uma coluna; `PK FK` marca uma coluna que é ambas
- **Linha:** Referência de chave estrangeira entre duas tabelas
- **Extremidades da linha:** Cardinalidade, `1` ou `N`

## Transformação a partir de um Modelo ER {/*#transformation-from-an-er-model*/}

| Elemento ER                           | Esquema de banco de dados                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Tipo de entidade                      | Tabela                                                                                                 |
| Atributo                              | Coluna                                                                                                 |
| Atributo-chave                        | Chave primária                                                                                         |
| Atributo composto                     | Uma coluna por subatributo, p. ex. `Street`, `City`, `ZIP`                                           |
| Atributo multivalorado                | Tabela separada com uma chave estrangeira para o proprietário, p. ex. `PhoneNumbers (#CustomerID, Number)`                          |
| Atributo derivado                     | Geralmente não é armazenado, mas calculado na consulta                                                 |
| Relacionamento 1:1                    | Chave estrangeira com uma restrição `UNIQUE` em uma das duas tabelas                                    |
| Relacionamento 1:N                    | Chave estrangeira na tabela do lado N                                                                  |
| Relacionamento N:M                    | Tabela de junção cuja chave primária é formada pelas chaves estrangeiras para ambas as tabelas        |
| Atributo de relacionamento            | Coluna na tabela que contém a chave estrangeira; em N:M, na tabela de junção                           |
| Entidade fraca                        | Tabela cuja chave primária combina a chave primária do proprietário (também uma chave estrangeira) e a chave parcial |
| Participação total do lado N          | Chave estrangeira declarada `NOT NULL`                                                                    |

Um relacionamento N:M entre alunos e cursos com o atributo de relacionamento `EnrolledOn`:

```text
Students    (StudentID, Name)
             ─────────
Courses     (CourseID, Title)
             ────────
Enrollments (#StudentID, #CourseID, EnrolledOn)
             ──────────  ─────────
```

## Integridade Referencial {/*#referential-integrity*/}

Todo valor de chave estrangeira deve corresponder a um valor de chave primária existente na tabela referenciada ou ser `NULL`, quando a coluna o permitir. O SGBD rejeita uma inserção ou atualização que viole essa regra. O que acontece quando uma linha referenciada é excluída (`ON DELETE`) ou sua chave primária é alterada (`ON UPDATE`) é definido por chave estrangeira:

| Opção                  | Efeito da exclusão da linha referenciada                                           |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `RESTRICT` / `NO ACTION`      | A exclusão é rejeitada enquanto existirem linhas que a referenciam (padrão)        |
| `CASCADE`                | As linhas que a referenciam também são excluídas, p. ex. os itens de um pedido excluído |
| `SET NULL`                | A chave estrangeira é definida como `NULL`; a coluna deve permitir `NULL`        |

## Exemplo: Gerenciamento de Pedidos {/*#example-order-management*/}

O exemplo do [modelo ER](./er-model.md) se transforma em três tabelas. O relacionamento 1:N `places` se transforma na chave estrangeira `CustomerID` em `Orders`. O relacionamento identificador `contains` faz de `OrderID` parte da chave primária de `OrderItems`.

```text
Customers  (CustomerID, Name, Email)
            ──────────
Orders     (OrderID, #CustomerID, OrderDate)
            ───────
OrderItems (#OrderID, LineNumber, Quantity)
            ────────  ──────────
```

```text
┌─────────────────────┐          ┌──────────────────────┐
│ Customers           │          │ Orders               │
├─────────────────────┤          ├──────────────────────┤
│ PK     CustomerID   │1        N│ PK     OrderID       │
│        Name         ├──────────┤ FK     CustomerID    │
│        Email        │          │        OrderDate     │
└─────────────────────┘          └──────────┬───────────┘
                                            │ 1
                                            │
                                            │ N
                                 ┌──────────┴───────────┐
                                 │ OrderItems           │
                                 ├──────────────────────┤
                                 │ PK FK  OrderID       │
                                 │ PK     LineNumber    │
                                 │        Quantity      │
                                 └──────────────────────┘
```

```sql
CREATE TABLE Customers (
    CustomerID INT          PRIMARY KEY,
    Name       VARCHAR(100) NOT NULL,
    Email      VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Orders (
    OrderID    INT  PRIMARY KEY,
    CustomerID INT  NOT NULL,
    OrderDate  DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
);

CREATE TABLE OrderItems (
    OrderID    INT NOT NULL,
    LineNumber INT NOT NULL,
    Quantity   INT NOT NULL,
    PRIMARY KEY (OrderID, LineNumber),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID) ON DELETE CASCADE
);
```

## Erros Comuns {/*#common-mistakes*/}

1. **Linha sem coluna de chave estrangeira:** Uma linha entre duas tabelas não cria nenhuma referência enquanto a coluna de chave estrangeira estiver ausente na tabela do lado N.
2. **Chave estrangeira no lado 1:** Uma coluna `OrderID` em `Customers` só pode conter um pedido por cliente.
3. **N:M sem tabela de junção:** Uma coluna de chave estrangeira contém um valor por linha, de modo que uma chave estrangeira em qualquer uma das tabelas limita esse lado a um único parceiro.
4. **Tabela de junção apenas com chave substituta:** Se o par de chaves estrangeiras não for nem a chave primária nem `UNIQUE`, o mesmo aluno pode se matricular duas vezes no mesmo curso.
5. **Notação ER no esquema:** Losangos, elipses de atributos e nomes de relacionamentos pertencem ao diagrama ER. O esquema mostra tabelas, marcadores `PK` e `FK` e referências.
6. **Palavras reservadas como nomes de tabela:** `ORDER` e `GROUP` são reservadas em SQL e precisam ser colocadas entre aspas em cada instrução ou substituídas quando usadas como nomes de tabela.

## Veja Também {/*#see-also*/}

- [Modelo ER](./er-model.md): o modelo conceitual do qual o esquema é derivado
- [Fases do Desenvolvimento de Bancos de Dados](./database-development-phases.md): onde o esquema se situa entre a fase conceitual e a fase física
- [Normalização](./normalization.md): verificação de redundância nas tabelas de um esquema
- [Sublinguagens SQL](./sql-sublanguages.md): `CREATE TABLE` e as demais instruções DDL
