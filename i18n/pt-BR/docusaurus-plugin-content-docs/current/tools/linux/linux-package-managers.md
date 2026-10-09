---
title: "Gerenciadores de pacotes do Linux"
description: "Visão geral dos gerenciadores de pacotes mais comuns do Linux, das distribuições compatíveis e de seus principais comandos."
keywords:
    - Linux
    - Gerenciador de pacotes
    - apt
    - pacman
    - dnf
    - yum
    - zypper
    - portage
    - Debian
    - Ubuntu
    - Arch Linux
    - Fedora
    - openSUSE
    - Gentoo
machine_translated: true
---

# Gerenciadores de pacotes do Linux

Um gerenciador de pacotes automatiza a instalação, a atualização e a remoção de software em um sistema Linux. Cada família de distribuições importante usa sua própria ferramenta.

## apt {/*#apt*/}

Usado por distribuições baseadas em Debian: Ubuntu, Debian, Kali Linux, Linux Mint.

| Comando                 | Descrição                                   |
| ----------------------- | ------------------------------------------- |
| `apt update`            | Atualizar o índice de pacotes               |
| `apt upgrade`           | Atualizar todos os pacotes instalados       |
| `apt install <package>` | Instalar um pacote                          |
| `apt remove <package>`  | Remover um pacote (mantendo arquivos de configuração) |
| `apt purge <package>`   | Remover um pacote e seus arquivos de configuração |
| `apt search <term>`     | Pesquisar um pacote                         |
| `apt list --installed`  | Listar todos os pacotes instalados          |

## pacman {/*#pacman*/}

Usado por distribuições baseadas em Arch: Arch Linux, Manjaro, EndeavourOS.

| Comando                | Descrição                                                   |
| ---------------------- | ----------------------------------------------------------- |
| `pacman -Syu`          | Sincronizar o banco de dados de pacotes e atualizar todos os pacotes |
| `pacman -S <package>`  | Instalar um pacote                                          |
| `pacman -R <package>`  | Remover um pacote                                           |
| `pacman -Rs <package>` | Remover um pacote e suas dependências não utilizadas        |
| `pacman -Ss <term>`    | Pesquisar no banco de dados de pacotes                      |
| `pacman -Q`            | Listar todos os pacotes instalados                          |

## dnf {/*#dnf*/}

Usado por distribuições baseadas em Red Hat a partir do Fedora 22 e do CentOS Stream 8.

| Comando                 | Descrição                                |
| ----------------------- | ---------------------------------------- |
| `dnf check-update`      | Verificar atualizações disponíveis       |
| `dnf upgrade`           | Atualizar todos os pacotes instalados    |
| `dnf install <package>` | Instalar um pacote                       |
| `dnf remove <package>`  | Remover um pacote                        |
| `dnf search <term>`     | Pesquisar um pacote                      |
| `dnf list --installed`  | Listar todos os pacotes instalados       |

## yum {/*#yum*/}

Antecessor do [dnf](#dnf), usado no Fedora 21, no CentOS 7 e no RHEL 7 e anteriores. Foi substituído pelo dnf devido ao seu resolvedor de dependências lento, baseado em Python, e à dívida técnica acumulada.

| Comando                 | Descrição                                |
| ----------------------- | ---------------------------------------- |
| `yum check-update`      | Verificar atualizações disponíveis       |
| `yum update`            | Atualizar todos os pacotes instalados    |
| `yum install <package>` | Instalar um pacote                       |
| `yum remove <package>`  | Remover um pacote                        |
| `yum search <term>`     | Pesquisar um pacote                      |
| `yum list installed`    | Listar todos os pacotes instalados       |

## zypper {/*#zypper*/}

Usado pelo openSUSE e pelo SUSE Linux Enterprise.

| Comando                            | Descrição                             |
| ---------------------------------- | ------------------------------------- |
| `zypper refresh`                   | Atualizar todos os repositórios       |
| `zypper update`                    | Atualizar todos os pacotes instalados |
| `zypper install <package>`         | Instalar um pacote                    |
| `zypper remove <package>`          | Remover um pacote                     |
| `zypper search <term>`             | Pesquisar um pacote                   |
| `zypper packages --installed-only` | Listar todos os pacotes instalados    |

## portage {/*#portage*/}

Usado pelo Gentoo. Os pacotes são compilados a partir do código-fonte, o que os torna altamente configuráveis. A ferramenta de front-end é `emerge`.

| Comando                       | Descrição                                       |
| ----------------------------- | ----------------------------------------------- |
| `emerge --sync`               | Sincronizar a árvore do portage                 |
| `emerge -uDN @world`          | Atualizar todos os pacotes instalados           |
| `emerge <package>`            | Instalar um pacote                              |
| `emerge --depclean <package>` | Remover um pacote e suas dependências não utilizadas |
| `emerge --search <term>`      | Pesquisar um pacote                             |
| `qlist -I`                    | Listar todos os pacotes instalados              |
