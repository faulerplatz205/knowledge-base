---
title: "HTTP-Statuscodes"
description: "Überblick über die gängigsten HTTP-Statuscodes."
keywords:
    - HTTP
    - Statuscodes
    - Antwortcodes
    - HTTP-Status
tags:
    - ap2
---

# HTTP-Statuscodes

## Überblick

HTTP-Statuscodes sind dreistellige Zahlen, die ein Server als Antwort auf eine Client-Anfrage zurückgibt. Sie zeigen an, ob die Anfrage erfolgreich war, umgeleitet wurde oder zu einem Fehler geführt hat. Statuscodes werden anhand ihrer ersten Ziffer in fünf Klassen eingeteilt.

## 1xx - Information

Die Anfrage wurde empfangen und der Server verarbeitet sie weiter.

| Code | Name                | Beschreibung                                                                                |
| ---- | ------------------- | ------------------------------------------------------------------------------------------- |
| 100  | Continue            | Der Server hat die Request-Header empfangen und der Client soll den Body senden.            |
| 101  | Switching Protocols | Der Server wechselt auf das vom Client angeforderte Protokoll (z.B. Upgrade auf WebSocket). |

### Beispiele

- **100 Continue:** Ein Client sendet einen großen Datei-Upload mit dem Header `Expect: 100-continue`. Der Server antwortet mit `100` und signalisiert damit, dass der Client den Body senden soll.
- **101 Switching Protocols:** Ein Client sendet eine HTTP-Anfrage mit `Upgrade: websocket`. Der Server antwortet mit `101` und wechselt auf das WebSocket-Protokoll.

## 2xx - Erfolg

Die Anfrage wurde erfolgreich empfangen, verstanden und angenommen.

| Code | Name       | Beschreibung                                                                                                |
| ---- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| 200  | OK         | Die Anfrage war erfolgreich. Der Response-Body enthält die angeforderten Daten.                             |
| 201  | Created    | Eine neue Ressource wurde erfolgreich angelegt (typischerweise nach einem `POST`).                          |
| 204  | No Content | Die Anfrage war erfolgreich, es gibt aber keinen Inhalt zurückzugeben (typischerweise nach einem `DELETE`). |

### Beispiele

- **200 OK:** `GET /api/users/42` => Der Server gibt das Benutzerobjekt als JSON zurück.
- **201 Created:** `POST /api/users` mit Request-Body => Der Server legt den Benutzer an und gibt die neue Ressource mit einem `Location`-Header zurück.
- **204 No Content:** `DELETE /api/users/42` => Der Server löscht den Benutzer und gibt eine leere Antwort zurück.

## 3xx - Umleitung

Der Client muss weitere Schritte ausführen, um die Anfrage abzuschließen.

| Code | Name               | Beschreibung                                                                               |
| ---- | ------------------ | ------------------------------------------------------------------------------------------ |
| 301  | Moved Permanently  | Die Ressource wurde dauerhaft unter eine neue URL verschoben.                              |
| 302  | Found              | Die Ressource befindet sich vorübergehend unter einer anderen URL.                         |
| 304  | Not Modified       | Die Ressource hat sich seit der letzten Anfrage nicht geändert (wird für Caching genutzt). |
| 307  | Temporary Redirect | Wie 302, die Request-Methode darf sich bei der Umleitung aber nicht ändern.                |
| 308  | Permanent Redirect | Wie 301, die Request-Methode darf sich bei der Umleitung aber nicht ändern.                |

### Beispiele

- **301 Moved Permanently:** `GET /old-page` => Der Server antwortet mit `301` und `Location: /new-page`. Suchmaschinen aktualisieren daraufhin ihren Index.
- **302 Found:** `GET /promo` => Der Server leitet vorübergehend auf `/current-sale` um. Die ursprüngliche URL bleibt für künftige Anfragen gültig.
- **304 Not Modified:** Der Client sendet `GET /style.css` mit einem `If-None-Match`-Header, der ein gecachtes ETag enthält. Der Server bestätigt, dass sich die Ressource nicht geändert hat, und gibt `304` ohne Body zurück.
- **307 Temporary Redirect:** `POST /api/submit` => Der Server leitet vorübergehend auf `/api/v2/submit` um. Der Client muss die `POST`-Anfrage erneut senden und darf sie nicht in ein `GET` umwandeln.
- **308 Permanent Redirect:** `POST /api/old-endpoint` => Der Server leitet dauerhaft auf `/api/new-endpoint` um. Der Client muss die `POST`-Anfrage erneut an die neue URL senden.

## 4xx - Client-Fehler

Die Anfrage enthält einen Fehler auf Client-Seite.

| Code | Name                   | Beschreibung                                                                                                                      |
| ---- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request            | Der Server kann die Anfrage wegen fehlerhafter Syntax oder ungültiger Eingaben nicht verarbeiten.                                 |
| 401  | Unauthorized           | Eine Authentifizierung ist erforderlich und fehlt oder ist ungültig.                                                              |
| 403  | Forbidden              | Der Server hat die Anfrage verstanden, verweigert aber die Autorisierung.                                                         |
| 404  | Not Found              | Die angeforderte Ressource existiert auf dem Server nicht.                                                                        |
| 405  | Method Not Allowed     | Die verwendete HTTP-Methode wird für die angeforderte Ressource nicht unterstützt.                                                |
| 408  | Request Timeout        | Der Server hat zu lange darauf gewartet, dass der Client das Senden der Anfrage abschließt.                                       |
| 409  | Conflict               | Die Anfrage steht im Konflikt mit dem aktuellen Zustand der Ressource (z.B. doppelter Eintrag).                                   |
| 413  | Content Too Large      | Der Request-Body überschreitet die Größenbeschränkung des Servers.                                                                |
| 415  | Unsupported Media Type | Der Server unterstützt den Medientyp des Request-Bodys nicht.                                                                     |
| 418  | I'm a Teapot           | Der Server weigert sich, Kaffee zu kochen, weil er eine Teekanne ist ([RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324)). |
| 422  | Unprocessable Content  | Die Anfrage ist syntaktisch korrekt, aber semantisch ungültig (z.B. Validierungsfehler).                                          |
| 429  | Too Many Requests      | Der Client hat in einem bestimmten Zeitraum zu viele Anfragen gesendet (Rate Limiting).                                           |

### Beispiele

- **400 Bad Request:** `POST /api/users` mit `{ name: }` => Der JSON-Body ist fehlerhaft und kann nicht geparst werden.
- **401 Unauthorized:** `GET /api/profile` ohne `Authorization`-Header => Der Server verlangt eine Authentifizierung.
- **403 Forbidden:** `DELETE /api/users/1` mit gültigem Token eines Benutzers ohne Adminrechte => Der Benutzer ist authentifiziert, hat aber keine Berechtigung.
- **404 Not Found:** `GET /api/users/99999` => Es existiert kein Benutzer mit dieser ID.
- **405 Method Not Allowed:** `DELETE /api/login` => Der Endpunkt `/api/login` unterstützt nur `POST`.
- **408 Request Timeout:** Ein Client öffnet eine Verbindung und beginnt, einen großen Request-Body zu senden, bricht die Übertragung aber mittendrin ab. Der Server schließt die Verbindung nach Ablauf seines Timeouts.
- **409 Conflict:** `POST /api/users` mit `{ "email": "a@b.com" }` => Ein Benutzer mit dieser E-Mail-Adresse existiert bereits.
- **413 Content Too Large:** `POST /api/upload` mit einer 500 MB großen Datei => Das Upload-Limit des Servers liegt bei 50 MB.
- **415 Unsupported Media Type:** `POST /api/data` mit `Content-Type: text/xml` => Der Endpunkt akzeptiert nur `application/json`.
- **418 I'm a Teapot:** `BREW /coffee` => Die Teekanne lehnt höflich ab.
- **422 Unprocessable Content:** `POST /api/users` mit `{ "email": "not-an-email" }` => Das JSON ist gültig, aber das E-Mail-Feld besteht die Validierung nicht.
- **429 Too Many Requests:** `GET /api/search` als die 101 Anfrage innerhalb einer Minute => Das Rate Limit liegt bei 100 Anfragen pro Minute. Der Server antwortet mit `429` und einem `Retry-After`-Header.

## 5xx - Server-Fehler

Der Server konnte eine gültige Anfrage nicht erfüllen.

| Code | Name                  | Beschreibung                                                                                             |
| ---- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| 500  | Internal Server Error | Auf dem Server ist ein unerwarteter Fehler aufgetreten.                                                  |
| 502  | Bad Gateway           | Der Server hat als Gateway oder Proxy eine ungültige Antwort von einem Upstream-Server erhalten.         |
| 503  | Service Unavailable   | Der Server kann die Anfrage vorübergehend nicht bearbeiten (z.B. wegen Überlastung oder Wartung).        |
| 504  | Gateway Timeout       | Der Server hat als Gateway oder Proxy nicht rechtzeitig eine Antwort von einem Upstream-Server erhalten. |

### Beispiele

- **500 Internal Server Error:** `GET /api/reports` => Im Servercode tritt eine nicht behandelte Exception auf (z.B. Null-Pointer, Division durch null).
- **502 Bad Gateway:** Ein Reverse Proxy (z.B. Nginx) leitet die Anfrage an ein Backend weiter, das eine fehlerhafte oder unvollständige Antwort liefert.
- **503 Service Unavailable:** Der Server wird planmäßig gewartet oder ist überlastet und kann vorübergehend keine Anfragen bearbeiten. Die Antwort enthält oft einen `Retry-After`-Header.
- **504 Gateway Timeout:** Ein Reverse Proxy leitet die Anfrage an ein Backend weiter, das zu lange für die Antwort braucht (z.B. überschreitet eine langsame Datenbankabfrage den Timeout des Proxys).
