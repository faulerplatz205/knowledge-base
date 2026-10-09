---
title: "Sous-réseaux (IPv4)"
description: "Bases du subnetting, calculs et exemples (IPv4)"
keywords:
    - Subnetting
    - Sous-réseaux
    - IPv4
last_update:
    author: moritz-grimm
tags:
    - ap2
machine_translated: true
---

# Sous-réseaux (IPv4)

## Bases du subnetting {/*#subnetting-basics*/}

Le subnetting divise un grand réseau en sous-réseaux plus petits et plus faciles à gérer. Cela améliore les performances, l'organisation et la sécurité.

| Terme                | Symbole/Réf. | Définition                                                         | Exemple                |
| -------------------- | ------------ | ------------------------------------------------------------------ | ---------------------- |
| **Adresse IP**       | IP           | Adresse unique d'un appareil sur le réseau.                        | `192.168.1.10`         |
| **Masque de sous-réseau** | Netmask | Sépare la partie réseau de la partie hôte.                         | `255.255.255.0`        |
| **CIDR**             | Notation /   | Format abrégé du masque (nombre de bits à « 1 »).                  | `/24`                  |
| **ID réseau**        | Net ID       | Le « nom de la rue ». La première adresse du sous-réseau.          | `192.168.1.0`          |
| **Broadcast**        | Bcast        | Appel à *tous* les appareils. La dernière adresse.                 | `192.168.1.255`        |
| **Hôte**             | Host         | Un appareil (PC, routeur) à l'intérieur du sous-réseau.            | `.1` à `.254`         |
| **Bits réseau**      | Net-Bits     | Bits de l'adresse IP identifiant le réseau.                        | `/24` => 24 premiers bits |
| **Bits hôte**        | Host-Bits    | Bits de l'adresse IP identifiant les hôtes au sein du réseau.      | `24` => 8 derniers bits    |

**Règle :** une adresse IPv4 se compose de **32 bits**, répartis en 4 octets (8 bits chacun).  
**Format :** `x.x.x.x` (décimal) ou `11000000.10101000.00000001.00001010` (binaire)

---

## Comprendre les masques de sous-réseau et le CIDR {/*#understanding-subnet-masks--cidr*/}

Le masque de sous-réseau indique à l'ordinateur quelle partie de l'IP correspond au **réseau** (la rue) et laquelle correspond à l'**hôte** (le numéro de maison).

### Notation CIDR (Classless Inter-Domain Routing) {/*#cidr-notation-classless-inter-domain-routing*/}

Le CIDR (p. ex. `/24`) compte simplement le nombre de **bits actifs** du masque, de gauche à droite.

| CIDR | Masque de sous-réseau décimal | Masque de sous-réseau binaire (premiers octets) | Hôtes par sous-réseau* |
| ---- | ----------------------------- | ----------------------------------------------- | ---------------------- |
| /8   | 255.0.0.0                     | `11111111.00000000...`                                         | 16 777 214             |
| /16  | 255.255.0.0                   | `11111111.11111111...`                                         | 65 534                 |
| /24  | 255.255.255.0                 | `11111111...11111111.0`                                         | 254                    |
| /25  | 255.255.255.128               | `11111111...1.10000000`                                         | 126                    |
| /26  | 255.255.255.192               | `11111111...1.11000000`                                         | 62                     |
| /30  | 255.255.255.252               | `11111111...1.11111100`                                         | 2                      |

**Remarque :** nombre total d'adresses moins 2 (1 pour l'ID réseau, 1 pour le broadcast).

---

## Méthodes de calcul {/*#calculation-methods*/}

### 1. Calcul de la taille d'un sous-réseau (nombre d'hôtes) {/*#1-calculating-subnet-size-number-of-hosts*/}

Combien d'adresses IP **au total** un sous-réseau contient-il (sur tous les octets) ?

```text
Formula (Total Addresses): 2^(Host-Bits) = Total Addresses
Formula (Usable Hosts): 2^(Host-Bits) - 2 = Usable Hosts

Host-Bits = 32 - (CIDR)
```

#### Exemple : réseau /24 {/*#example-24-network*/}

1. **Bits hôte :** 32 - 24 = 8 bits
2. **Calcul :** 2⁸ = 256
3. **Utilisables :** 256 - 2 = **254 hôtes**

#### Exemple : réseau /26 {/*#example-26-network*/}

1. **Bits hôte :** 32 - 26 = 6 bits
2. **Calcul :** 2⁶ = 64
3. **Utilisables :** 64 - 2 = **62 hôtes**

---

### 2. Déterminer le « nombre magique » (taille de bloc dans l'octet concerné) {/*#2-finding-the-magic-number-block-size-in-the-interesting-octet*/}

Le nombre magique représente le **pas** à l'intérieur de l'octet où se produit le subnetting.

**Important :** le nombre magique ne s'applique qu'à l'« octet concerné » (l'octet dont le masque de sous-réseau n'est ni 0 ni 255).

```text
Method 1 (Binary Place):
Look at the last bit set to '1' in the subnetmask. Its value is the Magic Number.

Method 2 (Subtraction):
256 - (Last non-zero octet of the mask) = Magic Number
```

#### Quel octet est « concerné » ? {/*#which-octet-is-interesting*/}

- `/24 - /32` : le **4e octet** change
- `/16 - /23` : le **3e octet** change
- `/8 - /15` : le **2e octet** change

#### Relation entre les méthodes [1](#1-calculating-subnet-size-number-of-hosts) et [2](#2-finding-the-magic-number-block-size-in-the-interesting-octet) {/*#relationship-between-methods-1--2*/}

- **Pour `/24+` (subnetting sur le 4e octet) :** nombre magique = 2^(bits hôte) ✔
- **Pour `/23-` (subnetting sur un octet précédent) :** les deux valeurs diffèrent :
  - **Calcul de la taille des sous-réseaux :** le nombre total d'adresses s'étend sur plusieurs octets
  - **Détermination du « nombre magique » :** le nombre magique n'est que le pas dans un seul octet

#### Exemple : masque /26 => 255.255.255.192, subnetting sur le 4e octet {/*#example-26-mask--255255255192---4th-octet-subnetting*/}

- **Octet concerné :** 192
- **Calcul :** 256 - 192 = **64**
- **Résultat :** les réseaux progressent par pas de 64 (0, 64, 128, 192).

#### Exemple : masque `/18` => 255.255.192.0, subnetting sur le 3e octet {/*#example-18-mask--2552551920---3rd-octet-subnetting*/}

**Taille totale :**

- Bits hôte : 32 - 18 = 14
- Nombre total d'adresses : 2^14 = **16 384**

**Nombre magique (pas dans le 3e octet) :**

- Masque : `255.255.192.0`
- Octet concerné : 3e (192)
- Nombre magique : 256 - 192 = **64**
- Signification : le 3e octet progresse par pas de 64 (0, 64, 128, 192)

**Lien entre les deux :**

- Le 64 est le pas dans le 3e octet
- Chaque pas contient 256 adresses (le 4e octet complet)
- Total : 64 x 256 = 16 384 ✔

---

### 3. Calcul du nombre de sous-réseaux {/*#3-calculating-number-of-subnets*/}

Lors du subnetting d'un réseau, des bits sont « empruntés » à la partie hôte pour créer davantage de réseaux.

```text
Formula: 2^(Borrowed Bits) = Number of Subnets

Borrowed Bits = New CIDR - Original CIDR
```

#### Exemple : de /24 à /26 {/*#example-from-24-to-26*/}

**Scénario :** un réseau `192.168.1.0/24` doit être divisé en sous-réseaux `/26`.

1. **Réseau d'origine :** `/24` (256 adresses au total)
2. **Nouvelle taille de sous-réseau :** `/26`
3. **Bits empruntés :** 26 - 24 = **2 bits**
4. **Nombre de sous-réseaux :** 2² = **4 sous-réseaux**

**Résultat :** 4 sous-réseaux de 64 adresses chacun (62 hôtes utilisables).

| Sous-réseau n° | ID réseau     | Premier hôte  | Dernier hôte  | Broadcast     |
| -------------- | ------------- | ------------- | ------------- | ------------- |
| 1              | 192.168.1.0   | 192.168.1.1   | 192.168.1.62  | 192.168.1.63  |
| 2              | 192.168.1.64  | 192.168.1.65  | 192.168.1.126 | 192.168.1.127 |
| 3              | 192.168.1.128 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 4              | 192.168.1.192 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

#### Exemple : de /16 à /24 {/*#example-from-16-to-24*/}

**Scénario :** un FAI attribue `10.0.0.0/16`, et des réseaux `/24` sont souhaités pour les services.

1. **Origine :** `/16`
2. **Nouveau :** `/24`
3. **Bits empruntés :** 24 - 16 = **8 bits**
4. **Nombre de sous-réseaux :** 2⁸ = **256 sous-réseaux**

**Résultat :** 256 réseaux de services peuvent être créés (10.0.0.0/24, 10.0.1.0/24, ..., 10.0.255.0/24).

---

## Exemple de calcul pas à pas {/*#step-by-step-example-calculation*/}

**Tâche :** analyser l'IP `192.168.10.150` avec le masque `255.255.255.192` (/26).

### Étape 1 : déterminer le nombre magique (taille de bloc) {/*#step-1-find-the-magic-number-block-size*/}

- Le masque est `/26`. Le changement se produit dans le 4e octet.
- Masque dans le 4e octet : `192`
- Nombre magique : `256 - 192 = 64`

### Étape 2 : déterminer les plages de sous-réseaux {/*#step-2-determine-subnet-ranges*/}

Incrémenter de 64 jusqu'à dépasser l'adresse IP (`150`).

- Sous-réseau 1 : `0 - 63`
- Sous-réseau 2 : `64 - 127`
- Sous-réseau 3 : `128 - 191`  (150 se situe dans cette plage)
- Sous-réseau 4 : `192 - 255`

### Étape 3 : calculer les adresses {/*#step-3-calculate-addresses*/}

L'IP `192.168.10.150` appartient au sous-réseau `.128`.

| Type             | Calcul                    | Résultat           |
| ---------------- | ------------------------- | ------------------ |
| **ID réseau**    | Début du bloc             | **192.168.10.128** |
| **Premier hôte** | ID réseau + 1             | **192.168.10.129** |
| **Dernier hôte** | Broadcast - 1             | **192.168.10.190** |
| **Broadcast**    | Bloc suivant (192) - 1    | **192.168.10.191** |

---

## Référence rapide : sous-réseaux courants {/*#quick-reference-common-subnets*/}

| CIDR    | Masque (.x) | Nombre magique | Hôtes utilisables | Cas d'usage typique                    |
| ------- | ----------- | -------------- | ----------------- | -------------------------------------- |
| **/24** | .0          | 256            | 254               | LAN standard (domicile/bureau)         |
| **/25** | .128        | 128            | 126               | Partage d'un LAN en deux               |
| **/26** | .192        | 64             | 62                | Réseaux de services                    |
| **/27** | .224        | 32             | 30                | Petites équipes                        |
| **/28** | .240        | 16             | 14                | Très petits groupes                    |
| **/29** | .248        | 8              | 6                 | Réseaux de transit (routeur à routeur) |
| **/30** | .252        | 4              | 2                 | Liaisons point à point                 |
| **/32** | .255        | 1              | 1                 | IP d'un hôte unique (loopback)         |

---

## Pièges courants {/*#common-pitfalls*/}

- **Oubli de l'ID réseau et du broadcast :** toujours soustraire 2 pour obtenir les hôtes *utilisables*.
- **Pas incorrect :** les plages de sous-réseaux sont inclusives. Le premier sous-réseau se termine donc à `start + block size − 1`. Une fois le premier sous-réseau correct, les fins des sous-réseaux suivants se calculent soit en ajoutant la taille de bloc à la fin du sous-réseau précédent, soit en appliquant la même formule `start + block size − 1` avec l'adresse réseau de chaque sous-réseau.
- **Pair/impair :** les ID réseau sont généralement des nombres pairs ; les broadcasts sont généralement des nombres impairs.
- **Mauvais octet :** un sous-réseau `/18` change dans le *3e* octet, pas dans le 4e.
- `/8 - /15` : changement dans le 2e octet
- `/16 - /23` : changement dans le 3e octet
- `/24 - /32` : changement dans le 4e octet
