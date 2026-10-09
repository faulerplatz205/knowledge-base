---
title: "ARP (Address Resolution Protocol)"
description: "Comment l'ARP résout les adresses IP en adresses MAC au sein d'un réseau local, avec la remise locale et distante, le processus requête/réponse et le cache ARP."
keywords:
    - "ARP"
    - "Address Resolution Protocol"
    - "Adresse MAC"
    - "Adresse IP"
    - "Réseaux"
    - "Couche 2"
    - "Couche 3"
    - "Passerelle par défaut"
tags:
    - ap2
machine_translated: true
---

# ARP (Address Resolution Protocol)

## Aperçu {/*#overview*/}

L'ARP (Address Resolution Protocol) opère à la frontière entre la couche 2 (liaison de données) et la couche 3 (réseau) du [modèle OSI](./osi-model.md). Il résout une **adresse IP** connue en l'**adresse MAC** correspondante, nécessaire pour remettre une trame au sein d'un segment de réseau local.

## Deux types d'adresses {/*#two-types-of-addresses*/}

Chaque appareil d'un LAN Ethernet est atteint à l'aide de deux adresses différentes :

- **Adresse MAC :** Utilisée pour la communication entre cartes réseau au sein du même segment de réseau. Il s'agit de l'adressage de la trame Ethernet de couche 2.
- **Adresse IP :** Utilisée pour acheminer le paquet de la source d'origine à la destination finale, quel que soit le nombre de réseaux traversés. Il s'agit de l'adressage du paquet IP de couche 3.

La trame Ethernet encapsule le paquet IP. Alors que le paquet IP circule de bout en bout, la trame Ethernet qui l'entoure n'existe que sur un seul segment de réseau.

## Pourquoi l'ARP est nécessaire {/*#why-arp-is-needed*/}

Les paquets IP contiennent des adresses IP source et destination, mais les trames Ethernet utilisent des adresses MAC pour la remise sur le segment local. Lorsqu'un appareil veut envoyer des données, il connaît l'adresse IP de destination mais doit d'abord découvrir l'adresse MAC à laquelle la trame doit être adressée.

## Remise locale et distante {/*#local-vs-remote-delivery*/}

L'appareil émetteur détermine d'abord si la destination se trouve sur le **même réseau** en appliquant son masque de sous-réseau (un ET logique de sa propre IP et de l'IP de destination avec le masque). Le résultat détermine l'adresse MAC dont la trame a besoin :

- **Même réseau** – L'adresse MAC de destination est l'adresse MAC de l'hôte de destination lui-même. L'appareil résout l'IP de destination via l'ARP.
- **Réseau différent** – L'adresse MAC de destination est l'adresse MAC de la **passerelle par défaut** (l'interface réseau du routeur). L'appareil résout l'IP de la passerelle via l'ARP.

Dans les deux cas, les **adresses IP source et destination du paquet ne changent jamais**. Seules les adresses MAC de la trame sont réécrites : chaque routeur du chemin retire la trame entrante et en construit une nouvelle avec les adresses MAC source et destination du saut suivant.

## Consultation de la table ARP {/*#arp-table-lookup*/}

Avant l'envoi, l'appareil recherche dans sa table ARP (conservée en RAM) l'IP qu'il doit résoudre :

- Si l'IP de destination se trouve sur le **même réseau**, il recherche l'**adresse IP de destination**.
- Si l'IP de destination se trouve sur un **réseau différent**, il recherche l'**adresse IP de la passerelle par défaut**.

Si une entrée correspondante existe, l'adresse MAC en cache est utilisée pour construire la trame. Sinon, l'appareil envoie une **requête ARP**.

## Processus de requête et de réponse ARP {/*#arp-request--reply-process*/}

1. **Vérification du cache ARP** – Si l'adresse MAC de l'IP recherchée est déjà en cache, aucune requête n'est nécessaire
2. **Requête ARP (broadcast)** – Si elle n'est pas en cache, l'émetteur diffuse une requête ARP à tous les appareils du segment : *« Qui possède l'IP X.X.X.X ? Répondre à l'IP Y.Y.Y.Y »*. L'adresse MAC de destination de cette trame de broadcast est `FF:FF:FF:FF:FF:FF`
3. **Réponse ARP (unicast)** – L'appareil possédant l'IP correspondante répond directement à l'émetteur avec son adresse MAC ; tous les autres appareils ignorent la requête
4. **Mise à jour du cache** – L'émetteur enregistre la correspondance IP-MAC dans son cache ARP pour un usage ultérieur
5. **Envoi de la trame** – L'émetteur construit alors la trame Ethernet avec l'adresse MAC résolue

## Cache ARP {/*#arp-cache*/}

Le cache ARP stocke les correspondances IP-MAC récentes pour éviter des broadcasts répétés.

- Les entrées ont un TTL (Time to Live) et expirent automatiquement
- Commandes courantes (Windows/Linux) :

| Commande | Fonction                              |
| -------- | ------------------------------------- |
| `arp -a` | Afficher la table ARP                 |
| `arp -d` | Supprimer des entrées de la table ARP |

## Sécurité : usurpation ARP (ARP spoofing) {/*#security-arp-spoofing*/}

Comme l'ARP ne dispose d'aucun mécanisme d'authentification, un attaquant peut envoyer de fausses réponses ARP pour empoisonner le cache d'autres appareils et rediriger le trafic via sa propre machine (attaque de l'homme du milieu).

Les contre-mesures comprennent :

- **Dynamic ARP Inspection (DAI)** sur les commutateurs administrables
- **Entrées ARP statiques** pour les appareils critiques
- Surveillance du réseau et détection d'anomalies
