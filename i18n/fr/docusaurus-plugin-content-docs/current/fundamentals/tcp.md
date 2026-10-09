---
title: "TCP"
description: "Transmission Control Protocol : établissement et fermeture de connexion, mécanismes de fiabilité, contrôle de flux et de congestion, cas d'usage typiques."
keywords:
    - TCP
    - Transmission Control Protocol
    - Three-Way Handshake
    - Orienté connexion
    - Fiabilité
    - Contrôle de flux
    - Contrôle de congestion
    - Couche transport
tags:
    - ap2
machine_translated: true
---

# TCP (Transmission Control Protocol)

## Aperçu {/*#overview*/}

TCP est un protocole de transport orienté connexion de la couche 4 du [modèle OSI](./osi-model.md), spécifié dans la RFC 9293. Il transforme la livraison de paquets non fiable d'IP en un flux d'octets fiable et ordonné entre deux applications : tout ce qui est écrit d'un côté arrive de l'autre côté de manière complète, dans le bon ordre et sans doublons, ou bien la connexion signale une erreur. Un point de terminaison TCP est adressé par la combinaison d'une adresse IP et d'un numéro de port.

---

## Caractéristiques {/*#characteristics*/}

| Propriété                | Comportement de TCP                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| Connexion                | Orienté connexion, une connexion est établie avant la première donnée utile              |
| Livraison                | Fiable, les segments perdus sont retransmis                                              |
| Ordre                    | Garanti, les segments sont réordonnés selon leur numéro de séquence avant la livraison   |
| Doublons                 | Détectés et écartés                                                                      |
| Modèle de données        | Flux continu d'octets, les limites de messages ne sont pas conservées                    |
| Sens                     | Full duplex, les deux côtés peuvent émettre simultanément                                |
| Contrôle de flux         | Oui, via la fenêtre de réception                                                         |
| Contrôle de congestion   | Oui, le débit d'émission s'adapte à la charge du réseau                                  |
| Taille de l'en-tête      | 20 octets au minimum, jusqu'à 60 octets avec les options                                 |
| Broadcast / multicast    | Impossible, une connexion a toujours exactement deux points de terminaison               |

Le coût de ces garanties se compose d'un en-tête plus volumineux, d'un aller-retour supplémentaire pour l'établissement de la connexion et d'un retard à chaque retransmission d'un segment perdu.

---

## En-tête de segment {/*#segment-header*/}

| Champ                     | Rôle                                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| Port source               | Port de l'application émettrice                                                   |
| Port de destination       | Port de l'application réceptrice                                                  |
| Numéro de séquence        | Position du premier octet de données de ce segment dans le flux d'octets          |
| Numéro d'acquittement     | Prochain octet que l'émetteur de ce segment s'attend à recevoir                   |
| Flags                     | Bits de contrôle, voir ci-dessous                                                 |
| Fenêtre                   | Nombre d'octets que l'émetteur de ce segment est actuellement en mesure d'accepter |
| Somme de contrôle         | Détection d'erreurs sur l'en-tête et les données                                  |
| Options                   | Maximum Segment Size, window scaling, selective acknowledgement                   |

### Flags de contrôle {/*#control-flags*/}

| Flag                        | Signification                                                                |
| --------------------------- | ---------------------------------------------------------------------------- |
| `SYN` (Synchronize)       | Demande une connexion et synchronise les numéros de séquence                 |
| `ACK` (Acknowledgement)   | Le numéro d'acquittement est valide                                          |
| `FIN` (Finish)            | Plus aucune donnée ne sera envoyée dans ce sens                              |
| `RST` (Reset)             | Interrompt immédiatement la connexion, sans fermeture ordonnée               |
| `PSH` (Push)              | Demande au récepteur de transmettre les données à l'application sans délai   |
| `URG` (Urgent)            | Marque des données urgentes (obsolète en pratique)                           |

---

## Établissement de la connexion (Three-Way Handshake) {/*#connection-establishment-three-way-handshake*/}

Les deux côtés annoncent leur propre numéro de séquence initial (`x` et `y` dans le schéma) et confirment celui de l'autre côté avec `ack = x + 1` ou `ack = y + 1`.

```text
Client                                           Server

  | ---- SYN, seq = x -------------------------> |   listening
  |                                              |
  | <--- SYN, ACK, seq = y, ack = x + 1 -------- |   connection accepted
  |                                              |
  | ---- ACK, ack = y + 1 ---------------------> |   connection established
  |                                              |
  | ==== payload ==============================> |
```

- Le client sait après le deuxième segment, et le serveur après le troisième segment, que la connexion fonctionne dans les deux sens.
- Le handshake coûte un aller-retour avant que le premier octet de données utiles puisse être envoyé.
- Un `SYN` envoyé à un port fermé reçoit un `RST` en réponse, ce qui permet à un scan de ports de distinguer un port fermé d'un port filtré.

---

## Fermeture de la connexion {/*#connection-teardown*/}

Une fermeture ordonnée clôt chaque sens séparément et nécessite donc quatre segments. `FIN` signifie seulement *ce côté a fini d'émettre*. L'autre sens peut encore transporter des données (half-close).

```text
Client                                           Server

  | ---- FIN ----------------------------------> |
  | <--- ACK ----------------------------------- |
  | <--- FIN ----------------------------------- |
  | ---- ACK ----------------------------------> |
  |                                              |
  | (TIME_WAIT, then the connection is released) |
```

Le côté qui ferme en premier reste un court instant dans l'état `TIME_WAIT`, afin que des segments retardataires de l'ancienne connexion ne puissent pas être confondus avec des segments d'une nouvelle connexion sur la même paire de ports. Un `RST` court-circuite cette procédure et abandonne tout ce qui est encore en transit.

---

## Fiabilité {/*#reliability*/}

- **Numéros de séquence :** chaque octet de données possède une position dans le flux, ce qui permet le réordonnancement et la détection des doublons.
- **Acquittements :** le récepteur confirme le prochain octet attendu et acquitte ainsi de manière cumulative tout ce qui a été reçu jusque-là.
- **Délai de retransmission (timeout) :** un segment non acquitté dans le délai imparti est renvoyé. Le délai est dérivé du temps d'aller-retour mesuré.
- **Fast retransmit :** plusieurs acquittements dupliqués pour le même octet indiquent la perte d'un seul segment et déclenchent une retransmission avant l'expiration du délai.
- **Somme de contrôle :** un segment corrompu est écarté et n'est donc jamais acquitté. L'acquittement manquant déclenche une retransmission.
- **Acquittement sélectif (SACK) :** option qui permet au récepteur de signaler exactement quelles plages d'octets sont arrivées, de sorte que seules les plages manquantes soient renvoyées.

---

## Contrôle de flux {/*#flow-control*/}

Le contrôle de flux protège le *récepteur* contre la surcharge. Chaque segment annonce dans son champ de fenêtre combien d'octets son émetteur peut actuellement mettre en mémoire tampon. L'autre côté ne doit jamais avoir en transit plus de données non acquittées que cette fenêtre ne le permet.

Un récepteur dont la mémoire tampon est pleine annonce une fenêtre de zéro. L'émetteur marque alors une pause jusqu'à ce qu'un segment ultérieur annonce une fenêtre plus grande.

## Contrôle de congestion {/*#congestion-control*/}

Le contrôle de congestion protège le *réseau* contre la surcharge et fonctionne indépendamment de la fenêtre de réception. La limite d'émission effective est la plus petite des valeurs entre la fenêtre de réception et la fenêtre de congestion.

| Phase                    | Comportement                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------- |
| Slow start               | La fenêtre de congestion démarre petite et croît de manière exponentielle           |
| Congestion avoidance     | Au-dessus d'un seuil, la fenêtre ne croît plus que de manière linéaire              |
| Perte détectée           | La fenêtre est réduite, car une perte de paquets signale une congestion             |
| Fast recovery            | Après un fast retransmit, le transfert continue avec une fenêtre réduite            |

---

## Cas d'usage typiques {/*#typical-use-cases*/}

### TCP et UDP {/*#tcp-vs-udp*/}

|          | TCP                                                                              | [UDP](./udp.md)                                                                                   |
| -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Critère  | L'exhaustivité compte plus que la latence                                        | Un paquet tardif est sans valeur, ou le surcoût d'une connexion dépasse la taille des données     |
| Exemples | Transfert de fichiers, pages web, e-mail, administration à distance, connexions de bases de données | Audio et vidéo en direct, jeux en ligne, protocoles simples de requête/réponse |

### Ports TCP bien connus {/*#well-known-tcp-ports*/}

| Port    | Service                                                                         |
| ------- | ------------------------------------------------------------------------------- |
| 20/21   | FTP données / contrôle                                                          |
| 22      | SSH                                                                             |
| 25      | SMTP                                                                            |
| 53      | Transferts de zone DNS et réponses dépassant la limite de taille d'UDP          |
| 80      | HTTP                                                                            |
| 110/995 | POP3 / POP3S                                                                    |
| 143/993 | IMAP / IMAPS                                                                    |
| 443     | HTTPS                                                                           |
| 3306    | MySQL / MariaDB                                                                 |

## Voir aussi {/*#see-also*/}

- [UDP](./udp.md) : le pendant sans connexion, sans établissement de connexion, fiabilité ni contrôle de flux
- [Modèle OSI](./osi-model.md) : position de la couche transport entre la couche réseau et la couche session
