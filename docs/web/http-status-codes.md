---
title: "HTTP Status Codes"
description: "Overview of the most common HTTP status codes."
keywords:
    - HTTP
    - status codes
    - response codes
    - HTTP status
tags:
    - ap2
---

# HTTP Status Codes

## Overview

HTTP status codes are three-digit numbers returned by a server in response to a client request. They indicate whether the request was successful, redirected, or resulted in an error. Status codes are grouped into five classes by their first digit.

## 1xx - Informational

The request was received, and the server is continuing to process it.

| Code | Name                | Description                                                                               |
| ---- | ------------------- | ----------------------------------------------------------------------------------------- |
| 100  | Continue            | The server received the request headers and the client should proceed to send the body.   |
| 101  | Switching Protocols | The server is switching to the protocol requested by the client (e.g. WebSocket upgrade). |

### Examples

- **100 Continue:** A client sends a large file upload with the `Expect: 100-continue` header. The server responds with `100` to signal that the client should proceed with sending the body.
- **101 Switching Protocols:** A client sends an HTTP request with `Upgrade: websocket`. The server responds with `101` and switches to the WebSocket protocol.

## 2xx - Success

The request was successfully received, understood, and accepted.

| Code | Name       | Description                                                                           |
| ---- | ---------- | ------------------------------------------------------------------------------------- |
| 200  | OK         | The request succeeded. The response body contains the requested data.                 |
| 201  | Created    | A new resource was successfully created (typically after a `POST`).                   |
| 204  | No Content | The request succeeded but there is no content to return (typically after a `DELETE`). |

### Examples

- **200 OK:** `GET /api/users/42` => the server returns the user object as JSON.
- **201 Created:** `POST /api/users` with a request body => the server creates the user and returns the new resource with a `Location` header.
- **204 No Content:** `DELETE /api/users/42` => the server deletes the user and returns an empty response.

## 3xx - Redirection

The client must take additional action to complete the request.

| Code | Name               | Description                                                             |
| ---- | ------------------ | ----------------------------------------------------------------------- |
| 301  | Moved Permanently  | The resource has been permanently moved to a new URL.                   |
| 302  | Found              | The resource is temporarily located at a different URL.                 |
| 304  | Not Modified       | The resource has not changed since the last request (used for caching). |
| 307  | Temporary Redirect | Like 302, but the request method must not change on redirect.           |
| 308  | Permanent Redirect | Like 301, but the request method must not change on redirect.           |

### Examples

- **301 Moved Permanently:** `GET /old-page` => the server responds with `301` and `Location: /new-page`. Search engines update their index accordingly.
- **302 Found:** `GET /promo` => the server temporarily redirects to `/current-sale`. The original URL remains valid for future requests.
- **304 Not Modified:** The client sends `GET /style.css` with an `If-None-Match` header containing a cached ETag. The server confirms the resource hasn't changed and returns `304` with no body.
- **307 Temporary Redirect:** `POST /api/submit` => the server temporarily redirects to `/api/v2/submit`. The client must resend the `POST` request (not change it to `GET`).
- **308 Permanent Redirect:** `POST /api/old-endpoint` => the server permanently redirects to `/api/new-endpoint`. The client must resend the `POST` request to the new URL.

## 4xx - Client Error

The request contains an error on the client side.

| Code | Name                   | Description                                                                                                           |
| ---- | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request            | The server cannot process the request due to malformed syntax or invalid input.                                       |
| 401  | Unauthorized           | Authentication is required and has not been provided or is invalid.                                                   |
| 403  | Forbidden              | The server understood the request but refuses to authorize it.                                                        |
| 404  | Not Found              | The requested resource does not exist on the server.                                                                  |
| 405  | Method Not Allowed     | The HTTP method used is not supported for the requested resource.                                                     |
| 408  | Request Timeout        | The server timed out waiting for the client to finish sending the request.                                            |
| 409  | Conflict               | The request conflicts with the current state of the resource (e.g. duplicate entry).                                  |
| 413  | Content Too Large      | The request body exceeds the server's size limit.                                                                     |
| 415  | Unsupported Media Type | The server does not support the media type of the request body.                                                       |
| 418  | I'm a Teapot           | The server refuses to brew coffee because it is a teapot ([RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324)). |
| 422  | Unprocessable Content  | The request is syntactically correct but semantically invalid (e.g. validation errors).                               |
| 429  | Too Many Requests      | The client has sent too many requests in a given time period (rate limiting).                                         |

### Examples

- **400 Bad Request:** `POST /api/users` with `{ name: }` => the JSON body is malformed and cannot be parsed.
- **401 Unauthorized:** `GET /api/profile` without an `Authorization` header => the server requires authentication.
- **403 Forbidden:** `DELETE /api/users/1` with a valid token for a non-admin user => the user is authenticated but lacks permission.
- **404 Not Found:** `GET /api/users/99999` => no user with that ID exists.
- **405 Method Not Allowed:** `DELETE /api/login` => the `/api/login` endpoint only supports `POST`.
- **408 Request Timeout:** A client opens a connection and starts sending a large request body but stalls mid-transfer. The server closes the connection after its timeout.
- **409 Conflict:** `POST /api/users` with `{ "email": "a@b.com" }` => a user with that email already exists.
- **413 Content Too Large:** `POST /api/upload` with a 500 MB file => the server's upload limit is 50 MB.
- **415 Unsupported Media Type:** `POST /api/data` with `Content-Type: text/xml` => the endpoint only accepts `application/json`.
- **418 I'm a Teapot:** `BREW /coffee` => the teapot politely declines.
- **422 Unprocessable Content:** `POST /api/users` with `{ "email": "not-an-email" }` => the JSON is valid but the email field fails validation.
- **429 Too Many Requests:** `GET /api/search` as the 101st request within one minute => the rate limit is 100 requests per minute. The server responds with `429` and a `Retry-After` header.

## 5xx - Server Error

The server failed to fulfill a valid request.

| Code | Name                  | Description                                                                                          |
| ---- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| 500  | Internal Server Error | An unexpected error occurred on the server.                                                          |
| 502  | Bad Gateway           | The server, acting as a gateway or proxy, received an invalid response from an upstream server.      |
| 503  | Service Unavailable   | The server is temporarily unable to handle the request (e.g. overloaded or under maintenance).       |
| 504  | Gateway Timeout       | The server, acting as a gateway or proxy, did not receive a timely response from an upstream server. |

### Examples

- **500 Internal Server Error:** `GET /api/reports` => an unhandled exception occurs in the server code (e.g. null pointer, division by zero).
- **502 Bad Gateway:** A reverse proxy (e.g. Nginx) forwards the request to a backend that returns a garbled or incomplete response.
- **503 Service Unavailable:** The server is undergoing scheduled maintenance or is overloaded and temporarily cannot handle requests. Often includes a `Retry-After` header.
- **504 Gateway Timeout:** A reverse proxy forwards the request to a backend that takes too long to respond (e.g. a slow database query exceeds the proxy's timeout).
