---
title: "Chiffrement et signatures numériques"
description: "Chiffrement symétrique et asymétrique, dont AES, RSA et Diffie-Hellman, fonctions de hachage, hachage de mots de passe avec sel et bcrypt, et signatures numériques."
keywords:
    - Chiffrement
    - Signature numérique
    - Chiffrement symétrique
    - Chiffrement asymétrique
    - Clé publique
    - Clé privée
    - Hash
    - AES
    - RSA
    - Diffie-Hellman
    - Salage
    - bcrypt
    - Hachage de mots de passe
    - Sécurité
tags:
    - ap2
machine_translated: true
---

# Chiffrement et signatures numériques

## Vue d'ensemble {/*#overview*/}

Le chiffrement protège les données contre tout accès non autorisé en les transformant en un format illisible. Les signatures numériques vérifient l'authenticité et l'intégrité des données et garantissent qu'elles n'ont pas été manipulées pendant le transport.

## Chiffrement symétrique {/*#symmetric-encryption*/}

L'expéditeur et le destinataire utilisent la **même clé** pour chiffrer et déchiffrer les données.

- **Rapide** et efficace pour chiffrer de grandes quantités de données
- **La distribution des clés** est un défi, car la clé doit être partagée au préalable de manière sûre
- **Algorithmes courants :** AES (Advanced Encryption Standard), DES (Data Encryption Standard), 3DES (Triple Data Encryption Standard)
- **Cas d'usage typique :** chiffrement de données en masse

```text
Plaintext => [Encrypt with Key] => Ciphertext => [Decrypt with Key] => Plaintext
```

### AES {/*#aes*/}

AES (Advanced Encryption Standard) a été normalisé en 2001 en tant que successeur de DES et constitue l'algorithme symétrique utilisé aujourd'hui.

- **Chiffrement par blocs :** chiffre des blocs de 128 bits ; les données plus longues sont découpées en blocs et complétées par un bourrage
- **Longueurs de clé :** 128, 192 ou 256 bits, qui déterminent le nombre de tours (10, 12 ou 14)
- **Performance :** implémenté en matériel sur les processeurs actuels (AES-NI), ce qui le rend assez rapide pour le chiffrement intégral de disque
- **Considéré comme sûr :** aucune attaque pratique ne fait mieux que l'essai de toutes les clés

Un chiffrement par blocs chiffrant chaque bloc isolément, un **mode opératoire** détermine comment les blocs sont enchaînés :

| Mode                        | Propriété                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ECB (Electronic Codebook)   | Chaque bloc est chiffré indépendamment, des blocs de texte clair identiques produisent des blocs chiffrés identiques, donc inadapté        |
| CBC (Cipher Block Chaining) | Chaque bloc est combiné avec le bloc chiffré précédent, nécessite un vecteur d'initialisation, aucune protection de l'intégrité            |
| CTR (Counter Mode)          | Transforme le chiffrement par blocs en un chiffrement par flot parallélisable                                                              |
| GCM (Galois/Counter Mode)   | Choix par défaut actuel : CTR plus une balise d'authentification qui détecte aussi les manipulations                                       |

Usage typique : chiffrement de fichiers et de disques (LUKS, BitLocker, VeraCrypt), chiffrement des données utiles dans [TLS](#hybrid-encryption), archives et colonnes de bases de données chiffrées.

### DES et 3DES {/*#des-and-3des*/}

DES est le prédécesseur d'AES avec une longueur de clé de 56 bits, qui peut aujourd'hui être trouvée par force brute en quelques heures et qui est donc cassé. 3DES applique DES trois fois et atteint ainsi 112 bits effectifs, mais il est lent et ne subsiste que dans des systèmes hérités. Aucun des deux n'est utilisé pour de nouveaux développements.

---

## Chiffrement asymétrique {/*#asymmetric-encryption*/}

Utilise une **paire de clés** : une clé publique (partagée ouvertement) et une clé privée (gardée secrète).

- Les données chiffrées avec la clé publique ne peuvent être déchiffrées qu'avec la clé privée correspondante
- **Plus lent** que le chiffrement symétrique en raison de la complexité mathématique
- **Algorithmes courants :** RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography)
- **Cas d'usage typiques :** échange de clés (chiffrement hybride), signatures numériques

```text
Plaintext => [Encrypt with Public Key of Receiver] => Ciphertext => [Decrypt with Private Key of Receiver] => Plaintext
```

### RSA {/*#rsa*/}

RSA est l'algorithme asymétrique le plus connu. Son nom est formé à partir de ses inventeurs Rivest, Shamir et Adleman.

- **Fondement de la sécurité :** multiplier deux grands nombres premiers est facile, décomposer le produit en ces facteurs ne l'est pas
- **Longueurs de clé :** 2048 bits au minimum, 3072 ou 4096 bits pour une protection à long terme, non comparables aux longueurs de clé symétriques
- **Capacités :** chiffrement et signatures numériques avec la même paire de clés
- **Limitation :** les données utiles doivent être plus courtes que la clé, c'est pourquoi RSA chiffre une clé symétrique plutôt que les données elles-mêmes

ECC (Elliptic Curve Cryptography) atteint une sécurité comparable avec des clés beaucoup plus courtes. Une clé ECC de 256 bits correspond approximativement à une clé RSA de 3072 bits. C'est pourquoi ECC est devenu le choix par défaut pour l'échange de clés dans [TLS](#hybrid-encryption) (ECDHE) et est de plus en plus utilisé pour les signatures de certificats (ECDSA).

### Diffie-Hellman {/*#diffie-hellman*/}

Diffie-Hellman n'est pas un algorithme de chiffrement, mais une procédure d'**accord de clé**. Les deux parties dérivent un secret partagé à partir de valeurs publiques et de leur propre valeur secrète, sans que ce secret ne soit jamais transmis.

```text
Alice                                  Bob
secret a                               secret b
       ── public value A ────────────►
       ◄──────────── public value B ──
shared key from (B, a)  ==  shared key from (A, b)
```

- Un espion voit les deux valeurs publiques, mais ne peut pas en déduire la clé partagée
- Les variantes **éphémères** (DHE, ECDHE) génèrent une nouvelle paire de clés par session, de sorte qu'une compromission ultérieure de la clé à long terme ne permet pas de déchiffrer le trafic enregistré (confidentialité persistante)
- Diffie-Hellman seul n'authentifie personne : sans certificat, un attaquant placé au milieu peut convenir d'une clé avec chaque partie et relayer le trafic

---

## Chiffrement hybride {/*#hybrid-encryption*/}

En pratique, aucune des deux méthodes n'est utilisée seule : la cryptographie asymétrique résout la distribution des clés, la cryptographie symétrique effectue le travail proprement dit. TLS les combine exactement ainsi :

1. Le serveur prouve son identité avec un **certificat** contenant sa clé publique.
2. Les deux parties conviennent d'une clé de session via **ECDHE** et authentifient l'échange avec le certificat.
3. Les données utiles sont chiffrées **symétriquement** avec cette clé de session, généralement par AES-GCM.
4. La clé de session est supprimée à la fin de la connexion.

---

## Fonctions de hachage {/*#hash-functions*/}

Une fonction de hachage associe des données de taille arbitraire à une sortie de taille fixe (hash/empreinte).

- **À sens unique :** les données d'origine ne peuvent pas être déduites du hash
- **Déterministe :** la même entrée produit toujours le même hash
- **Résistante aux collisions :** des entrées différentes ne doivent pas produire le même hash
- **Effet d'avalanche :** modifier un seul bit de l'entrée modifie environ la moitié des bits du hash

Applications typiques : contrôles d'intégrité de téléchargements, détection de doublons, signatures et, en combinaison avec les procédés ci-dessous, stockage de mots de passe.

| Algorithme | Longueur de l'empreinte | Évaluation                                                                                                                       |
| ---------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| MD5        | 128 bits                | Cassé, des collisions peuvent être produites en quelques secondes, acceptable uniquement comme somme de contrôle contre les erreurs de transmission |
| SHA-1      | 160 bits                | Cassé, des attaques pratiques par collision existent, n'est plus utilisé pour les signatures                                     |
| SHA-256    | 256 bits                | Standard actuel, fait partie de la famille SHA-2                                                                                 |
| SHA-512    | 512 bits                | Comme SHA-256 avec une empreinte plus longue, plus rapide que SHA-256 sur les systèmes 64 bits                                   |
| SHA-3      | variable                | Construction interne différente de SHA-2, conçu comme réserve au cas où SHA-2 serait affaibli                                    |

---

## Hachage des mots de passe {/*#hashing-passwords*/}

Les mots de passe ne sont jamais stockés en clair ni chiffrés, car il faudrait qu'une clé capable de les déchiffrer existe quelque part. Ils sont hachés, de sorte qu'une base de données volée ne révèle pas les mots de passe eux-mêmes.

Un simple `SHA-256` ne suffit pas pour cela, pour deux raisons :

- **Des mots de passe identiques produisent des hashes identiques**, si bien que le hash révèle quels comptes partagent un mot de passe, et qu'une table précalculée (rainbow table) résout immédiatement les mots de passe courants
- **Les fonctions de hachage sont rapides par conception**, et le matériel actuel calcule des milliards de hashes SHA-256 par seconde, ce qui rend praticable la force brute sur les mots de passe courts

### Sel (salt) {/*#salt*/}

Un sel est une valeur aléatoire générée pour chaque mot de passe et hachée avec lui. Le sel n'est pas secret et est stocké à côté du hash.

```text
hash = H(salt + password)
```

- Des mots de passe identiques produisent des hashes différents, puisque le sel diffère
- Les rainbow tables deviennent inutiles, car un attaquant aurait besoin d'une table par sel
- Chaque mot de passe doit être attaqué individuellement au lieu de l'être tous à la fois

Un **poivre (pepper)** est une valeur secrète supplémentaire, identique pour tous les mots de passe et stockée en dehors de la base de données, par exemple dans la configuration de l'application. Il n'est utile que si la base de données fuite sans que la configuration ne fuite.

### Facteur de travail {/*#work-factor*/}

La deuxième mesure consiste à ralentir volontairement le hachage : un procédé conçu pour les mots de passe répète de nombreuses fois son opération interne. Le nombre de répétitions est configurable en tant que **facteur de coût** et augmenté à mesure que le matériel s'accélère. Un délai d'environ 100 ms par connexion est imperceptible pour l'utilisateur et rend impraticable l'essai de milliards de candidats.

### bcrypt {/*#bcrypt*/}

bcrypt est le procédé de ce type le plus répandu et repose sur le chiffrement Blowfish.

- Le sel est généré et stocké **à l'intérieur du hash**, aucune colonne distincte n'est donc nécessaire
- Le facteur de coût fait partie du hash, ce qui permet de vérifier d'anciens hashes après son augmentation
- Volontairement lent et dépendant de la mémoire, ce qui le rend plus difficile à accélérer sur GPU que les procédés fondés sur SHA
- Limitation : seuls les 72 premiers octets de l'entrée sont utilisés

```text
$2b$12$eImiTXuWVxfM37uY4JANjQ.../hJ6CtPTuOrAXTlHGDLcJU3wG6Hpu
 │   │  └── salt (22 characters) ──┘└── hash ────────────────┘
 │   └───── cost factor 12, meaning 2^12 rounds
 └───────── algorithm identifier
```

Alternatives ayant le même objectif :

| Procédé  | Remarque                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Argon2id | Vainqueur de la Password Hashing Competition, réglable en temps, mémoire et parallélisme, recommandation actuelle pour les nouveaux systèmes     |
| scrypt   | Exigeant en mémoire, donc coûteux à paralléliser sur du matériel spécialisé                                                                      |
| PBKDF2   | Largement disponible et normalisé, mais limité par le calcul uniquement, ce qui en fait la plus faible de ces options                            |
| bcrypt   | Établi, bien compris, disponible dans tous les langages                                                                                          |

Ce qui n'a jamais sa place dans un magasin de mots de passe : texte en clair, chiffrement réversible, hashes sans sel et fonction de hachage rapide unique telle que MD5, SHA-1 ou SHA-256.

---

## Signatures numériques {/*#digital-signatures*/}

Les signatures numériques vérifient que des données ont été envoyées par une partie précise et n'ont pas été modifiées.

**Signature (expéditeur) :**

1. Créer un [hash](#hash-functions) du message
2. Chiffrer le hash avec la **clé privée** de l'expéditeur => il s'agit de la signature
3. Envoyer le message avec la signature

**Vérification (destinataire) :**

1. Déchiffrer la signature avec la **clé publique** de l'expéditeur => révèle le hash d'origine
2. Hacher de manière indépendante le message reçu
3. Comparer les deux hashes : s'ils correspondent, la signature est valide et le message est authentique

Cette procédure décrit les signatures RSA. [ECDSA](#rsa) ne chiffre pas le hash, mais calcule la signature à partir du hash et de la clé privée. Le destinataire la vérifie avec la clé publique.
