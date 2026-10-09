---
title: "Modèle OSI"
description: "Le modèle de référence OSI à 7 couches : aperçu du rôle, des responsabilités et des protocoles courants de chaque couche."
keywords:
    - Modèle OSI
    - Couche OSI
    - Couche physique
    - Couche liaison de données
    - Couche réseau
    - Couche transport
    - Couche session
    - Couche présentation
    - Couche application
    - Réseaux
tags:
    - ap2
machine_translated: true
---

# Modèle OSI

## Vue d'ensemble {/*#overview*/}

Le modèle OSI (Open Systems Interconnection) est un cadre conceptuel qui normalise la manière dont différents systèmes réseau communiquent entre eux. Il divise la communication en **7 couches**, chacune ayant un rôle précis. Le modèle est neutre vis-à-vis des fabricants et sert de référence pour comprendre l'interaction des protocoles.

## Les 7 couches {/*#the-7-layers*/}

| #   | Nom            | Responsabilité principale                             |
| --- | -------------- | ----------------------------------------------------- |
| 7   | Application    | Protocoles et services orientés utilisateur           |
| 6   | Présentation   | Formatage, encodage et chiffrement des données        |
| 5   | Session        | Gestion des sessions entre applications               |
| 4   | Transport      | Remise de bout en bout entre processus               |
| 3   | Réseau         | Adressage logique et routage                          |
| 2   | Liaison de données | Remise de trames au sein d'un réseau local        |
| 1   | Physique       | Transmission de bits bruts sur un support             |

## Détail des couches {/*#layer-details*/}

### Couche 1 – Physique {/*#layer-1--physical*/}

Transmet des bits bruts sur un support physique (câbles, radio, fibre). Définit les niveaux de tension, le brochage et la synchronisation des bits. N'a aucune notion d'adressage.

**Exemples :** câbles Ethernet, signaux radio Wi-Fi, fibre optique, concentrateurs (hubs), répéteurs

### Couche 2 – Liaison de données {/*#layer-2--data-link*/}

Regroupe les bits en **trames** et gère la remise au sein d'un seul segment réseau au moyen d'**adresses MAC**. Détecte également les erreurs de transmission par CRC.

**Sous-couches :** LLC (Logical Link Control) et MAC (Media Access Control)

**Exemples :** Ethernet, Wi-Fi (802.11), ARP, commutateurs (switches)

### Couche 3 – Réseau {/*#layer-3--network*/}

Gère l'**adressage logique** (IP) et le routage des paquets à travers plusieurs réseaux. Détermine le meilleur chemin de la source à la destination.

**Exemples :** IP (IPv4, IPv6), ICMP, routeurs

### Couche 4 – Transport {/*#layer-4--transport*/}

Assure la **communication de bout en bout** entre processus. Gère la segmentation, le réassemblage, le contrôle de flux et la reprise sur erreur.

- **TCP** : orienté connexion, fiable, remise ordonnée
- **UDP** : sans connexion, plus rapide, sans garantie de remise

**Exemples :** TCP, UDP, numéros de port

### Couche 5 – Session {/*#layer-5--session*/}

Établit, gère et termine les **sessions** (connexions logiques) entre applications. Prend en charge la synchronisation et les points de reprise pour les longs transferts de données.

**Exemples :** NetBIOS, RPC, jetons de session

### Couche 6 – Présentation {/*#layer-6--presentation*/}

Traduit les données entre le format de l'application et celui du réseau. Gère l'encodage, la sérialisation, la compression et le chiffrement.

**Exemples :** TLS/SSL (chiffrement), JSON, XML, JPEG, MPEG

### Couche 7 – Application {/*#layer-7--application*/}

La couche la plus proche de l'utilisateur. Fournit des services réseau directement aux applications. Elle ne désigne pas les applications elles-mêmes, mais les protocoles qu'elles utilisent.

**Exemples :** HTTP, HTTPS, FTP, SMTP, DNS, SSH

## Moyen mnémotechnique {/*#mnemonic*/}

Pour retenir les couches de la plus basse (1) à la plus haute (7) :

> **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way`

**P**hysical, **D**ata Link, **N**etwork, **T**ransport, **S**ession, **P**resentation, **A**pplication
