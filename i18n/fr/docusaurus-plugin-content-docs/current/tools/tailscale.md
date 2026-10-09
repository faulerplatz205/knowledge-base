---
title: "Tailscale"
description: "Aperçu de Tailscale : un VPN maillé reposant sur WireGuard pour connecter des appareils de manière sécurisée à travers différents réseaux."
keywords:
  - "Tailscale"
  - "VPN"
  - "WireGuard"
  - "Réseau maillé"
  - "Tailnet"
  - "VPN sans configuration"
  - "Réseau"
machine_translated: true
---

# Tailscale

## Qu'est-ce que Tailscale ? {/*#what-is-tailscale*/}

Tailscale est un service de VPN maillé sans configuration, construit sur [WireGuard](../fundamentals/wireguard.md). Il relie des appareils au sein d'un réseau privé appelé « **tailnet** », indépendamment de leur emplacement et du fait qu'ils se trouvent derrière un NAT, des pare-feu ou des fournisseurs d'accès différents.

Contrairement aux VPN traditionnels qui font passer tout le trafic par une passerelle centrale, Tailscale établit dès que possible des **connexions directes de pair à pair** entre les appareils. Il en résulte une latence plus faible et un débit plus élevé.

---

## Architecture {/*#architecture*/}

Tailscale comporte deux composants principaux :

- **Plan de contrôle** : le serveur de coordination de Tailscale gère l'échange de clés et l'authentification, et distribue la configuration réseau à tous les nœuds. Il ne voit jamais le trafic réel.
- **Plan de données** : le trafic réel circule directement entre les nœuds via des tunnels WireGuard chiffrés, sans passer par les serveurs de Tailscale.

```text
Device A <===[WireGuard tunnel (direct P2P)]===> Device B
             (Tailscale control plane: key exchange only)
```

Lorsqu'une connexion directe n'est pas possible (p. ex. pare-feu stricts des deux côtés), Tailscale se rabat sur ses serveurs **DERP** (Designated Encrypted Relay for Packets), qui relaient des paquets chiffrés sans pouvoir les lire.

---

## Concepts clés {/*#key-concepts*/}

### Tailnet {/*#tailnet*/}

Un tailnet est le réseau privé que forment tous les appareils connectés à Tailscale. Les appareils d'un même tailnet peuvent communiquer directement entre eux comme s'ils se trouvaient sur le même réseau local.

### Nœuds {/*#nodes*/}

Tout appareil (ordinateur portable, serveur, téléphone, Raspberry Pi) enregistré dans Tailscale et rattaché à un tailnet est appelé **nœud**. Chaque nœud reçoit une adresse IP privée stable dans la plage `100.64.0.0/10` (espace Carrier-Grade NAT).

### MagicDNS {/*#magicdns*/}

MagicDNS attribue automatiquement des noms d'hôte lisibles à chaque nœud du tailnet (p. ex. `my-laptop`, `home-server`). Il est ainsi possible de se connecter aux appareils par leur nom plutôt que par leur adresse IP, sans configurer de DNS manuellement.

### Nœuds de sortie {/*#exit-nodes*/}

Un **nœud de sortie** (exit node) est un nœud qui fait passer par lui-même tout le trafic destiné à Internet provenant des autres nœuds. Cela est utile pour :

- Accéder à Internet comme depuis un autre emplacement
- Imposer une adresse IP sortante unique à tous les appareils
- Sécuriser le trafic sur des réseaux non fiables (p. ex. Wi-Fi public)

### Routeurs de sous-réseau {/*#subnet-routers*/}

Un **routeur de sous-réseau** permet à un nœud Tailscale d'annoncer l'accès à un réseau local existant (sous-réseau). Les autres membres du tailnet peuvent alors atteindre les appareils de ce sous-réseau sans installer Tailscale sur chacun d'eux.

```text
Tailnet Node (subnet router) <===> Local Network (192.168.1.0/24)
                                         |
                               [Non-Tailscale devices]
```

**Cas d'usage typique :** exposer un LAN domestique ou de bureau à tous les appareils Tailscale du tailnet.

### ACL (listes de contrôle d'accès) {/*#acls-access-control-lists*/}

Tailscale utilise une politique d'ACL gérée de manière centralisée pour contrôler quels nœuds peuvent communiquer entre eux. Les règles sont écrites dans un format HuJSON, basé sur JSON, dans la console d'administration de Tailscale.

---

## Avantages {/*#benefits*/}

- **Aucune configuration** : pas de redirection de ports, pas de règles de pare-feu, pas de gestion manuelle des clés
- **Fonctionne derrière un NAT** : utilise des techniques de traversée de NAT pour établir des connexions directes
- **Chiffrement de bout en bout** : tout le trafic est chiffré par WireGuard ; les serveurs de Tailscale ne voient jamais les données utiles
- **Multiplateforme** : disponible sur Linux, macOS, Windows, iOS, Android, etc.
- **Accès fondé sur l'identité** : authentification via des fournisseurs SSO (Google, GitHub, Microsoft, etc.)

---

## Cas d'usage courants {/*#common-use-cases*/}

| Cas d'usage                             | Comment                                      |
| --------------------------------------- | -------------------------------------------- |
| Accéder à un serveur domestique à distance | Enregistrer le serveur comme nœud         |
| Sécuriser un Wi-Fi public               | Faire passer le trafic par un nœud de sortie |
| Atteindre des appareils sans Tailscale  | Utiliser un routeur de sous-réseau           |
| Connecter une équipe distribuée         | Tous les membres rejoignent le même tailnet  |
| Accès à un laboratoire domestique       | Enregistrer toutes les machines du laboratoire comme nœuds |
