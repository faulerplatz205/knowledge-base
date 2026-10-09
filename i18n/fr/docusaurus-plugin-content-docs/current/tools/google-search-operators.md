---
title: "Opérateurs de recherche Google"
description: "Aperçu des opérateurs de recherche avancés de Google et des techniques permettant d'obtenir des résultats plus précis."
keywords:
    - Google
    - Recherche
    - Opérateurs de recherche
    - Google Dorking
    - Recherche avancée
machine_translated: true
---

# Opérateurs de recherche Google

## Correspondance exacte {/*#exact-match*/}

Placer une expression entre guillemets doubles permet de rechercher exactement cette suite de mots.

```text
"dependency injection in Angular"
```

Ne renvoie que les résultats contenant cette expression exacte, et non les pages qui mentionnent simplement les mots isolément.

## Exclure des termes {/*#exclude-terms*/}

`-` placé directement avant un mot exclut les résultats contenant ce terme.

```text
python -snake
```

Recherche « python » mais exclut les pages sur les serpents.

## Opérateur OR {/*#or-operator*/}

`OR` (en majuscules) entre des termes permet de trouver les pages contenant l'un ou l'autre terme.

```text
React OR Vue
```

## Joker {/*#wildcard*/}

`*` sert d'espace réservé pour des mots inconnus au sein d'une expression à correspondance exacte.

```text
"how to * a REST API"
```

## Recherche par site {/*#site-search*/}

`site:` restreint les résultats à un domaine précis.

```text
site:developer.mozilla.org flexbox
```

Un TLD peut aussi être ciblé :

```text
site:edu machine learning
```

## Type de fichier {/*#file-type*/}

`filetype:` permet de trouver des formats de fichiers précis.

```text
filetype:pdf network security
```

Types de fichiers courants : `pdf`, `docx`, `xlsx`, `pptx`, `csv`, `xml`, `json`, `txt`

## Filtres sur l'URL, le titre et le texte {/*#url-title-and-text-filters*/}

- `inurl:` — le terme doit apparaître dans l'URL
- `intitle:` — le terme doit apparaître dans le titre de la page
- `intext:` — le terme doit apparaître dans le corps du texte
- `allinurl:`, `allintitle:`, `allintext:` — tous les termes suivants doivent apparaître à l'emplacement respectif

```text
intitle:cheatsheet javascript
```

```text
allinurl:api docs v2
```

## Plage de dates {/*#date-range*/}

`before:` et `after:` s'utilisent avec des dates au format `YYYY-MM-DD`.

```text
"React Server Components" after:2025-01-01
```

## Related et Cache {/*#related-and-cache*/}

- `related:` — trouver des sites similaires à un domaine donné
- `cache:` — afficher la version en cache de Google d'une page

```text
related:stackoverflow.com
```

## Combiner des opérateurs {/*#combining-operators*/}

Les opérateurs peuvent être combinés pour des recherches très ciblées.

```text
site:github.com filetype:md "contributing guidelines"
```

```text
"error handling" site:stackoverflow.com -closed after:2024-01-01
```

```text
intitle:resume filetype:pdf site:edu "computer science"
```
