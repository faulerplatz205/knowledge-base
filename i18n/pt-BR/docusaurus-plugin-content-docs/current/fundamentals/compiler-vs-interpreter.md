---
title: "Compilador vs. Interpretador"
description: "Como compiladores e interpretadores traduzem o código-fonte, suas vantagens e desvantagens e o papel do bytecode, das máquinas virtuais e da compilação just-in-time"
keywords:
    - "Compilador"
    - "Interpretador"
    - "Just-in-Time"
    - "JIT"
    - "Bytecode"
    - "Máquina Virtual"
    - "Linker"
    - "Ahead-of-Time"
    - "Transpilador"
    - "Linguagens de Programação"
tags:
    - ap2
machine_translated: true
---

# Compilador vs. Interpretador

## Visão Geral {/*#overview*/}

Um processador só consegue executar código de máquina. O código-fonte escrito em uma linguagem de alto nível precisa, portanto, ser traduzido primeiro. Existem duas abordagens fundamentais:

- **Compilador**: traduz o programa inteiro **antes** da execução em um artefato independente, legível pela máquina
- **Interpretador**: lê o código-fonte **durante** a execução e executa cada instrução imediatamente

Se uma linguagem é compilada ou interpretada é uma propriedade da **implementação**, não da linguagem em si. C costuma ser compilada, mas existem interpretadores de C; JavaScript era historicamente interpretada e é compilada em tempo de execução por engines modernas.

---

## Compilador {/*#compiler*/}

### Processo de Tradução {/*#translation-process*/}

A tradução costuma ser realizada em várias fases:

1. **Análise léxica**: o fluxo de caracteres é dividido em tokens (palavras-chave, identificadores, operadores)
2. **Análise sintática**: os tokens são verificados em relação à gramática e transformados em uma árvore sintática
3. **Análise semântica**: compatibilidade de tipos, declarações e escopos são verificados
4. **Otimização**: a representação intermediária é aprimorada (p. ex. eliminação de código morto, desenrolamento de laços)
5. **Geração de código**: o código de máquina é emitido, normalmente como arquivos-objeto

Um **linker** combina então os arquivos-objeto com as bibliotecas necessárias em um programa executável.

```text
Source Code => [Compiler] => Object Code => [Linker] => Executable => [CPU]
```

Os erros são relatados em tempo de compilação, de modo que um programa com erros de sintaxe ou de tipo nunca chega à execução.

### Vantagens {/*#advantages*/}

- **Velocidade de execução**: o código de máquina traduzido é executado diretamente no processador
- **Detecção precoce de erros**: erros sintáticos e muitos erros semânticos aparecem antes de o programa ser entregue
- **Otimização**: o programa inteiro é visível, o que permite otimizações extensas
- **Proteção do código-fonte**: apenas o artefato compilado precisa ser distribuído
- **Nenhuma dependência de runtime**: o sistema de destino não precisa ter a ferramenta de compilação instalada

### Desvantagens {/*#disadvantages*/}

- **Tempo de compilação**: toda alteração exige um novo build antes de poder ser testada
- **Dependência de plataforma**: o código de máquina está vinculado a uma arquitetura de processador e a um sistema operacional, de modo que é necessário um build separado para cada plataforma de destino
- **Esforço de depuração**: o código de máquina executado não se parece mais com o código-fonte, o que exige símbolos de depuração

---

## Interpretador {/*#interpreter*/}

O interpretador lê o código-fonte instrução por instrução, analisa-o e o executa imediatamente. Nenhum arquivo executável separado é produzido. O interpretador precisa estar presente no sistema de destino.

```text
Source Code => [Interpreter] => Statement analysed and executed => [CPU]
```

Os erros só se tornam visíveis quando a linha afetada é de fato alcançada. Um erro de sintaxe em um ramo raramente usado pode, portanto, passar despercebido por muito tempo.

### Vantagens {/*#advantages-1*/}

- **Ciclo de desenvolvimento rápido**: o código alterado pode ser executado imediatamente, sem etapa de build
- **Independência de plataforma**: o mesmo código-fonte é executado em qualquer lugar onde haja um interpretador disponível
- **Depuração mais fácil**: os erros são relatados com referência à linha original do código-fonte
- **Flexibilidade**: o código pode ser gerado e executado em tempo de execução

### Desvantagens {/*#disadvantages-1*/}

- **Velocidade de execução**: a sobrecarga de tradução ocorre a cada execução e, no código dentro de laços, repetidamente
- **Detecção tardia de erros**: os erros só aparecem em tempo de execução
- **Dependência de runtime**: o interpretador precisa estar instalado no sistema de destino
- **Divulgação do código-fonte**: o programa costuma ser entregue como código-fonte legível

---

## Bytecode e Máquinas Virtuais {/*#bytecode-and-virtual-machines*/}

A maioria das plataformas modernas combina as duas abordagens. O código-fonte é compilado em **bytecode**, um código intermediário compacto que não está vinculado a um processador específico. Uma **máquina virtual** (VM) executa então esse bytecode no sistema de destino.

```text
Source Code => [Compiler] => Bytecode => [Virtual Machine] => Machine Code => [CPU]
```

| Plataforma | Compilador | Código Intermediário                | Runtime                       |
| ---------- | ---------- | ----------------------------------- | ----------------------------- |
| Java       | `javac`    | Bytecode (`.class`)                  | JVM (Java Virtual Machine)    |
| C# / .NET  | `csc`    | CIL (Common Intermediate Language)  | CLR (Common Language Runtime) |
| Python     | integrado  | Bytecode (`.pyc`)                  | VM do Python                  |

Isso separa as duas preocupações dependentes de plataforma: o compilador é executado uma vez e produz bytecode portável, enquanto apenas a máquina virtual precisa ser implementada para cada plataforma. O resultado é o princípio *write once, run anywhere*, ao custo de uma camada adicional entre o programa e o hardware.

---

## Compilação Just-in-Time {/*#just-in-time-compilation*/}

Um **compilador just-in-time** (JIT) faz parte da máquina virtual. O bytecode é inicialmente interpretado, e o runtime registra com que frequência cada trecho é executado. Os trechos usados com frequência, os chamados *hot spots*, são compilados em código de máquina nativo em tempo de execução e mantidos em cache, de modo que as chamadas seguintes são executadas em velocidade nativa.

```text
Bytecode => [Interpretation + Profiling] => hot code => [JIT Compiler] => cached Machine Code
```

### Vantagens {/*#advantages-2*/}

- **Velocidade quase nativa**, mantendo a portabilidade do bytecode
- **Informações de runtime**, como tipos de dados reais e frequências de ramificação, permitem otimizações que um compilador estático não consegue realizar

### Desvantagens {/*#disadvantages-2*/}

- **Fase de aquecimento**: as primeiras execuções são lentas, o que é perceptível em programas de curta duração
- **Consumo de memória**: dados de profiling e código compilado ocupam memória adicional
- **Temporização menos previsível**: a compilação durante a execução faz os tempos de execução oscilarem, o que é problemático para sistemas de tempo real

A contrapartida é a **compilação ahead-of-time** (AOT), em que o bytecode é totalmente traduzido antes da execução. Isso elimina a fase de aquecimento e reduz o tempo de inicialização, mas perde as informações de runtime e, por isso, é usada em processos de curta duração, como ferramentas de linha de comando ou funções serverless.

### JIT vs. AOT {/*#jit-vs-aot*/}

| Critério                         | Just-in-Time (JIT)                                 | Ahead-of-Time (AOT)                                  |
| -------------------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| Momento da tradução              | Em tempo de execução, para código usado com frequência | Completamente antes da execução                  |
| Tempo de inicialização           | Lento, fase de aquecimento                         | Rápido, sem aquecimento                              |
| Desempenho de pico               | Alto, por meio de otimização em tempo de execução  | Limitado, apenas otimização estática                 |
| Base para otimização             | Perfil real de execução (hot spots, tipos)         | Apenas análise estática do código                    |
| Consumo de memória               | Maior, dados de profiling e cache de código        | Menor                                                |
| Previsibilidade de temporização  | Oscilante                                          | Previsível                                           |
| Recursos dinâmicos da linguagem  | Sem restrições                                     | Restritos, exigem configuração                       |
| Casos de uso típicos             | Aplicações de servidor e desktop de longa duração  | Processos de curta duração, ferramentas CLI, serverless |

---

## Transpilador {/*#transpiler*/}

Um **transpilador** (compilador source-to-source) traduz o código-fonte para o código-fonte de outra linguagem no mesmo nível de abstração, e não para código de máquina. Exemplos típicos são o TypeScript, que é transpilado para JavaScript, e o Sass, que é transpilado para CSS.

```text
TypeScript => [Transpiler] => JavaScript => [Engine with JIT] => Machine Code
```

---

## Comparação {/*#comparison*/}

| Critério                        | Compilador                      | Interpretador                                  |
| ------------------------------- | ------------------------------- | ---------------------------------------------- |
| Momento da tradução             | Completamente antes da execução | Durante a execução, instrução por instrução    |
| Resultado                       | Arquivo executável              | Nenhum artefato separado                       |
| Velocidade de execução          | Alta                            | Baixa                                          |
| Detecção de erros               | Em tempo de compilação          | Em tempo de execução, apenas no código executado |
| Ciclo de desenvolvimento        | Mais lento, build necessário    | Mais rápido, execução imediata                 |
| Independência de plataforma     | Baixa, um build por plataforma  | Alta, requer um interpretador                  |
| Requisito no sistema de destino | Nenhum                          | O interpretador precisa estar instalado        |
| Proteção do código-fonte        | Existente                       | Geralmente inexistente                         |

---

## Representantes Típicos {/*#typical-representatives*/}

- **Compiladas para código de máquina**: C, C++, Rust, Go, Delphi
- **Interpretadas**: scripts de shell, Perl, PHP, Ruby, Python
- **Bytecode com VM e JIT**: Java, Kotlin, C# e JavaScript em engines como o V8
