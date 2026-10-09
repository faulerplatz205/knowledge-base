---
title: "RAID"
description: "Aperçu de JBOD et des niveaux RAID 0, 1, 5, 6, 10 et 01, avec leurs compromis entre performance, redondance et efficacité de stockage."
keywords:
    - RAID
    - Redundant Array of Independent Disks
    - Redundant Array of Inexpensive Disks
    - stockage
    - redondance des disques
tags:
    - ap2
machine_translated: true
---

# RAID

## Vue d'ensemble {/*#overview*/}

RAID (Redundant Array of Independent/Inexpensive Disks) est une méthode qui regroupe plusieurs disques physiques en une unité logique afin d'améliorer la performance, la redondance, ou les deux.

## JBOD – Just a Bunch of Disks {/*#jbod--just-a-bunch-of-disks*/}

JBOD correspond à l'absence de niveau RAID : les disques sont utilisés tels quels. Soit chaque disque apparaît individuellement au système d'exploitation, soit plusieurs disques sont concaténés en un grand volume logique (appelé aussi spanning ou mode linéaire). Les données sont écrites sur un disque jusqu'à ce qu'il soit plein, puis le suivant est utilisé.

- **Nombre minimal de disques :** 1
- **Performance :** identique à celle d'un disque unique, sans striping et donc sans accès parallèle
- **Redondance :** aucune
- **Capacité utilisable :** 100 %, des disques de tailles différentes peuvent être combinés sans perte d'espace

**Convient pour :** archives, cibles de sauvegarde et médiathèques où la capacité par euro compte et où les données sont disponibles ailleurs.

**Avantages :**

- Des disques de tailles et d'âges différents peuvent être combinés.
- Aucune capacité n'est perdue pour la parité ou le miroir.
- La défaillance d'un disque n'affecte que les données stockées sur ce disque, pas tout le volume.
- L'ajout d'un disque ne nécessite pas de reconstruire la grappe.

**Inconvénients :**

- Il n'y a ni redondance ni gain de performance.
- Avec un volume concaténé, les fichiers à cheval sur la limite d'un disque sont également perdus.
- Une défaillance est plus difficile à évaluer qu'avec un véritable niveau RAID, car elle dépend des fichiers qui se trouvaient sur le disque défaillant.

## RAID 0 – Striping {/*#raid-0--striping*/}

Les données sont découpées en blocs et écrites en parallèle sur tous les disques.

- **Nombre minimal de disques :** 2
- **Performance :** vitesse de lecture/écriture la plus élevée (évolue avec le nombre de disques)
- **Redondance :** aucune, la défaillance d'un disque entraîne la perte de toutes les données
- **Capacité utilisable :** 100 %

**Convient pour :** données temporaires, caches ou autres scénarios où la vitesse compte plus que la fiabilité.

**Avantages :**

- Performance maximale en lecture et en écriture
- Capacité de stockage utilisable complète
- Mise en place simple

**Inconvénients :**

- Aucune tolérance aux pannes
- Perte de toutes les données en cas de défaillance d'un seul disque

## RAID 1 – Mirroring {/*#raid-1--mirroring*/}

Les données sont écrites de manière identique sur tous les disques.

- **Nombre minimal de disques :** 2
- **Performance :** lectures plus rapides (lecture possible sur n'importe quel disque), vitesse d'écriture identique à celle d'un disque unique
- **Redondance :** peut survivre à la défaillance de tous les disques sauf un
- **Capacité utilisable :** 50 %

**Convient pour :** disques système ou données critiques dont la fiabilité est la priorité.

**Avantages :**

- Redondance élevée, récupération simple
- Lectures rapides
- Facile à comprendre et à gérer

**Inconvénients :**

- 50 % de la capacité de stockage perdus au profit du miroir
- Écritures pas plus rapides que sur un disque unique

## RAID 5 – Striping avec parité distribuée {/*#raid-5--striping-with-distributed-parity*/}

Les données et les informations de parité sont réparties (striping) sur tous les disques. La parité permet de récupérer les données si un disque tombe en panne.

- **Nombre minimal de disques :** 3
- **Performance :** bonne vitesse de lecture ; vitesse d'écriture réduite en raison du calcul de parité
- **Redondance :** tolère la défaillance de 1 disque
- **Capacité utilisable :** `(n - 1) / n` (par ex. 3 disques => 67 %)

**Convient pour :** serveurs de fichiers polyvalents conciliant capacité, performance et redondance.

**Avantages :**

- Bon équilibre entre capacité, performance et redondance
- Seule la capacité d'un disque est perdue au profit de la parité

**Inconvénients :**

- Le calcul de parité réduit les performances en écriture.
- Les temps de reconstruction peuvent être très longs sur de gros disques.
- La grappe est vulnérable à une seconde défaillance pendant la reconstruction.

## RAID 6 – Striping avec double parité {/*#raid-6--striping-with-double-parity*/}

Comme [RAID 5](#raid-5--striping-with-distributed-parity), mais avec deux blocs de parité indépendants, ce qui tolère deux défaillances de disques simultanées.

- **Nombre minimal de disques :** 4
- **Performance :** écritures légèrement plus lentes que RAID 5 en raison de la double parité
- **Redondance :** tolère la défaillance de 2 disques
- **Capacité utilisable :** `(n - 2) / n` (par ex. 4 disques => 50 %)

**Convient pour :** grandes grappes ou environnements où le temps de reconstruction accroît le risque de défaillance.

**Avantages :**

- Survit à deux défaillances de disques simultanées
- Plus sûr pour les grandes grappes dont la reconstruction peut durer des jours

**Inconvénients :**

- Pénalité d'écriture plus élevée que RAID 5
- La capacité de deux disques est perdue au profit de la parité
- Nécessite au moins 4 disques

## RAID 10 – Striping + Mirroring {/*#raid-10--striping--mirroring*/}

Combine [RAID 1](#raid-1--mirroring) (miroir) et [RAID 0](#raid-0--striping) (striping) : les données sont mises en miroir par paires, puis réparties (striping) sur les paires.

- **Nombre minimal de disques :** 4
- **Performance :** vitesse de lecture et d'écriture élevée
- **Redondance :** tolère 1 défaillance par paire en miroir
- **Capacité utilisable :** 50 %

**Convient pour :** bases de données et charges à haut débit nécessitant à la fois vitesse et redondance.

**Avantages :**

- Excellente performance en lecture et en écriture
- Reconstruction rapide par rapport aux niveaux RAID à parité
- Processus de récupération simple

**Inconvénients :**

- 50 % de la capacité de stockage perdus au profit du miroir
- Nécessite au moins 4 disques, avec des coûts qui augmentent rapidement

## RAID 01 – Mirroring + Striping {/*#raid-01--mirroring--striping*/}

RAID 01 (aussi écrit RAID 0+1) combine les deux mêmes niveaux que RAID 10, mais dans l'ordre inverse : les disques sont d'abord regroupés en ensembles de striping RAID 0, puis ces ensembles sont mis en miroir.

- **Nombre minimal de disques :** 4
- **Performance :** identique à RAID 10, vitesse de lecture et d'écriture élevée
- **Redondance :** tolère 1 défaillance de disque avec certitude
- **Capacité utilisable :** 50 %

```text
RAID 10:  mirror(Disk1, Disk2) + mirror(Disk3, Disk4), striped across both mirrors
RAID 01:  stripe(Disk1, Disk2) + stripe(Disk3, Disk4), mirrored onto each other
```

**Convient pour :** rien de particulier. RAID 10 obtient le même résultat avec un meilleur comportement en cas de défaillance et lui est donc préféré.

**Différence avec RAID 10 :** la défaillance d'un seul disque met hors service tout l'ensemble de striping auquel il appartient, de sorte que la grappe fonctionne sur le miroir restant. Une seconde défaillance détruit la grappe, sauf si elle touche l'un des disques de l'ensemble déjà défaillant. Avec RAID 10, seule la paire en miroir concernée est dégradée, et une seconde défaillance est supportée tant qu'elle survient dans une autre paire. La reconstruction diffère en conséquence : RAID 10 ne resynchronise qu'un partenaire du miroir, RAID 01 doit reconstruire l'ensemble de striping complet.

**Avantages :**

- Performance élevée en lecture et en écriture
- Simple à comprendre comme combinaison de deux niveaux de base

**Inconvénients :**

- Comportement en cas de défaillance moins bon que RAID 10 pour un coût identique
- 50 % de la capacité de stockage perdus au profit du miroir
- Reconstruction plus longue, car un ensemble de striping complet doit être restauré

## Comparaison {/*#comparison*/}

| Niveau                                              | Disques min. | Tolérance aux pannes | Capacité utilisable | Performance                      |
| --------------------------------------------------- | ------------ | -------------------- | ------------------- | -------------------------------- |
| [JBOD](#jbod--just-a-bunch-of-disks)                | 1            | 0 disque             | 100 %               | Comme un disque unique           |
| [RAID 0](#raid-0--striping)                         | 2            | 0 disque             | 100 %               | Lectures et écritures très élevées |
| [RAID 1](#raid-1--mirroring)                        | 2            | n-1 disques          | 50 %                | Lectures rapides, écritures normales |
| [RAID 5](#raid-5--striping-with-distributed-parity) | 3            | 1 disque             | (n-1)/n             | Lectures rapides, écritures lentes |
| [RAID 6](#raid-6--striping-with-double-parity)      | 4            | 2 disques            | (n-2)/n             | Lectures rapides, écritures plus lentes |
| [RAID 10](#raid-10--striping--mirroring)            | 4            | 1 par paire          | 50 %                | Lectures et écritures très élevées |
| [RAID 01](#raid-01--mirroring--striping)            | 4            | 1 disque             | 50 %                | Lectures et écritures très élevées |

## Remarques importantes {/*#important-notes*/}

- RAID n'est **pas une sauvegarde** : il protège contre la défaillance d'un disque, pas contre la suppression accidentelle, la corruption ou les sinistres.
- Le temps de reconstruction sur de gros disques peut aller de quelques heures à plusieurs jours, période pendant laquelle la grappe est vulnérable.
- Les contrôleurs RAID matériels offrent de meilleures performances et un meilleur cache, mais ajoutent des coûts et une dépendance vis-à-vis du fabricant.
- Le RAID logiciel (par ex. Linux `mdadm`, Windows Storage Spaces, ZFS) est une alternative économique.
