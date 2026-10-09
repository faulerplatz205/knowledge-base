---
title: "Linux 包管理器"
description: "最常见的 Linux 包管理器概述，包括其支持的发行版和主要命令。"
keywords:
    - Linux
    - 包管理器
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

# Linux 包管理器

包管理器可在 Linux 系统上自动执行软件的安装、更新和卸载。每个主要的发行版系列都使用各自的工具。

## apt {/*#apt*/}

用于基于 Debian 的发行版：Ubuntu、Debian、Kali Linux、Linux Mint。

| 命令                    | 说明                       |
| ----------------------- | -------------------------- |
| `apt update`            | 刷新软件包索引             |
| `apt upgrade`           | 升级所有已安装的软件包     |
| `apt install <package>` | 安装软件包                 |
| `apt remove <package>`  | 卸载软件包（保留配置文件） |
| `apt purge <package>`   | 卸载软件包及其配置文件     |
| `apt search <term>`     | 搜索软件包                 |
| `apt list --installed`  | 列出所有已安装的软件包     |

## pacman {/*#pacman*/}

用于基于 Arch 的发行版：Arch Linux、Manjaro、EndeavourOS。

| 命令                   | 说明                             |
| ---------------------- | -------------------------------- |
| `pacman -Syu`          | 同步软件包数据库并升级所有软件包 |
| `pacman -S <package>`  | 安装软件包                       |
| `pacman -R <package>`  | 卸载软件包                       |
| `pacman -Rs <package>` | 卸载软件包及其不再需要的依赖     |
| `pacman -Ss <term>`    | 搜索软件包数据库                 |
| `pacman -Q`            | 列出所有已安装的软件包           |

## dnf {/*#dnf*/}

用于基于 Red Hat 的发行版，自 Fedora 22 和 CentOS Stream 8 起。

| 命令                    | 说明                   |
| ----------------------- | ---------------------- |
| `dnf check-update`      | 检查可用更新           |
| `dnf upgrade`           | 升级所有已安装的软件包 |
| `dnf install <package>` | 安装软件包             |
| `dnf remove <package>`  | 卸载软件包             |
| `dnf search <term>`     | 搜索软件包             |
| `dnf list --installed`  | 列出所有已安装的软件包 |

## yum {/*#yum*/}

[dnf](#dnf) 的前身，用于 Fedora 21、CentOS 7 以及 RHEL 7 及更早版本。由于其基于 Python 的依赖解析器速度缓慢以及积累的技术债务，已被 dnf 取代。

| 命令                    | 说明                   |
| ----------------------- | ---------------------- |
| `yum check-update`      | 检查可用更新           |
| `yum update`            | 升级所有已安装的软件包 |
| `yum install <package>` | 安装软件包             |
| `yum remove <package>`  | 卸载软件包             |
| `yum search <term>`     | 搜索软件包             |
| `yum list installed`    | 列出所有已安装的软件包 |

## zypper {/*#zypper*/}

用于 openSUSE 和 SUSE Linux Enterprise。

| 命令                               | 说明                   |
| ---------------------------------- | ---------------------- |
| `zypper refresh`                   | 刷新所有软件源         |
| `zypper update`                    | 升级所有已安装的软件包 |
| `zypper install <package>`         | 安装软件包             |
| `zypper remove <package>`          | 卸载软件包             |
| `zypper search <term>`             | 搜索软件包             |
| `zypper packages --installed-only` | 列出所有已安装的软件包 |

## portage {/*#portage*/}

用于 Gentoo。软件包从源代码编译，因此具有很高的可配置性。前端工具为 `emerge`。

| 命令                          | 说明                         |
| ----------------------------- | ---------------------------- |
| `emerge --sync`               | 同步 portage 树              |
| `emerge -uDN @world`          | 升级所有已安装的软件包       |
| `emerge <package>`            | 安装软件包                   |
| `emerge --depclean <package>` | 卸载软件包及其不再需要的依赖 |
| `emerge --search <term>`      | 搜索软件包                   |
| `qlist -I`                    | 列出所有已安装的软件包       |
