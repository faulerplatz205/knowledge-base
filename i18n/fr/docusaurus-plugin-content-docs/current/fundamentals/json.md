---
title: "JSON"
description: "Conventions JSON : nommage des fichiers, nommage des clés et comparaison de JSON, JSONC et JSON5"
keywords:
  - "JSON"
  - "JSONC"
  - "JSON5"
  - "Nommage des fichiers"
  - "Nommage des clés"
  - "kebab-case"
  - "camelCase"
  - "Conventions de nommage"
tags:
  - ap2
machine_translated: true
---

# JSON

## Vue d'ensemble {/*#overview*/}

JSON (JavaScript Object Notation) est un format de données léger, fondé sur le texte, introduit par Douglas Crockford au début des années 2000. Il dérive de la syntaxe littérale d'objet de JavaScript, mais est indépendant du langage. Aujourd'hui, JSON est le format le plus répandu pour l'échange de données entre clients et serveurs web, pour les fichiers de configuration et pour les API.

## Nommage des fichiers {/*#file-naming*/}

### Réponse : kebab-case {/*#answer-kebab-case*/}

```text
user-data.json
api-config.json
database-schema.json
```

### Pourquoi kebab-case ? {/*#why-kebab-case*/}

- **Sûr sur toutes les plateformes** : aucun problème avec les systèmes de fichiers insensibles à la casse (Windows/macOS)
- **Meilleure lisibilité** dans les listes de fichiers et les explorateurs
- **Adapté aux URL** : fonctionne sans encodage lorsque les fichiers sont servis via HTTP

## Nommage des clés {/*#key-naming*/}

### Réponse : camelCase {/*#answer-camelcase*/}

```json
{
  "userId": 123,
  "firstName": "Alice",
  "isActive": true
}
```

### Pourquoi camelCase ? {/*#why-camelcase*/}

- Standard dans l'écosystème JavaScript/TypeScript, d'où JSON est issu
- La spécification JSON elle-même ne prescrit aucun style de clé
- La plupart des API web publiques (Google, GitHub, Stripe) utilisent camelCase

### Remarque {/*#note*/}

`snake_case` est courant dans les API centrées sur Python (par ex. Django REST Framework, FastAPI). Il convient de choisir un style et de s'y tenir au sein d'un projet.

## JSON, JSONC et JSON5 {/*#json-vs-jsonc-vs-json5*/}

| Fonctionnalité                | JSON                | JSONC                              | JSON5                           |
| ----------------------------- | ------------------- | ---------------------------------- | ------------------------------- |
| Commentaires                  | Non                 | `//` et `/* */`                   | `//` et `/* */`                |
| Virgules finales              | Non                 | Oui                                | Oui                             |
| Clés sans guillemets          | Non                 | Non                                | Oui                             |
| Chaînes entre apostrophes     | Non                 | Non                                | Oui                             |
| Usage typique                 | Échange de données, API | Fichiers de configuration (VS Code, TypeScript) | Fichiers de configuration, données modifiées à la main |
