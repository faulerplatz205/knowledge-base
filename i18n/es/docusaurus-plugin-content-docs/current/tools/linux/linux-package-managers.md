---
title: "Gestores de paquetes de Linux"
description: "Una visión general de los gestores de paquetes de Linux más comunes, las distribuciones que admiten y sus comandos principales."
keywords:
    - Linux
    - Gestor de paquetes
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

# Gestores de paquetes de Linux

Un gestor de paquetes automatiza la instalación, la actualización y la eliminación de software en un sistema Linux. Cada familia principal de distribuciones utiliza su propia herramienta.

## apt {/*#apt*/}

Utilizado por las distribuciones basadas en Debian: Ubuntu, Debian, Kali Linux, Linux Mint.

| Comando                 | Descripción                                          |
| ----------------------- | ---------------------------------------------------- |
| `apt update`            | Actualizar el índice de paquetes                     |
| `apt upgrade`           | Actualizar todos los paquetes instalados             |
| `apt install <package>` | Instalar un paquete                                  |
| `apt remove <package>`  | Eliminar un paquete (conservando los archivos de configuración) |
| `apt purge <package>`   | Eliminar un paquete y sus archivos de configuración  |
| `apt search <term>`     | Buscar un paquete                                    |
| `apt list --installed`  | Listar todos los paquetes instalados                 |

## pacman {/*#pacman*/}

Utilizado por las distribuciones basadas en Arch: Arch Linux, Manjaro, EndeavourOS.

| Comando                | Descripción                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `pacman -Syu`          | Sincronizar la base de datos de paquetes y actualizar todos los paquetes |
| `pacman -S <package>`  | Instalar un paquete                                              |
| `pacman -R <package>`  | Eliminar un paquete                                              |
| `pacman -Rs <package>` | Eliminar un paquete y sus dependencias no utilizadas             |
| `pacman -Ss <term>`    | Buscar en la base de datos de paquetes                           |
| `pacman -Q`            | Listar todos los paquetes instalados                             |

## dnf {/*#dnf*/}

Utilizado por las distribuciones basadas en Red Hat a partir de Fedora 22 y CentOS Stream 8.

| Comando                 | Descripción                                |
| ----------------------- | ------------------------------------------ |
| `dnf check-update`      | Comprobar las actualizaciones disponibles  |
| `dnf upgrade`           | Actualizar todos los paquetes instalados   |
| `dnf install <package>` | Instalar un paquete                        |
| `dnf remove <package>`  | Eliminar un paquete                        |
| `dnf search <term>`     | Buscar un paquete                          |
| `dnf list --installed`  | Listar todos los paquetes instalados       |

## yum {/*#yum*/}

Predecesor de [dnf](#dnf), utilizado en Fedora 21, CentOS 7 y RHEL 7 y anteriores. Fue sustituido por dnf debido a su lento resolvedor de dependencias basado en Python y a la deuda técnica acumulada.

| Comando                 | Descripción                                |
| ----------------------- | ------------------------------------------ |
| `yum check-update`      | Comprobar las actualizaciones disponibles  |
| `yum update`            | Actualizar todos los paquetes instalados   |
| `yum install <package>` | Instalar un paquete                        |
| `yum remove <package>`  | Eliminar un paquete                        |
| `yum search <term>`     | Buscar un paquete                          |
| `yum list installed`    | Listar todos los paquetes instalados       |

## zypper {/*#zypper*/}

Utilizado por openSUSE y SUSE Linux Enterprise.

| Comando                            | Descripción                              |
| ---------------------------------- | ---------------------------------------- |
| `zypper refresh`                   | Actualizar todos los repositorios        |
| `zypper update`                    | Actualizar todos los paquetes instalados |
| `zypper install <package>`         | Instalar un paquete                      |
| `zypper remove <package>`          | Eliminar un paquete                      |
| `zypper search <term>`             | Buscar un paquete                        |
| `zypper packages --installed-only` | Listar todos los paquetes instalados     |

## portage {/*#portage*/}

Utilizado por Gentoo. Los paquetes se compilan a partir del código fuente, lo que los hace altamente configurables. La herramienta de interfaz es `emerge`.

| Comando                       | Descripción                                          |
| ----------------------------- | ---------------------------------------------------- |
| `emerge --sync`               | Sincronizar el árbol de portage                      |
| `emerge -uDN @world`          | Actualizar todos los paquetes instalados             |
| `emerge <package>`            | Instalar un paquete                                  |
| `emerge --depclean <package>` | Eliminar un paquete y sus dependencias no utilizadas |
| `emerge --search <term>`      | Buscar un paquete                                    |
| `qlist -I`                    | Listar todos los paquetes instalados                 |
