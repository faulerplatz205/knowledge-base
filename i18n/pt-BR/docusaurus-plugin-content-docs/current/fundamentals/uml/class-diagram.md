---
title: "Diagrama de Classes"
description: "Explicação abrangente dos diagramas de classes da UML. Inclui estrutura, visibilidade, relacionamentos, cardinalidade, boas práticas e um exemplo baseado em um sistema de biblioteca."
keywords:
    - UML
    - Diagrama de Classes
last_update:
    author: moritz-grimm
tags:
    - ap2
machine_translated: true
---

# Diagrama de Classes

## Definição {/*#definition*/}

Um diagrama de classes é um diagrama estrutural da UML que visualiza a estrutura estática de um sistema, mostrando classes, seus atributos, métodos e os relacionamentos entre elas. É um dos diagramas mais utilizados na programação orientada a objetos e no design de software.

## Finalidade {/*#purpose*/}

Diagramas de classes são usados para:

- Modelar a estrutura de um sistema
- Visualizar relacionamentos entre classes
- Planejar a arquitetura de software antes da implementação
- Documentar a estrutura de código existente
- Comunicar decisões de design aos membros da equipe

## Componentes {/*#components*/}

### Classes {/*#classes*/}

Uma classe é representada como um retângulo dividido em três seções:

```text
┌─────────────────┐
│   ClassName     │  ← Class name (PascalCase)
├─────────────────┤
│   - attribute   │  ← Attributes (camelCase)
│   # attribute   │
├─────────────────┤
│   + method()    │  ← Methods (camelCase)
└─────────────────┘
```

### Atributos {/*#attributes*/}

Atributos representam os dados/propriedades de uma classe.

**Sintaxe:** `visibility name: dataType`

Exemplo: `- email: String`

### Métodos {/*#methods*/}

Métodos representam o comportamento/as funções de uma classe.

**Sintaxe:** `visibility methodName(parameter: type): returnType`

Exemplo: `+ getName(): String`

### Modificadores de visibilidade {/*#visibility-modifiers*/}

| Símbolo | Visibilidade | Significado                        | Quando usar              |
| ------ | ---------- | ---------------------------------- | ------------------------ |
| `-`    | Privada    | Acessível apenas dentro da classe  | Padrão para atributos    |
| `#`    | Protegida  | Acessível na classe e nas subclasses | Para atributos herdados |
| `+`    | Pública    | Acessível de qualquer lugar        | Padrão para métodos      |
| `~`    | Pacote     | Acessível dentro do mesmo pacote   | Raramente usada          |

## Relacionamentos {/*#relationships*/}

### Associação {/*#association*/}

Um relacionamento geral entre duas classes, indicando que objetos de uma classe estão conectados a objetos de outra.

**Notação:** Linha contínua conectando duas classes

**Exemplo:** Um `Customer` está associado a um `Order`

```text
Customer ────── Order
```

### Agregação (posse fraca) {/*#aggregation-weak-ownership*/}

Um tipo especial de associação em que uma classe é um contêiner para outra, mas a classe contida pode existir de forma independente.

**Notação:** Losango vazado do lado do contêiner

**Exemplo:** Uma `Library` tem `Books`, mas os livros podem existir sem a biblioteca

```text
Library ◇────── Book
```

**Lembrete:** Se o contêiner for destruído, os objetos contidos sobrevivem.

### Composição (posse forte) {/*#composition-strong-ownership*/}

Uma forma mais forte de agregação em que a classe contida não pode existir sem o contêiner.

**Notação:** Losango preenchido do lado do contêiner

**Exemplo:** Um `Book` tem `Chapters`, capítulos não podem existir sem o livro

```text
Book ◆────── Chapter
```

**Lembrete:** Se o contêiner for destruído, os objetos contidos também são destruídos.

### Herança {/*#inheritance*/}

Representa um relacionamento em que uma classe (subclasse/filha) herda atributos e métodos de outra classe (superclasse/pai).

**Notação:** Seta vazada apontando para a classe pai

**Exemplo:** `Dog` e `Cat` herdam de `Animal`

```text
      Animal
         △
         │
    ┌────┴────┐
    │         │
   Dog       Cat
```

**Importante:** Atributos herdados na classe pai devem usar visibilidade `protected` (`#`) para que as subclasses possam acessá-los.

## Cardinalidade (multiplicidade) {/*#cardinality-multiplicity*/}

A cardinalidade especifica quantas instâncias de uma classe podem estar associadas a instâncias de outra classe.

| Notação       | Significado    | Exemplo                                        |
| ------------- | -------------- | ---------------------------------------------- |
| `1`           | Exatamente um  | Uma pessoa tem exatamente uma data de nascimento |
| `0..1`        | Zero ou um     | Uma pessoa pode ter zero ou uma carteira de habilitação |
| `*` ou `0..*` | Zero ou mais   | Uma biblioteca pode ter zero ou mais livros    |
| `1..*`        | Um ou mais     | Um livro tem uma ou mais páginas               |
| `n..m`        | Faixa específica | Um curso tem de 5 a 30 alunos                |

**Posicionamento:** A cardinalidade é colocada próxima à classe que descreve.

```text
Library 1 ────── 0..* Book
```

Leitura: Uma biblioteca pode ter zero ou mais livros

## Convenções de nomenclatura {/*#naming-conventions*/}

### Regras gerais {/*#general-rules*/}

1. **Nomes de classes:** Começam com maiúscula (PascalCase)
   - ✅ `Customer`, `ShoppingCart`
   - ❌ `customer`, `shopping_cart`

2. **Atributos e métodos:** Começam com minúscula (camelCase)
   - ✅ `firstName`, `calculateTotal()`
   - ❌ `FirstName`, `CalculateTotal()`

3. **Sem tremas ou caracteres especiais**
   - ✅ `doppelgaenger`
   - ❌ `doppelgänger`

4. **Atributos booleanos:** Prefixo `is`, `has` ou `can`
   - ✅ `isActive`, `hasPermission`

5. **Nomes de métodos:** Usar verbos
   - ✅ `calculateTotal()`, `saveData()`
   - ❌ `total()`, `data()`

## Boas práticas {/*#best-practices*/}

### Visibilidade de atributos {/*#attribute-visibility*/}

- **Padrão:** Usar `private` (`-`) para todos os atributos
- **Exceção:** Usar `protected` (`#`) para atributos que serão herdados por subclasses
- **Evitar:** Tornar atributos `public`, a menos que seja absolutamente necessário

### Visibilidade de métodos {/*#method-visibility*/}

- **Padrão:** Usar `public` (`+`) para métodos que formam a interface da classe
- **Usar `private`:** Para métodos auxiliares usados apenas dentro da classe

### Classes abstratas {/*#abstract-classes*/}

Classes abstratas são indicadas por:

- Escrever o nome da classe em *itálico*
- Ou adicionar `<<abstract>>` acima do nome da classe

```text
┌────────────────────────┐
│   <<abstract>>         │
│      Vehicle           │
├────────────────────────┤
│ # licensePlate: String │
├────────────────────────┤
│ + startEngine(): void  │
└────────────────────────┘
```

### Interfaces {/*#interfaces*/}

Interfaces são indicadas adicionando `<<interface>>` acima do nome da interface.

## Exemplo completo: sistema de biblioteca {/*#complete-example-library-system*/}

Este exemplo demonstra todos os conceitos importantes dos diagramas de classes.

### Cenário {/*#scenario*/}

Um sistema simples de gerenciamento de biblioteca com livros, revistas, usuários e funcionalidade de empréstimo.

### Visão geral das classes {/*#classes-overview*/}

- Medium (classe pai abstrata)
  - Classe abstrata que representa qualquer item emprestável
  - Os atributos são `protected` porque são herdados

- Book (herda de Medium)
  - Tipo específico de mídia
  - Tem um relacionamento de composição com capítulos

- Magazine (herda de Medium)
  - Outro tipo específico de mídia

- Chapter
  - Parte de um livro (composição)
  - Não pode existir sem um livro

- Library
  - Contém mídias (agregação)
  - As mídias podem existir sem a biblioteca

- Media
  - Faz parte da biblioteca (agregação)
  - Pode existir sem a biblioteca

- User
  - Pode emprestar mídias (associação)

### Detalhes das classes {/*#class-details*/}

#### Medium (abstrata) {/*#medium-abstract*/}

```text
┌────────────────────────────┐
│     <<abstract>>           │
│        Medium              │
├────────────────────────────┤
│ # titel: String            │
│ # isbn: String             │
├────────────────────────────┤
│ + borrowMedium(): boolean  │
│ + returnMedium(): void     │
└────────────────────────────┘
```

#### Book {/*#book*/}

```text
┌─────────────────────────┐
│         Book            │
├─────────────────────────┤
│ - author: String        │
│ - numberOfPages: int    │
├─────────────────────────┤
│ + getAuthor(): String   │
└─────────────────────────┘
```

#### Magazine {/*#magazine*/}

```text
┌────────────────────────┐
│       Magazine         │
├────────────────────────┤
│ - edition: int         │
│ - releaseDate: Date    │
├────────────────────────┤
│ + getEdition(): int    │
└────────────────────────┘
```

#### Chapter {/*#chapter*/}

```text
┌─────────────────────────┐
│       Chapter           │
├─────────────────────────┤
│ - chapterNumber: int    │
│ - headline: String      │
├─────────────────────────┤
└─────────────────────────┘
```

#### Library {/*#library*/}

```text
┌──────────────────────────────────────────┐
│            Library                       │
├──────────────────────────────────────────┤
│ - name: String                           │
│ - adress: String                         │
├──────────────────────────────────────────┤
│ + addMedium(medium: Medium): void        │
│ + removeMedium(medium: Medium): boolean  │
└──────────────────────────────────────────┘
```

#### Usuário {/*#benutzer*/}

```text
┌─────────────────────────────────────────┐
│           User                          │
├─────────────────────────────────────────┤
│ - userId: int                           │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Relacionamentos {/*#relationships-1*/}

1. **Herança:**
   - `Book` herda de `Medium`
   - `Magazine` herda de `Medium`

2. **Composição:** `Book ◆────── 1..* Chapter`
   - Um livro deve ter pelo menos um capítulo
   - Capítulos não podem existir sem o seu livro

3. **Agregação:** `Library ◇────── 0..* Medium`
   - Uma biblioteca pode ter zero ou mais mídias
   - Mídias podem existir independentemente da biblioteca

4. **Associação:** `User ────── * Medium` (rotulada "borrows")
   - Usuários podem emprestar várias mídias
   - Mídias podem ser emprestadas por vários usuários ao longo do tempo

### Representação visual {/*#visual-representation*/}

```text
                    ┌────────────────────────────┐
                    │     <<abstract>>           │
                    │        Medium              │
                    ├────────────────────────────┤
                    │ # titel: String            │
                    │ # isbn: String             │
                    ├────────────────────────────┤
                    │ + borrowMedium(): boolean  │
                    │ + returnMedium(): void     │
                    └───────────┬────────────────┘
                                △
                                │ (inheritance)
                    ┌───────────┴───────────┐
                    │                       │
        ┌───────────┴──────────┐   ┌────────┴──────────────┐
        │       Book           │   │    Magazine           │
        ├──────────────────────┤   ├───────────────────────┤
        │ - author: String     │   │ - edition: int        │
        │ - numberOfPages: int │   │ - releaseDate: Date   │
        ├──────────────────────┤   ├───────────────────────┤
        │ + getAuthor()        │   │ + getEdition()        │
        └─────────┬────────────┘   └───────────────────────┘
                  │
                  │ ◆ (composition)
                  │ 1..*
        ┌─────────┴────────────┐
        │      Chapter         │
        ├──────────────────────┤
        │ - chapterNumber: int │
        │ - headline: String   │
        └──────────────────────┘


┌────────────────────────┐                *  ┌────────────────┐
│        Library         │ ◇──────────────   │    Medium     │
├────────────────────────┤  (aggregation)    └────────────────┘
│ - name: String         │
│ - adress: String       │
├────────────────────────┤
│ + mediumHinzufuegen()  │
│ + mediumEntfernen()    │
└────────────────────────┘


┌─────────────────────────────────────────┐ 1         borrows         *  ┌─────────────────┐
│     User                                │ ───────────────────────────  │     Medium      │
├─────────────────────────────────────────┤        (association)         └─────────────────┘
│ - benutzerId: int                       │
│ - name: String                          │
│ - email: String                         │
├─────────────────────────────────────────┤
│ + rentMedium(medium: Medium): boolean   │
│ + returnMedium(medium: Medium): void    │
└─────────────────────────────────────────┘
```

### Principais conclusões deste exemplo {/*#key-takeaways-from-this-example*/}

1. **Atributos protegidos em Medium:** `titel` e `isbn` são protegidos (`#`) para que `Buch` e `Zeitschrift` possam herdá-los
2. **Composição vs. agregação:** Capítulos pertencem fortemente aos livros (composição), enquanto mídias podem existir sem uma biblioteca (agregação)
3. **Herança:** Tanto `Buch` quanto `Zeitschrift` herdam comportamento comum de `Medium`
4. **Cardinalidade:** Um livro deve ter pelo menos um capítulo (`1..*`), mas uma biblioteca pode ter zero mídias (`0..*`)

## Erros comuns a evitar {/*#common-mistakes-to-avoid*/}

1. **Uso de atributos públicos:** Quase sempre usar privado ou protegido
2. **Esquecer a cardinalidade:** Sempre especificar quantas instâncias podem estar relacionadas
3. **Tipo de relacionamento errado:** Entender a diferença entre agregação e composição
4. **Nomenclatura inconsistente:** Usar camelCase para atributos/métodos e PascalCase para classes

## Ferramentas para criar diagramas de classes {/*#tools-for-creating-class-diagrams*/}

- draw.io / diagrams.net (gratuito, baseado em navegador)
- Lucidchart (versão gratuita limitada)
- PlantUML (baseado em texto, requer configuração)
- Visual Paradigm
- StarUML

## Veja também {/*#see-also*/}

- [Diagrama de Objetos](./further-uml-diagrams.md#object-diagram): um instantâneo concreto de instâncias em um ponto no tempo
- [Diagrama de Sequência](./sequence-diagram.md): a interação entre objetos dessas classes ao longo do tempo
- [Diagrama de Casos de Uso](./use-case-diagram.md): a contraparte comportamental, que mostra quais serviços essas classes oferecem aos atores
- [Modelo ER](../databases/er-model.md): a contraparte relacional, que descreve como os atributos dessas classes são persistidos em tabelas
