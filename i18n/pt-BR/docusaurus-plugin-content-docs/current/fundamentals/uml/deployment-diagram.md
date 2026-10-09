---
title: "Diagrama de Implantação"
description: "Diagramas de implantação UML: nós, dispositivos e ambientes de execução, artefatos e sua implantação, caminhos de comunicação com estereótipos de protocolo, multiplicidades e aninhamento."
keywords:
    - UML
    - Diagrama de Implantação
    - Nó
    - Dispositivo
    - Ambiente de Execução
    - Artefato
    - Caminho de Comunicação
    - Implantação
    - Panorama do Sistema
    - Diagrama Estrutural
tags:
    - ap2
machine_translated: true
---

# Diagrama de Implantação

## Visão geral {/*#overview*/}

Um diagrama de implantação é um diagrama UML **estrutural**. Mostra como um sistema pronto é distribuído fisicamente: quais hardwares e quais ambientes de execução existem, quais arquivos são instalados neles e por quais caminhos de comunicação essas partes trocam dados.

Aplicações típicas:

- Documentação do panorama de sistemas de uma aplicação para operação e transferência
- Representação de uma arquitetura cliente-servidor ou de três camadas, incluindo seus limites de rede
- Planejamento de uma instalação: qual artefato é copiado para qual máquina
- Descrição de uma implantação em contêineres ou na nuvem, com seus protocolos e números de réplicas
- Base para discussões sobre disponibilidade, escalabilidade e zonas de segurança

---

## Notação {/*#notation*/}

| Elemento                | Notação                                                                | Significado                                                                                              |
| ----------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Nó                      | Paralelepípedo (caixa tridimensional)                                  | Recurso de execução no qual algo é executado ou armazenado                                               |
| Dispositivo             | Paralelepípedo com a palavra-chave `<<device>>`                             | Hardware físico: servidor, estação de trabalho, smartphone, roteador, impressora                         |
| Ambiente de execução    | Paralelepípedo com `<<executionEnvironment>>`, geralmente aninhado dentro de um dispositivo | Software que hospeda artefatos: sistema operacional, JVM, servidor de aplicação, runtime de contêiner, SGBD |
| Artefato                | Retângulo com a palavra-chave `<<artifact>>` ou um ícone de documento         | Arquivo físico produzido pelo processo de desenvolvimento                                                |
| Implantação             | Artefato desenhado dentro de um nó, ou uma seta tracejada `<<deploy>>`      | O artefato está instalado nesse nó                                                                       |
| Manifestação            | Seta tracejada `<<manifest>>` de um artefato para um componente ou classe     | O artefato é a realização física de um elemento lógico                                                   |
| Caminho de comunicação  | Linha contínua entre dois nós                                          | Conexão pela qual os nós trocam dados, sem direção                                                       |
| Protocolo               | Estereótipo no caminho, p. ex. `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`               | Protocolo utilizado nessa conexão                                                                        |
| Multiplicidade          | Número na extremidade de um caminho de comunicação, p. ex. `2` ou `1..*` | Quantos nós nessa extremidade estão conectados a um nó na outra extremidade                              |
| Aninhamento             | Nó ou artefato desenhado dentro de um nó                               | Contenção: o hardware contém o runtime, que contém o arquivo                                             |
| Instância               | Nome sublinhado com dois-pontos no início, p. ex. `:AppServer`              | Uma instância concreta em vez de um tipo                                                                 |
| Nota                    | Retângulo com canto dobrado sobre uma linha tracejada                  | Comentário sem semântica                                                                                 |

Regras de nomenclatura que mantêm um diagrama legível:

- Um nó é nomeado como tipo, `ApplicationServer`, ou como máquina concreta, `appsrv01:ApplicationServer`. O nome de uma instância é sublinhado em uma ferramenta de desenho.
- Artefatos levam o nome real do arquivo, incluindo a extensão: `shop.war`, não `Shop application`.
- Todo caminho de comunicação leva um estereótipo de protocolo; uma linha sem rótulo indica apenas *conectado de alguma forma*.
- Palavras-chave e estereótipos são escritos entre aspas angulares, `«device»`. A grafia `<<device>>` é a forma ASCII usada por ferramentas baseadas em texto e é a utilizada a seguir.

---

## Blocos de construção {/*#building-blocks*/}

### Nó {/*#node*/}

Dois tipos de nó são distinguidos por palavra-chave:

- **`<<device>>`:** hardware físico, como um servidor, uma estação de trabalho, um telefone celular ou um controlador embarcado
- **`<<executionEnvironment>>`:** um ambiente de software que hospeda artefatos e lhes fornece serviços como gerenciamento de memória, transações ou despacho de requisições

Um ambiente de execução normalmente é aninhado dentro de um dispositivo. Um nó sem palavra-chave é simplesmente *algum* recurso de execução.

```text
        ┌────────────────────────────────────────┐
       ╱                                        ╱│
      ┌────────────────────────────────────────┐ │
      │  <<device>>                            │ │
      │  ApplicationServer                     │ │
      │                                        │ │
      │  ┌──────────────────────────────────┐  │ │
      │  │  <<executionEnvironment>>        │  │ │
      │  │  Tomcat 10                       │  │ │
      │  │                                  │  │ │
      │  │  ┌────────────────────────────┐  │  │ │
      │  │  │  <<artifact>>              │  │  │ │
      │  │  │  shop.war                  │  │  │ │
      │  │  └────────────────────────────┘  │  │ │
      │  └──────────────────────────────────┘  │ ╱
      └────────────────────────────────────────┘╱
```

Em uma ferramenta de desenho, todo nó é um paralelepípedo, inclusive os aninhados. Os diagramas aqui desenham os nós internos como retângulos simples para que o aninhamento permaneça legível em texto puro.

### Artefato e implantação {/*#artifact-and-deployment*/}

Na prática, um artefato é um arquivo. Exemplos típicos são `shop.war`, `payment-service.jar`, `setup.exe`, `schema.sql`, `nginx.conf` e uma imagem de contêiner como `shop-app:2.4.0`.

Duas notações indicam que um artefato está instalado em um nó:

- **Aninhamento:** o retângulo do artefato é desenhado dentro do nó. Essa forma é mais compacta e de longe a mais comum.
- **Dependência:** uma seta tracejada com a palavra-chave `<<deploy>>` vai do artefato até o nó. Essa forma é útil quando o mesmo artefato é implantado em vários nós.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈┈ <<deploy>> ┈┈┈┈┈┈▶ │  <<device>>            │
 │  shop.war              │                          │  ApplicationServer     │
 └────────────────────────┘                          └────────────────────────┘
```

Uma manifestação é a contrapartida que aponta em direção ao projeto. Uma seta tracejada com a palavra-chave `<<manifest>>` vai do artefato até o componente ou a classe que ele realiza fisicamente e, assim, mostra qual parte do modelo acaba nesse arquivo.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈ <<manifest>> ┈┈┈┈┈▶ │  <<component>>         │
 │  payment-service.jar   │                          │  PaymentService        │
 └────────────────────────┘                          └────────────────────────┘
```

### Caminho de comunicação {/*#communication-path*/}

Um caminho de comunicação é uma linha contínua sem ponta de seta, porque a conexão em si não tem direção, e é rotulado com o protocolo como estereótipo.

```text
    ┌──────────────────────┐                  ┌──────────────────────┐
   ╱                      ╱│                 ╱                      ╱│
  ┌──────────────────────┐ │                ┌──────────────────────┐ │
  │  <<device>>          │ │ 2            1 │  <<device>>          │ │
  │  AppServer           │ ├──── <<JDBC>> ──┤  DatabaseServer      │ │
  │                      │ ╱                │                      │ ╱
  └──────────────────────┘╱                 └──────────────────────┘╱
```

Estereótipos de protocolo comuns são `<<HTTP>>`, `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`, `<<REST>>`, `<<AMQP>>`, `<<SSH>>` e `<<SMTP>>`. A escolha entre eles depende do nível de detalhe pretendido: `<<TCP/IP>>` nomeia o transporte, `<<HTTPS>>` indica adicionalmente que a conexão é criptografada, o que geralmente é a informação mais útil.

### Multiplicidade e aninhamento {/*#multiplicity-and-nesting*/}

Uma multiplicidade é escrita na extremidade de um caminho de comunicação e exige nomes de tipo: uma instância como `appsrv01:ApplicationServer` é sempre exatamente uma máquina.

O aninhamento pode abranger vários níveis, e cada nível é executado sobre o que o envolve:

```text
<<device>>                  ServerHardware
  <<executionEnvironment>>    Linux
    <<executionEnvironment>>    Docker Engine
      <<artifact>>                shop-app:2.4.0
```

Níveis que não importam para a finalidade do diagrama são omitidos, p. ex. o runtime de contêiner em um plano de capacidade. Em um plano de lançamento, por outro lado, a tag de versão da imagem é a informação-chave.

---

## Exemplo: loja virtual de três camadas {/*#example-three-tier-web-shop*/}

A loja consiste em um front end de navegador, uma aplicação em um contêiner e um banco de dados relacional. Cada camada é executada em sua própria máquina, o servidor de aplicação existe em duplicata e o banco de dados é acessível somente a partir do servidor de aplicação.

```text
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ClientPC                                  │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Browser                             │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 0..*
               <<HTTPS>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ApplicationServer                         │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Docker Engine                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-app:2.4.0                │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 2
                <<JDBC>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  DatabaseServer                            │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  PostgreSQL 16                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-schema.sql               │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
```

O que este exemplo mostra:

- A multiplicidade `2` na extremidade do servidor de aplicação do caminho `<<JDBC>>` indica que dois servidores de aplicação acessam o banco de dados, e `0..*` na extremidade do cliente indica que qualquer número de clientes pode estar conectado, inclusive nenhum.
- Nada é dito sobre *quando* ocorre cada chamada. A ordem das chamadas pertence a um [diagrama de sequência](./sequence-diagram.md).

---

## Erros comuns {/*#common-mistakes*/}

1. **Classes ou componentes dentro de um nó:** um nó contém artefatos. O elemento lógico pertence a um [diagrama de classes](./class-diagram.md) ou a um diagrama de componentes e é vinculado ao artefato com `<<manifest>>`.
2. **Caminho de comunicação sem protocolo:** sem `<<HTTPS>>` ou `<<JDBC>>` na linha, o diagrama deixa de mostrar quais conexões são criptografadas ou quais portas um firewall precisa abrir.
3. **Dispositivo e ambiente de execução confundidos:** `<<device>>` é hardware, `<<executionEnvironment>>` é o software executado nele. Um contêiner não é um dispositivo.
4. **Pontas de seta em um caminho de comunicação:** o caminho não tem direção. Uma direção pertence a uma dependência como `<<deploy>>` ou `<<manifest>>`.
5. **Todos os arquivos desenhados:** somente o que importa para a instalação e a operação pertence ao diagrama, não todas as bibliotecas e arquivos de configuração.
6. **Multiplicidades ausentes:** um cluster de quatro máquinas desenhado como um único nó sem `4` oculta seu tamanho.
7. **Camadas lógicas equiparadas a nós:** as camadas de apresentação, lógica e dados são uma divisão lógica, enquanto os nós são uma divisão física. Três camadas podem perfeitamente ser executadas em uma única máquina.

---

## Ferramentas {/*#tools*/}

- draw.io / diagrams.net (gratuito, baseado em navegador, biblioteca de formas UML incluída)
- PlantUML (baseado em texto, o diagrama é gerado a partir do código-fonte e pode ser versionado)
- Mermaid (baseado em texto, renderizado diretamente em Markdown em muitas plataformas)
- Visual Paradigm, StarUML, Lucidchart (comerciais, com versões gratuitas)

## Veja também {/*#see-also*/}

- [Diagrama de Componentes](./component-diagram.md): os blocos de construção lógicos cujos artefatos são implantados aqui
- [Diagrama de Classes](./class-diagram.md): a estrutura detalhada do software que acaba dentro dos artefatos
- [Diagrama de Sequência](./sequence-diagram.md): a interação pelos caminhos de comunicação mostrados aqui
- [Visão Geral da UML](./uml-overview.mdx): classificação dos tipos de diagrama
- [Noções Básicas de Notação UML](./uml-notation-basics.md): palavras-chave, estereótipos, nomes de instância e os elementos compartilhados por todos os tipos de diagrama
