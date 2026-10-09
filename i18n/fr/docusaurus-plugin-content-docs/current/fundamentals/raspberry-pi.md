---
title: "Présentation du Raspberry Pi"
description: "Un aperçu pratique du Raspberry Pi : ses broches GPIO, la différence entre capteurs et actionneurs, le fonctionnement d'une plaque d'essai (breadboard) et la signification des connexions de composants courants tels qu'une LED, un capteur de température et un buzzer."
keywords:
    - Raspberry Pi
    - GPIO
    - Capteur
    - Actionneur
    - Plaque d'essai
    - LED
    - Capteur de température
    - Buzzer
    - Câblage
    - VCC
    - VDD
    - GND
    - SDA
    - SCL
    - I2C
tags:
    - ap2
machine_translated: true
---

# Présentation du Raspberry Pi

## Qu'est-ce qu'un Raspberry Pi {/*#what-is-a-raspberry-pi*/}

Le Raspberry Pi est un petit ordinateur monocarte. Outre les ports habituels (USB, HDMI, réseau), il possède une rangée de **broches GPIO** qui permettent de connecter directement des composants électroniques, ce qui en fait une plateforme répandue pour les projets matériels.

## Broches GPIO {/*#gpio-pins*/}

**GPIO** signifie *General-Purpose Input/Output* (entrée/sortie à usage général). Le connecteur de broches regroupe plusieurs types de broches :

- **Broches d'alimentation :** sorties fixes de **3,3 V** et de **5 V** pour alimenter les composants.
- **Broches de masse (GND) :** la référence commune et le chemin de retour du courant.
- **Broches d'E/S :** broches librement programmables, qui peuvent être lues (**entrée**) ou pilotées (**sortie**).

Une broche d'E/S GPIO est purement **numérique** : elle ne connaît que **HIGH** (3,3 V) et **LOW** (0 V). Elle ne peut pas mesurer directement une tension analogique, de sorte qu'un capteur analogique nécessite un [convertisseur analogique-numérique (CAN)](./analog-digital-converter.mdx) intermédiaire. À l'inverse, une sortie de type analogique est approchée par une [modulation de largeur d'impulsion (PWM)](./pulse-width-modulation.md).

## Capteurs et actionneurs {/*#sensors-vs-actuators*/}

Les composants se répartissent en deux rôles opposés :

- Un **capteur** est un composant qui convertit une grandeur physique de l'environnement (température, humidité, pression, accélération, etc.) en un **signal électrique**.
- Un **actionneur** est le pendant d'un capteur et fait exactement l'inverse : il convertit un **signal électrique** en une grandeur physique telle qu'un mouvement, une pression, un son ou de la lumière.

| Rôle       | Sens                                | Exemples                                   |
| ---------- | ----------------------------------- | ------------------------------------------ |
| Capteur    | environnement => signal électrique  | capteur de température, capteur de lumière |
| Actionneur | signal électrique => environnement  | moteur, lampe/LED, haut-parleur, buzzer    |

## La plaque d'essai (breadboard) {/*#the-breadboard*/}

Une **plaque d'essai** permet de relier des composants sans soudure : les fils et les pattes des composants sont simplement enfoncés dans ses trous. Les trous appartenant à la même bande interne sont reliés électriquement :

- Les deux longs **rails d'alimentation** le long des bords (marqués `+` et `-`) parcourent toute la longueur de la plaque. Ils sont généralement alimentés une seule fois depuis une broche 3,3 V / 5 V et une broche GND, de sorte que l'alimentation et la masse sont disponibles partout.
- Les **bandes de bornes** intérieures relient entre eux les trous de chaque courte colonne, séparées par un intervalle au milieu de la plaque.

Les composants enfichés dans la même bande reliée partagent une connexion électrique, ce qui permet de construire un circuit.

## Connexion des composants {/*#connecting-components*/}

La plupart des composants exposent quelques connexions clairement définies. Les trois plus courantes sont l'**alimentation (VCC / `+`)**, la **masse (GND / `-`)** et une ligne de **signal**.

| Composant              | Rôle       | Connexions                           | Explication complémentaire                              |
| ---------------------- | ---------- | ------------------------------------ | ------------------------------------------------------- |
| LED / lampe            | actionneur | anode (`+`), cathode (`-`)   | la patte la plus longue est `+`, la plus courte est `-` |
| Capteur de température | capteur    | VCC (`+`), GND (`-`), signal | le signal transporte la valeur mesurée vers une broche GPIO |
| Buzzer                 | actionneur | `+` (signal), `-` (GND)      | le signal commute ou pilote le son                      |

### Libellés de broches courants {/*#common-pin-labels*/}

Les modules de capteurs et les cartes d'adaptation indiquent rarement leurs connexions en toutes lettres ; ils impriment plutôt des abréviations courtes et normalisées à côté de chaque broche :

- **VDD / VDC / VCC (`+`) :** la tension d'alimentation positive (entrée d'alimentation). `VDD` et `VCC` proviennent de la conception de puces, `VDC` signifie simplement « volts DC » ; en pratique, les trois repèrent la broche d'alimentation (par ex. 3,3 V ou 5 V).
- **GND / VSS (`-`) :** la masse, la référence commune et le chemin de retour du courant.
- **SDA :** la ligne de **données** du bus **I2C**, par laquelle un capteur échange des valeurs avec le Pi.
- **SCL :** la ligne d'**horloge** du bus **I2C**, qui maintient les deux côtés en cadence.

**I2C** est un bus à deux fils (SDA + SCL) qui permet à plusieurs capteurs numériques de partager les deux mêmes broches GPIO, chacun étant adressé individuellement. Un capteur I2C n'a pas besoin de [CAN](./analog-digital-converter.mdx), car la conversion en valeurs numériques s'effectue déjà dans le module.

### LED / lampe {/*#led--lamp*/}

Une LED a deux pattes à polarité fixe :

- **Anode (`+`) :** la patte **la plus longue**, reliée du côté GPIO / positif.
- **Cathode (`-`) :** la patte **la plus courte** (également repérée par le méplat du rebord), reliée à GND.

Une LED doit toujours être pilotée à travers une **résistance série** pour limiter le courant : sans elle, la LED absorbe un courant trop élevé et grille.

### Capteur de température {/*#temperature-sensor*/}

Un module de capteur typique possède trois broches :

- **VCC (`+`) :** alimentation, par ex. 3,3 V.
- **GND (`-`) :** masse.
- **Signal :** la sortie qui transporte la mesure.

Si le signal est **analogique** (une tension proportionnelle à la température), il ne peut pas aller directement sur une broche GPIO : un [CAN](./analog-digital-converter.mdx) est d'abord nécessaire.

### Buzzer {/*#buzzer*/}

Un buzzer n'a que deux connexions, `+` (signal) et `-` (GND), et existe en deux variantes :

- **Buzzer actif :** contient son propre oscillateur et n'a besoin que d'un signal HIGH / LOW pour activer et désactiver le son. Il joue une seule tonalité fixe.
- **Buzzer passif :** n'a pas d'oscillateur et peut jouer différentes tonalités, mais nécessite un signal variable. La hauteur est fixée par la fréquence d'un signal [PWM](./pulse-width-modulation.md).

## Voir aussi {/*#see-also*/}

- [Convertisseur analogique-numérique (CAN)](./analog-digital-converter.mdx) : lire un capteur analogique sur un Pi uniquement numérique
- [Fréquence (Hz) et modulation de largeur d'impulsion (PWM)](./pulse-width-modulation.md) : approcher une sortie analogique et piloter un buzzer passif
- [Unités électriques](./electrical-units.md) : la tension, le courant et la résistance derrière chaque connexion
