---
title: "Types de systèmes de fichiers"
description: "Aperçu des types de systèmes de fichiers courants (FAT32, exFAT, NTFS, ext4, APFS, btrfs) et de leurs cas d'usage typiques, limites et prise en charge selon les plateformes."
keywords:
    - Système de fichiers
    - FAT32
    - exFAT
    - NTFS
    - ext4
    - APFS
    - btrfs
machine_translated: true
---

# Types de systèmes de fichiers

Un **système de fichiers** définit la manière dont les données sont organisées et stockées sur un support de stockage. Les systèmes de fichiers diffèrent par la taille maximale des fichiers, la prise en charge de la journalisation et les systèmes d'exploitation capables de les lire et de les écrire.

## Vue d'ensemble {/*#overview*/}

| Système de fichiers | Taille max. de fichier | Journalisation        | Usage typique                                        |
| ------------------- | ---------------------- | --------------------- | ---------------------------------------------------- |
| FAT32               | 4 Go                   | Non                   | Clés USB, cartes SD, large compatibilité             |
| exFAT               | 16 Eo                  | Non                   | Grandes clés USB et cartes SD multiplateformes       |
| NTFS                | 16 Eo                  | Oui                   | Lecteurs système et de données Windows               |
| ext4                | 16 To                  | Oui                   | Système de fichiers Linux par défaut                 |
| APFS                | 8 Eo                   | Oui (copy-on-write)   | Système de fichiers macOS par défaut                 |
| btrfs               | 16 Eo                  | Oui (copy-on-write)   | Linux, avec instantanés et regroupement de volumes   |

## Choix d'un système de fichiers {/*#choosing-a-filesystem*/}

- **Compatibilité maximale (petits fichiers) :** FAT32 est lu et écrit par pratiquement tous les appareils, mais est limité à 4 Go par fichier.
- **Compatibilité maximale (gros fichiers) :** exFAT supprime la limite de 4 Go et fonctionne sous Linux, Windows et macOS.
- **Linux uniquement :** ext4 est le choix par défaut sûr ; btrfs ajoute les instantanés et d'autres fonctions avancées.
- **Windows uniquement :** NTFS prend en charge les permissions, la journalisation et les grands volumes.
- **macOS uniquement :** APFS est optimisé pour les SSD et constitue le choix moderne par défaut.
