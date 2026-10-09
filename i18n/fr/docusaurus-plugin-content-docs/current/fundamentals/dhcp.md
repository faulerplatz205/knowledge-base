---
title: "DHCP"
description: "Comment DHCP attribue automatiquement la configuration IP aux clients, avec le processus DORA, les baux, les étendues, les options, les réservations, les agents relais et le basculement."
keywords:
    - DHCP
    - Dynamic Host Configuration Protocol
    - DORA
    - Bail
    - Étendue
    - Agent relais
    - Basculement
    - DHCPv6
tags:
    - ap2
machine_translated: true
---

# DHCP (Dynamic Host Configuration Protocol)

DHCP attribue automatiquement aux clients une adresse IP, un masque de sous-réseau et d'autres paramètres de configuration au sein d'un réseau local. Cela évite de configurer chaque hôte manuellement. DHCP utilise les ports UDP `67` (serveur) et `68` (client).

## Le processus DORA {/*#the-dora-process*/}

Un client obtient sa configuration en quatre étapes, retenues sous le sigle **DORA** :

1. **Discover** : le client diffuse un `DHCP Discover` dans le réseau local pour trouver un serveur.
2. **Offer** : un serveur DHCP répond par un `DHCP Offer` contenant une adresse disponible et des paramètres de configuration.
3. **Request** : le client demande l'adresse proposée au moyen d'un `DHCP Request`.
4. **Acknowledge** : si l'adresse est toujours disponible, le serveur la confirme par un `DHCP Ack`.

## Concepts clés {/*#key-concepts*/}

- **Bail (lease) :** une adresse est attribuée pour une durée limitée (le bail). Cela évite qu'une adresse reste liée indéfiniment à un client et permet de la réutiliser.
- **Étendue (scope) :** la plage d'adresses IP qu'un serveur peut attribuer (masque de sous-réseau compris).
- **Options :** paramètres supplémentaires distribués avec l'adresse, par ex. passerelle par défaut, serveur DNS, masque de sous-réseau.
- **Réservation :** une adresse IP fixe liée durablement à une adresse MAC précise, de sorte qu'un client reçoit toujours la même adresse.

## Agent relais {/*#relay-agent*/}

Les routeurs ne transmettant pas les diffusions, un serveur DHCP ne dessert normalement que son propre sous-réseau. Un **agent relais DHCP** transmet les requêtes DHCP d'un autre sous-réseau au serveur DHCP (en monodiffusion), ce qui permet à un serveur de desservir plusieurs sous-réseaux.

## Basculement (failover) {/*#failover*/}

Pour la haute disponibilité, deux serveurs DHCP peuvent partager les mêmes étendues et répliquer leurs informations de baux. Il existe deux modes :

- **Répartition de charge :** les deux serveurs attribuent des adresses simultanément (rapport par défaut 50/50, réglable).
- **Secours actif (hot standby) :** un serveur principal attribue toutes les adresses ; un serveur secondaire ne prend le relais qu'en cas de défaillance du principal.

Le basculement prend en charge au maximum deux serveurs et ne fonctionne que pour les étendues IPv4.

## DHCPv6 et SLAAC {/*#dhcpv6-vs-slaac*/}

Pour IPv6, la configuration d'adresse n'exige pas strictement DHCP :

- **SLAAC** (Stateless Address Autoconfiguration) : l'hôte construit lui-même son adresse à partir d'un préfixe global annoncé par le routeur (Router Advertisement). Aucun serveur central n'intervient.
- **DHCPv6** (avec état) : un serveur DHCPv6 attribue et suit centralement la configuration complète, comme pour IPv4. Le routeur envoie toujours des Router Advertisements avec le drapeau `managed` afin que l'hôte sache qu'il doit utiliser DHCPv6.

## Commandes utiles (client) {/*#useful-commands-client*/}

| Commande            | Objet                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| `ipconfig /all`     | Afficher la configuration IP complète (carte, MAC, IP, DNS, passerelle)  |
| `ipconfig /release` | Libérer l'adresse actuelle (bail)                                        |
| `ipconfig /renew`   | Demander un nouveau bail au serveur DHCP                                 |
