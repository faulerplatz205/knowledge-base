---
title: "NAT"
description: "Comment NAT traduit les adresses IP privées en adresses publiques, avec PAT/surcharge et redirection de ports."
keywords:
    - NAT
    - Network Address Translation
    - PAT
    - Port Address Translation
    - Redirection de ports
    - Réseaux
    - Adresse IP
    - IP privée
    - IP publique
tags:
    - ap2
machine_translated: true
---

# NAT (Network Address Translation)

## Vue d'ensemble {/*#overview*/}

La croissance rapide d'Internet aurait vite épuisé le stock d'adresses IP disponibles sans mécanismes permettant de les utiliser plus efficacement. NAT (Network Address Translation) y répond en permettant à de nombreux appareils d'un réseau privé de partager un petit nombre d'adresses IP publiques.

NAT fonctionne sur un équipement de bordure (généralement un pare-feu ou un routeur). Lorsqu'un paquet le traverse, NAT remplace l'adresse IP source (une adresse privée, non routable) par une adresse IP publique, routable. L'adresse publique contenue dans la réponse est ensuite retraduite en adresse privée, afin que le paquet puisse être remis à l'hôte interne correct.

## Avantages {/*#benefits*/}

- **Renumérotation simplifiée** : lors d'un changement de fournisseur d'accès, les hôtes internes n'ont pas besoin de nouvelles adresses IP. Seule l'adresse publique attribuée par le nouveau fournisseur change.
- **Économie d'adresses** : [PAT](#nat-overloading-pat) permet à de nombreux hôtes internes de partager une seule adresse IP publique, ce qui réduit fortement le nombre d'adresses publiques nécessaires.
- **Sécurité accrue** : les adresses internes et la topologie du réseau sont masquées aux réseaux externes, car seule l'adresse publique est visible.

## Fonctionnement de NAT {/*#how-nat-works*/}

1. Un hôte interne (par ex. `10.0.0.3`) envoie un paquet destiné à un hôte externe (par ex. `128.23.2.2`)
2. Le routeur de bordure (RTA) reconnaît que le paquet est destiné à Internet et sélectionne une adresse IP globale disponible (par ex. `179.9.8.80`)
3. RTA remplace l'adresse source du paquet par l'adresse globale et enregistre la correspondance dans la table NAT
4. Le paquet est transmis à la destination
5. Lorsque la réponse arrive à destination de `179.9.8.80`, RTA consulte la table NAT, trouve l'adresse interne correspondante, remplace le champ de destination et transmet le paquet en interne

La table NAT enregistre trois types d'adresses :

- **IP locale interne** : l'adresse IP privée de l'hôte interne
- **IP globale interne** : l'adresse IP publique que le routeur NAT attribue pour représenter l'hôte interne à l'extérieur
- **IP globale externe** : l'adresse IP de l'hôte de destination dans le réseau externe

**Exemple de table NAT :**

| IP locale interne | IP globale interne | IP globale externe |
| ----------------- | ------------------ | ------------------ |
| 10.0.0.3          | 179.9.8.80         | 128.23.2.2         |

## Surcharge NAT (PAT) {/*#nat-overloading-pat*/}

La surcharge NAT, appelée aussi PAT (Port Address Translation), associe plusieurs adresses IP privées à une seule adresse IP publique en suivant en plus les numéros de port. Chaque connexion interne reçoit un numéro de port unique côté public, ce qui permet au routeur de démultiplexer les réponses entrantes vers l'hôte interne correct.

**Table NAT avec surcharge :**

| IP interne | Port interne | IP globale | Port externe |
| ---------- | ------------ | ---------- | ------------ |
| 10.0.0.2   | 1555         | 179.9.8.80 | 1555         |
| 10.0.0.3   | 1331         | 179.9.8.80 | 1331         |
| 10.0.0.4   | 1444         | 179.9.8.80 | 1444         |

## Redirection de ports {/*#port-forwarding*/}

Par défaut, NAT bloque toutes les connexions entrantes initiées depuis l'extérieur. La redirection de ports permet à un trafic externe précis d'atteindre un hôte interne en associant un numéro de port de destination de l'IP publique à une adresse IP interne précise.

Exemple de flux :

1. Un client envoie une requête à `https://knowledge.moritz-grimm.dev` (IP publique `209.165.200.225`, port `443`)
2. Le routeur reçoit le paquet, car `209.165.200.225` est sa propre IP publique
3. Une règle de redirection de ports associe le port externe `443` à l'hôte interne `192.168.1.254:443`, de sorte que le routeur réécrit la destination et transmet le paquet en interne

:::info
Les numéros de port externe et interne ne doivent pas nécessairement être identiques.
:::
