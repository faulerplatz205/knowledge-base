---
title: "Active Directory"
description: "Concepts fondamentaux d'Active Directory et du contrôleur de domaine : structure logique, approbations, nommage LDAP, profils itinérants et stratégies de groupe."
keywords:
    - "Active Directory"
    - "Contrôleur de domaine"
    - "Unité d'organisation"
    - "Forêt"
    - "LDAP"
    - "Nom unique"
    - "Stratégie de groupe"
    - "GPO"
machine_translated: true
---

# Active Directory

**Active Directory (AD)** est un service d'annuaire qui assure la gestion centralisée des identités et des accès dans un environnement Windows. Au lieu de configurer chaque machine individuellement, les utilisateurs, ordinateurs et ressources sont gérés de manière centralisée. Un **contrôleur de domaine (DC)** est un Windows Server qui héberge les services de domaine Active Directory (AD DS).

Un contrôleur de domaine requiert un nom unique (par ex. `dc1`), une adresse IP statique et un serveur DNS opérationnel ; le rôle « Services de domaine Active Directory » est installé, puis le serveur est promu.

## Structure logique {/*#logical-structure*/}

Active Directory sépare la structure logique de la structure physique (sites, sous-réseaux, DC). Les éléments logiques sont :

- **Objet** – La plus petite unité gérable ; chaque ressource réseau (utilisateur, ordinateur, imprimante …) est représentée par un objet.
- **Unité d'organisation (OU)** – Un conteneur qui regroupe des objets (utilisateurs, ordinateurs, groupes) pour modéliser la structure de l'entreprise. Les OU servent aussi à lier des stratégies de groupe.
- **Domaine** – L'unité centrale qui contient l'Active Directory. Les stratégies de sécurité s'appliquent au sein d'un domaine, qui doit comporter au moins un DC.
- **Arborescence** – Plusieurs domaines organisés hiérarchiquement, partageant un espace de noms contigu (par ex. `de.abc.com` sous `abc.com`).
- **Forêt** – Une ou plusieurs arborescences, généralement avec des espaces de noms différents. Les domaines fonctionnent indépendamment mais peuvent communiquer à travers la forêt.

## Catalogue global {/*#global-catalog*/}

Le **catalogue global** est une base de données qui permet de rechercher des objets dans toute la forêt, y compris des objets d'autres espaces de noms. Chaque site AD devrait héberger au moins un DC disposant d'une copie du catalogue global.

## Approbations {/*#trusts*/}

Une **approbation** (trust) décrit la relation entre deux domaines : le domaine qui approuve accepte l'authentification du domaine approuvé.

- **Unidirectionnelle** – approbation dans un sens / **Bidirectionnelle** – approbation dans les deux sens
- **Transitive** – l'approbation s'étend à d'autres approbations / **Non transitive** – uniquement pour l'approbation configurée explicitement

Par défaut, l'approbation est **bidirectionnelle et transitive**.

## LDAP et nommage {/*#ldap-and-naming*/}

**LDAP** (Lightweight Directory Access Protocol) sert à accéder au service d'annuaire.

- **Nom unique (Distinguished Name, DN)** – Le « chemin LDAP » unique d'un objet, utilisant `CN` (Common Name), `OU` (Organizational Unit) et `DC` (Domain Component), par ex. `CN=HPjet5, OU=Assistenz, DC=Firma, DC=DE`.
- **Nom canonique** – La même information au format de nom de domaine DNS, par ex. `HPjet5.Assistenz.firma.de`.

## Profils itinérants {/*#roaming-profiles*/}

Un **profil itinérant** est stocké de manière centralisée sur un serveur, de sorte qu'un utilisateur retrouve le même environnement sur n'importe quel ordinateur du domaine. Le profil est copié sur la machine à l'ouverture de session et resynchronisé à la fermeture de session.

- **Avantage** – Même environnement sur chaque ordinateur.
- **Inconvénient** – Nécessite beaucoup d'espace de stockage ; l'ouverture et la fermeture de session peuvent être lentes.

Les partages **SYSVOL** et **NETLOGON** sont créés lorsqu'un serveur est promu DC. Ils stockent les stratégies de groupe et les scripts d'ouverture de session que les clients récupèrent.

## Niveaux fonctionnels {/*#functional-levels*/}

Lors de la promotion d'un DC, un **niveau fonctionnel de la forêt** et un **niveau fonctionnel du domaine** sont choisis. Ils définissent les fonctionnalités AD disponibles et garantissent que des DC exécutant des versions différentes de Windows Server peuvent interagir (rétrocompatibilité). Les niveaux supérieurs offrent davantage de fonctionnalités mais ne peuvent pas être annulés. Un domaine peut fonctionner à un niveau supérieur à celui de la forêt, mais pas inférieur.

## Stratégies de groupe (GPO) {/*#group-policies-gpo*/}

Les **stratégies de groupe** sont des instructions de configuration servant à imposer des paramètres (par ex. stratégies de mot de passe, paramètres d'alimentation, restrictions d'accès). Elles sont stockées dans Active Directory et disponibles à l'échelle du domaine par réplication. Un **objet de stratégie de groupe (Group Policy Object, GPO)** stocke les paramètres individuels et est **lié** à l'objet qu'il doit affecter. Les GPO contiennent des paramètres distincts pour les utilisateurs et les ordinateurs, et ils s'appliquent aux comptes d'utilisateurs et d'ordinateurs contenus dans une OU, et non aux groupes.

### Ordre de traitement {/*#processing-order*/}

Les stratégies de groupe peuvent être liées à un site, à un domaine ou à une OU ; chaque ordinateur dispose en outre d'une stratégie locale. L'ordre de traitement est **L-S-D-OU** :

1. **Local**
2. **Site**
3. **Domaine**
4. **OU**

Chaque étape ultérieure remplace les paramètres en conflit de l'étape précédente. La stratégie locale a donc la priorité la plus faible et la stratégie d'OU la plus élevée. Si plusieurs GPO sont liés au même niveau, l'ordre des liens est déterminant (la valeur de lien la plus basse l'emporte, car elle est traitée en dernier).

### Actualisation {/*#refresh*/}

Les paramètres de stratégie de groupe sont actualisés en arrière-plan environ toutes les **90 minutes** sur les clients et toutes les **5 minutes** sur les contrôleurs de domaine. Une actualisation peut être forcée avec `gpupdate /force`. La redirection de dossiers fait exception : elle n'est appliquée qu'à l'ouverture de session de l'utilisateur.
