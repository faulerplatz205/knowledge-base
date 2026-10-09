---
title: "Caminhos de arquivo"
description: "Caminhos absolutos e relativos em um sistema de arquivos. Como eles diferem e os componentes especiais de caminho `/`, `.`, `..` e `~`."
keywords:
    - Caminho de arquivo
    - Caminho absoluto
    - Caminho relativo
    - Diretório de trabalho
    - Sistema de arquivos
machine_translated: true
---

# Caminhos de arquivo

Um **caminho** descreve a localização de um arquivo ou diretório no sistema de arquivos. Há duas maneiras de escrevê-lo: **absoluta** e **relativa**.

## Caminhos absolutos {/*#absolute-paths*/}

Um caminho absoluto começa na **raiz** do sistema de arquivos e é, portanto, inequívoco, independentemente da localização atual.

- No Linux e no macOS, a raiz é `/`, por exemplo `/home/user/notes.txt`
- No Windows, começa com uma letra de unidade, por exemplo `C:\Users\user\notes.txt`

## Caminhos relativos {/*#relative-paths*/}

Um caminho relativo é interpretado **em relação ao diretório de trabalho atual**. Ele não começa com `/` (nem com uma letra de unidade).

```bash
cd /home/user
cat notes.txt          # => /home/user/notes.txt
cat projects/app.js    # => /home/user/projects/app.js
```

## Componentes especiais de caminho {/*#special-path-components*/}

| Componente | Significado                                    |
| --------- | ------------------------------------------ |
| `/`       | Diretório raiz (início de um caminho absoluto) |
| `.`       | O diretório atual                      |
| `..`      | O diretório pai (um nível acima)        |
| `~`       | O diretório pessoal do usuário atual          |

### Exemplos {/*#examples*/}

```bash
cd ..        # Move up one directory
cd ./bin     # Enter the bin directory below the current one
cd ~         # Go to the home directory
cat ../config.txt
```

## Diretório de trabalho {/*#working-directory*/}

O **diretório de trabalho** é o diretório em que um processo se encontra no momento. Ele é a âncora em relação à qual todo caminho relativo é resolvido.

```bash
pwd    # Print the current working directory
```
