---
title: "Codes de statut HTTP"
description: "Aperçu des codes de statut HTTP les plus courants, regroupés par catégorie."
keywords:
    - HTTP
    - codes de statut
    - codes de réponse
    - statut HTTP
tags:
    - ap2
machine_translated: true
---

# Codes de statut HTTP

## Aperçu {/*#overview*/}

Les codes de statut HTTP sont des nombres à trois chiffres renvoyés par un serveur en réponse à une requête client. Ils indiquent si la requête a réussi, a été redirigée ou a abouti à une erreur. Les codes de statut sont répartis en cinq classes selon leur premier chiffre.

## 1xx - Informatif {/*#1xx---informational*/}

La requête a été reçue et le serveur poursuit son traitement.

| Code | Nom                 | Description                                                                                         |
| ---- | ------------------- | --------------------------------------------------------------------------------------------------- |
| 100  | Continue            | Le serveur a reçu les en-têtes de la requête et le client doit poursuivre en envoyant le corps.     |
| 101  | Switching Protocols | Le serveur passe au protocole demandé par le client (p. ex. passage à WebSocket).                   |

### Exemples {/*#examples*/}

- **100 Continue** : un client envoie un fichier volumineux avec l'en-tête `Expect: 100-continue`. Le serveur répond par `100` pour signaler que le client doit poursuivre l'envoi du corps.
- **101 Switching Protocols** : un client envoie une requête HTTP avec `Upgrade: websocket`. Le serveur répond par `101` et bascule vers le protocole WebSocket.

## 2xx - Succès {/*#2xx---success*/}

La requête a été reçue, comprise et acceptée avec succès.

| Code | Nom        | Description                                                                                        |
| ---- | ---------- | -------------------------------------------------------------------------------------------------- |
| 200  | OK         | La requête a réussi. Le corps de la réponse contient les données demandées.                        |
| 201  | Created    | Une nouvelle ressource a été créée avec succès (généralement après un `POST`).                    |
| 204  | No Content | La requête a réussi mais il n'y a aucun contenu à renvoyer (généralement après un `DELETE`).        |

### Exemples {/*#examples-1*/}

- **200 OK** : `GET /api/users/42` => le serveur renvoie l'objet utilisateur en JSON.
- **201 Created** : `POST /api/users` avec un corps de requête => le serveur crée l'utilisateur et renvoie la nouvelle ressource avec un en-tête `Location`.
- **204 No Content** : `DELETE /api/users/42` => le serveur supprime l'utilisateur et renvoie une réponse vide.

## 3xx - Redirection {/*#3xx---redirection*/}

Le client doit entreprendre une action supplémentaire pour terminer la requête.

| Code | Nom                | Description                                                                   |
| ---- | ------------------ | ----------------------------------------------------------------------------- |
| 301  | Moved Permanently  | La ressource a été déplacée définitivement vers une nouvelle URL.             |
| 302  | Found              | La ressource se trouve temporairement à une autre URL.                        |
| 304  | Not Modified       | La ressource n'a pas changé depuis la dernière requête (utilisé pour le cache). |
| 307  | Temporary Redirect | Comme 302, mais la méthode de la requête ne doit pas changer lors de la redirection. |
| 308  | Permanent Redirect | Comme 301, mais la méthode de la requête ne doit pas changer lors de la redirection. |

### Exemples {/*#examples-2*/}

- **301 Moved Permanently** : `GET /old-page` => le serveur répond par `301` et `Location: /new-page`. Les moteurs de recherche mettent à jour leur index en conséquence.
- **302 Found** : `GET /promo` => le serveur redirige temporairement vers `/current-sale`. L'URL d'origine reste valide pour les requêtes futures.
- **304 Not Modified** : le client envoie `GET /style.css` avec un en-tête `If-None-Match` contenant un ETag mis en cache. Le serveur confirme que la ressource n'a pas changé et renvoie `304` sans corps.
- **307 Temporary Redirect** : `POST /api/submit` => le serveur redirige temporairement vers `/api/v2/submit`. Le client doit renvoyer la requête `POST` (sans la transformer en `GET`).
- **308 Permanent Redirect** : `POST /api/old-endpoint` => le serveur redirige définitivement vers `/api/new-endpoint`. Le client doit renvoyer la requête `POST` vers la nouvelle URL.

## 4xx - Erreur client {/*#4xx---client-error*/}

La requête contient une erreur côté client.

| Code | Nom                    | Description                                                                                                           |
| ---- | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request            | Le serveur ne peut pas traiter la requête en raison d'une syntaxe incorrecte ou d'une saisie invalide.                |
| 401  | Unauthorized           | Une authentification est requise et n'a pas été fournie ou est invalide.                                              |
| 403  | Forbidden              | Le serveur a compris la requête mais refuse de l'autoriser.                                                           |
| 404  | Not Found              | La ressource demandée n'existe pas sur le serveur.                                                                    |
| 405  | Method Not Allowed     | La méthode HTTP utilisée n'est pas prise en charge pour la ressource demandée.                                        |
| 408  | Request Timeout        | Le serveur a dépassé le délai d'attente de la fin de l'envoi de la requête par le client.                             |
| 409  | Conflict               | La requête est en conflit avec l'état actuel de la ressource (p. ex. entrée en double).                               |
| 413  | Content Too Large      | Le corps de la requête dépasse la limite de taille du serveur.                                                        |
| 415  | Unsupported Media Type | Le serveur ne prend pas en charge le type de média du corps de la requête.                                            |
| 418  | I'm a Teapot           | Le serveur refuse de préparer du café, car il est une théière ([RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324)). |
| 422  | Unprocessable Content  | La requête est syntaxiquement correcte mais sémantiquement invalide (p. ex. erreurs de validation).                   |
| 429  | Too Many Requests      | Le client a envoyé trop de requêtes sur une période donnée (limitation de débit).                                     |

### Exemples {/*#examples-3*/}

- **400 Bad Request** : `POST /api/users` avec `{ name: }` => le corps JSON est mal formé et ne peut pas être analysé.
- **401 Unauthorized** : `GET /api/profile` sans en-tête `Authorization` => le serveur exige une authentification.
- **403 Forbidden** : `DELETE /api/users/1` avec un jeton valide pour un utilisateur non administrateur => l'utilisateur est authentifié mais n'a pas l'autorisation.
- **404 Not Found** : `GET /api/users/99999` => aucun utilisateur avec cet ID n'existe.
- **405 Method Not Allowed** : `DELETE /api/login` => le point d'accès `/api/login` ne prend en charge que `POST`.
- **408 Request Timeout** : un client ouvre une connexion et commence à envoyer un corps de requête volumineux, mais reste bloqué en cours de transfert. Le serveur ferme la connexion après son délai d'attente.
- **409 Conflict** : `POST /api/users` avec `{ "email": "a@b.com" }` => un utilisateur avec cet e-mail existe déjà.
- **413 Content Too Large** : `POST /api/upload` avec un fichier de 500 Mo => la limite d'envoi du serveur est de 50 Mo.
- **415 Unsupported Media Type** : `POST /api/data` avec `Content-Type: text/xml` => le point d'accès n'accepte que `application/json`.
- **418 I'm a Teapot** : `BREW /coffee` => la théière décline poliment.
- **422 Unprocessable Content** : `POST /api/users` avec `{ "email": "not-an-email" }` => le JSON est valide mais le champ e-mail échoue à la validation.
- **429 Too Many Requests** : un client envoie 1000 requêtes par minute à `/api/search` => le serveur applique une limite de débit et répond par `429` avec un en-tête `Retry-After`.

## 5xx - Erreur serveur {/*#5xx---server-error*/}

Le serveur n'a pas réussi à traiter une requête valide.

| Code | Nom                   | Description                                                                                                  |
| ---- | --------------------- | ------------------------------------------------------------------------------------------------------------ |
| 500  | Internal Server Error | Une erreur inattendue s'est produite sur le serveur.                                                         |
| 502  | Bad Gateway           | Le serveur, agissant comme passerelle ou proxy, a reçu une réponse invalide d'un serveur en amont.           |
| 503  | Service Unavailable   | Le serveur est temporairement incapable de traiter la requête (p. ex. surchargé ou en maintenance).          |
| 504  | Gateway Timeout       | Le serveur, agissant comme passerelle ou proxy, n'a pas reçu de réponse à temps d'un serveur en amont.       |

### Exemples {/*#examples-4*/}

- **500 Internal Server Error** : `GET /api/reports` => une exception non gérée se produit dans le code serveur (p. ex. pointeur nul, division par zéro).
- **502 Bad Gateway** : un reverse proxy (p. ex. Nginx) transmet la requête à un backend qui renvoie une réponse corrompue ou incomplète.
- **503 Service Unavailable** : le serveur est en maintenance planifiée ou surchargé et ne peut temporairement pas traiter les requêtes. Inclut souvent un en-tête `Retry-After`.
- **504 Gateway Timeout** : un reverse proxy transmet la requête à un backend dont la réponse tarde trop (p. ex. une requête de base de données lente dépasse le délai du proxy).
