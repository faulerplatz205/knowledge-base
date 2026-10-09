---
title: "Linuxパッケージマネージャー"
description: "主なLinuxパッケージマネージャー、対応するディストリビューション、および主要なコマンドの概要。"
keywords:
    - Linux
    - パッケージマネージャー
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

# Linuxパッケージマネージャー

パッケージマネージャーは、Linuxシステム上でのソフトウェアのインストール、更新、削除を自動化する。主要なディストリビューションの系統ごとに、それぞれ独自のツールが使用される。

## apt {/*#apt*/}

Debian系ディストリビューション(Ubuntu、Debian、Kali Linux、Linux Mint)で使用される。

| コマンド                | 説明                                  |
| ----------------------- | ------------------------------------- |
| `apt update`            | パッケージインデックスを更新する      |
| `apt upgrade`           | インストール済みの全パッケージをアップグレードする |
| `apt install <package>` | パッケージをインストールする          |
| `apt remove <package>`  | パッケージを削除する(設定ファイルは残す) |
| `apt purge <package>`   | パッケージを設定ファイルごと削除する  |
| `apt search <term>`     | パッケージを検索する                  |
| `apt list --installed`  | インストール済みの全パッケージを一覧表示する |

## pacman {/*#pacman*/}

Arch系ディストリビューション(Arch Linux、Manjaro、EndeavourOS)で使用される。

| コマンド               | 説明                                           |
| ---------------------- | ---------------------------------------------- |
| `pacman -Syu`          | パッケージデータベースを同期し、全パッケージをアップグレードする |
| `pacman -S <package>`  | パッケージをインストールする                   |
| `pacman -R <package>`  | パッケージを削除する                           |
| `pacman -Rs <package>` | パッケージと不要になった依存パッケージを削除する |
| `pacman -Ss <term>`    | パッケージデータベースを検索する               |
| `pacman -Q`            | インストール済みの全パッケージを一覧表示する   |

## dnf {/*#dnf*/}

Fedora 22およびCentOS Stream 8以降のRed Hat系ディストリビューションで使用される。

| コマンド                | 説明                           |
| ----------------------- | ------------------------------ |
| `dnf check-update`      | 利用可能な更新を確認する       |
| `dnf upgrade`           | インストール済みの全パッケージをアップグレードする |
| `dnf install <package>` | パッケージをインストールする   |
| `dnf remove <package>`  | パッケージを削除する           |
| `dnf search <term>`     | パッケージを検索する           |
| `dnf list --installed`  | インストール済みの全パッケージを一覧表示する |

## yum {/*#yum*/}

[dnf](#dnf)の前身で、Fedora 21、CentOS 7、RHEL 7以前で使用される。Pythonベースの依存関係リゾルバーが遅いことと技術的負債の蓄積により、dnfに置き換えられた。

| コマンド                | 説明                           |
| ----------------------- | ------------------------------ |
| `yum check-update`      | 利用可能な更新を確認する       |
| `yum update`            | インストール済みの全パッケージをアップグレードする |
| `yum install <package>` | パッケージをインストールする   |
| `yum remove <package>`  | パッケージを削除する           |
| `yum search <term>`     | パッケージを検索する           |
| `yum list installed`    | インストール済みの全パッケージを一覧表示する |

## zypper {/*#zypper*/}

openSUSEおよびSUSE Linux Enterpriseで使用される。

| コマンド                           | 説明                           |
| ---------------------------------- | ------------------------------ |
| `zypper refresh`                   | 全リポジトリを更新する         |
| `zypper update`                    | インストール済みの全パッケージをアップグレードする |
| `zypper install <package>`         | パッケージをインストールする   |
| `zypper remove <package>`          | パッケージを削除する           |
| `zypper search <term>`             | パッケージを検索する           |
| `zypper packages --installed-only` | インストール済みの全パッケージを一覧表示する |

## portage {/*#portage*/}

Gentooで使用される。パッケージはソースからコンパイルされるため、高度な設定が可能である。フロントエンドツールは`emerge`である。

| コマンド                      | 説明                                         |
| ----------------------------- | -------------------------------------------- |
| `emerge --sync`               | portageツリーを同期する                      |
| `emerge -uDN @world`          | インストール済みの全パッケージをアップグレードする |
| `emerge <package>`            | パッケージをインストールする                 |
| `emerge --depclean <package>` | パッケージと不要になった依存パッケージを削除する |
| `emerge --search <term>`      | パッケージを検索する                         |
| `qlist -I`                    | インストール済みの全パッケージを一覧表示する |
