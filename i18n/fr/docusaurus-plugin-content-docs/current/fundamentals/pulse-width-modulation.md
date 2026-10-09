---
title: "Fréquence (Hz) et modulation de largeur d'impulsion (PWM)"
description: "Ce que signifie la fréquence en hertz et comment la modulation de largeur d'impulsion utilise un rapport cyclique pour approcher des niveaux de sortie analogiques avec un signal purement numérique, avec les formules de la période, de la fréquence et du rapport cyclique."
keywords:
    - Fréquence
    - Hertz
    - Hz
    - Période
    - Modulation de largeur d'impulsion
    - PWM
    - Rapport cyclique
    - GPIO
    - Variation d'intensité
    - Commande de moteur
tags:
    - ap2
machine_translated: true
---

# Fréquence (Hz) et modulation de largeur d'impulsion (PWM)

## Fréquence (Hz) {/*#frequency-hz*/}

La **fréquence** décrit combien de fois par seconde un signal périodique se répète. Son unité est le **hertz (Hz)** : 1 Hz correspond à un cycle complet par seconde.

La fréquence `f` et la durée d'un cycle, la **période** `T`, sont inverses l'une de l'autre :

```text
f = 1 / T        (frequency  = 1 / period)
T = 1 / f        (period     = 1 / frequency)
```

**Exemple :** un signal se répète toutes les 1 ms (0,001 s).

```text
f = 1 / 0.001 s = 1000 Hz = 1 kHz
```

## Le problème résolu par la PWM {/*#the-problem-pwm-solves*/}

Une sortie GPIO numérique ne peut fournir que deux états : **HIGH** (par exemple 3,3 V) ou **LOW** (0 V). Il n'existe aucune valeur intermédiaire. Pourtant, de nombreuses tâches exigent un état intermédiaire, comme faire varier l'intensité d'une LED, faire tourner un moteur à mi-vitesse ou piloter un [buzzer](./raspberry-pi.md) passif.

La **modulation de largeur d'impulsion (PWM)** résout ce problème en commutant la sortie entre HIGH et LOW de manière très rapide. Le rapport entre la durée à l'état HIGH et le cycle total détermine la puissance *moyenne* délivrée, que l'appareil connecté perçoit comme une valeur située entre l'arrêt complet et le fonctionnement complet.

## Rapport cyclique {/*#duty-cycle*/}

Le **rapport cyclique** (en allemand *Puls-Pause-Verhältnis*) est la part d'une période pendant laquelle le signal est à l'état HIGH :

```text
Duty cycle = (t_on / T) x 100%

t_on = time HIGH within one period
T    = t_on + t_off (full period)
```

| Rapport cyclique | Signal                           | Effet (à 3,3 V)       |
| ---------------- | -------------------------------- | --------------------- |
| 0 %              | toujours LOW                     | complètement éteint   |
| 25 %             | HIGH 1/4 du temps                | faible puissance      |
| 50 %             | HIGH la moitié du temps          | demi-puissance        |
| 75 %             | HIGH 3/4 du temps                | forte puissance       |
| 100 %            | toujours HIGH                    | complètement allumé   |

**Exemple :** un signal est à l'état HIGH pendant 0,25 ms au sein d'une période de 1 ms.

```text
Duty cycle = (0.25 ms / 1 ms) x 100% = 25%
```

## Niveau de sortie moyen {/*#average-output-level*/}

La tension moyenne perçue par l'appareil varie linéairement avec le rapport cyclique :

```text
U_avg = duty cycle x U_max
```

**Exemple :** une sortie de 3,3 V fonctionnant avec un rapport cyclique de 50 %.

```text
U_avg = 0.5 x 3.3 V = 1.65 V
```

:::note
La PWM n'abaisse **pas** la tension : la sortie continue de basculer entre 0 V et le niveau complet. L'appareil *se comporte* seulement comme s'il recevait la moyenne, car la commutation est plus rapide que sa capacité de réaction.
:::

## Calcul de la durée à l'état HIGH {/*#calculating-the-high-time*/}

La combinaison des formules ci-dessus donne la durée à l'état HIGH pour une fréquence et un rapport cyclique choisis :

```text
T = 1 / f
t_on = duty cycle x T
```

**Exemple :** un signal de 1 kHz avec un rapport cyclique de 25 %.

```text
T = 1 / 1000 Hz = 0.001 s = 1 ms
t_on = 0.25 x 1 ms = 0.25 ms
```

## Applications typiques {/*#typical-applications*/}

- **Variation d'intensité d'une LED :** un rapport cyclique plus élevé donne une LED plus lumineuse.
- **Vitesse de moteur et de ventilateur :** à une fréquence relativement élevée, la sortie bascule entre HIGH et LOW ; le rapport fixe la puissance, et donc la vitesse.
- **Tonalités sur un [buzzer](./raspberry-pi.md) passif :** la *fréquence* du signal PWM fixe la hauteur de la tonalité.

## Voir aussi {/*#see-also*/}

- [Présentation du Raspberry Pi](./raspberry-pi.md) : comment les capteurs et actionneurs (tels qu'un buzzer passif) sont câblés
- [Convertisseur analogique-numérique (CAN)](./analog-digital-converter.mdx) : le sens inverse, c'est-à-dire la conversion d'un signal analogique en valeur numérique
- [Unités électriques](./electrical-units.md) : bases de la tension et de la puissance
