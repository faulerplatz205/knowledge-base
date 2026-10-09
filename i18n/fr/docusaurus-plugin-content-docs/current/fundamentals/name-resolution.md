---
title: "Résolution de noms"
description: "Pourquoi la résolution de noms est nécessaire et aperçu des systèmes courants pour les réseaux Windows et Linux : DNS, LLMNR, NetBIOS et mDNS."
keywords:
    - Résolution de noms
    - DNS
    - LLMNR
    - NetBIOS
    - mDNS
    - Namensauflösung
tags:
    - ap2
machine_translated: true
---

# Résolution de noms

Les ordinateurs en réseau sont identifiés par des adresses uniques (adresse IP, adresse MAC) et les utilisent pour communiquer. Les adresses numériques étant difficiles à retenir pour les humains, des noms sont utilisés à leur place. La **résolution de noms** est le mécanisme qui associe un nom (par ex. un nom d'ordinateur) à son adresse (par ex. une adresse IP).

## Systèmes de résolution {/*#resolution-systems*/}

Plusieurs systèmes existent pour les réseaux Windows et Linux :

| Système     | Portée                   | Remarque                                                                                                                                                  |
| ----------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DNS**     | Réseau entier / Internet | Système le plus important, requis par Active Directory. Port UDP `53`, jusqu'à 255 caractères (par ex. `pc01.bs1-landshut.de`)                           |
| **LLMNR**   | Même sous-réseau uniquement | Link Local Multicast Name Resolution (depuis Windows Vista), pour les groupes de travail. Utilise le multicast, compatible IPv6, aucune configuration nécessaire |
| **NetBIOS** | Même sous-réseau / hérité | Utilisé avant Windows Vista pour trouver des ordinateurs. 15 caractères max., ports `137/138/139/445`                                          |
| **mDNS**    | LAN, lien local          | Multicast DNS (développé par Apple), TLD `.local`, aucun serveur de noms nécessaire. L'implémentation Linux est `avahi`                          |

## DNS {/*#dns*/}

DNS (Domain Name System) est le principal système de résolution de noms et la base de la résolution de noms sur Internet. Il est traité en détail dans [DNS](./dns.md).

## LLMNR {/*#llmnr*/}

LLMNR ne résout les noms qu'au sein du même sous-réseau et est destiné aux petits groupes de travail. Il utilise le multicast au lieu de la diffusion (moins de trafic réseau) et, contrairement à NetBIOS, est compatible IPv6. Il ne peut pas résoudre les noms de systèmes plus anciens (par ex. Windows Server 2003, Windows XP).

## NetBIOS {/*#netbios*/}

NetBIOS (NetBIOS over TCP/IP, NetBT/NBT) était pertinent jusqu'à Windows 2000/Vista et servait à parcourir le réseau à la recherche d'ordinateurs. Il est utilisé comme solution de repli lorsque DNS n'est pas configuré et que LLMNR est désactivé ou ne peut pas résoudre un nom.

## mDNS {/*#mdns*/}

mDNS (Multicast DNS) permet la résolution de noms sur un LAN sans serveur de noms dédié, au moyen de messages multicast sous le TLD de lien local `.local`. À partir de Windows 11 22H2, Microsoft prévoit que mDNS remplace à la fois NetBIOS et LLMNR.
