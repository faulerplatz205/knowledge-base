---
title: "Códigos de estado HTTP"
description: "Resumen de los códigos de estado HTTP más habituales agrupados por categoría."
keywords:
    - HTTP
    - códigos de estado
    - códigos de respuesta
    - estado HTTP
tags:
    - ap2
machine_translated: true
---

# Códigos de estado HTTP

## Visión general {/*#overview*/}

Los códigos de estado HTTP son números de tres dígitos que un servidor devuelve en respuesta a una petición de un cliente. Indican si la petición se ha realizado correctamente, se ha redirigido o ha producido un error. Los códigos de estado se agrupan en cinco clases según su primer dígito.

## 1xx - Informativos {/*#1xx---informational*/}

La petición se ha recibido y el servidor continúa procesándola.

| Código | Nombre              | Descripción                                                                                         |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------- |
| 100    | Continue            | El servidor ha recibido las cabeceras de la petición y el cliente puede proceder a enviar el cuerpo. |
| 101    | Switching Protocols | El servidor cambia al protocolo solicitado por el cliente (p. ej. actualización a WebSocket).        |

### Ejemplos {/*#examples*/}

- **100 Continue**: Un cliente envía la subida de un archivo grande con la cabecera `Expect: 100-continue`. El servidor responde con `100` para indicar que el cliente puede proceder a enviar el cuerpo.
- **101 Switching Protocols**: Un cliente envía una petición HTTP con `Upgrade: websocket`. El servidor responde con `101` y cambia al protocolo WebSocket.

## 2xx - Éxito {/*#2xx---success*/}

La petición se ha recibido, entendido y aceptado correctamente.

| Código | Nombre     | Descripción                                                                                  |
| ------ | ---------- | -------------------------------------------------------------------------------------------- |
| 200    | OK         | La petición se ha realizado correctamente. El cuerpo de la respuesta contiene los datos solicitados. |
| 201    | Created    | Se ha creado un nuevo recurso correctamente (normalmente tras un `POST`).                    |
| 204    | No Content | La petición se ha realizado correctamente, pero no hay contenido que devolver (normalmente tras un `DELETE`). |

### Ejemplos {/*#examples-1*/}

- **200 OK**: `GET /api/users/42` => el servidor devuelve el objeto de usuario como JSON.
- **201 Created**: `POST /api/users` con un cuerpo de petición => el servidor crea el usuario y devuelve el nuevo recurso con una cabecera `Location`.
- **204 No Content**: `DELETE /api/users/42` => el servidor elimina el usuario y devuelve una respuesta vacía.

## 3xx - Redirección {/*#3xx---redirection*/}

El cliente debe realizar una acción adicional para completar la petición.

| Código | Nombre             | Descripción                                                                            |
| ------ | ------------------ | -------------------------------------------------------------------------------------- |
| 301    | Moved Permanently  | El recurso se ha movido de forma permanente a una nueva URL.                           |
| 302    | Found              | El recurso se encuentra temporalmente en otra URL.                                     |
| 304    | Not Modified       | El recurso no ha cambiado desde la última petición (se usa para el almacenamiento en caché). |
| 307    | Temporary Redirect | Como 302, pero el método de la petición no debe cambiar en la redirección.             |
| 308    | Permanent Redirect | Como 301, pero el método de la petición no debe cambiar en la redirección.             |

### Ejemplos {/*#examples-2*/}

- **301 Moved Permanently**: `GET /old-page` => el servidor responde con `301` y `Location: /new-page`. Los motores de búsqueda actualizan su índice en consecuencia.
- **302 Found**: `GET /promo` => el servidor redirige temporalmente a `/current-sale`. La URL original sigue siendo válida para peticiones futuras.
- **304 Not Modified**: El cliente envía `GET /style.css` con una cabecera `If-None-Match` que contiene un ETag almacenado en caché. El servidor confirma que el recurso no ha cambiado y devuelve `304` sin cuerpo.
- **307 Temporary Redirect**: `POST /api/submit` => el servidor redirige temporalmente a `/api/v2/submit`. El cliente debe reenviar la petición `POST` (sin cambiarla a `GET`).
- **308 Permanent Redirect**: `POST /api/old-endpoint` => el servidor redirige de forma permanente a `/api/new-endpoint`. El cliente debe reenviar la petición `POST` a la nueva URL.

## 4xx - Error del cliente {/*#4xx---client-error*/}

La petición contiene un error por parte del cliente.

| Código | Nombre                 | Descripción                                                                                                              |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 400    | Bad Request            | El servidor no puede procesar la petición por una sintaxis mal formada o una entrada no válida.                          |
| 401    | Unauthorized           | Se requiere autenticación y no se ha proporcionado o no es válida.                                                       |
| 403    | Forbidden              | El servidor ha entendido la petición, pero se niega a autorizarla.                                                       |
| 404    | Not Found              | El recurso solicitado no existe en el servidor.                                                                          |
| 405    | Method Not Allowed     | El método HTTP utilizado no es compatible con el recurso solicitado.                                                     |
| 408    | Request Timeout        | El servidor agotó el tiempo de espera a que el cliente terminara de enviar la petición.                                  |
| 409    | Conflict               | La petición entra en conflicto con el estado actual del recurso (p. ej. una entrada duplicada).                          |
| 413    | Content Too Large      | El cuerpo de la petición supera el límite de tamaño del servidor.                                                        |
| 415    | Unsupported Media Type | El servidor no admite el tipo de medio del cuerpo de la petición.                                                        |
| 418    | I'm a Teapot           | El servidor se niega a preparar café porque es una tetera ([RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324)).   |
| 422    | Unprocessable Content  | La petición es sintácticamente correcta, pero semánticamente no válida (p. ej. errores de validación).                   |
| 429    | Too Many Requests      | El cliente ha enviado demasiadas peticiones en un período determinado (limitación de tasa).                              |

### Ejemplos {/*#examples-3*/}

- **400 Bad Request**: `POST /api/users` con `{ name: }` => el cuerpo JSON está mal formado y no puede analizarse.
- **401 Unauthorized**: `GET /api/profile` sin cabecera `Authorization` => el servidor exige autenticación.
- **403 Forbidden**: `DELETE /api/users/1` con un token válido de un usuario sin rol de administrador => el usuario está autenticado, pero carece de permiso.
- **404 Not Found**: `GET /api/users/99999` => no existe ningún usuario con ese ID.
- **405 Method Not Allowed**: `DELETE /api/login` => el endpoint `/api/login` solo admite `POST`.
- **408 Request Timeout**: Un cliente abre una conexión y empieza a enviar un cuerpo de petición grande, pero se detiene a mitad de la transferencia. El servidor cierra la conexión tras agotarse su tiempo de espera.
- **409 Conflict**: `POST /api/users` con `{ "email": "a@b.com" }` => ya existe un usuario con ese correo electrónico.
- **413 Content Too Large**: `POST /api/upload` con un archivo de 500 MB => el límite de subida del servidor es de 50 MB.
- **415 Unsupported Media Type**: `POST /api/data` con `Content-Type: text/xml` => el endpoint solo acepta `application/json`.
- **418 I'm a Teapot**: `BREW /coffee` => la tetera declina cortésmente.
- **422 Unprocessable Content**: `POST /api/users` con `{ "email": "not-an-email" }` => el JSON es válido, pero el campo de correo electrónico no supera la validación.
- **429 Too Many Requests**: Un cliente envía 1000 peticiones por minuto a `/api/search` => el servidor aplica un límite de tasa y responde con `429` y una cabecera `Retry-After`.

## 5xx - Error del servidor {/*#5xx---server-error*/}

El servidor no pudo atender una petición válida.

| Código | Nombre                | Descripción                                                                                                    |
| ------ | --------------------- | -------------------------------------------------------------------------------------------------------------- |
| 500    | Internal Server Error | Se produjo un error inesperado en el servidor.                                                                 |
| 502    | Bad Gateway           | El servidor, que actúa como pasarela o proxy, recibió una respuesta no válida de un servidor ascendente.       |
| 503    | Service Unavailable   | El servidor no puede atender la petición temporalmente (p. ej. por sobrecarga o mantenimiento).                |
| 504    | Gateway Timeout       | El servidor, que actúa como pasarela o proxy, no recibió a tiempo una respuesta de un servidor ascendente.     |

### Ejemplos {/*#examples-4*/}

- **500 Internal Server Error**: `GET /api/reports` => se produce una excepción no controlada en el código del servidor (p. ej. puntero nulo, división por cero).
- **502 Bad Gateway**: Un proxy inverso (p. ej. Nginx) reenvía la petición a un backend que devuelve una respuesta ininteligible o incompleta.
- **503 Service Unavailable**: El servidor está en mantenimiento programado o sobrecargado y no puede atender peticiones temporalmente. A menudo incluye una cabecera `Retry-After`.
- **504 Gateway Timeout**: Un proxy inverso reenvía la petición a un backend que tarda demasiado en responder (p. ej. una consulta lenta a la base de datos supera el tiempo de espera del proxy).
