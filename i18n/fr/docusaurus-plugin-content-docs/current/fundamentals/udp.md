---
title: "UDP"
description: "User Datagram Protocol : transport sans connexion, structure de l'en-tête et cas d'usage typiques."
keywords:
    - UDP
    - User Datagram Protocol
    - Sans connexion
    - Datagramme
    - Couche transport
    - TCP vs UDP
    - Streaming
tags:
    - ap2
machine_translated: true
---

# UDP (User Datagram Protocol)

## Vue d'ensemble {/*#overview*/}

UDP est un protocole de transport sans connexion situé sur la couche 4 du [modèle OSI](./osi-model.md), spécifié dans la RFC 768. Il n'ajoute presque rien à l'acheminement des paquets par IP : numéros de port, champ de longueur et somme de contrôle. Chaque datagramme est adressé et routé indépendamment, sans établissement de connexion préalable, sans état partagé, sans accusé de réception ni retransmission. Un datagramme est envoyé et arrive ou non, et l'émetteur n'est jamais informé de l'issue. Un point de terminaison UDP est adressé par la combinaison d'une adresse IP et d'un numéro de port.

---

## Caractéristiques {/*#characteristics*/}

| Propriété                | Comportement d'UDP                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Connexion                | Sans connexion, un datagramme peut être envoyé immédiatement                         |
| Remise                   | Non fiable, les datagrammes perdus ne sont ni détectés ni répétés                    |
| Ordre                    | Non garanti, les datagrammes peuvent arriver dans un ordre différent                 |
| Doublons                 | Possibles, la détection est laissée à l'application                                  |
| Modèle de données        | Orienté message, une opération d'envoi produit exactement un datagramme              |
| Direction                | Les deux côtés peuvent émettre à tout moment, chaque datagramme est autonome         |
| Contrôle de flux         | Aucun                                                                                |
| Contrôle de congestion   | Aucun, un émetteur peut saturer le réseau                                            |
| Taille de l'en-tête      | 8 octets, fixe                                                                       |
| Diffusion / multidiffusion | Prises en charge, un datagramme peut s'adresser à de nombreux destinataires        |

En contrepartie du faible surcoût, UDP n'offre aucune garantie.

---

## En-tête du datagramme {/*#datagram-header*/}

L'en-tête se compose de quatre champs de 2 octets chacun :

| Champ            | Rôle                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| Port source      | Port de l'application émettrice, peut valoir 0 si aucune réponse n'est attendue                                   |
| Port destination | Port de l'application réceptrice                                                                                  |
| Longueur         | Longueur de l'en-tête et des données en octets                                                                    |
| Somme de contrôle | Détection d'erreurs sur l'en-tête, les données et une partie de l'en-tête IP, facultative en IPv4 et obligatoire en IPv6 |

Un datagramme corrompu est ignoré silencieusement.

---

## Communication sans connexion {/*#communication-without-a-connection*/}

Contrairement à TCP, où les données ne suivent qu'après l'échange en trois temps (three-way handshake), le premier datagramme transporte déjà des données. Aucun état de connexion ne subsiste de part et d'autre après le dernier datagramme.

```text
Client                                           Server

  | ---- datagram (query) ---------------------> |   application reads it
  |                                              |
  | <--- datagram (answer) --------------------- |
  |                                              |
  | ---- datagram (query) --------X              |   lost, nobody is informed
  |                                              |
  |  (timeout in the application)                |
  |                                              |
  | ---- datagram (query, repeated) -----------> |
```

- Le client n'apprend que par la réponse que sa requête est arrivée. Une réponse absente peut signifier une requête perdue, une réponse perdue ou un serveur indisponible.
- L'adresse de l'émetteur d'un datagramme n'est jamais vérifiée par un handshake. Des requêtes usurpées sont donc possibles, ce que les attaques par amplification via DNS ou NTP exploitent.
- Un datagramme envoyé vers un port fermé reçoit en réponse le message ICMP *port unreachable*. Un port ouvert et un port filtré restent en général tous deux silencieux, si bien qu'un scan de ports UDP ne peut souvent pas distinguer les deux.

---

## Absence de contrôle de flux et de congestion {/*#no-flow-or-congestion-control*/}

UDP transmet les datagrammes aussi vite que l'application les envoie. Si le tampon de réception est plein, les datagrammes suivants sont rejetés sans avertissement. Si le réseau est surchargé, des datagrammes sont perdus dans les files d'attente des routeurs.

Une application qui envoie de gros volumes via UDP doit limiter elle-même son débit (RFC 8085). Sinon, elle évince le trafic TCP, car TCP réduit son débit en cas de perte de paquets et UDP reprend la capacité libérée.

---

## Cas d'usage typiques {/*#typical-use-cases*/}

### UDP vs TCP {/*#udp-vs-tcp*/}

|          | UDP                                                                                                 | [TCP](./tcp.md)                                                                            |
| -------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Critère  | Un paquet tardif est sans valeur, ou le surcoût d'une connexion dépasse les données utiles          | L'intégralité des données prime sur la latence                                             |
| Exemples | Audio et vidéo en direct, jeux en ligne, requêtes courtes, télémétrie, découverte via multidiffusion | Transfert de fichiers, pages web, e-mail, administration à distance, connexions de bases de données |

### Ports UDP courants {/*#well-known-udp-ports*/}

| Port     | Service       | Pourquoi UDP                                                                                  |
| -------- | ------------- | --------------------------------------------------------------------------------------------- |
| 53       | DNS           | Une requête courte, une réponse courte, une répétition coûte moins cher qu'une connexion      |
| 67/68    | DHCP          | Le client n'a pas encore d'adresse IP et dépend de la diffusion                               |
| 69       | TFTP          | Volontairement minimal, utilisé dans les environnements de démarrage                          |
| 123      | NTP           | Un horodatage retransmis serait déjà périmé                                                   |
| 161/162  | SNMP          | De nombreux petits messages d'état, la perte d'un seul est acceptable                         |
| 443      | QUIC / HTTP/3 | La fiabilité est implémentée dans QUIC au-dessus d'UDP                                        |
| 500/4500 | IPsec (IKE)   | Échange de clés et traversée de NAT                                                           |
| 5060     | SIP           | Signalisation pour les communications vocales                                                 |

Avec DNS, les deux protocoles fonctionnent côte à côte : les requêtes et les réponses courtes passent par UDP, tandis que les transferts de zone et les réponses dépassant la limite de taille d'UDP utilisent TCP. Cette limite est de 512 octets, ou de la taille de tampon annoncée par le client via EDNS(0).

## Voir aussi {/*#see-also*/}

- [TCP](./tcp.md) : le pendant orienté connexion, avec fiabilité, ordonnancement et contrôle de flux
- [Modèle OSI](./osi-model.md) : position de la couche transport entre les couches réseau et session
- [DHCP](./dhcp.md) : un protocole qui dépend des diffusions UDP
- [DNS](./dns.md) : utilise UDP pour les requêtes et TCP pour les grandes réponses
