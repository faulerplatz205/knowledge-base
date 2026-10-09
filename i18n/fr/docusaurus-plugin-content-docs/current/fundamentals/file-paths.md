---
title: "Chemins de fichiers"
description: "Chemins absolus et relatifs dans un système de fichiers : leurs différences et les composants de chemin spéciaux `/`, `.`, `..` et `~`."
keywords:
    - Chemin de fichier
    - Chemin absolu
    - Chemin relatif
    - Répertoire de travail
    - Système de fichiers
machine_translated: true
---

# Chemins de fichiers

Un **chemin** décrit l'emplacement d'un fichier ou d'un répertoire dans le système de fichiers. Il existe deux manières de l'écrire : **absolue** et **relative**.

## Chemins absolus {/*#absolute-paths*/}

Un chemin absolu part de la **racine** du système de fichiers et est donc non ambigu, quel que soit l'emplacement actuel.

- Sous Linux et macOS, la racine est `/`, par ex. `/home/user/notes.txt`
- Sous Windows, il commence par une lettre de lecteur, par ex. `C:\Users\user\notes.txt`

## Chemins relatifs {/*#relative-paths*/}

Un chemin relatif est interprété **par rapport au répertoire de travail actuel**. Il ne commence pas par `/` (ni par une lettre de lecteur).

```bash
cd /home/user
cat notes.txt          # => /home/user/notes.txt
cat projects/app.js    # => /home/user/projects/app.js
```

## Composants de chemin spéciaux {/*#special-path-components*/}

| Composant | Signification                                |
| --------- | -------------------------------------------- |
| `/`       | Répertoire racine (début d'un chemin absolu) |
| `.`       | Le répertoire courant                        |
| `..`      | Le répertoire parent (un niveau au-dessus)   |
| `~`       | Le répertoire personnel de l'utilisateur actuel |

### Exemples {/*#examples*/}

```bash
cd ..        # Move up one directory
cd ./bin     # Enter the bin directory below the current one
cd ~         # Go to the home directory
cat ../config.txt
```

## Répertoire de travail {/*#working-directory*/}

Le **répertoire de travail** est le répertoire dans lequel un processus se trouve actuellement. Il constitue l'ancrage par rapport auquel tout chemin relatif est résolu.

```bash
pwd    # Print the current working directory
```
