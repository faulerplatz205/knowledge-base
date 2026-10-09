---
title: "IPv6 (Internet Protocol Version 6)"
description: "Comment les adresses IPv6 sont structurées, compressées et développées, avec les principales adresses réservées (bouclage, lien local), les types unicast/multicast/anycast et les portées d'adresses."
keywords:
    - IPv6
    - Internet Protocol
    - Réseaux
    - Bouclage
    - Lien local
    - Unicast
    - Multicast
    - Anycast
    - Portée
tags:
    - ap2
machine_translated: true
---

# IPv6 (Internet Protocol Version 6)

## Vue d'ensemble {/*#overview*/}

IPv6 est le successeur d'IPv4 et a été introduit pour pallier l'épuisement de l'espace d'adressage IPv4 de 32 bits. Une adresse IPv6 compte **128 bits**, ce qui offre 2¹²⁸ (environ 3,4 x 10³⁸) adresses possibles.

L'adresse s'écrit en **8 groupes de 16 bits** (souvent appelés *hextets* ou *groupes*), chacun représenté par 4 chiffres hexadécimaux et séparé par des deux-points (`:`).

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
```

- 8 groupes x 16 bits = 128 bits
- Les chiffres hexadécimaux ne sont pas sensibles à la casse (`ff00` équivaut à `FF00`) ; la minuscule est toutefois la forme canonique recommandée

## Structure d'une adresse {/*#address-structure*/}

Une adresse unicast IPv6 typique est divisée en deux moitiés de 64 bits chacune :

| Partie                | Longueur | Objet                                                          |
| --------------------- | -------- | -------------------------------------------------------------- |
| **Préfixe réseau**    | 64 bits  | Identifie le réseau (préfixe de routage + ID de sous-réseau).  |
| **Identifiant d'interface** | 64 bits | Identifie l'interface individuelle au sein de ce réseau. |

La longueur du préfixe s'écrit en notation CIDR, par ex. `2001:db8:abcd:1234::/64`. Un `/64` est la taille standard d'un sous-réseau unique.

## Abréviation (compression) {/*#shortening-compression*/}

Deux règles permettent d'écrire une adresse IPv6 de façon plus compacte. Elles peuvent être combinées.

### Règle 1 : supprimer les zéros initiaux {/*#rule-1-remove-leading-zeros*/}

Dans chaque groupe, les zéros initiaux peuvent être omis. Au moins un chiffre doit subsister par groupe.

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8:0:0:0:ff00:42:8329
```

### Règle 2 : réduire une suite de groupes nuls (`::`) {/*#rule-2-collapse-one-run-of-zero-groups-*/}

Une seule suite contiguë d'un ou de plusieurs groupes entièrement nuls peut être remplacée par un double deux-points `::`.

```text
2001:db8:0:0:0:ff00:42:8329
2001:db8::ff00:42:8329
```

**Important :** `::` ne peut apparaître **qu'une seule fois** dans une adresse, sinon la longueur serait ambiguë. Si deux suites de zéros de même longueur existent, c'est la plus à gauche qui doit être compressée.

```text
fe80:0:0:0:1:0:0:1   =>   fe80::1:0:0:1   (correct)
fe80:0:0:0:1:0:0:1   =>   fe80::1::1      (invalid, two "::")
```

## Développement {/*#expanding*/}

Le développement inverse la compression pour retrouver la forme complète de 128 bits. Il est utile pour la comparaison ou le calcul manuel de sous-réseaux.

1. **Restaurer le `::` :** compter les groupes présents, puis insérer autant de groupes `0` que nécessaire pour atteindre 8 groupes au total.
2. **Compléter chaque groupe :** ajouter des zéros initiaux jusqu'à ce que chaque groupe compte 4 chiffres hexadécimaux.

```text
2001:db8::ff00:42:8329

Step 1 (restore zero groups, 5 groups present => insert 3):
2001:db8:0:0:0:ff00:42:8329

Step 2 (pad to 4 digits each):
2001:0db8:0000:0000:0000:ff00:0042:8329
```

## Types d'adresses {/*#address-types*/}

IPv6 n'a pas de diffusion (broadcast). Le multicast en tient lieu.

| Type          | Signification                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **Unicast**   | Un à un. Identifie une interface unique ; un paquet est remis exactement à cette interface.                    |
| **Multicast** | Un à plusieurs. Remis à toutes les interfaces ayant rejoint le groupe multicast.                               |
| **Anycast**   | Un au plus proche. Partagé par plusieurs interfaces ; remis à l'interface la plus proche topologiquement.                  |

## Portées {/*#scopes*/}

La *portée* définit la région du réseau dans laquelle une adresse est valide et routable. Les deux portées unicast les plus pertinentes sont :

- **Lien local :** valide uniquement sur le lien directement connecté (un segment). Non routée. Configurée automatiquement sur chaque interface IPv6.
- **Globale :** unique au niveau mondial et routable sur Internet, comparable à une adresse IPv4 publique.

Les adresses multicast portent un champ de portée explicite (par ex. interface locale, lien local, site local, globale).

### Index de zone pour le lien local {/*#zone-index-for-link-local*/}

Les adresses de lien local (`fe80::/10`) n'étant pas uniques entre plusieurs interfaces, l'interface de sortie doit être indiquée au moyen d'un index de zone ajouté avec `%`.

```text
ping fe80::1%eth0      # Linux (interface name)
ping fe80::1%12        # Windows (interface index)
```

## Adresses importantes {/*#important-addresses*/}

| Adresse / préfixe | Nom                  | Description                                                                                  |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------- |
| `::/128`         | Non spécifiée        | Uniquement des zéros. Utilisée comme adresse source avant l'attribution d'une adresse (similaire à `0.0.0.0`). |
| `::1/128`        | Bouclage             | L'hôte local, équivalent à l'adresse IPv4 `127.0.0.1`.                                           |
| `fe80::/10`      | Lien local           | Configurée automatiquement, valide uniquement sur le lien local, jamais routée.              |
| `fc00::/7`       | Unique locale (ULA)  | Adresses privées à usage interne, non routées sur Internet (similaire à la RFC 1918).        |
| `2000::/3`       | Unicast global       | Adresses publiques, routables globalement.                                                   |
| `ff00::/8`       | Multicast            | Toutes les adresses multicast commencent par `ff`.                                           |
| `ff02::1`        | Tous les nœuds (lien) | Multicast vers chaque nœud du lien.                                                         |
| `ff02::2`        | Tous les routeurs (lien) | Multicast vers chaque routeur du lien.                                                   |
| `2001:db8::/32`  | Documentation        | Réservée aux exemples et à la documentation, jamais utilisée en production.                  |

## IPv6 et IPv4 {/*#ipv6-vs-ipv4*/}

| Propriété            | IPv4                       | IPv6                         |
| -------------------- | -------------------------- | ---------------------------- |
| Longueur d'adresse   | 32 bits                    | 128 bits                     |
| Notation             | Décimale, séparée par des points | Hexadécimale, séparée par des deux-points |
| Diffusion (broadcast) | Oui                       | Non (remplacée par le multicast) |
| Bouclage             | `127.0.0.1`                | `::1`                        |
| Autoconfiguration    | DHCP / APIPA               | SLAAC + lien local           |
