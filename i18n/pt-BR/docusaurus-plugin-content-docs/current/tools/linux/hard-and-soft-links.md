---
title: "Links físicos e simbólicos"
description: "Links físicos (hard links) e links simbólicos (soft links) no Linux. O que são, como diferem e como criá-los e gerenciá-los com o comando `ln`."
keywords:
    - Linux
    - Hard Link
    - Soft Link
    - Link simbólico
    - symlink
    - ln
    - Sistema de arquivos
    - inode
machine_translated: true
---

# Links físicos e simbólicos

Um **link** é uma referência de um caminho do sistema de arquivos para outro arquivo ou diretório. O Linux oferece dois tipos: **hard links** (links físicos) e **links simbólicos** (soft links). Ambos são criados com o comando `ln`, mas se comportam de maneira muito diferente.

## Inodes {/*#inodes*/}

Cada arquivo em um sistema de arquivos Linux é identificado por um **inode**, um número que aponta para os dados reais no disco. Um nome de arquivo é apenas um rótulo que mapeia para um inode, e vários nomes de arquivo podem apontar para o mesmo inode.

```bash
ls -i file.txt    # Show the inode number of a file
```

## Hard links {/*#hard-links*/}

Um hard link cria um **nome de arquivo adicional para o mesmo inode**. Ambos os nomes se referem exatamente ao mesmo arquivo no disco. Nenhum deles é "o original". Os dados do arquivo só são liberados quando o último hard link para ele é removido.

### Criar um hard link {/*#creating-a-hard-link*/}

```bash
ln target.txt linkname.txt
```

### Propriedades {/*#properties*/}

- Ambos os nomes compartilham o mesmo inode
- Remover um nome não afeta o outro
- Não pode atravessar sistemas de arquivos, ambos os nomes precisam estar na mesma partição
- Não pode apontar para diretórios (com raras exceções reservadas ao sistema)
- Não pode apontar para um arquivo que não existe

### Exemplo {/*#example*/}

```bash
echo "hello" > original.txt
ln original.txt hardlink.txt
ls -li original.txt hardlink.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 original.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 hardlink.txt
rm original.txt
cat hardlink.txt    # still prints "hello"
```

## Links simbólicos (soft links) {/*#symbolic-soft-links*/}

Um link simbólico é um pequeno arquivo especial que **armazena o caminho** de outro arquivo ou diretório. Ele tem seu próprio inode. Se o destino for movido ou excluído, o symlink se torna "pendente" (dangling) e quebrado.

### Criar um link simbólico {/*#creating-a-symbolic-link*/}

```bash
ln -s target.txt linkname.txt
```

### Propriedades {/*#properties-1*/}

- Tem um inode próprio, separado do destino
- Pode atravessar sistemas de arquivos livremente
- Pode apontar para diretórios
- Pode apontar para um destino inexistente (link quebrado/pendente)
- Pode usar caminhos absolutos ou relativos como destino

### Exemplo {/*#example-1*/}

```bash
echo "hello" > original.txt
ln -s original.txt softlink.txt
ls -li original.txt softlink.txt
# 12345 -rw-r--r-- 1 user user  6 Apr 25 10:00 original.txt
# 12346 lrwxrwxrwx 1 user user 12 Apr 25 10:00 softlink.txt -> original.txt
rm original.txt
cat softlink.txt    # error: No such file or directory
```

## Hard links x soft links {/*#hard-vs-soft-links*/}

| Propriedade                    | Hard link               | Soft link |
| ------------------------------ | ----------------------- | --------- |
| Aponta para                    | inode                   | caminho   |
| Inode próprio?                 | Não (o mesmo do destino) | Sim      |
| Pode cruzar sistemas de arquivos? | Não                  | Sim       |
| Pode apontar para diretórios?  | Não                     | Sim       |
| Pode ter um arquivo ausente como destino? | Não          | Sim       |
| Sobrevive à exclusão do destino? | Sim                   | Não       |
| Criado com                     | `ln`                 | `ln -s`   |

## Opções comuns do `ln` {/*#common-ln-options*/}

| Comando              | Descrição                                                                         |
| -------------------- | --------------------------------------------------------------------------------- |
| `ln target name`     | Criar um hard link                                                                |
| `ln -s target name`  | Criar um link simbólico (soft link)                                               |
| `ln -f target name`  | Remover (sobrescrever) um arquivo de destino existente                            |
| `ln -i target name`  | Perguntar antes de sobrescrever um destino existente                              |
| `ln -b target name`  | Fazer backup de um destino existente antes de substituí-lo (acrescenta `~` ao nome do arquivo) |
| `ln -v target name`  | Exibir o nome de cada arquivo vinculado (verbose)                                 |
| `ln -sf target name` | Forçar a substituição de um link existente com o mesmo nome                       |
| `readlink name`      | Mostrar o caminho para o qual um link simbólico aponta                            |
| `readlink -f name`   | Resolver todos os symlinks até o caminho absoluto canônico                        |

## Quando usar cada um {/*#when-to-use-which*/}

- **Hard links** são úteis para manter vários nomes estáveis para o mesmo arquivo (por exemplo, snapshots de backup que compartilham conteúdo inalterado) sem usar espaço extra em disco.
- **Soft links** são a escolha mais comum para atalhos. Por exemplo, alternar entre versões de uma ferramenta (p. ex. `/usr/bin/python => python3.12`) ou referenciar arquivos entre pontos de montagem.
