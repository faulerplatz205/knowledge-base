---
title: "DNS"
description: "Comment le Domain Name System résout les noms en adresses IP : hiérarchie et FQDN, zones et types d'enregistrements, requêtes récursives et itératives, mise en cache."
keywords:
    - DNS
    - Domain Name System
    - FQDN
    - Zone
    - Recherche directe
    - Recherche inverse
    - Requête récursive
    - Requête itérative
tags:
    - ap2
machine_translated: true
---

# DNS (Domain Name System)

DNS résout les noms DNS en adresses IP et inversement. Un nom DNS comporte deux parties : le **nom d'hôte**, qui identifie un hôte unique, et le **nom de domaine**, qui identifie un groupe d'hôtes dans un espace de noms commun. Les deux sont séparés par un point.

## Hiérarchie et FQDN {/*#hierarchy-and-fqdn*/}

DNS est un système hiérarchique, structuré de la racine vers le bas :

- **Racine :** le sommet de la hiérarchie (notée `.`)
- **Domaine de premier niveau (TLD) :** par ex. `com`, `net`, `de`, `org`
- **Domaine de deuxième niveau :** par ex. `heise` dans `heise.de`
- **Sous-domaine / hôte :** niveaux supplémentaires sous le domaine de deuxième niveau, par ex. `www`

Lorsque toutes les parties jusqu'à la racine sont indiquées, le résultat est le **FQDN** (Fully Qualified Domain Name), qui doit être unique dans le réseau, par ex. `www.heise.de`.

## Zones {/*#zones*/}

Chaque serveur DNS est responsable d'une partie délimitée de l'espace de noms, appelée **zone** (par ex. `heise.de`). Le serveur qui gère le fichier d'une zone détient l'**autorité** sur cette zone.

- **Zone primaire :** accès en lecture et en écriture ; copie faisant autorité de la zone.
- **Zone secondaire :** copie en lecture seule d'une zone primaire (pour la redondance ou la répartition de charge). Elle peut répondre aux requêtes, mais ne peut pas modifier le fichier de zone.

Les données de zone sont échangées entre serveurs par **transfert de zone** (deux serveurs DNS sans contrôleur de domaine) ou par **réplication de zone** (zones intégrées à Active Directory sur des contrôleurs de domaine).

Selon la direction :

- **Zone de recherche directe :** résout les noms de domaine en adresses IP.
- **Zone de recherche inverse :** résout les adresses IP en noms de domaine.

## Types d'enregistrements {/*#record-types*/}

| Enregistrement | Objet                                              |
| -------------- | -------------------------------------------------- |
| **A**          | Nom de domaine vers adresse IPv4                   |
| **AAAA**       | Nom de domaine vers adresse IPv6                   |
| **CNAME**      | Alias pointant vers un autre enregistrement d'hôte |
| **SRV**        | Résout un service en adresse IP                    |
| **PTR**        | Recherche inverse : adresse IP vers nom de domaine |

## Requêtes récursives et itératives {/*#recursive-vs-iterative-queries*/}

- **Requête récursive :** le client l'envoie à son serveur de noms et attend une réponse définitive (l'adresse IP). Si le serveur détient la zone, il renvoie une **réponse faisant autorité**.
- **Requête itérative :** si le serveur ne peut pas répondre lui-même, il interroge d'autres serveurs DNS le long de la hiérarchie. Chacun peut se contenter d'indiquer le serveur responsable suivant plutôt que la réponse définitive, jusqu'à ce que le serveur faisant autorité soit atteint.
- **Mise en cache :** chaque serveur impliqué stocke les résultats dans son **cache DNS**. Une réponse issue du cache est renvoyée comme **réponse ne faisant pas autorité**.

## Exemple de résolution (`www.example.com`) {/*#example-resolution-wwwexamplecom*/}

1. Le client envoie une requête **récursive** à son serveur DNS configuré.
2. Ce serveur ne fait pas autorité et n'a aucune entrée en cache, il envoie donc une requête **itérative** à un serveur de noms **racine**.
3. Le serveur racine répond avec l'adresse du serveur de noms du TLD `com.`.
4. Le serveur DNS interroge le serveur de noms `com.`.
5. Le serveur `com.` répond avec l'adresse du serveur de noms `example.com.`.
6. Le serveur DNS interroge le serveur de noms `example.com.`.
7. Ce serveur, faisant autorité pour la zone, répond avec l'adresse IP du FQDN.
8. Le serveur DNS renvoie l'adresse IP au client (et la met en cache).

## Fichier HOSTS {/*#hosts-file*/}

Pour de très petits réseaux, un fichier statique `HOSTS` (`C:\Windows\System32\Drivers\etc\HOSTS`) peut associer des noms d'hôtes à des adresses IP à la place de DNS. Comme Active Directory exige DNS, cette alternative est rarement utilisée aujourd'hui.

## Commandes utiles (client) {/*#useful-commands-client*/}

| Commande               | Objet                         |
| ---------------------- | ----------------------------- |
| `ipconfig /displaydns` | Afficher le cache DNS local   |
| `ipconfig /flushdns`   | Vider le cache DNS local      |

## Règles de nommage pour les domaines Windows {/*#naming-rules-for-windows-domains*/}

- Pour les réseaux internes, utiliser un sous-domaine d'un domaine Internet officiel (par ex. `media.ct.de` au lieu de `media.ct.local`).
- Garder des noms courts (domaines : 64 caractères au maximum).
