---
title: "WireGuard"
description: "Vue d'ensemble de WireGuard : un protocole VPN moderne et rapide reposant sur une cryptographie de pointe."
keywords:
  - "WireGuard"
  - "VPN"
  - "Tunnelisation"
  - "Cryptographie"
  - "Réseau"
  - "UDP"
machine_translated: true
---

# WireGuard

## Qu'est-ce que WireGuard ? {/*#what-is-wireguard*/}

WireGuard est un protocole VPN moderne qui crée des tunnels chiffrés entre des appareils. Il est conçu pour être nettement plus simple et plus rapide que des protocoles plus anciens comme IPsec ou OpenVPN, avec une base de code bien plus petite (~4 000 lignes contre plusieurs centaines de milliers).

WireGuard fonctionne au niveau de la **[couche réseau](./osi-model.md#layer-3--network) (couche 3)** et crée une interface réseau virtuelle sur chaque appareil. Le trafic acheminé par cette interface est chiffré et envoyé aux pairs via UDP.

---

## Fonctionnement {/*#how-it-works*/}

WireGuard utilise un concept appelé **cryptokey routing** : chaque pair est identifié par sa clé publique, et chaque pair définit quelles adresses IP sont joignables par son intermédiaire.

```text
[Interface]
PrivateKey = <your private key>
Address    = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey  = <peer's public key>
AllowedIPs = 10.0.0.2/32
Endpoint   = 203.0.113.5:51820
```

Lorsque l'IP de destination d'un paquet sortant correspond au `AllowedIPs` d'un pair, WireGuard le chiffre et l'envoie au `Endpoint` de ce pair. Les paquets entrants sont déchiffrés et acceptés uniquement s'ils proviennent d'une clé publique connue et si leur IP source se situe dans le `AllowedIPs` de ce pair.

---

## Concepts clés {/*#key-concepts*/}

### Paires de clés {/*#key-pairs*/}

Chaque interface WireGuard possède une **clé privée** et une **clé publique** dérivée. Les clés publiques sont échangées hors bande (manuellement, ou par un outil comme [Tailscale](../tools/tailscale.md)) et servent d'identité à un pair.

### Interface {/*#interface*/}

Une **interface** WireGuard est une interface réseau virtuelle (par ex. `wg0`) sur un appareil. Elle possède sa propre adresse IP et écoute les paquets UDP entrants sur un port configuré.

### Pair {/*#peer*/}

Un **pair** est toute autre interface WireGuard avec laquelle cette interface est autorisée à communiquer. Chaque entrée de pair définit :

- **PublicKey :** la clé publique du pair
- **AllowedIPs :** plages d'IP dont le trafic est acheminé via ce pair
- **Endpoint** *(facultatif)* : l'adresse IP et le port UDP réels du pair

### AllowedIPs {/*#allowedips*/}

`AllowedIPs` remplit une double fonction :

- **Sortant :** agit comme règle de routage, les paquets vers ces IP sont envoyés à ce pair
- **Entrant :** agit comme filtre, les paquets provenant de ce pair ne sont acceptés que si leur IP source se situe dans cette plage

Définir `AllowedIPs = 0.0.0.0/0` achemine tout le trafic via un pair, ce qui est la base des configurations de nœud de sortie / VPN en tunnel complet.

---

## Cryptographie {/*#cryptography*/}

WireGuard utilise une suite cryptographique fixe et moderne. Il n'y a aucune négociation, ce qui élimine toute une classe d'attaques par rétrogradation :

| Finalité              | Algorithme         |
| --------------------- | ------------------ |
| Échange de clés       | Curve25519 (ECDH)  |
| Chiffrement symétrique | ChaCha20          |
| Authentification      | Poly1305 (MAC)     |
| Hachage               | BLAKE2s            |
| Dérivation de clés    | HKDF               |

---

## Comparaison avec d'autres protocoles VPN {/*#comparison-to-other-vpn-protocols*/}

| Propriété                 | WireGuard         | OpenVPN         | IPsec                  |
| ------------------------- | ----------------- | --------------- | ---------------------- |
| Taille de la base de code | ~4 000 lignes     | ~70 000 lignes  | Très grande            |
| Protocole                 | UDP uniquement    | TCP ou UDP      | UDP / ESP              |
| Configuration             | Simple            | Complexe        | Complexe               |
| Performance               | Très rapide       | Moyenne         | Rapide                 |
| Cryptographie             | Fixe, moderne     | Configurable    | Configurable           |
| Traversée de NAT          | Intégrée          | Limitée         | Nécessite des ajouts   |

---

## Relation avec Tailscale {/*#relation-to-tailscale*/}

WireGuard ne gère que le **plan de données** => il chiffre et achemine les paquets entre pairs. Il ne gère ni la découverte des pairs, ni la distribution des clés, ni le contrôle d'accès.

[Tailscale](../tools/tailscale.md) repose sur WireGuard et ajoute un **plan de contrôle** géré : échange automatique de clés, découverte des pairs, traversée de NAT, MagicDNS et ACL. Les performances de WireGuard sont ainsi obtenues sans aucune configuration manuelle.
