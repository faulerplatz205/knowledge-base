---
title: "Bases de la notation UML"
description: "Notation UML transversale : marqueurs de visibilité, multiplicités et leur lecture, mots-clés, stéréotypes, notes, valeurs étiquetées, contraintes, noms de rôles, conventions de nommage et cadres de diagrammes."
keywords:
    - UML
    - Notation
    - Visibilité
    - Multiplicité
    - Mot-clé
    - Stéréotype
    - Valeur étiquetée
    - Contrainte
    - Nom de rôle
    - Cadre de diagramme
tags:
    - ap2
machine_translated: true
---

# Bases de la notation UML

## Vue d'ensemble {/*#overview*/}

Une poignée d'éléments de notation apparaît dans presque tous les diagrammes UML, quel que soit leur type. Les marqueurs de visibilité, les multiplicités, les mots-clés et stéréotypes, les notes, les contraintes et les cadres de diagrammes ont la même signification dans un [diagramme de classes](./class-diagram.md), un [diagramme de composants](./component-diagram.md) et un [diagramme d'états-transitions](./state-machine-diagram.md).

---

## Visibilité {/*#visibility*/}

La visibilité indique qui peut accéder à une propriété (attribut, opération, ou membre d'un paquetage ou d'un composant). Elle s'écrit sous la forme d'un seul caractère placé directement devant le nom de la propriété.

| Marqueur | Nom        | Accès accordé à                                          | Usage typique                          |
| -------- | ---------- | -------------------------------------------------------- | -------------------------------------- |
| `+`      | publique   | Tout élément qui peut voir le classificateur             | Interface d'une classe                 |
| `-`      | privée     | Uniquement le classificateur lui-même                    | État interne, opérations auxiliaires   |
| `#`      | protégée   | Le classificateur et ses spécialisations (sous-classes)  | Points d'extension pour les sous-classes |
| `~`      | paquetage  | Tout élément du même paquetage                           | Collaboration au sein d'un module      |

Deux autres marqueurs sont souvent confondus avec la visibilité mais expriment autre chose :

- `/` devant un nom marque une propriété **dérivée**, dont la valeur est calculée à partir d'autres propriétés (`/ age` à partir de `dateOfBirth`).
- Un nom souligné marque une propriété **statique**, qui appartient au classificateur plutôt qu'à un objet individuel.

La classe suivante utilise tous ces marqueurs. Le texte brut ne permet pas de souligner, l'attribut statique `MAX_LIMIT` est donc marqué par `(static)` à la place :

```text
┌──────────────────────────────────────┐
│               Account                │
├──────────────────────────────────────┤
│ + accountNumber: String              │
│ - balance: Decimal                   │
│ # owner: Customer                    │
│ ~ auditLog: LogEntry [0..*]          │
│ / available: Decimal                 │
│ + MAX_LIMIT: Decimal = 5000 (static) │
├──────────────────────────────────────┤
│ + deposit(amount: Decimal)           │
│ + withdraw(amount: Decimal): Bool    │
│ - validate(amount: Decimal): Bool    │
└──────────────────────────────────────┘
```

La visibilité est facultative en UML. Un marqueur absent signifie *non spécifiée*, et non *publique*, même si de nombreux outils adoptent public par défaut.

---

## Multiplicités {/*#multiplicities*/}

Une multiplicité indique combien d'objets peuvent participer à une extrémité d'une association, ou combien de valeurs un attribut peut contenir. Elle s'écrit à côté de l'extrémité de l'association ou entre crochets après le type de l'attribut.

| Notation | Plage                    | Lecture                                                |
| -------- | ------------------------ | ------------------------------------------------------ |
| `1`      | exactement 1             | Obligatoire, exactement un objet                       |
| `0..1`   | 0 ou 1                   | Facultatif, au plus un objet                           |
| `*`      | 0 à illimité             | Forme abrégée de `0..*`, pas de borne inférieure implicite de 1 |
| `0..*`   | 0 à illimité             | Facultatif, un nombre quelconque                       |
| `1..*`   | 1 à illimité             | Obligatoire, au moins un                               |
| `n..m`   | n à m                    | Plage explicite, par exemple `2..4`                   |
| `5`      | exactement 5             | Nombre fixe                                            |
| `1..3,7` | 1 à 3, ou exactement 7   | Plusieurs plages                                       |

Règles de lecture et d'écriture des multiplicités :

- La multiplicité est placée à côté de la classe qu'elle décrit et indique combien d'objets de cette classe sont reliés à un objet de l'autre extrémité.
- La borne inférieure décide si la relation est facultative (`0`) ou obligatoire (`1` ou plus).
- La borne supérieure décide si l'implémentation contient une référence unique (`1`) ou une collection (`*`).
- Une multiplicité omise est formellement indéfinie, la plupart des outils et manuels la lisent comme `1`.

### Lecture d'une association {/*#reading-an-association*/}

```text
┌──────────────┐ 1          0..* ┌──────────────┐
│   Customer   ├─────────────────┤    Order     │
└──────────────┘   places   ▶    └──────────────┘
```

La phrase se construit à partir de la classe d'une extrémité, du nom de l'association et de la multiplicité de l'autre extrémité, puis se répète dans le sens opposé :

- Un `Customer` passe **zéro ou plusieurs** objets `Order`.
- Un `Order` est passé par **exactement un** `Customer`.

Le petit triangle plein `▶` après le nom de l'association est le marqueur de **sens de lecture**. Il indique dans quel sens le nom forme une phrase et ne porte aucune autre sémantique. Le triangle est facultatif, sans lui le nom se lit de gauche à droite ou de haut en bas.

---

## Mots-clés et stéréotypes {/*#keywords-and-stereotypes*/}

Une étiquette entre guillemets français (`«…»`) ajoute du sens à un élément de modèle existant sans inventer une nouvelle forme pour lui. Elle s'écrit au-dessus ou devant le nom de l'élément.

```text
┌──────────────────────┐
│     «interface»      │
│      Printable       │
├──────────────────────┤
│ + print(): void      │
└──────────────────────┘
```

Lorsque les guillemets français ne sont pas disponibles, les doubles chevrons `<<interface>>` sont acceptés comme substitut, ce qui explique que les deux graphies apparaissent en pratique.

Deux types d'étiquettes s'écrivent ainsi :

- Un **mot-clé** est prédéfini par UML lui-même. Il nomme une métaclasse ou une variante fixe de celle-ci, il est réservé et peut s'utiliser sans rien déclarer au préalable.
- Un **stéréotype** est défini par le modélisateur ou un outil et adapte un élément à un domaine, une technologie ou une norme d'entreprise. Il n'a de sens que là où il est défini.

Mots-clés prédéfinis par UML :

| Mot-clé                    | S'applique à              | Signification                                       |
| -------------------------- | ------------------------- | --------------------------------------------------- |
| `<<interface>>`            | Classe                    | Déclare des opérations sans implémentation          |
| `<<enumeration>>`          | Classe                    | Un type avec un ensemble fixe de littéraux          |
| `<<include>>`              | Relation de cas d'utilisation | Un cas d'utilisation en utilise toujours un autre |
| `<<extend>>`               | Relation de cas d'utilisation | Un cas d'utilisation étend facultativement un autre |
| `<<use>>`                  | Dépendance                | Le client exige le fournisseur                      |
| `<<create>>`               | Message                   | Le message crée l'objet destinataire                |
| `<<destroy>>`              | Message                   | Le message détruit l'objet destinataire             |
| `<<device>>`               | Nœud                      | Un matériel physique                                |
| `<<executionEnvironment>>` | Nœud                      | Environnement d'exécution sur un dispositif         |
| `<<artifact>>`             | Artefact                  | Un fichier déployable                               |

Les stéréotypes viennent s'ajouter à ces mots-clés et sont tout aussi légitimes, tant qu'ils sont définis quelque part ; pour un petit projet, une courte légende listant les stéréotypes employés suffit. Des exemples classiques issus de la modélisation d'analyse sont `<<entity>>` pour un objet métier persistant, `<<boundary>>` pour un élément à la frontière du système et `<<control>>` pour un élément de coordination.

---

## Notes et commentaires {/*#notes-and-comments*/}

Une note est un rectangle à coin corné, rattaché par une ligne pointillée à l'élément qu'elle commente. Elle ne porte aucune sémantique, c'est du texte libre pour le lecteur.

```text
┌──────────────┐         ┌───────────────────────────┐
│   Invoice    │- - - - -│ Net amounts only, VAT is  └─┐
└──────────────┘         │ added by the tax service.   │
                         └─────────────────────────────┘
```

Conseils d'utilisation des notes :

- Une note explique *pourquoi*, pas *quoi*, répéter le nom de l'élément en prose n'apporte rien.
- Une note peut être rattachée à plusieurs éléments par plusieurs lignes pointillées.
- Les hypothèses, les questions ouvertes et les décisions avec leur justification en sont le contenu typique.
- Un modèle qui ne devient compréhensible que grâce à ses notes présente généralement un problème structurel.

---

## Valeurs étiquetées {/*#tagged-values*/}

Une valeur étiquetée rattache une propriété nommée à un élément de modèle, écrite sous la forme `name = value` entre accolades. Les valeurs étiquetées sont normalement introduites par un stéréotype, qui définit quelles étiquettes existent et ce qu'elles signifient.

```text
┌───────────────────────────────────┐
│             «entity»              │
│             Customer              │
│ {table = "CUST", schema = "crm"}  │
└───────────────────────────────────┘
```

Applications typiques :

- Informations de correspondance technique, par exemple un nom de table ou de colonne pour la persistance
- Métadonnées de processus telles que `{author = "Team A", version = "1.2", status = "reviewed"}`
- Exigences non fonctionnelles telles que `{maxResponseTime = "200ms"}`
- Indications de génération de code consommées par une chaîne d'outils pilotée par les modèles

Plusieurs valeurs étiquetées sont séparées par des virgules à l'intérieur d'une seule paire d'accolades, ou écrites sur des lignes distinctes dans une note rattachée à l'élément.

---

## Contraintes {/*#constraints*/}

Une contrainte est une condition qui doit être vérifiée pour que le modèle soit valide. Elle s'écrit entre accolades, soit directement sur l'élément, soit dans une note rattachée.

| Contrainte             | S'applique à             | Signification                                                   |
| ---------------------- | ------------------------ | --------------------------------------------------------------- |
| `{readOnly}`           | Attribut, extrémité      | La valeur est fixée une fois et n'est plus modifiée ensuite     |
| `{abstract}`           | Classe, opération        | Pas d'implémentation, alternative à l'italique                  |
| `{xor}`                | Deux associations        | Une seule des deux associations peut être instanciée            |
| `{complete, disjoint}` | Ensemble de généralisations | Chaque objet appartient à exactement une sous-classe         |

Une contrainte en texte libre est tout aussi valide et bien plus courante en pratique :

```text
┌──────────────┐         ┌─────────────────────────────┐
│   Account    │- - - - -│ {balance >= overdraftLimit} └─┐
└──────────────┘         └───────────────────────────────┘
```

### OCL {/*#ocl*/}

Pour les conditions qui doivent être énoncées formellement, l'OMG définit l'**Object Constraint Language** (OCL), un langage textuel distinct utilisé conjointement avec UML. La condition de la note ci-dessus, écrite en OCL :

```text
context Account
  inv: balance >= overdraftLimit
```

`context` nomme la classe à laquelle la condition s'applique, `inv` marque un invariant, une condition qui doit être vérifiée à tout moment. En pratique, une condition informelle entre accolades suffit généralement, l'essentiel est qu'elle soit rattachée au bon élément.

---

## Noms de rôles et navigabilité {/*#role-names-and-navigability*/}

Une extrémité d'association peut porter un **nom de rôle**, indiquant le rôle que joue la classe dans cette relation. Le nom de rôle s'écrit à l'extrémité qu'il décrit, en minuscules, et devient le nom de l'attribut dans l'implémentation.

```text
┌──────────────┐ employer        employee ┌──────────────┐
│   Company    ├──────────────────────────┤    Person    │
└──────────────┘ 1                    0..*└──────────────┘
```

Lecture : un `Person` a exactement un `Company` dans le rôle `employer`, un `Company` a zéro ou plusieurs objets `Person` dans le rôle `employee`. L'implémentation comporterait un champ `employer` dans `Person` et une collection `employee` dans `Company`.

Les noms de rôles deviennent indispensables lorsque deux classes sont reliées plus d'une fois, ou lorsqu'une classe est associée à elle-même :

```text
┌────────────────────┐
│      Employee      │
└──┬──────────────┬──┘
   │ 0..1         │ 0..*
   │ supervisor   │ subordinate
   └──────────────┘
```

Lecture : un `Employee` a au plus un autre `Employee` dans le rôle `supervisor` et zéro ou plusieurs dans le rôle `subordinate`.

Éléments qui donnent une direction à une association :

- **Sens de lecture (`▶`) :** à côté du nom de l'association, simple aide à la lecture
- **Navigabilité (pointe de flèche ouverte) :** à une extrémité, cette extrémité est accessible depuis l'autre
- **Non-navigabilité (petite croix `x`) :** à une extrémité, cette extrémité n'est explicitement pas accessible
- **Pas de pointes de flèche :** navigabilité non spécifiée, lue en pratique comme *navigable dans les deux sens*

---

## Conventions de nommage {/*#naming-conventions*/}

Les conventions ci-dessous ne font pas partie de la spécification UML mais sont quasi universelles en pratique.

| Élément            | Convention                                   | Exemple                       |
| ------------------ | -------------------------------------------- | ----------------------------- |
| Classe             | PascalCase, nom au singulier                 | `Invoice`, `CustomerAccount`  |
| Interface          | PascalCase, souvent un adjectif              | `Printable`, `Comparable`     |
| Attribut           | camelCase, nom                               | `orderDate`, `totalAmount`    |
| Opération          | camelCase, verbe + objet                     | `calculateTotal()`            |
| Nom de rôle        | camelCase, nom désignant le rôle             | `employer`, `lineItems`       |
| Nom d'association  | Verbe à la troisième personne du singulier   | `places`, `contains`          |
| Paquetage          | Minuscules, singulier                        | `billing`, `reporting`        |
| Cas d'utilisation  | Verbe + objet à l'infinitif                  | `Place order`                 |
| Acteur             | Nom de rôle, jamais le nom d'une personne    | `Customer`, `Payment Service` |
| Action             | Verbe + objet à l'infinitif                  | `Validate order`              |
| État               | Adjectif ou participe                        | `Paid`, `Awaiting approval`   |
| Composant          | Nom décrivant le service                     | `OrderService`                |
| Nœud               | Nom décrivant le dispositif ou l'hôte        | `Application Server`          |

Deux règles s'appliquent à tous :

- Un nom pour un concept dans tout le modèle, une classe nommée `Customer` dans un diagramme n'est pas `Client` dans le suivant.
- La langue du modèle est choisie une fois pour tout le modèle et n'est pas mélangée.

---

## Cadres de diagrammes {/*#diagram-frames*/}

Chaque diagramme UML peut être dessiné dans un cadre : un rectangle dont le coin supérieur gauche porte une étiquette pentagonale indiquant le type et le nom du diagramme.

```text
┌─────────────────────────────────────────────┐
│ sd Place Order ╱                            │
├───────────────┘                             │
│                                             │
│          (contents of the diagram)          │
│                                             │
└─────────────────────────────────────────────┘
```

L'en-tête du cadre suit le schéma `<kind> <name>`, éventuellement avec des paramètres. Mots-clés de type courants, sous forme courte et sous forme longue que les outils acceptent aussi :

| Court | Long            | Diagramme                            |
| ----- | --------------- | ------------------------------------ |
| `sd`  | `interaction`   | Séquence, communication, temps       |
| `act` | `activity`      | Activité                             |
| `stm` | `state machine` | États-transitions                    |
| `cmp` | `component`     | Composants                           |
| `dep` | `deployment`    | Déploiement                          |
| `cls` | `class`         | Classes                              |
| `uc`  | `use case`      | Cas d'utilisation                    |
| `pkg` | `package`       | Paquetages                           |

Cas où le cadre est requis plutôt que facultatif :

- Dans un [diagramme de séquence](./sequence-diagram.md), où le cadre est standard et où les fragments combinés imbriqués (`alt`, `opt`, `loop`, `ref`) sont dessinés comme des cadres à part entière
- Chaque fois qu'un diagramme est référencé depuis un autre, puisque la référence utilise le nom du cadre
- Chaque fois que plusieurs diagrammes figurent sur une même page ou dans un même document et doivent être distingués

Pour un diagramme isolé sur sa propre page, le cadre est généralement omis et remplacé par un titre.

---

## Correspondance avec le code {/*#mapping-to-code*/}

| Notation                    | Construction dans le programme                    |
| --------------------------- | ------------------------------------------------- |
| `+`                    | `public`                                          |
| `-`                    | `private`                                          |
| `#`                    | `protected`                                          |
| `~`                    | Package-private en Java, `internal` en C#           |
| Nom souligné                | `static`                                          |
| `/` devant un nom      | Getter calculant la valeur, pas de champ stocké   |
| `1`                    | Champ qui ne doit pas être `null`               |
| `0..1`                    | Champ nullable, `Optional<T>`, `T?`                |
| `{readOnly}`                    | `final`, `readonly`, `const`                      |
| `<<interface>>`                    | `interface`                                          |
| `<<enumeration>>`                    | `enum`                                          |
| `{abstract}`                    | `abstract class`                                          |
| Nom de rôle                 | Nom du champ contenant la référence               |
| `inv` en OCL             | Vérification dans le constructeur et dans chaque setter |

---

## Erreurs courantes {/*#common-mistakes*/}

1. **Prendre `-` pour un tiret :** un `-` initial est le marqueur de visibilité *privée*, pas une décoration, un attribut privé n'est pas accessible depuis une autre classe.
2. **Lire `*` comme « plusieurs, mais au moins un » :** `*` signifie `0..*`, si au moins un objet est requis la notation est `1..*`.
3. **Multiplicité à la mauvaise extrémité :** la multiplicité à côté d'une classe indique combien d'objets de *cette* classe participent, vus depuis l'extrémité opposée.
4. **Accolades et guillemets intervertis :** `{...}` contient une contrainte ou une valeur étiquetée, `«...»` un mot-clé ou un stéréotype, les deux ne sont pas interchangeables.
5. **Stéréotypes sans définition :** un stéréotype inventé et expliqué nulle part est de la décoration, pas de l'information.
6. **Nom de rôle identique au nom de la classe :** un rôle `customer` sur un `Customer` n'apporte rien, un nom de rôle ne vaut la peine d'être écrit que s'il en dit plus que le type.
7. **Notes portant de la sémantique de modèle :** une condition que le système doit faire respecter relève d'une contrainte, pas d'une note en prose.
8. **Sens de lecture confondu avec la navigabilité :** le triangle plein `▶` concerne la phrase, la pointe de flèche ouverte concerne l'accès.
9. **Langues mélangées et noms incohérents :** le même concept sous deux noms produit deux concepts dans l'esprit du lecteur.
10. **Omettre partout la visibilité et tout implémenter en public :** une visibilité non spécifiée est une lacune du modèle, pas une décision.

---

## Outils {/*#tools*/}

- draw.io / diagrams.net (gratuit, dans le navigateur, bibliothèque de formes UML incluse)
- PlantUML (textuel, prend en charge directement dans la source les stéréotypes, valeurs étiquetées et cadres)
- Mermaid (textuel, s'affiche dans Markdown, prend en charge un sous-ensemble de la notation)
- Visual Paradigm, StarUML, Enterprise Architect (commerciaux, avec prise en charge d'OCL)

## Voir aussi {/*#see-also*/}

- [Vue d'ensemble d'UML](./uml-overview.mdx) : les types de diagrammes UML et leurs relations
- [Diagramme de classes](./class-diagram.md) : là où la visibilité, la multiplicité et les noms de rôles sont le plus intensivement utilisés
- [Diagramme d'activité](./activity-diagram.md) : notes et cadres dans un diagramme comportemental
- [Diagramme de cas d'utilisation](./use-case-diagram.md) : les mots-clés `<<include>>` et `<<extend>>` en contexte
- [Diagramme de séquence](./sequence-diagram.md) : cadres sous forme de fragments combinés
- [Diagramme d'états-transitions](./state-machine-diagram.md) : gardes et contraintes sur les transitions
- [Diagramme de composants](./component-diagram.md) : mots-clés sur les composants et les interfaces
- [Diagramme de déploiement](./deployment-diagram.md) : les mots-clés de nœuds `<<device>>` et `<<executionEnvironment>>`
- [Autres diagrammes UML](./further-uml-diagrams.md) : les autres types de diagrammes et leurs mots-clés de cadre
- [Modèle ER](../databases/er-model.md) : cardinalités en modélisation de données comparées aux multiplicités UML
