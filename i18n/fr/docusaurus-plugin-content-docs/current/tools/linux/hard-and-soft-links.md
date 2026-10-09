---
title: "Liens physiques et liens symboliques"
description: "Liens physiques (hard links) et liens symboliques (soft links) sous Linux. Ce qu'ils sont, en quoi ils diffèrent et comment les créer et les gérer avec la commande `ln`."
keywords:
    - Linux
    - Lien physique
    - Soft link
    - Lien symbolique (symbolic link)
    - symlink
    - ln
    - Système de fichiers
    - inode
machine_translated: true
---

# Liens physiques et liens symboliques

Un **lien** est une référence d'un chemin du système de fichiers vers un autre fichier ou répertoire. Linux prend en charge deux types : les **liens physiques** (hard links) et les **liens symboliques** (soft links). Les deux sont créés avec la commande `ln` mais se comportent très différemment.

## Inodes {/*#inodes*/}

Chaque fichier d'un système de fichiers Linux est identifié par un **inode**, un numéro qui pointe vers les données réelles sur le disque. Un nom de fichier n'est qu'une étiquette associée à un inode, et plusieurs noms de fichiers peuvent pointer vers le même inode.

```bash
ls -i file.txt    # Show the inode number of a file
```

## Liens physiques {/*#hard-links*/}

Un lien physique crée un **nom de fichier supplémentaire pour le même inode**. Les deux noms désignent exactement le même fichier sur le disque. Aucun n'est « l'original ». Les données du fichier ne sont libérées que lorsque le dernier lien physique vers celui-ci est supprimé.

### Créer un lien physique {/*#creating-a-hard-link*/}

```bash
ln target.txt linkname.txt
```

### Propriétés {/*#properties*/}

- Les deux noms partagent le même inode
- La suppression d'un nom n'affecte pas l'autre
- Ne peut pas traverser des systèmes de fichiers, les deux noms doivent se trouver sur la même partition
- Ne peut pas pointer vers des répertoires (à de rares exceptions près, réservées au système)
- Ne peut pas pointer vers un fichier inexistant

### Exemple {/*#example*/}

```bash
echo "hello" > original.txt
ln original.txt hardlink.txt
ls -li original.txt hardlink.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 original.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 hardlink.txt
rm original.txt
cat hardlink.txt    # still prints "hello"
```

## Liens symboliques (soft links) {/*#symbolic-soft-links*/}

Un lien symbolique est un petit fichier spécial qui **stocke le chemin** vers un autre fichier ou répertoire. Il possède son propre inode. Si la cible est déplacée ou supprimée, le lien symbolique devient « pendant » (dangling) et cassé.

### Créer un lien symbolique {/*#creating-a-symbolic-link*/}

```bash
ln -s target.txt linkname.txt
```

### Propriétés {/*#properties-1*/}

- Possède son propre inode, distinct de celui de la cible
- Peut librement traverser des systèmes de fichiers
- Peut pointer vers des répertoires
- Peut pointer vers une cible inexistante (lien cassé / pendant)
- Peut utiliser des chemins absolus ou relatifs comme cible

### Exemple {/*#example-1*/}

```bash
echo "hello" > original.txt
ln -s original.txt softlink.txt
ls -li original.txt softlink.txt
# 12345 -rw-r--r-- 1 user user  6 Apr 25 10:00 original.txt
# 12346 lrwxrwxrwx 1 user user 12 Apr 25 10:00 softlink.txt -> original.txt
rm original.txt
cat softlink.txt    # error: No such file or directory
```

## Liens physiques et liens symboliques : comparaison {/*#hard-vs-soft-links*/}

| Propriété                          | Lien physique          | Lien symbolique |
| ---------------------------------- | ---------------------- | --------------- |
| Pointe vers                        | un inode               | un chemin       |
| Inode propre ?                     | Non (celui de la cible) | Oui            |
| Peut traverser des systèmes de fichiers ? | Non             | Oui             |
| Peut pointer vers des répertoires ? | Non                   | Oui             |
| Peut cibler un fichier manquant ?  | Non                    | Oui             |
| Survit à la suppression de la cible ? | Oui                 | Non             |
| Créé avec                          | `ln`                | `ln -s`         |

## Options courantes de `ln` {/*#common-ln-options*/}

| Commande             | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `ln target name`     | Créer un lien physique                                                            |
| `ln -s target name`  | Créer un lien symbolique                                                          |
| `ln -f target name`  | Supprimer (écraser) un fichier de destination existant                            |
| `ln -i target name`  | Demander confirmation avant d'écraser une destination existante                   |
| `ln -b target name`  | Sauvegarder une destination existante avant de la remplacer (ajoute `~` au nom de fichier) |
| `ln -v target name`  | Afficher le nom de chaque fichier lié (verbeux)                                   |
| `ln -sf target name` | Forcer le remplacement d'un lien existant de même nom                             |
| `readlink name`      | Afficher le chemin vers lequel pointe un lien symbolique                          |
| `readlink -f name`   | Résoudre tous les liens symboliques en chemin absolu canonique                    |

## Quand utiliser lequel {/*#when-to-use-which*/}

- Les **liens physiques** sont utiles pour conserver plusieurs noms stables pour un même fichier (par exemple des instantanés de sauvegarde partageant le contenu inchangé) sans consommer d'espace disque supplémentaire.
- Les **liens symboliques** sont le choix le plus courant pour les raccourcis. Par exemple pour basculer entre des versions d'un outil (par ex. `/usr/bin/python => python3.12`), ou pour référencer des fichiers à travers des points de montage.
