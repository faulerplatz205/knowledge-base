---
title: "Compilateur et interpréteur"
description: "Comment les compilateurs et les interpréteurs traduisent le code source, leurs avantages et inconvénients, ainsi que le rôle du bytecode, des machines virtuelles et de la compilation juste-à-temps"
keywords:
    - "Compilateur"
    - "Interpréteur"
    - "Juste-à-temps"
    - "JIT"
    - "Bytecode"
    - "Machine virtuelle"
    - "Éditeur de liens"
    - "Ahead-of-Time"
    - "Transpileur"
    - "Langages de programmation"
tags:
    - ap2
machine_translated: true
---

# Compilateur et interpréteur

## Aperçu {/*#overview*/}

Un processeur ne peut exécuter que du code machine. Le code source écrit dans un langage de haut niveau doit donc d'abord
être traduit. Deux approches fondamentales existent :

- **Compilateur :** traduit l'intégralité du programme **avant** l'exécution en un artefact autonome lisible par la machine
- **Interpréteur :** lit le code source **pendant** l'exécution et exécute chaque instruction immédiatement

Qu'un langage soit compilé ou interprété est une propriété de l'**implémentation**, et non du langage
lui-même. Le C est généralement compilé, mais des interpréteurs C existent ; JavaScript était historiquement interprété et est
compilé à l'exécution par les moteurs modernes.

---

## Compilateur {/*#compiler*/}

### Processus de traduction {/*#translation-process*/}

La traduction s'effectue généralement en plusieurs phases :

1. **Analyse lexicale :** le flux de caractères est découpé en jetons (mots-clés, identifiants, opérateurs)
2. **Analyse syntaxique :** les jetons sont vérifiés par rapport à la grammaire et transformés en arbre syntaxique
3. **Analyse sémantique :** la compatibilité des types, les déclarations et les portées sont vérifiées
4. **Optimisation :** la représentation intermédiaire est améliorée (par ex. suppression du code mort, déroulage de boucles)
5. **Génération de code :** le code machine est émis, généralement sous forme de fichiers objets

Un **éditeur de liens** (linker) combine ensuite les fichiers objets avec les bibliothèques requises pour former un programme exécutable.

```text
Source Code => [Compiler] => Object Code => [Linker] => Executable => [CPU]
```

Les erreurs sont signalées à la compilation, de sorte qu'un programme comportant des erreurs de syntaxe ou de type n'atteint jamais l'exécution.

### Avantages {/*#advantages*/}

- **Vitesse d'exécution :** le code machine traduit s'exécute directement sur le processeur
- **Détection précoce des erreurs :** les erreurs syntaxiques et de nombreuses erreurs sémantiques apparaissent avant la livraison du programme
- **Optimisation :** l'ensemble du programme est visible, ce qui permet des optimisations étendues
- **Protection du code source :** seul l'artefact compilé doit être distribué
- **Aucune dépendance à l'exécution :** le système cible n'a pas besoin que l'outil de compilation soit installé

### Inconvénients {/*#disadvantages*/}

- **Temps de compilation :** chaque modification exige une nouvelle compilation avant de pouvoir être testée
- **Dépendance à la plateforme :** le code machine est lié à une architecture de processeur et à un système d'exploitation, de sorte qu'une
  compilation distincte est nécessaire pour chaque plateforme cible
- **Effort de débogage :** le code machine exécuté ne ressemble plus au code source, ce qui nécessite
  des symboles de débogage

---

## Interpréteur {/*#interpreter*/}

L'interpréteur lit le code source instruction par instruction, l'analyse et l'exécute immédiatement. Aucun
fichier exécutable distinct n'est produit. L'interpréteur doit être présent sur le système cible.

```text
Source Code => [Interpreter] => Statement analysed and executed => [CPU]
```

Les erreurs ne deviennent visibles que lorsque la ligne concernée est effectivement atteinte. Une erreur de syntaxe dans une branche rarement utilisée
peut ainsi passer inaperçue pendant longtemps.

### Avantages {/*#advantages-1*/}

- **Cycle de développement rapide :** le code modifié peut être exécuté immédiatement, sans étape de compilation
- **Indépendance vis-à-vis de la plateforme :** le même code source s'exécute partout où un interpréteur est disponible
- **Débogage facilité :** les erreurs sont signalées avec référence à la ligne source d'origine
- **Flexibilité :** du code peut être généré et exécuté à l'exécution

### Inconvénients {/*#disadvantages-1*/}

- **Vitesse d'exécution :** le surcoût de traduction intervient à chaque exécution, et de façon répétée pour le code situé dans des boucles
- **Détection tardive des erreurs :** les erreurs n'apparaissent qu'à l'exécution
- **Dépendance à l'exécution :** l'interpréteur doit être installé sur le système cible
- **Divulgation du code source :** le programme est généralement livré sous forme de code source lisible

---

## Bytecode et machines virtuelles {/*#bytecode-and-virtual-machines*/}

La plupart des plateformes modernes combinent les deux approches. Le code source est compilé en **bytecode**, un code
intermédiaire compact qui n'est pas lié à un processeur spécifique. Une **machine virtuelle** (VM) exécute ensuite ce
bytecode sur le système cible.

```text
Source Code => [Compiler] => Bytecode => [Virtual Machine] => Machine Code => [CPU]
```

| Plateforme | Compilateur | Code intermédiaire                 | Environnement d'exécution     |
| ---------- | ----------- | ---------------------------------- | ----------------------------- |
| Java       | `javac`     | Bytecode (`.class`)                | JVM (Java Virtual Machine)    |
| C# / .NET  | `csc`     | CIL (Common Intermediate Language) | CLR (Common Language Runtime) |
| Python     | intégré     | Bytecode (`.pyc`)                  | VM Python                     |

Cela sépare les deux aspects dépendant de la plateforme : le compilateur s'exécute une seule fois et produit un bytecode portable,
tandis que seule la machine virtuelle doit être implémentée pour chaque plateforme. Il en résulte le principe
*write once, run anywhere* (écrire une fois, exécuter partout), au prix d'une couche supplémentaire entre le programme et le matériel.

---

## Compilation juste-à-temps {/*#just-in-time-compilation*/}

Un **compilateur juste-à-temps** (JIT) fait partie de la machine virtuelle. Le bytecode est d'abord interprété, et
l'environnement d'exécution enregistre la fréquence d'exécution de chaque section. Les sections fréquemment utilisées, appelées *hot spots*, sont
compilées en code machine natif à l'exécution et mises en cache, de sorte que les appels suivants s'exécutent à la vitesse native.

```text
Bytecode => [Interpretation + Profiling] => hot code => [JIT Compiler] => cached Machine Code
```

### Avantages {/*#advantages-2*/}

- **Vitesse proche du natif** tout en conservant la portabilité du bytecode
- **Informations d'exécution** telles que les types de données réels et les fréquences de branchement, qui permettent des optimisations qu'un
  compilateur statique ne peut pas réaliser

### Inconvénients {/*#disadvantages-2*/}

- **Phase de préchauffage :** les premières exécutions sont lentes, ce qui est perceptible pour les programmes de courte durée
- **Consommation de mémoire :** les données de profilage et le code compilé occupent de la mémoire supplémentaire
- **Temps d'exécution moins prévisible :** la compilation pendant l'exécution fait fluctuer les durées, ce qui est problématique
  pour les systèmes temps réel

Le pendant est la **compilation anticipée** (AOT, ahead-of-time), où le bytecode est entièrement traduit avant
l'exécution. Cela supprime la phase de préchauffage et raccourcit le temps de démarrage, mais perd les informations d'exécution, et
est donc utilisée pour des processus de courte durée tels que les outils en ligne de commande ou les fonctions serverless.

### JIT et AOT {/*#jit-vs-aot*/}

| Critère                         | Juste-à-temps (JIT)                                  | Compilation anticipée (AOT)                          |
| ------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Moment de la traduction         | À l'exécution, pour le code fréquemment utilisé      | Entièrement avant l'exécution                        |
| Temps de démarrage              | Lent, phase de préchauffage                          | Rapide, pas de préchauffage                          |
| Performance maximale            | Élevée, grâce à l'optimisation à l'exécution         | Limitée, optimisation statique uniquement            |
| Base de l'optimisation          | Profil d'exécution réel (hot spots, types)           | Analyse statique du code uniquement                  |
| Consommation de mémoire         | Plus élevée, données de profilage et cache de code   | Plus faible                                          |
| Prévisibilité des temps         | Fluctuante                                           | Prévisible                                           |
| Fonctionnalités dynamiques du langage | Sans restriction                               | Restreintes, nécessitent une configuration           |
| Cas d'usage typiques            | Applications serveur et de bureau de longue durée    | Processus de courte durée, outils CLI, serverless    |

---

## Transpileur {/*#transpiler*/}

Un **transpileur** (compilateur source-à-source) traduit le code source en code source d'un autre
langage de même niveau d'abstraction, et non en code machine. Des exemples typiques sont TypeScript,
transpilé en JavaScript, et Sass, transpilé en CSS.

```text
TypeScript => [Transpiler] => JavaScript => [Engine with JIT] => Machine Code
```

---

## Comparaison {/*#comparison*/}

| Critère                            | Compilateur                      | Interpréteur                                    |
| ---------------------------------- | -------------------------------- | ----------------------------------------------- |
| Moment de la traduction            | Entièrement avant l'exécution    | Pendant l'exécution, instruction par instruction |
| Résultat                           | Fichier exécutable               | Aucun artefact distinct                         |
| Vitesse d'exécution                | Élevée                           | Faible                                          |
| Détection des erreurs              | À la compilation                 | À l'exécution, uniquement dans le code exécuté  |
| Cycle de développement             | Plus lent, compilation nécessaire | Plus rapide, exécution immédiate               |
| Indépendance vis-à-vis de la plateforme | Faible, une compilation par plateforme | Élevée, nécessite un interpréteur       |
| Exigence sur le système cible      | Aucune                           | L'interpréteur doit être installé               |
| Protection du code source          | Assurée                          | Généralement non assurée                        |

---

## Représentants typiques {/*#typical-representatives*/}

- **Compilés en code machine :** C, C++, Rust, Go, Delphi
- **Interprétés :** scripts shell, Perl, PHP, Ruby, Python
- **Bytecode avec VM et JIT :** Java, Kotlin, C#, et JavaScript dans des moteurs tels que V8
