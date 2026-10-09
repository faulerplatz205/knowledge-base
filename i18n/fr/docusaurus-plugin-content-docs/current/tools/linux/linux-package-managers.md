---
title: "Gestionnaires de paquets Linux"
description: "Aperçu des gestionnaires de paquets Linux les plus courants, des distributions prises en charge et de leurs commandes principales."
keywords:
    - Linux
    - Gestionnaire de paquets
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

# Gestionnaires de paquets Linux

Un gestionnaire de paquets automatise l'installation, la mise à jour et la suppression de logiciels sur un système Linux. Chaque grande famille de distributions utilise son propre outil.

## apt {/*#apt*/}

Utilisé par les distributions basées sur Debian : Ubuntu, Debian, Kali Linux, Linux Mint.

| Commande                | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `apt update`            | Actualiser l'index des paquets                       |
| `apt upgrade`           | Mettre à niveau tous les paquets installés           |
| `apt install <package>` | Installer un paquet                                  |
| `apt remove <package>`  | Supprimer un paquet (en conservant les fichiers de configuration) |
| `apt purge <package>`   | Supprimer un paquet et ses fichiers de configuration |
| `apt search <term>`     | Rechercher un paquet                                 |
| `apt list --installed`  | Lister tous les paquets installés                    |

## pacman {/*#pacman*/}

Utilisé par les distributions basées sur Arch : Arch Linux, Manjaro, EndeavourOS.

| Commande               | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `pacman -Syu`          | Synchroniser la base de données des paquets et mettre à niveau tous les paquets |
| `pacman -S <package>`  | Installer un paquet                                               |
| `pacman -R <package>`  | Supprimer un paquet                                               |
| `pacman -Rs <package>` | Supprimer un paquet et ses dépendances inutilisées                |
| `pacman -Ss <term>`    | Rechercher dans la base de données des paquets                    |
| `pacman -Q`            | Lister tous les paquets installés                                 |

## dnf {/*#dnf*/}

Utilisé par les distributions basées sur Red Hat à partir de Fedora 22 et CentOS Stream 8.

| Commande                | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `dnf check-update`      | Vérifier les mises à jour disponibles          |
| `dnf upgrade`           | Mettre à niveau tous les paquets installés     |
| `dnf install <package>` | Installer un paquet                            |
| `dnf remove <package>`  | Supprimer un paquet                            |
| `dnf search <term>`     | Rechercher un paquet                           |
| `dnf list --installed`  | Lister tous les paquets installés              |

## yum {/*#yum*/}

Prédécesseur de [dnf](#dnf), utilisé sur Fedora 21, CentOS 7 et RHEL 7 et antérieurs. Remplacé par dnf en raison de son résolveur de dépendances lent basé sur Python et de sa dette technique accumulée.

| Commande                | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `yum check-update`      | Vérifier les mises à jour disponibles          |
| `yum update`            | Mettre à niveau tous les paquets installés     |
| `yum install <package>` | Installer un paquet                            |
| `yum remove <package>`  | Supprimer un paquet                            |
| `yum search <term>`     | Rechercher un paquet                           |
| `yum list installed`    | Lister tous les paquets installés              |

## zypper {/*#zypper*/}

Utilisé par openSUSE et SUSE Linux Enterprise.

| Commande                           | Description                                |
| ---------------------------------- | ------------------------------------------ |
| `zypper refresh`                   | Actualiser tous les dépôts                 |
| `zypper update`                    | Mettre à niveau tous les paquets installés |
| `zypper install <package>`         | Installer un paquet                        |
| `zypper remove <package>`          | Supprimer un paquet                        |
| `zypper search <term>`             | Rechercher un paquet                       |
| `zypper packages --installed-only` | Lister tous les paquets installés          |

## portage {/*#portage*/}

Utilisé par Gentoo. Les paquets sont compilés à partir des sources, ce qui les rend hautement configurables. L'outil frontal est `emerge`.

| Commande                      | Description                                        |
| ----------------------------- | -------------------------------------------------- |
| `emerge --sync`               | Synchroniser l'arbre portage                       |
| `emerge -uDN @world`          | Mettre à niveau tous les paquets installés         |
| `emerge <package>`            | Installer un paquet                                |
| `emerge --depclean <package>` | Supprimer un paquet et ses dépendances inutilisées |
| `emerge --search <term>`      | Rechercher un paquet                               |
| `qlist -I`                    | Lister tous les paquets installés                  |
