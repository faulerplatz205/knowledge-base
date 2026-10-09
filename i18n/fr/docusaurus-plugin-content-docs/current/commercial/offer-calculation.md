---
title: "Calcul d'une offre"
description: "Comment calculer un prix de vente à partir du prix catalogue d'un fournisseur selon le schéma de calcul commercial standard, avec remises, majorations et TVA."
keywords:
    - "Calcul d'une offre"
    - "Calcul commercial"
    - "Tarification"
    - "Approvisionnement"
    - "Commerce"
tags:
    - ap2
machine_translated: true
---

# Calcul d'une offre

## Aperçu {/*#overview*/}

Le calcul d'une offre détermine le prix de vente d'un produit à partir du prix d'achat, auquel s'ajoutent tous les coûts, majorations et taxes associés. Il suit un schéma standardisé, étape par étape, utilisé dans le commerce de gros et de détail.

## Schéma de calcul {/*#calculation-scheme*/}

### Côté achat {/*#purchase-side*/}

| Opération | Poste                           | Remarque                                 |
| --------- | ------------------------------- | ---------------------------------------- |
|           | Prix d'achat catalogue          | Prix du catalogue du fournisseur         |
| −         | Remise du fournisseur           | Réduction en % sur le prix catalogue     |
| =         | Prix d'achat net                |                                          |
| −         | Escompte du fournisseur         | Réduction en % pour paiement anticipé    |
| =         | Prix d'achat comptant           |                                          |
| +         | Frais d'approvisionnement       | Transport, douane                        |
| =         | **Prix de revient**             | Coût réel des marchandises               |

### Côté vente {/*#sales-side*/}

| Opération | Poste                              | Remarque                                                              |
| --------- | ---------------------------------- | --------------------------------------------------------------------- |
|           | Prix de revient                    | Repris du tableau précédent                                           |
| +         | Majoration pour frais généraux     | Frais d'exploitation, loyer, personnel, etc.                          |
| =         | Seuil de rentabilité               |                                                                       |
| +         | Majoration pour bénéfice           | Marge bénéficiaire souhaitée                                          |
| =         | Prix de vente comptant             |                                                                       |
| +         | Escompte client                    | Réintégré : permet d'accorder au client un escompte pour paiement anticipé |
| =         | Prix de vente net                  |                                                                       |
| +         | Remise client                      | Réintégrée : permet d'accorder une remise au client                   |
| =         | Prix de vente catalogue HT         |                                                                       |
| +         | TVA                                | par ex. 19 % en Allemagne                                             |
| =         | **Prix de vente catalogue TTC**    | Prix final pour le client                                             |

## Remarques {/*#notes*/}

- L'escompte (Skonto) et la remise (Rabatt) sont **réintégrés** côté vente, car ils représentent des déductions potentielles que le client peut revendiquer, et le prix de vente doit les couvrir
- La majoration pour frais généraux est généralement exprimée en pourcentage du prix de revient, sur la base des frais d'exploitation réels de l'entreprise
- Le calcul peut être effectué en aval (du prix d'achat au prix de vente) ou en amont (d'un prix de vente cible pour en déduire le prix d'achat requis)
