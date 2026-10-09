---
title: "Modèles de service (IaaS, PaaS, SaaS)"
sidebar_position: 2
description: "On-Premise, Infrastructure-as-a-Service, Platform-as-a-Service, Function-as-a-Service et Software-as-a-Service expliqués"
keywords:
    - "IaaS"
    - "PaaS"
    - "SaaS"
    - "Modèles de service cloud"
    - "Infrastructure as a Service"
    - "Platform as a Service"
    - "Software as a Service"
    - "FaaS"
    - "Function as a Service"
    - "Serverless"
tags:
    - ap2
machine_translated: true
---

# Modèles de service cloud

## Vue d'ensemble {/*#overview*/}

Les services de cloud computing sont généralement classés en trois modèles de service principaux, qui offrent chacun un niveau différent de contrôle et de flexibilité.

| Modèle de service                                                           | Géré par le client                             | Géré par le fournisseur                                                               | Exemples                                             |
| --------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **[On-Premise](#on-premise)**                                               | Tout                                           | Rien                                                                                  | Centre de données propre, serveurs locaux            |
| **[IaaS](#infrastructure-as-a-service-iaas)** (Infrastructure as a Service) | OS, middleware, runtime, données, applications | Virtualisation, serveurs, stockage, réseau                                            | AWS EC2, Azure VMs, Google Compute Engine            |
| **[PaaS](#platform-as-a-service-paas)** (Platform as a Service)             | Données, applications                          | Runtime, middleware, OS, virtualisation, serveurs, stockage, réseau                   | Heroku, Google App Engine, Azure App Service, Vercel |
| **[FaaS](#function-as-a-service-faas--serverless)** (Function as a Service) | Fonctions individuelles, données               | Runtime, mise à l'échelle, middleware, OS, virtualisation, serveurs, stockage, réseau | AWS Lambda, Azure Functions, Cloudflare Workers      |
| **[SaaS](#software-as-a-service-saas)** (Software as a Service)             | Configuration uniquement                       | Tout                                                                                  | Gmail, Salesforce, Microsoft 365, Dropbox            |

---

## On-Premise {/*#on-premise*/}

### Définition {/*#definition*/}

On-premise (également appelé « on-prem ») désigne l'exploitation et la gestion de toute l'infrastructure informatique en local, dans les locaux propres de l'organisation. Aucun fournisseur cloud n'intervient. L'organisation possède, exploite et maintient tout, du matériel physique jusqu'aux applications.

### Contenu {/*#what-is-included*/}

- Serveurs et matériel physiques
- Contrôle complet de toutes les couches
- Les données restent dans les locaux de l'organisation
- Aucune dépendance vis-à-vis de fournisseurs externes

### Responsabilités {/*#responsibilities*/}

**L'organisation gère :**

- Le matériel physique (serveurs, stockage, réseau)
- La virtualisation
- Les systèmes d'exploitation
- Le middleware
- Les environnements d'exécution
- Les applications
- Les données
- La sécurité, les sauvegardes, la reprise après sinistre

### Cas d'usage {/*#use-cases*/}

- **Exigences strictes de conformité :** secteurs soumis à une réglementation stricte des données (p. ex. administration, santé, finance)
- **Systèmes hérités :** applications qui ne peuvent pas être migrées vers le cloud
- **Besoins de faible latence :** systèmes exigeant une latence réseau minimale
- **Souveraineté totale des données :** conservation des données sensibles entièrement en interne

### Avantages {/*#advantages*/}

- Contrôle total du matériel et des logiciels
- Les données ne quittent jamais les locaux de l'organisation
- Pas de coûts d'abonnement cloud récurrents
- Aucune dépendance à la connexion Internet
- Conformité plus simple avec des réglementations strictes sur les données

### Inconvénients {/*#disadvantages*/}

- Coûts d'investissement initiaux élevés (matériel, locaux, refroidissement)
- Personnel informatique dédié nécessaire à la maintenance
- La mise à l'échelle exige l'achat et l'installation de nouveau matériel
- Responsabilité complète pour toutes les mises à jour, tous les correctifs et la sécurité
- Le matériel peut devenir obsolète

---

## Infrastructure as a Service (IaaS) {/*#infrastructure-as-a-service-iaas*/}

### Définition {/*#definition-1*/}

L'IaaS fournit uniquement des ressources informatiques virtualisées via Internet. Elle offre les éléments de base nécessaires à la construction d'une infrastructure informatique cloud sur mesure.

### Contenu {/*#what-is-included-1*/}

- Machines virtuelles
- Stockage
- Réseaux
- Images de systèmes d'exploitation

### Responsabilités {/*#responsibilities-1*/}

**Le client gère :**

- Les systèmes d'exploitation
- Les applications
- Les données
- Les environnements d'exécution
- Le middleware

**Le fournisseur gère :**

- Les serveurs physiques
- Le matériel de stockage
- Les équipements réseau
- La couche de virtualisation

### Cas d'usage {/*#use-cases-1*/}

- **Test et développement :** création et suppression rapides d'environnements de test
- **Hébergement de sites web :** hébergement avec contrôle total de l'infrastructure
- **Stockage et sauvegarde :** solutions de stockage de données à grande échelle
- **Calcul haute performance :** charges de travail à forte intensité de calcul

### Avantages {/*#advantages-1*/}

- Contrôle complet de l'infrastructure
- Modèle de tarification à l'usage
- Hautement évolutif
- Aucune maintenance de matériel physique

### Inconvénients {/*#disadvantages-1*/}

- Expertise technique nécessaire
- Les correctifs de sécurité et les mises à jour relèvent uniquement de la responsabilité du client
- Charge de gestion plus importante que pour PaaS/SaaS

### Exemples {/*#examples*/}

- Amazon Web Services (AWS) EC2
- Microsoft Azure Virtual Machines
- Google Compute Engine
- Hetzner

---

## Platform as a Service (PaaS) {/*#platform-as-a-service-paas*/}

### Définition {/*#definition-2*/}

Le PaaS fournit une plateforme qui permet aux clients de développer, d'exécuter et de gérer des applications sans se préoccuper de l'infrastructure.

### Contenu {/*#what-is-included-2*/}

- **Environnements d'exécution prêts à l'emploi** (Node.js, Python, Java, PHP, ...)
- **Bases de données gérées** (PostgreSQL, MySQL, MongoDB, Redis)
- **Déploiement automatique** (push du code via Git => builds automatiques)
- **Mise à l'échelle intégrée** (l'application s'adapte automatiquement au trafic)
- **Outils de développement** (journalisation, surveillance, débogage)

### Responsabilités {/*#responsibilities-2*/}

**Le client gère :**

- Les applications
- Les données

**Le fournisseur gère :**

- L'environnement d'exécution
- Le middleware
- Les systèmes d'exploitation
- La virtualisation
- Les serveurs, le stockage, le réseau

### Cas d'usage {/*#use-cases-2*/}

- **Développement d'applications :** création d'applications sans souci d'infrastructure
- **Développement et gestion d'API :** création et hébergement d'API
- **Architecture de microservices :** déploiement d'applications conteneurisées

### Avantages {/*#advantages-2*/}

- Développement et déploiement plus rapides
- Évolutivité intégrée
- Complexité de gestion réduite
- Concentration sur le code, pas sur l'infrastructure
- Outils de développement intégrés

### Inconvénients {/*#disadvantages-2*/}

- Moins de contrôle qu'avec l'IaaS
- Risque de dépendance vis-à-vis du fournisseur (vendor lock-in)
- Tous les langages de programmation et frameworks ne sont pas forcément pris en charge
- Options de personnalisation limitées

### Exemples {/*#examples-1*/}

- Heroku
- Google App Engine
- Microsoft Azure App Service
- Red Hat OpenShift
- AWS Elastic Beanstalk
- Vercel, Netlify

---

## Function as a Service (FaaS) / Serverless {/*#function-as-a-service-faas--serverless*/}

### Définition {/*#definition-3*/}

Le FaaS est le prolongement logique du PaaS : l'unité déployée n'est plus une application, mais une fonction unique. Elle ne s'exécute pas en permanence : un événement la déclenche, elle traite l'événement et est ensuite arrêtée de nouveau.

« Serverless » est le terme plus large pour ce modèle d'exploitation et il est trompeur : des serveurs sont toujours impliqués, mais ils ne sont plus visibles ni gérables par le client. Outre le FaaS, il englobe des services gérés qui suivent le même principe, tels que les bases de données serverless, le stockage d'objets et les files de messages.

### Contenu {/*#what-is-included-3*/}

- **Exécution pilotée par les événements :** requête HTTP, minuteur, message dans une file, téléversement de fichier, modification de base de données
- **Mise à l'échelle automatique à partir de zéro :** aucune instance au repos, de nombreuses instances parallèles sous charge
- **Aucune planification de capacité :** ni nombre d'instances, ni taille de machine, ni règles d'autoscaling
- **Facturation par invocation :** temps d'exécution et mémoire, généralement à la milliseconde
- **Journalisation et surveillance intégrées** fournies par la plateforme

### Responsabilités {/*#responsibilities-3*/}

**Le client gère :**

- Le code de la fonction et ses dépendances
- La configuration : déclencheurs, autorisations, variables d'environnement, mémoire et délai d'expiration
- Les données et l'état externe

**Le fournisseur gère :**

- L'environnement d'exécution et ses mises à jour
- La mise à l'échelle, y compris le nombre d'instances parallèles
- Le middleware, le système d'exploitation, la virtualisation
- Les serveurs, le stockage, le réseau

### Propriétés {/*#properties*/}

| Propriété                      | Conséquence pour la conception                                                                                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sans état (stateless)          | Une fonction ne conserve aucun état entre deux invocations. L'état doit être placé dans une base de données, un cache ou un stockage d'objets                                    |
| Démarrage à froid (cold start) | La première invocation après une période d'inactivité nécessite du temps supplémentaire pour démarrer le runtime, ce qui est perceptible pour les requêtes sensibles à la latence |
| Limite d'exécution             | Une invocation est interrompue après une durée d'exécution maximale. Les tâches de longue durée doivent donc être découpées                                                      |
| Piloté par les événements      | La fonction ne s'exécute que lorsqu'un événement la déclenche et ne peut pas démarrer d'elle-même                                                                                |
| Mise à l'échelle depuis zéro   | Un pic de charge produit de nombreux démarrages à froid parallèles                                                                                                               |

### Cas d'usage {/*#use-cases-3*/}

- **API et webhooks :** points de terminaison avec une charge irrégulière ou imprévisible
- **Traitement d'événements :** réaction à un téléversement, à un message de file ou à une modification de base de données
- **Tâches planifiées :** nettoyage, rapports, imports sur minuterie
- **Code de liaison :** petites transformations entre deux services
- **Traitement d'images et de fichiers :** génération de miniatures après un téléversement

### Avantages {/*#advantages-3*/}

- Aucune administration de serveur et aucune planification de capacité
- Les coûts évoluent exactement avec la charge et le temps d'inactivité est gratuit
- Passage très rapide de l'idée à un point de terminaison déployé
- La mise à l'échelle est assurée par la plateforme

### Inconvénients {/*#disadvantages-3*/}

- Les démarrages à froid rendent la latence moins prévisible
- Durée d'exécution, mémoire et taille de package limitées par fonction
- Fort vendor lock-in, car les déclencheurs et les modèles d'autorisation sont propres à chaque fournisseur
- Le débogage et les tests locaux sont plus difficiles qu'avec une application exécutée en permanence
- De nombreuses petites fonctions dispersent la logique et rendent le comportement global plus difficile à suivre
- Sous charge élevée et constante, une instance exécutée en permanence est généralement moins coûteuse

### Exemples {/*#examples-2*/}

- AWS Lambda
- Azure Functions
- Google Cloud Functions / Cloud Run Functions
- Cloudflare Workers
- Vercel Functions, Netlify Functions

---

## Software as a Service (SaaS) {/*#software-as-a-service-saas*/}

### Définition {/*#definition-4*/}

Le SaaS fournit des applications pleinement fonctionnelles via Internet. Les utilisateurs accèdent au logiciel par un navigateur web, sans installation ni maintenance.

### Contenu {/*#what-is-included-4*/}

- Applications prêtes à l'emploi
- Mises à jour automatiques
- Accessible depuis tout appareil connecté à Internet
- Architecture multi-locataire (multi-tenant)

### Responsabilités {/*#responsibilities-4*/}

**Le client gère :**

- La configuration des utilisateurs
- La saisie des données
- Les autorisations d'accès

**Le fournisseur gère :**

- Tout le reste (application, données, runtime, middleware, OS, infrastructure)

### Cas d'usage {/*#use-cases-4*/}

- **E-mail et communication :** messagerie professionnelle, messagerie instantanée
- **Gestion de la relation client (CRM)**
- **Outils de collaboration :** partage de documents, gestion de projet
- **Bureautique :** traitement de texte, tableurs, présentations
- **Ressources humaines :** paie, recrutement, gestion des employés

### Avantages {/*#advantages-4*/}

- Aucune installation ni maintenance nécessaire
- Mises à jour automatiques
- Coûts initiaux plus faibles
- Facile à utiliser et à faire évoluer

### Inconvénients {/*#disadvantages-4*/}

- Aucun contrôle sur l'infrastructure et dépendance totale vis-à-vis de l'entreprise exploitante
- Personnalisation limitée
- Préoccupations de sécurité des données (données stockées en externe dans le cloud)
- Les coûts d'abonnement peuvent s'accumuler
- Dépendance à la connexion Internet

### Exemples {/*#examples-3*/}

- **Google Workspace** (Gmail, Google Docs, Drive)
- **Microsoft 365** (Outlook, Word, Excel, Teams)
- **ADITO** (CRM)
- **Slack** (communication d'équipe)
- **Dropbox** (stockage de fichiers)
- **Zoom** (visioconférence)

---

## L'analogie de la pizza {/*#the-pizza-analogy*/}

- **On-Premise :** préparer la pizza à la maison
- **IaaS :** acheter de la pâte à pizza et des garnitures et cuire à la maison
- **PaaS :** commander une pizza avec des garnitures choisies, livrée à domicile
- **FaaS :** acheter une seule part quand la faim se fait sentir et payer à la part (rien n'est gardé au chaud)
- **SaaS :** manger dans une pizzeria

---

## Modèles de service supplémentaires {/*#additional-service-models*/}

Outre les trois modèles principaux et le [FaaS](#function-as-a-service-faas--serverless), il existe d'autres modèles de service spécialisés :

### Database as a Service (DBaaS) {/*#database-as-a-service-dbaas*/}

- Solutions de bases de données gérées
- Exemples : Amazon RDS, Azure SQL Database, MongoDB Atlas

### Container as a Service (CaaS) {/*#container-as-a-service-caas*/}

- Plateformes d'orchestration de conteneurs
- Exemples : Amazon ECS, Google Kubernetes Engine, Azure Kubernetes Service

### Desktop as a Service (DaaS) {/*#desktop-as-a-service-daas*/}

- Bureaux virtuels fournis via le cloud
- Exemples : Amazon WorkSpaces, Azure Virtual Desktop, Citrix DaaS

### Backend as a Service (BaaS) {/*#backend-as-a-service-baas*/}

- Backend géré par le fournisseur, frontend par le client
- Exemples : Supabase, Firebase
