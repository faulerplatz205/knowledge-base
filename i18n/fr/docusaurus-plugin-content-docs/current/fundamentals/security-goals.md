---
title: "Objectifs de sécurité informatique"
description: "Les quatre objectifs fondamentaux de la sécurité informatique, confidentialité, intégrité, disponibilité, authenticité, et leur signification en pratique."
keywords:
    - Objectifs de sécurité
    - Confidentialité
    - Intégrité
    - Disponibilité
    - Authenticité
tags:
    - ap2
machine_translated: true
---

# Objectifs de sécurité informatique

## Aperçu {/*#overview*/}

La sécurité informatique repose sur quatre objectifs fondamentaux qui définissent ce qu'un système sûr doit garantir.

## Confidentialité {/*#confidentiality*/}

L'information n'est accessible qu'aux parties autorisées.

- Les données doivent être protégées contre tout accès ou toute divulgation non autorisés
- Obtenue par le chiffrement, les contrôles d'accès et le principe du besoin d'en connaître
- **Exemple** : seul le destinataire prévu peut lire un e-mail chiffré

## Intégrité {/*#integrity*/}

L'information est exacte et n'a pas été falsifiée.

- Les données ne doivent pas être modifiées, corrompues ou supprimées sans autorisation, que ce soit intentionnellement ou accidentellement
- Obtenue par les fonctions de hachage, les signatures numériques et les sommes de contrôle
- **Exemple** : un fichier téléchargé dont le hachage correspond à la valeur publiée n'a pas été altéré

## Disponibilité {/*#availability*/}

Les systèmes et les données sont accessibles aux utilisateurs autorisés lorsqu'ils en ont besoin.

- Les services doivent rester opérationnels et réactifs ; une indisponibilité ou un refus d'accès constitue une défaillance de sécurité
- Obtenue par la redondance, les sauvegardes, la protection contre les attaques DDoS et une infrastructure tolérante aux pannes
- **Exemple** : un service web protégé contre les attaques DDoS reste joignable pendant une attaque

## Authenticité {/*#authenticity*/}

L'identité d'un partenaire de communication ou l'origine des données peut être vérifiée.

- Garantit que les parties sont bien celles qu'elles prétendent être et que les données proviennent d'une source de confiance
- Obtenue par les certificats numériques, les signatures et les protocoles d'authentification (p. ex. TLS, MFA)
- **Exemple** : un certificat TLS prouve qu'un site web est exploité par l'organisation indiquée

## Récapitulatif {/*#summary*/}

| Objectif        | Question                                          | Solutions                          |
| --------------- | ------------------------------------------------- | ---------------------------------- |
| Confidentialité | Qui peut y accéder ?                              | Chiffrement, contrôle d'accès      |
| Intégrité       | Cela a-t-il été falsifié ?                        | Hachages, signatures numériques    |
| Disponibilité   | Est-ce accessible en cas de besoin ?              | Redondance, sauvegardes            |
| Authenticité    | Est-ce bien la personne ou la chose prétendue ?   | Certificats, MFA                   |
